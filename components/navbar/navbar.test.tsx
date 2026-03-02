import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Navbar from './navbar';
import { usePathname } from 'next/navigation';

// Mock: next/navigation route state
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

let mockNavLinks = [
  { title: 'Home', href: '/' },
  { title: 'Projects', href: '/projects' },
];

// Mock: nav links source (getter so we can mutate per test)
vi.mock('@/constants/navigation-links', () => ({
  get navLinks() {
    return mockNavLinks;
  },
}));

// Mock: AnimatePresence (render children immediately, no exit/enter timing)
vi.mock('motion/react', async () => {
  const actual = await vi.importActual('motion/react');
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
  };
});

describe('Navbar', () => {
  const setup = () => render(<Navbar />);

  const setRoute = (path: string) =>
    vi.mocked(usePathname).mockReturnValue(path);

  const openMobileMenu = () => {
    fireEvent.click(screen.getByLabelText(/open menu/i));
  };

  const getDesktopLink = (name: RegExp) =>
    // Desktop links exist before opening the mobile menu
    screen.getByRole('link', { name });

  const getMobileLink = (name: RegExp) => {
    // After opening menu there will be duplicate links; pick the one inside the mobile menu
    // This is still resilient vs order changes because we anchor on "close menu" presence.
    const links = screen.getAllByRole('link', { name });
    expect(links.length).toBeGreaterThan(1);
    return links[links.length - 1];
  };

  beforeEach(() => {
    setRoute('/');
    mockNavLinks = [
      { title: 'Home', href: '/' },
      { title: 'Projects', href: '/projects' },
    ];
  });

  describe('Rendering & accessibility', () => {
    it('renders logo and theme toggle control', () => {
      setup();

      expect(screen.getByRole('link', { name: /logo/i })).toBeInTheDocument();
      expect(screen.getByText(/toggle theme/i)).toBeInTheDocument();
    });

    it('renders desktop navigation links from config', () => {
      setup();

      expect(getDesktopLink(/home/i)).toBeInTheDocument();
      expect(getDesktopLink(/projects/i)).toBeInTheDocument();
    });

    it('renders safely when navLinks is empty', () => {
      mockNavLinks = [];
      setup();

      expect(screen.getByRole('link', { name: /logo/i })).toBeInTheDocument();
      expect(
        screen.queryByRole('link', { name: /home/i }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole('link', { name: /projects/i }),
      ).not.toBeInTheDocument();
    });
  });

  describe('Routing & active states', () => {
    it('highlights active link based on current route', () => {
      setRoute('/projects');
      setup();

      const projectsLink = getDesktopLink(/projects/i);
      expect(projectsLink.className).toMatch(/text-accent-foreground/);
    });

    it('does not apply active styling on unknown route', () => {
      setRoute('/random-route');
      setup();

      expect(getDesktopLink(/home/i).className).toMatch(/text-foreground\/60/);
      expect(getDesktopLink(/projects/i).className).toMatch(
        /text-foreground\/60/,
      );
    });
  });

  describe('Desktop interactions', () => {
    it('applies hover styling on mouse enter and resets on leave', () => {
      setup();

      const projectsLink = getDesktopLink(/projects/i);
      expect(projectsLink.className).toMatch(/text-foreground\/60/);

      fireEvent.mouseEnter(projectsLink);
      expect(projectsLink.className).toMatch(/text-accent-foreground/);

      fireEvent.mouseLeave(projectsLink.parentElement!);
      expect(projectsLink.className).toMatch(/text-foreground\/60/);
    });
  });

  describe('Mobile navigation', () => {
    it('opens menu and highlights active mobile link', () => {
      setRoute('/projects');
      setup();

      openMobileMenu();

      const mobileProjectsLink = getMobileLink(/projects/i);
      expect(mobileProjectsLink.className).toMatch(/text-primary/);

      const itemContainer = mobileProjectsLink.parentElement;
      expect(itemContainer?.innerHTML).toContain('bg-primary');
    });

    it('closes menu when a mobile link is clicked', async () => {
      setup();

      openMobileMenu();

      const mobileProjectsLink = getMobileLink(/projects/i);
      fireEvent.click(mobileProjectsLink);

      await waitFor(() => {
        expect(screen.queryByLabelText(/close menu/i)).not.toBeInTheDocument();
      });
    });
  });
});
