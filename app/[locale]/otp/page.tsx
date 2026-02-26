import nextDynamic from 'next/dynamic';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

const OtpClient = nextDynamic(() => import('@/app/otp/OtpClient'), { ssr: false });

export default function OtpPage() {
  return (
    <Suspense>
      <OtpClient />
    </Suspense>
  );
}
