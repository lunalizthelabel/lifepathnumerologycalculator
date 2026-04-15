'use client';

import { useState } from 'react';

type Props = {
  birthDate: string;
  lifePath: number;
  personalYear: number;
};

export default function NumerologyLayer2Checkout({ birthDate, lifePath, personalYear }: Props) {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const price = process.env.NEXT_PUBLIC_LAYER2_PRICE_DISPLAY ?? '$19';
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
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

  const inputStyle = {
    background: 'var(--color-bg-raised)',
    border: '1px solid var(--color-border)',
    borderRadius: 0,
    padding: '12px 16px',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    fontWeight: 300,
    color: 'var(--color-ink)',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="email"
        required
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        style={{ ...inputStyle, opacity: loading ? 0.5 : 1 }}
        onFocus={(e) => { e.target.style.borderColor = 'var(--color-accent)'; }}
        onBlur={(e) => { e.target.style.borderColor = 'var(--color-border)'; }}
      />
      {error && (
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#c0392b' }}>{error}</p>
      )}

      {/* Disclaimer checkbox */}
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          disabled={loading}
          style={{ marginTop: 2, width: 16, height: 16, flexShrink: 0, accentColor: 'var(--color-accent)', cursor: 'pointer' }}
        />
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 300, lineHeight: 1.6, color: 'var(--color-faint)' }}>
          I understand this report is for entertainment and self-reflection purposes only.
        </span>
      </label>

      <button
        type="submit"
        disabled={loading || !email.trim() || !agreed}
        style={{
          background: loading || !email.trim() || !agreed ? 'var(--color-bg-muted)' : 'var(--color-ink)',
          color: loading || !email.trim() || !agreed ? 'var(--color-faint)' : 'var(--color-bg)',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 10,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          padding: '14px 32px',
          border: 'none',
          borderRadius: 0,
          cursor: loading || !email.trim() || !agreed ? 'not-allowed' : 'pointer',
          fontWeight: 400,
          transition: 'background 0.2s, color 0.2s',
          width: '100%',
        }}
      >
        {loading ? 'Redirecting...' : `Get Full Report — ${price}`}
      </button>

      <p style={{ textAlign: 'center', fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 300, color: 'var(--color-faint)' }}>
        Secure payment via Stripe &middot; Instant delivery after purchase
      </p>
    </form>
  );
}
