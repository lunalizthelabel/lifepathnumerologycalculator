'use client';

/**
 * Rotating 3D carousel of sample report pages, shown while the paid report
 * is being generated. Images are rendered from the "normal" preview fixture
 * by scripts/render-report-samples.py.
 */
import { useEffect, useState } from 'react';

const SAMPLES = [
  { src: '/report-samples/page-1.jpg', caption: 'Your cover' },
  { src: '/report-samples/page-2.jpg', caption: 'Your core numbers' },
  { src: '/report-samples/page-3.jpg', caption: 'Your life timeline' },
  { src: '/report-samples/page-4.jpg', caption: 'Your Birthday Number' },
  { src: '/report-samples/page-5.jpg', caption: 'In-depth readings' },
  { src: '/report-samples/page-6.jpg', caption: 'Words to remember' },
  { src: '/report-samples/page-7.jpg', caption: 'Where cycle meets pinnacle' },
  { src: '/report-samples/page-8.jpg', caption: 'Something to carry with you' },
];

const INTERVAL_MS = 3500;

export default function SampleCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = SAMPLES.length;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((i) => (i + 1) % n), INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, n]);

  return (
    <section aria-roledescription="carousel" aria-label="Sample pages from a report" className="sample-carousel">
      <div
        className="sc-stage"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {SAMPLES.map((s, i) => {
          // Shortest signed distance from the active card, e.g. -1, 0, 1, 2 ...
          let offset = (i - active + n) % n;
          if (offset > n / 2) offset -= n;
          const abs = Math.abs(offset);
          return (
            <figure
              key={s.src}
              className="sc-card"
              aria-hidden={offset !== 0}
              style={{
                transform: `translateX(${offset * 58}%) translateZ(${-abs * 140}px) rotateY(${offset * -24}deg)`,
                opacity: abs > 2 ? 0 : abs === 2 ? 0.5 : 1,
                zIndex: 10 - abs,
                filter: abs ? `saturate(0.8) brightness(${abs === 1 ? 0.94 : 0.9})` : 'none',
                pointerEvents: abs > 2 ? 'none' : undefined,
              }}
              onClick={() => setActive(i)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.src} alt={offset === 0 ? `Sample report page: ${s.caption}` : ''} width={600} height={849} loading={i < 3 ? 'eager' : 'lazy'} />
            </figure>
          );
        })}
      </div>

      <p className="sc-caption" aria-live="polite">
        <span className="sc-sample">Sample</span> {SAMPLES[active].caption}
      </p>

      <div className="sc-dots">
        {SAMPLES.map((s, i) => (
          <button
            key={s.src}
            type="button"
            aria-label={`Show sample page ${i + 1}: ${s.caption}`}
            aria-current={i === active}
            className={i === active ? 'is-active' : undefined}
            onClick={() => setActive(i)}
          />
        ))}
      </div>

      <style>{`
        .sample-carousel { width: 100%; max-width: 760px; margin: 0 auto; overflow-x: clip; padding: 8px 0 4px; }
        .sc-stage {
          position: relative;
          height: calc(min(240px, 52vw) * 1.415);
          perspective: 1400px;
          transform-style: preserve-3d;
        }
        .sc-card {
          position: absolute; left: 50%; top: 0;
          width: min(240px, 52vw);
          margin: 0 0 0 calc(min(240px, 52vw) / -2);
          transition: transform 0.9s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 0.9s ease, filter 0.9s ease;
          cursor: pointer;
          box-shadow: 0 18px 40px -18px rgba(43, 29, 20, 0.45), 0 2px 6px rgba(43, 29, 20, 0.12);
          background: #F3EDE2;
        }
        .sc-card img { display: block; width: 100%; height: auto; }
        .sc-caption {
          margin-top: 28px; text-align: center;
          font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 20px; line-height: 1.4;
          color: var(--color-ink);
        }
        .sc-sample {
          font-family: 'DM Sans', sans-serif; font-style: normal; font-size: 10px; letter-spacing: 0.24em;
          text-transform: uppercase; color: var(--color-camel-ink); margin-right: 8px; vertical-align: 2px;
        }
        .sc-dots { display: flex; justify-content: center; gap: 4px; margin-top: 12px; }
        .sc-dots button {
          width: 24px; height: 24px; padding: 0; border: 0; background: none; cursor: pointer; position: relative;
        }
        .sc-dots button::after {
          content: ''; position: absolute; left: 50%; top: 50%; width: 6px; height: 6px; margin: -3px 0 0 -3px;
          border-radius: 50%; background: var(--color-sand); transition: background 0.3s, transform 0.3s;
        }
        .sc-dots button.is-active::after { background: var(--color-camel-deep); transform: scale(1.3); }
        @media (prefers-reduced-motion: reduce) {
          .sc-card { transition: opacity 0.4s ease; }
        }
      `}</style>
    </section>
  );
}
