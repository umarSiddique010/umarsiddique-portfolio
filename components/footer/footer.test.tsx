import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Footer from './footer'; 

vi.mock('@/constants/navigation-links', () => ({
  navLinks: [
    { title: 'Home', href: '/' },
    { title: 'Projects', href: '/projects' },
  ],
}));

vi.mock('@/constants/socials-links', () => ({
  socialLinks: [
    {
      title: 'GitHub Mock',
      href: 'https://github.com/mock',
      icon: <span>MockGit</span>,
    },
    {
      title: 'Twitter Mock',
      href: 'https://x.com/mock',
      icon: <span>MockX</span>,
    },
  ],
}));

describe('Footer Component', () => {
  it('renders branding and dynamic copyright year', () => {
    render(<Footer />);

    expect(screen.getByText('Md Umar Siddique')).toBeInTheDocument();

    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  });

  it('renders tech stack badges with correct external links', () => {
    render(<Footer />);

    const nextBadge = screen.getByText('Next.js');
    expect(nextBadge).toBeInTheDocument();
    expect(nextBadge.closest('a')).toHaveAttribute(
      'href',
      'https://nextjs.org/',
    );

    const motionBadge = screen.getByText('Motion');
    expect(motionBadge).toBeInTheDocument();
    expect(motionBadge.closest('a')).toHaveAttribute(
      'href',
      'https://motion.dev/',
    );
  });

  it('renders navigation links from constants', () => {
    render(<Footer />);

    const homeLink = screen.getByText('Home');
    const projectsLink = screen.getByText('Projects');

    expect(homeLink).toHaveAttribute('href', '/');
    expect(projectsLink).toHaveAttribute('href', '/projects');
  });

  it('renders social links with correct aria-labels and href(s)', () => {
    render(<Footer />);

    const githubLink = screen.getByLabelText('GitHub Mock');
    const twitterLink = screen.getByLabelText('Twitter Mock');

    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/mock');

    expect(twitterLink).toBeInTheDocument();
    expect(twitterLink).toHaveAttribute('href', 'https://x.com/mock');
  });
});
