import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RandomTrip Investor Room',
  description: 'Private investor space for RandomTrip',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}

