'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    q: 'What is a life path number?',
    a: 'Your life path number is the single most important number in numerology. It is derived from your full date of birth and reveals the overarching theme of your life — the core strengths you carry, the challenges you will face, and the deeper purpose your life tends to move toward. Think of it less as a prediction and more as a map of your natural disposition.',
  },
  {
    q: 'How is the life path number calculated?',
    a: 'We sum every digit in your full date of birth (day, month, and year) and reduce the total to a single digit — unless the total reduces to 11, 22, or 33, which are Master Numbers kept intact. For example, a birth date of 14 March 1990 becomes: 1+4+0+3+1+9+9+0 = 27, then 2+7 = 9. Life path 9.',
  },
  {
    q: 'What are Master Numbers?',
    a: 'Master Numbers — 11, 22, and 33 — are not reduced further because they carry a heightened vibrational frequency. They represent intensified versions of their base digits (2, 4, and 6 respectively) and are traditionally associated with greater potential, but also greater inner tension. Only a small percentage of people are born with a Master Number life path.',
  },
  {
    q: 'What is a Personal Year number?',
    a: 'Your Personal Year number reveals the overarching energy and theme of any given calendar year in your life. It is calculated using your day and month of birth combined with the current year, then reduced to a single digit. Each year from 1 through 9 (or a Master Number) carries a distinct focus — from new beginnings (1) to completion and release (9).',
  },
  {
    q: 'Is numerology a science?',
    a: 'Numerology is not a science in the empirical sense — it is a symbolic system with roots in ancient mathematics, philosophy, and esoteric traditions. We present it as a structured framework for self-reflection, not as a predictive tool or a substitute for professional advice. Many people find it useful precisely because it offers a coherent vocabulary for patterns they already sense in their own lives.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ borderTop: '1px solid var(--color-border)' }}>
      {FAQS.map((faq, i) => (
        <div key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-start justify-between gap-6 py-6 text-left"
          >
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, fontWeight: 300, color: 'var(--color-ink)' }}>
              {faq.q}
            </span>
            <span
              style={{
                marginTop: 2,
                flexShrink: 0,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 18,
                color: 'var(--color-accent)',
                transition: 'transform 0.3s',
                transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                display: 'block',
              }}
            >
              +
            </span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 300, lineHeight: 1.85, color: 'var(--color-muted)', paddingBottom: 24 }}>
                  {faq.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
