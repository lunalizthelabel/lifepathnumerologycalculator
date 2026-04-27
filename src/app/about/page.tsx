import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Life Path Numerology Calculator — numerology without the mysticism. Structured self-insight based on your date of birth.',
  alternates: {
    canonical: 'https://lifepathnumerologycalculator.com/about',
  },
};

export default function AboutPage() {
  return (
    <main className="pt-24">
      <section className="px-6 py-20" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-muted)' }}>
        <div className="mx-auto max-w-3xl">
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '5px', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 16, fontWeight: 400 }}>
            About
          </p>
          <h1 className="mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: 'var(--color-ink)', lineHeight: 1.1 }}>
            Numerology without the mysticism
          </h1>
          {[
            `Life Path Numerology Calculator was built on a simple premise: numerology is a system worth taking seriously, but most numerology tools are not. They trade in vague positivity, cosmic language, and aesthetic mysticism that makes the underlying structure — which is genuinely interesting — harder to access.`,
            `We believe the value of numerology lies in its use as a framework for structured self-reflection. Your life path number does not tell you what will happen. It offers a vocabulary for patterns you may already sense in yourself — recurring themes in the decisions you make, the relationships you seek, the challenges that keep finding you.`,
            `The calculation method we use is grounded in classical Pythagorean numerology, as codified and expanded by researchers including Dan Millman and Matthew Oliver Goodwin. All digit reductions preserve Master Numbers (11, 22, 33) rather than reducing them further — a distinction that matters for roughly 10% of people who calculate their life path number.`,
            `This is a product under active development. The current version offers a free life path calculator and a personal year number. A full personalised report — including Expression number, Soul Urge number, and a detailed written analysis — is in development as Phase 2.`,
          ].map((text, i) => (
            <p key={i} className="mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 300, lineHeight: 1.85, color: 'var(--color-body)' }}>
              {text}
            </p>
          ))}
        </div>
      </section>

      <section className="px-6 py-16" style={{ background: 'var(--color-bg)' }}>
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: 'var(--color-ink)' }}>
            Start with your life path number
          </h2>
          <Link
            href="/life-path-number-calculator"
            style={{
              display: 'inline-block',
              background: 'var(--color-ink)',
              color: 'var(--color-bg)',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 10,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              padding: '14px 32px',
              fontWeight: 400,
              transition: 'background 0.2s',
            }}
          >
            Free calculator
          </Link>
        </div>
      </section>
    </main>
  );
}
