import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Projects from './page';
import type { ProjectData } from '@/constants/projects-data';

// Mock project data
vi.mock('@/constants/projects-data', () => ({
  projectData: [
    { id: 1, title: 'Project One', category: 'App' },
    { id: 2, title: 'Open Source Two', category: 'Open source' },
    { id: 3, title: 'Open Source Three', category: 'Open source' },
  ],
}));

// Mock CTA data

vi.mock('@/constants/cta-data', () => ({
  projectsCTA: {
    title1: 'Mocked CTA Title',
    buttonText: 'Mocked Button',
    variant: 'minimal',
  },
}));

// Mock project card component

vi.mock('@/components/project-card/project-card', () => ({
  default: ({ project, index }: { project: ProjectData; index: number }) => (
    <div data-testid="mock-project-card" data-index={index}>
      {project.title} (id:{project.id})
    </div>
  ),
}));

// Mock CTA section component

vi.mock('@/components/cta-section/cta-section', () => ({
  default: () => <div data-testid="mock-cta-section" />,
}));

// Helper function to get rendered titles
function getRenderedTitles() {
  return screen.getAllByTestId('mock-project-card').map((el) => el.textContent);
}

describe('Projects Page', () => {
  const setup = () => render(<Projects />);

  it('renders newest by default (id desc)', () => {
    setup();

    expect(getRenderedTitles()).toEqual([
      'Open Source Three (id:3)',
      'Open Source Two (id:2)',
      'Project One (id:1)',
    ]);
  });

  it('filters by category when clicking category button', async () => {
    const user = userEvent.setup();
    setup();

    // Click "Open source"
    await user.click(screen.getByRole('button', { name: /open source/i }));

    expect(getRenderedTitles()).toEqual([
      'Open Source Three (id:3)',
      'Open Source Two (id:2)',
    ]);
  });

  it('sorts oldest/newest correctly (and works with active filter)', async () => {
    const user = userEvent.setup();
    setup();

    // Filter
    await user.click(screen.getByRole('button', { name: /open source/i }));
    expect(getRenderedTitles()).toEqual([
      'Open Source Three (id:3)',
      'Open Source Two (id:2)',
    ]);

    // Change sort to oldest
    await user.selectOptions(screen.getByLabelText(/sort by/i), 'oldest');

    expect(getRenderedTitles()).toEqual([
      'Open Source Two (id:2)',
      'Open Source Three (id:3)',
    ]);

    // Back to newest
    await user.selectOptions(screen.getByLabelText(/sort by/i), 'newest');

    expect(getRenderedTitles()).toEqual([
      'Open Source Three (id:3)',
      'Open Source Two (id:2)',
    ]);
  });
});
