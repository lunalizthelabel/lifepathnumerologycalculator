import { describe, expect, it } from 'vitest';
import {
  WITHDRAWAL_CONSENT_TEXT,
  WITHDRAWAL_CONSENT_VERSION,
  buildConsentRecord,
  consentConfirmationStatement,
  consentFromMetadata,
  consentToMetadata,
} from './withdrawalConsent';

describe('withdrawal consent helpers', () => {
  it('uses the exact required wording', () => {
    expect(WITHDRAWAL_CONSENT_TEXT).toBe(
      'I agree that my report is generated and delivered immediately after payment, and I acknowledge that I thereby lose my 14-day right of withdrawal.'
    );
  });

  it('round-trips through Stripe metadata', () => {
    const record = buildConsentRecord(new Date('2026-11-16T14:03:00Z'));
    expect(consentToMetadata(record)).toEqual({
      withdrawal_waiver_consent: 'true',
      consent_timestamp: '2026-11-16T14:03:00.000Z',
      consent_text_version: WITHDRAWAL_CONSENT_VERSION,
    });
    expect(consentFromMetadata(consentToMetadata(record))).toEqual(record);
  });

  it.each([
    [null],
    [{}],
    [{ withdrawal_waiver_consent: 'true' }],
    [{ withdrawal_waiver_consent: 'yes', consent_timestamp: '2026-11-16T14:03:00.000Z', consent_text_version: 'v1' }],
    [{ withdrawal_waiver_consent: 'true', consent_timestamp: 'not a date', consent_text_version: 'v1' }],
  ])('rejects incomplete or invalid metadata %#', (meta) => {
    expect(consentFromMetadata(meta as Record<string, string> | null)).toBeNull();
  });

  it('confirmation statement includes date, time, wording and version', () => {
    const s = consentConfirmationStatement(buildConsentRecord(new Date('2026-11-16T14:03:00Z')));
    expect(s).toContain('16 November 2026, 14:03 UTC');
    expect(s).toContain(WITHDRAWAL_CONSENT_TEXT);
    expect(s).toContain(WITHDRAWAL_CONSENT_VERSION);
    expect(s.length).toBeLessThanOrEqual(5000); // Stripe invoice footer limit
  });
});
