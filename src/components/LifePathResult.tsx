'use client';
import { motion } from 'framer-motion';
import { NUMBER_MEANINGS, PERSONAL_YEAR_THEMES } from '@/lib/numberMeanings';
import { formatBirthDate } from '@/lib/numerology';

type Props = {
  lifePath: number;
  personalYear: number;
  birthDate: string;
};

function downloadReading(lifePath: number, personalYear: number, birthDate: string) {
  const meaning = NUMBER_MEANINGS[lifePath];
  const pyMeaning = NUMBER_MEANINGS[personalYear];
  const pyTheme = PERSONAL_YEAR_THEMES[personalYear];
  const year = new Date().getFullYear();

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Life Path ${lifePath} — Life Path Numerology Calculator</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { height: 100%; }
  body {
    background: #0a0a0f; color: #f0ede8; font-family: 'DM Sans', sans-serif;
    width: 210mm; min-height: 297mm;
    padding: 14mm 16mm 12mm;
    margin: 0 auto;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
    font-size: 11px;
  }
  /* ── Header row ── */
  .header { display: flex; align-items: flex-end; gap: 20px; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 10px; }
  .number { font-family: 'Cormorant Garamond', serif; font-size: 64px; line-height: 1; color: #c9a84c; flex-shrink: 0; }
  .header-right { flex: 1; }
  .eyebrow { font-size: 8px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(201,168,76,0.65); margin-bottom: 4px; }
  .name { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 300; font-style: italic; margin-bottom: 0; }
  /* ── Hook + description ── */
  .hook { font-size: 11.5px; line-height: 1.55; color: #f0ede8; font-style: italic; margin: 9px 0 7px; border-left: 2px solid rgba(201,168,76,0.4); padding-left: 12px; }
  .description { font-size: 10.5px; line-height: 1.65; color: rgba(240,237,232,0.62); margin-bottom: 10px; }
  /* ── Strengths / Challenges ── */
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; border: 1px solid rgba(255,255,255,0.06); margin-bottom: 10px; }
  .cell { background: rgba(255,255,255,0.025); padding: 10px 14px; }
  .cell-label { font-size: 8px; letter-spacing: 0.22em; text-transform: uppercase; color: #c9a84c; margin-bottom: 6px; }
  .cell ul { list-style: none; }
  .cell li { font-size: 10.5px; color: rgba(240,237,232,0.68); padding: 1.5px 0; }
  /* ── Two-column lower section ── */
  .lower { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px; }
  /* ── Personal Year ── */
  .py-box { border: 1px solid rgba(201,168,76,0.2); background: rgba(201,168,76,0.04); }
  .py-header { display: flex; gap: 12px; align-items: flex-start; padding: 10px 12px; border-bottom: 1px solid rgba(201,168,76,0.1); }
  .py-num { font-family: 'Cormorant Garamond', serif; font-size: 32px; color: rgba(201,168,76,0.55); flex-shrink: 0; line-height: 1; }
  .py-label { font-size: 8px; letter-spacing: 0.22em; text-transform: uppercase; color: #c9a84c; margin-bottom: 3px; }
  .py-name { font-family: 'Cormorant Garamond', serif; font-size: 14px; margin-bottom: 2px; }
  .py-tagline { font-size: 9.5px; color: rgba(240,237,232,0.5); }
  .py-section { padding: 8px 12px; border-bottom: 1px solid rgba(255,255,255,0.05); }
  .py-section:last-child { border-bottom: none; }
  .py-section-label { font-size: 7.5px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(201,168,76,0.55); margin-bottom: 4px; }
  .py-section p { font-size: 10px; line-height: 1.6; color: rgba(240,237,232,0.62); }
  .py-watch p { color: rgba(201,168,76,0.65); }
  /* ── Teaser ── */
  .teaser { border: 1px solid rgba(255,255,255,0.07); background: rgba(255,255,255,0.01); }
  .teaser-header { padding: 9px 12px; border-bottom: 1px solid rgba(255,255,255,0.05); }
  .teaser-eyebrow { font-size: 8px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(201,168,76,0.5); margin-bottom: 3px; }
  .teaser-title { font-family: 'Cormorant Garamond', serif; font-size: 13px; font-weight: 300; color: #f0ede8; }
  .teaser-item { padding: 7px 12px; border-bottom: 1px solid rgba(255,255,255,0.04); }
  .teaser-item:last-child { border-bottom: none; }
  .teaser-item-label { font-size: 7.5px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(201,168,76,0.55); margin-bottom: 3px; display: flex; align-items: center; gap: 5px; }
  .teaser-item-label .lock { opacity: 0.4; font-size: 9px; }
  .teaser-item p { font-size: 10px; line-height: 1.55; color: rgba(240,237,232,0.62); }
  .teaser-item.locked p { color: rgba(240,237,232,0.3); }
  /* ── Footer ── */
  .footer { font-size: 8.5px; color: rgba(240,237,232,0.2); text-align: center; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.05); }
  @page { size: A4; margin: 0; }
  @media print {
    html, body { background: #0a0a0f !important; }
  }
</style>
</head>
<body>
  <!-- Header -->
  <div class="header">
    <div class="number">${lifePath}</div>
    <div class="header-right">
      <p class="eyebrow">Life Path Numerology Calculator &middot; Born ${formatBirthDate(birthDate)}</p>
      <div class="name">${meaning.name}</div>
    </div>
  </div>

  <!-- Hook + description -->
  <p class="hook">${meaning.hook}</p>
  <p class="description">${meaning.description}</p>

  <!-- Strengths / Challenges -->
  <div class="grid">
    <div class="cell">
      <p class="cell-label">Strengths</p>
      <ul>${meaning.strengths.map(s => `<li>${s}</li>`).join('')}</ul>
    </div>
    <div class="cell">
      <p class="cell-label">Challenges</p>
      <ul>${meaning.challenges.map(c => `<li>${c}</li>`).join('')}</ul>
    </div>
  </div>

  <!-- Two-column: Personal Year + Teaser -->
  <div class="lower">
    <!-- Personal Year -->
    <div class="py-box">
      <div class="py-header">
        <div class="py-num">${personalYear}</div>
        <div>
          <p class="py-label">Personal Year ${year}</p>
          <p class="py-name">${pyMeaning.name} &mdash; ${pyTheme?.theme ?? ''}</p>
          <p class="py-tagline">${pyMeaning.tagline}</p>
        </div>
      </div>
      <div class="py-section">
        <p class="py-section-label">What is a personal year?</p>
        <p>Your Personal Year reveals the dominant energy running through every month of ${year}. It cycles through a 9-year sequence — where your life path describes your whole journey, your personal year describes the chapter you are in <em>right now</em>.</p>
      </div>
      <div class="py-section">
        <p class="py-section-label">${year} for you</p>
        <p>${pyTheme?.focus ?? ''}</p>
      </div>
      <div class="py-section py-watch">
        <p class="py-section-label">Watch for</p>
        <p>${pyTheme?.watch ?? ''}</p>
      </div>
    </div>

    <!-- Teaser -->
    <div class="teaser">
      <div class="teaser-header">
        <p class="teaser-eyebrow">There is more</p>
        <p class="teaser-title">What your life path doesn&apos;t tell you — yet</p>
      </div>
      <div class="teaser-item">
        <p class="teaser-item-label">Your core wound</p>
        <p>${meaning.coreWound}</p>
      </div>
      <div class="teaser-item locked">
        <p class="teaser-item-label"><span class="lock">&#x1F512;</span> Life Cycles</p>
        <p>Three major cycles across your life, each with its own number — revealing what each phase asks you to master.</p>
      </div>
      <div class="teaser-item locked">
        <p class="teaser-item-label"><span class="lock">&#x1F512;</span> Pinnacles</p>
        <p>Four peak periods — each with its own theme and duration — revealing your major turning points.</p>
      </div>
      <div class="teaser-item locked">
        <p class="teaser-item-label"><span class="lock">&#x1F512;</span> Personal Months</p>
        <p>Inside Personal Year ${personalYear}, each month carries its own sub-frequency. Some will flow; others will push.</p>
      </div>
      <div class="teaser-item locked">
        <p class="teaser-item-label"><span class="lock">&#x1F512;</span> Full integration report</p>
        <p>How your life path, personal year, cycles &amp; pinnacles interact — and what that means for you now.</p>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div class="footer">
    Free life path reading &middot; lifepathnumerologycalculator.com &middot; ${year} &middot; Full report coming soon
  </div>
  <script>window.onload = function(){ window.print(); }<\/script>
</body>
</html>`;

  const win = window.open('', '_blank');
  if (!win) return;
  win.document.write(html);
  win.document.close();
}

export default function LifePathResult({ lifePath, personalYear, birthDate }: Props) {
  const meaning = NUMBER_MEANINGS[lifePath];
  const pyMeaning = NUMBER_MEANINGS[personalYear];
  const pyTheme = PERSONAL_YEAR_THEMES[personalYear];
  const isMaster = [11, 22, 33].includes(lifePath);
  const year = new Date().getFullYear();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-3xl"
    >
      {/* ── Primary result ── */}
      <div className="mb-10 text-center">
        <p className="mb-4 font-body text-sm uppercase tracking-widest text-[#c9a84c]/70">
          Born {formatBirthDate(birthDate)}
          {isMaster && <span className="ml-3 text-[#c9a84c]">· Master Number</span>}
        </p>
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mb-2 font-display text-[clamp(7rem,20vw,10rem)] leading-none text-[#c9a84c]"
          style={{ textShadow: '0 0 80px rgba(201,168,76,0.25)' }}
        >
          {lifePath}
        </motion.div>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-5 font-display text-4xl font-light italic text-[#f0ede8]"
        >
          {meaning.name}
        </motion.h2>

        {/* Viral hook */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mx-auto mb-6 max-w-xl border-l-2 border-[#c9a84c]/40 pl-5 text-left font-display text-xl font-light italic text-[#f0ede8]/90"
        >
          {meaning.hook}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mx-auto max-w-xl font-body text-lg leading-relaxed text-[#f0ede8]/65"
        >
          {meaning.description}
        </motion.p>
      </div>

      {/* ── Strengths + Challenges ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-10 grid grid-cols-1 gap-px border border-white/5 sm:grid-cols-2"
      >
        <div className="bg-white/[0.02] p-6">
          <h3 className="mb-4 font-body text-xs uppercase tracking-widest text-[#c9a84c]">
            Strengths
          </h3>
          <ul className="space-y-2">
            {meaning.strengths.map((s) => (
              <li key={s} className="font-body text-base text-[#f0ede8]/70">{s}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white/[0.02] p-6">
          <h3 className="mb-4 font-body text-xs uppercase tracking-widest text-[#c9a84c]">
            Challenges
          </h3>
          <ul className="space-y-2">
            {meaning.challenges.map((c) => (
              <li key={c} className="font-body text-base text-[#f0ede8]/70">{c}</li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* ── Personal Year — full explanation ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mb-10 border border-[#c9a84c]/20 bg-[#c9a84c]/5"
      >
        {/* Header */}
        <div className="flex items-start gap-6 border-b border-[#c9a84c]/10 p-6">
          <span className="font-display text-5xl leading-none text-[#c9a84c]/60">{personalYear}</span>
          <div>
            <p className="mb-1 font-body text-xs uppercase tracking-widest text-[#c9a84c]">
              Personal Year {year}
            </p>
            <p className="mb-1 font-display text-2xl text-[#f0ede8]">
              {pyMeaning.name} — {pyTheme?.theme}
            </p>
            <p className="font-body text-sm text-[#f0ede8]/45">{pyMeaning.tagline}</p>
          </div>
        </div>

        {/* What is a personal year */}
        <div className="border-b border-[#c9a84c]/10 px-6 py-5">
          <p className="mb-2 font-body text-xs uppercase tracking-widest text-[#c9a84c]/60">
            What is a personal year?
          </p>
          <p className="font-body text-base leading-relaxed text-[#f0ede8]/60">
            Your Personal Year number reveals the dominant energy and theme running through every
            month of {year}. It is calculated from your birth day and month combined with the
            current year — so it changes annually, cycling through a 9-year sequence. Where your
            life path number describes the whole of your journey, your personal year describes the
            specific chapter you are in <em>right now</em>.
          </p>
        </div>

        {/* This year's energy */}
        <div className="border-b border-[#c9a84c]/10 px-6 py-5">
          <p className="mb-2 font-body text-xs uppercase tracking-widest text-[#c9a84c]/60">
            {year} for you
          </p>
          <p className="font-body text-base leading-relaxed text-[#f0ede8]/70">
            {pyTheme?.focus}
          </p>
        </div>

        {/* Watch for */}
        <div className="px-6 py-5">
          <p className="mb-2 font-body text-xs uppercase tracking-widest text-[#c9a84c]/60">
            Watch for
          </p>
          <p className="font-body text-base leading-relaxed text-[#f0ede8]/60">
            {pyTheme?.watch}
          </p>
        </div>
      </motion.div>

      {/* ── Download ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        className="mb-10 flex justify-center"
      >
        <button
          onClick={() => downloadReading(lifePath, personalYear, birthDate)}
          className="group flex items-center gap-3 border border-[#c9a84c]/40 bg-transparent px-8 py-3.5 font-body text-sm uppercase tracking-widest text-[#c9a84c]/80 transition-all hover:border-[#c9a84c] hover:bg-[#c9a84c]/5 hover:text-[#c9a84c]"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
            className="transition-transform group-hover:translate-y-0.5">
            <path d="M7 1v8M7 9l-3-3M7 9l3-3M1 12h12"
              stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Download as PDF
        </button>
      </motion.div>

      {/* ── Viral teaser / Full report CTA ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
        className="border border-white/8 bg-white/[0.015]"
      >
        {/* Teaser header */}
        <div className="border-b border-white/5 px-8 py-6">
          <p className="mb-1 font-body text-xs uppercase tracking-widest text-[#c9a84c]/50">
            There is more
          </p>
          <p className="font-display text-2xl font-light text-[#f0ede8]">
            What your life path number doesn&apos;t tell you — yet
          </p>
        </div>

        {/* Locked previews */}
        <div className="divide-y divide-white/5">
          {[
            {
              label: 'Your core wound',
              preview: meaning.coreWound,
              locked: false,
            },
            {
              label: 'Life Cycles',
              preview: `Your life is divided into three major cycles, each spanning roughly 27 years. You are currently in your ${year >= 1970 && year <= 2000 ? 'second' : 'third'} cycle — and its number determines what this entire phase of your life is asking you to master.`,
              locked: true,
            },
            {
              label: 'Pinnacles',
              preview: 'Four peak periods in your life — each with its own number, theme, and duration — reveal the major turning points you will face and what they demand of you.',
              locked: true,
            },
            {
              label: 'Personal Months',
              preview: `Inside Personal Year ${personalYear}, each month carries its own sub-frequency. Some months this year will feel aligned and effortless. Others will push directly against your grain. Knowing which is which changes everything.`,
              locked: true,
            },
            {
              label: 'The integration — how it all connects',
              preview: 'Your life path, personal year, cycles, and pinnacles do not exist in isolation. The full report shows you exactly how these numbers interact — where they amplify each other, where they create friction, and what that means for the decisions in front of you right now.',
              locked: true,
            },
          ].map(({ label, preview, locked }) => (
            <div key={label} className={`relative px-8 py-5 ${locked ? 'opacity-70' : ''}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="mb-2 font-body text-xs uppercase tracking-widest text-[#c9a84c]/60">
                    {label}
                  </p>
                  <p className={`font-body text-base leading-relaxed ${locked ? 'text-[#f0ede8]/40 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_40%,rgba(0,0,0,0)_100%)]' : 'text-[#f0ede8]/70'}`}>
                    {preview}
                  </p>
                </div>
                {locked && (
                  <span className="mt-1 shrink-0">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect x="2" y="6" width="10" height="7" rx="1" stroke="rgba(201,168,76,0.4)" strokeWidth="1.2"/>
                      <path d="M4.5 6V4.5a2.5 2.5 0 0 1 5 0V6" stroke="rgba(201,168,76,0.4)" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="border-t border-white/5 px-8 py-8 text-center">
          <p className="mx-auto mb-6 max-w-md font-body text-base text-[#f0ede8]/50">
            The full report unlocks everything above — plus your Expression number, Soul Urge number,
            and a complete 2,000-word personalised analysis.
          </p>
          <button
            disabled
            className="cursor-not-allowed border border-[#c9a84c]/20 bg-transparent px-10 py-3.5 font-body text-sm uppercase tracking-widest text-[#c9a84c]/30"
          >
            Coming soon — enter your name to unlock
          </button>
          <p className="mt-3 font-body text-xs text-[#f0ede8]/20">
            Full report — $19 &middot; Phase 2
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
