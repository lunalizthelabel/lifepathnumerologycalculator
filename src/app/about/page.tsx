import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description:
    'YourNumerologyReport — numerology without the mysticism. Structured self-insight based on your date of birth.',
  alternates: {
    canonical: 'https://yournumerologyreport.com/about',
  },
};

export default function AboutPage() {
  return (
    <main className="pt-24">
      <section className="border-b border-white/5 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 font-body text-xs uppercase tracking-[0.2em] text-[#c9a84c]/70">
            About
          </p>
          <h1 className="mb-8 font-display text-[clamp(2rem,5vw,3.5rem)] font-light leading-tight text-[#f0ede8]">
            Numerology without the mysticism
          </h1>
          <p className="mb-6 font-body text-lg leading-relaxed text-[#f0ede8]/65">
            YourNumerologyReport was built on a simple premise: numerology is a system worth taking
            seriously, but most numerology tools are not. They trade in vague positivity, cosmic
            language, and aesthetic mysticism that makes the underlying structure — which is
            genuinely interesting — harder to access.
          </p>
          <p className="mb-6 font-body text-lg leading-relaxed text-[#f0ede8]/65">
            We believe the value of numerology lies in its use as a framework for structured
            self-reflection. Your life path number does not tell you what will happen. It offers a
            vocabulary for patterns you may already sense in yourself — recurring themes in the
            decisions you make, the relationships you seek, the challenges that keep finding you.
          </p>
          <p className="mb-6 font-body text-lg leading-relaxed text-[#f0ede8]/65">
            The calculation method we use is grounded in classical Pythagorean numerology, as
            codified and expanded by researchers including Dan Millman and Matthew Oliver Goodwin.
            All digit reductions preserve Master Numbers (11, 22, 33) rather than reducing them
            further — a distinction that matters for roughly 10% of people who calculate their life
            path number.
          </p>
          <p className="font-body text-lg leading-relaxed text-[#f0ede8]/65">
            This is a product under active development. The current version offers a free life path
            calculator and a personal year number. A full personalised report — including Expression
            number, Soul Urge number, and a detailed written analysis — is in development as Phase 2.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 font-display text-2xl font-light text-[#f0ede8]">
            Start with your life path number
          </h2>
          <Link
            href="/life-path-number-calculator"
            className="inline-block border border-[#c9a84c] px-10 py-3.5 font-body text-sm uppercase tracking-widest text-[#c9a84c] transition-colors hover:bg-[#c9a84c] hover:text-[#0a0a0f]"
          >
            Free calculator
          </Link>
        </div>
      </section>
    </main>
  );
}
