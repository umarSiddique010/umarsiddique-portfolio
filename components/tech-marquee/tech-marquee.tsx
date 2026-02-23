'use client';

import { motion } from 'motion/react';
import { techItems } from '@/constants/tech-stack-items';
import Link from 'next/link';

export default function TechMarquee() {
  const marqueeItems = [...techItems, ...techItems];

  return (
    <section className="w-full py-10 overflow-hidden relative bg-transparent">
      <div className="absolute inset-0 z-10 pointer-events-none mask-[linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] bg-background/0" />

      <div className="flex w-full group">
        <motion.div
          className="flex gap-10 md:gap-16 pr-10 md:pr-16 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 30 }}
        >
          {marqueeItems.map((item, index) => (
            <Link
              key={`${item.href}-${index}`}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-lg md:text-xl font-semibold text-foreground/60 hover:text-foreground transition-colors whitespace-nowrap cursor-pointer"
            >
              <span className="w-6 h-6 rounded bg-foreground/10 flex items-center justify-center text-[10px] shrink-0 ">
                {item.icon}
              </span>
              {item.title}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
