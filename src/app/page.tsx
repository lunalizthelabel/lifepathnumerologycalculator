import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import NumberGrid from '@/components/NumberGrid';
import FAQ from '@/components/FAQ';

export const metadata: Metadata = {
  title: 'Numerology Calculator — Free Life Path Number | YourNumerologyReport',
  description:
    'Free numerology calculator. Enter your date of birth to instantly calculate your life path number — the core number that shapes your personality, strengths, and life direction.',
  alternates: {
    canonical: 'https://yournumerologyreport.com',
  },
};

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Numerology Calculator — Life Path Number',
  url: 'https://yournumerologyreport.com',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'All',
  description:
    'Free numerology calculator. Computes life path number and personal year number from date of birth using Pythagorean digit reduction.',
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
        {/* Hero */}
        <Hero />

        {/* How it works */}
        <section className="border-t border-white/5 bg-[#0a0a0f] px-6 py-24" aria-labelledby="how-it-works">
          <div className="mx-auto max-w-5xl">
            <h2 id="how-it-works" className="mb-16 text-center font-display text-3xl font-light text-[#f0ede8]">
              How the numerology calculator works
            </h2>
            <ol className="grid grid-cols-1 gap-px sm:grid-cols-3">
              {[
                {
                  n: '01',
                  title: 'Enter your birth date',
                  body: 'Select your full date of birth using the date picker. Day, month, year — all three are required for an accurate calculation.',
                },
                {
                  n: '02',
                  title: 'We calculate your number',
                  body: 'Every digit in your date of birth is summed and reduced to a single core number — unless it is a Master Number: 11, 22, or 33.',
                },
                {
                  n: '03',
                  title: 'Understand yourself more clearly',
                  body: 'Receive your life path number, its archetype name, a detailed description, and your Personal Year — the energy shaping this specific year of your life.',
                },
              ].map(({ n, title, body }) => (
                <li key={n} className="border border-white/5 bg-white/[0.02] p-8">
                  <span className="mb-4 block font-body text-sm text-[#c9a84c]/50">{n}</span>
                  <h3 className="mb-3 font-display text-xl text-[#f0ede8]">{title}</h3>
                  <p className="font-body text-base leading-relaxed text-[#f0ede8]/50">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* All numbers */}
        <section className="border-t border-white/5 px-6 py-24" aria-labelledby="all-numbers">
          <div className="mx-auto max-w-6xl">
            <h2 id="all-numbers" className="mb-4 text-center font-display text-3xl font-light text-[#f0ede8]">
              All life path numbers
            </h2>
            <p className="mx-auto mb-16 max-w-xl text-center font-body text-base text-[#f0ede8]/50">
              Select any number to read its full profile — archetype, description, strengths, and challenges.
            </p>
            <NumberGrid />
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-white/5 bg-white/[0.01] px-6 py-24" aria-labelledby="faq">
          <div className="mx-auto max-w-3xl">
            <h2 id="faq" className="mb-12 font-display text-3xl font-light text-[#f0ede8]">
              Frequently asked questions
            </h2>
            <FAQ />
          </div>
        </section>
      </main>
    </>
  );
}
