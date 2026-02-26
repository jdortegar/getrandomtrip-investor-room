import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { Button } from '@/components/ui/button';
import { RoomNav } from '@/components/navigation/RoomNav';
import { SignOutButton } from '@/components/navigation/SignOutButton';
import { authOptions } from '@/lib/auth/config';
import { getLocaleFromCookies } from '@/lib/i18n/server';
import { pathForLocale } from '@/lib/i18n/pathForLocale';

export const dynamic = 'force-dynamic';

export default async function RoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return <>{children}</>;
  }

  try {
    const session = await getServerSession(authOptions);
    const locale = await getLocaleFromCookies();

    if (!session) {
      redirect(pathForLocale(locale, '/otp'));
    }

    const investor = (session as any).investor;

    if (!investor || !investor.profileComplete) {
      redirect(pathForLocale(locale, '/onboarding'));
    }

    if (!investor.approved) {
      return (
        <main className="container mx-auto p-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-4xl font-bold">Acceso pendiente</h1>
            <p className="mb-8 text-muted-foreground">
              Tu acceso está pendiente de aprobación. Por favor contacta a los
              fundadores para obtener aprobación.
            </p>
            <Button asChild>
              <Link href={pathForLocale(locale, '/')}>Volver al inicio</Link>
            </Button>
          </div>
        </main>
      );
    }

    return (
      <div className="flex min-h-screen flex-col bg-background">
        <header className="border-b border-border bg-background">
          <div className="mx-auto flex max-w-7xl xl:max-w-[1600px] 2xl:max-w-[1800px] items-center justify-between px-4 py-6 md:px-8 md:py-8 xl:px-12 xl:py-10 2xl:px-16 2xl:py-12">
            <div className="flex items-center gap-4">
              <Image
                alt="Investor Room"
                height={48}
                priority={false}
                src="/assets/svg/logo.svg"
                width={48}
              />
              <div>
                <h1 className="font-barlow-condensed text-2xl font-bold uppercase tracking-wide text-primary md:text-3xl xl:text-4xl">
                  Sala de Inversores
                </h1>
                <p className="mt-1 text-sm text-muted-foreground md:text-base">
                  Bienvenido, {investor.name || investor.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost">
                <Link href={pathForLocale(locale, '/')}>Volver al inicio</Link>
              </Button>
              <SignOutButton />
            </div>
          </div>
        </header>

        <main className="flex-1">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:grid-cols-[240px_1fr] md:px-8 xl:max-w-[1600px] xl:px-12 xl:py-12 2xl:max-w-[1800px] 2xl:px-16 2xl:py-16">
            <aside>
              <RoomNav locale={locale} />
            </aside>
            <div className="flex-1">{children}</div>
          </div>
        </main>
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
