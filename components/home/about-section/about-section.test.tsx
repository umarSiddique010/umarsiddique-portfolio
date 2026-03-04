import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import type { ReactNode, HTMLAttributes } from 'react';
import AboutSection from './about-section';

// Mock: next/link -> plain anchor for assertions
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock: tech stack data to validate filtering behavior
vi.mock('@/constants/tech-stack-items', () => ({
  techItems: [
    { title: 'Next.js', href: '/next' },
    { title: 'React', href: '/react' },
    { title: 'TypeScript', href: '/ts' },
    { title: 'Vitest', href: '/vitest' },
    { title: 'GitHub Actions', href: '/gha' },
    { title: 'Husky', href: '/husky' },
    { title: 'Prettier', href: '/prettier' },
    { title: 'npm', href: '/npm' },
  ],
}));

// Mock: motion/react (strip animation, capture delay)

type MotionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  className?: string;
  transition?: { duration?: number; delay?: number };
  viewport?: Record<number, string>;
  initial?: Record<number, string>;
  whileInView?: Record<number, string>;
  animate?: Record<number, string>;
};

vi.mock('motion/react', () => ({
  motion: {
    header: ({ children, transition, ...props }: MotionProps) => (
      <header
        data-testid="motion-header"
        data-delay={transition?.delay ?? 0}
        {...props}
      >
        {children}
      </header>
    ),
    div: ({ children, transition, ...props }: MotionProps) => (
      <div
        data-testid="motion-div"
        data-delay={transition?.delay ?? 0}
        {...props}
      >
        {children}
      </div>
    ),
    section: ({ children, transition, ...props }: MotionProps) => (
      <section
        data-testid="motion-section"
        data-delay={transition?.delay ?? 0}
        {...props}
      >
        {children}
      </section>
    ),
  },
}));

describe('AboutSection', () => {
  const setup = () => render(<AboutSection />);

  describe('Header & positioning', () => {
    setup();
    it('renders the Snapshot header and anchors to #about', () => {
      expect(
        screen.getByRole('heading', { name: /Snapshot\./i }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /The core of who I am, what I know, and how I build\./i,
        ),
      ).toBeInTheDocument();

      const section = document.querySelector('section#about');
      expect(section).toBeTruthy();
    });
  });

  describe('Core stack filtering', () => {
    it('renders allowed techItems in Frameworks & Languages and excludes tooling titles there', () => {
      setup();

      // Anchor to the Frameworks & Languages block
      const fwHeading = screen.getByText(/Frameworks & Languages/i);
      const fwBlock = fwHeading.closest('div');
      expect(fwBlock).toBeTruthy();

      // Fnd the UL (the mapped techItems list)
      const fwList = fwBlock!.querySelector('ul');
      expect(fwList).toBeTruthy();

      // Included
      expect(fwList!).toHaveTextContent('Next.js');
      expect(fwList!).toHaveTextContent('React');
      expect(fwList!).toHaveTextContent('TypeScript');

      // Excluded by filter (ONLY in this list)
      expect(fwList!).not.toHaveTextContent('Vitest');
      expect(fwList!).not.toHaveTextContent('Testing Library');
      expect(fwList!).not.toHaveTextContent('Jest');
      expect(fwList!).not.toHaveTextContent('GitHub Actions');
      expect(fwList!).not.toHaveTextContent('Husky');
      expect(fwList!).not.toHaveTextContent('ESLint');
      expect(fwList!).not.toHaveTextContent('Prettier');
      expect(fwList!).not.toHaveTextContent('npm');

      // And separately: Quality & Pipelines should still show them
      expect(screen.getByText(/Vitest \/ Jest/i)).toBeInTheDocument();
      expect(screen.getByText(/React Testing Library/i)).toBeInTheDocument();
      expect(screen.getByText('GitHub Actions')).toBeInTheDocument();
      expect(screen.getByText(/Husky \/ lint-staged/i)).toBeInTheDocument();
    });
  });

  describe('Key narrative + practice copy', () => {
    it('renders Beyond the Code narrative', () => {
      setup();
      expect(
        screen.getByRole('heading', { name: /Beyond the Code\./i }),
      ).toBeInTheDocument();
      expect(screen.getByText(/I learned by building\./i)).toBeInTheDocument();
      expect(
        screen.getByText(/delivers measurable value\./i),
      ).toBeInTheDocument();
    });

    it('renders Engineering Practices section with core bullets', () => {
      setup();
      expect(
        screen.getByRole('heading', { name: /Engineering Practices/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/I treat correctness as a feature\./i),
      ).toBeInTheDocument();

      expect(
        screen.getByText(/Automated unit & integration testing/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Request deduplication & caching/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/CI pipelines with build validation/i),
      ).toBeInTheDocument();
      expect(screen.getByText(/Pre-commit quality gates/i)).toBeInTheDocument();
    });

    it('renders the closing statement (end-to-end focus)', () => {
      setup();
      expect(
        screen.getByText(/I build full-stack applications end-to-end/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/from database design to deployment/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/performance, reliability, and well-tested systems/i),
      ).toBeInTheDocument();
    });
  });

  describe('Open Source links & security', () => {
    it('renders both GitHub links with strict external link attributes', () => {
      setup();

      const httpHook = screen.getByRole('link', {
        name: /use-http-request-hook/i,
      });
      expect(httpHook).toHaveAttribute(
        'href',
        'https://github.com/umarSiddique010/use-http-request-hook',
      );
      expect(httpHook).toHaveAttribute('target', '_blank');
      expect(httpHook).toHaveAttribute('rel', 'noopener noreferrer');

      const localStorageHook = screen.getByRole('link', {
        name: /use-localstorage-hook/i,
      });
      expect(localStorageHook).toHaveAttribute(
        'href',
        'https://github.com/umarSiddique010/use-localstorage-hook',
      );
      expect(localStorageHook).toHaveAttribute('target', '_blank');
      expect(localStorageHook).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Motion stagger logic (sanity check)', () => {
    it('applies increasing delays across the main boxes and closer section', () => {
      setup();

      // Expect at least several motion blocks in the DOM
      const motionDivs = screen.getAllByTestId('motion-div');
      expect(motionDivs.length).toBeGreaterThanOrEqual(5);

      // Delays should exist as strings/numbers
      const delays = motionDivs.map((n) =>
        Number(n.getAttribute('data-delay') || 0),
      );

      // Boxes are 0.1..0.5, so max delay should be >= 0.5
      expect(Math.max(...delays)).toBeGreaterThanOrEqual(0.5);

      // Closer section has 0.6 delay
      const closer = screen.getAllByTestId('motion-section').pop();
      expect(closer).toHaveAttribute('data-delay', '0.6');
    });
  });
});
