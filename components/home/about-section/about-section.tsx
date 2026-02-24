'use client';

import { motion } from 'motion/react';
import { Code2, GitBranch, Blocks } from 'lucide-react';
import { techItems } from '@/constants/tech-stack-items';
import Link from 'next/link';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="w-full py-24 px-6 max-w-7xl mx-auto relative z-10"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
        className="space-y-4 mb-16 text-left"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground">
          Snapshot.
        </h2>
        <p className="text-muted-foreground text-lg max-w-md font-medium">
          The core of who I am, what I know, and how I build.
        </p>
      </motion.div>

      {/* THE ASYMMETRIC GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start relative">
        {/* LEFT COLUMN: Sticky Narrative Summary */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-5 lg:sticky lg:top-32 pr-4"
        >
          <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] text-foreground mb-6">
            Beyond the Code.
          </h3>
          <div className="h-1 w-12 bg-emerald-500/50 rounded-full mb-8"></div>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-medium">
            <p>
              I didn’t enter software engineering through a traditional path. I
              learned by building. My focus is solving practical problems and
              creating software that delivers measurable value.
            </p>
            <p>
              I care deeply about performance, reliability, and writing systems
              that hold up in real-world production environments.
            </p>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Scrolling Technical Proof Cards */}
        <div className="lg:col-span-7 flex flex-col gap-6 ">
          {/* Card 1: Core Stack and tooling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 rounded-2xl bg-foreground/5 backdrop-blur-md border border-foreground/10 hover:bg-foreground/[0.07] transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
              <Code2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>

            <h4 className="text-xl font-bold text-foreground mb-4 tracking-tight">
              Core Stack
            </h4>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-4 list-disc list-inside text-muted-foreground text-sm font-medium mb-6 leading-3">
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

            <h4 className="text-lg font-bold text-foreground mb-4 tracking-tight mt-6 pt-5 border-t border-foreground/10">
              Tooling
            </h4>
            <ul className="list-disc list-inside text-muted-foreground text-sm space-y-3 font-medium leading-3">
              <li>Vitest / Jest</li>
              <li>Rect Testing library</li>
              <li>GitHub Actions</li>
              <li>Husky / lint-staged</li>
            </ul>
          </motion.div>
          {/* Card 2: Engineering & Open Source */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-8 rounded-xl bg-foreground/5 backdrop-blur-md border border-foreground/10 hover:bg-foreground/[0.07] transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mb-6 border border-orange-500/20">
              <GitBranch className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </div>
            <h4 className="text-xl font-bold text-foreground mb-4 tracking-tight">
              Engineering Practices
            </h4>
            <p className="text-foreground/70 leading-relaxed font-medium mb-4">
              I treat correctness as a feature.
            </p>
            <ul className="list-disc list-inside text-muted-foreground text-sm space-y-3 leading-4 font-medium mb-6">
              <li>Automated unit and integration testing</li>
              <li>Request deduplication & in-memory caching strategies</li>
              <li>CI pipelines with build validation before merge</li>
              <li>Pre-commit quality gates to prevent regressions</li>
            </ul>
            <p className="text-foreground/70 text-sm lg:text-base font-medium">
              I prefer systems that are explicit, predictable, and resilient
              under real usage.
            </p>
            <h4 className="text-lg font-bold text-foreground mb-4 tracking-tight mt-6 pt-5 border-t border-foreground/10">
              Open Source
            </h4>
            <div className="space-y-3">
              <div>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/umarSiddique010/use-http-request-hook"
                  className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline font-mono tracking-tight"
                >
                  use-http-request-hook
                </Link>
                <p className="text-xs text-muted-foreground mt-1.5 font-medium">
                  A lightweight React hook with GET caching, waterfall
                  protection, debounce support, and safe request cancellation.
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
                <p className="text-xs text-muted-foreground mt-1.5 font-medium">
                  A reactive wrapper over localStorage with cross-tab
                  synchronization, safe initialization, and predictable
                  JSON-based persistence.
                </p>
              </div>
            </div>
          </motion.div>
          {/* Card 3: Product Thinking */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-8 rounded-xl bg-foreground/5 backdrop-blur-md border border-foreground/10 hover:bg-foreground/[0.07] transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mb-6 border border-purple-500/20">
              <Blocks className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
            <h4 className="text-xl font-bold text-foreground mb-3 tracking-tight">
              Product Thinking
            </h4>
            <p className="text-muted-foreground leading-relaxed font-medium">
              I build with context. Technical decisions are made with user
              impact, performance constraints, and long-term scalability in
              mind. Features should reduce friction, not add complexity.
            </p>
          </motion.div>
        </div>
      </div>
      {/* End of Asymmetric Grid */}

      {/* The Closer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-16 w-full py-12 px-6 md:py-20 md:px-12 rounded-3xl bg-linear-to-b from-accent to-transparent border border-foreground/10 flex items-center justify-center text-center hover:bg-accent transition-colors duration-300"
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
      </motion.div>
    </section>
  );
}
