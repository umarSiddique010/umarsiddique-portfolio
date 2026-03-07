import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import Image from 'next/image';

export type SocialLink = {
  title: string;
  href: string;
  icon: React.ReactNode;
  color: string;
};

export const socialLinks: SocialLink[] = [
  {
    title: 'GitHub',
    href: 'https://github.com/umarSiddique010',
    icon: <Github size={20} />,
    color: 'hover:text-foreground',
  },
  {
    title: 'npm',
    href: 'https://www.npmjs.com/~umarSiddique010',
    icon: (
      <Image
        height={20}
        width={20}
        src="/npm.svg"
        alt="npm icon"
        className="grayscale group-hover:grayscale-0 transition-all duration-300"
      />
    ),
    color: 'hover:text-[#CB3837]',
  },
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/md-umar-siddique-1519b12a4/',
    icon: <Linkedin size={20} />,
    color: 'hover:text-[#0A66C2]',
  },
  {
    title: 'Twitter / X',
    href: 'https://x.com/umarSiddique010',
    icon: <Twitter size={20} />,
    color: 'hover:text-[#1DA1F2]',
  },
  {
    title: 'DEV Community',
    href: 'https://dev.to/umarsiddique010',
    icon: <span className="text-sm font-bold transition-colors">DEV</span>,
    color: 'hover:text-foreground',
  },
  {
    title: 'Mail',
    href: 'mailto:us70763@gmail.com',
    icon: <Mail size={20} />,
    color: 'hover:text-emerald-500',
  },
];
