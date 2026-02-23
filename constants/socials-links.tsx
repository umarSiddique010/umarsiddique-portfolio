import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import Image from 'next/image';

export type SocialLink = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

export const socialLinks: SocialLink[] = [
  {
    title: 'GitHub',
    href: 'https://github.com/umarSiddique010',
    icon: <Github size={20} />,
  },
  {
    title: 'npm',
    href: 'https://www.npmjs.com/~umarSiddique010',
    icon: (
      <Image
        height={24}
        width={24}
        src="/npm.svg"
        alt="npm icon"
        className="grayscale group-hover:grayscale-0 transition-all duration-300"
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
      <span className="text-sm text-foreground/60 group-hover:text-black dark:group-hover:text-white font-bold transition-colors">
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
