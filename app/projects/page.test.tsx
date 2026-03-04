import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Projects from './page';
import { Project } from '@/constants/projects-data';

vi.mock('@/constants/projects-data', () => ({
  projects: [
    { id: 1, title: 'Mocked Project Alpha' },
    { id: 2, title: 'Mocked Project Beta' },
  ],
}));

vi.mock('@/constants/cta-data', () => ({
  projectsCTA: {
    title1: 'Mocked CTA Title',
    buttonText: 'Mocked Button',
    variant: 'minimal',
  },
}));

vi.mock('@/components/project-card/project-card', () => ({
  default: ({ project, index }: { project: Project; index: number }) => (
    <div data-testid="mock-project-card" data-index={index}>
      {project.title}
    </div>
  ),
}));

vi.mock('@/components/cta-section/cta-section', () => ({
  default: ({
    title1,
    buttonText,
    variant,
  }: {
    title1: string;
    buttonText: string;
    variant: string;
  }) => (
    <div data-testid="mock-cta-section" data-variant={variant}>
      {title1} - {buttonText}
    </div>
  ),
}));

describe('Projects Page Component', () => {
  describe('Typography & Static Content', () => {
    it('renders the main heading correctly', () => {
      render(<Projects />);

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Engineered Systems.');
    });

    it('renders the engineering-focused descriptive paragraph', () => {
      render(<Projects />);

      expect(
        screen.getByText(
          /From privacy-first React applications to zero-dependency/i,
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Production-ready systems built with clear architecture/i,
        ),
      ).toBeInTheDocument();
    });
  });

  describe('ProjectCard Array Mapping', () => {
    it('maps over the projects array and renders the exact number of cards', () => {
      render(<Projects />);

      const projectCards = screen.getAllByTestId('mock-project-card');

      expect(projectCards).toHaveLength(2);
    });

    it('passes the correct project data and index to each ProjectCard', () => {
      render(<Projects />);

      const projectCards = screen.getAllByTestId('mock-project-card');

      expect(projectCards[0]).toHaveTextContent('Mocked Project Alpha');
      expect(projectCards[1]).toHaveTextContent('Mocked Project Beta');

      expect(projectCards[0]).toHaveAttribute('data-index', '0');
      expect(projectCards[1]).toHaveAttribute('data-index', '1');
    });

    it('contains the correct CSS grid classes for responsive layout', () => {
      render(<Projects />);

      const gridContainer =
        screen.getAllByTestId('mock-project-card')[0].parentElement;

      expect(gridContainer).toHaveClass(
        'grid',
        'grid-cols-1',
        'md:grid-cols-2',
        'gap-8',
      );
    });
  });

  describe('CTA Section Integration', () => {
    it('renders CTA with correct data', () => {
      render(<Projects />);

      const cta = screen.getByTestId('mock-cta-section');

      expect(cta).toHaveTextContent('Mocked CTA Title');
      expect(cta).toHaveTextContent('Mocked Button');
      expect(cta).toHaveAttribute('data-variant', 'minimal');
    });
  });
});
