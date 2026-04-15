import { NextRequest, NextResponse } from 'next/server';
import { getPurchaseByToken, saveReportData } from '@/lib/db/purchases';
import { generateLayer2Report } from '@/lib/numerology/generate';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const { token } = await request.json();
  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  }

  const purchase = await getPurchaseByToken(token);
  if (!purchase) {
    return NextResponse.json({ error: 'Purchase not found' }, { status: 404 });
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
