import Link from 'next/link';
import { Badge } from '../ui/badge';
import { navLinks } from '@/constants/navigation-links';
import { socialLinks } from '@/constants/socials-links';
import clsx from 'clsx';

export default function Footer() {
  return (
    <footer className="w-full border-t border-accent-foreground/10 py-16">
      <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="font-bold text-xl mb-2">
            Md Umar Siddique
          </Link>
          <p className="text-sm text-foreground/60 flex flex-wrap items-center gap-2 justify-center md:justify-start">
            <span>© {new Date().getFullYear()} — Crafted with</span>

            <Badge
              variant="secondary"
              className="font-medium bg-accent/50 hover:bg-accent hover:text-foreground transition-all cursor-pointer active:scale-95"
              asChild
            >
              <Link
                href="https://nextjs.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Next.js
              </Link>
            </Badge>

            <span>&</span>

            <Badge
              variant="secondary"
              className="font-medium bg-accent/50 hover:bg-accent hover:text-foreground transition-all cursor-pointer active:scale-95"
              asChild
            >
              <Link
                href="https://motion.dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Motion
              </Link>
            </Badge>
          </p>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h2 className="font-semibold text-md mb-2">Navigation</h2>
          <ul className="flex gap-6 text-sm font-medium text-foreground/60">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors hover:underline duration-300 ease-in-out group"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h2 className="font-semibold text-md mb-2">Socials</h2>
          <ul className="flex gap-6 text-sm font-medium text-foreground/60">
            {socialLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.title}
                  className={clsx(
                    'text-sm font-medium text-foreground/60 hover:text-foreground transition-colors hover:underline duration-300 ease-in-out group',
                  )}
                >
                  <span className="shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-1">
                    {link.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
