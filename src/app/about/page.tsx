import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Life Path Numerology Calculator: numerology without the mysticism. Structured self-insight based on your date of birth.',
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
          <h1 className="mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: 'var(--color-ink)', lineHeight: 1.1 }}>
            Numerology without the mysticism
          </h1>
          {[
            `Life Path Numerology Calculator was built on a simple premise: numerology is a system worth taking seriously, but most numerology tools are not. They trade in vague positivity, cosmic language, and aesthetic mysticism that makes the underlying structure (which is genuinely interesting) harder to access.`,
            `We believe the value of numerology lies in its use as a framework for structured self-reflection. Your life path number does not tell you what will happen. It offers a vocabulary for patterns you may already sense in yourself: recurring themes in the decisions you make, the relationships you seek, the challenges that keep finding you.`,
            `The calculation method we use is grounded in classical Pythagorean numerology, as codified and expanded by researchers including Dan Millman and Matthew Oliver Goodwin. All digit reductions preserve Master Numbers (11, 22, 33) rather than reducing them further, a distinction that matters for roughly 10% of people who calculate their life path number.`,
            `This is a product under active development. The current version offers a free life path calculator and a personal year number. A full personalised report, including Expression number, Soul Urge number, and a detailed written analysis, is in development as Phase 2.`,
          ].map((text, i) => (
            <p key={i} className="mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 400, lineHeight: 1.85, color: 'var(--color-body)' }}>
              {text}
            </p>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 py-16" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-raised)', scrollMarginTop: 84 }}>
        <div className="mx-auto max-w-3xl">
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '5px', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 16, fontWeight: 400 }}>
            Contact
          </p>
          <h2 className="mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: 'var(--color-ink)' }}>
            Get in touch
          </h2>
          <p className="mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 400, lineHeight: 1.85, color: 'var(--color-body)' }}>
            Questions about the calculator, your report or a payment? Send us an email and we will do our best to reply within 5 business days.
          </p>
          <dl style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.8, color: 'var(--color-body)' }}>
            <div className="flex gap-4">
              <dt style={{ width: 64, color: 'var(--color-muted)' }}>Name</dt>
              <dd>Life Path Numerology Calculator</dd>
            </div>
            <div className="flex gap-4">
              <dt style={{ width: 64, color: 'var(--color-muted)' }}>Email</dt>
              <dd>
                <a href="mailto:info@lunalizbv.nl" style={{ color: 'var(--color-accent-deep)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                  info@lunalizbv.nl
                </a>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt style={{ width: 64, color: 'var(--color-muted)' }}>KvK</dt>
              <dd>80799175</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="px-6 py-16" style={{ background: 'var(--color-bg)' }}>
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: 'var(--color-ink)' }}>
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
