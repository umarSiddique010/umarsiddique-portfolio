'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Monitor, Smartphone } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';
import Image from 'next/image';

const projects = [
  {
    title: 'Resume Craft',
    description:
      'A production-ready resume builder with real-time preview, multi-template support (Standard, Classic & ATS-optimized), and high-quality PDF export. Built with a client-side architecture using Context + Reducer, rigorous Vitest coverage, and CI/CD workflows for reliability.',
    tech: [
      'React 19',
      'Vite',
      'Context + Reducer',
      'Vitest',
      '@react-pdf/renderer',
      'GitHub Actions',
    ],
    link: 'https://resume-craft-react.vercel.app/',
    github: 'https://github.com/umarSiddique010/resume-craft-react',
    imageDesktop: '/resume-craft-desktop-view.webp',
    imageMobile: '/resume-craft-mobile-view.webp',
  },
  {
    title: 'use-http-request-hook',
    description:
      'A lightweight, production-ready React hook for HTTP requests with built-in GET caching, debounce support, waterfall protection (request deduping), and AbortController cancellation — zero dependencies, clean async logic, and easy refetch/cache invalidation.',
    tech: [
      'React Hooks',
      'Fetch API',
      'AbortController',
      'Rollup',
      'npm Package',
    ],
    link: 'https://www.npmjs.com/package/@mdus/use-http-request-hook',
    github: 'https://github.com/umarSiddique010/use-http-request-hook',
    imageDesktop: '/use-https-hook-screenshot.webp',
    imageMobile: '',
  },
];

export default function ProjectSection() {
  const [isMobileView, setIsMobileView] = useState<boolean>(false);

  return (
    <section id="projects" className="w-full py-24 px-6 max-w-7xl mx-auto">
      <div className="space-y-4 mb-16 text-left">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
          Featured Projects
        </h2>
        <p className="text-muted-foreground text-lg max-w-md font-medium">
          A selection of recent projects showcasing practical problem-solving
          and production-ready architecture.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={`${index}-${project.title}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
              type: 'spring',
              stiffness: 300,
              delay: index * 0.15,
            }}
            className="h-full"
          >
            <Card className="overflow-hidden border-foreground/10 bg-accent/75 shadow-none rounded-2xl flex flex-col h-full transition-transform duration-300 hover:-translate-y-2.5">
              <div className="relative w-full aspect-16/11 sm:aspect-16/10 bg-foreground/5 border-b border-foreground/10 overflow-hidden">
                {/* toggle view for desktop and mobile */}
                {index === 0 && (
                  <div className="absolute top-4 right-4 z-20 flex items-center bg-background/80 backdrop-blur-md border border-foreground/10 rounded-full p-1 shadow-sm">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMobileView(false);
                      }}
                      className={clsx(
                        'p-1.5 rounded-full transition-all duration-200',
                        !isMobileView
                          ? 'bg-foreground text-background shadow-md'
                          : 'text-muted-foreground hover:text-foreground',
                      )}
                      aria-label="Desktop View"
                    >
                      <Monitor className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMobileView(true);
                      }}
                      className={clsx(
                        'p-1.5 rounded-full transition-all duration-200',
                        isMobileView
                          ? 'bg-foreground text-background shadow-md'
                          : 'text-muted-foreground hover:text-foreground',
                      )}
                      aria-label="Mobile View"
                    >
                      <Smartphone className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* DESKTOP IMAGE */}
                <div
                  className={clsx(
                    'absolute inset-0 transition-all duration-500 ease-in-out object-contain',
                    index === 0 && isMobileView
                      ? 'opacity-0 scale-95 pointer-events-none'
                      : 'opacity-100 scale-100',
                  )}
                >
                  <Image
                    src={project.imageDesktop}
                    alt={`${project.title} Desktop View`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain object-center"
                    priority={index === 0}
                  />
                </div>

                {/* MOBILE IMAGE */}
                {index === 0 && (
                  <div
                    className={clsx(
                      'absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out',
                      isMobileView
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-110 pointer-events-none',
                    )}
                  >
                    {/* The Phone Bezel Container */}
                    <div className="relative w-[30%] h-[90%] md:w-[25%] md:h-[84%] rounded-2xl border-8 border-foreground/20 shadow-2xl overflow-hidden bg-background">
                      <Image
                        src={project.imageMobile}
                        alt={`${project.title} Mobile View`}
                        fill
                        sizes="(max-width: 768px) 33vw, 20vw"
                        className="object-contain object-center"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Card Header & Content */}
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
                      aria-label="GitHub"
                    >
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      className="h-8 w-8 rounded-full"
                      aria-label="External Link"
                    >
                      <Link
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                  {project.description}
                </p>
              </CardHeader>

              {/* card content e.i tech stack */}
              <CardContent className="mt-auto pb-6">
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
