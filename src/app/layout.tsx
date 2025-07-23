
import type {Metadata, Viewport} from 'next';
import './globals.css';
import { ClientLayoutWrapper } from '@/components/layout/client-layout-wrapper';
import { cn } from '@/lib/utils';


export const metadata: Metadata = {
  title: 'LaserTrack Lite - Platform Manajemen Industri Estetika',
  description: 'Optimalkan operasional, lacak perangkat, dan kelola tim Anda dengan LaserTrack Lite. Solusi terpadu untuk distributor, klinik, dan teknisi. Coba sekarang!',
  manifest: '/manifest.json',
  icons: {
    apple: '/icons/icon-192x192.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#1e40af',
  width: 'device-width',
  initialScale: 1,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased min-h-screen bg-background')}>
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
      </body>
    </html>
  );
}
