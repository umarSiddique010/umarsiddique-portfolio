import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Navbar from './navbar';
import { usePathname } from 'next/navigation';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

let mockNavLinks = [
  { title: 'Home', href: '/' },
  { title: 'Projects', href: '/projects' },
];
vi.mock('@/constants/navigation-links', () => ({
  get navLinks() {
    return mockNavLinks;
  },
}));

vi.mock('motion/react', async () => {
  const actual = (await vi.importActual('motion/react')) as any;
  return {
    ...actual,
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

describe('Navbar Component - DOM & Unit Tests', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/');
    mockNavLinks = [
      { title: 'Home', href: '/' },
      { title: 'Projects', href: '/projects' },
    ];
  });

  describe('Core & Accessibility Checks', () => {
    it('renders the Logo and ModeToggle properly', () => {
      render(<Navbar />);
      expect(screen.getByRole('link', { name: /logo/i })).toBeInTheDocument();
      expect(screen.getByText('Toggle theme')).toBeInTheDocument();
    });

    it('renders desktop links accurately using accessible roles', () => {
      render(<Navbar />);
      const links = screen.getAllByRole('link');

      expect(links.some((link) => link.textContent === 'Home')).toBeTruthy();
      expect(
        links.some((link) => link.textContent === 'Projects'),
      ).toBeTruthy();
    });

    it('does not crash when navLinks array is empty (Edge Case)', () => {
      mockNavLinks = []; 
      render(<Navbar />);
      expect(screen.getByRole('link', { name: /logo/i })).toBeInTheDocument();
      expect(
        screen.queryByRole('link', { name: /home/i }),
      ).not.toBeInTheDocument();
    });
  });

  describe('Routing & Active States', () => {
    it('highlights the active link based on current route', () => {
      vi.mocked(usePathname).mockReturnValue('/projects');
      render(<Navbar />);

      const projectsLink = screen.getAllByRole('link', {
        name: /projects/i,
      })[0];
      expect(projectsLink.className).toMatch(/text-accent-foreground/);
    });

    it('shows no active link styling on an unknown route', () => {
      vi.mocked(usePathname).mockReturnValue('/random-route');
      render(<Navbar />);

      const homeLink = screen.getAllByRole('link', { name: /home/i })[0];
      const projectsLink = screen.getAllByRole('link', {
        name: /projects/i,
      })[0];

      expect(homeLink.className).toMatch(/text-foreground\/60/);
      expect(projectsLink.className).toMatch(/text-foreground\/60/);
    });
  });

  describe('Desktop Hover Interactions', () => {
    it('applies hover styling when mouse enters a link', () => {
      render(<Navbar />);

      const projectsLink = screen.getAllByRole('link', {
        name: /projects/i,
      })[0];

      expect(projectsLink.className).toMatch(/text-foreground\/60/);

      fireEvent.mouseEnter(projectsLink);

      expect(projectsLink.className).toMatch(/text-accent-foreground/);

      fireEvent.mouseLeave(projectsLink.parentElement!);
      expect(projectsLink.className).toMatch(/text-foreground\/60/);
    });
  });

  describe('Mobile Navigation (DOM Interactions)', () => {
    it('opens mobile menu and renders active indicator', async () => {
      vi.mocked(usePathname).mockReturnValue('/projects');
      render(<Navbar />);

      fireEvent.click(screen.getByLabelText(/open menu/i));

      const mobileProjectsLink = screen.getAllByRole('link', {
        name: /projects/i,
      })[1];
      expect(mobileProjectsLink.className).toMatch(/text-primary/);

      const menuContainer = mobileProjectsLink.parentElement;
      expect(menuContainer?.innerHTML).toContain('bg-primary');
    });

    it('closes mobile menu when a link is clicked', async () => {
      render(<Navbar />);
      fireEvent.click(screen.getByLabelText(/open menu/i));

      const mobileProjectsLink = screen.getAllByRole('link', {
        name: /projects/i,
      })[1];
      fireEvent.click(mobileProjectsLink);

      await waitFor(() => {
        expect(screen.queryByLabelText(/close menu/i)).not.toBeInTheDocument();
      });
    });
  });
});
