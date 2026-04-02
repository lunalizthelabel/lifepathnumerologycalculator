import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a0f] px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-body text-sm text-[#f0ede8]/40">
          &copy; {new Date().getFullYear()} Life Path Numerology Calculator. All rights reserved.
        </p>
        <ul className="flex gap-6">
          <li>
            <Link
              href="/about"
              className="font-body text-sm text-[#f0ede8]/40 transition-colors hover:text-[#c9a84c]"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/privacy"
              className="font-body text-sm text-[#f0ede8]/40 transition-colors hover:text-[#c9a84c]"
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              href="/disclaimer"
              className="font-body text-sm text-[#f0ede8]/40 transition-colors hover:text-[#c9a84c]"
            >
              Disclaimer
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
