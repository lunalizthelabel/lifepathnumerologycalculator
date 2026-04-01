'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { NUMBER_MEANINGS, NUMBER_ORDER } from '@/lib/numberMeanings';

export default function NumberGrid() {
  const sectionRefs = useRef<Record<number, HTMLElement | null>>({});

  const scrollTo = (num: number) => {
    sectionRefs.current[num]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div>
      {/* Grid of cards */}
      <div className="mb-20 grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-4">
        {NUMBER_ORDER.map((num, i) => {
          const m = NUMBER_MEANINGS[num];
          const isMaster = [11, 22, 33].includes(num);
          return (
            <motion.button
              key={num}
              onClick={() => scrollTo(num)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.04, duration: 0.5 }}
              className="group border border-white/5 bg-white/[0.02] p-6 text-left transition-colors hover:border-[#c9a84c]/30 hover:bg-[#c9a84c]/5"
            >
              <div className="mb-3 flex items-end gap-2">
                <span className="font-display text-4xl text-[#c9a84c] transition-all group-hover:text-[#e8c66a]">
                  {num}
                </span>
                {isMaster && (
                  <span className="mb-1 font-body text-[10px] uppercase tracking-widest text-[#c9a84c]/50">
                    Master
                  </span>
                )}
              </div>
              <p className="mb-1 font-display text-xl text-[#f0ede8]">{m.name}</p>
              <p className="font-body text-sm leading-relaxed text-[#f0ede8]/40">{m.tagline}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Detailed sections */}
      <div className="space-y-20">
        {NUMBER_ORDER.map((num) => {
          const m = NUMBER_MEANINGS[num];
          const isMaster = [11, 22, 33].includes(num);
          return (
            <motion.section
              key={num}
              ref={(el) => {
                sectionRefs.current[num] = el;
              }}
              id={`number-${num}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="scroll-mt-24 border-t border-white/5 pt-12"
            >
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
                {/* Number + name */}
                <div className="lg:col-span-1">
                  <div className="flex items-end gap-3">
                    <span className="font-display text-7xl leading-none text-[#c9a84c]">{num}</span>
                    {isMaster && (
                      <span className="mb-2 font-body text-[10px] uppercase tracking-widest text-[#c9a84c]/50">
                        Master
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 font-display text-3xl font-light italic text-[#f0ede8]">
                    {m.name}
                  </h3>
                  <p className="mt-2 font-body text-base text-[#f0ede8]/40">{m.tagline}</p>
                </div>

                {/* Description + lists */}
                <div className="lg:col-span-2">
                  <p className="mb-8 font-body text-lg leading-relaxed text-[#f0ede8]/70">
                    {m.description}
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="mb-3 font-body text-xs uppercase tracking-widest text-[#c9a84c]">
                        Strengths
                      </h4>
                      <ul className="space-y-1">
                        {m.strengths.map((s) => (
                          <li key={s} className="font-body text-base text-[#f0ede8]/60">
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-3 font-body text-xs uppercase tracking-widest text-[#c9a84c]">
                        Challenges
                      </h4>
                      <ul className="space-y-1">
                        {m.challenges.map((c) => (
                          <li key={c} className="font-body text-base text-[#f0ede8]/60">
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}
