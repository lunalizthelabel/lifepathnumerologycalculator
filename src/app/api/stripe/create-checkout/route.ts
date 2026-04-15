import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const { birthDate, lifePath, personalYear, currentYear, currentMonth, email } =
    await request.json();

  const origin = request.headers.get('origin') ?? process.env.NEXT_PUBLIC_BASE_URL ?? '';

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    customer_email: email,
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],
    success_url: `${origin}/report/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/report`,
    metadata: {
      birthDate: String(birthDate),
      lifePath: String(lifePath),
      personalYear: String(personalYear),
      currentYear: String(currentYear),
      currentMonth: String(currentMonth),
    },
  });

  return NextResponse.json({ checkoutUrl: session.url });
}
