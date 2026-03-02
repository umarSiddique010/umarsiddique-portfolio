import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AboutPage from './page';
import { ReactNode } from 'react';

// Mock: timeline data (drives the Journey section mapping + clsx classes)
vi.mock('@/constants/education-timeline', () => ({
  educationTimelineData: [
    {
      year: '2024 - Present',
      title: 'Full-Time Web Engineering',
      institution: 'Self-Taught & Open Source',
      description: 'Transitioned completely into software development.',
      highlight: 'Published @mdus npm hooks',
      icon: <svg data-testid="icon-1" />,
      bg: 'bg-emerald-100',
      color: 'text-emerald-600',
      border: 'border-emerald-200',
    },
    {
      year: '2020 - 2023',
      title: 'B.A. (Hons) Political Science',
      institution: 'Gossner College, Ranchi',
      description: 'Developed strong analytical skills.',
      highlight: '69% Hons',
      icon: <svg data-testid="icon-2" />,
      bg: 'bg-blue-100',
      color: 'text-blue-600',
      border: 'border-blue-200',
    },
  ],
}));

// Mock: CTA config (ensures {...aboutCTA} spreading works)
vi.mock('@/constants/cta-data', () => ({
  aboutCTA: { title1: "Let's work together.", variant: 'minimal' },
}));

// Mock: AboutCards (we only care that the page composes it)
vi.mock('@/components/about-cards/about-cards', () => ({
  default: () => <div data-testid="about-cards">About Cards Section</div>,
}));

// Mock: CTAsection (capture spread props for verification)
vi.mock('@/components/cta-section/cta-section', () => ({
  default: (props: { title1: string; variant: string }) => (
    <div data-testid="cta" data-props={JSON.stringify(props)}>
      {props.title1}
    </div>
  ),
}));

// Mock: motion/react (capture stagger delay from transition.delay)

type MotionDivProps = {
  children: ReactNode;
  className?: string;
  transition?: { delay?: number };
};

vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, className, transition }: MotionDivProps) => (
      <div
        className={className}
        data-testid="motion-div"
        data-delay={String(transition?.delay ?? '')}
      >
        {children}
      </div>
    ),
    section: ({
      children,
      className,
    }: {
      children: ReactNode;
      className?: string;
    }) => <section className={className}>{children}</section>,
  },
}));

describe('AboutPage', () => {
  const setup = () => render(<AboutPage />);

  const getCTAProps = () => {
    const cta = screen.getByTestId('cta');
    return JSON.parse(cta.getAttribute('data-props') ?? '{}');
  };

  const getMotionWrapperForTitle = (title: RegExp) => {
    const el = screen.getByText(title);
    const wrapper = el.closest('[data-testid="motion-div"]');

    expect(wrapper).not.toBeNull();
    return wrapper!;
  };

  describe('Hero', () => {
    it('renders heading, intro, and name emphasis', () => {
      setup();

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Systems Over Syntax.',
      );

      const name = screen.getByText('Md Umar Siddique');
      expect(name).toBeInTheDocument();
      expect(name).toHaveClass('text-foreground', 'font-semibold');

      expect(
        screen.getByText(/I design and build production-focused web systems/i),
      ).toBeInTheDocument();
    });
  });

  describe('Composition', () => {
    it('renders AboutCards and passes CTA props via spread', () => {
      setup();

      expect(screen.getByTestId('about-cards')).toBeInTheDocument();

      const passed = getCTAProps();
      expect(passed.title1).toBe("Let's work together.");
      expect(passed.variant).toBe('minimal');
    });
  });

  describe('Timeline mapping', () => {
    it('renders Journey heading and timeline copy from data', () => {
      setup();

      expect(
        screen.getByRole('heading', { name: /The Journey/i }),
      ).toBeInTheDocument();

      // Item 1
      expect(screen.getByText('2024 - Present')).toBeInTheDocument();
      expect(screen.getByText('Full-Time Web Engineering')).toBeInTheDocument();
      expect(screen.getByText('Published @mdus npm hooks')).toBeInTheDocument();

      // Item 2
      expect(screen.getByText('2020 - 2023')).toBeInTheDocument();
      expect(
        screen.getByText('B.A. (Hons) Political Science'),
      ).toBeInTheDocument();
      expect(screen.getByText('69% Hons')).toBeInTheDocument();
    });

    it('applies dynamic tailwind classes to highlight badges and dots', () => {
      setup();

      const badge1 = screen.getByText('Published @mdus npm hooks');
      expect(badge1).toHaveClass(
        'bg-emerald-100',
        'text-emerald-600',
        'border-emerald-200',
      );

      const badge2 = screen.getByText('69% Hons');
      expect(badge2).toHaveClass(
        'bg-blue-100',
        'text-blue-600',
        'border-blue-200',
      );

      const dot1 = screen.getByTestId('icon-1').parentElement;
      expect(dot1).not.toBeNull();
      expect(dot1!).toHaveClass(
        'bg-emerald-100',
        'text-emerald-600',
        'rounded-full',
        'absolute',
      );
    });
  });

  describe('Motion stagger', () => {
    it('calculates delay from map index (index * 0.1)', () => {
      setup();

      expect(
        getMotionWrapperForTitle(/Full-Time Web Engineering/i),
      ).toHaveAttribute('data-delay', '0');

      expect(
        getMotionWrapperForTitle(/B\.A\. \(Hons\) Political Science/i),
      ).toHaveAttribute('data-delay', '0.1');
    });
  });
});
