import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import ProjectSection from './project-section';

beforeAll(() => {
  class MockIntersectionObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  }
  window.IntersectionObserver =
    MockIntersectionObserver as unknown as typeof IntersectionObserver;

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

describe('ProjectSection Component', () => {
  describe('Core Rendering & Content Checks', () => {
    it('renders the section headings accurately', () => {
      render(<ProjectSection />);
      expect(screen.getByText('Featured Projects')).toBeInTheDocument();
      expect(
        screen.getByText(
          /A selection of recent projects showcasing practical problem-solving/i,
        ),
      ).toBeInTheDocument();
    });

    it('renders all projects with their titles and descriptions', () => {
      render(<ProjectSection />);

      // Project 1
      expect(screen.getByText('Resume Craft')).toBeInTheDocument();
      expect(
        screen.getByText(/A production-ready resume builder/i),
      ).toBeInTheDocument();

      // Project 2
      expect(screen.getByText('use-http-request-hook')).toBeInTheDocument();
      expect(
        screen.getByText(/A lightweight, production-ready React hook/i),
      ).toBeInTheDocument();
    });

    it('renders tech stack badges correctly', () => {
      render(<ProjectSection />);

      // Check a few specific badges from the tech arrays
      expect(screen.getByText('React 19')).toBeInTheDocument();
      expect(screen.getByText('Context + Reducer')).toBeInTheDocument();
      expect(screen.getByText('AbortController')).toBeInTheDocument();
      expect(screen.getByText('npm Package')).toBeInTheDocument();
    });
  });

  describe('Links & Security', () => {
    it('contains valid external and GitHub links with security attributes', () => {
      render(<ProjectSection />);

      // Resume Craft links
      const resumeLiveLink = screen.getAllByRole('link', {
        name: /external link/i,
      })[0];
      const resumeGithubLink = screen.getAllByRole('link', {
        name: /github/i,
      })[0];

      expect(resumeLiveLink).toHaveAttribute(
        'href',
        'https://resume-craft-react.vercel.app/',
      );
      expect(resumeLiveLink).toHaveAttribute('target', '_blank');
      expect(resumeLiveLink).toHaveAttribute('rel', 'noopener noreferrer');

      expect(resumeGithubLink).toHaveAttribute(
        'href',
        'https://github.com/umarSiddique010/resume-craft-react',
      );
      expect(resumeGithubLink).toHaveAttribute('target', '_blank');
    });
  });

  describe('Interactive Features (DOM & State)', () => {
    it('toggles between Desktop and Mobile views for the first project', () => {
      render(<ProjectSection />);

      const desktopBtn = screen.getByRole('button', { name: /desktop view/i });
      const mobileBtn = screen.getByRole('button', { name: /mobile view/i });

      const desktopImg = screen.getByAltText('Resume Craft Desktop View');
      const mobileImg = screen.getByAltText('Resume Craft Mobile View');

      const desktopContainer = desktopImg.parentElement;
      const mobileContainer = mobileImg.parentElement?.parentElement;

      expect(desktopContainer).toHaveClass('opacity-100');
      expect(mobileContainer).toHaveClass('opacity-0');

      fireEvent.click(mobileBtn);

      expect(desktopContainer).toHaveClass('opacity-0');
      expect(mobileContainer).toHaveClass('opacity-100');

      fireEvent.click(desktopBtn);

      expect(desktopContainer).toHaveClass('opacity-100');
      expect(mobileContainer).toHaveClass('opacity-0');
    });

    it('does NOT render toggle buttons for projects without a mobile image (index > 0)', () => {
      render(<ProjectSection />);

      const desktopBtns = screen.getAllByRole('button', {
        name: /desktop view/i,
      });
      const mobileBtns = screen.getAllByRole('button', {
        name: /mobile view/i,
      });

      expect(desktopBtns).toHaveLength(1);
      expect(mobileBtns).toHaveLength(1);
    });
  });
});
