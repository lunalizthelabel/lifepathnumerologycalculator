'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateLifePath, calculatePersonalYear } from '@/lib/numerology';
import LifePathResult from './LifePathResult';

export default function LifePathCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState<{ lifePath: number; personalYear: number; date: string } | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate) return;
    const lifePath = calculateLifePath(birthDate);
    const personalYear = calculatePersonalYear(birthDate);
    setResult({ lifePath, personalYear, date: birthDate });
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
        <div className="relative w-full max-w-sm">
          <input
            type="date"
            id="birthdate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
            min="1900-01-01"
            max={new Date().toISOString().split('T')[0]}
            className="w-full rounded-none border border-[#c9a84c]/30 bg-white/5 px-4 py-3 font-body text-base text-[#f0ede8] transition-colors focus:border-[#c9a84c]/70 focus:outline-none focus:ring-0 [color-scheme:dark]"
          />
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden border border-[#c9a84c] bg-transparent px-10 py-3.5 font-body text-sm uppercase tracking-widest text-[#c9a84c] transition-colors hover:bg-[#c9a84c] hover:text-[#0a0a0f]"
        >
          Calculate my life path
        </motion.button>
      </form>

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
    </div>
  );
}
