import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Numerology Calculator by Name — Expression & Soul Urge Numbers',
  description:
    'Name numerology calculator — calculate your Expression number and Soul Urge number from your full birth name. Learn what your name reveals about your talents, desires, and direction.',
  alternates: {
    canonical: 'https://lifepathnumerologycalculator.com/numerology-calculator-name',
  },
  openGraph: {
    title: 'Numerology Calculator by Name — Expression & Soul Urge Numbers | Life Path Numerology Calculator',
    description:
      'Name numerology calculator — calculate your Expression number and Soul Urge number from your full birth name.',
    url: 'https://lifepathnumerologycalculator.com/numerology-calculator-name',
  },
};

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lifepathnumerologycalculator.com' },
    { '@type': 'ListItem', position: 2, name: 'Numerology Calculator by Name', item: 'https://lifepathnumerologycalculator.com/numerology-calculator-name' },
  ],
};

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is a numerology calculator by name?', acceptedAnswer: { '@type': 'Answer', text: 'A name numerology calculator converts the letters of your full birth name into numbers using the Pythagorean alphabet chart (A=1, B=2, C=3, and so on up to I=9, then repeating). The resulting digits are summed and reduced to calculate core numerology numbers such as the Expression number and Soul Urge number.' } },
    { '@type': 'Question', name: 'What is an Expression number?', acceptedAnswer: { '@type': 'Answer', text: 'Your Expression number (also called the Destiny number) is calculated from all the letters of your full birth name. It reveals your natural talents, abilities, and the potential you carry into this lifetime.' } },
    { '@type': 'Question', name: 'What is a Soul Urge number?', acceptedAnswer: { '@type': 'Answer', text: "Your Soul Urge number (also called the Heart's Desire number) is calculated from only the vowels in your full birth name. It reveals your innermost motivations, what you truly want from life, and the deeper desires that drive your decisions." } },
    { '@type': 'Question', name: 'Which name should I use for a name numerology calculator?', acceptedAnswer: { '@type': 'Answer', text: 'Always use your full birth name as it appears on your birth certificate — including middle names if you have them. Do not use a married name, shortened name, or nickname.' } },
    { '@type': 'Question', name: 'What is the difference between life path and Expression number?', acceptedAnswer: { '@type': 'Answer', text: 'Your life path number (from your date of birth) represents the overarching journey and purpose of your life. Your Expression number (from your name) represents the talents and qualities you bring to that journey.' } },
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

const pStyle = { fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 300, lineHeight: 1.85, color: 'var(--color-body)' } as const;
const h2Style = { fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: 'var(--color-ink)' } as const;
const labelStyle = { fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '3px', textTransform: 'uppercase' as const, color: 'var(--color-accent)', fontWeight: 400 };

export default function NameCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <main className="pt-24">

        {/* Header */}
        <section className="px-6 py-20" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-muted)' }}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4" style={labelStyle}>Numerology calculator — name</p>
            <h1 className="mb-6" style={h2Style}>Numerology Calculator by Name</h1>
            <p className="mx-auto max-w-lg" style={pStyle}>
              Calculate your Expression number and Soul Urge number from your full birth name.
              Currently in development — launching with Phase 2.
            </p>
          </div>
        </section>

        {/* Coming soon banner */}
        <section className="px-6 py-10" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-accent-soft)' }}>
          <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2" style={labelStyle}>Coming soon</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 300, color: 'var(--color-body)', lineHeight: 1.7 }}>
                The name numerology calculator is in development. In the meantime, calculate your life path number instantly.
              </p>
            </div>
            <Link
              href="/life-path-number-calculator"
              style={{ flexShrink: 0, display: 'inline-block', background: 'var(--color-ink)', color: 'var(--color-bg)', fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', padding: '12px 24px', fontWeight: 400 }}
            >
              Life path calculator
            </Link>
          </div>
        </section>

        {/* What is name numerology */}
        <section className="px-6 py-16" aria-labelledby="what-is-name" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <article className="mx-auto max-w-3xl">
            <h2 id="what-is-name" className="mb-8" style={h2Style}>What is a numerology calculator by name?</h2>
            <div className="space-y-4">
              {[
                <>A numerology calculator by name converts the letters of your full birth name into numerical values using the Pythagorean alphabet chart, then reduces the total to a core number. The two most significant results are the <strong style={{ fontWeight: 500, color: 'var(--color-ink)' }}>Expression number</strong> and the <strong style={{ fontWeight: 500, color: 'var(--color-ink)' }}>Soul Urge number</strong>.</>,
                `Where your life path number (calculated from your date of birth) describes the overall journey and purpose of your life, your name numbers describe the qualities and desires you bring to that journey. Together, the three core numbers — life path, Expression, and Soul Urge — form the foundation of a complete numerology reading.`,
                <>The name used in the calculation is always your <strong style={{ fontWeight: 500, color: 'var(--color-ink)' }}>full birth name</strong> as it appears on your birth certificate, including middle names. Married names, nicknames, and shortened names are not used in classical numerology, as the birth name is considered the energetically significant one.</>,
              ].map((text, i) => <p key={i} style={pStyle}>{text}</p>)}
            </div>
          </article>
        </section>

        {/* Expression number */}
        <section className="px-6 py-16" aria-labelledby="expression" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-raised)' }}>
          <div className="mx-auto max-w-3xl">
            <h2 id="expression" className="mb-8" style={h2Style}>The Expression number</h2>
            <div className="space-y-4">
              {[
                <>Your <strong style={{ fontWeight: 500, color: 'var(--color-ink)' }}>Expression number</strong> (also known as the Destiny number) is calculated from every letter of your full birth name. It reveals the natural talents, abilities, and potential you carry into this lifetime — the full range of what you are capable of expressing in the world.</>,
                `Each letter in the Pythagorean system is assigned a value from 1 to 9. All values are summed across your complete name and reduced to a single digit or Master Number (11, 22, or 33). The result describes not what you have achieved, but what you are naturally equipped to become.`,
              ].map((text, i) => <p key={i} style={pStyle}>{text}</p>)}
            </div>
          </div>
        </section>

        {/* Soul Urge number */}
        <section className="px-6 py-16" aria-labelledby="soul-urge" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div className="mx-auto max-w-3xl">
            <h2 id="soul-urge" className="mb-8" style={h2Style}>The Soul Urge number</h2>
            <div className="space-y-4">
              {[
                <>Your <strong style={{ fontWeight: 500, color: 'var(--color-ink)' }}>Soul Urge number</strong> (also called the Heart&rsquo;s Desire number) is calculated from the vowels only in your full birth name. The vowels in numerology are A, E, I, O, U — and in some traditions, Y when it functions as a vowel sound.</>,
                `Because vowels carry the sound and breath of a name, they are considered to reflect the inner self — the private motivations, deepest desires, and emotional needs that drive your choices beneath the surface. Your Soul Urge number often explains the gap between what you show the world and what you truly want from it.`,
              ].map((text, i) => <p key={i} style={pStyle}>{text}</p>)}
            </div>
          </div>
        </section>

        {/* Pythagorean chart */}
        <section className="px-6 py-16" aria-labelledby="pythagorean-chart" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-raised)' }}>
          <div className="mx-auto max-w-3xl">
            <h2 id="pythagorean-chart" className="mb-4" style={h2Style}>The Pythagorean number chart</h2>
            <p className="mb-8" style={pStyle}>
              The Pythagorean system assigns each letter of the alphabet a value from 1 to 9, cycling sequentially. This chart is the foundation of all name-based numerology calculations.
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-9" style={{ gap: 1, background: 'var(--color-border)' }}>
              {PYTHAGOREAN.map(({ value, letters }) => (
                <div key={value} className="p-4 text-center" style={{ background: 'var(--color-bg-muted)' }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: 'var(--color-accent)', marginBottom: 6 }}>{value}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 300, color: 'var(--color-muted)', lineHeight: 1.4 }}>{letters}</p>
                </div>
              ))}
            </div>
            <p className="mt-4" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 300, color: 'var(--color-faint)' }}>
              Example: ANNA = A(1) + N(5) + N(5) + A(1) = 12 → 1+2 = 3. Expression number: 3.
            </p>
          </div>
        </section>

        {/* Life path vs name */}
        <section className="px-6 py-16" aria-labelledby="lp-vs-name" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div className="mx-auto max-w-3xl">
            <h2 id="lp-vs-name" className="mb-8" style={h2Style}>Life path vs. name — what is the difference?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 1, background: 'var(--color-border)' }}>
              {[
                { label: 'Life Path Number', source: 'Date of birth', reveals: 'Your overarching life journey, purpose, and natural disposition', fixed: 'Fixed — your birth date never changes' },
                { label: 'Expression Number', source: 'Full birth name (all letters)', reveals: 'Your natural talents, abilities, and potential for expression', fixed: 'Fixed — your birth name does not change' },
              ].map(({ label, source, reveals, fixed }) => (
                <div key={label} style={{ background: 'var(--color-bg-raised)', padding: 24 }}>
                  <p style={{ ...labelStyle, marginBottom: 16 }}>{label}</p>
                  <dl className="space-y-3">
                    {[{ dt: 'Calculated from', dd: source }, { dt: 'Reveals', dd: reveals }, { dt: 'Permanence', dd: fixed }].map(({ dt, dd }) => (
                      <div key={dt}>
                        <dt style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 300, color: 'var(--color-faint)', marginBottom: 2 }}>{dt}</dt>
                        <dd style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 300, color: 'var(--color-body)' }}>{dd}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ad */}
        <div className="px-6 py-8" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div className="mx-auto max-w-6xl" ta-ad-container=""></div>
        </div>

        {/* FAQ */}
        <section className="px-6 py-24" aria-labelledby="faq-name" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-muted)' }}>
          <div className="mx-auto max-w-3xl">
            <h2 id="faq-name" className="mb-12" style={h2Style}>Frequently asked questions</h2>
            <div style={{ borderTop: '1px solid var(--color-border)' }}>
              {[
                { q: 'What name should I use?', a: 'Always use your full birth name exactly as it appears on your birth certificate, including all middle names. Do not use a married name, a shortened version, or a nickname. The birth name is the energetically significant one in classical numerology.' },
                { q: 'What if I have a hyphenated surname?', a: 'Include all parts of a hyphenated surname. Treat the name as written on your birth certificate. If your certificate uses a hyphen, include both parts; if not, follow the document exactly.' },
                { q: 'Does a changed name affect my numerology?', a: 'In classical numerology, the birth name is primary. Changed names — married names, legal name changes, or professional names — are sometimes analysed separately as secondary influences, but the birth name remains the foundation of a core reading.' },
                { q: 'Is the name calculator different from the life path calculator?', a: 'Yes. The life path calculator uses your date of birth only. The name calculator uses your full birth name to compute your Expression number and Soul Urge number. Both are part of a complete numerology profile, but they are calculated independently.' },
                { q: 'When will the name calculator be available?', a: 'The name numerology calculator is in active development as Phase 2 of Life Path Numerology Calculator. It will include Expression number, Soul Urge number, and a full personalised report. In the meantime, you can use the free life path calculator to get started.' },
              ].map(({ q, a }) => (
                <details key={q} className="group py-6" style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, fontWeight: 300, color: 'var(--color-ink)' }}>{q}</span>
                    <span style={{ flexShrink: 0, fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: 'var(--color-accent)', marginTop: 2 }}>+</span>
                  </summary>
                  <p className="mt-4" style={pStyle}>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-20 text-center" style={{ background: 'var(--color-bg)' }}>
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4" style={h2Style}>Start with your life path number</h2>
            <p className="mx-auto mb-8 max-w-md" style={pStyle}>
              While the name calculator is in development, calculate your life path number from your date of birth — free and instant.
            </p>
            <Link
              href="/life-path-number-calculator"
              style={{ display: 'inline-block', background: 'var(--color-ink)', color: 'var(--color-bg)', fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', padding: '14px 32px', fontWeight: 400 }}
            >
              Free life path calculator
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}
