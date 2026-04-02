'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { calculateLifePath, calculatePersonalYear } from '@/lib/numerology';

export type CalcResult = { lifePath: number; personalYear: number; date: string };

type Props = {
  onResult: (result: CalcResult) => void;
};

export default function LifePathCalculator({ onResult }: Props) {
  const [birthDate, setBirthDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate) return;
    onResult({
      lifePath: calculateLifePath(birthDate),
      personalYear: calculatePersonalYear(birthDate),
      date: birthDate,
    });
  };

  return (
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
      <p className="font-body text-xs text-[#f0ede8]/55">
        By calculating you agree to our{' '}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-[#f0ede8]/80 transition-colors">privacy policy</Link>
        {' '}and{' '}
        <Link href="/disclaimer" className="underline underline-offset-2 hover:text-[#f0ede8]/80 transition-colors">disclaimer</Link>.
      </p>
    </form>
  );
}
