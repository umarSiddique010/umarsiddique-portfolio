import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import type { ReactNode } from 'react';
import ContactCard from './contact-card';

// Mock: next/link
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock: socialLinks data
vi.mock('@/constants/socials-links', () => ({
  socialLinks: [
    {
      title: 'GitHub',
      href: 'https://github.com/test',
      icon: <svg data-testid="github-icon" />,
      color: 'text-black',
    },
    {
      title: 'LinkedIn',
      href: 'https://linkedin.com/test',
      icon: <svg data-testid="linkedin-icon" />,
      color: 'text-blue-600',
    },
  ],
}));

describe('ContactCard Component', () => {
  const setup = () => render(<ContactCard />);

  describe('Core Contact Information', () => {
    it('renders availability badge', () => {
      setup();

      expect(
        screen.getByText(/Currently Available for New Opportunities/i),
      ).toBeInTheDocument();
    });

    it('renders email with correct mailto link', () => {
      setup();

      const emailLink = screen.getByRole('link', {
        name: /us70763@gmail\.com/i,
      });

      expect(emailLink).toHaveAttribute('href', 'mailto:us70763@gmail.com');
    });

    it('renders location and timezone correctly', () => {
      setup();

      expect(
        screen.getByText(/Giridih, Jharkhand, India • Remote/i),
      ).toBeInTheDocument();

      expect(screen.getByText(/IST \(UTC \+5:30\)/i)).toBeInTheDocument();
    });
  });

  describe('Digital Presence Section', () => {
    it('renders social links dynamically with correct attributes', () => {
      setup();

      const github = screen.getByLabelText('GitHub');
      const linkedin = screen.getByLabelText('LinkedIn');

      expect(github).toHaveAttribute('href', 'https://github.com/test');
      expect(github).toHaveAttribute('target', '_blank');
      expect(github).toHaveAttribute('rel', 'noopener noreferrer');

      expect(linkedin).toHaveAttribute('href', 'https://linkedin.com/test');
    });

    it('renders provided social icons', () => {
      setup();
      expect(screen.getByTestId('github-icon')).toBeInTheDocument();
      expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument();
    });
  });
});
