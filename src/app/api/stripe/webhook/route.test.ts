import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

const mocks = vi.hoisted(() => ({
  constructEvent: vi.fn(),
  retrieveSession: vi.fn(),
  createPurchase: vi.fn(),
  getTokenBySessionId: vi.fn(),
  saveReportData: vi.fn(),
  generateLayer2Report: vi.fn(),
}));

vi.mock('stripe', () => ({
  default: class {
    webhooks = { constructEvent: mocks.constructEvent };
    checkout = { sessions: { retrieve: mocks.retrieveSession } };
  },
}));
vi.mock('@/lib/db/purchases', () => ({
  createPurchase: mocks.createPurchase,
  getTokenBySessionId: mocks.getTokenBySessionId,
  saveReportData: mocks.saveReportData,
}));
vi.mock('@/lib/numerology/generate', () => ({
  generateLayer2Report: mocks.generateLayer2Report,
}));

import { POST } from './route';

const consentMeta = {
  withdrawal_waiver_consent: 'true',
  consent_timestamp: '2026-11-16T10:00:00.000Z',
  consent_text_version: 'v1-2026-11',
};
const birthMeta = {
  birthDate: '1990-07-29',
  lifePath: '1',
  personalYear: '1',
  currentYear: '2026',
  currentMonth: '11',
};

function webhookRequest() {
  return new NextRequest('http://localhost:3001/api/stripe/webhook', {
    method: 'POST',
    headers: { 'stripe-signature': 't=1,v1=test' },
    body: '{}',
  });
}

function givenSession(session: Record<string, unknown>, type = 'checkout.session.completed') {
  mocks.constructEvent.mockReturnValue({
    type,
    data: { object: { id: 'cs_test_1' } },
  });
  mocks.retrieveSession.mockResolvedValue({
    id: 'cs_test_1',
    customer_email: 'buyer@example.com',
    ...session,
  });
}

describe('POST /api/stripe/webhook fulfilment guard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    mocks.generateLayer2Report.mockResolvedValue('# report');
    mocks.getTokenBySessionId.mockResolvedValue(null);
  });

  it('skips fulfilment when consent metadata is missing', async () => {
    givenSession({ payment_status: 'paid', metadata: birthMeta });
    const res = await POST(webhookRequest());
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ fulfilled: false });
    expect(mocks.createPurchase).not.toHaveBeenCalled();
    expect(mocks.generateLayer2Report).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('consent metadata missing'));
  });

  it('skips fulfilment when consent is present but not "true"', async () => {
    givenSession({ payment_status: 'paid', metadata: { ...birthMeta, ...consentMeta, withdrawal_waiver_consent: 'false' } });
    await POST(webhookRequest());
    expect(mocks.generateLayer2Report).not.toHaveBeenCalled();
  });

  it('skips fulfilment when the timestamp or version is missing', async () => {
    givenSession({ payment_status: 'paid', metadata: { ...birthMeta, withdrawal_waiver_consent: 'true' } });
    await POST(webhookRequest());
    expect(mocks.generateLayer2Report).not.toHaveBeenCalled();
  });

  it('skips fulfilment when payment has not succeeded', async () => {
    givenSession({ payment_status: 'unpaid', metadata: { ...birthMeta, ...consentMeta } });
    const res = await POST(webhookRequest());
    expect(await res.json()).toMatchObject({ fulfilled: false });
    expect(mocks.createPurchase).not.toHaveBeenCalled();
    expect(mocks.generateLayer2Report).not.toHaveBeenCalled();
  });

  it('fulfils and stores consent on the purchase when paid with consent', async () => {
    givenSession({ payment_status: 'paid', metadata: { ...birthMeta, ...consentMeta } });
    const res = await POST(webhookRequest());
    expect(await res.json()).toMatchObject({ fulfilled: true });
    expect(mocks.createPurchase).toHaveBeenCalledWith(
      expect.objectContaining({
        stripeSessionId: 'cs_test_1',
        withdrawalWaiverConsent: true,
        consentTimestamp: '2026-11-16T10:00:00.000Z',
        consentTextVersion: 'v1-2026-11',
      })
    );
    expect(mocks.generateLayer2Report).toHaveBeenCalledOnce();
  });

  it('fulfils a free order paid fully with a promotion code', async () => {
    givenSession({ payment_status: 'no_payment_required', metadata: { ...birthMeta, ...consentMeta } });
    const res = await POST(webhookRequest());
    expect(await res.json()).toMatchObject({ fulfilled: true });
    expect(mocks.generateLayer2Report).toHaveBeenCalledOnce();
  });

  it('fulfils a delayed payment method once the payment succeeds', async () => {
    givenSession({ payment_status: 'paid', metadata: { ...birthMeta, ...consentMeta } }, 'checkout.session.async_payment_succeeded');
    const res = await POST(webhookRequest());
    expect(await res.json()).toMatchObject({ fulfilled: true });
    expect(mocks.createPurchase).toHaveBeenCalledOnce();
  });

  it('does not create a second report when Stripe repeats an event', async () => {
    mocks.getTokenBySessionId.mockResolvedValue('existing-token');
    givenSession({ payment_status: 'paid', metadata: { ...birthMeta, ...consentMeta } });
    const res = await POST(webhookRequest());
    expect(await res.json()).toMatchObject({ fulfilled: true, duplicate: true });
    expect(mocks.createPurchase).not.toHaveBeenCalled();
    expect(mocks.generateLayer2Report).not.toHaveBeenCalled();
  });

  it('rejects an invalid signature', async () => {
    mocks.constructEvent.mockImplementation(() => {
      throw new Error('bad signature');
    });
    const res = await POST(webhookRequest());
    expect(res.status).toBe(400);
    expect(mocks.generateLayer2Report).not.toHaveBeenCalled();
  });
});
