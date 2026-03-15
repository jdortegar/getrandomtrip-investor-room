import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { RoomNav } from '@/components/navigation/RoomNav';
import { SignOutButton } from '@/components/navigation/SignOutButton';
import { requireRoomAuth } from '@/lib/auth/requireRoomAuth';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { pathForLocale } from '@/lib/i18n/pathForLocale';
import type { RoomDictionary } from '@/lib/types/dictionary';
import { LocaleSwitcher } from '@/components/navigation/LocaleSwitcher';

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
    const { investor, locale } = await requireRoomAuth();
    const dict = await getDictionary(locale);
    const room = dict.room as RoomDictionary;

    if (!investor.approved) {
      return (
        <main className="container mx-auto p-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-4xl font-bold">
              {room.layout.pendingTitle}
            </h1>
            <p className="mb-8 text-muted-foreground">
              {room.layout.pendingMessage}
            </p>
            <Button asChild>
              <Link href={pathForLocale(locale, '/')}>
                {room.layout.backToHome}
              </Link>
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
                alt={room.layout.logoAlt}
                height={48}
                priority={false}
                src="/assets/svg/logo.svg"
                width={48}
              />
              <div>
                <h1 className="font-barlow-condensed text-2xl font-bold uppercase tracking-wide text-primary md:text-3xl xl:text-4xl">
                  {room.layout.title}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground md:text-base">
                  {room.layout.welcomePrefix} {investor.name || investor.email}
                </p>
              </div>
            </div>
            <nav
              aria-label="Header actions"
              className="flex items-center gap-4"
            >
              <Link
                className="text-sm font-medium text-foreground underline-offset-2 hover:text-primary hover:underline"
                href={pathForLocale(locale, '/')}
              >
                {room.layout.backToHome}
              </Link>
              <LocaleSwitcher
                className="text-sm font-medium text-foreground underline-offset-2 hover:text-primary hover:underline"
                locale={locale}
              />
              <SignOutButton
                className="text-sm font-medium text-foreground underline-offset-2 hover:text-primary hover:underline"
              />
            </nav>
          </div>
        </header>

        <main className="flex-1">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:grid-cols-[240px_1fr] md:px-8 xl:max-w-[1600px] xl:px-12 xl:py-12 2xl:max-w-[1800px] 2xl:px-16 2xl:py-16">
            <aside>
              <RoomNav dict={room.nav} locale={locale} />
            </aside>
            <div className="flex-1">{children}</div>
          </div>
        </main>
      </div>
    );
  } catch (error: unknown) {
    // Next.js redirect() throws an error with digest NEXT_REDIRECT — rethrow so the redirect happens
    if (
      error &&
      typeof error === 'object' &&
      'digest' in error &&
      typeof (error as { digest?: string }).digest === 'string' &&
      (error as { digest: string }).digest.startsWith('NEXT_REDIRECT')
    ) {
      throw error;
    }
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
