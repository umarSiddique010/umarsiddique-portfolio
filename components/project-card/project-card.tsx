'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import clsx from 'clsx';
import {
  Monitor,
  Smartphone,
  Github,
  ExternalLink,
  Target,
  Lightbulb,
  ChevronDown,
} from 'lucide-react';
import { ProjectData } from '@/constants/projects-data';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function ProjectCard({
  project,
  loading = 'lazy',
  index,
}: {
  project: ProjectData;
  loading?: 'lazy' | 'eager';
  index: number;
}) {
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const [showInsights, setShowInsights] = useState<boolean>(false);
  const [showFullScreen, setShowFullScreen] = useState<boolean>(false);

  const hasMobileImage = Boolean(project.mobileImage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.3, ease: 'easeOut', delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="overflow-hidden border-foreground/10 bg-foreground/5 transition-all duration-500 ease-in-out rounded-2xl flex flex-col h-full group hover:border-foreground/20 hover:bg-foreground/10 group-hover:scale-105 shadow-xl">
        {/* --- IMAGE SECTION --- */}
        <div className="relative w-full aspect-16/10 bg-foreground/5 border-b border-foreground/10 overflow-hidden shrink-0">
          {/* Toggle Buttons */}
          {hasMobileImage && (
            <div className="absolute top-4 right-4 z-20 flex bg-background/80 backdrop-blur-md border border-foreground/10 rounded-full p-1 shadow-sm transition-opacity duration-300">
              <button
                onClick={() => setIsMobileView(false)}
                className={clsx(
                  'p-1.5 rounded-full transition-colors',
                  !isMobileView
                    ? 'bg-foreground text-background shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
                )}
                aria-label="Desktop view"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsMobileView(true)}
                className={clsx(
                  'p-1.5 rounded-full transition-colors',
                  isMobileView
                    ? 'bg-foreground text-background shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
                )}
                aria-label="Mobile view"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Desktop Image */}
          <div
            onClick={() => setShowFullScreen((prev) => !prev)}
            aria-label="toggle full screen"
            aria-live="polite"
            aria-atomic="true"
            className={clsx(
              'absolute inset-0 transition-all duration-500 ease-in-out',
              hasMobileImage && isMobileView
                ? 'opacity-0 scale-95 pointer-events-none'
                : 'opacity-100 scale-100',
              showFullScreen &&
                'lg:fixed lg:top-20 lg:left-20 lg:right-20 lg:bottom-20 lg:z-50 lg:scale-3d lg:scale-105',
            )}
          >
            <Image
              src={project.desktopImage}
              alt={`${project.title} Desktop View`}
              fill
              loading={loading}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain object-center p-4 group-hover:scale-105 transition-all duration-500 ease-in-out"
            />
          </div>

          {/* Mobile Image */}
          {hasMobileImage && (
            <div
              onClick={() => setShowFullScreen((prev) => !prev)}
              aria-label="toggle full screen"
              aria-live="polite"
              aria-atomic="true"
              className={clsx(
                'absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out',
                isMobileView
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-110 pointer-events-none',
                showFullScreen &&
                  'lg:fixed md:top-0 lg:bottom-0 md:left-0 lg:right-0 lg:z-50 lg:scale-3d lg:scale-110',
              )}
            >
              <div
                className={clsx(
                  'relative w-[25%] h-[85%] rounded-2xl border-[6px] border-foreground/10 overflow-hidden bg-background group-hover:scale-105 transition-all duration-500 ease-in-out',
                  showFullScreen ? 'bg-transparent border-none' : 'shadow-xl',
                )}
              >
                <Image
                  src={project.mobileImage!}
                  alt={`${project.title} Mobile View`}
                  fill
                  sizes="(max-width: 768px) 30vw, 15vw"
                  className="object-contain object-center"
                />
              </div>
            </div>
          )}
        </div>

        {/* --- HEADER SECTION --- */}
        <CardHeader className="pb-4 pt-6">
          <div className="flex items-start justify-between gap-4">
            <CardTitle className="text-2xl font-bold tracking-tight">
              {project.title}
            </CardTitle>
            <div className="flex gap-2 shrink-0">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                asChild
              >
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Repository"
                >
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="default"
                size="icon"
                className="h-8 w-8 rounded-full"
                asChild
              >
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Live Project"
                >
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
            {project.description}
          </p>
        </CardHeader>

        {/* --- CONTENT SECTION --- */}
        <CardContent className="flex flex-col grow gap-5">
          {/* Expandable Insights Section */}
          <div className="flex flex-col">
            <button
              onClick={() => setShowInsights(!showInsights)}
              className="flex items-center gap-2 text-sm font-semibold text-foreground/80 cursor-pointer w-fit pb-2 transition-all duration-150 ease-in-out hover:text-foreground"
            >
              Project Insights
              <ChevronDown
                className={clsx(
                  'w-4 h-4 transition-transform duration-300',
                  showInsights && 'rotate-180',
                )}
              />
            </button>

            <AnimatePresence initial={false}>
              {showInsights && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-3 pt-2 pb-2">
                    {/* Intent Section */}
                    <div className="flex gap-3 p-3.5 rounded-xl bg-foreground/5 border border-foreground/10">
                      <Target className="w-4 h-4 text-foreground/70 shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        <span className="font-semibold text-foreground">
                          Intent:
                        </span>{' '}
                        {project.intent}
                      </p>
                    </div>

                    {/* KEY LEARNING Section */}
                    <div className="flex gap-3 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <Lightbulb className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-emerald-900 dark:text-emerald-200 leading-relaxed">
                        <span className="font-semibold">Learned:</span>{' '}
                        {project.keyLearning}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tech Stack Badges */}
          <div className="mt-auto pt-2">
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="bg-background border border-foreground/10 hover:bg-foreground/5 text-xs font-medium px-2.5 py-0.5 rounded-md transition-colors"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
