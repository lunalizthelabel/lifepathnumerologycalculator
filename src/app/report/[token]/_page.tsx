import { notFound } from 'next/navigation';
import { getPurchaseByToken } from '@/lib/db/purchases';

type Props = {
  params: Promise<{ token: string }>;
};

function parseReport(markdown: string): { heading: string; body: string }[] {
  const sections: { heading: string; body: string }[] = [];
  const lines = markdown.split('\n');
  let current: { heading: string; body: string } | null = null;

  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (current) sections.push(current);
      current = { heading: line.replace(/^##\s+/, ''), body: '' };
    } else if (current) {
      current.body += line + '\n';
    } else {
      // content before first ## heading goes into an intro section
      if (line.trim()) {
        if (!current) current = { heading: '', body: '' };
        current.body += line + '\n';
      }
    }
  }
  if (current) sections.push(current);
  return sections;
}

export default async function ReportPage({ params }: Props) {
  const { token } = await params;
  const purchase = await getPurchaseByToken(token);

  if (!purchase || !purchase.reportData) {
    notFound();
  }

  const sections = parseReport(purchase.reportData);

  return (
    <main className="min-h-screen bg-white px-6 py-16 print:py-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-12 border-b border-gray-100 pb-10">
          <p className="mb-2 font-sans text-xs uppercase tracking-widest text-amber-600">
            Numerology Layer 2 Report
          </p>
          <h1 className="font-serif text-4xl font-light text-gray-900">
            Life Path {purchase.lifePath}
          </h1>
          <p className="mt-2 font-sans text-sm text-gray-400">
            Born {purchase.birthDate} &middot; Personal Year {purchase.personalYear} &middot; {purchase.currentYear}
          </p>
        </div>

        {/* Report sections */}
        <div className="space-y-8">
          {sections.map((section, i) => (
            <div
              key={i}
              className="rounded-sm border border-gray-100 bg-gray-50/60 px-8 py-7"
            >
              {section.heading && (
                <h2 className="mb-4 font-serif text-xl font-normal text-gray-800">
                  {section.heading}
                </h2>
              )}
              <div className="font-serif text-base leading-relaxed text-gray-700 whitespace-pre-wrap">
                {section.body.trim()}
              </div>
            </div>
          ))}
        </div>

        {/* Print / PDF */}
        <div className="mt-12 flex justify-center print:hidden">
          <button
            onClick={() => window.print()}
            className="border border-gray-300 px-8 py-3 font-sans text-sm text-gray-600 transition hover:border-gray-500 hover:text-gray-900"
          >
            Save as PDF / Print
          </button>
        </div>

        {/* Disclaimer */}
        <div className="mt-16 border-t border-gray-100 pt-8 print:mt-8">
          <p className="font-sans text-xs leading-relaxed text-gray-400">
            This report is provided for entertainment and personal reflection purposes only.
            Numerology is not a science and should not be used as a substitute for professional
            advice. Results are based on Pythagorean numerology principles applied to the provided
            birth date.
          </p>
        </div>
      </div>

      <style>{`
        @media print {
          body { background: white; }
          button { display: none; }
        }
      `}</style>
    </main>
  );
}
