import type { Metadata } from 'next';
import { Instrument_Serif, Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Subhadeep Chell — Full Stack Software Engineer & UI/UX Designer',
  description: 'Portfolio of Subhadeep Chell: Software Engineer, Full Stack Developer, AI Specialist, and Researcher crafting high-performance product architectures.',
  keywords: [
    'Subhadeep Chell',
    'Software Engineer',
    'Full Stack Developer',
    'AI Engineer',
    'Next.js 15',
    'Spring Boot',
    'TCS',
    'Portfolio 2026',
    'UI/UX Designer',
    'Java'
  ],
  authors: [{ name: 'Subhadeep Chell' }],
  openGraph: {
    title: 'Subhadeep Chell — Full Stack Software Engineer & UI/UX Designer',
    description: 'Building software that feels effortless. Ultra-luxury portfolio software product.',
    url: 'https://subhadeepchell.vercel.app',
    siteName: 'Subhadeep Chell Portfolio 2026 Edition',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable} ${spaceGrotesk.variable} dark scroll-smooth`}
    >
      <body className="bg-[#050507] text-zinc-100 antialiased selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}
