'use client';

import { motion } from 'motion/react';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import { CTAData } from '@/constants/cta-data';

export default function CTAsection({
  variant = 'full',
  badgeText,
  title1,
  title2,
  description,
  buttonText,
  buttonLink,
}: CTAData) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const isMinimal = variant === 'minimal';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } =
      buttonRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.15, y: y * 0.15 });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
      className={clsx(
        'w-full px-6 relative overflow-hidden flex flex-col items-center justify-center text-center z-10',
        isMinimal ? 'py-20 md:py-24' : 'py-24 md:py-28',
      )}
    >
      {/* Glow Effect for full variant */}
      {!isMinimal && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-xl h-xl bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-3xl flex flex-col items-center"
      >
        {/* Live Status Badge is optional */}
        {badgeText && !isMinimal && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 mb-8 backdrop-blur-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            </span>
            <span className="text-sm font-medium text-foreground/80">
              {badgeText}
            </span>
          </div>
        )}

        {/* Headline */}
        <h2
          className={clsx(
            'font-extrabold tracking-tighter text-foreground mb-6 leading-[1.05]',
            isMinimal
              ? 'text-3xl md:text-5xl lg:text-5xl'
              : 'text-4xl md:text-6xl lg:text-7xl',
          )}
        >
          {title1}{' '}
          {title2 && (
            <>
              <br />
              <span className="text-muted-foreground">{title2}</span>
            </>
          )}
        </h2>

        {/* Subtext */}
        {description && (
          <p
            className={clsx(
              'text-muted-foreground max-w-2xl leading-relaxed font-medium',
              isMinimal
                ? 'text-base md:text-lg mb-8'
                : 'text-lg md:text-xl mb-12',
            )}
          >
            {description}
          </p>
        )}

        {/*  Magnetic Button Wrapper */}
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
          className={isMinimal ? 'p-4' : 'p-12'}
        >
          <Link href={buttonLink}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={clsx(
                'flex items-center gap-2 bg-foreground text-background font-semibold transition-shadow',
                isMinimal
                  ? 'px-6 py-3 rounded-xl text-base hover:shadow-lg'
                  : 'px-8 py-4 rounded-full text-lg hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] dark:hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]',
              )}
            >
              {isMinimal ? (
                <ArrowRight className="w-4 h-4" />
              ) : (
                <Mail className="w-5 h-5" />
              )}
              {buttonText}
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
