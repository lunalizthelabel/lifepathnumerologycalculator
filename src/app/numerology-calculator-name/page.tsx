import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Numerology Calculator by Name — Expression & Soul Urge Numbers',
  description:
    'Name numerology calculator — calculate your Expression number and Soul Urge number from your full birth name. Learn what your name reveals about your talents, desires, and direction.',
  alternates: {
    canonical: 'https://yournumerologyreport.com/numerology-calculator-name',
  },
  openGraph: {
    title: 'Numerology Calculator by Name — Expression & Soul Urge Numbers | YourNumerologyReport',
    description:
      'Name numerology calculator — calculate your Expression number and Soul Urge number from your full birth name.',
    url: 'https://yournumerologyreport.com/numerology-calculator-name',
  },
};

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://yournumerologyreport.com' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Numerology Calculator by Name',
      item: 'https://yournumerologyreport.com/numerology-calculator-name',
    },
  ],
};

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a numerology calculator by name?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A name numerology calculator converts the letters of your full birth name into numbers using the Pythagorean alphabet chart (A=1, B=2, C=3, and so on up to I=9, then repeating). The resulting digits are summed and reduced to calculate core numerology numbers such as the Expression number and Soul Urge number.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is an Expression number?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Your Expression number (also called the Destiny number) is calculated from all the letters of your full birth name. It reveals your natural talents, abilities, and the potential you carry into this lifetime. Each letter is assigned a number 1–9 using the Pythagorean chart, and the total is reduced to a single digit or Master Number.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a Soul Urge number?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Your Soul Urge number (also called the Heart\'s Desire number) is calculated from only the vowels in your full birth name. It reveals your innermost motivations, what you truly want from life, and the deeper desires that drive your decisions — often privately, beneath the surface.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which name should I use for a name numerology calculator?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Always use your full birth name as it appears on your birth certificate — including middle names if you have them. Do not use a married name, shortened name, or nickname. The name given at birth is considered the energetically significant one in classical numerology.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between life path and Expression number?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Your life path number (from your date of birth) represents the overarching journey and purpose of your life — the path you are on. Your Expression number (from your name) represents the talents and qualities you bring to that journey — how you naturally express yourself. Together they give a fuller picture of who you are and where you are headed.',
      },
    },
  ],
};

const PYTHAGOREAN = [
  { letters: 'A, J, S', value: 1 },
  { letters: 'B, K, T', value: 2 },
  { letters: 'C, L, U', value: 3 },
  { letters: 'D, M, V', value: 4 },
  { letters: 'E, N, W', value: 5 },
  { letters: 'F, O, X', value: 6 },
  { letters: 'G, P, Y', value: 7 },
  { letters: 'H, Q, Z', value: 8 },
  { letters: 'I, R', value: 9 },
];

export default function NameCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <main className="pt-24">

        {/* ── Header ── */}
        <section className="border-b border-white/5 bg-[#0a0a0f] px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 font-body text-xs uppercase tracking-[0.2em] text-[#c9a84c]/70">
              Numerology calculator — name
            </p>
            <h1 className="mb-6 font-display text-[clamp(2rem,5vw,3.5rem)] font-light leading-tight text-[#f0ede8]">
              Numerology Calculator by Name
            </h1>
            <p className="mx-auto max-w-lg font-body text-base leading-relaxed text-[#f0ede8]/55">
              Calculate your Expression number and Soul Urge number from your full birth name.
              Currently in development — launching with Phase 2.
            </p>
          </div>
        </section>

        {/* ── Coming soon banner ── */}
        <section className="border-b border-[#c9a84c]/20 bg-[#c9a84c]/5 px-6 py-10">
          <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-1 font-body text-xs uppercase tracking-[0.2em] text-[#c9a84c]/70">
                Coming soon
              </p>
              <p className="font-body text-base text-[#f0ede8]/75">
                The name numerology calculator is in development. In the meantime, calculate your
                life path number instantly below.
              </p>
            </div>
            <Link
              href="/life-path-number-calculator"
              className="shrink-0 border border-[#c9a84c] px-8 py-3 font-body text-sm uppercase tracking-widest text-[#c9a84c] transition-colors hover:bg-[#c9a84c] hover:text-[#0a0a0f]"
            >
              Life path calculator
            </Link>
          </div>
        </section>

        {/* ── What is name numerology ── */}
        <section className="border-b border-white/5 px-6 py-16" aria-labelledby="what-is-name">
          <article className="mx-auto max-w-3xl">
            <h2 id="what-is-name" className="mb-8 font-display text-2xl font-light text-[#f0ede8]">
              What is a numerology calculator by name?
            </h2>
            <div className="space-y-4 font-body text-base leading-relaxed text-[#f0ede8]/65">
              <p>
                A numerology calculator by name converts the letters of your full birth name into
                numerical values using the Pythagorean alphabet chart, then reduces the total to a
                core number. The two most significant results are the{' '}
                <strong className="text-[#f0ede8]/90">Expression number</strong> and the{' '}
                <strong className="text-[#f0ede8]/90">Soul Urge number</strong>.
              </p>
              <p>
                Where your life path number (calculated from your date of birth) describes the overall
                journey and purpose of your life, your name numbers describe the qualities and desires
                you bring to that journey. Together, the three core numbers — life path, Expression,
                and Soul Urge — form the foundation of a complete numerology reading.
              </p>
              <p>
                The name used in the calculation is always your{' '}
                <strong className="text-[#f0ede8]/90">full birth name</strong> as it appears on your
                birth certificate, including middle names. Married names, nicknames, and shortened
                names are not used in classical numerology, as the birth name is considered the
                energetically significant one.
              </p>
            </div>
          </article>
        </section>

        {/* ── Expression number ── */}
        <section className="border-b border-white/5 px-6 py-16" aria-labelledby="expression">
          <div className="mx-auto max-w-3xl">
            <h2 id="expression" className="mb-8 font-display text-2xl font-light text-[#f0ede8]">
              The Expression number
            </h2>
            <div className="space-y-4 font-body text-base leading-relaxed text-[#f0ede8]/65">
              <p>
                Your <strong className="text-[#f0ede8]/90">Expression number</strong> (also known as
                the Destiny number) is calculated from every letter of your full birth name. It
                reveals the natural talents, abilities, and potential you carry into this lifetime —
                the full range of what you are capable of expressing in the world.
              </p>
              <p>
                Each letter in the Pythagorean system is assigned a value from 1 to 9. All values
                are summed across your complete name and reduced to a single digit or Master Number
                (11, 22, or 33). The result describes not what you have achieved, but what you are
                naturally equipped to become.
              </p>
            </div>
          </div>
        </section>

        {/* ── Soul Urge number ── */}
        <section className="border-b border-white/5 px-6 py-16" aria-labelledby="soul-urge">
          <div className="mx-auto max-w-3xl">
            <h2 id="soul-urge" className="mb-8 font-display text-2xl font-light text-[#f0ede8]">
              The Soul Urge number
            </h2>
            <div className="space-y-4 font-body text-base leading-relaxed text-[#f0ede8]/65">
              <p>
                Your <strong className="text-[#f0ede8]/90">Soul Urge number</strong> (also called the
                Heart&rsquo;s Desire number) is calculated from the vowels only in your full birth name.
                The vowels in numerology are A, E, I, O, U — and in some traditions, Y when it
                functions as a vowel sound.
              </p>
              <p>
                Because vowels carry the sound and breath of a name, they are considered to reflect
                the inner self — the private motivations, deepest desires, and emotional needs that
                drive your choices beneath the surface. Your Soul Urge number often explains the gap
                between what you show the world and what you truly want from it.
              </p>
            </div>
          </div>
        </section>

        {/* ── Pythagorean chart ── */}
        <section className="border-b border-white/5 px-6 py-16" aria-labelledby="pythagorean-chart">
          <div className="mx-auto max-w-3xl">
            <h2 id="pythagorean-chart" className="mb-4 font-display text-2xl font-light text-[#f0ede8]">
              The Pythagorean number chart
            </h2>
            <p className="mb-8 font-body text-base leading-relaxed text-[#f0ede8]/65">
              The Pythagorean system assigns each letter of the alphabet a value from 1 to 9, cycling
              sequentially. This chart is the foundation of all name-based numerology calculations.
            </p>
            <div className="grid grid-cols-3 gap-px border border-white/5 sm:grid-cols-9">
              {PYTHAGOREAN.map(({ value, letters }) => (
                <div key={value} className="border border-white/5 bg-white/[0.02] p-4 text-center">
                  <p className="mb-2 font-display text-2xl text-[#c9a84c]">{value}</p>
                  <p className="font-body text-xs leading-relaxed text-[#f0ede8]/45">{letters}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 font-body text-sm text-[#f0ede8]/35">
              Example: ANNA = A(1) + N(5) + N(5) + A(1) = 12 → 1+2 = 3. Expression number: 3.
            </p>
          </div>
        </section>

        {/* ── Difference from life path ── */}
        <section className="border-b border-white/5 px-6 py-16" aria-labelledby="lp-vs-name">
          <div className="mx-auto max-w-3xl">
            <h2 id="lp-vs-name" className="mb-8 font-display text-2xl font-light text-[#f0ede8]">
              Life path vs. name — what is the difference?
            </h2>
            <div className="grid grid-cols-1 gap-px sm:grid-cols-2">
              {[
                {
                  label: 'Life Path Number',
                  source: 'Date of birth',
                  reveals: 'Your overarching life journey, purpose, and natural disposition',
                  fixed: 'Fixed — your birth date never changes',
                },
                {
                  label: 'Expression Number',
                  source: 'Full birth name (all letters)',
                  reveals: 'Your natural talents, abilities, and potential for expression',
                  fixed: 'Fixed — your birth name does not change',
                },
              ].map(({ label, source, reveals, fixed }) => (
                <div key={label} className="border border-white/5 bg-white/[0.02] p-6">
                  <p className="mb-4 font-body text-xs uppercase tracking-widest text-[#c9a84c]">
                    {label}
                  </p>
                  <dl className="space-y-3">
                    <div>
                      <dt className="font-body text-xs text-[#f0ede8]/35">Calculated from</dt>
                      <dd className="font-body text-base text-[#f0ede8]/75">{source}</dd>
                    </div>
                    <div>
                      <dt className="font-body text-xs text-[#f0ede8]/35">Reveals</dt>
                      <dd className="font-body text-base text-[#f0ede8]/75">{reveals}</dd>
                    </div>
                    <div>
                      <dt className="font-body text-xs text-[#f0ede8]/35">Permanence</dt>
                      <dd className="font-body text-base text-[#f0ede8]/75">{fixed}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="border-b border-white/5 px-6 py-24" aria-labelledby="faq-name">
          <div className="mx-auto max-w-3xl">
            <h2 id="faq-name" className="mb-12 font-display text-3xl font-light text-[#f0ede8]">
              Frequently asked questions
            </h2>
            <div className="divide-y divide-white/5">
              {[
                {
                  q: 'What name should I use?',
                  a: 'Always use your full birth name exactly as it appears on your birth certificate, including all middle names. Do not use a married name, a shortened version, or a nickname. The birth name is the energetically significant one in classical numerology.',
                },
                {
                  q: 'What if I have a hyphenated surname?',
                  a: 'Include all parts of a hyphenated surname. Treat the name as written on your birth certificate. If your certificate uses a hyphen, include both parts; if not, follow the document exactly.',
                },
                {
                  q: 'Does a changed name affect my numerology?',
                  a: 'In classical numerology, the birth name is primary. Changed names — married names, legal name changes, or professional names — are sometimes analysed separately as secondary influences, but the birth name remains the foundation of a core reading.',
                },
                {
                  q: 'Is the name calculator different from the life path calculator?',
                  a: 'Yes. The life path calculator uses your date of birth only. The name calculator uses your full birth name to compute your Expression number and Soul Urge number. Both are part of a complete numerology profile, but they are calculated independently.',
                },
                {
                  q: 'When will the name calculator be available?',
                  a: 'The name numerology calculator is in active development as Phase 2 of YourNumerologyReport. It will include Expression number, Soul Urge number, and a full personalised report. In the meantime, you can use the free life path calculator to get started.',
                },
              ].map(({ q, a }) => (
                <details key={q} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                    <span className="font-body text-lg text-[#f0ede8]">{q}</span>
                    <span className="mt-0.5 shrink-0 font-body text-lg text-[#c9a84c] transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 font-body text-base leading-relaxed text-[#f0ede8]/60">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA to working calculator ── */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-display text-3xl font-light text-[#f0ede8]">
              Start with your life path number
            </h2>
            <p className="mx-auto mb-8 max-w-md font-body text-base leading-relaxed text-[#f0ede8]/55">
              While the name calculator is in development, calculate your life path number from your
              date of birth — free and instant.
            </p>
            <Link
              href="/life-path-number-calculator"
              className="inline-block border border-[#c9a84c] px-10 py-3.5 font-body text-sm uppercase tracking-widest text-[#c9a84c] transition-colors hover:bg-[#c9a84c] hover:text-[#0a0a0f]"
            >
              Free life path calculator
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}
