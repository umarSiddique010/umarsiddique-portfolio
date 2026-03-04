'use client';

import { motion } from 'motion/react';
import { Terminal, Blocks, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutSection() {
  return (
    <section id="about" className="w-full py-24 px-6 max-w-7xl mx-auto">
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
        <p className="text-foreground/80 text-lg max-w-2xl font-medium">
          A quick view of how I think, how I build, and what I optimize for.
        </p>
      </motion.header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Beyond the Code */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
          className="p-8 rounded-3xl bg-foreground/5 border border-foreground/10 transition-all duration-500 ease-in-out hover:bg-foreground/10 hover:border-foreground/20 shadow-lg"
        >
          <h3 className="text-2xl font-bold tracking-tight text-foreground mb-4">
            Beyond the Code.
          </h3>
          <div className="h-1 w-10 bg-emerald-500/50 rounded-full mb-6" />
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed font-medium">
            <p>
              I didn’t enter software engineering through a traditional path. I
              learned by building, shipping, and fixing real problems.
            </p>
            <p>
              I care about clarity, reliability, and making systems that stay
              maintainable when the app grows.
            </p>
          </div>
        </motion.div>

        {/* Card 2: How I Build */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 0.12 }}
          className="p-8 rounded-3xl bg-foreground/5 border border-foreground/10 transition-all duration-500 ease-in-out hover:bg-foreground/10 hover:border-foreground/20 shadow-lg"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20 shrink-0">
              <Terminal className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-foreground tracking-tight">
                How I Build
              </h4>
              <p className="text-muted-foreground text-sm font-medium mt-1">
                Production-first, not demo-first.
              </p>
            </div>
          </div>

          <ul className="grid grid-cols-1 gap-2 list-disc list-inside text-muted-foreground text-sm font-medium">
            <li>Performance + accessibility as defaults</li>
            <li>Testing for critical flows (unit + integration)</li>
            <li>Clean data layer and predictable errors</li>
            <li>CI checks + pre-commit quality gates</li>
          </ul>

          <div className="mt-6 flex items-center gap-3 text-xs text-foreground/70 font-medium">
            <Blocks className="h-4 w-4" />
            Next.js • React • TypeScript • Node.js • PostgreSQL
          </div>
        </motion.div>
      </section>
      <div className="mt-10 flex justify-start">
        <Button asChild className="rounded-xl font-semibold">
          <Link href="/about" className="inline-flex items-center gap-2">
            Engineering Approach
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
