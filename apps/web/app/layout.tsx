import type { Metadata } from 'next';
import { Poppins, Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { PublicLayoutWrapper } from '@/components/layout/PublicLayoutWrapper';
import { PageTransition } from '@/components/layout/PageTransition';
import { CursorGlow } from '@/components/ui/CursorGlow';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://adruvaSolution.com'),
  title: {
    default: 'Adruva Solution | Your Business & Productivity Partner',
    template: '%s | Adruva Solution',
  },
  description: "IT company India — web apps, mobile apps, AI solutions, SEO, Google ads. The last tech partner you'll ever need.",
  keywords: [
    'web development company India',
    'AI automation company India',
    'digital marketing agency India',
    'IT company Dehradun',
    'affordable software development India',
  ],
  authors: [{ name: 'Adruva Solution' }],
  creator: 'Adruva Solution',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://adruvaSolution.com',
    siteName: 'Adruva Solution',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@adruvaSolution',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} ${spaceGrotesk.variable} antialiased`}>
        <Providers>
          <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300">
            <CursorGlow />
            <PublicLayoutWrapper>
              <PageTransition>{children}</PageTransition>
            </PublicLayoutWrapper>
          </div>
        </Providers>
      </body>
    </html>
  );
}
