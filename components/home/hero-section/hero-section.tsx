'use client';

import { motion, Variants } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Download, MapPin } from 'lucide-react';
import { CodeIntro } from './code-intro';
import { toast } from 'sonner';

export default function HeroSection() {
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

  return (
    <section className="relative w-full md:py-16 py-16 px-6 md:px-12 z-10 max-w-7xl mx-auto">
      <motion.header
        className="w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* --- Left Side --- */}
        <motion.div
          className="lg:col-span-8 flex flex-col items-start text-left"
          variants={itemVariants}
        >
          <Badge
            variant="secondary"
            className="mb-8 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 px-4 py-1.5 text-sm font-medium border-0 transition-colors"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse animation-duration-[0.8s]"></span>
            Currently Available for New Opportunities
          </Badge>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-extrabold tracking-tighter text-foreground mb-6 leading-[1.05]">
            <motion.div
              className="flex flex-wrap mb-1"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 1 },
                visible: { transition: { staggerChildren: 0.04 } },
              }}
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
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            type: 'spring',
                            damping: 10,
                            stiffness: 300,
                          },
                        },
                      }}
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
              variants={{
                hidden: { opacity: 1 },
                visible: { transition: { staggerChildren: 0.04 } },
              }}
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
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            type: 'spring',
                            damping: 10,
                            stiffness: 300,
                          },
                        },
                      }}
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
            Full-stack developer who thinks in systems, not just syntax —
            building fast, accessible web applications with Next.js and
            TypeScript, with a focus on performance, scalable architecture, and
            production reliability.
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
              <Link href="/contact">Let&apos;s Talk</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="rounded-full px-6 h-12 text-muted-foreground hover:text-foreground"
              onClick={() =>
                toast.success('My CV is on its way. Thanks for taking a look')
              }
            >
              <Link href="/md-umar-siddique-resume.pdf" download>
                <Download className="mr-2 h-4 w-4" /> Download CV
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* --- Right Side --- */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-4 flex flex-col items-start lg:border-l border-foreground/10 lg:pl-12 pt-8 lg:pt-0"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, y: [0, -8, 0] }}
            transition={{
              scale: { type: 'spring', stiffness: 100, delay: 0.2 },
              y: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
            }}
            className="relative bg-accent/40 dark:bg-accent/20 rounded-3xl w-48 h-48 md:w-64 md:h-64 mb-8 drop-shadow-2xl"
          >
            <Image
              src="/avatar.webp"
              alt="Md Umar Siddique - Developer Avatar"
              fill
              sizes="(max-width: 768px) 192px, 256px"
              className="object-cover rounded-3xl"
              priority
            />
          </motion.div>

          <div className="space-y-1">
            <h2 className="font-bold text-2xl md:text-3xl text-foreground tracking-tight">
              Md Umar Siddique
            </h2>
            <p className="text-base font-medium text-muted-foreground">
              Full Stack Developer
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mt-6 mb-8 bg-foreground/5 px-3 py-1.5 rounded-full w-fit">
            <MapPin className="h-4 w-4 text-emerald-500" />
            <span>India • Remote Friendly</span>
          </div>

          {/* Code Intro Component */}
          <div className="w-full">
            <CodeIntro />
          </div>
        </motion.div>
      </motion.header>
    </section>
  );
}
