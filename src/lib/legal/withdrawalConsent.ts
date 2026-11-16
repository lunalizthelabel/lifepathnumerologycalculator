/**
 * Withdrawal-waiver consent for the paid (Layer 2) report.
 *
 * EU consumer law: buyers of digital content have a 14-day right of withdrawal
 * unless they (a) expressly consent to immediate delivery and (b) acknowledge
 * that they thereby lose that right. Both are captured by this single checkbox.
 *
 * The text and its version live together here so they always change together.
 * If you change WITHDRAWAL_CONSENT_TEXT in any way, bump WITHDRAWAL_CONSENT_VERSION.
 */

export const WITHDRAWAL_CONSENT_VERSION = 'v1-2026-11';

export const WITHDRAWAL_CONSENT_TEXT =
  'I agree that my report is generated and delivered immediately after payment, and I acknowledge that I thereby lose my 14-day right of withdrawal.';

/** Metadata keys written to Stripe (session + PaymentIntent) and the purchase record. */
export const CONSENT_METADATA_KEYS = {
  consent: 'withdrawal_waiver_consent',
  timestamp: 'consent_timestamp',
  version: 'consent_text_version',
} as const;

export type ConsentRecord = {
  withdrawalWaiverConsent: true;
  consentTimestamp: string; // ISO 8601, UTC
  consentTextVersion: string;
};

/** Builds the proof-of-consent record. The timestamp is taken on the server. */
export function buildConsentRecord(now: Date = new Date()): ConsentRecord {
  return {
    withdrawalWaiverConsent: true,
    consentTimestamp: now.toISOString(),
    consentTextVersion: WITHDRAWAL_CONSENT_VERSION,
  };
}

/** Stripe metadata values must be strings. */
export function consentToMetadata(record: ConsentRecord): Record<string, string> {
  return {
    [CONSENT_METADATA_KEYS.consent]: 'true',
    [CONSENT_METADATA_KEYS.timestamp]: record.consentTimestamp,
    [CONSENT_METADATA_KEYS.version]: record.consentTextVersion,
  };
}

/** Reads consent back from Stripe metadata. Returns null unless all fields are present and valid. */
export function consentFromMetadata(
  metadata: Record<string, string> | null | undefined
): ConsentRecord | null {
  if (!metadata) return null;
  const consent = metadata[CONSENT_METADATA_KEYS.consent];
  const timestamp = metadata[CONSENT_METADATA_KEYS.timestamp];
  const version = metadata[CONSENT_METADATA_KEYS.version];
  if (consent !== 'true' || !timestamp || !version) return null;
  if (Number.isNaN(Date.parse(timestamp))) return null;
  return { withdrawalWaiverConsent: true, consentTimestamp: timestamp, consentTextVersion: version };
}

/** Human-readable UTC date/time, e.g. "16 November 2026, 14:03 UTC". */
export function formatConsentTimestamp(iso: string): string {
  const d = new Date(iso);
  const date = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  const time = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
  return `${date}, ${time} UTC`;
}

/** Statement printed on the Stripe invoice (emailed to the customer). Max 5000 chars for invoice footers. */
export function consentConfirmationStatement(record: ConsentRecord): string {
  return (
    `Right of withdrawal: on ${formatConsentTimestamp(record.consentTimestamp)} you expressly consented ` +
    `to immediate generation and delivery of your digital report and acknowledged that you thereby ` +
    `lose your 14-day right of withdrawal. Consent text (${record.consentTextVersion}): "${WITHDRAWAL_CONSENT_TEXT}"`
  );
}
