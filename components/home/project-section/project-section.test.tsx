import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProjectSection from './project-section';
import type { Project } from '@/constants/projects';

// Mock ProjectCard to avoid rendering the whole complex card logic here
vi.mock('@/components/project-card/project-card', () => ({
  default: ({ project }: { project: Project }) => (
    <div data-testid="mock-project-card">{project.title}</div>
  ),
}));

describe('ProjectSection Component', () => {
  it('renders only the featured projects (Resume Craft & useHttpRequest)', () => {
    render(<ProjectSection />);

    const renderedProjects = screen.getAllByTestId('mock-project-card');

    // 1. Check count
    expect(renderedProjects).toHaveLength(2);

    // 2. Check specific titles
    expect(screen.getByText('Resume Craft')).toBeInTheDocument();
    expect(screen.getByText('useHttpRequest')).toBeInTheDocument();

    // 3. Ensure other projects are NOT there
    expect(
      screen.queryByText('Modular Book Tracker SPA'),
    ).not.toBeInTheDocument();
  });

  // project-section.test.tsx
  it('has the correct section ID for navigation', () => {
    const { container } = render(<ProjectSection />);

    // Section ID check karne ka sabse solid tareeka
    const section = container.querySelector('#projects');
    expect(section).toBeInTheDocument();

    // Heading check
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      /Featured Projects/i,
    );
  });
});
