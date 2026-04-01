import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for YourNumerologyReport — how we handle your data and your rights under GDPR.',
  alternates: { canonical: 'https://yournumerologyreport.com/privacy' },
  robots: { index: false, follow: false },
};

const LAST_UPDATED = '1 April 2025';

const sections = [
  {
    id: 'who-we-are',
    heading: 'Who we are',
    body: `This website is operated by YourNumerologyReport ("we", "us", "our"). For the purposes of the General Data Protection Regulation (GDPR) and applicable Dutch and EU data protection law, we are the data controller for any personal data processed in connection with this website.

If you have any questions about how we handle your data, you can contact us at: privacy@yournumerologyreport.com`,
  },
  {
    id: 'data-we-collect',
    heading: 'What data we collect and why',
    body: `We collect as little data as possible. Below is a complete overview of what this site collects and on what legal basis.

**Date of birth (calculator input)**
When you enter a date of birth into the life path calculator, it is processed entirely within your browser. It is never transmitted to our servers, never stored in a database, and never associated with any other data. We do not see it, log it, or retain it in any form.

**Analytics data (Google Analytics, with consent)**
If you consent to analytics cookies via the cookie banner, we use Google Analytics 4 to collect anonymised information about how visitors use the site. This includes pages visited, time on site, general geographic region (country level), device type, and browser. We have enabled IP anonymisation, which means your full IP address is never stored by Google Analytics.

Legal basis: Consent (Art. 6(1)(a) GDPR). Analytics are only activated after you click "Got it!" on the cookie banner.

**Server logs**
Like all websites, our hosting provider may automatically record standard server log data (IP address, browser type, referring URL, time of request). This data is used only for security and operational purposes and is retained for a maximum of 30 days before being automatically deleted. We do not use this data to identify individuals.

Legal basis: Legitimate interests (Art. 6(1)(f) GDPR) — maintaining a secure and functioning website.`,
  },
  {
    id: 'cookies',
    heading: 'Cookies',
    body: `We use the following cookies on this site:

**ynr_cookie_consent** — a first-party cookie stored in your browser's localStorage that records whether you have accepted analytics cookies. It does not expire and contains no personal data. It is set only when you click "Got it!" on the cookie banner.

**Google Analytics cookies (_ga, _ga_*)** — these are set only after you have given consent. They are used by Google Analytics to distinguish visitors and track session data. They expire after 13 months (_ga) and 13 months (_ga_*). These cookies are set by Google and are subject to Google's Privacy Policy.

We do not use advertising cookies, tracking pixels, or any cookies that identify you personally.`,
  },
  {
    id: 'data-retention',
    heading: 'How long we keep data',
    body: `Analytics data in Google Analytics is retained for 14 months, after which it is automatically deleted. You can withdraw your consent at any time by clearing your browser's localStorage (key: ynr_cookie_consent). This will cause the cookie banner to reappear on your next visit and no further analytics data will be collected until consent is given again.

Server log data is retained for a maximum of 30 days.

Calculator inputs (date of birth) are never stored and therefore have no retention period.`,
  },
  {
    id: 'third-parties',
    heading: 'Third-party services',
    body: `When analytics are enabled, data is processed by Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Ireland) under the terms of Google's Data Processing Agreement. Google may transfer data to countries outside the EEA. Where this occurs, Google relies on Standard Contractual Clauses approved by the European Commission as the lawful transfer mechanism.

We do not use any other third-party data processors at this time. If this changes, this policy will be updated.`,
  },
  {
    id: 'your-rights',
    heading: 'Your rights under GDPR',
    body: `Under the General Data Protection Regulation, you have the following rights regarding your personal data:

**Right of access (Art. 15)** — You may request a copy of any personal data we hold about you.

**Right to rectification (Art. 16)** — You may request that any inaccurate personal data be corrected.

**Right to erasure (Art. 17)** — You may request that we delete your personal data where there is no legitimate reason for us to continue holding it.

**Right to restriction of processing (Art. 18)** — You may request that we restrict the processing of your data in certain circumstances.

**Right to data portability (Art. 20)** — Where processing is based on consent and carried out by automated means, you may request your data in a structured, machine-readable format.

**Right to object (Art. 21)** — You may object at any time to processing based on our legitimate interests.

**Right to withdraw consent (Art. 7(3))** — Where processing is based on consent, you may withdraw that consent at any time. Withdrawal does not affect the lawfulness of processing prior to withdrawal. To withdraw analytics consent, clear your browser's localStorage key ynr_cookie_consent.

**Right to lodge a complaint** — If you believe we are handling your data unlawfully, you have the right to lodge a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens) at autoriteitpersoonsgegevens.nl, or with the supervisory authority in your country of residence.`,
  },
  {
    id: 'exercise-rights',
    heading: 'How to exercise your rights',
    body: `To exercise any of the rights listed above, please contact us at privacy@yournumerologyreport.com. We will respond within 30 days. We may need to verify your identity before processing certain requests.

Because we collect very little data and none of it is tied to an identity, most requests will be straightforward to fulfil.`,
  },
  {
    id: 'children',
    heading: "Children's privacy",
    body: `This site is not directed at children under the age of 16. We do not knowingly collect personal data from children. If you believe a child has provided data through this site, please contact us and we will take immediate steps to delete it.`,
  },
  {
    id: 'changes',
    heading: 'Changes to this policy',
    body: `We may update this Privacy Policy from time to time, for example when we add new features (such as the paid report functionality planned for Phase 2), when legal requirements change, or when we change our data processing practices.

Any material changes will be reflected on this page with an updated date. We encourage you to review this page periodically. Continued use of the site after changes are posted constitutes acceptance of the revised policy.`,
  },
  {
    id: 'contact',
    heading: 'Contact',
    body: `For any questions, requests, or concerns regarding this Privacy Policy or how we handle your data, please contact:

YourNumerologyReport
Email: privacy@yournumerologyreport.com

We will do our best to respond within 5 business days.`,
  },
];

export default function PrivacyPage() {
  return (
    <main className="pt-24">
      {/* Header */}
      <section className="border-b border-white/5 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 font-body text-xs uppercase tracking-[0.2em] text-[#c9a84c]/70">
            Legal
          </p>
          <h1 className="mb-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-light leading-tight text-[#f0ede8]">
            Privacy Policy
          </h1>
          <p className="font-body text-sm text-[#f0ede8]/35">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="border-b border-white/5 px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <p className="font-body text-base leading-relaxed text-[#f0ede8]/65">
            Your privacy matters to us. This policy explains exactly what data YourNumerologyReport
            collects, why we collect it, how long we keep it, and what rights you have under the
            General Data Protection Regulation (GDPR). We have written it in plain language — not
            legalese — because we believe you deserve to understand it.
          </p>
        </div>
      </section>

      {/* Sections */}
      <div className="px-6 py-12">
        <div className="mx-auto max-w-3xl space-y-12">
          {sections.map(({ id, heading, body }) => (
            <section key={id} id={id} className="scroll-mt-28 border-t border-white/5 pt-10">
              <h2 className="mb-5 font-display text-2xl font-light text-[#f0ede8]">{heading}</h2>
              <div className="space-y-4">
                {body.split('\n\n').map((para, i) => {
                  // Render **bold** inline
                  const parts = para.split(/\*\*(.+?)\*\*/g);
                  return (
                    <p key={i} className="font-body text-base leading-relaxed text-[#f0ede8]/65">
                      {parts.map((part, j) =>
                        j % 2 === 1 ? (
                          <strong key={j} className="font-medium text-[#f0ede8]/90">
                            {part}
                          </strong>
                        ) : (
                          part
                        )
                      )}
                    </p>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
