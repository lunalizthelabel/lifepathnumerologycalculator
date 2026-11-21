'use client';

import { useId, useRef, useState } from 'react';
import { ENTERTAINMENT_ACK_TEXT, WITHDRAWAL_CONSENT_TEXT } from '@/lib/legal/withdrawalConsent';

type Props = {
  birthDate: string;
  lifePath: number;
  personalYear: number;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ERROR_COLOR = '#b03a2e';

function emailProblem(value: string): string {
  const v = value.trim();
  if (!v) return 'Please enter your email address. We send your report link there.';
  if (!EMAIL_PATTERN.test(v)) return 'That email address does not look right. Please check it.';
  return '';
}

/** Bring a field into view and focus it, without the focus call jumping the page. */
function showField(el: HTMLElement | null) {
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  el.focus({ preventScroll: true });
}

export default function NumerologyLayer2Checkout({ birthDate, lifePath, personalYear }: Props) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  // One consent box: entertainment-only acknowledgement plus the EU withdrawal waiver. Never pre-ticked.
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const emailRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);
  const id = useId();
  const emailId = `${id}-email`;
  const emailErrorId = `${id}-email-error`;
  const consentId = `${id}-consent`;
  const consentErrorId = `${id}-consent-error`;

  const price = process.env.NEXT_PUBLIC_LAYER2_PRICE_DISPLAY || '$11';
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    // Validate on click; the button itself is never disabled for missing fields.
    const emailIssue = emailProblem(email);
    setEmailError(emailIssue);
    setConsentError(!consent);
    if (emailIssue) {
      showField(emailRef.current);
      return;
    }
    if (!consent) {
      showField(consentRef.current);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          birthDate,
          lifePath,
          personalYear,
          currentYear,
          currentMonth,
          email: email.trim(),
          withdrawalWaiverConsent: consent,
        }),
      });
      if (!res.ok) throw new Error('Could not create checkout session');
      const { checkoutUrl } = await res.json();
      window.location.href = checkoutUrl;
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  const messageStyle = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 'var(--fs-12)',
    fontWeight: 'var(--fw-500)',
    lineHeight: 1.5,
    color: ERROR_COLOR,
  };
  const smallPrint = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 'var(--fs-11)',
    fontWeight: 'var(--fw-400)',
    color: 'var(--color-faint)',
  };
  const linkStyle = { color: 'var(--color-accent-deep)', textDecoration: 'underline' };

  return (
    // noValidate: we show our own inline messages instead of the browser's pop-up bubbles.
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div>
        <label htmlFor={emailId} className="sr-only">
          Your email address
        </label>
        <input
          ref={emailRef}
          id={emailId}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="go"
          placeholder="Your email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            // Clear the message as soon as the address is fixed; do not nag while typing.
            if (emailError && !emailProblem(e.target.value)) setEmailError('');
          }}
          onBlur={() => {
            if (email.trim()) setEmailError(emailProblem(email));
          }}
          disabled={loading}
          aria-required="true"
          aria-invalid={emailError ? true : undefined}
          aria-describedby={emailError ? emailErrorId : undefined}
          className="lp-field"
          data-invalid={emailError ? 'true' : undefined}
          style={{
            background: 'var(--color-bg-raised)',
            borderRadius: 0,
            padding: '12px 16px',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'var(--fs-14)',
            fontWeight: 'var(--fw-400)',
            color: 'var(--color-ink)',
            width: '100%',
            opacity: loading ? 0.5 : 1,
          }}
        />
        {emailError && (
          <p id={emailErrorId} role="alert" style={{ ...messageStyle, marginTop: 6 }}>
            {emailError}
          </p>
        )}
      </div>

      {/* Single consent box. Both statements stay in full: entertainment only, and the EU withdrawal waiver. */}
      <div>
        <div
          className="flex items-start gap-3"
          style={{
            padding: 10,
            margin: -10,
            outline: consentError ? `1px solid ${ERROR_COLOR}` : 'none',
            background: consentError ? 'rgba(176, 58, 46, 0.05)' : 'transparent',
          }}
        >
          <input
            ref={consentRef}
            id={consentId}
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (e.target.checked) setConsentError(false);
            }}
            disabled={loading}
            aria-required="true"
            aria-invalid={consentError ? true : undefined}
            aria-describedby={consentError ? consentErrorId : undefined}
            style={{ marginTop: 2, width: 18, height: 18, flexShrink: 0, accentColor: 'var(--color-accent)', cursor: 'pointer' }}
          />
          <label
            htmlFor={consentId}
            className="cursor-pointer"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'var(--fs-11)', fontWeight: 'var(--fw-400)', lineHeight: 1.6, color: 'var(--color-muted)' }}
          >
            {ENTERTAINMENT_ACK_TEXT} {WITHDRAWAL_CONSENT_TEXT}
          </label>
        </div>
        {consentError && (
          <p id={consentErrorId} role="alert" style={{ ...messageStyle, marginTop: 16 }}>
            Please tick this box to continue. Your report is delivered immediately, so we need your consent first.
          </p>
        )}
        <p style={{ ...smallPrint, marginTop: consentError ? 6 : 16, marginLeft: 30 }}>
          <a href="/disclaimer#right-of-withdrawal" target="_blank" rel="noopener" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>
            About your right of withdrawal
          </a>
        </p>
      </div>

      {error && (
        <p role="alert" style={messageStyle}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{
          background: 'var(--color-ink)',
          color: 'var(--color-bg-raised)',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 'var(--fs-15)',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          padding: '18px 24px',
          border: 'none',
          borderRadius: 0,
          cursor: loading ? 'wait' : 'pointer',
          opacity: loading ? 0.7 : 1,
          fontWeight: 'var(--fw-600)',
          lineHeight: 1.3,
          transition: 'opacity 0.2s',
          width: '100%',
        }}
      >
        {loading ? 'Redirecting...' : `Get Full Report · ${price}`}
      </button>

      <p style={{ ...smallPrint, textAlign: 'center', lineHeight: 1.7 }}>
        Secure payment via Stripe &middot; Instant delivery after purchase
        <br />
        <a href="/privacy" target="_blank" rel="noopener" style={linkStyle}>
          Privacy Policy
        </a>{' '}
        &middot;{' '}
        <a href="/disclaimer" target="_blank" rel="noopener" style={linkStyle}>
          Disclaimer
        </a>
      </p>
    </form>
  );
}
