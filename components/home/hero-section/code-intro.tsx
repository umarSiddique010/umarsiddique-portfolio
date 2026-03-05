'use client';

import clsx from 'clsx';
import { Code, Minus, Plus, Square } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export function CodeIntro() {
  const [isClosed, setIsClosed] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <div className="mt-4 w-full">
      <motion.div
        layout
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className={clsx(
          'rounded-xl border border-foreground/10 p-4 font-mono text-sm leading-6 overflow-hidden',
          isMaximized
            ? 'absolute bottom-0 left-3 right-3 w-fit lg:w-full lg:inset-0 z-50 rounded-none bg-accent/95 backdrop-blur-md p-6'
            : 'bg-foreground/5',
        )}
      >
        <motion.div
          key="window"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {/* Top bar */}
          {!isClosed ? (
            <div className="flex mb-3 items-center gap-2">
              <button
                onClick={() => {
                  setIsClosed(true);
                  setIsMinimized(false);
                  setIsMaximized(false);
                }}
                className="w-3.5 h-3.5 p-0.5 rounded-full bg-red-500 group"
                aria-label="Close"
              >
                <Plus className="w-full h-full rotate-45 hidden group-hover:block transition-all duration-300" />
              </button>

              <button
                onClick={() => {
                  setIsMinimized((v) => !v);
                  setIsMaximized(false);
                }}
                className="w-3.5 h-3.5 p-0.5 rounded-full bg-yellow-500 group"
                aria-label="Minimize"
              >
                <Minus className="w-full h-full hidden group-hover:block transition-all duration-300" />
              </button>

              <button
                onClick={() => {
                  setIsMaximized((v) => !v);
                  setIsMinimized(false);
                }}
                className="w-3.5 h-3.5 p-0.5 rounded-full bg-green-500 group"
                aria-label="Maximize"
              >
                <Code className="w-full h-full rotate-45 hidden group-hover:block transition-all duration-300" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsClosed(false)}
              className="w-5 h-5 rounded-full p-1 bg-taupe-500 group"
              aria-label="Restore"
            >
              <Square className="w-full h-full hidden group-hover:block transition-all duration-300" />
            </button>
          )}
          {/* Body */}
          <motion.div
            layout
            initial={false}
            animate={{
              height: isMinimized || isClosed ? 0 : 'auto',
              opacity: isMinimized || isClosed ? 0 : 1,
            }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="space-y-0.5">
              <p>
                <span className="text-teal-600 font-semibold">const</span>{' '}
                <span className="text-fuchsia-600 font-medium">umar</span>{' '}
                <span className="text-foreground/80">= {'{'}</span>
              </p>

              <p className="pl-4">
                <span className="text-cyan-700 font-medium">role</span>
                <span className="text-foreground/80">:</span>{' '}
                <span className="text-green-600">
                  &quot;Full Stack Developer&quot;
                </span>
                <span className="text-foreground/80">,</span>
              </p>

              <p className="pl-4">
                <span className="text-cyan-700 font-medium">projects</span>
                <span className="text-foreground/80">:</span>{' '}
                <span className="text-green-600">&quot;5 shipped&quot;</span>
                <span className="text-foreground/80">,</span>
              </p>

              <p className="pl-4">
                <span className="text-cyan-700 font-medium">openSource</span>
                <span className="text-foreground/80">:</span>{' '}
                <span className="text-orange-600 font-medium">2</span>
                <span className="text-foreground/80">,</span>
              </p>

              <p className="pl-4">
                <span className="text-cyan-700 font-medium">focus</span>
                <span className="text-foreground/80">:</span>{' '}
                <span className="text-green-600">
                  &quot;Scalable Architecture &amp; Production Systems&quot;
                </span>
                <span className="text-foreground/80">,</span>
              </p>

              <p className="pl-4">
                <span className="text-cyan-700 font-medium">available</span>
                <span className="text-foreground/80">:</span>{' '}
                <span className="text-red-600 font-semibold">true</span>
              </p>

              <p>
                <span className="text-foreground/80">{'}'}</span>
              </p>
            </div>
          </motion.div>
          <motion.pre
            layout
            initial={false}
            animate={{
              height: isMaximized ? 'auto' : 0,
              opacity: isMaximized ? 1 : 0,
            }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className={clsx(
              'md:text-center -ml-10 mt-20 text-green-500 text-shadow-lg text-shadow-green-800 whitespace-pre text-[8px] sm:text-xs md:text-sm',
              isMaximized ? 'block' : 'hidden',
            )}
          >
            {`
              |||   |||  |||||||||  |||       |||      |||||||||||
              |||   |||  |||        |||       |||      |||     |||
              |||||||||  ||||||     |||       |||      |||     |||
              |||   |||  |||        |||       |||      |||     |||
              |||   |||  |||||||||  ||||||||| |||||||  |||||||||||
            `}
          </motion.pre>
        </motion.div>
      </motion.div>
    </div>
  );
}
