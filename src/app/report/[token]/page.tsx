import type { Metadata } from 'next'
import { getPurchaseByToken } from '@/lib/db/purchases'
import { parseStoredReport } from '@/lib/report/schema'
import ReportDocument from '@/components/report/ReportDocument'
import LegacyReport from './LegacyReport'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Your personal report',
  robots: { index: false, follow: false },
}

export default async function ReportPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params

  let reportData: string | null = null
  try {
    // Read straight from the database (works on any host/port).
    reportData = (await getPurchaseByToken(token))?.reportData ?? null
  } catch {
    reportData = null
  }

  if (!reportData) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 text-center" style={{ background: 'var(--color-paper)' }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--color-deep-body)' }}>
          Your report is being prepared…
        </p>
      </main>
    )
  }

  const report = parseStoredReport(reportData)
  if (report) {
    return (
      <ReportDocument
        report={report}
        pdfUrl={`/api/report/${encodeURIComponent(token)}/pdf`}
        fileName={`numerology-report-life-path-${report.numbers.lifePath}.pdf`}
      />
    )
  }

  // Reports generated before the template change are stored as markdown.
  return <LegacyReport markdown={reportData} />
}
