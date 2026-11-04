import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  metadataBase: new URL('https://tandiyun.in'),
  title: 'TANDIYUN (टांडियूं) – पहाड़ों में बसा एक छोटा सा संसार',
  description:
    'Official website and digital heritage archive for Tandiyun, a serene hill village in the Garhwal Himalayas of Uttarakhand, India. Featuring authentic landscape photography, 3D terrain exploration, regional temples, and living memories.',
  keywords: [
    'Tandiyun',
    'टांडियूं',
    'Bidaliya Niwaas',
    'Uttarakhand',
    'Garhwal',
    'Pauri Garhwal',
    'Himalayan Village',
    'Garhwali Culture',
    'Uttarakhand Tourism',
    'Sidh Baba',
  ],
  authors: [{ name: 'Tandiyun Village Community' }],
  openGraph: {
    title: 'TANDIYUN (टांडियूं) – पहाड़ों में बसा एक छोटा सा संसार',
    description: 'Our Roots. Our Mountains. Our Memories. Official digital sanctuary for Tandiyun village, Uttarakhand.',
    url: 'https://tandiyun.in',
    siteName: 'Tandiyun (टांडियूं)',
    images: [
      {
        url: '/assets/photos/gallery/IMG_20200814_063519.webp',
        width: 1200,
        height: 630,
        alt: 'Tandiyun Village in Garhwal Himalayas',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#102A23',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-forest-dark text-ivory antialiased selection:bg-earth selection:text-ivory min-h-screen flex flex-col">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
