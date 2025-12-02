'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function OtpPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [canResend, setCanResend] = useState(true);
  const [resendCooldown, setResendCooldown] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn('email', {
        email,
        redirect: false,
        callbackUrl: '/room',
      });

      if (result?.error) {
        setError(result.error);
      } else {
        setIsSuccess(true);
        setCanResend(false);
        startResendCooldown();
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const startResendCooldown = () => {
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResend = async () => {
    if (!canResend || !email) return;
    await handleSubmit(new Event('submit') as any);
  };

  if (isSuccess) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Check your email</CardTitle>
            <CardDescription>
              We&apos;ve sent a sign-in link to <strong>{email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted p-4 text-center text-sm">
              <p className="text-muted-foreground">
                Click the link in the email to sign in. The link will expire in 10 minutes.
              </p>
            </div>

            {!canResend && (
              <div className="text-center text-sm text-muted-foreground">
                {resendCooldown > 0 ? (
                  <p>Resend available in {resendCooldown} seconds</p>
                ) : (
                  <Button
                    onClick={handleResend}
                    variant="outline"
                    className="w-full"
                    disabled={!canResend}
                  >
                    Resend email
                  </Button>
                )}
              </div>
            )}

            <Button
              onClick={() => {
                setIsSuccess(false);
                setEmail('');
                setError(null);
              }}
              variant="ghost"
              className="w-full"
            >
              Use a different email
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Investor Room</CardTitle>
          <CardDescription>
            Enter your email to receive a secure sign-in link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="investor@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                autoFocus
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isLoading || !email}>
              {isLoading ? 'Sending...' : 'Send sign-in link'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              This is a secure, passwordless sign-in. You&apos;ll receive a link that expires in 10
              minutes.
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
