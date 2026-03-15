'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { Card } from '@/components/ui/card';
import { OtpForm } from './components/OtpForm';
import { OtpSuccess } from './components/OtpSuccess';
import { OtpLoading } from './components/OtpLoading';
import { useAuthRedirect } from '@/lib/hooks/useAuthRedirect';
import { useEmailResend } from '@/lib/hooks/useEmailResend';
import type { OtpDictionary } from '@/lib/types/dictionary';

interface OtpClientProps {
  dict: OtpDictionary;
}

export default function OtpClient({ dict }: OtpClientProps) {
  const { status, update: refetchSession } = useSession();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { cooldown, canResend, sendEmail } = useEmailResend();

  // After magic-link callback we land on /otp?callbackUrl=... — refetch session once so client has it
  useEffect(() => {
    const callbackUrl = searchParams.get('callbackUrl');
    if (!callbackUrl) return;
    refetchSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle authentication redirects
  useAuthRedirect();

  // Check for error in URL (NextAuth only sends error code, not the message)
  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam === 'Verification') {
      setError(dict.errorVerification);
    } else if (errorParam === 'EmailSignin') {
      setError(dict.errorEmailSignin);
    }
  }, [searchParams, dict.errorVerification, dict.errorEmailSignin]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await sendEmail(email.trim());

      if (result.error) {
        // Map NextAuth error codes to friendly messages (same as URL param handling)
        if (result.error === 'EmailSignin') {
          setError(dict.errorEmailSignin);
        } else if (result.error === 'Verification') {
          setError(dict.errorVerification);
        } else {
          setError(result.error);
        }
      } else {
        setIsSuccess(true);
      }
    } catch (err) {
      setError(dict.errorGeneric);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resend
  const handleResend = async () => {
    if (!canResend || !email) return;
    await handleSubmit(new Event('submit') as any);
  };

  // Reset form
  const handleUseDifferentEmail = () => {
    setIsSuccess(false);
    setEmail('');
    setError(null);
  };

  // Show loading state
  if (status === 'loading') {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24">
        <Card className="w-full max-w-md">
          <OtpLoading loadingText={dict.loading} />
        </Card>
      </main>
    );
  }

  // Show success state
  if (isSuccess) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24">
        <Card className="w-full max-w-md">
          <OtpSuccess
            canResend={canResend}
            cooldown={cooldown}
            dict={dict.success}
            email={email}
            onResend={handleResend}
            onUseDifferentEmail={handleUseDifferentEmail}
          />
        </Card>
      </main>
    );
  }

  // Show form
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24">
      <Card className="w-full max-w-md">
        <div className="p-6">
          <div className="mb-6 flex flex-col items-center gap-3">
            <div className="mx-auto overflow-hidden rounded-sm">
              <Image
                alt={dict.logoAlt}
                className="block"
                height={120}
                priority={false}
                src="/assets/svg/randomtrip.svg"
                width={280}
              />
            </div>
            <h1 className="font-barlow-condensed text-center text-xl font-bold uppercase tracking-wide text-primary md:text-3xl">
              {dict.title}
            </h1>
            <p className="font-barlow mt-1 text-center text-sm text-muted-foreground md:text-base">
              {dict.subtitle}
            </p>
          </div>

          <OtpForm
            dict={dict.form}
            email={email}
            error={error}
            isLoading={isLoading}
            onEmailChange={setEmail}
            onSubmit={handleSubmit}
          />

          <div className="font-barlow mt-6 text-center text-sm text-muted-foreground">
            <p>{dict.footerNote}</p>
          </div>
        </div>
      </Card>
    </main>
  );
}
