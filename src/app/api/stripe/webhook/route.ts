import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createPurchase, saveReportData } from '@/lib/db/purchases';
import { generateLayer2Report } from '@/lib/numerology/generate';
import { consentFromMetadata } from '@/lib/legal/withdrawalConsent';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const rawBody = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = await stripe.checkout.sessions.retrieve(event.data.object.id);
    const meta = session.metadata ?? {};

    // Fulfilment guard: only deliver when payment succeeded AND consent was recorded.
    // Return 200 either way so Stripe doesn't keep retrying an event we chose to skip.
    if (session.payment_status !== 'paid') {
      console.warn(`[webhook] Skipping fulfilment for ${session.id}: payment_status=${session.payment_status}`);
      return NextResponse.json({ received: true, fulfilled: false });
    }
    const consent = consentFromMetadata(meta);
    if (!consent) {
      console.error(`[webhook] Skipping fulfilment for ${session.id}: withdrawal-waiver consent metadata missing or invalid`);
      return NextResponse.json({ received: true, fulfilled: false });
    }

    const reportToken = crypto.randomUUID();
    const email = session.customer_email ?? meta.email ?? '';

    await createPurchase({
      reportToken,
      stripeSessionId: session.id,
      email,
      birthDate: meta.birthDate,
      lifePath: Number(meta.lifePath),
      personalYear: Number(meta.personalYear),
      currentYear: Number(meta.currentYear),
      currentMonth: Number(meta.currentMonth),
      ...consent,
    });

    // Generate report in background so we can return 200 to Stripe immediately
    generateLayer2Report({
      birthDate: meta.birthDate,
      lifePath: Number(meta.lifePath),
      personalYear: Number(meta.personalYear),
      currentYear: Number(meta.currentYear),
      currentMonth: Number(meta.currentMonth),
    }).then((reportText) => saveReportData(reportToken, reportText)).catch((err) => {
      console.error('[webhook] Report generation failed:', err);
    });

    return NextResponse.json({ received: true, fulfilled: true });
  }

  return NextResponse.json({ received: true });
}
