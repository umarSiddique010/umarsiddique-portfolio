import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProjectSection from './project-section';
import type { ProjectData } from '@/constants/projects-data';
import { ReactNode } from 'react';

// Mock ProjectCard
vi.mock('@/components/project-card/project-card', () => ({
  default: ({ project }: { project: ProjectData }) => (
    <div data-testid="mock-project-card">{project.title}</div>
  ),
}));

// Mock: shadcn Button
vi.mock('@/components/ui/button', () => ({
  Button: ({
    asChild,
    children,
    ...props
  }: {
    asChild: boolean;
    children: ReactNode;
  }) => (asChild ? <>{children}</> : <button {...props}>{children}</button>),
}));

describe('ProjectSection Component', () => {
  const setup = () => render(<ProjectSection />);

  it('renders only the featured projects (Resume Craft & useHttpRequest)', () => {
    setup();

    const renderedProjects = screen.getAllByTestId('mock-project-card');

    expect(renderedProjects).toHaveLength(2);

    expect(screen.getByText('Resume Craft')).toBeInTheDocument();
    expect(screen.getByText('@mdus/use-http-request-hook')).toBeInTheDocument();

    expect(
      screen.queryByText('Modular Book Tracker SPA'),
    ).not.toBeInTheDocument();
  });
  it('has the correct section ID for navigation', () => {
    const { container } = setup();

    const section = container.querySelector('#projects');
    expect(section).toBeInTheDocument();

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      /Featured Projects/i,
    );
  });

  it('renders a CTA button that links to the full projects page', () => {
    setup();

    const ctaButton = screen.getByRole('link', { name: /View All Projects/i });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute('href', '/projects');
  });
});
