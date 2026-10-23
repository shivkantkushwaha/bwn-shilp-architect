import type { Metadata, Viewport } from 'next';
import { Fraunces, Hanken_Grotesk, IBM_Plex_Mono, Noto_Serif_Devanagari } from 'next/font/google';
import { siteConfig } from '@/data/site';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MobileBottomBar } from '@/components/MobileBottomBar';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  weight: ['300', '400'],
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken-grotesk',
  display: 'swap',
  weight: ['400', '500', '600'],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
  weight: ['400', '500'],
});

const notoSerifDevanagari = Noto_Serif_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-noto-serif-devanagari',
  display: 'swap',
  weight: ['400'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#14120F',
};

export const metadata: Metadata = {
  title: {
    default: 'Bhawanshilp Architect — Architecture & Design Consultancy in Kanpur',
    template: '%s | Bhawanshilp Architect',
  },
  description: siteConfig.description,
  robots: siteConfig.noindex ? { index: false, follow: false } : { index: true, follow: true },
  openGraph: {
    title: 'Bhawanshilp Architect — Architecture & Design Consultancy in Kanpur',
    description: siteConfig.description,
    type: 'website',
    locale: 'en_IN',
    siteName: 'Bhawanshilp Architect',
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${hankenGrotesk.variable} ${ibmPlexMono.variable} ${notoSerifDevanagari.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink font-body">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileBottomBar />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
