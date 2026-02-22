'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ModeToggle } from './mode-toggle';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence, motion, Variants } from 'motion/react';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Projects',
      href: '/projects',
    },
    {
      title: 'About',
      href: '/about',
    },

    {
      title: 'Blog',
      href: '/blog',
    },
    {
      title: 'Contact',
      href: '/contact',
    },
  ];
  return (
    <nav className="w-full flex justify-between items-center px-5 py-3 h-[72px]">
      <Link href="/" className="font-bold text-xl">
        LOGO
      </Link>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="hidden md:block">
          <DesktopNav links={links} pathname={pathname} />
        </div>

        <ModeToggle />

        <div className="block md:hidden">
          <MobileNav links={links} pathname={pathname} />
        </div>
      </div>
    </nav>
  );
}

function DesktopNav({
  links,
  pathname,
}: {
  links: { title: string; href: string }[];
  pathname: string;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <ul
      className="flex gap-2 justify-start items-center p-2 relative"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {links.map((link, index) => {
        const isActive = pathname === link.href;
        const isHovered = hoveredIndex === index;

        return (
          <li
            key={link.href}
            className="relative"
            onMouseEnter={() => setHoveredIndex(index)}
          >
            <Link
              href={link.href}
              className={clsx(
                'relative z-10 py-1.5 px-4 font-medium transition-colors duration-300 rounded-xl block group group',
                isActive || isHovered
                  ? 'text-accent-foreground'
                  : 'text-foreground/60',
              )}
            >
              {link.title}
            </Link>

            {(isHovered || (isActive && hoveredIndex === null)) && (
              <motion.span
                layoutId="nav-hover-bg"
                className="absolute inset-0 bg-accent rounded-xl border border-accent-foreground/10 z-0"
                initial={false}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 35,
                }}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

function MobileNav({
  links,
  pathname,
}: {
  links: { title: string; href: string }[];
  pathname: string;
}) {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
        when: 'afterChildren',
      },
    },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
        mass: 0.8,
      },
    },
    exit: {
      opacity: 0,
      y: 30,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        staggerDirection: -1,
        when: 'afterChildren',
      },
    },
  };

  return (
    <>
      {!isOpenMenu && (
        <Button
          variant={'ghost'}
          onClick={() => setIsOpenMenu(true)}
          aria-label="Open menu"
          className="p-2 border-2 border-accent-foreground/20 hover:bg-accent rounded-md"
        >
          <Menu size={34} className="text-foreground" />
        </Button>
      )}

      <AnimatePresence>
        {isOpenMenu && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{
              opacity: 0,
              x: '100%',
              transition: { duration: 0.5, ease: 'easeInOut' },
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="fixed inset-0 z-50 flex flex-col bg-accent/50 backdrop-blur-md  p-2"
          >
            <div className="flex justify-end items-center h-20 w-full">
              <button
                onClick={() => setIsOpenMenu(false)}
                aria-label="Close menu"
                className=" p-2 border-2 border-accent-foreground/20 hover:bg-accent rounded-md mr-4"
              >
                <X size={24} className="text-foreground" />
              </button>
            </div>

            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="flex flex-col gap-2 px-10"
            >
              {links.map((link) => (
                <motion.li key={link.href} variants={itemVariants}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpenMenu(false)}
                    className={clsx(
                      'block py-4 text-2xl font-semibold transition-colors duration-200',
                      pathname === link.href
                        ? 'text-primary'
                        : 'text-foreground/50',
                    )}
                  >
                    {link.title}
                  </Link>
                  {pathname === link.href && (
                    <motion.div
                      layoutId="mobile-active-line"
                      className="h-1 w-10 bg-primary rounded-full"
                    />
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
