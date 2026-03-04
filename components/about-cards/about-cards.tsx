'use client';

import { motion } from 'motion/react';
import { BrainCircuit, BookOpen, GitMerge, Rocket, Wrench } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AboutCards() {
  const categories = {
    Languages: ['TypeScript', 'JavaScript', 'HTML', 'CSS'],

    Frontend: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],

    'Backend & Data': ['Node.js', 'PostgreSQL', 'Prisma', 'Neon'],

    'Testing & Quality': [
      'Vitest',
      'Jest',
      'Testing Library',
      'ESLint',
      'Prettier',
    ],

    'Tooling & CI/CD': ['Git', 'GitHub', 'GitHub Actions', 'Husky', 'npm'],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
      {/* The Non-CS Journey */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="md:col-span-3"
      >
        <Card className="h-full overflow-hidden border-foreground/10 bg-foreground/5 hover:border-foreground/20 hover:bg-foreground/10 transition-all duration-300 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start shadow-lg">
          <div className="p-4 rounded-2xl bg-emerald-500/10 shrink-0">
            <BookOpen className="w-8 h-8 text-emerald-500" />
          </div>
          <article>
            <h2 className="text-2xl font-bold mb-4">The Non-CS Journey</h2>
            <div className="text-muted-foreground leading-relaxed space-y-4 max-w-4xl">
              <header>
                My journey into software engineering didn&apos;t start with a CS
                degree. It started with a 250MB RAM Windows XP machine when I
                was ten years old. I used to take it apart just to understand
                how it worked. By fourteen, I had become the unofficial “tech
                guy” in my neighborhood, fixing computers for friends and
                family.
              </header>
              <p>
                When that PC eventually broke, financial constraints meant I
                couldn&apos;t replace it, and I had to step away from technology
                for several years.
              </p>
              <p>
                In mid-2023, while preparing for the UPSC exams, I finally got
                access to a laptop again. The moment I started using it, I
                realized the curiosity I had as a child hadn&apos;t gone
                anywhere.
              </p>
              <p>
                In 2024, to fund my learning, I worked full-time at a grocery
                store. After finishing my shifts, I would come home and spend my
                evenings teaching myself web development and building projects.
              </p>
              <p>
                The real turning point came in late 2025 when I discovered
                Next.js and modern React architecture. For the first time,
                everything clicked — from UI to backend to deployment as a
                complete system. Since then, I&apos;ve focused on consistently
                shipping code and building production-ready applications
              </p>
              <footer>
                Today, I&apos;m focused on understanding systems end-to-end and
                eventually engineering software that solves meaningful
                real-world problems.
              </footer>
            </div>
          </article>
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
        <Card className="h-full overflow-hidden border-foreground/10 bg-foreground/5 hover:border-foreground/20 hover:bg-foreground/10 transition-all duration-300 rounded-3xl p-8 flex flex-col justify-center shadow-lg">
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
        <Card className="h-full overflow-hidden border-foreground/10 bg-foreground/5 hover:border-foreground/20 hover:bg-foreground/10 transition-all duration-300 rounded-3xl p-8 flex flex-col items-start shadow-lg">
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

      {/* How I Work / The Process */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="md:col-span-3"
      >
        <Card className="h-full overflow-hidden border-foreground/10 bg-foreground/5 hover:border-foreground/20 hover:bg-foreground/10 transition-all duration-300 rounded-3xl p-8 shadow-lg">
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

      {/* Engineering Toolkit  */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="md:col-span-3"
      >
        <Card className="h-full overflow-hidden border-foreground/10 bg-foreground/5 hover:border-foreground/20 hover:bg-foreground/10 transition-all duration-300 rounded-3xl py-6 px-6 md:px-8 shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <Wrench className="w-7 h-7 text-blue-500" />
            <h2 className="text-xl font-bold">Engineering Toolkit</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {Object.entries(categories).map(([categoryName, items]) => (
              <div key={categoryName}>
                <h3 className="text-sm font-bold text-foreground/80 mb-3 tracking-tight uppercase">
                  {categoryName}
                </h3>
                <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1 font-medium">
                  {items.map((itemName) => {
                    return <li key={itemName}>{itemName}</li>;
                  })}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
