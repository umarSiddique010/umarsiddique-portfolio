export type Blog = {
  id: number;
  category: string;
  title: string;
  description: string;
  purpose: string;
  topics: string[];
  bannerImage: string;
  devToUrl: string;
};

export const blogs: Blog[] = [
  {
    id: 8,
    category: 'JavaScript',
    title:
      'JavaScript: The Chosen One — Why the Browser Speaks Only JavaScript (and Why We Can’t Replace It)',
    description:
      "A strategic analysis of JavaScript's absolute monopoly on the web, exploring the historical network effects and native architectural advantages that cement its position.  It breaks down why alternatives like WebAssembly or Python fall short, providing a pragmatic framework for developers to leverage the ecosystem.",
    purpose:
      'To explain why JavaScript became the undisputed language of the web so developers can strategically embrace its ecosystem instead of fighting its inherent dominance.',
    topics: [
      'Runtime',
      'Engines',
      'Concurrency',
      'Ecosystem',
      'Architecture',
      'Browser Engines',
      'Event Loop',
      'Network Effects',
    ],
    bannerImage: '/javascript-blog-banner.webp',
    devToUrl:
      'https://dev.to/umarsiddique010/the-chosen-one-why-the-browser-speaks-only-javascript-and-why-we-cant-replace-it-450a',
  },
  {
    id: 7,
    category: 'JavaScript',
    title: 'The Philosophy of JavaScript: Messy, Mighty, and Made for the Web',
    description:
      "A strategic deep dive into JavaScript's core design philosophy, explaining how intentional architectural choices like prototypal inheritance, first-class functions, and an asynchronous event loop drove its massive success.  It demonstrates why embracing the language's flexible, event-driven nature is crucial for building robust modern web applications.",
    purpose:
      'To unpack the core philosophy that made JavaScript the backbone of modern development and explain why its flexible, messy nature feels different by design.',
    topics: [
      'JavaScript',
      'Language Design',
      'Architecture',
      'Asynchronous Programming',
      'Prototypes',
      'First-Class Functions',
    ],
    bannerImage: '/javascript-blog-banner.webp',
    devToUrl:
      'https://dev.to/umarsiddique010/the-philosophy-of-javascript-messy-mighty-and-made-for-the-web-3ook',
  },
  {
    id: 6,
    category: 'JavaScript',
    title: 'Why JavaScript Survived – Wars, Standards, and Second Chances',
    description:
      "A historical and technical analysis of JavaScript's evolution from a fragmented browser script into a standardized, full-stack ecosystem.  It highlights how ECMAScript standards and the AJAX revolution established the asynchronous architecture of the modern web.",
    purpose:
      'To dive into the survival story of JavaScript and explore how the language was nearly broken by browser wars but came back stronger through standardization.',
    topics: [
      'JavaScript',
      'ECMAScript',
      'AJAX',
      'History',
      'Standards',
      'Web Standards',
      'Ecosystem',
    ],
    bannerImage: '/javascript-blog-banner.webp',
    devToUrl:
      'https://dev.to/umarsiddique010/episode-2-why-javascript-survived-wars-standards-and-second-chances-4l2h',
  },
  {
    id: 5,
    category: 'JavaScript',
    title: 'Birth of JavaScript: 10 Days, One Man, and a New Era',
    description:
      "A strategic exploration of JavaScript's 10-day creation, detailing how foundational architectural decisions like prototypal inheritance and first-class functions shaped the modern interactive web.  It highlights why prioritizing flexibility over rigid perfection made JavaScript the web's definitive standard.",
    purpose:
      "To share the chaotic history and core DNA of JavaScript so developers can deepen their understanding and appreciation for the language's unique design.",
    topics: ['JavaScript', 'History', 'Architecture', 'Prototypes', 'Web'],
    bannerImage: '/javascript-blog-banner.webp',
    devToUrl:
      'https://dev.to/umarsiddique010/birth-of-javascript-10-days-one-man-and-a-new-era-4d63',
  },
  {
    id: 4,
    category: 'CSS',
    title: "Why Isn't Your CSS Working? Common Pitfalls and Best Practices",
    description:
      'A strategic guide to mastering scalable CSS architecture by avoiding common styling pitfalls like deep nesting, ID selector overuse, and !important wars. It provides actionable best practices, including BEM methodologies and scoped styling, to help developers build maintainable frontend systems.',
    purpose:
      'To solidify your understanding beyond just theory by showing how common CSS mistakes affect not only vanilla web development but also modern frameworks like React and Vue.',
    topics: [
      'Architecture',
      'Anti-patterns',
      'BEM',
      'Maintainability',
      'Debugging',
    ],
    bannerImage: '/css-blog-banner.webp',
    devToUrl:
      'https://dev.to/umarsiddique010/why-isnt-your-css-working-common-pitfalls-and-best-practices-1n06',
  },
  {
    id: 3,
    category: 'CSS',
    title: 'Why Isn’t Your CSS Working? Understanding Cascading',
    description:
      'An in-depth breakdown of the CSS Cascade algorithm, detailing how browsers resolve styling conflicts through source order, specificity, origin, and importance.  It provides a practical framework for debugging overwrites and establishing maintainable frontend architectures.',
    purpose:
      'To explain CSS cascading through an investigative, real-world approach so developers practically understand how browsers determine which style rules win.',
    topics: ['CSS', 'Cascading', 'Rendering', 'Architecture', 'Debugging'],
    bannerImage: '/css-blog-banner.webp',
    devToUrl:
      'https://dev.to/umarsiddique010/why-isnt-your-css-working-understanding-cascading-3n5j',
  },
  {
    id: 2,
    category: 'CSS',
    title: "Why Isn't Your CSS Working? Understanding Specificity",
    description:
      'A technical deep dive into CSS specificity and its calculation formula, establishing a clear mental model for resolving complex styling conflicts. It empowers developers to architect predictable, scalable frontend stylesheets and avoid fragile workarounds like the overreliance on !important.',
    purpose:
      'To master the CSS specificity ranking system so developers can write predictable styles and clearly understand how cascading works without frustration.',
    topics: [
      'CSS',
      'Specificity',
      'Selectors',
      'Hierarchy',
      'Frontend Architecture',
      'Debugging',
    ],
    bannerImage: '/css-blog-banner.webp',
    devToUrl:
      'https://dev.to/umarsiddique010/why-isnt-your-css-working-understanding-specificity-3lf3',
  },
  {
    id: 1,
    category: 'HTML',
    title: 'Why HTML Exists—And What Most Developers Miss',
    description:
      'A strategic overview demonstrating how semantic HTML serves as the critical architectural backbone of the web rather than a mere visual container. It explores how proper markup drives tangible product value through improved accessibility, search engine ranking, and browser performance.',
    purpose:
      'To provide a comprehensive overview of HTML so developers can ship robust web pages fully equipped with essential SEO and accessibility features.',
    topics: ['Semantics', 'Accessibility', 'SEO', 'Performance', 'Security'],
    bannerImage: '/html-blog-banner.webp',
    devToUrl:
      'https://dev.to/umarsiddique010/why-html-exists-and-what-most-developers-miss-251h',
  },
];
