import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Blogs from './page';
import { ReactNode } from 'react';
import { BlogData } from '@/constants/blogs-data';

// --- Data mocks  ---
vi.mock('@/constants/blogs-data', () => ({
  blogsData: [
    { id: 1, title: 'HTML Mastery', category: 'HTML' },
    { id: 2, title: 'CSS Magic', category: 'CSS' },
    { id: 3, title: 'JS Logic', category: 'JavaScript' },
  ],
}));

// Mock CTA
vi.mock('@/constants/cta-data', () => ({
  blogCTA: { title1: 'Test CTA', buttonText: 'Go', variant: 'minimal' },
}));

// --- Component mocks ---
vi.mock('@/components/blog-card/blog-card', () => ({
  default: ({ blog, index }: { blog: BlogData; index: number }) => (
    <div
      data-testid="blog-card"
      data-index={index}
      data-category={blog.category}
    >
      {blog.title}
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

//  Mock Shadcn UI Select as Native HTML Select
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

// --- Motion mock  ---
type MotionDivProps = {
  children: ReactNode;
  className?: string;
  layout?: boolean;
};

vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, className }: MotionDivProps) => (
      <div className={className}>{children}</div>
    ),
    section: ({ children, className }: MotionDivProps) => (
      <section className={className}>{children}</section>
    ),
  },
}));

// Helper function to extract text
function getRenderedTitles() {
  return screen.getAllByTestId('blog-card').map((el) => el.textContent);
}

describe('Blogs Page', () => {
  const setup = () => render(<Blogs />);

  describe('Initial Render', () => {
    it('renders header, description, Select dropdowns, and defaults to Newest & All', () => {
      setup();

      expect(screen.getByText('Engineering Essays.')).toBeInTheDocument();
      expect(
        screen.getByText(/Long-form analysis of web architecture/i),
      ).toBeInTheDocument();

      // Ensure selects are rendered
      const selects = screen.getAllByTestId('mock-shadcn-select');
      expect(selects).toHaveLength(2);

      // Default sorting is 'newest' (b.id - a.id -> 3, 2, 1)
      expect(getRenderedTitles()).toEqual([
        'JS Logic',
        'CSS Magic',
        'HTML Mastery',
      ]);

      expect(screen.getByTestId('mock-cta-section')).toHaveTextContent(
        'Test CTA',
      );
    });
  });

  describe('Filtering', () => {
    describe('Category Filtering', () => {
      it('filters HTML blogs correctly via Select', async () => {
        const user = userEvent.setup();
        setup();

        const categorySelect = screen.getAllByTestId('mock-shadcn-select')[0];
        await user.selectOptions(categorySelect, 'HTML');

        const titles = getRenderedTitles();
        expect(titles).toHaveLength(1);
        expect(titles).toEqual(['HTML Mastery']);
      });

      it('filters CSS blogs correctly', async () => {
        const user = userEvent.setup();
        setup();

        const categorySelect = screen.getAllByTestId('mock-shadcn-select')[0];
        await user.selectOptions(categorySelect, 'CSS');

        const titles = getRenderedTitles();
        expect(titles).toHaveLength(1);
        expect(titles).toEqual(['CSS Magic']);
      });

      it('filters JavaScript blogs and keeps category correct', async () => {
        const user = userEvent.setup();
        setup();

        const categorySelect = screen.getAllByTestId('mock-shadcn-select')[0];
        await user.selectOptions(categorySelect, 'JavaScript');

        const cards = screen.getAllByTestId('blog-card');
        expect(cards).toHaveLength(1);
        expect(cards[0]).toHaveAttribute('data-category', 'JavaScript');
        expect(cards[0]).toHaveTextContent('JS Logic');
      });
    });

    describe('Sort Filtering', () => {
      it('sorts blogs by newest first when "Newest" is selected', async () => {
        const user = userEvent.setup();
        setup();

        const sortSelect = screen.getAllByTestId('mock-shadcn-select')[1];
        await user.selectOptions(sortSelect, 'newest');

        expect(getRenderedTitles()).toEqual([
          'JS Logic',
          'CSS Magic',
          'HTML Mastery',
        ]);
      });

      it('sorts blogs by oldest first when "Oldest" is selected', async () => {
        const user = userEvent.setup();
        setup();

        const sortSelect = screen.getAllByTestId('mock-shadcn-select')[1];
        await user.selectOptions(sortSelect, 'oldest');

        expect(getRenderedTitles()).toEqual([
          'HTML Mastery',
          'CSS Magic',
          'JS Logic',
        ]);
      });
    });
  });

  describe('Empty State', () => {
    it('does NOT show empty state when "All" has items', () => {
      setup();

      expect(
        screen.queryByText(/No engineering logs found for this category yet/i),
      ).not.toBeInTheDocument();
    });
  });
});
