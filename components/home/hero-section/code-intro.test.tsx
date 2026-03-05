import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import type { ReactNode } from 'react';
import { CodeIntro } from './code-intro';

type MotionProps = {
  children?: ReactNode;
  animate?: unknown;
};

// Mock: motion/react
vi.mock('motion/react', () => ({
  AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
  motion: {
    div: ({ children, animate, ...props }: MotionProps) => (
      <div
        data-testid="motion-div"
        data-animate={JSON.stringify(animate)}
        {...props}
      >
        {children}
      </div>
    ),
    pre: ({ children, animate, ...props }: MotionProps) => (
      <pre
        data-testid="motion-pre"
        data-animate={JSON.stringify(animate)}
        {...props}
      >
        {children}
      </pre>
    ),
  },
}));

describe('CodeIntro Component', () => {
  it('renders window controls and toggles close/minimize/maximize correctly', () => {
    render(<CodeIntro />);

    const closeBtn = screen.getByRole('button', { name: /close/i });
    const minimizeBtn = screen.getByRole('button', { name: /minimize/i });
    const maximizeBtn = screen.getByRole('button', { name: /maximize/i });

    expect(closeBtn).toBeInTheDocument();
    expect(minimizeBtn).toBeInTheDocument();
    expect(maximizeBtn).toBeInTheDocument();

    // Initial: body is visible via motion animate props
    const getBodyMotionDiv = () =>
      screen
        .getAllByTestId('motion-div')
        .find((el) =>
          (el.getAttribute('data-animate') || '').includes('"height"'),
        )!;

    const body = getBodyMotionDiv();
    expect(body).toBeTruthy();

    let bodyAnimate = JSON.parse(body.getAttribute('data-animate') || '{}');
    expect(bodyAnimate.height).toBe('auto');
    expect(bodyAnimate.opacity).toBe(1);

    // Minimize: body animates to hidden (height 0, opacity 0)
    fireEvent.click(minimizeBtn);
    bodyAnimate = JSON.parse(body.getAttribute('data-animate') || '{}');
    expect(bodyAnimate.height).toBe(0);
    expect(bodyAnimate.opacity).toBe(0);

    // Un-minimize: body animates back
    fireEvent.click(minimizeBtn);
    bodyAnimate = JSON.parse(body.getAttribute('data-animate') || '{}');
    expect(bodyAnimate.height).toBe('auto');
    expect(bodyAnimate.opacity).toBe(1);

    // Maximize: animates to visible
    fireEvent.click(maximizeBtn);
    const pre = screen.getByTestId('motion-pre');
    const preAnimate = JSON.parse(pre.getAttribute('data-animate') || '{}');
    expect(preAnimate.height).toBe('auto');
    expect(preAnimate.opacity).toBe(1);

    // Close: Restore button appears (top bar removed)
    fireEvent.click(closeBtn);
    expect(
      screen.getByRole('button', { name: /restore/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /minimize/i }),
    ).not.toBeInTheDocument();

    // Restore: top bar back
    fireEvent.click(screen.getByRole('button', { name: /restore/i }));
    expect(
      screen.getByRole('button', { name: /minimize/i }),
    ).toBeInTheDocument();
  });
});
