import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ReportDocument from '@/components/report/ReportDocument';
import { REPORT_FIXTURES, type FixtureName } from '@/lib/report/fixtures';

export const metadata: Metadata = {
  title: 'Report design preview',
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return Object.keys(REPORT_FIXTURES).map((fixture) => ({ fixture }));
}

/** Design preview with sample data: no payment, no AI call. */
export default async function ReportPreviewPage({ params }: { params: Promise<{ fixture: string }> }) {
  const { fixture } = await params;
  if (!(fixture in REPORT_FIXTURES)) notFound();
  const report = REPORT_FIXTURES[fixture as FixtureName];
  return (
    <ReportDocument
      report={report}
      pdfUrl={`/api/report-preview/${fixture}/pdf`}
      fileName={`report-preview-${fixture}.pdf`}
    />
  );
}
