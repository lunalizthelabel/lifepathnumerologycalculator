'use client';
import { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import Hero from './Hero';
import LifePathResult from './LifePathResult';
import type { CalcResult } from './LifePathCalculator';

type Props = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  /** Shown under the hero until the visitor has a result (the result has its own order box). */
  teaser?: React.ReactNode;
};

export default function HomeContent({ eyebrow, title, subtitle, teaser }: Props) {
  const [result, setResult] = useState<CalcResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleResult = (r: CalcResult) => {
    setResult(r);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <>
      <Hero onResult={handleResult} eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <AnimatePresence>
        {result && (
          <section
            ref={resultRef}
            className="scroll-mt-0 px-6 py-24"
            style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-bg)' }}
          >
            <LifePathResult
              lifePath={result.lifePath}
              personalYear={result.personalYear}
              birthDate={result.date}
            />
          </section>
        )}
      </AnimatePresence>
      {!result && teaser}
    </>
  );
}
