'use client';
import { useEffect, useRef, useState, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { NUMBER_MEANINGS, PERSONAL_YEAR_THEMES } from '@/lib/numberMeanings';
import { formatBirthDate } from '@/lib/numerology';
import NumerologyLayer2Checkout from './NumerologyLayer2Checkout';
import SampleCarousel from './report/SampleCarousel';

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

// Shared copy so the on-screen result and the PDF always say the same thing.
function personalYearIntro(year: number) {
  return `Your Personal Year number reveals the dominant energy and theme running through every month of ${year}. It is calculated from your birth day and month combined with the current year, so it changes annually, cycling through a 9-year sequence. Where your life path number describes the whole of your journey, your personal year describes the specific chapter you are in right now.`;
}

const DISCLAIMER =
  'This report is provided for entertainment and personal self-reflection purposes only. Numerology is a centuries-old symbolic tradition and is not a science. Nothing in this report constitutes medical, psychological, financial, or legal advice. Results are based on numerological interpretation and should not be used as the basis for any life decision. Individual results may vary. You remain solely responsible for any decisions you make.';

// PDF palette mirrors the site's design tokens in globals.css.
const PDF_BG = '#F7F4EF';

async function downloadReading(lifePath: number, personalYear: number, birthDate: string) {
  const meaning = NUMBER_MEANINGS[lifePath];
  const pyMeaning = NUMBER_MEANINGS[personalYear];
  const pyTheme = PERSONAL_YEAR_THEMES[personalYear];
  const isMaster = [11, 22, 33].includes(lifePath);
  const year = new Date().getFullYear();

  const css = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    .pdf-wrap {
      --bg: #F7F4EF; --raised: #FDFAF6; --muted-bg: #EDE7DE; --border: #DDD5C8;
      --ink: #1E1A16; --body: #3A3028; --muted: #6B5F52; --faint: #9B8E82; --disclaimer: #A89E94;
      --accent: #C17F5A; --accent-deep: #8B5A3A;
      background: var(--bg); color: var(--body);
      width: 794px; padding: 40px 60px 28px;
    }
    .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
    .sans  { font-family: 'DM Sans', 'Helvetica Neue', Arial, sans-serif; }
    .label { font-family: 'DM Sans', 'Helvetica Neue', Arial, sans-serif; font-size: 8.5px; letter-spacing: 3px; text-transform: uppercase; color: var(--accent); font-weight: 400; }

    .top { text-align: center; margin-bottom: 14px; }
    .born { margin-bottom: 8px; letter-spacing: 4px; }
    .lp-number { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 80px; line-height: 1; color: var(--accent); }
    .lp-name { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 30px; font-weight: 400; font-style: italic; color: var(--ink); margin: 4px 0 4px; }
    .tagline { font-family: 'DM Sans', sans-serif; font-size: 11px; color: var(--faint); margin-bottom: 14px; }
    .hook { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 16px; font-style: italic; font-weight: 400; color: var(--accent-deep); border-left: 2px solid var(--accent); padding-left: 16px; text-align: left; max-width: 560px; margin: 0 auto 14px; line-height: 1.6; }
    .description { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 14.5px; font-weight: 400; line-height: 1.65; color: var(--body); max-width: 560px; margin: 0 auto; text-align: center; }

    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--border); border: 1px solid var(--border); margin-bottom: 16px; }
    .cell { background: var(--raised); padding: 14px 20px; }
    .cell .label { margin-bottom: 10px; }
    .cell ul { list-style: none; }
    .cell li { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 14px; font-weight: 400; color: var(--body); padding: 2px 0; }

    .py-box { border: 1px solid var(--border); background: var(--raised); margin-bottom: 16px; }
    .py-header { display: flex; gap: 20px; align-items: flex-start; padding: 16px 20px; border-bottom: 1px solid var(--border); }
    .py-num { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 40px; line-height: 1; color: var(--accent); opacity: 0.7; flex-shrink: 0; }
    .py-header .label { margin-bottom: 4px; }
    .py-name { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 18px; font-weight: 400; color: var(--ink); margin-bottom: 2px; }
    .py-tagline { font-family: 'DM Sans', sans-serif; font-size: 10.5px; color: var(--faint); }
    .py-section { padding: 10px 20px; border-bottom: 1px solid var(--border); }
    .py-section:last-child { border-bottom: none; }
    .py-section .label { opacity: 0.75; margin-bottom: 5px; }
    .py-section p.text { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 13.5px; font-weight: 400; line-height: 1.6; color: var(--body); }

    .disclaimer { border-top: 1px solid var(--border); padding-top: 14px; text-align: center; }
    .disclaimer p { font-family: 'DM Sans', sans-serif; font-size: 8.5px; font-weight: 400; line-height: 1.7; color: var(--disclaimer); max-width: 560px; margin: 0 auto 6px; }
    .disclaimer .site { color: var(--faint); letter-spacing: 0.04em; }
  `;

  const bodyHtml = `
    <div class="top">
      <p class="label born">Born ${formatBirthDate(birthDate)}${isMaster ? ' &middot; Master Number' : ''}</p>
      <div class="lp-number">${lifePath}</div>
      <div class="lp-name">${meaning.name}</div>
      <div class="tagline">${meaning.tagline}</div>
      <p class="hook">${meaning.hook}</p>
      <p class="description">${meaning.description}</p>
    </div>
    <div class="grid">
      <div class="cell">
        <p class="label">Strengths</p>
        <ul>${meaning.strengths.map(s => `<li>${s}</li>`).join('')}</ul>
      </div>
      <div class="cell">
        <p class="label">Challenges</p>
        <ul>${meaning.challenges.map(c => `<li>${c}</li>`).join('')}</ul>
      </div>
    </div>
    <div class="py-box">
      <div class="py-header">
        <div class="py-num">${personalYear}</div>
        <div>
          <p class="label">Personal Year ${year}</p>
          <p class="py-name">${pyMeaning.name}: ${pyTheme?.theme ?? ''}</p>
          <p class="py-tagline">${pyMeaning.tagline}</p>
        </div>
      </div>
      <div class="py-section">
        <p class="label">What is a personal year?</p>
        <p class="text">${personalYearIntro(year)}</p>
      </div>
      <div class="py-section">
        <p class="label">${year} for you</p>
        <p class="text">${pyTheme?.focus ?? ''}</p>
      </div>
      <div class="py-section">
        <p class="label">Watch for</p>
        <p class="text">${pyTheme?.watch ?? ''}</p>
      </div>
    </div>
    <div class="disclaimer">
      <p>${DISCLAIMER}</p>
      <p class="site">Free life path reading &middot; lifepathnumerologycalculator.com &middot; ${year}</p>
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

  try {
    const [html2canvas, { jsPDF }] = await Promise.all([
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js', 'html2canvas'),
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js', 'jspdf').then(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (jspdf: any) => ({ jsPDF: jspdf.jsPDF })
      ),
    ]);

    const canvas = await html2canvas(content, {
      scale: 2, useCORS: true, backgroundColor: PDF_BG,
      logging: false, width: 794, windowWidth: 794,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    pdf.setFillColor(247, 244, 239); // --color-bg
    pdf.rect(0, 0, pageW, pageH, 'F');

    // Fit on one A4 page without distortion: shrink proportionally if too tall.
    let w = pageW;
    let h = (canvas.height * pageW) / canvas.width;
    if (h > pageH) {
      w = (w * pageH) / h;
      h = pageH;
    }
    pdf.addImage(imgData, 'JPEG', (pageW - w) / 2, 0, w, h);
    pdf.save(`life-path-${lifePath}-numerology-reading.pdf`);
  } finally {
    document.body.removeChild(wrapper);
  }
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

const PRICE = process.env.NEXT_PUBLIC_LAYER2_PRICE_DISPLAY || '$11';

/** Scroll to the order form and put the cursor in the email field. */
function goToOrderForm(e?: { preventDefault: () => void }) {
  e?.preventDefault();
  const box = document.getElementById('full-report');
  if (!box) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  box.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  box.querySelector<HTMLInputElement>('input[type="email"]')?.focus({ preventScroll: true });
}

function LockIcon() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 4, color: 'var(--color-accent)' }}>
      <rect x="1.5" y="7" width="11" height="8" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4 7V4.5a3 3 0 0 1 6 0V7" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function Chevron() {
  return (
    <svg className="lp-details-icon" width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden="true">
      <path d="M1 1l6 6 6-6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Fixed call to action. Shows once the life path result has scrolled off the top,
 * hides while the order form is on screen. Position is fixed, so it never moves the page.
 */
function StickyReportBar({ resultRef }: { resultRef: RefObject<HTMLDivElement | null> }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const result = resultRef.current;
    const form = document.getElementById('full-report');
    if (!result || !form) return;
    let passed = false;
    let formInView = false;
    const update = () => setVisible(passed && !formInView);
    const resultObserver = new IntersectionObserver(([entry]) => {
      passed = !entry.isIntersecting && entry.boundingClientRect.bottom <= 0;
      update();
    });
    const formObserver = new IntersectionObserver(([entry]) => {
      formInView = entry.isIntersecting;
      update();
    });
    resultObserver.observe(result);
    formObserver.observe(form);
    return () => {
      resultObserver.disconnect();
      formObserver.disconnect();
    };
  }, [resultRef]);

  // The result only renders in the browser, after a calculation.
  if (typeof document === 'undefined') return null;
  return createPortal(
    <div className="lp-sticky-cta" data-visible={visible}>
      <a href="#full-report" onClick={goToOrderForm}>
        Get my full report &middot; {PRICE}
      </a>
    </div>,
    document.body,
  );
}

export default function LifePathResult({ lifePath, personalYear, birthDate }: Props) {
  const [downloading, setDownloading] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
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
      <div ref={resultRef} className="mb-10 text-center">
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'var(--fs-10)', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 16, fontWeight: 'var(--fw-400)' }}>
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
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 'var(--fw-400)', fontStyle: 'italic', color: 'var(--color-ink)', marginBottom: 24 }}
        >
          {meaning.name}
        </motion.h2>

        {/* Hook callout */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'var(--fs-19)', fontWeight: 'var(--fw-400)', fontStyle: 'italic', color: 'var(--color-accent-deep)', borderLeft: '2px solid var(--color-accent)', paddingLeft: 20, textAlign: 'left', maxWidth: 560, margin: '0 auto 24px', lineHeight: 1.75 }}
        >
          {meaning.hook}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'var(--fs-17)', fontWeight: 'var(--fw-400)', lineHeight: 1.85, color: 'var(--color-body)', maxWidth: 560, margin: '0 auto' }}
        >
          {meaning.description}
        </motion.p>
      </div>

      {/* ── Strengths + Challenges ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-10 grid grid-cols-2"
        style={{ border: '1px solid var(--color-border)', gap: 1, background: 'var(--color-border)' }}
      >
        <div className="p-4 sm:p-6" style={{ background: 'var(--color-bg-raised)' }}>
          <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'var(--fs-9)', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 16 }}>
            Strengths
          </h3>
          <ul className="space-y-2">
            {meaning.strengths.map((s) => (
              <li key={s} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'var(--fs-16)', fontWeight: 'var(--fw-400)', color: 'var(--color-body)' }}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="p-4 sm:p-6" style={{ background: 'var(--color-bg-raised)' }}>
          <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'var(--fs-9)', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 16 }}>
            Challenges
          </h3>
          <ul className="space-y-2">
            {meaning.challenges.map((c) => (
              <li key={c} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'var(--fs-16)', fontWeight: 'var(--fw-400)', color: 'var(--color-body)' }}>{c}</li>
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
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'var(--fs-48)', lineHeight: 1, color: 'var(--color-accent)', opacity: 0.6 }}>{personalYear}</span>
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'var(--fs-9)', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 6, fontWeight: 'var(--fw-400)' }}>
              Personal Year {year}
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'var(--fs-22)', fontWeight: 'var(--fw-400)', color: 'var(--color-ink)', marginBottom: 4 }}>
              {pyMeaning.name}: {pyTheme?.theme}
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'var(--fs-12)', fontWeight: 'var(--fw-400)', color: 'var(--color-faint)' }}>{pyMeaning.tagline}</p>
          </div>
        </div>
        <div className="px-6 py-5">
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'var(--fs-9)', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--color-accent)', opacity: 0.6, marginBottom: 8, fontWeight: 'var(--fw-400)' }}>
            {year} for you
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'var(--fs-17)', fontWeight: 'var(--fw-400)', lineHeight: 1.85, color: 'var(--color-body)' }}>
            {pyTheme?.focus ?? ''}
          </p>
        </div>
        <details className="lp-details" style={{ borderTop: '1px solid var(--color-border)' }}>
          <summary className="px-6 py-4" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'var(--fs-12)', fontWeight: 'var(--fw-500)', color: 'var(--color-accent-deep)' }}>
            More about your personal year
            <Chevron />
          </summary>
          {[
            { label: 'What is a personal year?', text: personalYearIntro(year) },
            { label: 'Watch for', text: pyTheme?.watch ?? '' },
          ].map(({ label, text }) => (
            <div key={label} className="px-6 py-5" style={{ borderTop: '1px solid var(--color-border)' }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'var(--fs-9)', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--color-accent)', opacity: 0.6, marginBottom: 8, fontWeight: 'var(--fw-400)' }}>
                {label}
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'var(--fs-17)', fontWeight: 'var(--fw-400)', lineHeight: 1.85, color: 'var(--color-body)' }}>
                {text}
              </p>
            </div>
          ))}
        </details>
      </motion.div>

      {/* ── Full report: short teaser, then the order form ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
      >
        <div className="mb-6" style={{ border: '1px solid var(--color-border)', background: 'var(--color-bg-raised)' }}>
          <div className="px-6 pt-6 text-center">
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'var(--fs-9)', letterSpacing: '5px', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 10, fontWeight: 'var(--fw-400)' }}>
              Your full picture
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'var(--fs-20)', fontWeight: 'var(--fw-400)', fontStyle: 'italic', lineHeight: 1.4, color: 'var(--color-ink)' }}>
              Your Life Path {lifePath} is the foundation. It cannot tell you where you are right now.
            </p>
          </div>
          <ul className="px-6 py-5" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { title: 'Your Birthday Number', line: 'The specific flavour of your gifts: how your strengths actually show up in the world.' },
              { title: 'Your Life Cycle and Pinnacle', line: 'The phase of life you are in now, and the conditions shaping what is easy and what resists.' },
              { title: 'This month, and how it all connects', line: 'Where your numbers amplify each other, where they create friction, and why.' },
            ].map(({ title, line }) => (
              <li key={title} className="flex gap-3">
                <LockIcon />
                <span>
                  <span className="sr-only">In the full report: </span>
                  <span style={{ display: 'block', fontFamily: "'Cormorant Garamond', serif", fontSize: 'var(--fs-18)', fontWeight: 'var(--fw-500)', lineHeight: 1.3, color: 'var(--color-ink)' }}>{title}</span>
                  <span style={{ display: 'block', fontFamily: "'DM Sans', sans-serif", fontSize: 'var(--fs-13)', fontWeight: 'var(--fw-400)', lineHeight: 1.5, color: 'var(--color-muted)' }}>{line}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div id="full-report" className="mb-6 px-6 py-10 sm:px-8" style={{ border: '1px solid var(--color-accent)', background: 'var(--color-accent-soft)', scrollMarginTop: 84 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'var(--fs-10)', fontWeight: 'var(--fw-500)', color: 'var(--color-accent-deep)', textAlign: 'center', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: 12 }}>
            Order here
          </p>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'var(--fs-30)', fontWeight: 'var(--fw-500)', color: 'var(--color-ink)', textAlign: 'center', lineHeight: 1.2, marginBottom: 12 }}>
            Your Full Numerology Report
          </h3>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'var(--fs-14)', fontWeight: 'var(--fw-400)', lineHeight: 1.65, color: 'var(--color-muted)', textAlign: 'center', maxWidth: 440, margin: '0 auto 28px' }}>
            A personal report of about 20 pages, written for your birth date. Enter your email below,
            pay securely, and read it online or download it as a PDF about 2 minutes later.
          </p>

          <div style={{ marginBottom: 28 }}>
            <SampleCarousel compact />
          </div>

          <NumerologyLayer2Checkout birthDate={birthDate} lifePath={lifePath} personalYear={personalYear} />
        </div>

        {/* ── The long version, for those who want it ── */}
        <details className="lp-details mb-10" style={{ border: '1px solid var(--color-border)', background: 'var(--color-bg-raised)' }}>
          <summary className="px-6 py-5" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'var(--fs-20)', fontWeight: 'var(--fw-500)', color: 'var(--color-ink)' }}>
            What&rsquo;s inside the report
            <Chevron />
          </summary>
          <div style={{ borderTop: '1px solid var(--color-border)' }}>
        {/* Hook */}
        <div className="mb-px text-center px-8 py-7" style={{ border: '1px solid var(--color-border)', background: 'var(--color-bg-muted)' }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'var(--fs-9)', letterSpacing: '5px', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 12, fontWeight: 'var(--fw-400)' }}>
            What you just received
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'var(--fs-20)', fontWeight: 'var(--fw-400)', fontStyle: 'italic', color: 'var(--color-ink)', marginBottom: 8 }}>
            Your Life Path {lifePath}: the <em>foundation</em>.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'var(--fs-13)', fontWeight: 'var(--fw-400)', lineHeight: 1.65, color: 'var(--color-muted)', maxWidth: 420, margin: '0 auto' }}>
            It describes the shape of your journey. But it cannot tell you where you are <em>right now</em>,
            what is coming, or why this specific year feels the way it does.
          </p>
        </div>


        {/* Benefit cards */}
        <div className="mb-px" style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--color-border)' }}>
          {[
            { number: '01', title: 'Your Birthday Number', body: `Day 24 is not the same as day 6, even if both reduce to 6. Your Birthday Number is the specific flavour of your gifts: how your strengths actually show up in the world, and what you are here to develop in this lifetime.`, tag: 'CORE GIFT' },
            { number: '02', title: 'Your Active Life Cycle', body: `Life unfolds in three major cycles, each roughly 27 years long. The cycle you are in now has its own number, and it determines the dominant theme, challenge, and opportunity of this entire phase of your life. Not in the abstract. Right now.`, tag: 'ACTIVE PHASE' },
            { number: '03', title: 'Your Current Pinnacle', body: `Four peak periods overlay your life like weather systems. Your active Pinnacle is the atmosphere you are living inside: the external conditions shaping what is easy, what resists, and what is asking to be built. If you are near a transition, the report will tell you.`, tag: 'BACKGROUND CLIMATE' },
            { number: '04', title: 'Your Personal Month', body: `Inside Personal Year ${personalYear}, each month carries a distinct sub-frequency. Some months are designed for action. Others for rest, reflection, or course correction. The full report reads the month you are in now, so you stop fighting the tide and start moving with it.`, tag: 'THIS MONTH' },
            { number: '05', title: 'How It All Connects', body: `This is what separates a real reading from a generic one. Your Life Path, Birthday Number, active Cycle, Pinnacle, Personal Year, and Personal Month all interact. Where they amplify each other, the report shows you the open doors. Where they create friction, it shows you why, and what to do about it.`, tag: 'SYNTHESIS' },
          ].map(({ number, title, body, tag }) => (
            <div key={number} style={{ background: 'var(--color-bg-raised)' }}>
              <div className="flex items-baseline gap-4 px-6 py-3" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-muted)' }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'var(--fs-11)', color: 'var(--color-accent)', letterSpacing: '2px', opacity: 0.6 }}>{number}</span>
                <span style={{ flex: 1, fontFamily: "'Cormorant Garamond', serif", fontSize: 'var(--fs-17)', fontWeight: 'var(--fw-400)', color: 'var(--color-ink)' }}>{title}</span>
                <span className="hidden sm:block" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'var(--fs-9)', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-accent)', opacity: 0.5 }}>{tag}</span>
              </div>
              <p className="px-6 py-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'var(--fs-16)', fontWeight: 'var(--fw-400)', lineHeight: 1.8, color: 'var(--color-muted)' }}>
                {body}
              </p>
            </div>
          ))}
        </div>


        {/* Social proof */}
        <div className="mb-px flex items-center justify-center px-5 py-4 text-center" style={{ border: '1px solid var(--color-border)' }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'var(--fs-11)', fontWeight: 'var(--fw-400)', color: 'var(--color-faint)', letterSpacing: '0.05em' }}>
            2,000+ words &middot; Personalised to your exact birth date &middot; Ready in about 2 minutes
          </p>
        </div>


        {/* Quote */}
        <div className="mb-px px-8 py-7" style={{ border: '1px solid var(--color-border)' }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'var(--fs-20)', fontWeight: 'var(--fw-400)', fontStyle: 'italic', color: 'var(--color-ink)', textAlign: 'center', maxWidth: 480, margin: '0 auto 6px', lineHeight: 1.6 }}>
            &ldquo;Most people spend years feeling slightly out of sync with their own life.
            Usually, the numbers explain exactly why.&rdquo;
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'var(--fs-10)', fontWeight: 'var(--fw-400)', color: 'var(--color-faint)', textAlign: 'center', letterSpacing: '3px', textTransform: 'uppercase' }}>
            From 2,300 readings
          </p>
        </div>
          </div>
        </details>
      </motion.div>

      {/* ── Download ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mb-10 flex flex-col items-center"
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
            fontSize: 'var(--fs-10)', letterSpacing: '3px', textTransform: 'uppercase',
            padding: '12px 28px', borderRadius: 0, cursor: downloading ? 'wait' : 'pointer',
            fontWeight: 'var(--fw-400)', transition: 'all 0.2s', opacity: downloading ? 0.5 : 1,
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
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'var(--fs-11)', fontWeight: 'var(--fw-400)', lineHeight: 1.8, color: 'var(--color-disclaimer)', maxWidth: 520, margin: '0 auto 8px' }}>
          {DISCLAIMER}
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'var(--fs-10)', fontWeight: 'var(--fw-400)', color: 'var(--color-border)' }}>
          &copy; Life Path Numerology Calculator. For personal use only.
        </p>
      </motion.div>

      <StickyReportBar resultRef={resultRef} />
    </motion.div>
  );
}
