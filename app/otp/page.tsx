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

export default function OtpPage() {
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

  // Check for verification error in URL
  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam === 'Verification') {
      setError(
        'The sign-in link has expired or was already used. Please request a new link below.',
      );
    }
  }, [searchParams]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await sendEmail(email.trim());

      if (result.error) {
        setError(result.error);
      } else {
        setIsSuccess(true);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
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
          <OtpLoading />
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
            <div className="mx-auto rounded-sm overflow-hidden">
              <Image
                src="/assets/svg/logo.svg"
                alt="Investor Room"
                width={56}
                height={56}
                priority={false}
                className="block"
              />
            </div>
            <h1 className="font-barlow-condensed text-2xl font-bold uppercase tracking-wide text-primary md:text-3xl text-center">
              Investor Room
            </h1>
            <p className="mt-1 text-sm text-muted-foreground md:text-base text-center">
              Introduce tu correo para recibir un enlace seguro de acceso
            </p>
          </div>

          <OtpForm
            email={email}
            error={error}
            isLoading={isLoading}
            onEmailChange={setEmail}
            onSubmit={handleSubmit}
          />

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              Este es un inicio de sesión seguro sin contraseña. Recibirás un
              enlace que expira en 10 minutos.
            </p>
          </div>
        </div>
      </Card>
    </main>
  );
}
