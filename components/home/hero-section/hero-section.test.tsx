import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HeroSection from './hero-section';

// Mock 'motion/react' to bypass animation delays and render directly
vi.mock('motion/react', () => {
  return {
    motion: {
      // Replaces motion.div, motion.span, motion.p with standard HTML tags for testing
      div: ({
        children,
        className,
        'data-testid': testId,
      }: {
        children: React.ReactNode;
        className?: string;
        'data-testid'?: string;
      }) => (
        <div className={className} data-testid={testId}>
          {children}
        </div>
      ),

      span: ({
        children,
        className,
      }: {
        children: React.ReactNode;
        className?: string;
      }) => <span className={className}>{children}</span>,
      p: ({
        children,
        className,
      }: {
        children: React.ReactNode;
        className?: string;
      }) => <p className={className}>{children}</p>,
    },
  };
});

// Mock the CodeIntro
vi.mock('./hero-code', () => ({
  CodeIntro: () => <div data-testid="mock-code-intro">Mocked Code Intro</div>,
}));

describe('HeroSection Component', () => {
  describe('Core Content & Typography', () => {
    it('renders the availability badge', () => {
      render(<HeroSection />);
      expect(
        screen.getByText(/Available for new opportunities/i),
      ).toBeInTheDocument();
    });

    it('renders the split-animated H1 heading correctly', () => {
      render(<HeroSection />);

      const heading = screen.getByRole('heading', { level: 1 });

      expect(heading).toHaveTextContent(/BuildingFast,Modern/i);
      expect(heading).toHaveTextContent(/WebApplications\./i);
    });

    it('renders the main descriptive paragraph', () => {
      render(<HeroSection />);
      expect(
        screen.getByText(
          /Full-stack developer building fast, accessible web applications/i,
        ),
      ).toBeInTheDocument();
    });
  });

  describe('Call to Action (CTA) Links', () => {
    it('renders all CTA buttons with correct hrefs', () => {
      render(<HeroSection />);

      const viewWorkLink = screen.getByRole('link', { name: /view my work/i });
      const contactLink = screen.getByRole('link', { name: /let's talk/i });
      const downloadLink = screen.getByRole('link', { name: /download cv/i });

      expect(viewWorkLink).toHaveAttribute('href', '#projects');
      expect(contactLink).toHaveAttribute('href', '/contact');
      expect(downloadLink).toHaveAttribute('href', '/resume.pdf');
    });

    it('ensures the Download CV link has the download attribute', () => {
      render(<HeroSection />);
      const downloadLink = screen.getByRole('link', { name: /download cv/i });

      expect(downloadLink).toHaveAttribute('download');
    });
  });

  describe('Right Panel (Identity & Child Components)', () => {
    it('renders personal identity and location information', () => {
      render(<HeroSection />);

      const nameHeading = screen.getByRole('heading', { level: 2 });
      expect(nameHeading).toHaveTextContent('Md Umar Siddique');

      expect(screen.getByText('Full-Stack Developer')).toBeInTheDocument();
      expect(screen.getByText(/India • Remote Friendly/i)).toBeInTheDocument();
    });

    it('renders the CodeIntro child component', () => {
      render(<HeroSection />);

      expect(screen.getByTestId('mock-code-intro')).toBeInTheDocument();
    });
  });
});
