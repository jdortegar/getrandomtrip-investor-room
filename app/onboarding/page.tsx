'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/otp');
    }
  }, [status, router]);

  // Redirect if profile is already complete
  useEffect(() => {
    if (status === 'authenticated' && session?.investor?.profileComplete) {
      router.replace('/room');
    }
  }, [status, session, router]);

  // Load existing investor data if available
  useEffect(() => {
    if (session?.user?.email) {
      // Fetch investor data to pre-fill form
      fetch('/api/investor/me')
        .then((res) => res.json())
        .then((data) => {
          if (data.investor) {
            setName(data.investor.name || '');
            setPhone(data.investor.phone || '');
            setCompany(data.investor.company || '');
          }
        })
        .catch(() => {
          // Ignore errors, form will be empty
        });
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/investor/update', {
        body: JSON.stringify({
          name: name.trim() || undefined,
          phone: phone.trim() || undefined,
          company: company.trim() || undefined,
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

      // Refresh the session to get updated investor data
      // This triggers the session callback which will fetch the updated investor from DB
      await update();

      // Use window.location for a hard redirect to ensure fresh session data is loaded
      // This prevents the redirect loop where room layout sees old session data
      window.location.href = '/room';
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading while checking session
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

  // Don't render if not authenticated (will redirect)
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
