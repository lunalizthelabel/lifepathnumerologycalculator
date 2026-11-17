import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import {
  buildConsentRecord,
  consentConfirmationStatement,
  consentToMetadata,
  formatConsentTimestamp,
} from '@/lib/legal/withdrawalConsent';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { birthDate, lifePath, personalYear, currentYear, currentMonth, email, withdrawalWaiverConsent } = body;

  // Never trust the client: consent must be explicitly the boolean true.
  if (withdrawalWaiverConsent !== true) {
    return NextResponse.json(
      { error: 'Consent to immediate delivery and waiver of the right of withdrawal is required.' },
      { status: 400 }
    );
  }

  // Timestamp is recorded server-side, at the moment the checkout is created.
  const consent = buildConsentRecord();
  const consentMetadata = consentToMetadata(consent);

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const origin = request.headers.get('origin') ?? process.env.NEXT_PUBLIC_BASE_URL ?? '';

  const session = await stripe.checkout.sessions.create({
    // No payment_method_types: Stripe then offers every method enabled in the
    // Stripe dashboard (cards, PayPal, iDEAL, ...) that fits the buyer and currency.
    mode: 'payment',
    // Shows the "Add promotion code" field. Codes are managed in the Stripe dashboard.
    allow_promotion_codes: true,
    customer_email: String(email),
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],
    success_url: `${origin}/report/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/`, // back to the calculator if the buyer cancels at Stripe
    metadata: {
      birthDate: String(birthDate),
      lifePath: String(lifePath),
      personalYear: String(personalYear),
      currentYear: String(currentYear),
      currentMonth: String(currentMonth),
      ...consentMetadata,
    },
    payment_intent_data: {
      metadata: consentMetadata,
    },
    // Stripe emails this invoice to the customer: the durable-medium confirmation.
    invoice_creation: {
      enabled: true,
      invoice_data: {
        metadata: consentMetadata,
        custom_fields: [
          {
            name: 'Withdrawal waiver',
            value: `Consented ${formatConsentTimestamp(consent.consentTimestamp)} (${consent.consentTextVersion})`,
          },
        ],
        footer: consentConfirmationStatement(consent),
      },
    },
  });

  return NextResponse.json({ checkoutUrl: session.url });
}
