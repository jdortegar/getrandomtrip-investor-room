import nextDynamic from 'next/dynamic';
import { Suspense } from 'react';

import { getDictionary, hasLocale } from '@/lib/i18n/dictionaries';
import type { OtpDictionary } from '@/lib/types/dictionary';

export const dynamic = 'force-dynamic';

const OtpClient = nextDynamic(() => import('@/app/otp/OtpClient'), { ssr: false });

export default async function OtpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) return null;

  const dict = await getDictionary(locale);
  const otpDict = dict.otp as OtpDictionary;

  return (
    <Suspense>
      <OtpClient dict={otpDict} />
    </Suspense>
  );
}
