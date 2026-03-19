import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import { ThemeProvider } from 'next-themes';
import MainBackground from '@/components/main-background';
import { Toaster } from '@/components/ui/sonner';
import { Analytics } from '@vercel/analytics/next';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
});

const jetBrains_mono = JetBrains_Mono({
  variable: '--font-jetBrains_mono',
  subsets: ['latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#10b981',
  colorScheme: 'dark light',
};

export const metadata: Metadata = {
  title: {
    template: '%s | Full Stack Developer',
    default: 'Md Umar Siddique | Full Stack Developer',
  },
  description:
    'Md Umar Siddique — Full Stack Developer. Systems Over Syntax: Next.js, TypeScript, PostgreSQL, Motion.',
  metadataBase: new URL('https://www.umarsiddique.dev'),
  authors: [{ name: 'Md Umar Siddique', url: 'https://www.umarsiddique.dev' }],
  creator: 'Md Umar Siddique',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    url: 'https://www.umarsiddique.dev',
    title: {
      template: '%s | Full Stack Developer',
      default: 'Md Umar Siddique | Full Stack Developer',
    },
    description:
      'Md Umar Siddique — Full Stack Developer. Systems Over Syntax: Next.js, TypeScript, PostgreSQL, Motion.',
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      template: '%s | Full Stack Developer',
      default: 'Md Umar Siddique | Full Stack Developer',
    },
    description:
      'Md Umar Siddique — Full Stack Developer. Systems Over Syntax: Next.js, TypeScript, PostgreSQL, Motion.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${jetBrains_mono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MainBackground />
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
          <Toaster position="top-center" richColors duration={4000} />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
