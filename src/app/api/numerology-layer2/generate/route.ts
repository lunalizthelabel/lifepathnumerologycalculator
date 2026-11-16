import { NextRequest, NextResponse } from 'next/server';
import { getPurchaseByToken, saveReportData } from '@/lib/db/purchases';
import { generateLayer2Report } from '@/lib/numerology/generate';

export const dynamic = 'force-dynamic';
// Report generation takes ~2 minutes; allow up to 5.
export const maxDuration = 300;

export async function POST(request: NextRequest) {
  const { token } = await request.json();
  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  }

  const purchase = await getPurchaseByToken(token);
  if (!purchase) {
    return NextResponse.json({ error: 'Purchase not found' }, { status: 404 });
  }

  // Second fulfilment path (called from the success page): same consent guard as the webhook.
  if (purchase.withdrawalWaiverConsent !== true) {
    console.error(`[generate] Refusing to generate for ${token}: no withdrawal-waiver consent on record`);
    return NextResponse.json({ error: 'Consent not recorded for this purchase' }, { status: 403 });
  }

  if (purchase.reportData) {
    return NextResponse.json({ status: 'ready' });
  }

  const reportText = await generateLayer2Report({
    birthDate: purchase.birthDate,
    lifePath: purchase.lifePath,
    personalYear: purchase.personalYear,
    currentYear: purchase.currentYear,
    currentMonth: purchase.currentMonth,
  });

  await saveReportData(token, reportText);
  return NextResponse.json({ status: 'ready' });
}
