import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { Badge } from './ui/badge';

export default function Footer() {
  const navLinks = [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Projects',
      href: '/projects',
    },
    {
      title: 'About',
      href: '/about',
    },

    {
      title: 'Blog',
      href: '/blog',
    },
    {
      title: 'Contact',
      href: '/contact',
    },
  ];

  const socialLinks = [
    {
      title: 'GitHub',
      href: 'https://github.com/umarSiddique010',
      icon: <Github size={20} />,
    },
    {
      title: 'npmjs',
      href: 'https://www.npmjs.com/~umarSiddique010',
      icon: (
        <Image
          height={24}
          width={24}
          src="/npm.svg"
          alt="npm icon"
          className="grayscale group-hover:grayscale-0"
        />
      ),
    },
    {
      title: 'LinkedIn',
      href: 'https://www.linkedin.com/in/md-umar-siddique-1519b12a4/',
      icon: <Linkedin size={20} />,
    },
    {
      title: 'Twitter',
      href: 'https://x.com/umarSiddique010',
      icon: <Twitter size={20} />,
    },
    {
      title: 'DEV Community',
      href: 'https://dev.to/umarsiddique010',
      icon: (
        <span className="text-sm text-foreground/60 group-hover:text-black font-bold">
          DEV
        </span>
      ),
    },
    {
      title: 'Mail',
      href: 'mailto:us70763@gmail.com',
      icon: <Mail size={20} />,
    },
  ];

  return (
    <footer className="w-full border-t border-accent-foreground/10 py-10">
      <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="font-bold text-lg mb-2">
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

        <ul className="flex gap-6 text-sm font-medium text-foreground/60">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="hover:text-foreground transition-colors group"
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="flex gap-4">
          {socialLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.title}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/50 text-foreground/60 hover:text-foreground hover:bg-accent hover:scale-110 transition-all duration-300 border border-transparent hover:border-accent-foreground/10 group"
              >
                <span className="shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-1">
                  {link.icon}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
