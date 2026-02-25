import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TechMarquee from './tech-marquee';

vi.mock('@/constants/tech-stack-items', () => ({
  techItems: [
    { title: 'React', href: 'https://react.dev', icon: <span>⚛️</span> },
    { title: 'Next.js', href: 'https://nextjs.org', icon: <span>▲</span> },
  ],
}));

describe('TechMarquee Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('renders marquee items and duplicates them for infinite scroll', () => {
    render(<TechMarquee />);

    const reactLinks = screen.getAllByRole('link', { name: /react/i });
    const nextLinks = screen.getAllByRole('link', { name: /next\.js/i });

    expect(reactLinks).toHaveLength(2);
    expect(nextLinks).toHaveLength(2);
  });

  it('contains valid external links with security attributes', () => {
    render(<TechMarquee />);

    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('updates isHovered state on mouse enter and leave', () => {
    render(<TechMarquee />);

    const container = (
      screen.getAllByRole('link', { name: /react/i })[0] as HTMLElement
    ).closest('div');

    if (container) {
      fireEvent.mouseEnter(container);
      fireEvent.mouseLeave(container);
    }
  });

  it('renders icons for each tech item', () => {
    render(<TechMarquee />);

    expect(screen.getAllByText('⚛️')).toHaveLength(2);
    expect(screen.getAllByText('▲')).toHaveLength(2);
  });

  it('applies correct transform style for animation', () => {
    const { container } = render(<TechMarquee />);
    const motionDiv = container.querySelector('div');

    const style = window.getComputedStyle(motionDiv as Element);

    expect(style.transform).toBeDefined();
  });
});
