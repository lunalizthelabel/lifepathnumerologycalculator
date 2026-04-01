'use client';
import { motion } from 'framer-motion';
import { NUMBER_MEANINGS } from '@/lib/numberMeanings';
import { formatBirthDate } from '@/lib/numerology';

type Props = {
  lifePath: number;
  personalYear: number;
  birthDate: string;
};

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

      {/* Phase 2 CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75 }}
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
