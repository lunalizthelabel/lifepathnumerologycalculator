import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createPurchase, saveReportData } from '@/lib/db/purchases';
import { generateLayer2Report } from '@/lib/numerology/generate';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
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
  }

  return NextResponse.json({ received: true });
}
