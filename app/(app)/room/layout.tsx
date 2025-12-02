import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, FileText, FileSignature, Gift } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function RoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // During build, skip auth check
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return <>{children}</>;
  }

  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      redirect('/otp');
    }

    const investor = (session as any).investor;

    if (!investor || !investor.approved) {
      return (
        <main className="container mx-auto p-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-4xl font-bold">Access Pending</h1>
            <p className="mb-8 text-muted-foreground">
              Your access is pending approval. Please contact the founders to get approved.
            </p>
            <Button asChild>
              <Link href="/">Return to Landing</Link>
            </Button>
          </div>
        </main>
      );
    }

    return (
      <div className="flex min-h-screen flex-col">
        {/* Header */}
        <header className="border-b bg-background">
          <div className="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <div>
              <h1 className="font-serif text-2xl font-bold text-primary">Investor Room</h1>
              <p className="text-sm text-muted-foreground">Welcome, {investor.name || investor.email}</p>
            </div>
            <Button asChild variant="ghost">
              <Link href="/">Back to Landing</Link>
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">{children}</main>
      </div>
    );
  } catch (error) {
    console.error('Error loading room layout:', error);
    return (
      <main className="container mx-auto p-8">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">Error</h1>
          <p className="text-muted-foreground">
            Database not configured. Please set up your database connection.
          </p>
        </div>
      </main>
    );
  }
}

