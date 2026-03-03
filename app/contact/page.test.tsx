import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import type { ReactNode, HTMLAttributes } from 'react';
import ContactPage from './page';

// Mock: child components
vi.mock('@/components/contact-cards/contact-card', () => ({
  default: () => <div data-testid="contact-card">ContactCard</div>,
}));

vi.mock('@/components/contact-cards/contact-form', () => ({
  default: () => <div data-testid="contact-form">ContactForm</div>,
}));

// Mock: motion/react

type MotionElProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  className?: string;
  transition?: { duration?: number; delay?: number };
};

vi.mock('motion/react', () => ({
  motion: {
    header: ({ children, className, transition, ...props }: MotionElProps) => (
      <header
        className={className}
        data-testid="motion-header"
        data-delay={transition?.delay ?? 0}
        {...props}
      >
        {children}
      </header>
    ),
    div: ({ children, className, transition, ...props }: MotionElProps) => (
      <div
        className={className}
        data-testid="motion-div"
        data-delay={transition?.delay ?? 0}
        {...props}
      >
        {children}
      </div>
    ),
  },
}));

describe('Contact Page', () => {
  const setup = () => render(<ContactPage />);

  const getPanelByTestId = (id: string) =>
    screen.getByTestId(id).closest('[data-testid="motion-div"]');

  describe('header', () => {
    it('renders heading and intro copy', () => {
      setup();

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Initiate Contact.',
      );

      expect(
        screen.getByText(/Whether you have a specific project in mind/i),
      ).toBeInTheDocument();
    });
  });

  describe('Composition & layout', () => {
    it('renders ContactCard and ContactForm panels', () => {
      setup();

      expect(screen.getByTestId('contact-card')).toBeInTheDocument();
      expect(screen.getByTestId('contact-form')).toBeInTheDocument();
    });

    it('applies correct responsive column spans for left/right panels', () => {
      setup();

      const leftPanel = getPanelByTestId('contact-card');
      const rightPanel = getPanelByTestId('contact-form');

      expect(leftPanel).not.toBeNull();
      expect(rightPanel).not.toBeNull();

      expect(leftPanel!).toHaveClass('lg:col-span-5');
      expect(rightPanel!).toHaveClass('lg:col-span-7');
    });
  });

  describe('Motion timing', () => {
    it('uses correct stagger delays for panels', () => {
      setup();

      const leftPanel = getPanelByTestId('contact-card');
      const rightPanel = getPanelByTestId('contact-form');

      expect(leftPanel).toHaveAttribute('data-delay', '0.1');
      expect(rightPanel).toHaveAttribute('data-delay', '0.2');
    });
  });
});
