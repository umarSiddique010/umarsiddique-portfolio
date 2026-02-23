'use client';

import { motion } from 'motion/react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';

const projects = [
  {
    title: 'AI SaaS Platform',
    description:
      'Built a production-ready SaaS that automates content creation. Solved the problem of high API latency by implementing edge functions.',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'OpenAI'],
    link: '#',
    github: '#',
    image: '/project1.jpg', // Abhi placeholder ki tarah treat kar isse
  },
  {
    title: 'E-Commerce Engine',
    description:
      'A high-performance engine supporting 10k+ concurrent users. Focused on accessibility and Core Web Vitals.',
    tech: ['React', 'Prisma', 'Tailwind CSS', 'Stripe'],
    link: '#',
    github: '#',
    image: '/project2.jpg',
  },
];

export default function ProjectSection() {
  return (
    <section id="projects" className="w-full py-24 px-6 max-w-7xl mx-auto">
      <div className="space-y-4 mb-16 text-left">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
          Featured Projects
        </h2>
        <p className="text-muted-foreground text-lg max-w-md font-medium">
          A selection of my recent work, focusing on performance and user
          experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Card className="overflow-hidden border-foreground/10 bg-transparent shadow-none rounded-[1.5rem] flex flex-col h-full">
              {/* Project Image Placeholder */}
              <div className="w-full h-48 bg-foreground/5 flex items-center justify-center border-b border-foreground/5">
                <span className="text-muted-foreground font-mono text-sm">
                  [ Project Image ]
                </span>
              </div>

              <CardHeader className="pt-6">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-2xl font-bold tracking-tight">
                    {project.title}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      className="h-8 w-8 rounded-full"
                    >
                      <Link href={project.github}>
                        <Github className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      className="h-8 w-8 rounded-full"
                    >
                      <Link href={project.link}>
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                  {project.description}
                </p>
              </CardHeader>

              <CardContent className="mt-auto">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="bg-foreground/5 text-[11px] font-semibold border-0 px-2.5 py-0.5"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
