export type CTAVariant = 'full' | 'minimal';

export interface CTAData {
  variant: CTAVariant;
  badgeText?: string;
  title1: string;
  title2?: string;
  description?: string;
  buttonText: string;
  buttonLink: string;
}

//    HOME PAGE CTA

export const homeCTA: CTAData = {
  variant: 'full',
  badgeText: 'Open to new collaborations',
  title1: 'Have a product in mind?',
  title2: "Let's build it right.",
  description:
    'I design and ship scalable, production-ready web systems backed by structured architecture, testing discipline, and reliable CI workflows.',
  buttonText: 'Start a Conversation',
  buttonLink: '/contact',
};

//    PROJECTS PAGE CTA

export const projectsCTA: CTAData = {
  variant: 'full',
  badgeText: 'Open to building similar systems',
  title1: 'Interested in',
  title2: 'systems like these?',
  description:
    'If you need robust architecture, performance-first thinking, and production-grade reliability, let’s discuss your next build.',
  buttonText: "Let's Talk",
  buttonLink: '/contact',
};

//    ABOUT PAGE CTA

export const aboutCTA: CTAData = {
  variant: 'minimal',
  title1: "Let's work together.",
  description:
    'Looking for a disciplined engineer who thinks in systems, architecture, and long-term product stability?',
  buttonText: 'Get in Touch',
  buttonLink: '/contact',
};

//    BLOG PAGE CTA

export const blogCTA: CTAData = {
  variant: 'minimal',
  title1: 'Want to ship',
  title2: 'systems like this?',
  description:
    'If this way of building resonates with you, let’s connect and create something meaningful.',
  buttonText: 'Reach Out',
  buttonLink: '/contact',
};
