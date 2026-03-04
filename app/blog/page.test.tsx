import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Blogs from './page';
import { ReactNode } from 'react';
import { Blog } from '@/constants/blogs-data';

// --- Data mocks  ---
vi.mock('@/constants/blogs-data', () => ({
  blogs: [
    { id: 1, title: 'HTML Mastery', category: 'HTML' },
    { id: 2, title: 'CSS Magic', category: 'CSS' },
    { id: 3, title: 'JS Logic', category: 'JavaScript' },
  ],
}));

vi.mock('@/constants/cta-data', () => ({
  blogCTA: { title1: 'Test CTA' },
}));

// --- Component mocks ---
vi.mock('@/components/blog-card/blog-card', () => ({
  default: ({ blog, index }: { blog: Blog; index: number }) => (
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

// --- Motion mock  ---
type MotionDivProps = {
  children: ReactNode;
  className?: string;
};

// --- Motion mock  ---
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
describe('Blogs Page', () => {
  describe('Initial Render', () => {
    it('renders header, description, category buttons, CTA, and default "All" state', () => {
      render(<Blogs />);

      expect(screen.getByText('Engineering Essays.')).toBeInTheDocument();
      expect(
        screen.getByText(/Long-form analysis of web architecture/i),
      ).toBeInTheDocument();

      const categories = ['All', 'HTML', 'CSS', 'JavaScript'];
      categories.forEach((cat) => {
        expect(screen.getByRole('button', { name: cat })).toBeInTheDocument();
      });

      const allBtn = screen.getByRole('button', { name: 'All' });
      expect(allBtn).toHaveClass(
        'bg-foreground',
        'text-background',
        'border-foreground',
      );

      expect(screen.getAllByTestId('blog-card')).toHaveLength(3);

      expect(screen.getByTestId('mock-cta-section')).toHaveTextContent(
        'Test CTA',
      );
    });
  });

  describe('Filtering', () => {
    describe('Category Filtering', () => {
      it('filters HTML blogs and updates inactive button classes', () => {
        render(<Blogs />);

        fireEvent.click(screen.getByRole('button', { name: 'HTML' }));

        const cards = screen.getAllByTestId('blog-card');
        expect(cards).toHaveLength(1);
        expect(cards[0]).toHaveTextContent('HTML Mastery');

        const cssBtn = screen.getByRole('button', { name: 'CSS' });
        expect(cssBtn).toHaveClass('bg-foreground/5', 'text-muted-foreground');
      });

      it('filters CSS blogs and applies active class', () => {
        render(<Blogs />);

        const cssBtn = screen.getByRole('button', { name: 'CSS' });
        fireEvent.click(cssBtn);

        expect(cssBtn).toHaveClass(
          'bg-foreground',
          'text-background',
          'border-foreground',
        );
        expect(screen.getByText('CSS Magic')).toBeInTheDocument();
        expect(screen.getAllByTestId('blog-card')).toHaveLength(1);
      });

      it('filters JavaScript blogs and keeps category correct', () => {
        render(<Blogs />);

        fireEvent.click(screen.getByRole('button', { name: 'JavaScript' }));

        const cards = screen.getAllByTestId('blog-card');
        expect(cards).toHaveLength(1);
        expect(cards[0]).toHaveAttribute('data-category', 'JavaScript');
        expect(cards[0]).toHaveTextContent('JS Logic');
      });
    });

    describe('filter by sort', () => {
      it('sorts blogs by newest first when "Newest" is selected', () => {
        render(<Blogs />);

        fireEvent.change(screen.getByLabelText(/Sort by:/i), {
          target: { value: 'newest' },
        });

        const cards = screen.getAllByTestId('blog-card');
        expect(cards[0]).toHaveTextContent('JS Logic');
      });

      it('sorts blogs by oldest first when "Oldest" is selected', () => {
        render(<Blogs />);

        fireEvent.change(screen.getByLabelText(/Sort by:/i), {
          target: { value: 'oldest' },
        });
        const cards = screen.getAllByTestId('blog-card');
        expect(cards[0]).toHaveTextContent('HTML Mastery');
      });
    });
  });

  describe('Empty State', () => {
    it('does NOT show empty state when "All" has items', () => {
      render(<Blogs />);

      expect(
        screen.queryByText(/No engineering logs found for this category yet/i),
      ).not.toBeInTheDocument();
    });
  });

  describe('Props / Mapping Integrity', () => {
    it('passes index prop to BlogCard for staggered animations', () => {
      render(<Blogs />);

      const cards = screen.getAllByTestId('blog-card');
      expect(cards[0]).toHaveAttribute('data-index', '0');
      expect(cards[1]).toHaveAttribute('data-index', '1');
      expect(cards[2]).toHaveAttribute('data-index', '2');
    });
  });
});
