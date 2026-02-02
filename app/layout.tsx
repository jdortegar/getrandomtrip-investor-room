import type { Metadata } from 'next';
import {
  Barlow,
  Barlow_Condensed,
  Nothing_You_Could_Do,
} from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import { SessionProvider } from '@/components/providers/SessionProvider';
import AppTracking from '@/components/tracking/AppTracking';
import ScrollDepthTracker from '@/components/tracking/ScrollDepthTracker';

const barlow = Barlow({
  subsets: ['latin'],
  variable: '--font-barlow',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});
const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  variable: '--font-barlow-condensed',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});
const nothingYouCouldDo = Nothing_You_Could_Do({
  subsets: ['latin'],
  variable: '--font-nothing-you-could-do',
  weight: ['400'],
  display: 'swap',
});

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
    <html
      className={`${barlow.variable} ${barlowCondensed.variable} ${nothingYouCouldDo.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <body className={`${barlow.className} antialiased py-4`}>
        <SessionProvider>
          <Suspense fallback={null}>
            <AppTracking />
            <ScrollDepthTracker />
          </Suspense>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
