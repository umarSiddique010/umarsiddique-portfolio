import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import CTAsection from './cta-section';
import { CTAData } from '@/constants/cta-data';
import type { ReactNode, HTMLAttributes, ButtonHTMLAttributes } from 'react';

type MotionSectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

type MotionDivProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  animate?: Record<string, unknown>;
  transition?: { delay?: number };
  viewport?: { once?: boolean };
};

type MotionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

// Mock: motion/react (strip animations, keep DOM + animate values observable)
vi.mock('motion/react', () => ({
  motion: {
    section: ({ children, className, ...props }: MotionSectionProps) => (
      <section className={className} {...props}>
        {children}
      </section>
    ),
    //capturing `animate` on a data attribute to assert magnetic physics
    div: ({
      children,
      className,
      onMouseMove,
      onMouseLeave,
      animate,
      ...props
    }: MotionDivProps) => (
      <div
        className={className}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        data-testid="magnetic-wrapper"
        data-animate={JSON.stringify(animate)}
        {...props}
      >
        {children}
      </div>
    ),
    button: ({ children, className, ...props }: MotionButtonProps) => (
      <button className={className} {...props}>
        {children}
      </button>
    ),
  },
}));

// Mock: layout math for predictable magnetic behavior
beforeAll(() => {
  Element.prototype.getBoundingClientRect = vi.fn(() => ({
    width: 100,
    height: 50,
    top: 10,
    left: 10,
    bottom: 60,
    right: 110,
    x: 10,
    y: 10,
    toJSON: () => {},
  }));
});

const mockFullProps: CTAData = {
  variant: 'full',
  badgeText: 'Available for work',
  title1: "Let's build",
  title2: 'something great.',
  description: 'Reach out to me for collaborations.',
  buttonText: 'Get in Touch',
  buttonLink: '/contact',
};

describe('CTAsection Component', () => {
  describe('Full Variant (Default)', () => {
    it('renders all complete content including badge, title2, and description', () => {
      render(<CTAsection {...mockFullProps} />);

      expect(screen.getByText('Available for work')).toBeInTheDocument();
      expect(screen.getByText(/Let's build/i)).toBeInTheDocument();
      expect(screen.getByText(/something great./i)).toBeInTheDocument();
      expect(screen.getByText(mockFullProps.description!)).toBeInTheDocument();

      const button = screen.getByRole('button', { name: /Get in Touch/i });
      expect(button).toBeInTheDocument();
      expect(button.closest('a')).toHaveAttribute('href', '/contact');
    });

    it('applies full variant specific layout classes', () => {
      const { container } = render(<CTAsection {...mockFullProps} />);
      const section = container.firstChild;

      expect(section).toHaveClass('py-24');
      expect(section).toHaveClass('md:py-28');
    });
  });

  describe('Minimal Variant', () => {
    it('hides the badge even if badgeText is provided and changes padding', () => {
      render(<CTAsection {...mockFullProps} variant="minimal" />);

      expect(screen.queryByText('Available for work')).not.toBeInTheDocument();

      expect(screen.getByText(/Let's build/i)).toBeInTheDocument();

      const section = screen.getByText(/Let's build/i).closest('section');
      expect(section).toHaveClass('py-20');
      expect(section).toHaveClass('md:py-24');
    });
  });

  describe('Conditional Props & Edge Cases', () => {
    it('renders gracefully when optional props (title2, description) are missing', () => {
      const minimalProps: CTAData = {
        variant: 'minimal',
        title1: 'Just a simple title',
        buttonText: 'Click Me',
        buttonLink: '/about',
      };

      render(<CTAsection {...minimalProps} />);

      expect(screen.getByText('Just a simple title')).toBeInTheDocument();
      expect(screen.queryByText(/Reach out/i)).not.toBeInTheDocument();
    });
  });

  describe('Magnetic Button Physics', () => {
    it('calculates correct mouse trajectory physics and resets on leave', () => {
      render(<CTAsection {...mockFullProps} />);

      const magneticWrappers = screen.getAllByTestId('magnetic-wrapper');
      const buttonWrapper = magneticWrappers[magneticWrappers.length - 1];

      expect(buttonWrapper).toHaveAttribute(
        'data-animate',
        JSON.stringify({ x: 0, y: 0 }),
      );

      // FIRE MOUSE MOVE
      // Button Center X: left(10) + width(100)/2 = 60
      // Button Center Y: top(10) + height(50)/2 = 35
      // If Mouse is at clientX: 80, clientY: 50
      // Delta X: 80 - 60 = +20. Final X = 20 * 0.15 = 3
      // Delta Y: 50 - 35 = +15. Final Y = 15 * 0.15 = 2.25
      fireEvent.mouseMove(buttonWrapper, { clientX: 80, clientY: 50 });

      expect(buttonWrapper).toHaveAttribute(
        'data-animate',
        JSON.stringify({ x: 3, y: 2.25 }),
      );

      fireEvent.mouseLeave(buttonWrapper);
      expect(buttonWrapper).toHaveAttribute(
        'data-animate',
        JSON.stringify({ x: 0, y: 0 }),
      );
    });
  });
});
