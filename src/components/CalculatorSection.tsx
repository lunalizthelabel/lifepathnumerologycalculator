'use client';
import { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import LifePathCalculator, { type CalcResult } from './LifePathCalculator';
import LifePathResult from './LifePathResult';

export default function CalculatorSection() {
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
      <LifePathCalculator onResult={handleResult} />
      <AnimatePresence>
        {result && (
          <div ref={resultRef} className="mt-20">
            <LifePathResult
              lifePath={result.lifePath}
              personalYear={result.personalYear}
              birthDate={result.date}
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
