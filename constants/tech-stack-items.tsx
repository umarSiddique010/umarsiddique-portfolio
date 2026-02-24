import { DogIcon } from 'lucide-react';
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiGooglegemini,
  SiPostgresql,
  SiPrisma,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiTestinglibrary,
  SiVitest,
  SiJest,
  SiEslint,
  SiPrettier,
  SiNpm,
} from 'react-icons/si';

export type TechStackItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

// Common class for all icons to keep sizing consistent
const iconClass = 'w-5 h-5 transition-all duration-300';

export const techItems: TechStackItem[] = [
  {
    title: 'Next.js',
    href: 'https://nextjs.org/',
    // Next.js black/white hota hai, toh text-foreground best hai for dark mode support
    icon: <SiNextdotjs className={`${iconClass} text-foreground`} />,
  },
  {
    title: 'React',
    href: 'https://reactjs.org/',
    icon: <SiReact className={`${iconClass} text-[#61DAFB]`} />,
  },
  {
    title: 'TypeScript',
    href: 'https://typescriptlang.org/',
    icon: <SiTypescript className={`${iconClass} text-[#3178C6]`} />,
  },
  {
    title: 'Tailwind CSS',
    href: 'https://tailwindcss.com/',
    icon: <SiTailwindcss className={`${iconClass} text-[#06B6D4]`} />,
  },
  {
    title: 'Node.js',
    href: 'https://nodejs.org/',
    icon: <SiNodedotjs className={`${iconClass} text-[#339933]`} />,
  },
  {
    title: 'Gemini AI',
    href: 'https://gemini.google.com/',
    icon: <SiGooglegemini className={`${iconClass} text-[#8E75B2]`} />,
  },
  {
    title: 'PostgreSQL',
    href: 'https://www.postgresql.org/',
    icon: <SiPostgresql className={`${iconClass} text-[#4169E1]`} />,
  },
  {
    title: 'Prisma',
    href: 'https://prisma.io/',
    icon: <SiPrisma className={`${iconClass} text-foreground`} />,
  },
  {
    title: 'Git',
    href: 'https://git-scm.com/',
    icon: <SiGit className={`${iconClass} text-[#F05032]`} />,
  },
  {
    title: 'GitHub',
    href: 'https://github.com/',
    icon: <SiGithub className={`${iconClass} text-foreground`} />,
  },
  {
    title: 'Vitest',
    href: 'https://vitest.dev/',
    icon: <SiVitest className={`${iconClass} text-[#6E9F18]`} />,
  },
  {
    title: 'Testing Library',
    href: 'https://testing-library.com/',
    icon: <SiTestinglibrary className={`${iconClass} text-[#E33332]`} />,
  },
  {
    title: 'Jest',
    href: 'https://jestjs.io/',
    icon: <SiJest className={`${iconClass} text-[#C21325]`} />,
  },
  {
    title: 'GitHub Actions',
    href: 'https://github.com/features/actions',
    icon: <SiGithubactions className={`${iconClass} text-[#2088FF]`} />,
  },
  {
    title: 'Husky',
    href: 'https://typicode.github.io/husky/',
    icon: <DogIcon className={`${iconClass} text-foreground`} />,
  },
  {
    title: 'ESLint',
    href: 'https://eslint.org/',
    icon: <SiEslint className={`${iconClass} text-[#4B32C3]`} />,
  },
  {
    title: 'Prettier',
    href: 'https://prettier.io/',
    icon: <SiPrettier className={`${iconClass} text-[#F7B93E]`} />,
  },
  {
    title: 'npm',
    href: 'https://www.npmjs.com/',
    icon: <SiNpm className={`${iconClass} text-[#CB3837]`} />,
  },
];
