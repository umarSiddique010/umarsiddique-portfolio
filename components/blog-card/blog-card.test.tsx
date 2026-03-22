import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BlogCard from './blog-card';
import { BlogData } from '@/constants/blogs-data';
import type { ReactNode } from 'react';

type MotionDivProps = {
  children: ReactNode;
  className?: string;
  transition?: { delay: number };
};

// Motion mock: keep transition data for delay assertions, avoid leaking props to DOM.
vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, className, transition, ...props }: MotionDivProps) => (
      <div
        className={className}
        data-testid="motion-div"
        data-transition={JSON.stringify(transition)}
        {...props}
      >
        {children}
      </div>
    ),
  },
}));

const mockBlog: BlogData = {
  id: 1,
  category: 'HTML',
  title: 'HTML Mastery',
  description: 'Short description.',
  purpose: 'Short purpose.',
  topics: ['Semantics', 'SEO'],
  bannerImage: '/test.webp',
  devToUrl: 'https://dev.to/test',
};

describe('BlogCard Component', () => {
  const setup = (overrides?: Partial<React.ComponentProps<typeof BlogCard>>) =>
    render(
      <BlogCard
        blog={mockBlog}
        {...overrides}
        loading="lazy"
        priority={false}
      />,
    );

  const getTransition = () => {
    const motionDiv = screen.getByTestId('motion-div');
    return JSON.parse(motionDiv.getAttribute('data-transition') ?? '{}');
  };

  describe('Content', () => {
    it('renders title, description, and purpose', () => {
      setup();

      expect(screen.getByText(mockBlog.title)).toBeInTheDocument();
      expect(screen.getByText(mockBlog.description)).toBeInTheDocument();
      expect(
        screen.getByText(new RegExp(mockBlog.purpose, 'i')),
      ).toBeInTheDocument();
    });

    it('renders banner image with accessible alt text', () => {
      setup();

      expect(
        screen.getByAltText(`${mockBlog.title} Banner`),
      ).toBeInTheDocument();
    });
  });

  describe('Series', () => {
    it('renders series name and part when provided', () => {
      setup({ blog: { ...mockBlog, series: { name: 'Series', part: 1 } } });

      expect(screen.getByText('Series • Part 1')).toBeInTheDocument();
    });

    it('does not render series when not provided', () => {
      setup();

      expect(screen.queryByText(/Series/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Part/i)).not.toBeInTheDocument();
    });
  });

  describe('Topics', () => {
    it('renders all topics as badges', () => {
      setup();

      mockBlog.topics.forEach((topic: string | number) => {
        expect(screen.getByText(topic)).toBeInTheDocument();
      });
    });

    it('renders gracefully when topics is empty', () => {
      const emptyTopicsBlog = { ...mockBlog, topics: [] as string[] };
      render(
        <BlogCard blog={emptyTopicsBlog} loading="lazy" priority={false} />,
      );

      expect(screen.getByText(emptyTopicsBlog.title)).toBeInTheDocument();

      mockBlog.topics.forEach((topic: string | number) => {
        expect(screen.queryByText(topic)).not.toBeInTheDocument();
      });
    });
  });

  describe('External links', () => {
    it('links to Dev.to with strict security attributes', () => {
      setup();

      const titleLink = screen.getByRole('link', { name: mockBlog.title });
      const iconLink = screen.getByLabelText(/Read HTML Mastery on Dev\.to/i);

      [titleLink, iconLink].forEach((link) => {
        expect(link).toHaveAttribute('href', mockBlog.devToUrl);
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });
  });

  describe('Animation', () => {
    it('defaults delay to 0 when index is not provided', () => {
      setup();

      expect(getTransition().delay).toBe(0);
    });

    it('calculates staggered delay from index', () => {
      setup({ index: 4 });

      expect(getTransition().delay).toBeCloseTo(0.4);
    });
  });
});
