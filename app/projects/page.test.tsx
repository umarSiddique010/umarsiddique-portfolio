import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Projects from './page';
import type { ProjectData } from '@/constants/projects-data';
import { ReactNode } from 'react';

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

// Mock Shadcn UI Select as a Native HTML Select
vi.mock('@/components/ui/select', () => ({
  Select: ({
    value,
    onValueChange,
    children,
  }: {
    value: string;
    onValueChange: (value: string) => void;
    children: ReactNode;
  }) => (
    <select
      data-testid="mock-shadcn-select"
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
    >
      {children}
    </select>
  ),
  SelectTrigger: ({ children }: { children: ReactNode }) => <>{children}</>,
  SelectContent: ({ children }: { children: ReactNode }) => <>{children}</>,
  SelectGroup: ({ children }: { children: ReactNode }) => <>{children}</>,
  SelectLabel: () => null,
  SelectItem: ({ value, children }: { value: string; children: ReactNode }) => (
    <option value={value}>{children}</option>
  ),
  SelectValue: ({ placeholder }: { placeholder: string }) => (
    <option value="" disabled>
      {placeholder}
    </option>
  ),
}));

// Helper function
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

  it('filters by category correctly', async () => {
    const user = userEvent.setup();
    setup();

    const categorySelect = screen.getAllByTestId('mock-shadcn-select')[0];

    await user.selectOptions(categorySelect, 'Open source');

    expect(getRenderedTitles()).toEqual([
      'Open Source Three (id:3)',
      'Open Source Two (id:2)',
    ]);
  });

  it('sorts oldest/newest correctly (and works with active filter)', async () => {
    const user = userEvent.setup();
    setup();

    const selects = screen.getAllByTestId('mock-shadcn-select');
    const categorySelect = selects[0];
    const sortSelect = selects[1];

    await user.selectOptions(categorySelect, 'Open source');
    expect(getRenderedTitles()).toEqual([
      'Open Source Three (id:3)',
      'Open Source Two (id:2)',
    ]);

    await user.selectOptions(sortSelect, 'oldest');
    expect(getRenderedTitles()).toEqual([
      'Open Source Two (id:2)',
      'Open Source Three (id:3)',
    ]);

    await user.selectOptions(sortSelect, 'newest');
    expect(getRenderedTitles()).toEqual([
      'Open Source Three (id:3)',
      'Open Source Two (id:2)',
    ]);
  });
  describe('Empty State', () => {
    it('does NOT show empty state when "All" has items', () => {
      setup();

      expect(
        screen.queryByText(/No System found for this category yet/i),
      ).not.toBeInTheDocument();
    });
  });
});
