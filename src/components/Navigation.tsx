import Link from 'next/link';

export default function Navigation() {
  return (
    <header style={{ background: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)' }} className="fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 300, color: 'var(--color-ink)', letterSpacing: '0.5px' }}
          className="transition-opacity hover:opacity-60"
        >
          Life Path Numerology
        </Link>
        <ul className="flex items-center gap-8">
          {[
            { href: '/life-path-number-calculator', label: 'Calculator' },
            { href: '/numerology-calculator-name', label: 'Name Calculator' },
            { href: '/about', label: 'About' },
          ].map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--color-muted)', fontWeight: 400 }}
                className="transition-colors hover:text-[var(--color-accent)]"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
