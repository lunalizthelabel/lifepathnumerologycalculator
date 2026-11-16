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

const TOKEN_PREFIX = 'report:token:';
const SESSION_PREFIX = 'report:session:';

export async function createPurchase(data: Omit<Purchase, 'reportData' | 'createdAt' | 'used'>): Promise<Purchase> {
  const record: Purchase = {
    ...data,
    reportData: null,
    createdAt: new Date().toISOString(),
    used: false,
  };
  await kv.set(`${TOKEN_PREFIX}${data.reportToken}`, record);
  await kv.set(`${SESSION_PREFIX}${data.stripeSessionId}`, data.reportToken);
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
  await kv.set(`${TOKEN_PREFIX}${token}`, record);
}

export async function getTokenBySessionId(sessionId: string): Promise<string | null> {
  return kv.get<string>(`${SESSION_PREFIX}${sessionId}`);
}
