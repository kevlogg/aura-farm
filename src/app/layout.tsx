import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aura Farm - Gamified Meme Platform',
  description: 'Farmea Aura subiendo clips cortos, compite en duelos 1v1 y evita caer en Laura Bankrupt.',
  manifest: '/manifest.json',
  themeColor: '#09090b',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="bg-black text-zinc-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
