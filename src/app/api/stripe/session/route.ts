import { NextRequest, NextResponse } from 'next/server';
import { getTokenBySessionId } from '@/lib/db/purchases';

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('session_id');
  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
  }

  const token = await getTokenBySessionId(sessionId);
  if (!token) {
    return NextResponse.json({ status: 'generating' });
  }

  return NextResponse.json({ token });
}
