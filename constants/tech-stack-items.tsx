import {
  siNextdotjs,
  siReact,
  siTypescript,
  siTailwindcss,
  siNodedotjs,
  siGooglegemini,
  siPostgresql,
  siPrisma,
  siGit,
  siGithub,
} from 'simple-icons';

function SiIcon({ icon }: { icon: { path: string; hex: string } }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={20}
      height={20}
      className="transition-all duration-300"
      style={{ fill: `#${icon.hex}` } as React.CSSProperties}
    >
      <path d={icon.path} />
    </svg>
  );
}

export type TechStackItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

export const techItems: TechStackItem[] = [
  {
    title: 'Next.js',
    href: 'https://nextjs.org/',
    icon: <SiIcon icon={siNextdotjs} />,
  },
  {
    title: 'React',
    href: 'https://reactjs.org/',
    icon: <SiIcon icon={siReact} />,
  },
  {
    title: 'TypeScript',
    href: 'https://typescriptlang.org/',
    icon: <SiIcon icon={siTypescript} />,
  },
  {
    title: 'Tailwind CSS',
    href: 'https://tailwindcss.com/',
    icon: <SiIcon icon={siTailwindcss} />,
  },
  {
    title: 'Node.js',
    href: 'https://nodejs.org/',
    icon: <SiIcon icon={siNodedotjs} />,
  },
  {
    title: 'Gemini AI',
    href: 'https://gemini.google.com/',
    icon: <SiIcon icon={siGooglegemini} />,
  },
  {
    title: 'PostgreSQL',
    href: 'https://www.postgresql.org/',
    icon: <SiIcon icon={siPostgresql} />,
  },
  {
    title: 'Prisma',
    href: 'https://prisma.io/',
    icon: <SiIcon icon={siPrisma} />,
  },
  { title: 'Git', href: 'https://git-scm.com/', icon: <SiIcon icon={siGit} /> },
  {
    title: 'GitHub',
    href: 'https://github.com/',
    icon: <SiIcon icon={siGithub} />,
  },
];
