'use client';

import { motion } from 'motion/react';
import { Code2, GitBranch, Blocks, Terminal } from 'lucide-react';
import { techItems } from '@/constants/tech-stack-items';
import Link from 'next/link';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="w-full py-24 px-4 md:pl-8 lg:pl-10 lg:pr-16 max-w-7xl mx-auto relative z-10"
    >
      {/* Section Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
        className="space-y-2 mb-10 text-left"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground">
          Snapshot.
        </h2>
        <p className="text-foreground/80 text-lg max-w-md font-medium">
          The core of who I am, what I know, and how I build.
        </p>
      </motion.header>

      {/* Box GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
        {/* BOX 1: Core Stack */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2 lg:row-span-2 p-6 md:p-8 rounded-3xl bg-foreground/5 border border-foreground/20 transition-all duration-500 ease-in-out hover:bg-foreground/10 hover:border-foreground/20 flex flex-col justify-between shadow-xl"
        >
          <div>
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
              <Code2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h4 className="text-2xl md:text-3xl font-bold text-foreground mb-8 tracking-tight">
              Core Stack & Tooling
            </h4>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-4">
              <div className="lg:col-span-2">
                <h5 className="text-sm font-bold text-foreground/80 mb-5 tracking-tight uppercase">
                  Frameworks & Languages
                </h5>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 list-disc list-inside text-muted-foreground text-sm font-medium leading-relaxed">
                  {techItems
                    .filter(
                      (item) =>
                        ![
                          'Vitest',
                          'Testing Library',
                          'Jest',
                          'GitHub Actions',
                          'Husky',
                          'ESLint',
                          'Prettier',
                          'npm',
                        ].includes(item.title),
                    )
                    .map((item) => (
                      <li key={item.href}>{item.title}</li>
                    ))}
                </ul>
              </div>

              <div className="lg:col-span-1">
                <h5 className="text-sm font-bold text-foreground/80 mb-5 tracking-tight uppercase">
                  Quality & Pipelines
                </h5>
                <ul className="list-disc list-inside text-muted-foreground text-sm space-y-3 font-medium leading-relaxed">
                  <li>Vitest / Jest</li>
                  <li>React Testing Library</li>
                  <li>GitHub Actions</li>
                  <li>Husky / lint-staged</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* BOX 2: Narrative */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1 lg:row-span-1 p-8 rounded-3xl bg-foreground/5 border border-foreground/10 transition-all duration-500 ease-in-out hover:bg-foreground/10 hover:border-foreground/20 flex flex-col justify-center shadow-lg"
        >
          <h3 className="text-2xl font-bold tracking-tight text-foreground mb-4">
            Beyond the Code.
          </h3>
          <div className="h-1 w-10 bg-emerald-500/50 rounded-full mb-6"></div>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed font-medium">
            <p>
              I didn’t enter software engineering through a traditional path. I
              learned by building.
            </p>
            <p>
              My focus is solving practical problems and creating software that
              delivers measurable value.
            </p>
          </div>
        </motion.div>

        {/* BOX 3: Product Thinking */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-1 lg:row-span-1 p-8 rounded-3xl bg-foreground/5 border border-foreground/10 transition-all duration-500 ease-in-out hover:bg-foreground/10 hover:border-foreground/20 flex flex-col justify-center shadow-lg"
        >
          <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mb-5 border border-purple-500/20">
            <Blocks className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </div>
          <h4 className="text-xl font-bold text-foreground mb-3 tracking-tight">
            Product Thinking
          </h4>
          <p className="text-muted-foreground text-sm leading-relaxed font-medium">
            I build with context. Technical decisions are made with user impact,
            performance constraints, and long-term scalability in mind. Features
            should reduce friction, not add complexity
          </p>
        </motion.div>

        {/* BOX 4: Engineering Practices */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="md:col-span-2 lg:col-span-2 lg:row-span-1 p-8 rounded-3xl bg-foreground/5 border border-foreground/10 transition-all duration-500 ease-in-out hover:bg-foreground/10 hover:border-foreground/20 shadow-lg"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6 h-full">
            <div className="shrink-0">
              <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center mb-4 border border-orange-500/20">
                <Terminal className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <h4 className="text-xl font-bold text-foreground tracking-tight max-w-36">
                Engineering Practices
              </h4>
            </div>

            <div className="md:border-l border-foreground/10 md:pl-6 grow flex flex-col justify-center">
              <p className="text-foreground/80 leading-relaxed font-medium mb-4 text-sm">
                I treat correctness as a feature.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 list-disc list-inside text-muted-foreground text-sm font-medium mb-4">
                <li>Automated unit & integration testing</li>
                <li>Request deduplication & caching</li>
                <li>CI pipelines with build validation</li>
                <li>Pre-commit quality gates</li>
              </ul>
              <p className="text-foreground/70 text-xs sm:text-sm font-medium">
                I prefer systems that are explicit, predictable, and resilient
                under real usage.
              </p>
            </div>
          </div>
        </motion.div>

        {/* BOX 5: Open Source */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="md:col-span-2 lg:col-span-1 lg:row-span-1 p-8 rounded-3xl bg-foreground/5 border border-foreground/10 transition-all duration-500 ease-in-out hover:bg-foreground/10 hover:border-foreground/20 shadow-lg"
        >
          <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mb-5 border border-green-500/20">
            <GitBranch className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
          <h4 className="text-xl font-bold text-foreground mb-4 tracking-tight">
            Open Source
          </h4>
          <div className="space-y-5">
            <div>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/umarSiddique010/use-http-request-hook"
                className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline font-mono tracking-tight"
              >
                use-http-request-hook
              </Link>
              <p className="text-xs text-muted-foreground mt-1.5 font-medium leading-relaxed">
                A lightweight React hook with GET caching, waterfall protection,
                debounce support, and safe request cancellation.
              </p>
            </div>
            <div>
              <Link
                href="https://github.com/umarSiddique010/use-localstorage-hook"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline font-mono tracking-tight"
              >
                use-localstorage-hook
              </Link>
              <p className="text-xs text-muted-foreground mt-1.5 font-medium leading-relaxed">
                A reactive wrapper over localStorage with cross-tab
                synchronization, safe initialization, and predictable JSON-based
                persistence.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* The Closer */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-6 w-full py-12 px-6 md:py-16 md:px-12 rounded-3xl bg-foreground/5 border border-foreground/10 flex items-center justify-center text-center transition-all duration-500 hover:bg-foreground/10 hover:border-foreground/20 shadow-2xl"
      >
        <p className="text-xl md:text-2xl lg:text-3xl text-foreground/85 font-bold leading-relaxed tracking-tighter max-w-4xl">
          I build full-stack applications end-to-end —{' '}
          <span className="text-muted-foreground font-medium">
            from database design to deployment
          </span>{' '}
          — with a focus on{' '}
          <span className="[word-spacing:0.2rem] text-foreground">
            performance, reliability, and well-tested systems.
          </span>
        </p>
      </motion.section>
    </section>
  );
}
