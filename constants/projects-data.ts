export type ProjectData = {
  id: number;
  title: string;
  category: string;
  description: string;
  intent: string;
  keyLearning: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  desktopImage: string;
  mobileImage: string | null;
};

export const projectData: ProjectData[] = [
  {
    id: 6,
    title: 'Engineering Portfolio',
    category: 'Full Stack',
    description:
      'A full-stack Next.js 16 portfolio with a serverless contact system, Neon PostgreSQL persistence, transactional email via Resend, and a custom interactive terminal.',
    intent:
      'A portfolio is the first thing a recruiter sees. Built this to show architecture decisions, not just UI — full-stack, tested, and deployed with real infrastructure.',
    keyLearning:
      'Next.js App Router, Server Actions, useActionState, Zod validation, Neon PostgreSQL, Resend API, motion/react spring physics, custom domain DNS setup via Porkbun + Vercel Nameservers, CI/CD pipeline.',
    techStack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind CSS v4',
      'Motion',
      'Neon Postgres',
      'Resend API',
      'Zod',
      'Vitest',
      'React Testing Library',
      'Husky',
      'Lint-Staged',
      'Vercel',
    ],
    githubUrl: 'https://github.com/umarSiddique010/umarsiddique-portfolio',
    liveUrl: 'https://www.umarsiddique.dev/',
    desktopImage: '/project-screenshots/portfolio-desktop-view.webp',
    mobileImage: '/project-screenshots/portfolio-mobile-view.webp',
  },
  {
    id: 5,
    title: 'Resume Craft',
    category: 'Frontend',
    description:
      'A privacy-first, client-side resume builder — 4 professional templates, ATS-friendly PDF export, and a fully tested codebase. No backend, no login, no data leaves the browser.',
    intent:
      'Most resume builders require an account and store your data on their servers. Built this so anyone can generate a professional resume instantly — privately, for free, and open source.',
    keyLearning:
      'Context + Reducer architecture, client-side PDF generation, route-level code splitting, Vite manual chunking, useEffect for dependent dropdown state, CI/CD pipeline, Vitest + RTL testing strategy.',
    techStack: [
      'React 19',
      'Vite',
      'React Router DOM v7',
      'CSS Modules',
      'Context API',
      'useReducer',
      'Vitest',
      'React Testing Library',
      '@react-pdf/renderer',
      'html2canvas',
      'jsPDF',
      'country-state-city',
      'react-toastify',
      'Husky',
      'lint-staged',
      'ESLint',
      'Prettier',
      'GitHub Actions',
    ],
    githubUrl: 'https://github.com/umarSiddique010/resume-craft-react',
    liveUrl: 'https://resume-craft-react.vercel.app/',
    desktopImage: '/project-screenshots/resume-craft-desktop-view.webp',
    mobileImage: '/project-screenshots/resume-craft-mobile-view.webp',
  },
  {
    id: 4,
    title: '@mdus/use-http-request-hook',
    category: 'Open Source / NPM Package',
    description:
      'A production-ready React hook for HTTP requests — universal method support (GET, POST, PUT, DELETE), LRU caching, request deduplication, AbortController cleanup, and debounce built in.',
    intent:
      "Most devs re-implement the same fetch logic in every project. Built this once, published it — so it's reusable, reliable, and handles the edge cases most implementations miss.",
    keyLearning:
      'Universal HTTP methods, AbortController, LRU caching strategy, request deduplication, debounce implementation, npm package architecture.',
    techStack: ['React', 'JavaScript', 'AbortController', 'fetch API', 'npm'],
    githubUrl: 'https://github.com/umarSiddique010/use-http-request-hook',
    liveUrl: 'https://www.npmjs.com/package/@mdus/use-http-request-hook',
    desktopImage: '/project-screenshots/use-http-request-hook-screenshot.webp',
    mobileImage: null,
  },
  {
    id: 3,
    title: '@mdus/use-localstorage-hook',
    category: 'Open Source / NPM Package',
    description:
      'A zero-dependency React hook for localStorage — cross-tab sync, auto-serialization, and safe error handling out of the box.',
    intent:
      'Every dev uses localStorage. Almost none handle cross-tab sync or memory cleanup properly. Built this so the right way is also the easy way.',
    keyLearning:
      'Custom hook architecture, localStorage event API, cross-tab synchronization, npm package publishing, API design.',
    techStack: [
      'React',
      'JavaScript',
      'localStorage',
      'Web Storage API (storage events)',
      'npm',
    ],
    githubUrl: 'https://github.com/umarSiddique010/use-localstorage-hook',
    liveUrl: 'https://www.npmjs.com/package/@mdus/use-localstorage-hook',
    desktopImage: '/project-screenshots/use-localstorage-hook-screenshot.webp',
    mobileImage: null,
  },
  {
    id: 2,
    title: 'Rick & Morty Memory Game',
    category: 'Frontend',
    description:
      'A memory card game built with React 19 Class Components — 3 difficulty levels, countdown timers, real-time scoring, and a custom audio engine.',
    intent:
      'Hooks make lifecycle management invisible. Built with Class Components deliberately — to understand what hooks abstract away. The game format makes it worth sharing.',
    keyLearning:
      'Class component lifecycle methods, state lifting, unidirectional data flow, Web Audio API, Jest integration testing, GitHub Actions CI.',
    techStack: [
      'React 19',
      'JavaScript',
      'CSS Modules',
      'Motion',
      'REST API (Rick and Morty API)',
      'Fetch API',
      'Web Audio API',
      'Jest',
      'React Testing Library',
      'ESLint',
      'Prettier',
      'GitHub Actions',
      'GitHub Pages',
    ],
    githubUrl: 'https://github.com/umarSiddique010/rick-morty-game-react',
    liveUrl: 'https://umarsiddique010.github.io/rick-morty-game-react/',
    desktopImage: '/project-screenshots/rick-morty-game-desktop-view.webp',
    mobileImage: '/project-screenshots/rick-morty-game-mobile-view.webp',
  },
  {
    id: 1,
    title: 'Book Tracker JS',
    category: 'Frontend',
    description:
      'A framework-free SPA built with Vanilla JS — modular OOP architecture, real DOM manipulation, and localStorage persistence.',
    intent:
      "Most devs skip straight to frameworks. This was built to prove you don't need one — pure JS, real architecture, zero abstractions.",
    keyLearning:
      'OOP architecture, event delegation, DOM manipulation without frameworks, MVC-lite pattern, Webpack 5 bundling, unit + integration + DOM testing with Vitest.',
    techStack: [
      'JavaScript',
      'CSS3',
      'Webpack 5',
      'Vitest',
      'jsdom',
      'GitHub Pages',
    ],
    githubUrl: 'https://github.com/umarSiddique010/book-tracker-js',
    liveUrl: 'https://umarsiddique010.github.io/book-tracker-js/',
    desktopImage: '/project-screenshots/book-tracker-desktop-view.webp',
    mobileImage: '/project-screenshots/book-tracker-mobile-view.webp',
  },
];
