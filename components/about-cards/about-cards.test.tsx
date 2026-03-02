import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AboutCards from './about-cards';
import type { ReactNode } from 'react';

type MotionDivProps = {
  children: ReactNode;
  className?: string;
};

// Motion mock: keep className, avoid leaking motion props to DOM
vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, className }: MotionDivProps) => (
      <div className={className} data-testid="motion-div">
        {children}
      </div>
    ),
  },
}));

describe('AboutCards Component', () => {
  const setup = () => render(<AboutCards />);

  const getSectionWrapper = (heading: RegExp) => {
    const wrapper = screen
      .getByRole('heading', { name: heading })
      .closest('[data-testid="motion-div"]');

    expect(wrapper).not.toBeNull();
    return wrapper!;
  };

  describe('Layout', () => {
    it('keeps responsive column spans anchored to section headings', () => {
      setup();

      expect(getSectionWrapper(/The Non-CS Journey/i)).toHaveClass(
        'md:col-span-3',
      );
      expect(getSectionWrapper(/How I Think About Engineering/i)).toHaveClass(
        'md:col-span-2',
      );
      expect(getSectionWrapper(/The Vision/i)).toHaveClass('md:col-span-1');
      expect(getSectionWrapper(/How I Work/i)).toHaveClass('md:col-span-3');
    });
  });

  describe('Content', () => {
    it('renders the Vision identity copy', () => {
      setup();

      expect(
        screen.getByText(/Product Ownership Mindset/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/end-to-end full-stack architecture/i),
      ).toBeInTheDocument();
      expect(screen.getByText(/scalable SaaS systems/i)).toBeInTheDocument();
    });

    it('renders key Non-CS Journey story hooks', () => {
      setup();

      expect(
        screen.getByText(/tearing apart old computers/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/brain was wired for building systems/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/architecting for the web felt natural/i),
      ).toBeInTheDocument();
    });

    it('renders the core engineering philosophy bullet copy', () => {
      setup();

      expect(
        screen.getByText(/Decoupled logic over spaghetti code/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/ensure my hooks and APIs remain bulletproof/i),
      ).toBeInTheDocument();
    });
  });

  describe('Workflow', () => {
    it('renders numbered stages with stable matching (DOM-split safe)', () => {
      setup();

      const stages = [
        { num: '01.', title: 'Discovery', desc: /core business problem/i },
        { num: '02.', title: 'Architecture', desc: /enforced linting/i },
        { num: '03.', title: 'Execution', desc: /modular,\s*accessible/i },
        { num: '04.', title: 'Shipping', desc: /Lighthouse metrics/i },
      ];

      stages.forEach(({ num, title, desc }) => {
        expect(
          screen.getByText(new RegExp(`${num}\\s*${title}`, 'i')),
        ).toBeInTheDocument();
        expect(screen.getByText(desc)).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('uses h2 for the four core section headings', () => {
      setup();

      const h2 = (name: RegExp) =>
        screen.getByRole('heading', { name, level: 2 });

      expect(h2(/The Non-CS Journey/i)).toBeInTheDocument();
      expect(h2(/How I Think About Engineering/i)).toBeInTheDocument();
      expect(h2(/The Vision/i)).toBeInTheDocument();
      expect(h2(/How I Work/i)).toBeInTheDocument();
    });
  });
});
