import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import CTAsection from './cta-section';

beforeAll(() => {
  class MockIntersectionObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  }
  window.IntersectionObserver =
    MockIntersectionObserver as unknown as typeof IntersectionObserver;

  // Mock getBoundingClientRect so the Magnetic Button math doesn't crash
  Element.prototype.getBoundingClientRect = vi.fn(() => ({
    width: 200,
    height: 100,
    top: 50,
    left: 50,
    bottom: 150,
    right: 250,
    x: 50,
    y: 50,
    toJSON: () => {},
  }));
});

afterAll(() => {
  vi.restoreAllMocks();
});

describe('CTA Section Component', () => {
  describe('Typography & Content Rendering', () => {
    it('renders the live availability badge', () => {
      render(<CTAsection />);
      expect(
        screen.getByText(/Available for new roles & projects/i),
      ).toBeInTheDocument();
    });

    it('renders the main headlines and subtext', () => {
      render(<CTAsection />);

      expect(screen.getByText(/Have a project in mind\?/i)).toBeInTheDocument();
      expect(screen.getByText(/Let's build it right\./i)).toBeInTheDocument();

      expect(
        screen.getByText(/I ship scalable, high-performance web applications/i),
      ).toBeInTheDocument();
      expect(screen.getByText(/well-tested code/i)).toBeInTheDocument();
      expect(screen.getByText(/perform in production/i)).toBeInTheDocument();
    });
  });

  describe('Action Buttons & Links', () => {
    it('renders the "Say Hello" button with the correct mailto link', () => {
      render(<CTAsection />);

      const mailLink = screen.getByRole('link', { name: /say hello/i });

      expect(mailLink).toHaveAttribute('href', 'mailto:us70763@gmail.com');

      expect(within(mailLink).getByText('Say Hello')).toBeInTheDocument();
    });
  });

  describe('Interactive Features (Magnetic Button)', () => {
    it('handles mouse movements without throwing errors (Magnetic Effect)', () => {
      render(<CTAsection />);

      const mailLink = screen.getByRole('link', { name: /say hello/i });

      const magneticWrapper = mailLink.parentElement!;

      expect(magneticWrapper).toHaveClass('p-12');
      fireEvent.mouseMove(magneticWrapper, {
        clientX: 200,
        clientY: 150,
      });

      fireEvent.mouseLeave(magneticWrapper);

      expect(mailLink).toBeInTheDocument();
    });
  });
});
