import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { SetLocaleLang } from '@/components/providers/SetLocaleLang';
import { SessionProvider } from '@/components/providers/SessionProvider';
import AppTracking from '@/components/tracking/AppTracking';
import ScrollDepthTracker from '@/components/tracking/ScrollDepthTracker';
import { hasLocale } from '@/lib/i18n/dictionaries';

export function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  return (
    <>
      <SetLocaleLang locale={locale} />
      <SessionProvider>
        <Suspense fallback={null}>
          <AppTracking />
          <ScrollDepthTracker />
        </Suspense>
        {children}
      </SessionProvider>
    </>
  );
}
