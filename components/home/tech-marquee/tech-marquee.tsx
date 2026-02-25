'use client';

import { useEffect, useState } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import { techItems } from '@/constants/tech-stack-items';
import Link from 'next/link';

export default function TechMarquee() {
  const marqueeItems = [...techItems, ...techItems];

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const progress = useMotionValue(0);

  const smoothSpeed = useSpring(1, {
    stiffness: 30,
    damping: 10,
    mass: 1.5,
  });
  useEffect(() => {
    smoothSpeed.set(isHovered ? 0 : 1);
  }, [isHovered, smoothSpeed]);

  useAnimationFrame((t, delta) => {
    let moveBy = -0.015 * (delta / 16.667);

    moveBy *= smoothSpeed.get();

    progress.set(progress.get() + moveBy);
  });

  const x = useTransform(progress, (v) => `${v % 25}%`);

  return (
    <section className="w-full py-10 overflow-hidden relative bg-transparent">
      <div className="absolute inset-0 z-10 pointer-events-none mask-[linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] bg-background/0" />

      <div
        className="flex w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="flex gap-10 md:gap-16 pr-10 md:pr-16 w-max"
          style={{ x }}
        >
          {marqueeItems.map((item, index) => (
            <Link
              key={`${item.title}-${index}`}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.title}
              className="group flex items-center gap-3 text-lg md:text-xl font-semibold text-foreground/60 hover:text-foreground transition-colors duration-300 whitespace-nowrap cursor-pointer"
            >
              <span className="w-6 h-6 rounded bg-foreground/10 flex items-center justify-center text-[10px] shrink-0 transition-colors duration-300 group-hover:bg-foreground/20">
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
