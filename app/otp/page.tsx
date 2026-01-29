'use client';

import { Suspense } from 'react';
import dynamicImport from 'next/dynamic';

export const dynamic = 'force-dynamic';

const OtpClient = dynamicImport(() => import('./OtpClient'), { ssr: false });

export default function Page() {
  return (
    <Suspense>
      <OtpClient />
    </Suspense>
  );
}
