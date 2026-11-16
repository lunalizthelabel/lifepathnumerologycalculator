import { createClient } from '@vercel/kv';

// The Upstash database connected via Vercel uses the "STORAGE_" prefix.
// Fall back to the plain KV_ names for older setups.
const kv = createClient({
  url: process.env.STORAGE_KV_REST_API_URL ?? process.env.KV_REST_API_URL ?? '',
  token: process.env.STORAGE_KV_REST_API_TOKEN ?? process.env.KV_REST_API_TOKEN ?? '',
});

export type Purchase = {
  reportToken: string;
  stripeSessionId: string;
  email: string;
  birthDate: string;
  lifePath: number;
  personalYear: number;
  currentYear: number;
  currentMonth: number;
  reportData: string | null;
  createdAt: string;
  used: boolean;
  // Proof of withdrawal-waiver consent (see src/lib/legal/withdrawalConsent.ts).
  // Optional only because records created before v1-2026-11 lack them.
  withdrawalWaiverConsent?: boolean;
  consentTimestamp?: string;
  consentTextVersion?: string;
};

/**
 * Purchases and their reports are deleted automatically this long after the
 * purchase (stated in the Privacy Policy, section "How long we keep data").
 */
export const REPORT_RETENTION_DAYS = 365;
const RETENTION_SECONDS = REPORT_RETENTION_DAYS * 24 * 60 * 60;

/** The moment a purchase made at `createdAt` is deleted. */
export function reportExpiresAt(createdAt: string): Date {
  return new Date(new Date(createdAt).getTime() + RETENTION_SECONDS * 1000);
}

/** Seconds left until a purchase made at `createdAt` is deleted (at least 1). */
export function secondsUntilExpiry(createdAt: string, now: Date = new Date()): number {
  const left = Math.floor((reportExpiresAt(createdAt).getTime() - now.getTime()) / 1000);
  return Number.isFinite(left) ? Math.max(1, left) : RETENTION_SECONDS;
}

const TOKEN_PREFIX = 'report:token:';
const SESSION_PREFIX = 'report:session:';

export async function createPurchase(data: Omit<Purchase, 'reportData' | 'createdAt' | 'used'>): Promise<Purchase> {
  const record: Purchase = {
    ...data,
    reportData: null,
    createdAt: new Date().toISOString(),
    used: false,
  };
  // `ex` makes the database delete both keys by itself after the retention period.
  await kv.set(`${TOKEN_PREFIX}${data.reportToken}`, record, { ex: RETENTION_SECONDS });
  await kv.set(`${SESSION_PREFIX}${data.stripeSessionId}`, data.reportToken, { ex: RETENTION_SECONDS });
  return record;
}

export async function getPurchaseByToken(token: string): Promise<Purchase | null> {
  return kv.get<Purchase>(`${TOKEN_PREFIX}${token}`);
}

export async function getPurchaseBySessionId(sessionId: string): Promise<Purchase | null> {
  const token = await kv.get<string>(`${SESSION_PREFIX}${sessionId}`);
  if (!token) return null;
  return getPurchaseByToken(token);
}

export async function saveReportData(token: string, reportText: string): Promise<void> {
  const record = await getPurchaseByToken(token);
  if (!record) throw new Error(`Purchase not found for token: ${token}`);
  record.reportData = reportText;
  // Writing a key resets its expiry, so set the time that is left since the purchase.
  await kv.set(`${TOKEN_PREFIX}${token}`, record, { ex: secondsUntilExpiry(record.createdAt) });
}

export async function getTokenBySessionId(sessionId: string): Promise<string | null> {
  return kv.get<string>(`${SESSION_PREFIX}${sessionId}`);
}
