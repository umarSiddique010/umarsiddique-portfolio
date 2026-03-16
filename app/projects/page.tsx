import ProjectsClient from '@/app/projects/_components/projects-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'A collection of production-grade projects by Md Umar Siddique — from privacy-first React apps to open-source npm packages.',
  openGraph: {
    title: 'Projects',
  },
  twitter: {
    title: 'Projects',
  },
};

export default function Projects() {
  return <ProjectsClient />;
}
