import { Metadata } from 'next';
import BlogsClient from './_components/blogs-client';

export const metadata: Metadata = {
  title: 'Blogs',
  description:
    'Long-form engineering essays on web architecture, language design, and scalable production systems by Md Umar Siddique.',
  openGraph: {
    title: 'Blogs',
  },
  twitter: {
    title: 'Blogs',
  },
};

export default function Blogs() {
  return <BlogsClient />;
}
