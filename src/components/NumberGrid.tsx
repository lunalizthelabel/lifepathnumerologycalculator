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
      <div className="mb-20 grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-4" style={{ background: 'var(--color-border)' }}>
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
              className="p-6 text-left transition-colors"
              style={{ background: 'var(--color-bg-raised)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--color-bg-muted)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--color-bg-raised)'; }}
            >
              <div className="mb-3 flex items-end gap-2">
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, color: 'var(--color-accent)', lineHeight: 1 }}>
                  {num}
                </span>
                {isMaster && (
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--color-faint)', marginBottom: 4 }}>
                    Master
                  </span>
                )}
              </div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 400, color: 'var(--color-ink)', marginBottom: 4 }}>{m.name}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 300, color: 'var(--color-faint)', lineHeight: 1.5 }}>{m.tagline}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Detailed sections */}
      <div className="space-y-16">
        {NUMBER_ORDER.map((num) => {
          const m = NUMBER_MEANINGS[num];
          const isMaster = [11, 22, 33].includes(num);
          return (
            <motion.section
              key={num}
              ref={(el) => { sectionRefs.current[num] = el; }}
              id={`number-${num}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="scroll-mt-24"
              style={{ borderTop: '1px solid var(--color-border)', paddingTop: 40 }}
            >
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
                <div className="lg:col-span-1">
                  <div className="flex items-end gap-3">
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 72, color: 'var(--color-accent)', lineHeight: 1 }}>{num}</span>
                    {isMaster && (
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--color-faint)', marginBottom: 8 }}>
                        Master
                      </span>
                    )}
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 300, fontStyle: 'italic', color: 'var(--color-ink)', marginTop: 8 }}>
                    {m.name}
                  </h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, color: 'var(--color-faint)', marginTop: 6 }}>{m.tagline}</p>
                </div>

                <div className="lg:col-span-2">
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 300, lineHeight: 1.85, color: 'var(--color-body)', marginBottom: 32 }}>
                    {m.description}
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 12 }}>
                        Strengths
                      </h4>
                      <ul className="space-y-1">
                        {m.strengths.map((s) => (
                          <li key={s} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 300, color: 'var(--color-body)' }}>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 12 }}>
                        Challenges
                      </h4>
                      <ul className="space-y-1">
                        {m.challenges.map((c) => (
                          <li key={c} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 300, color: 'var(--color-body)' }}>
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
