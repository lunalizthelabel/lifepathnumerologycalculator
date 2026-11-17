import type { Metadata } from 'next';
import Link from 'next/link';
import { REPORT_FIXTURES } from '@/lib/report/fixtures';

export const metadata: Metadata = {
  title: 'Report design preview',
  robots: { index: false, follow: false },
};

const NOTES: Record<string, string> = {
  normal: 'Typical length, all optional fields present.',
  long: 'Very long titles, quotes, paragraphs and lists.',
  minimal: 'Optional fields missing, one short paragraph per section.',
};

export default function ReportPreviewIndex() {
  return (
    <main style={{ background: 'var(--color-paper)', minHeight: '70vh', padding: '96px 24px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <p className="eyebrow">Design preview</p>
        <h1 style={{ marginTop: 16 }}>Paid report template</h1>
        <ul style={{ marginTop: 40, listStyle: 'none', padding: 0 }}>
          {Object.keys(REPORT_FIXTURES).map((name) => (
            <li key={name} style={{ borderTop: '1px solid var(--color-border)', padding: '20px 0' }}>
              <Link href={`/report-preview/${name}`} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'var(--fs-26)', color: 'var(--color-deep)' }}>
                {name}
              </Link>
              <p style={{ fontSize: 'var(--fs-16)', margin: 0 }}>{NOTES[name]}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
