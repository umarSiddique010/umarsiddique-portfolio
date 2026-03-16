import { Metadata } from 'next';
import ContactClient from './_components/contacts-client';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Md Umar Siddique — open to full-time roles, freelance projects, and architecture discussions.',
  openGraph: {
    title: 'Contact',
  },
  twitter: {
    title: 'Contact',
  },
};

export default function Contact() {
  return <ContactClient />;
}
