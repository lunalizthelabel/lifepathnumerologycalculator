'use client';
import { useState } from 'react';
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
          style={{
            background: 'var(--color-bg-raised)',
            border: '1px solid var(--color-border)',
            borderRadius: 0,
            padding: '12px 16px',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'var(--fs-14)',
            fontWeight: 'var(--fw-400)',
            color: 'var(--color-ink)',
            width: '100%',
            outline: 'none',
            transition: 'border-color 0.2s',
            colorScheme: 'light',
          }}
          onFocus={(e) => { e.target.style.borderColor = 'var(--color-accent)'; }}
          onBlur={(e) => { e.target.style.borderColor = 'var(--color-border)'; }}
        />
      </div>
      <motion.button
        type="submit"
        whileTap={{ scale: 0.98 }}
        style={{
          background: 'var(--color-accent)',
          color: '#FDFAF6',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 'var(--fs-10)',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          padding: '14px 32px',
          border: 'none',
          borderRadius: 0,
          cursor: 'pointer',
          fontWeight: 'var(--fw-400)',
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => { (e.target as HTMLElement).style.background = 'var(--color-accent-deep)'; }}
        onMouseLeave={(e) => { (e.target as HTMLElement).style.background = 'var(--color-accent)'; }}
      >
        Calculate my life path
      </motion.button>
    </form>
  );
}
