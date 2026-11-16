/**
 * Report page components. Each takes data as props and owns all of its design.
 * Used for both the web report and the PDF (via the print stylesheet).
 */
import type { ReactNode } from 'react';
import type { CoreNumbers, LifeCycle, Pinnacle } from '@/lib/numerology/core';
import { yearAtAge } from '@/lib/numerology/core';
import type { ReadingSection } from '@/lib/report/schema';

type Surface = 'paper' | 'panel' | 'sand' | 'dark';

/** Length-based size tier so long text shrinks instead of overflowing a fixed page. */
export function sizeTier(text: string, m: number, s: number): 'l' | 'm' | 's' {
  if (text.length > s) return 's';
  if (text.length > m) return 'm';
  return 'l';
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function Page({
  kind, surface, fixed, grain = true, label, children, decor,
}: {
  kind: string; surface: Surface; fixed: boolean; grain?: boolean; label: string; children: ReactNode; decor?: ReactNode;
}) {
  const cls = [
    'rp-page', `rp-${kind}`, fixed ? 'rp-fixed' : 'rp-flow',
    surface === 'dark' ? 'rp-on-dark' : `rp-on-${surface}`,
    grain ? 'rp-grain' : '',
  ].filter(Boolean).join(' ');
  return (
    <section className={cls} aria-label={label}>
      {decor}
      <div className="rp-inner">{children}</div>
    </section>
  );
}

function Marker({ index, label, as: Tag = 'p' }: { index?: string; label: string; as?: 'p' | 'h2' }) {
  return (
    <Tag className="rp-label rp-marker">
      {index ? `${index} · ${label}` : label}
    </Tag>
  );
}

/* ── 1. Cover ────────────────────────────────────────────────────────── */
export function CoverPage({ n, birthDateLabel, generatedLabel }: { n: CoreNumbers; birthDateLabel: string; generatedLabel: string }) {
  return (
    <Page
      kind="cover" surface="paper" fixed label="Cover"
      decor={
        <>
          <div className="rp-shape rp-arch-fill" style={{ right: '-6%', top: '14%', width: '52%', height: '78%' }} />
          <div className="rp-shape rp-arch" style={{ right: '4%', top: '22%', width: '34%', height: '70%' }} />
          <div className="rp-shape rp-ring" style={{ left: '-14%', bottom: '-18%', width: '46%', aspectRatio: '1' }} />
        </>
      }
    >
      <div className="rp-cover-head">
        <p className="rp-label">Life Path Numerology</p>
        <p className="rp-label">Personal report · Layer 2</p>
      </div>
      <div className="rp-cover-hero">
        <p className="rp-label">Life Path</p>
        <p className="rp-num rp-cover-num" aria-label={`Life Path ${n.lifePath}`}>{n.lifePath}</p>
        <h1 className="rp-title rp-cover-title">Your numerology reflection</h1>
      </div>
      <dl className="rp-cover-meta">
        <div><dt className="rp-label">Born</dt><dd className="rp-meta-value">{birthDateLabel}</dd></div>
        <div><dt className="rp-label">Personal Year</dt><dd className="rp-meta-value">{n.personalYear} in {n.currentYear}</dd></div>
        <div><dt className="rp-label">Prepared</dt><dd className="rp-meta-value">{generatedLabel}</dd></div>
      </dl>
    </Page>
  );
}

/* ── 2. Overview ─────────────────────────────────────────────────────── */
export type OverviewItem = { label: string; number: number; text: string };

export function OverviewPage({ items }: { items: OverviewItem[] }) {
  return (
    <Page kind="overview" surface="paper" fixed label="Your numbers at a glance">
      <Marker label="At a glance" />
      <h2 className="rp-title" style={{ marginTop: 24, maxWidth: '16ch' }}>Your core numbers</h2>
      <ul className="rp-overview-grid">
        {items.map((it) => (
          <li key={it.label} className="rp-ov-item">
            <p className="rp-label">{it.label}</p>
            <p className="rp-num rp-ov-num">{it.number}</p>
            <p className="rp-ov-text">{it.text}</p>
          </li>
        ))}
      </ul>
    </Page>
  );
}

/* ── 3. Timeline ─────────────────────────────────────────────────────── */
function spanLabel(birthDate: string, from: number, to: number | null) {
  return to === null
    ? `From age ${from} · ${yearAtAge(birthDate, from)} onward`
    : `Ages ${from} to ${to} · ${yearAtAge(birthDate, from)} to ${yearAtAge(birthDate, to)}`;
}

function Bars({
  y, spans, activeIndex, maxAge, label,
}: { y: number; spans: { number: number; fromAge: number; toAge: number | null }[]; activeIndex: number; maxAge: number; label: string }) {
  const W = 1000;
  const x = (age: number) => (Math.min(age, maxAge) / maxAge) * W;
  // Alternate sand / paper so every band stands out from the panel background.
  const fills = ['var(--color-sand)', 'var(--color-paper)'];
  return (
    <g>
      <text x={0} y={y - 14} fontSize={13} letterSpacing={2.6} fill="var(--color-camel-ink)" style={{ textTransform: 'uppercase' }}>{label}</text>
      {spans.map((s, i) => {
        const x0 = x(s.fromAge);
        const x1 = x(s.toAge ?? maxAge);
        const active = i === activeIndex;
        return (
          <g key={i}>
            <rect
              x={x0 + 1} y={y} width={Math.max(0, x1 - x0 - 2)} height={64}
              fill={active ? 'var(--color-espresso)' : fills[i % fills.length]}
              stroke={active ? 'none' : 'color-mix(in srgb, var(--color-camel) 45%, transparent)'} strokeWidth={1}
            />
            <text
              className="rp-chart-num"
              x={(x0 + x1) / 2} y={y + 47} textAnchor="middle" fontSize={42}
              fill={active ? 'var(--color-on-dark)' : 'var(--color-deep)'}
            >
              {s.number}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export function TimelinePage({ n }: { n: CoreNumbers }) {
  const maxAge = Math.max(90, n.age + 10);
  const W = 1000;
  const ageX = (Math.min(n.age, maxAge) / maxAge) * W;
  const ticks = [0, 20, 40, 60, 80].filter((t) => t <= maxAge);
  const cycleIdx = n.cycles.indexOf(n.activeCycle);
  const pinIdx = n.pinnacles.indexOf(n.activePinnacle);

  const row = (key: string, number: number, title: string, sub: string, active: boolean) => (
    <li key={key} className="rp-tl-row" data-active={active}>
      <span className="rp-num">{number}</span>
      <span>
        <span className="rp-label" style={{ display: 'block' }}>{title}{active ? ' · now' : ''}</span>
        <span className="rp-small">{sub}</span>
      </span>
    </li>
  );

  return (
    <Page kind="timeline" surface="panel" fixed label="Your cycles and pinnacles over time">
      <Marker label="Timeline" />
      <h2 className="rp-title" style={{ marginTop: 24, maxWidth: '18ch' }}>The road and the weather</h2>
      <p className="rp-small" style={{ marginTop: 16, maxWidth: '60ch' }}>
        Life Cycles describe the road you travel; Pinnacles describe the climate around it. The dark band marks where you are now, at age {n.age}.
      </p>

      <svg className="rp-timeline-chart" viewBox="0 0 1000 260" role="img"
        aria-label={`Timeline. Active Life Cycle ${n.activeCycle.number}, active Pinnacle ${n.activePinnacle.number}, current age ${n.age}.`}>
        <Bars y={40} spans={n.cycles} activeIndex={cycleIdx} maxAge={maxAge} label="Life Cycles" />
        <Bars y={150} spans={n.pinnacles} activeIndex={pinIdx} maxAge={maxAge} label="Pinnacles" />
        {ticks.map((t) => (
          <text key={t} x={(t / maxAge) * W} y={252} fontSize={13} fill="var(--color-camel-ink)" textAnchor={t === 0 ? 'start' : 'middle'}>{t}</text>
        ))}
        <line x1={ageX} x2={ageX} y1={20} y2={232} stroke="var(--color-camel-deep)" strokeWidth={1.5} strokeDasharray="3 4" />
        <circle cx={ageX} cy={20} r={5} fill="var(--color-camel-deep)" />
      </svg>

      <div className="rp-tl-list">
        <ul>
          {n.cycles.map((c: LifeCycle, i) =>
            row(`c${i}`, c.number, `${c.name} Cycle · ${c.phase}`, spanLabel(n.birthDate, c.fromAge, c.toAge), i === cycleIdx))}
        </ul>
        <ul>
          {n.pinnacles.map((p: Pinnacle, i) =>
            row(`p${i}`, p.number, `Pinnacle ${p.index}`, spanLabel(n.birthDate, p.fromAge, p.toAge), i === pinIdx))}
        </ul>
      </div>
    </Page>
  );
}

/* ── 4. Section opener ───────────────────────────────────────────────── */
export function OpenerPage({
  index, label, numbers, essence, surface,
}: { index: string; label: string; numbers: number[]; essence: string; surface: 'dark' | 'sand' }) {
  return (
    <Page
      kind="opener" surface={surface} fixed label={`Section ${index}: ${label}`}
      decor={
        <>
          <div className="rp-shape rp-ring" style={{ right: '-18%', top: '-12%', width: '70%', aspectRatio: '1' }} />
          <div className="rp-shape rp-ring" style={{ right: '-6%', top: '0%', width: '46%', aspectRatio: '1' }} />
          {surface === 'dark' && <div className="rp-shape rp-glow" style={{ left: '-10%', bottom: '-20%', width: '60%', aspectRatio: '1' }} />}
        </>
      }
    >
      <Marker index={index} label={label} />
      <p className="rp-num rp-opener-num" aria-label={numbers.join(' and ')}>
        {numbers.map((num, i) => (
          <span key={i}>
            {i > 0 && <span className="rp-num-sep" aria-hidden="true">/</span>}
            {num}
          </span>
        ))}
      </p>
      <p className="rp-opener-essence" data-size={sizeTier(essence, 70, 120)}>{essence}</p>
    </Page>
  );
}

/* ── 5. Reading ──────────────────────────────────────────────────────── */
export function ReadingPage({
  index, label, section, pointsLabel, showInlineQuote,
}: { index: string; label: string; section: ReadingSection; pointsLabel: string; showInlineQuote: boolean }) {
  const points = (section.keyPoints ?? []).filter((p) => p.trim());
  const quote = section.pullQuote?.trim();
  const hasAside = points.length > 0 || (showInlineQuote && !!quote);
  return (
    <Page kind="reading" surface="paper" fixed={false} grain={false} label={`${index} ${label}`}>
      <header className="rp-reading-head">
        <Marker index={index} label={label} />
        <h2 className="rp-title">{section.title}</h2>
      </header>
      <div className={`rp-reading-cols${hasAside ? ' has-aside' : ''}`}>
        <div className="rp-body">
          <p className="rp-lead" style={{ marginBottom: '1.2em' }}>{section.intro}</p>
          {section.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        {hasAside && (
          <aside className="rp-aside">
            {points.length > 0 && (
              <div>
                <p className="rp-label" style={{ marginBottom: 12 }}>{pointsLabel}</p>
                <ul className="rp-points">
                  {points.map((p, i) => (
                    <li key={i}><span>{String(i + 1).padStart(2, '0')}</span>{p}</li>
                  ))}
                </ul>
              </div>
            )}
            {showInlineQuote && quote && <blockquote className="rp-inline-quote">{quote}</blockquote>}
          </aside>
        )}
      </div>
    </Page>
  );
}

/* ── 6. Quote ────────────────────────────────────────────────────────── */
export function QuotePage({ quote, source, surface = 'panel' }: { quote: string; source: string; surface?: Surface }) {
  return (
    <Page
      kind="quote" surface={surface} fixed label="Quote"
      decor={<div className="rp-shape rp-arch" style={{ left: '50%', bottom: 0, width: '62%', height: '72%', transform: 'translateX(-50%)' }} />}
    >
      <p className="rp-quote-mark" aria-hidden="true">&ldquo;</p>
      <blockquote className="rp-quote-text" data-size={sizeTier(quote, 110, 190)}>{quote}</blockquote>
      <p className="rp-label">{source}</p>
    </Page>
  );
}

/* ── 7. Closing ──────────────────────────────────────────────────────── */
export function ClosingPage({
  carryWith, noteTitle, noteParagraphs, disclaimer, copyright, footerMeta,
}: { carryWith: string; noteTitle: string; noteParagraphs: string[]; disclaimer: string; copyright: string; footerMeta: string }) {
  return (
    <Page
      kind="closing" surface="dark" fixed label="Closing"
      decor={<div className="rp-shape rp-arch" style={{ right: '8%', top: '10%', width: '32%', height: '60%' }} />}
    >
      <div style={{ display: 'grid', gap: 24 }}>
        <Marker label="Carry this with you" />
        <blockquote className="rp-quote-text" data-size={sizeTier(carryWith, 110, 190)} style={{ maxWidth: '22ch', textAlign: 'left' }}>
          {carryWith}
        </blockquote>
      </div>
      <div className="rp-legal">
        <p className="rp-label">{noteTitle}</p>
        {noteParagraphs.map((p, i) => <p key={i} className="rp-small">{p}</p>)}
        <p className="rp-small">{disclaimer}</p>
        <p className="rp-small">{copyright} · {footerMeta}</p>
      </div>
    </Page>
  );
}

export function monthName(m: number) {
  return MONTHS[m - 1] ?? '';
}
