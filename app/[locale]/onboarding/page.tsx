import { notFound } from 'next/navigation';

import OnboardingClient from './OnboardingClient';
import { hasLocale } from '@/lib/i18n/dictionaries';

export default async function OnboardingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  return <OnboardingClient locale={locale} />;
}
