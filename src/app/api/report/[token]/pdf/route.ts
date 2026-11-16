import { NextRequest, NextResponse } from 'next/server';
import { getPurchaseByToken } from '@/lib/db/purchases';
import { parseStoredReport } from '@/lib/report/schema';
import { renderPdf, siteOrigin } from '@/lib/report/pdf';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * Renders the buyer's report page to an A4 PDF with headless Chrome.
 * The token is the access key, exactly as for the report page itself.
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const purchase = await getPurchaseByToken(token);
  const report = purchase?.reportData ? parseStoredReport(purchase.reportData) : null;
  if (!report) return NextResponse.json({ error: 'Report not available' }, { status: 404 });

  try {
    const pdf = await renderPdf(`${siteOrigin(request.url)}/report/${encodeURIComponent(token)}`);
    return new NextResponse(Buffer.from(pdf), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="numerology-report-life-path-${report.numbers.lifePath}.pdf"`,
        'Cache-Control': 'private, no-store',
      },
    });
  } catch (err) {
    console.error('[report pdf]', err);
    // The client falls back to the browser print dialog on any non-PDF response.
    return NextResponse.json({ error: 'PDF rendering failed' }, { status: 500 });
  }
}
