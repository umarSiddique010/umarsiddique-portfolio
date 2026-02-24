'use client';

import { motion } from 'motion/react';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';

export default function CTAsection() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } =
      buttonRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    // 0.15 is the strength of the magnetic pull
    setPosition({ x: x * 0.15, y: y * 0.15 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <section className="w-full py-32 md:py-36 px-6 relative overflow-hidden flex flex-col items-center justify-center text-center z-10">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-xl h-xl bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-3xl flex flex-col items-center"
      >
        {/* Live Status Badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 mb-8 backdrop-blur-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-sm font-medium text-foreground/80">
            Available for new roles & projects
          </span>
        </div>
        {/* Headline */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-foreground mb-6 leading-[1.05]">
          Have a project in mind? <br />
          <span className="text-muted-foreground">Let's build it right.</span>
        </h2>
        {/* Subtext */}
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl leading-relaxed font-medium">
          I ship scalable, high-performance web applications backed by reliable{' '}
          <span className="text-foreground font-semibold">
            well-tested code
          </span>{' '}
          — built to{' '}
          <span className="text-foreground font-semibold">
            perform in production
          </span>{' '}
          and grow with your needs.
        </p>

        {/* Magnetic Button Wrapper */}
        <motion.div
          ref={buttonRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{ x: position.x, y: position.y }}
          transition={{
            type: 'spring',
            stiffness: 150,
            damping: 15,
            mass: 0.1,
          }}
          className="p-12"
        >
          <Link href="mailto:us70763@gmail.com">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-full font-semibold text-lg hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] dark:hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-shadow"
            >
              <Mail className="w-5 h-5" />
              Say Hello
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
