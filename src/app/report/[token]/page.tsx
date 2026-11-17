import type { Metadata } from 'next'
import { getPurchaseByToken, reportExpiresAt, type Purchase } from '@/lib/db/purchases'
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

  let purchase: Purchase | null = null
  let lookupFailed = false
  try {
    // Read straight from the database (works on any host/port).
    purchase = await getPurchaseByToken(token)
  } catch {
    lookupFailed = true
  }
  const reportData = purchase?.reportData ?? null

  if (!reportData) {
    // No purchase at all: wrong link, or deleted after the retention period.
    const gone = !purchase && !lookupFailed
    return (
      <main className="flex min-h-screen items-center justify-center px-6 text-center" style={{ background: 'var(--color-paper)' }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'var(--fs-14)', lineHeight: 1.7, color: 'var(--color-deep-body)', maxWidth: 440 }}>
          {gone
            ? `This report is not available. Reports stay online for 12 months after purchase and are then deleted. If you think this is a mistake, email info@lunalizbv.nl.`
            : 'Your report is being prepared…'}
        </p>
      </main>
    )
  }

  const availableUntil = reportExpiresAt(purchase!.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  })

  const report = parseStoredReport(reportData)
  if (report) {
    return (
      <ReportDocument
        report={report}
        pdfUrl={`/api/report/${encodeURIComponent(token)}/pdf`}
        fileName={`numerology-report-life-path-${report.numbers.lifePath}.pdf`}
        availableUntil={availableUntil}
      />
    )
  }

  // Reports generated before the template change are stored as markdown.
  return <LegacyReport markdown={reportData} />
}
