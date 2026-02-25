import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import AboutSection from './about-section';

beforeAll(() => {
  class MockIntersectionObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  }
  window.IntersectionObserver =
    MockIntersectionObserver as unknown as typeof IntersectionObserver;
});

// Mocking techItems
vi.mock('@/constants/tech-stack-items', () => ({
  techItems: [
    { title: 'Next.js', href: 'https://nextjs.org' },
    { title: 'TypeScript', href: 'https://typescriptlang.org' },
    { title: 'Vitest', href: 'https://vitest.dev' },
    { title: 'npm', href: 'https://npmjs.com' },
  ],
}));

describe('AboutSection Component', () => {
  describe('Narrative & Section Headers', () => {
    it('renders the main section header and sticky narrative', () => {
      render(<AboutSection />);

      expect(
        screen.getByRole('heading', { name: /Snapshot\./i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { name: /Beyond the Code\./i }),
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          /I didn’t enter software engineering through a traditional path/i,
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/I care deeply about performance, reliability/i),
      ).toBeInTheDocument();
    });
  });

  describe('Tech Stack Data Filtering (The Brains)', () => {
    it('filters out tooling items from the Core Stack list', () => {
      render(<AboutSection />);

      screen.getByRole('heading', {
        name: /Core Stack/i,
      });
      expect(screen.getByText('Next.js')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();

      expect(screen.queryByText('npm')).not.toBeInTheDocument();
    });

    it('renders the hardcoded Tooling list correctly', () => {
      render(<AboutSection />);

      expect(screen.getByText('Vitest / Jest')).toBeInTheDocument();
      expect(screen.getByText('GitHub Actions')).toBeInTheDocument();
      expect(screen.getByText('Husky / lint-staged')).toBeInTheDocument();
    });
  });

  describe('Engineering & Open Source Proof Cards', () => {
    it('renders Engineering Practices with its principles', () => {
      render(<AboutSection />);

      expect(
        screen.getByRole('heading', { name: /Engineering Practices/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByText('I treat correctness as a feature.'),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Automated unit and integration testing/i),
      ).toBeInTheDocument();
    });

    it('renders Open Source projects with correct secure links', () => {
      render(<AboutSection />);

      const httpRequestLink = screen.getByRole('link', {
        name: /use-http-request-hook/i,
      });
      const localStorageLink = screen.getByRole('link', {
        name: /use-localstorage-hook/i,
      });

      expect(httpRequestLink).toHaveAttribute(
        'href',
        'https://github.com/umarSiddique010/use-http-request-hook',
      );
      expect(httpRequestLink).toHaveAttribute('target', '_blank');
      expect(httpRequestLink).toHaveAttribute('rel', 'noopener noreferrer');

      expect(localStorageLink).toHaveAttribute(
        'href',
        'https://github.com/umarSiddique010/use-localstorage-hook',
      );
      expect(localStorageLink).toHaveAttribute('target', '_blank');
      expect(localStorageLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Product Thinking & The Closer', () => {
    it('renders the Product Thinking section', () => {
      render(<AboutSection />);

      expect(
        screen.getByRole('heading', { name: /Product Thinking/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Technical decisions are made with user impact/i),
      ).toBeInTheDocument();
    });

    it('renders the closing banner text', () => {
      render(<AboutSection />);

      expect(
        screen.getByText(/I build full-stack applications end-to-end/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/from database design to deployment/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /performance, reliability, and well-tested systems\./i,
        ),
      ).toBeInTheDocument();
    });
  });
});
