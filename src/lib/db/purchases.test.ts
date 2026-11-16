import { describe, expect, it, vi } from 'vitest';

vi.mock('@vercel/kv', () => ({ createClient: () => ({ get: vi.fn(), set: vi.fn() }) }));

import { REPORT_RETENTION_DAYS, reportExpiresAt, secondsUntilExpiry } from './purchases';

describe('report retention', () => {
  const createdAt = '2026-11-16T10:00:00.000Z';

  it('keeps reports for 365 days', () => {
    expect(REPORT_RETENTION_DAYS).toBe(365);
    expect(reportExpiresAt(createdAt).toISOString()).toBe('2027-11-16T10:00:00.000Z');
  });

  it('counts down from the purchase date, not from the last write', () => {
    const dayLater = new Date('2026-11-17T10:00:00.000Z');
    expect(secondsUntilExpiry(createdAt, dayLater)).toBe(364 * 24 * 60 * 60);
  });

  it('never returns less than one second, and copes with a bad date', () => {
    expect(secondsUntilExpiry(createdAt, new Date('2030-01-01T00:00:00Z'))).toBe(1);
    expect(secondsUntilExpiry('not a date')).toBe(365 * 24 * 60 * 60);
  });
});
