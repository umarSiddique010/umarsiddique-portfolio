export type Project = {
  id: number;
  title: string;
  description: string;
  intent: string;
  keyLearning: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  desktopImage: string;
  mobileImage: string | null;
};

export const projects: Project[] = [
  {
    id: 5,
    title: 'Resume Craft',

    description:
      'A secure, client-side React application that enables users to rapidly build and export professional resumes in pdf. It features real-time rendering and multiple layout templates with a strict zero-data-retention policy for absolute privacy.',

    intent:
      'Engineered as a privacy-first, open-source alternative for high-speed resume creation. I architected the system to bypass storage entirely, providing users with immediate, secure generation of diverse layouts ranging from stylish visual designs to ATS-optimized templates.',

    keyLearning:
      'Context + useReducer state design, dynamic form UX, template rendering, PDF pipelines (html2canvas/jsPDF + @react-pdf/renderer), and CI/CD + testing with Vitest/RTL and coverage reporting.',

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
    desktopImage: '/resume-craft-desktop-view.webp',
    mobileImage: '/resume-craft-mobile-view.webp',
  },
  {
    id: 4,
    title: 'useHttpRequest',
    description:
      'A lightweight React hook for full CRUD operations (GET, POST, PUT, DELETE) featuring GET caching, request deduplication (waterfall protection), AbortController cleanup, and debounce support.',
    intent:
      'Architected to solve a strict bundle-size constraint I faced while building a React SPA. I open-sourced this lightweight optimization ideology realizing the broader developer community shares the same frustration with oversized fetching dependencies.',
    keyLearning:
      'Mastered advanced asynchronous JavaScript by implementing concurrent request deduplication, in-memory GET caching, and native AbortController integration to prevent memory leaks and race conditions.',
    techStack: [
      'React',
      'fetch API',
      'AbortController',
      'TypeScript/JavaScript',
      'npm package publishing',
    ],
    githubUrl: 'https://github.com/umarSiddique010/use-http-request-hook',
    liveUrl: 'https://www.npmjs.com/package/@mdus/use-http-request-hook',
    desktopImage: '/use-http-request-hook-screenshot.webp',
    mobileImage: null,
  },
  {
    id: 3,
    title: 'useLocalstorage',

    description:
      'An open-source, zero-dependency React hook built to help developers safely manage localStorage. It solves a real problem by eliminating repetitive boilerplate and guaranteeing UI consistency across tabs.',

    intent:
      'Built on the idea that nearly every frontend app persists browser state, this hook turns raw storage into a clean, React-idiomatic foundation with automatic re-renders.',

    keyLearning:
      'Designing a stable hook API, syncing state across tabs using storage events, safe JSON parsing/stringifying, lifecycle-safe initialization, and defensive error handling for browser storage edge cases.',

    techStack: [
      'React',
      'localStorage',
      'Web Storage API (storage events)',
      'JavaScript',
      'npm package publishing',
    ],

    githubUrl: 'https://github.com/umarSiddique010/use-localstorage-hook',
    liveUrl: 'https://www.npmjs.com/package/@mdus/use-localstorage-hook',
    desktopImage: '/use-localstorage-hook-screenshot.webp',
    mobileImage: null,
  },
  {
    id: 2,
    title: 'Rick & Morty Memory Game',

    description:
      'A production-grade interactive memory game featuring fluid React Motion animations, dynamic REST API integration, and an immersive custom audio engine, all backed by enterprise-level CI/CD pipelines.',

    intent:
      'Created as a deliberate architectural deep dive into core React fundamentals using Class Components — mastering explicit lifecycle control, centralized state management, API integration, and production-grade testing and CI workflows from the ground up.',

    keyLearning:
      'Mastered granular component lifecycle management and context binding to efficiently handle asynchronous API states, preventing memory leaks while ensuring application reliability through comprehensive Jest testing and automated GitHub Actions.',

    techStack: [
      'React 19 (Class Components)',
      'JavaScript (ES6+)',
      'CSS Modules',
      'Framer Motion',
      'REST API (Rick and Morty API)',
      'Fetch API',
      'Audio API',
      'Jest',
      'React Testing Library',
      'ESLint',
      'Prettier',
      'GitHub Actions (CI/CD)',
      'npm',
    ],

    githubUrl: 'https://github.com/umarSiddique010/rick-morty-game-react',
    liveUrl: 'https://rick-morty-game-react.vercel.app/',
    desktopImage: '/rick-morty-game-desktop-view.webp',
    mobileImage: '/rick-morty-game-mobile-view.webp',
  },
  {
    id: 1,
    title: 'Modular Book Tracker SPA',

    description:
      'A high-performance, framework-free Single Page Application for library management. It features persistent local storage, responsive sidebar navigation, and programmatic DOM rendering to deliver a fast, app-like user experience.',

    intent:
      'Architected entirely in Vanilla JavaScript with zero static HTML to achieve absolute control over the rendering lifecycle, state management, and the build pipeline.',

    keyLearning:
      'Mastered Object-Oriented Architecture and native DOM manipulation by building a custom MVC-lite pattern from scratch, leveraging optimized event delegation to drastically reduce memory footprints and boost rendering performance.',

    techStack: [
      'JavaScript (ES6+ Modules & Classes)',
      'Native DOM API',
      'localStorage API',
      'CSS3 (Flexbox & Grid)',
      'Webpack 5',
      'Vitest',
      'JSDOM',
      '@testing-library/dom',
      'npm',
    ],

    githubUrl: 'https://github.com/umarSiddique010/book-tracker-js',
    liveUrl: 'https://umarsiddique010.github.io/book-tracker-js/',
    desktopImage: '/book-tracker-desktop-view.webp',
    mobileImage: '/book-tracker-mobile-view.webp',
  },
];
