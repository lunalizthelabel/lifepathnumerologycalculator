import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-bg-muted)', borderTop: '1px solid var(--color-border)' }} className="px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 300, color: 'var(--color-faint)' }}>
          &copy; {new Date().getFullYear()} Life Path Numerology Calculator. All rights reserved.
        </p>
        <ul className="flex gap-6">
          {[
            { href: '/about', label: 'About' },
            { href: '/privacy', label: 'Privacy Policy' },
            { href: '/disclaimer', label: 'Disclaimer' },
          ].map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 300, color: 'var(--color-faint)' }}
                className="transition-colors hover:text-[var(--color-accent)]"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
