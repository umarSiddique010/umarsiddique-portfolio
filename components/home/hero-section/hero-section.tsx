'use client';

import { motion, Variants } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Download, MapPin } from 'lucide-react';
import { CodeIntro } from './hero-code';

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 120 },
    },
  };

  const lineOneH1DivVariants: Variants = {
    hidden: { opacity: 1 },
    visible: { transition: { staggerChildren: 0.04 } },
  };
  const lineOneH1SpanVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 10, stiffness: 300 },
    },
  };
  const lineTwoH1DivVariants: Variants = {
    hidden: { opacity: 1 },
    visible: { transition: { staggerChildren: 0.04 } },
  };
  const lineTwoH1SpanVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 10, stiffness: 300 },
    },
  };

  return (
    <section className="relative w-full pt-28 md:pt-40 pb-16 px-6 md:px-12 z-10 max-w-7xl mx-auto">
      <motion.div
        className="w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Side */}
        <motion.div
          className="lg:col-span-8 flex flex-col items-start text-left"
          variants={itemVariants}
        >
          <Badge
            variant="secondary"
            className="mb-8 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 px-4 py-1.5 text-sm font-medium border-0 transition-colors"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse animation-duration-[0.8s]"></span>
            Available for new opportunities
          </Badge>

          {/* Main Heading   */}
          <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-extrabold tracking-tighter text-foreground mb-6 leading-[1.05]">
            <motion.div
              className="flex flex-wrap mb-1"
              initial="hidden"
              animate="visible"
              variants={lineOneH1DivVariants}
            >
              {'Building Fast, Modern'.split(' ').map((word, wordIndex) => (
                <span
                  key={wordIndex}
                  className="inline-block whitespace-nowrap mr-[0.25em] last:mr-0"
                >
                  {word.split('').map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      className="inline-block"
                      variants={lineOneH1SpanVariants}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-wrap bg-linear-to-r from-zinc-700 via-zinc-600 to-zinc-200 bg-clip-text text-transparent py-1 dark:bg-linear-to-r dark:from-zinc-500 dark:via-zinc-300 dark:to-zinc-100"
              initial="hidden"
              animate="visible"
              variants={lineTwoH1DivVariants}
            >
              {'Web Applications.'.split(' ').map((word, wordIndex) => (
                <span
                  key={wordIndex}
                  className="inline-block whitespace-nowrap mr-[0.25em] last:mr-0"
                >
                  {word.split('').map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      className="inline-block"
                      variants={lineTwoH1SpanVariants}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.div>
          </h1>

          {/* Main Paragraph */}  
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed font-medium"
          >
            Full-stack developer building fast, accessible web applications with
            Next.js. I focus on performance, scalable architecture, and building
            systems that hold up in production.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 h-12 text-base font-semibold shadow-none"
            >
              <Link href="#projects">View My Work</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8 h-12 text-base font-semibold bg-transparent border-foreground/20 hover:bg-foreground/5 shadow-none"
            >
              <Link href="/contact">Let's Talk</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="rounded-full px-6 h-12 text-muted-foreground hover:text-foreground"
            >
              <Link href="/resume.pdf" download>
                <Download className="mr-2 h-4 w-4" /> Download CV
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-4 flex flex-col items-start lg:border-l border-foreground/10 lg:pl-12"
        >
          <div className="space-y-1">
            <h2 className="font-bold text-2xl md:text-3xl text-foreground tracking-tight">
              Md Umar Siddique
            </h2>
            <p className="text-base font-medium text-muted-foreground">
              Full-Stack Developer
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mt-6 bg-foreground/5 px-3 py-1.5 rounded-full">
            <MapPin className="h-4 w-4" />
            <span>India • Remote Friendly</span>
          </div>

          {/* Code Intro */}
          <CodeIntro />
        </motion.div>
      </motion.div>
    </section>
  );
}
