import { Metadata } from 'next';
import AboutClient from './_components/about-client';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Md Umar Siddique — self-taught Full Stack Developer. Systems Over Syntax: building production-grade web systems grounded in clear architecture and long-term maintainability.',
  openGraph: {
    title: 'About',
  },
  twitter: {
    title: 'About',
  },
};

export default function About() {
  return <AboutClient />;
}
