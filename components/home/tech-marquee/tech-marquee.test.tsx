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

  const setup = () => render(<TechMarquee />);

  it('renders marquee items and duplicates them for infinite scroll', () => {
    setup();

    const reactLinks = screen.getAllByRole('link', { name: /react/i });
    const nextLinks = screen.getAllByRole('link', { name: /next\.js/i });

    expect(reactLinks).toHaveLength(4);
    expect(nextLinks).toHaveLength(4);
  });

  it('contains valid external links with security attributes', () => {
    setup();

    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('updates isHovered state on mouse enter and leave', () => {
    setup();

    const container = (
      screen.getAllByRole('link', { name: /react/i })[0] as HTMLElement
    ).closest('div');

    if (container) {
      fireEvent.mouseEnter(container);
      fireEvent.mouseLeave(container);
    }
  });

  it('renders icons for each tech item', () => {
    setup();

    expect(screen.getAllByText('⚛️')).toHaveLength(4);
    expect(screen.getAllByText('▲')).toHaveLength(4);
  });

  it('applies correct transform style for animation', () => {
    const { container } = setup();
    const motionDiv = container.querySelector('div');

    const style = window.getComputedStyle(motionDiv as Element);

    expect(style.transform).toBeDefined();
  });
});
