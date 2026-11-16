import { NextRequest, NextResponse } from 'next/server';
import { REPORT_FIXTURES } from '@/lib/report/fixtures';
import { renderPdf, siteOrigin } from '@/lib/report/pdf';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/** PDF of a sample report, for reviewing the print design. */
export async function GET(request: NextRequest, { params }: { params: Promise<{ fixture: string }> }) {
  const { fixture } = await params;
  if (!(fixture in REPORT_FIXTURES)) return NextResponse.json({ error: 'Unknown fixture' }, { status: 404 });
  try {
    const pdf = await renderPdf(`${siteOrigin(request.url)}/report-preview/${fixture}`);
    return new NextResponse(Buffer.from(pdf), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="report-preview-${fixture}.pdf"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('[report-preview pdf]', err);
    return NextResponse.json({ error: 'PDF rendering failed' }, { status: 500 });
  }
}
