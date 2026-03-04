import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import type { ReactNode } from 'react';
import AboutSection from './about-section';

// Mock: next/link
vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock: motion/react

vi.mock('motion/react', () => ({
  motion: {
    header: ({ children, ...props }: { children: ReactNode }) => (
      <header {...props}>{children}</header>
    ),
    div: ({ children, ...props }: { children: ReactNode }) => (
      <div {...props}>{children}</div>
    ),
  },
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

describe('AboutSection', () => {
  it('renders snapshot header, both cards, key bullets, and /about CTA link', () => {
    render(<AboutSection />);

    // Header
    expect(screen.getByText(/Snapshot\./i)).toBeInTheDocument();
    expect(
      screen.getByText(/A quick view of how I think, how I build/i),
    ).toBeInTheDocument();

    // Card titles
    expect(
      screen.getByRole('heading', { name: /Beyond the Code\./i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /How I Build/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Production-first, not demo-first\./i),
    ).toBeInTheDocument();

    // Bullet points checks
    expect(
      screen.getByText(/Performance \+ accessibility as defaults/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/CI checks \+ pre-commit quality gates/i),
    ).toBeInTheDocument();

    // CTA link
    const cta = screen.getByRole('link', { name: /Engineering Approach/i });
    expect(cta).toHaveAttribute('href', '/about');
  });
});
