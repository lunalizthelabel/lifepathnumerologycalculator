import Link from 'next/link';

export default function Navigation() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-lg tracking-wide text-[#f0ede8] transition-opacity hover:opacity-70"
        >
          YourNumerologyReport
        </Link>
        <ul className="flex items-center gap-8">
          <li>
            <Link
              href="/life-path-number-calculator"
              className="font-body text-base text-[#f0ede8]/60 transition-colors hover:text-[#c9a84c]"
            >
              Calculator
            </Link>
          </li>
          <li>
            <Link
              href="/numerology-calculator-name"
              className="font-body text-base text-[#f0ede8]/60 transition-colors hover:text-[#c9a84c]"
            >
              Name Calculator
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="font-body text-base text-[#f0ede8]/60 transition-colors hover:text-[#c9a84c]"
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
