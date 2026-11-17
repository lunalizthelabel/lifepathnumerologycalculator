'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const LINKS = [
  { href: '/life-path-number-calculator', label: 'Calculator' },
  { href: '/numerology-calculator-name', label: 'Name Calculator' },
  { href: '/about', label: 'About' },
];

const linkStyle = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 'var(--fs-10)',
  letterSpacing: '4px',
  textTransform: 'uppercase' as const,
  color: 'var(--color-muted)',
  fontWeight: 'var(--fw-400)',
};

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the menu after navigating.
  useEffect(() => setOpen(false), [pathname]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header style={{ background: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)' }} className="fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'var(--fs-20)', fontWeight: 'var(--fw-400)', color: 'var(--color-ink)', letterSpacing: '0.5px' }}
          className="transition-opacity hover:opacity-60"
        >
          Life Path Numerology
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} style={linkStyle} className="transition-colors hover:text-[var(--color-accent)]">
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Phone: hamburger button */}
        <button
          type="button"
          className="-mr-2 -my-2 flex h-10 w-10 items-center justify-center md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-5" aria-hidden="true">
            <span
              className="absolute left-0 block h-px w-5 transition-transform duration-200"
              style={{ background: 'var(--color-ink)', top: 0, transform: open ? 'translateY(6px) rotate(45deg)' : 'none' }}
            />
            <span
              className="absolute left-0 block h-px w-5 transition-opacity duration-200"
              style={{ background: 'var(--color-ink)', top: 6, opacity: open ? 0 : 1 }}
            />
            <span
              className="absolute left-0 block h-px w-5 transition-transform duration-200"
              style={{ background: 'var(--color-ink)', top: 12, transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none' }}
            />
          </span>
        </button>
      </nav>

      {/* Phone: dropdown menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="md:hidden"
        style={{ background: 'var(--color-bg)', borderTop: '1px solid var(--color-border-soft)' }}
      >
        <ul className="flex flex-col px-6 py-2">
          {LINKS.map(({ href, label }) => (
            <li key={href} className="border-b border-[var(--color-border-soft)] last:border-b-0">
              <Link
                href={href}
                style={{ ...linkStyle, fontSize: 'var(--fs-11)', color: pathname === href ? 'var(--color-accent)' : 'var(--color-muted)' }}
                className="block py-4"
                aria-current={pathname === href ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
