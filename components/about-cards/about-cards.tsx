'use client';

import { motion } from 'motion/react';
import { BrainCircuit, BookOpen, GitMerge, Rocket } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AboutCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="md:col-span-3"
      >
        <Card className="h-full overflow-hidden border-foreground/10 bg-accent/10 hover:bg-foreground/5 transition-all duration-300 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start">
          <div className="p-4 rounded-2xl bg-emerald-500/10 shrink-0">
            <BookOpen className="w-8 h-8 text-emerald-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">The Non-CS Journey</h2>
            <div className="text-muted-foreground leading-relaxed space-y-4 max-w-4xl">
              <p>
                My engineering journey didn&apos;t start in a university lab. It
                started in childhood, tearing apart old computers just to
                understand how the logic flowed. By 14, I was the neighborhood
                tech guy, fixing PCs until financial hurdles forced a pause.
              </p>
              <p>
                Years later, while preparing for UPSC exams, I realized my brain
                was wired for building systems, not memorizing policies. I
                pivoted fully into software engineering. I funded my learning by
                working full-time, coding late into the night because
                architecting for the web felt natural to me.
              </p>
              <p>
                The turning point was early 2026 when I dived deep into Next.js
                and modern React architecture. Since then, I’ve focused on
                shipping production-ready systems and understanding the
                architectural “why” behind every decision. I transitioned from
                self-taught fundamentals into disciplined, production-focused
                engineering.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Engineering Philosophy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="md:col-span-2"
      >
        <Card className="h-full overflow-hidden border-foreground/10 bg-accent/10 hover:bg-foreground/5 transition-all duration-300 rounded-3xl p-8 flex flex-col justify-center">
          <BrainCircuit className="w-8 h-8 text-cyan-500 mb-6" />
          <h2 className="text-xl font-bold mb-4">
            How I Think About Engineering
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            I don&apos;t just write syntax to make things look good. I care
            about the underlying mechanics. Writing clean code is the baseline;
            architecting systems that don&apos;t break under pressure is the
            goal.
          </p>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-cyan-500 font-bold">↳</span>
              <span>
                <strong>Architecture First:</strong> Decoupled logic over
                spaghetti code. Using Context/useReducer strategically instead
                of prop-drilling.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-500 font-bold">↳</span>
              <span>
                <strong>Testing Discipline:</strong> Unit testing (Vitest/Jest)
                isn&apos;t an afterthought. It&apos;s how I ensure my hooks and
                APIs remain bulletproof.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-500 font-bold">↳</span>
              <span>
                <strong>CI/CD & Shipping:</strong> Automated checks (Husky,
                ESLint, GitHub Actions) so the main branch is always
                deploy-ready.
              </span>
            </li>
          </ul>
        </Card>
      </motion.div>

      {/* Long-term Vision */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="md:col-span-1"
      >
        <Card className="h-full overflow-hidden border-foreground/10 bg-accent/10 hover:bg-foreground/5 transition-all duration-300 rounded-3xl p-8 flex flex-col items-start">
          <div className="p-3 rounded-xl bg-orange-500/10 mb-6">
            <Rocket className="w-6 h-6 text-orange-500" />
          </div>
          <h2 className="text-xl font-bold mb-3">The Vision</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-auto">
            I operate with a <strong>Product Ownership Mindset</strong>.
            I&apos;m not just here to close Jira tickets. My long-term goal is
            mastering end-to-end full-stack architecture and building scalable
            SaaS systems that solve real-world problems.
          </p>
        </Card>
      </motion.div>

      {/*  How I Work / The Process  */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="md:col-span-3"
      >
        <Card className="h-full overflow-hidden border-foreground/10 bg-accent/10 hover:bg-foreground/5 transition-all duration-300 rounded-3xl p-8">
          <div className="flex items-center gap-4 mb-8">
            <GitMerge className="w-8 h-8 text-fuchsia-500" />
            <h2 className="text-xl font-bold">How I Work (The Workflow)</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Badge
                variant="outline"
                className="text-fuchsia-500 border-fuchsia-500/30"
              >
                01. Discovery
              </Badge>
              <p className="text-sm text-muted-foreground">
                Understanding the core business problem before touching the
                keyboard. Defining data structures.
              </p>
            </div>
            <div className="space-y-2">
              <Badge
                variant="outline"
                className="text-fuchsia-500 border-fuchsia-500/30"
              >
                02. Architecture
              </Badge>
              <p className="text-sm text-muted-foreground">
                Choosing the right tools (Next.js vs React SPA). Setting up
                enforced linting rules, TypeScript types, and Git hooks.
              </p>
            </div>
            <div className="space-y-2">
              <Badge
                variant="outline"
                className="text-fuchsia-500 border-fuchsia-500/30"
              >
                03. Execution
              </Badge>
              <p className="text-sm text-muted-foreground">
                Writing modular, accessible (a11y) components. Structured local
                testing to catch edge cases early.
              </p>
            </div>
            <div className="space-y-2">
              <Badge
                variant="outline"
                className="text-fuchsia-500 border-fuchsia-500/30"
              >
                04. Shipping
              </Badge>
              <p className="text-sm text-muted-foreground">
                Deploying via CI/CD pipelines. Monitoring Lighthouse metrics to
                ensure optimal client-side performance.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
