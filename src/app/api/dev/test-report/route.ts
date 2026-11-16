import { NextRequest, NextResponse } from 'next/server';
import { createPurchase, saveReportData } from '@/lib/db/purchases';
import { generateLayer2Report, findNamedSource } from '@/lib/numerology/generate';
import { calculateLifePath, calculatePersonalYear } from '@/lib/numerology';
import { buildConsentRecord } from '@/lib/legal/withdrawalConsent';
import { contentText, parseStoredReport } from '@/lib/report/schema';

export const dynamic = 'force-dynamic';
// Report generation takes ~2 minutes; allow up to 5.
export const maxDuration = 300;

/**
 * DEV ONLY: generate a real paid (Layer 2) report without going through Stripe.
 *
 *   http://localhost:3001/api/dev/test-report?date=1990-07-29
 *
 * Creates a fake purchase (token prefixed "dev-"), calls Claude, saves the
 * report, then redirects to the report page. Takes ~1-2 minutes.
 * Add &format=json to get the raw markdown + checks instead of the redirect.
 * Returns 404 in production.
 */
export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const params = request.nextUrl.searchParams;
  const birthDate = params.get('date') ?? '';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) {
    return NextResponse.json({ error: 'Pass ?date=YYYY-MM-DD' }, { status: 400 });
  }

  const now = new Date();
  const input = {
    birthDate,
    lifePath: calculateLifePath(birthDate),
    personalYear: calculatePersonalYear(birthDate),
    currentYear: now.getFullYear(),
    currentMonth: now.getMonth() + 1,
  };

  // format=json skips the database entirely: handy for checking report
  // content even when the KV store is unavailable.
  const asJson = params.get('format') === 'json';
  const reportToken = `dev-${crypto.randomUUID()}`;
  if (!asJson) {
    await createPurchase({
      reportToken,
      stripeSessionId: reportToken,
      email: 'dev@localhost',
      ...input,
      ...buildConsentRecord(),
    });
  }

  const started = Date.now();
  const report = await generateLayer2Report(input);
  if (!asJson) await saveReportData(reportToken, report);

  if (asJson) {
    const parsed = parseStoredReport(report);
    const prose = parsed ? contentText(parsed.content) : report;
    return NextResponse.json({
      input,
      seconds: Math.round((Date.now() - started) / 1000),
      validJsonReport: !!parsed,
      words: prose.split(/\s+/).filter(Boolean).length,
      checks: {
        namedSource: findNamedSource(prose),
        dashes: (prose.match(/[\u2014\u2013]/g) ?? []).length,
      },
      report: parsed ?? report,
    });
  }

  return NextResponse.redirect(new URL(`/report/${reportToken}`, request.url));
}
