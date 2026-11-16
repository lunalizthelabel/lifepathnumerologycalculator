/**
 * The paid report template: maps a StoredReport (code-calculated numbers +
 * AI-written content) onto the page components. Same output for web and PDF.
 */
import './report.css';
import { Fragment } from 'react';
import type { StoredReport } from '@/lib/report/schema';
import { NUMBER_MEANINGS, PERSONAL_YEAR_THEMES } from '@/lib/numberMeanings';
import { formatBirthDate } from '@/lib/numerology';
import { REPORT_NOTE_PARAGRAPHS, REPORT_NOTE_TITLE, GENERAL_DISCLAIMER, COPYRIGHT_LINE } from '@/lib/report/legal';
import DownloadPdfButton from './DownloadPdfButton';
import {
  ClosingPage, CoverPage, OpenerPage, OverviewPage, QuotePage, ReadingPage, TimelinePage, monthName,
  type OverviewItem,
} from './pages';

/** Sections whose pull quote gets a full quote page (others show it inline). */
const QUOTE_PAGE_SECTIONS = new Set(['cycle', 'connection']);

export default function ReportDocument({
  report, pdfUrl, fileName = 'numerology-report.pdf',
}: { report: StoredReport; pdfUrl?: string; fileName?: string }) {
  const { numbers: n, content: c } = report;
  const generated = new Date(report.generatedAt);
  const generatedLabel = generated.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  const month = monthName(n.currentMonth);

  const overview: OverviewItem[] = [
    { label: 'Life Path', number: n.lifePath, text: NUMBER_MEANINGS[n.lifePath]?.name ?? '' },
    { label: 'Birthday Number', number: n.birthdayNumber, text: c.birthday.essence },
    { label: `Personal Year ${n.currentYear}`, number: n.personalYear, text: PERSONAL_YEAR_THEMES[n.personalYear]?.theme ?? '' },
    { label: `${n.activeCycle.name} Life Cycle`, number: n.activeCycle.number, text: c.cycle.essence },
    { label: `Pinnacle ${n.activePinnacle.index}`, number: n.activePinnacle.number, text: c.pinnacle.essence },
    { label: `${month} · Personal Month`, number: n.personalMonth, text: c.month.essence },
  ];

  const sections = [
    { key: 'birthday', index: '01', label: 'Birthday Number', numbers: [n.birthdayNumber], section: c.birthday, surface: 'dark', points: 'Key qualities' },
    { key: 'cycle', index: '02', label: `${n.activeCycle.name} Life Cycle`, numbers: [n.activeCycle.number], section: c.cycle, surface: 'sand', points: 'In this season' },
    { key: 'pinnacle', index: '03', label: `Pinnacle ${n.activePinnacle.index}`, numbers: [n.activePinnacle.number], section: c.pinnacle, surface: 'dark', points: 'The climate' },
    { key: 'connection', index: '04', label: 'Cycle meets Pinnacle', numbers: [n.activeCycle.number, n.activePinnacle.number], section: c.connection, surface: 'sand', points: 'Working with it' },
    { key: 'month', index: '05', label: `${month} · Personal Month`, numbers: [n.personalMonth], section: c.month, surface: 'dark', points: 'Ways to work with this month' },
  ] as const;

  return (
    <article className="rp" lang="en">
      {pdfUrl && (
        <div className="rp-toolbar rp-screen-only">
          <p className="rp-label">Your personal report</p>
          <DownloadPdfButton pdfUrl={pdfUrl} fileName={fileName} />
        </div>
      )}

      <CoverPage n={n} birthDateLabel={formatBirthDate(n.birthDate)} generatedLabel={generatedLabel} />
      <OverviewPage items={overview} />
      <TimelinePage n={n} />

      {sections.map((s) => {
        const quote = s.section.pullQuote?.trim();
        const quotePage = QUOTE_PAGE_SECTIONS.has(s.key) && !!quote;
        return (
          <Fragment key={s.key}>
            <OpenerPage index={s.index} label={s.label} numbers={[...s.numbers]} essence={s.section.essence} surface={s.surface} />
            <ReadingPage index={s.index} label={s.label} section={s.section} pointsLabel={s.points} showInlineQuote={!quotePage} />
            {quotePage && quote && <QuotePage quote={quote} source={`${s.index} · ${s.label}`} />}
          </Fragment>
        );
      })}

      <ReadingPage
        index="06"
        label="Your current chapter"
        section={{ title: c.closing.title, essence: '', intro: c.closing.paragraphs[0], paragraphs: c.closing.paragraphs.slice(1) }}
        pointsLabel=""
        showInlineQuote={false}
      />

      <ClosingPage
        carryWith={c.closing.carryWith}
        noteTitle={REPORT_NOTE_TITLE}
        noteParagraphs={REPORT_NOTE_PARAGRAPHS}
        disclaimer={GENERAL_DISCLAIMER}
        copyright={COPYRIGHT_LINE}
        footerMeta={`Prepared ${generatedLabel} · lifepathnumerologycalculator.com`}
      />
    </article>
  );
}
