import type { Metadata } from 'next';
import Link from 'next/link';
import CalculatorSection from '@/components/CalculatorSection';
import NumberGrid from '@/components/NumberGrid';
import FAQ from '@/components/FAQ';

export const metadata: Metadata = {
  title: 'Life Path Number Calculator — Free Numerology Calculator Life Path',
  description:
    'Free life path number calculator. The numerology life path calculator computes your life path number from your date of birth — full meaning, strengths, challenges, and personal year, instantly.',
  alternates: {
    canonical: 'https://lifepathnumerologycalculator.com/life-path-number-calculator',
  },
  openGraph: {
    title: 'Life Path Number Calculator — Free Numerology Life Path Calculator',
    description:
      'Free life path number calculator. Calculate your life path number from your date of birth — instant numerology results with full meaning and personal year.',
    url: 'https://lifepathnumerologycalculator.com/life-path-number-calculator',
  },
};

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lifepathnumerologycalculator.com' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Life Path Number Calculator',
      item: 'https://lifepathnumerologycalculator.com/life-path-number-calculator',
    },
  ],
};

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Life Path Number Calculator — Free Numerology Calculator',
  url: 'https://lifepathnumerologycalculator.com/life-path-number-calculator',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'All',
  description:
    'Free life path number calculator that computes your life path number from your date of birth using Pythagorean numerology digit reduction.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

const howToLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Life Path Number',
  description:
    'Calculate your life path number using Pythagorean numerology digit reduction from your date of birth.',
  totalTime: 'PT10S',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Write out your full date of birth',
      text: 'Note your complete date of birth including day, month, and year — for example, 14 March 1990.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Sum every individual digit',
      text: 'Add each digit of the date one by one: 1+4+0+3+1+9+9+0 = 27.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Reduce to a single digit',
      text: 'If the total is greater than 9, add its digits again: 2+7 = 9. Stop if you reach 11, 22, or 33 — these are Master Numbers and are not reduced further.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Read your life path number',
      text: 'The final single digit (or Master Number) is your life path number. In this example: Life Path 9 — The Humanitarian.',
    },
  ],
};

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a numerology calculator?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A numerology calculator is a tool that computes your core numerology numbers from your date of birth or name. The most common calculation is the life path number, which is found by summing all digits of your complete date of birth and reducing the total to a single digit (1–9) or Master Number (11, 22, or 33).',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a life path number?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Your life path number is the most significant number in numerology. It is derived from your full date of birth and reveals the overarching theme of your life — your core strengths, recurring challenges, and the deeper purpose your life tends to move toward.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is the life path number calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sum every digit in your full date of birth (day, month, and year) and reduce the total to a single digit through repeated digit addition. The only exceptions are 11, 22, and 33 — known as Master Numbers — which are preserved intact. Example: 14 March 1990 → 1+4+0+3+1+9+9+0 = 27 → 2+7 = 9.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are Master Numbers in numerology?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Master Numbers — 11, 22, and 33 — are life path numbers that are not reduced further during calculation. They carry an intensified energy compared to their base digits (2, 4, and 6 respectively) and are associated with heightened potential and challenge. Only a small percentage of people are born with a Master Number life path.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a personal year number?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Your personal year number reveals the dominant theme and energy of any given calendar year. It is calculated by summing your birth day, birth month, and the current year, then reducing to a single digit. Each year cycles through a 1–9 sequence, with 1 representing new beginnings and 9 representing completion.',
      },
    },
  ],
};

export default function CalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <main className="pt-24">

        {/* ── Header ── */}
        <section className="px-6 py-20" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-muted)' }}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-4 justify-center">Free life path calculator</p>
            <h1 className="mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: 'var(--color-ink)', lineHeight: 1.1 }}>
              Life Path Number Calculator
            </h1>
            <p className="mx-auto max-w-lg" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 300, lineHeight: 1.85, color: 'var(--color-muted)' }}>
              Free numerology life path calculator. Enter your date of birth to instantly calculate your life path number — the single most important number in numerology.
            </p>
          </div>
        </section>

        {/* ── Quick answer ── */}
        <section className="px-6 py-10" aria-label="Quick answer" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-accent-soft)' }}>
          <div className="mx-auto max-w-3xl">
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 8, fontWeight: 400 }}>
              Quick answer
            </p>
            <p id="quick-answer" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 300, lineHeight: 1.85, color: 'var(--color-body)' }}>
              A <strong style={{ fontWeight: 500 }}>numerology calculator</strong> determines your{' '}
              <strong style={{ fontWeight: 500 }}>life path number</strong> by summing every digit in
              your complete date of birth and reducing the result to a single digit between 1 and 9 —
              or one of three Master Numbers (11, 22, or 33). The calculation takes under ten seconds
              and requires only your date of birth.
            </p>
          </div>
        </section>

        {/* ── Calculator ── */}
        <section className="px-6 py-20" id="calculator" aria-label="Numerology calculator" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-10" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: 'var(--color-ink)' }}>
              Calculate your life path number
            </h2>
            <CalculatorSection />
          </div>
        </section>

        {/* ── What is a numerology calculator ── */}
        <section className="px-6 py-16" aria-labelledby="what-is-calculator" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <article className="mx-auto max-w-3xl">
            <h2 id="what-is-calculator" className="mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: 'var(--color-ink)' }}>
              What is a numerology calculator?
            </h2>
            <div className="space-y-4">
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 300, lineHeight: 1.85, color: 'var(--color-body)' }}>
                A numerology calculator is a tool that computes your core numerology numbers from
                numerical or alphabetical data — most commonly your date of birth or full name. The
                most widely used result is the <strong style={{ fontWeight: 500, color: 'var(--color-ink)' }}>life path number</strong>,
                which comes from your date of birth. A name-based numerology calculator can additionally
                calculate your <strong style={{ fontWeight: 500, color: 'var(--color-ink)' }}>Expression number</strong> (your
                full name at birth) and your <strong style={{ fontWeight: 500, color: 'var(--color-ink)' }}>Soul Urge number</strong>{' '}
                (the vowels of your full name).
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 300, lineHeight: 1.85, color: 'var(--color-body)' }}>
                Numerology is rooted in Pythagorean mathematics and has been used across cultures
                for thousands of years as a framework for self-understanding. This calculator uses
                the classical digit reduction method: each digit in your date of birth is summed,
                and the total is reduced repeatedly until a single digit or Master Number is reached.
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 300, lineHeight: 1.85, color: 'var(--color-body)' }}>
                The numerology calculator on this page is free, requires no account, and processes
                your date of birth entirely within your browser — nothing is stored or transmitted.{' '}
                <Link href="/numerology-calculator-name" style={{ color: 'var(--color-accent)', textDecoration: 'underline', textUnderlineOffset: 2 }}>
                  A name-based numerology calculator
                </Link>{' '}
                is currently in development and will be available in the next phase of this site.
              </p>
            </div>
          </article>
        </section>

        {/* ── What is a life path number ── */}
        <section className="px-6 py-16" aria-labelledby="what-is-lp" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-raised)' }}>
          <article className="mx-auto max-w-3xl">
            <h2 id="what-is-lp" className="mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: 'var(--color-ink)' }}>
              What is a life path number?
            </h2>
            <div className="space-y-4">
              {[
                `Your life path number is the single most significant figure in numerology. Derived from your complete date of birth, it reveals the overarching theme of your life — the natural strengths you carry, the recurring challenges you will encounter, and the deeper purpose your life tends to move toward. It functions less as a prediction and more as a precise map of your innate disposition.`,
                `There are 12 possible life path numbers: 1 through 9, plus the three Master Numbers 11, 22, and 33. Each carries a distinct archetype, a set of core strengths, and a set of defining challenges. Understanding yours is a starting point, not a fixed verdict — but most people find it describes a great deal about how they move through the world.`,
                `Alongside your life path number, this numerology calculator also computes your Personal Year number — a secondary result that reveals the dominant energy and theme of the current calendar year for you specifically. Personal Year numbers cycle from 1 (new beginnings) to 9 (completion and release), giving you a practical lens on what any given year is asking of you.`,
              ].map((text, i) => (
                <p key={i} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 300, lineHeight: 1.85, color: 'var(--color-body)' }}>{text}</p>
              ))}
            </div>
          </article>
        </section>

        {/* ── How to calculate ── */}
        <section className="px-6 py-16" aria-labelledby="how-to-calculate" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div className="mx-auto max-w-3xl">
            <h2 id="how-to-calculate" className="mb-10" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: 'var(--color-ink)' }}>
              How to calculate a life path number
            </h2>
            <ol className="space-y-6">
              {[
                { n: '1', title: 'Write out your full date of birth', body: 'Note your complete date of birth — day, month, and year. For example: 14 March 1990.' },
                { n: '2', title: 'Sum every individual digit', body: 'Add each digit one by one without grouping the day, month, or year separately: 1+4+0+3+1+9+9+0 = 27.' },
                { n: '3', title: 'Reduce to a single digit', body: 'If the total is greater than 9, add its digits again: 2+7 = 9. Stop immediately if you reach 11, 22, or 33 — these are Master Numbers and must not be reduced further.' },
                { n: '4', title: 'Read your result', body: 'The final digit (or Master Number) is your life path number. In this example: Life Path 9 — The Humanitarian.' },
              ].map(({ n, title, body }) => (
                <li key={n} className="flex gap-6">
                  <span className="mt-1 flex shrink-0 items-center justify-center" style={{ width: 28, height: 28, border: '1px solid var(--color-accent)', fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--color-accent)', fontWeight: 400 }}>
                    {n}
                  </span>
                  <div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--color-ink)', marginBottom: 4 }}>{title}</p>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 300, lineHeight: 1.85, color: 'var(--color-muted)' }}>{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── All numbers ── */}
        <section className="px-6 py-24" aria-labelledby="all-numbers-calc" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div className="mx-auto max-w-6xl">
            <h2 id="all-numbers-calc" className="mb-4 text-center" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: 'var(--color-ink)' }}>
              All 12 life path numbers
            </h2>
            <p className="mx-auto mb-16 max-w-xl text-center" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, color: 'var(--color-faint)' }}>
              Click any card to jump to its full profile — archetype, description, strengths, and challenges.
            </p>
            <NumberGrid />
          </div>
        </section>

        {/* ── Name calculator CTA ── */}
        <section className="px-6 py-16" aria-label="Name numerology calculator" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-muted)' }}>
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
              <div className="flex-1">
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 8, fontWeight: 400 }}>
                  Coming soon
                </p>
                <h2 className="mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: 'var(--color-ink)' }}>
                  Numerology calculator by name
                </h2>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 300, lineHeight: 1.85, color: 'var(--color-muted)' }}>
                  The next phase adds a full name numerology calculator — computing your{' '}
                  <strong style={{ fontWeight: 500 }}>Expression number</strong> and{' '}
                  <strong style={{ fontWeight: 500 }}>Soul Urge number</strong> from your birth name.
                </p>
              </div>
              <Link
                href="/numerology-calculator-name"
                className="lp-learn-more-link"
              >
                Learn more
              </Link>
            </div>
          </div>
        </section>

        {/* Ad */}
        <div className="px-6 py-8" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div className="mx-auto max-w-6xl" ta-ad-container=""></div>
        </div>

        {/* ── FAQ ── */}
        <section className="px-6 py-24" aria-labelledby="faq-calc" style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-muted)' }}>
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow mb-4">Questions</p>
            <h2 id="faq-calc" className="mb-12" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: 'var(--color-ink)' }}>
              Frequently asked questions
            </h2>
            <FAQ />
          </div>
        </section>

      </main>
    </>
  );
}
