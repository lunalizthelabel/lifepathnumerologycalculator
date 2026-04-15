'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { NUMBER_MEANINGS, PERSONAL_YEAR_THEMES } from '@/lib/numberMeanings';
import { formatBirthDate } from '@/lib/numerology';
import NumerologyLayer2Checkout from './NumerologyLayer2Checkout';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function loadScript(src: string, globalKey: string): Promise<any> {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof (window as any)[globalKey] !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      resolve((window as any)[globalKey]);
      return;
    }
    const s = document.createElement('script');
    s.src = src;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    s.onload = () => resolve((window as any)[globalKey]);
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

type Props = {
  lifePath: number;
  personalYear: number;
  birthDate: string;
};

async function downloadReading(lifePath: number, personalYear: number, birthDate: string) {
  const meaning = NUMBER_MEANINGS[lifePath];
  const pyMeaning = NUMBER_MEANINGS[personalYear];
  const pyTheme = PERSONAL_YEAR_THEMES[personalYear];
  const year = new Date().getFullYear();

  const css = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    .pdf-wrap {
      background: #0a0a0f; color: #f0ede8;
      font-family: 'DM Sans', 'Helvetica Neue', Arial, sans-serif;
      width: 794px; padding: 53px 60px 45px; font-size: 11px;
    }
    .header { display: flex; align-items: flex-end; gap: 20px; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 10px; }
    .lp-number { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 64px; line-height: 1; color: #c9a84c; flex-shrink: 0; }
    .header-right { flex: 1; }
    .eyebrow { font-size: 8px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(201,168,76,0.65); margin-bottom: 4px; }
    .lp-name { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 22px; font-weight: 300; font-style: italic; margin-bottom: 2px; }
    .tagline { font-size: 9.5px; color: rgba(240,237,232,0.45); letter-spacing: 0.04em; }
    .hook { font-size: 11.5px; line-height: 1.55; color: #f0ede8; font-style: italic; margin: 9px 0 7px; border-left: 2px solid rgba(201,168,76,0.4); padding-left: 12px; }
    .description { font-size: 10.5px; line-height: 1.65; color: rgba(240,237,232,0.62); margin-bottom: 10px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; border: 1px solid rgba(255,255,255,0.06); margin-bottom: 10px; }
    .cell { background: rgba(255,255,255,0.025); padding: 10px 14px; }
    .cell-label { font-size: 8px; letter-spacing: 0.22em; text-transform: uppercase; color: #c9a84c; margin-bottom: 6px; }
    .cell ul { list-style: none; }
    .cell li { font-size: 10.5px; color: rgba(240,237,232,0.68); padding: 1.5px 0; }
    .lower { margin-bottom: 10px; }
    .py-box { border: 1px solid rgba(201,168,76,0.2); background: rgba(201,168,76,0.04); }
    .py-header { display: flex; gap: 12px; align-items: flex-start; padding: 10px 12px; border-bottom: 1px solid rgba(201,168,76,0.1); }
    .py-num { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 32px; color: rgba(201,168,76,0.55); flex-shrink: 0; line-height: 1; }
    .py-label { font-size: 8px; letter-spacing: 0.22em; text-transform: uppercase; color: #c9a84c; margin-bottom: 3px; }
    .py-name { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 14px; margin-bottom: 2px; }
    .py-tagline { font-size: 9.5px; color: rgba(240,237,232,0.5); }
    .py-section { padding: 8px 12px; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .py-section:last-child { border-bottom: none; }
    .py-section-label { font-size: 7.5px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(201,168,76,0.55); margin-bottom: 4px; }
    .py-section p { font-size: 10px; line-height: 1.6; color: rgba(240,237,232,0.62); }
    .py-watch p { color: rgba(201,168,76,0.65); }
    .footer { font-size: 8.5px; color: rgba(240,237,232,0.2); text-align: center; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.05); }
  `;

  const bodyHtml = `
    <div class="header">
      <div class="lp-number">${lifePath}</div>
      <div class="header-right">
        <p class="eyebrow">Life Path Numerology Calculator &middot; Born ${formatBirthDate(birthDate)}</p>
        <div class="lp-name">${meaning.name}</div>
        <div class="tagline">${meaning.tagline}</div>
      </div>
    </div>
    <p class="hook">${meaning.hook}</p>
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
    <div class="lower">
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
          <p>Your Personal Year reveals the dominant energy running through every month of ${year}. It cycles through a 9-year sequence &mdash; where your life path describes your whole journey, your personal year describes the chapter you are in right now.</p>
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
    </div>
    <div class="footer">
      Free life path reading &middot; lifepathnumerologycalculator.com &middot; ${year}
    </div>
  `;

  const wrapper = document.createElement('div');
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  const content = document.createElement('div');
  content.className = 'pdf-wrap';
  content.innerHTML = bodyHtml;
  wrapper.style.cssText = 'position:absolute;top:0;left:0;opacity:0;pointer-events:none;z-index:-1;overflow:hidden;width:794px;';
  wrapper.appendChild(styleEl);
  wrapper.appendChild(content);
  document.body.appendChild(wrapper);
  await document.fonts.ready;

  const [html2canvas, { jsPDF }] = await Promise.all([
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js', 'html2canvas'),
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js', 'jspdf').then(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (jspdf: any) => ({ jsPDF: jspdf.jsPDF })
    ),
  ]);

  const canvas = await html2canvas(content, {
    scale: 2, useCORS: true, backgroundColor: '#0a0a0f',
    logging: false, width: 794, windowWidth: 794,
  });

  document.body.removeChild(wrapper);

  const imgData = canvas.toDataURL('image/jpeg', 0.97);
  const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  pdf.setFillColor(10, 10, 15);
  pdf.rect(0, 0, pageW, pageH, 'F');
  const imgH = (canvas.height * pageW) / canvas.width;
  if (imgH <= pageH) {
    pdf.addImage(imgData, 'JPEG', 0, 0, pageW, imgH);
  } else {
    pdf.addImage(imgData, 'JPEG', 0, 0, pageW, pageH);
  }
  pdf.save(`life-path-${lifePath}-numerology-reading.pdf`);
}

// Reusable divider
function Divider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '0 0 32px' }}>
      <div style={{ flex: 1, height: 1, background: 'var(--color-border)' }} />
      <div style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--color-accent)' }} />
      <div style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--color-accent)', opacity: 0.35 }} />
      <div style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--color-accent)', opacity: 0.15 }} />
      <div style={{ flex: 1, height: 1, background: 'var(--color-border)' }} />
    </div>
  );
}

export default function LifePathResult({ lifePath, personalYear, birthDate }: Props) {
  const [downloading, setDownloading] = useState(false);
  const meaning = NUMBER_MEANINGS[lifePath];
  const pyMeaning = NUMBER_MEANINGS[personalYear];
  const pyTheme = PERSONAL_YEAR_THEMES[personalYear];
  const isMaster = [11, 22, 33].includes(lifePath);
  const year = new Date().getFullYear();

  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      await downloadReading(lifePath, personalYear, birthDate);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-3xl"
    >
      {/* ── Primary result ── */}
      <div className="mb-10 text-center">
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 16, fontWeight: 400 }}>
          Born {formatBirthDate(birthDate)}
          {isMaster && <span style={{ marginLeft: 12 }}> · Master Number</span>}
        </p>
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(7rem, 20vw, 10rem)', lineHeight: 1, color: 'var(--color-accent)', marginBottom: 8 }}
        >
          {lifePath}
        </motion.div>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 300, fontStyle: 'italic', color: 'var(--color-ink)', marginBottom: 24 }}
        >
          {meaning.name}
        </motion.h2>

        {/* Hook callout */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, fontWeight: 300, fontStyle: 'italic', color: 'var(--color-accent-deep)', borderLeft: '2px solid var(--color-accent)', paddingLeft: 20, textAlign: 'left', maxWidth: 560, margin: '0 auto 24px', lineHeight: 1.75 }}
        >
          {meaning.hook}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 300, lineHeight: 1.85, color: 'var(--color-body)', maxWidth: 560, margin: '0 auto' }}
        >
          {meaning.description}
        </motion.p>
      </div>

      {/* ── Strengths + Challenges ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-10 grid grid-cols-1 sm:grid-cols-2"
        style={{ border: '1px solid var(--color-border)', gap: 1, background: 'var(--color-border)' }}
      >
        <div style={{ background: 'var(--color-bg-raised)', padding: 24 }}>
          <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 16 }}>
            Strengths
          </h3>
          <ul className="space-y-2">
            {meaning.strengths.map((s) => (
              <li key={s} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 300, color: 'var(--color-body)' }}>{s}</li>
            ))}
          </ul>
        </div>
        <div style={{ background: 'var(--color-bg-raised)', padding: 24 }}>
          <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 16 }}>
            Challenges
          </h3>
          <ul className="space-y-2">
            {meaning.challenges.map((c) => (
              <li key={c} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 300, color: 'var(--color-body)' }}>{c}</li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* ── Personal Year ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mb-10"
        style={{ border: '1px solid var(--color-border)', background: 'var(--color-bg-raised)' }}
      >
        <div className="flex items-start gap-6 p-6" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, lineHeight: 1, color: 'var(--color-accent)', opacity: 0.6 }}>{personalYear}</span>
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 6, fontWeight: 400 }}>
              Personal Year {year}
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 300, color: 'var(--color-ink)', marginBottom: 4 }}>
              {pyMeaning.name} — {pyTheme?.theme}
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 300, color: 'var(--color-faint)' }}>{pyMeaning.tagline}</p>
          </div>
        </div>
        {[
          { label: 'What is a personal year?', text: `Your Personal Year number reveals the dominant energy and theme running through every month of ${year}. It is calculated from your birth day and month combined with the current year — so it changes annually, cycling through a 9-year sequence. Where your life path number describes the whole of your journey, your personal year describes the specific chapter you are in right now.` },
          { label: `${year} for you`, text: pyTheme?.focus ?? '' },
          { label: 'Watch for', text: pyTheme?.watch ?? '' },
        ].map(({ label, text }, i, arr) => (
          <div key={label} className="px-6 py-5" style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--color-accent)', opacity: 0.6, marginBottom: 8, fontWeight: 400 }}>
              {label}
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 300, lineHeight: 1.85, color: 'var(--color-body)' }}>
              {text}
            </p>
          </div>
        ))}
      </motion.div>

      {/* ── Download ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        className="mb-10 flex justify-center"
      >
        <button
          onClick={handleDownload}
          disabled={downloading}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'transparent',
            border: '1px solid var(--color-border)',
            color: 'var(--color-muted)',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase',
            padding: '12px 28px', borderRadius: 0, cursor: downloading ? 'wait' : 'pointer',
            fontWeight: 400, transition: 'all 0.2s', opacity: downloading ? 0.5 : 1,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-accent)';
            (e.currentTarget as HTMLElement).style.color = 'var(--color-accent)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
            (e.currentTarget as HTMLElement).style.color = 'var(--color-muted)';
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v8M7 9l-3-3M7 9l3-3M1 12h12"
              stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {downloading ? 'Generating PDF…' : 'Download as PDF'}
        </button>
      </motion.div>

      {/* ── Disclaimer ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mb-10 text-center"
        style={{ borderTop: '1px solid var(--color-border)', paddingTop: 24 }}
      >
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 300, lineHeight: 1.8, color: 'var(--color-disclaimer)', maxWidth: 520, margin: '0 auto 8px' }}>
          This report is provided for entertainment and personal self-reflection purposes only.
          Numerology is a centuries-old symbolic tradition and is not a science. Nothing in this
          report constitutes medical, psychological, financial, or legal advice. Results are based
          on numerological interpretation and should not be used as the basis for any life decision.
          Individual results may vary. You remain solely responsible for any decisions you make.
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 300, color: 'var(--color-border)' }}>
          &copy; Life Path Numerology Calculator — for personal use only.
        </p>
      </motion.div>

      {/* ── Full report upsell ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
      >
        {/* Hook */}
        <div className="mb-px text-center px-8 py-7" style={{ border: '1px solid var(--color-border)', background: 'var(--color-bg-muted)' }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '5px', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 12, fontWeight: 400 }}>
            What you just received
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 300, fontStyle: 'italic', color: 'var(--color-ink)', marginBottom: 8 }}>
            Your Life Path {lifePath} — the <em>foundation</em>.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, lineHeight: 1.65, color: 'var(--color-muted)', maxWidth: 420, margin: '0 auto' }}>
            It describes the shape of your journey. But it cannot tell you where you are <em>right now</em>,
            what is coming, or why this specific year feels the way it does.
          </p>
        </div>

        {/* Divider with label */}
        <div className="flex items-center gap-4 py-6">
          <div style={{ flex: 1, height: 1, background: 'var(--color-border)' }} />
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '5px', textTransform: 'uppercase', color: 'var(--color-accent)', fontWeight: 400 }}>The full picture</p>
          <div style={{ flex: 1, height: 1, background: 'var(--color-border)' }} />
        </div>

        {/* Benefit cards */}
        <div className="mb-px" style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--color-border)' }}>
          {[
            { number: '01', title: 'Your Birthday Number', body: `Day 24 is not the same as day 6 — even if both reduce to 6. Your Birthday Number is the specific flavour of your gifts: how your strengths actually show up in the world, and what you are here to develop in this lifetime.`, tag: 'CORE GIFT' },
            { number: '02', title: 'Your Active Life Cycle', body: `Life unfolds in three major cycles, each roughly 27 years long. The cycle you are in now has its own number — and it determines the dominant theme, challenge, and opportunity of this entire phase of your life. Not in the abstract. Right now.`, tag: 'ACTIVE PHASE' },
            { number: '03', title: 'Your Current Pinnacle', body: `Four peak periods overlay your life like weather systems. Your active Pinnacle is the atmosphere you are living inside — the external conditions shaping what is easy, what resists, and what is asking to be built. If you are near a transition, the report will tell you.`, tag: 'BACKGROUND CLIMATE' },
            { number: '04', title: `Personal Month Breakdown — all 12 months of ${year}`, body: `Inside Personal Year ${personalYear}, each month carries a distinct sub-frequency. Some months this year are designed for action. Others for rest, reflection, or course correction. The full report maps every month so you stop fighting the tide and start moving with it.`, tag: 'THIS MONTH & BEYOND' },
            { number: '05', title: 'How It All Connects', body: `This is what separates a real reading from a generic one. Your Life Path, Birthday Number, active Cycle, Pinnacle, Personal Year, and Personal Month all interact. Where they amplify each other, the report shows you the open doors. Where they create friction, it shows you why — and what to do about it.`, tag: 'SYNTHESIS' },
          ].map(({ number, title, body, tag }) => (
            <div key={number} style={{ background: 'var(--color-bg-raised)' }}>
              <div className="flex items-baseline gap-4 px-6 py-3" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-muted)' }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, color: 'var(--color-accent)', letterSpacing: '2px', opacity: 0.6 }}>{number}</span>
                <span style={{ flex: 1, fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 400, color: 'var(--color-ink)' }}>{title}</span>
                <span className="hidden sm:block" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-accent)', opacity: 0.5 }}>{tag}</span>
              </div>
              <p className="px-6 py-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 300, lineHeight: 1.8, color: 'var(--color-muted)' }}>
                {body}
              </p>
            </div>
          ))}
        </div>

        {/* Social proof */}
        <div className="mb-px flex items-center justify-center py-4" style={{ border: '1px solid var(--color-border)' }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 300, color: 'var(--color-faint)', letterSpacing: '0.05em' }}>
            2,000+ words &middot; Personalised to your exact birth date &middot; Ready in under 60 seconds
          </p>
        </div>

        {/* CTA block */}
        <div className="px-8 py-8" style={{ border: '1px solid var(--color-accent)', background: 'var(--color-accent-soft)' }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 300, fontStyle: 'italic', color: 'var(--color-ink)', textAlign: 'center', maxWidth: 480, margin: '0 auto 6px', lineHeight: 1.6 }}>
            &ldquo;Most people spend years feeling slightly out of sync with their own life.
            Usually, the numbers explain exactly why.&rdquo;
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 300, color: 'var(--color-faint)', textAlign: 'center', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 28 }}>
            — from 2,300 readings
          </p>

          {/* Coming soon placeholder */}
          <div style={{ opacity: 0.45, pointerEvents: 'none' }}>
            <div style={{ background: 'var(--color-bg-muted)', border: '1px solid var(--color-border)', padding: '12px 16px', marginBottom: 16, fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 300, color: 'var(--color-faint)' }}>
              Your email address
            </div>
            <div style={{ background: 'var(--color-bg-muted)', border: '1px solid var(--color-border)', padding: '14px 32px', textAlign: 'center', fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--color-faint)', fontWeight: 400 }}>
              Coming Soon
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
