import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { WITHDRAWAL_CONSENT_VERSION } from '@/lib/legal/withdrawalConsent';

const { createSession } = vi.hoisted(() => ({ createSession: vi.fn() }));

vi.mock('stripe', () => ({
  default: class {
    checkout = { sessions: { create: createSession } };
  },
}));

import { POST } from './route';

const validBody = {
  birthDate: '1990-07-29',
  lifePath: 1,
  personalYear: 1,
  currentYear: 2026,
  currentMonth: 11,
  email: 'buyer@example.com',
};

function post(body: unknown) {
  return new NextRequest('http://localhost:3001/api/stripe/create-checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', origin: 'http://localhost:3001' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/stripe/create-checkout', () => {
  beforeEach(() => {
    createSession.mockReset();
    createSession.mockResolvedValue({ url: 'https://checkout.stripe.test/session' });
  });

  it.each([
    ['missing', validBody],
    ['false', { ...validBody, withdrawalWaiverConsent: false }],
    ['a truthy string', { ...validBody, withdrawalWaiverConsent: 'true' }],
    ['a number', { ...validBody, withdrawalWaiverConsent: 1 }],
  ])('rejects with 400 when consent is %s, without contacting Stripe', async (_label, body) => {
    const res = await POST(post(body));
    expect(res.status).toBe(400);
    expect(createSession).not.toHaveBeenCalled();
  });

  it('rejects a malformed JSON body with 400', async () => {
    const req = new NextRequest('http://localhost:3001/api/stripe/create-checkout', {
      method: 'POST',
      body: 'not json',
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    expect(createSession).not.toHaveBeenCalled();
  });

  it('writes consent proof to session, PaymentIntent and invoice metadata', async () => {
    const before = Date.now();
    const res = await POST(post({ ...validBody, withdrawalWaiverConsent: true }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ checkoutUrl: 'https://checkout.stripe.test/session' });

    expect(createSession).toHaveBeenCalledOnce();
    const params = createSession.mock.calls[0][0];

    const expected = {
      withdrawal_waiver_consent: 'true',
      consent_timestamp: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/),
      consent_text_version: WITHDRAWAL_CONSENT_VERSION,
    };
    expect(params.metadata).toMatchObject({ ...expected, birthDate: '1990-07-29' });
    expect(params.payment_intent_data.metadata).toEqual(expected);
    expect(params.invoice_creation.enabled).toBe(true);
    expect(params.invoice_creation.invoice_data.metadata).toEqual(expected);
    expect(params.invoice_creation.invoice_data.footer).toContain('14-day right of withdrawal');

    // Timestamp is generated server-side at request time (UTC).
    const ts = Date.parse(params.metadata.consent_timestamp);
    expect(ts).toBeGreaterThanOrEqual(before);
    expect(ts).toBeLessThanOrEqual(Date.now());
  });

  it('ignores a client-supplied timestamp or version', async () => {
    await POST(
      post({
        ...validBody,
        withdrawalWaiverConsent: true,
        consent_timestamp: '2000-01-01T00:00:00.000Z',
        consent_text_version: 'v0-forged',
      })
    );
    const params = createSession.mock.calls[0][0];
    expect(params.metadata.consent_timestamp).not.toBe('2000-01-01T00:00:00.000Z');
    expect(params.metadata.consent_text_version).toBe(WITHDRAWAL_CONSENT_VERSION);
  });

  it('does not change the price or product', async () => {
    process.env.STRIPE_PRICE_ID = 'price_test_123';
    await POST(post({ ...validBody, withdrawalWaiverConsent: true }));
    expect(createSession.mock.calls[0][0].line_items).toEqual([{ price: 'price_test_123', quantity: 1 }]);
  });
});
