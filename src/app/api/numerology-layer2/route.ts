import { NextRequest, NextResponse } from 'next/server';
import { getPurchaseByToken } from '@/lib/db/purchases';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');
  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  }

  const purchase = await getPurchaseByToken(token);
  if (!purchase) {
    return NextResponse.json({ error: 'Report not found' }, { status: 404 });
  }

  if (purchase.reportData) {
    return NextResponse.json({ report: purchase.reportData, status: 'ready' });
  }

  return NextResponse.json({ status: 'generating' });
}
