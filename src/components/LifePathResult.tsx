'use client';
import { motion } from 'framer-motion';
import { NUMBER_MEANINGS } from '@/lib/numberMeanings';
import { formatBirthDate } from '@/lib/numerology';

type Props = {
  lifePath: number;
  personalYear: number;
  birthDate: string;
};

function downloadReading(lifePath: number, personalYear: number, birthDate: string) {
  const meaning = NUMBER_MEANINGS[lifePath];
  const pyMeaning = NUMBER_MEANINGS[personalYear];
  const year = new Date().getFullYear();

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Life Path ${lifePath} — YourNumerologyReport</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0a0f; color: #f0ede8; font-family: 'DM Sans', sans-serif; padding: 60px 48px; max-width: 720px; margin: 0 auto; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .eyebrow { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(201,168,76,0.7); margin-bottom: 16px; }
  .number { font-family: 'Cormorant Garamond', serif; font-size: 120px; line-height: 1; color: #c9a84c; margin-bottom: 8px; }
  .name { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 300; font-style: italic; margin-bottom: 24px; }
  .description { font-size: 16px; line-height: 1.7; color: rgba(240,237,232,0.7); margin-bottom: 40px; }
  .divider { border: none; border-top: 1px solid rgba(255,255,255,0.07); margin: 32px 0; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; border: 1px solid rgba(255,255,255,0.06); margin-bottom: 40px; }
  .cell { background: rgba(255,255,255,0.02); padding: 24px; }
  .cell-label { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #c9a84c; margin-bottom: 14px; }
  .cell ul { list-style: none; }
  .cell li { font-size: 15px; color: rgba(240,237,232,0.7); padding: 4px 0; }
  .py-box { border: 1px solid rgba(201,168,76,0.2); background: rgba(201,168,76,0.04); padding: 28px; display: flex; gap: 24px; align-items: flex-start; margin-bottom: 40px; }
  .py-num { font-family: 'Cormorant Garamond', serif; font-size: 48px; color: rgba(201,168,76,0.6); flex-shrink: 0; line-height: 1; }
  .py-label { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #c9a84c; margin-bottom: 6px; }
  .py-name { font-family: 'Cormorant Garamond', serif; font-size: 22px; margin-bottom: 8px; }
  .py-text { font-size: 14px; line-height: 1.6; color: rgba(240,237,232,0.6); }
  .footer { font-size: 12px; color: rgba(240,237,232,0.25); text-align: center; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.05); }
  @media print {
    body { background: #0a0a0f !important; color: #f0ede8 !important; }
  }
</style>
</head>
<body>
  <p class="eyebrow">YourNumerologyReport &middot; Born ${formatBirthDate(birthDate)}</p>
  <div class="number">${lifePath}</div>
  <div class="name">${meaning.name}</div>
  <p class="description">${meaning.description}</p>
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
  <div class="py-box">
    <div class="py-num">${personalYear}</div>
    <div>
      <p class="py-label">Personal Year ${year}</p>
      <p class="py-name">${pyMeaning.name}</p>
      <p class="py-text">${pyMeaning.tagline} ${pyMeaning.description.split('.')[0]}.</p>
    </div>
  </div>
  <div class="footer">
    Free life path reading &middot; yournumerologyreport.com &middot; ${year}<br>
    Full personalised report (Expression, Soul Urge &amp; 2,000-word analysis) — coming soon.
  </div>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `life-path-${lifePath}-numerology-reading.html`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function LifePathResult({ lifePath, personalYear, birthDate }: Props) {
  const meaning = NUMBER_MEANINGS[lifePath];
  const pyMeaning = NUMBER_MEANINGS[personalYear];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-3xl"
    >
      {/* Primary result */}
      <div className="mb-12 text-center">
        <p className="mb-4 font-body text-sm uppercase tracking-widest text-[#c9a84c]/70">
          Born {formatBirthDate(birthDate)}
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
          className="mb-6 font-display text-4xl font-light italic text-[#f0ede8]"
        >
          {meaning.name}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mx-auto max-w-xl font-body text-lg leading-relaxed text-[#f0ede8]/70"
        >
          {meaning.description}
        </motion.p>
      </div>

      {/* Strengths + Challenges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="mb-12 grid grid-cols-1 gap-px border border-white/5 sm:grid-cols-2"
      >
        <div className="bg-white/[0.02] p-6">
          <h3 className="mb-4 font-body text-xs uppercase tracking-widest text-[#c9a84c]">
            Strengths
          </h3>
          <ul className="space-y-2">
            {meaning.strengths.map((s) => (
              <li key={s} className="font-body text-base text-[#f0ede8]/70">
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white/[0.02] p-6">
          <h3 className="mb-4 font-body text-xs uppercase tracking-widest text-[#c9a84c]">
            Challenges
          </h3>
          <ul className="space-y-2">
            {meaning.challenges.map((c) => (
              <li key={c} className="font-body text-base text-[#f0ede8]/70">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Personal Year */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="mb-12 border border-[#c9a84c]/20 bg-[#c9a84c]/5 p-8"
      >
        <div className="flex items-start gap-6">
          <span className="font-display text-5xl text-[#c9a84c]/60">{personalYear}</span>
          <div>
            <p className="mb-1 font-body text-xs uppercase tracking-widest text-[#c9a84c]">
              Personal Year {new Date().getFullYear()}
            </p>
            <p className="mb-1 font-display text-2xl text-[#f0ede8]">{pyMeaning.name}</p>
            <p className="font-body text-base leading-relaxed text-[#f0ede8]/60">
              {pyMeaning.tagline} This year carries the energy of{' '}
              {pyMeaning.name.toLowerCase().replace('the ', '')} — a time to{' '}
              {pyMeaning.description.split('.')[0].toLowerCase().replace('you are here to ', '')}.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Download */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mb-8 flex justify-center"
      >
        <button
          onClick={() => downloadReading(lifePath, personalYear, birthDate)}
          className="group flex items-center gap-3 border border-[#c9a84c]/40 bg-transparent px-8 py-3.5 font-body text-sm uppercase tracking-widest text-[#c9a84c]/80 transition-all hover:border-[#c9a84c] hover:bg-[#c9a84c]/5 hover:text-[#c9a84c]"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="transition-transform group-hover:translate-y-0.5"
          >
            <path
              d="M7 1v8M7 9l-3-3M7 9l3-3M1 12h12"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Download your free reading
        </button>
      </motion.div>

      {/* Phase 2 CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="border border-white/5 bg-white/[0.015] p-8 text-center"
      >
        <p className="mb-2 font-body text-xs uppercase tracking-widest text-[#f0ede8]/30">
          Full personalised report
        </p>
        <p className="mb-6 font-display text-2xl text-[#f0ede8]">
          Go deeper with your complete numerology reading
        </p>
        <p className="mx-auto mb-8 max-w-md font-body text-base text-[#f0ede8]/50">
          Your Expression number, Soul Urge number, and a 2,000-word personalised report
          generated from your full name and date of birth.
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
      </motion.div>
    </motion.div>
  );
}
