import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProjectCard from './project-card';
import type { Project } from '@/constants/projects';
import type { ReactNode } from 'react';

type MotionDivProps = {
  children: ReactNode;
  className?: string;
  transition?: {
    delay?: number;
    duration?: number;
  };
  viewport?: {
    once?: boolean;
    margin?: string;
  };
  animate?: Record<string, number | string>;
};

// Mock: motion/react (keep className + capture motion props for assertions)
vi.mock('motion/react', () => ({
  motion: {
    div: ({
      children,
      className,
      transition,
      viewport,
      animate,
    }: MotionDivProps) => (
      <div
        className={className}
        data-testid="motion-div"
        data-transition={transition ? JSON.stringify(transition) : undefined}
        data-viewport={viewport ? JSON.stringify(viewport) : undefined}
        data-animate={animate ? JSON.stringify(animate) : undefined}
      >
        {children}
      </div>
    ),
  },
  AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

const mockFullProject: Project = {
  id: 5,
  title: 'Resume Craft',
  description: 'A secure, client-side React application.',
  intent: 'Engineered as a privacy-first alternative.',
  keyLearning: 'Context + useReducer state design.',
  techStack: ['React', 'Vite', 'Vitest'],
  githubUrl: 'https://github.com/umar/resume-craft',
  liveUrl: 'https://resume-craft.app',
  desktopImage: '/desktop-view.webp',
  mobileImage: '/mobile-view.webp',
};

const mockProjectNoMobile: Project = {
  ...mockFullProject,
  id: 4,
  mobileImage: null,
};

describe('ProjectCard', () => {
  const setup = (
    props: Partial<React.ComponentProps<typeof ProjectCard>> = {},
  ) => render(<ProjectCard project={mockFullProject} index={0} {...props} />);

  const parseAttr = (el: Element, name: string) =>
    JSON.parse(el.getAttribute(name) ?? '{}');

  describe('Animation', () => {
    it('applies stagger delay, duration, and viewport logic to the root card', () => {
      render(<ProjectCard project={mockFullProject} index={2} />);

      const root = screen
        .getByText(mockFullProject.title)
        .closest('[data-testid="motion-div"]');

      expect(root).not.toBeNull();

      const transition = parseAttr(root!, 'data-transition');
      expect(transition.delay).toBeCloseTo(0.2);
      expect(transition.duration).toBe(0.3);

      const viewport = parseAttr(root!, 'data-viewport');
      expect(viewport.once).toBe(true);
      expect(viewport.margin).toBe('-50px');
    });
  });

  describe('Content & links', () => {
    it('renders title and description', () => {
      setup();

      expect(screen.getByText(mockFullProject.title)).toBeInTheDocument();
      expect(screen.getByText(mockFullProject.description)).toBeInTheDocument();
    });

    it('renders GitHub and Live links with strict security attributes', () => {
      setup();

      const githubLink = screen.getByLabelText('GitHub Repository');
      const liveLink = screen.getByLabelText('Live Project');

      [githubLink, liveLink].forEach((link) => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });

      expect(githubLink).toHaveAttribute('href', mockFullProject.githubUrl);
      expect(liveLink).toHaveAttribute('href', mockFullProject.liveUrl);
    });

    it('renders tech stack badges', () => {
      setup();

      mockFullProject.techStack.forEach((tech) => {
        expect(screen.getByText(tech)).toBeInTheDocument();
      });
    });
  });

  describe('Images & device toggle', () => {
    it('hides toggle controls and mobile view when mobileImage is null', () => {
      render(<ProjectCard project={mockProjectNoMobile} index={0} />);

      expect(screen.queryByLabelText('Desktop view')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Mobile view')).not.toBeInTheDocument();

      expect(screen.getByAltText(/Desktop View/i)).toBeInTheDocument();
      expect(screen.queryByAltText(/Mobile View/i)).not.toBeInTheDocument();
    });

    it('toggles desktop/mobile visibility via clsx classes', () => {
      setup();

      const desktopBtn = screen.getByLabelText('Desktop view');
      const mobileBtn = screen.getByLabelText('Mobile view');

      const desktopImgContainer =
        screen.getByAltText(/Desktop View/i).parentElement;
      expect(desktopImgContainer).not.toBeNull();

      const mobileImgContainer = screen
        .getByAltText(/Mobile View/i)
        .closest('.absolute.inset-0.flex');

      expect(mobileImgContainer).not.toBeNull();

      // Initial: Desktop active
      expect(desktopBtn).toHaveClass(
        'bg-foreground',
        'text-background',
        'shadow-sm',
      );
      expect(mobileBtn).toHaveClass('text-muted-foreground');

      expect(desktopImgContainer!).toHaveClass('opacity-100', 'scale-100');
      expect(desktopImgContainer!).not.toHaveClass('pointer-events-none');

      expect(mobileImgContainer!).toHaveClass(
        'opacity-0',
        'scale-110',
        'pointer-events-none',
      );

      // Switch to Mobile
      fireEvent.click(mobileBtn);

      expect(mobileBtn).toHaveClass(
        'bg-foreground',
        'text-background',
        'shadow-sm',
      );
      expect(desktopBtn).toHaveClass('text-muted-foreground');

      expect(desktopImgContainer!).toHaveClass(
        'opacity-0',
        'scale-95',
        'pointer-events-none',
      );

      expect(mobileImgContainer!).toHaveClass('opacity-100', 'scale-100');
      expect(mobileImgContainer!).not.toHaveClass('pointer-events-none');

      // Back to Desktop
      fireEvent.click(desktopBtn);
      expect(desktopImgContainer!).toHaveClass('opacity-100', 'scale-100');
    });
  });

  describe('Project Insights accordion', () => {
    it('toggles intent/learning content, chevron rotation, and motion animate props', () => {
      setup();

      const toggleBtn = screen.getByText('Project Insights');
      const chevron = toggleBtn.querySelector('svg');

      expect(screen.queryByText(/Intent:/i)).not.toBeInTheDocument();
      expect(chevron).not.toHaveClass('rotate-180');

      // Open
      fireEvent.click(toggleBtn);

      expect(screen.getByText(/Intent:/i)).toBeInTheDocument();
      expect(screen.getByText(mockFullProject.intent)).toBeInTheDocument();

      expect(screen.getByText(/Learned:/i)).toBeInTheDocument();
      expect(screen.getByText(mockFullProject.keyLearning)).toBeInTheDocument();

      expect(chevron).toHaveClass('rotate-180');

      // Anchor the expanding motion div from the opened content, not DOM index
      const intentLabel = screen.getByText(/Intent:/i);
      const insightsMotionDiv = intentLabel.closest(
        '[data-testid="motion-div"]',
      );

      expect(insightsMotionDiv).not.toBeNull();

      const animate = parseAttr(insightsMotionDiv!, 'data-animate');
      expect(animate.height).toBe('auto');
      expect(animate.opacity).toBe(1);

      // Close
      fireEvent.click(toggleBtn);

      expect(screen.queryByText(/Intent:/i)).not.toBeInTheDocument();
      expect(chevron).not.toHaveClass('rotate-180');
    });
  });
});
