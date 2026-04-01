'use client';
import { motion } from 'framer-motion';
import LifePathCalculator, { type CalcResult } from './LifePathCalculator';
import SacredGeometryCanvas from './SacredGeometryCanvas';

type Props = {
  onResult: (result: CalcResult) => void;
};

export default function Hero({ onResult }: Props) {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-[#0a0a0f] px-6 pt-20">
      {/* Living canvas background */}
      <SacredGeometryCanvas />

      {/* Radial vignette overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 75% at 50% 50%, transparent 30%, #0a0a0f 85%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0 }}
          className="mb-6 font-body text-xs uppercase tracking-[0.2em] text-[#c9a84c]/70"
        >
          Free numerology calculator
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-6 font-display text-[clamp(2.5rem,7vw,4.5rem)] font-light leading-tight text-[#f0ede8]"
        >
          Discover your life path number
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12 max-w-md font-body text-lg leading-relaxed text-[#f0ede8]/55"
        >
          Enter your date of birth. In seconds, understand the core number that shapes your entire life.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="w-full"
        >
          <LifePathCalculator onResult={onResult} />
        </motion.div>
      </div>

      {/* Subtle scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-8 w-[1px] flex-col items-center overflow-hidden">
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
            className="h-full w-full bg-[#c9a84c]/40"
          />
        </div>
      </motion.div>
    </section>
  );
}
