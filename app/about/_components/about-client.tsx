'use client';

import { motion } from 'motion/react';
import clsx from 'clsx';
import { educationTimelineData } from '@/constants/education-timeline';
import AboutCards from '@/components/about-cards/about-cards';
import { aboutCTA } from '@/constants/cta-data';
import CTAsection from '@/components/cta-section/cta-section';

export default function AboutClient() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 pt-20 -pb-20 md:pt-32 md:-pb-20">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 md:mb-24 max-w-3xl"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          Systems Over Syntax.
        </h1>
        <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
          I’m{' '}
          <strong className="text-foreground font-semibold">
            Md Umar Siddique
          </strong>
          . I design and build production-focused web systems grounded in clear
          architecture, reliability, and long-term maintainability. My
          background shaped how I think — in structured logic and systems, not
          just surface-level implementation.
        </p>
      </motion.section>

      {/* --- EXTRACTED CARDS COMPONENT --- */}
      <AboutCards />

      {/* --- TIMELINE SECTION --- */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-12">The Journey</h2>
        <div className="relative border-l-2 border-foreground/10 ml-4 md:ml-6 space-y-12 pb-8">
          {educationTimelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline Dot */}
              <div
                className={clsx(
                  'absolute -left-6 top-1.5 p-2 rounded-full border-4 border-background',
                  item.bg,
                  item.color,
                )}
              >
                {item.icon}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2">
                <span className="text-sm font-bold text-foreground/70 tracking-widest uppercase">
                  {item.year}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm font-medium text-foreground/70 mb-2">
                  {item.institution}
                </p>
                <p className="text-foreground/70 leading-relaxed max-w-2xl mb-4">
                  {item.description}
                </p>

                {/* Highlight Badge */}
                <div
                  className={clsx(
                    'w-fit px-3 py-1 rounded-lg border text-xs font-semibold',
                    item.bg,
                    item.color,
                    item.border,
                  )}
                >
                  {item.highlight}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
      <CTAsection {...aboutCTA} />
    </section>
  );
}
