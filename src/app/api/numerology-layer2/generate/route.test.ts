import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

const mocks = vi.hoisted(() => ({
  getPurchaseByToken: vi.fn(),
  saveReportData: vi.fn(),
  generateLayer2Report: vi.fn(),
}));

vi.mock('@/lib/db/purchases', () => ({
  getPurchaseByToken: mocks.getPurchaseByToken,
  saveReportData: mocks.saveReportData,
}));
vi.mock('@/lib/numerology/generate', () => ({
  generateLayer2Report: mocks.generateLayer2Report,
}));

import { POST } from './route';

const purchase = {
  reportToken: 'tok_1',
  birthDate: '1990-07-29',
  lifePath: 1,
  personalYear: 1,
  currentYear: 2026,
  currentMonth: 11,
  reportData: null,
};

function post(token: string) {
  return new NextRequest('http://localhost:3001/api/numerology-layer2/generate', {
    method: 'POST',
    body: JSON.stringify({ token }),
  });
}

describe('POST /api/numerology-layer2/generate consent guard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    mocks.generateLayer2Report.mockResolvedValue('# report');
  });

  it('refuses to generate for a purchase without recorded consent', async () => {
    mocks.getPurchaseByToken.mockResolvedValue(purchase);
    const res = await POST(post('tok_1'));
    expect(res.status).toBe(403);
    expect(mocks.generateLayer2Report).not.toHaveBeenCalled();
  });

  it('generates for a purchase with recorded consent', async () => {
    mocks.getPurchaseByToken.mockResolvedValue({
      ...purchase,
      withdrawalWaiverConsent: true,
      consentTimestamp: '2026-11-16T10:00:00.000Z',
      consentTextVersion: 'v1-2026-11',
    });
    const res = await POST(post('tok_1'));
    expect(res.status).toBe(200);
    expect(mocks.generateLayer2Report).toHaveBeenCalledOnce();
  });
});
