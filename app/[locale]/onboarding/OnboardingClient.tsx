'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { pathForLocale } from '@/lib/i18n/pathForLocale';
import type { Locale } from '@/lib/i18n/config';

interface OnboardingClientProps {
  locale: Locale;
}

export default function OnboardingClient({ locale }: OnboardingClientProps) {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace(pathForLocale(locale, '/otp'));
    }
  }, [locale, status, router]);

  useEffect(() => {
    if (status === 'authenticated' && session?.investor?.profileComplete) {
      router.replace(pathForLocale(locale, '/room'));
    }
  }, [locale, session, status, router]);

  useEffect(() => {
    if (session?.user?.email) {
      fetch('/api/investor/me')
        .then((res) => res.json())
        .then((data) => {
          if (data.investor) {
            setName(data.investor.name || '');
            setPhone(data.investor.phone || '');
            setCompany(data.investor.company || '');
          }
        })
        .catch(() => {});
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/investor/update', {
        body: JSON.stringify({
          company: company.trim() || undefined,
          name: name.trim() || undefined,
          phone: phone.trim() || undefined,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save details');
      }

      await update();
      window.location.href = pathForLocale(locale, '/room');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24">
        <Card className="w-full max-w-md">
          <CardContent className="flex items-center justify-center p-8">
            <div className="text-muted-foreground">Loading...</div>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="font-barlow-condensed text-2xl font-bold uppercase tracking-wide md:text-3xl">
            Complete Your Profile
          </CardTitle>
          <CardDescription className="text-sm md:text-base">
            Please provide your details to access the Investor Room
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                autoFocus
                id="name"
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
                type="text"
                value={name}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 123-4567"
                type="tel"
                value={phone}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company / Organization</Label>
              <Input
                id="company"
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Acme Ventures"
                type="text"
                value={company}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              className="w-full"
              disabled={isLoading || !name.trim()}
              type="submit"
            >
              {isLoading ? 'Saving...' : 'Continue to Investor Room'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              Your information is secure and will only be used for investor
              communications.
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
