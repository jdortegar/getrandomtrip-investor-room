import Image from 'next/image';
import Link from 'next/link';

import { pathForLocale } from '@/lib/i18n/pathForLocale';
import type { Locale } from '@/lib/i18n/config';
import type { RoomDictionary } from '@/lib/types/dictionary';

interface NotFoundViewProps {
  locale: Locale;
  room: RoomDictionary;
}

export function NotFoundView({ locale, room }: NotFoundViewProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-16">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
        <Image
          alt={room.layout.logoAlt}
          height={56}
          priority={false}
          src="/assets/svg/logo.svg"
          width={224}
        />
        <h1 className="font-barlow-condensed text-3xl font-bold uppercase tracking-wide text-foreground md:text-4xl">
          {room.notFound.title}
        </h1>
        <p className="text-muted-foreground md:text-lg">
          {room.notFound.description}
        </p>
        <Link
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          href={pathForLocale(locale, '/')}
        >
          {room.layout.backToHome}
        </Link>
      </div>
    </div>
  );
}
