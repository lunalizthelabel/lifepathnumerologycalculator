import type { Metadata } from 'next';
import HomeContent from '@/components/HomeContent';
import NumberGrid from '@/components/NumberGrid';
import FAQ from '@/components/FAQ';

export const metadata: Metadata = {
  title: 'Life Path Calculator — Free Life Path Number Calculator | Numerology',
  description:
    'Free life path calculator. Enter your date of birth and instantly calculate your life path number — the core numerology number that shapes your personality, strengths, and life direction.',
  alternates: {
    canonical: 'https://lifepathnumerologycalculator.com',
  },
};

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Life Path Calculator — Free Numerology Life Path Number Calculator',
  url: 'https://lifepathnumerologycalculator.com',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'All',
  description:
    'Free life path calculator. Computes your life path number and personal year number from date of birth using Pythagorean numerology digit reduction.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
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
        text: 'A numerology calculator is a tool that computes your core numerology numbers from your date of birth or name. The most common result is the life path number, calculated by summing all digits of your date of birth and reducing to a single digit (1–9) or Master Number (11, 22, 33).',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a life path number?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Your life path number is the most significant number in numerology. Derived from your full date of birth, it reveals your core strengths, recurring challenges, and the overarching purpose your life tends to move toward.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is the life path number calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sum every digit in your full date of birth and reduce the total to a single digit. The only exceptions are 11, 22, and 33 — Master Numbers — which are not reduced further. Example: 14 March 1990 → 1+4+0+3+1+9+9+0 = 27 → 2+7 = 9.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are Master Numbers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Master Numbers (11, 22, 33) are life path numbers that are not reduced further. They carry heightened energy and potential compared to their base digits and are considered the most significant life paths in numerology.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a personal year number?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Your personal year number reveals the dominant energy of the current calendar year. It is calculated from your birth day and month plus the current year, then reduced to a single digit. Numbers cycle 1–9, from new beginnings to completion.',
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <main>
        {/* Hero + result (result renders outside hero to prevent canvas stretch) */}
        <HomeContent />

        {/* How it works */}
        <section className="px-6 py-24" aria-labelledby="how-it-works" style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-bg)' }}>
          <div className="mx-auto max-w-5xl">
            <p className="eyebrow mb-4 justify-center">How it works</p>
            <h2 id="how-it-works" className="mb-16 text-center" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 300, color: 'var(--color-ink)' }}>
              How the numerology calculator works
            </h2>
            <ol className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: 1, background: 'var(--color-border)' }}>
              {[
                { n: '01', title: 'Enter your birth date', body: 'Select your full date of birth using the date picker. Day, month, year — all three are required for an accurate calculation.' },
                { n: '02', title: 'We calculate your number', body: 'Every digit in your date of birth is summed and reduced to a single core number — unless it is a Master Number: 11, 22, or 33.' },
                { n: '03', title: 'Understand yourself more clearly', body: 'Receive your life path number, its archetype name, a detailed description, and your Personal Year — the energy shaping this specific year of your life.' },
              ].map(({ n, title, body }) => (
                <li key={n} style={{ background: 'var(--color-bg-raised)', padding: 32 }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '2px', color: 'var(--color-accent)', display: 'block', marginBottom: 16, fontWeight: 400 }}>{n}</span>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 300, color: 'var(--color-ink)', marginBottom: 12 }}>{title}</h3>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 300, lineHeight: 1.8, color: 'var(--color-muted)' }}>{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* All numbers */}
        <section className="px-6 py-24" aria-labelledby="all-numbers" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div className="mx-auto max-w-6xl">
            <p className="eyebrow mb-4 justify-center">All numbers</p>
            <h2 id="all-numbers" className="mb-4 text-center" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: 'var(--color-ink)' }}>
              All life path numbers
            </h2>
            <p className="mx-auto mb-16 max-w-xl text-center" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, color: 'var(--color-faint)' }}>
              Select any number to read its full profile — archetype, description, strengths, and challenges.
            </p>
            <NumberGrid />
          </div>
        </section>

        {/* Ad */}
        <div className="px-6 py-8" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div className="mx-auto max-w-6xl" ta-ad-container=""></div>
        </div>

        {/* FAQ */}
        <section className="px-6 py-24" aria-labelledby="faq" style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-muted)' }}>
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow mb-4">Frequently asked questions</p>
            <h2 id="faq" className="mb-12" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: 'var(--color-ink)' }}>
              Common questions
            </h2>
            <FAQ />
          </div>
        </section>
      </main>
    </>
  );
}
