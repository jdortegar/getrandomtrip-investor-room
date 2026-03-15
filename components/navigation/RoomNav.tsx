'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FileText,
  HandHelping,
  LayoutDashboard,
  PiggyBank,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import { pathForLocale } from '@/lib/i18n/pathForLocale';
import type { Locale } from '@/lib/i18n/config';
import type { RoomDictionary } from '@/lib/types/dictionary';

interface RoomNavItem {
  icon: React.ComponentType<{ className?: string }>;
  labelKey: keyof RoomDictionary['nav'];
  path: string;
}

const roomNavItems: RoomNavItem[] = [
  { icon: LayoutDashboard, labelKey: 'summary', path: '/room' },
  { icon: FileText, labelKey: 'files', path: '/room/files' },
  { icon: PiggyBank, labelKey: 'investment', path: '/room/investment' },
  { icon: HandHelping, labelKey: 'helper', path: '/room/helper' },
];

interface RoomNavProps {
  dict: RoomDictionary['nav'];
  locale: Locale;
}

export function RoomNav({ dict, locale }: RoomNavProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const approved = !!session?.investor?.approved;

  return (
    <nav className="space-y-2">
      {roomNavItems.map((item) => {
        const Icon = item.icon;
        const label = dict[item.labelKey];
        const href = pathForLocale(locale, item.path);
        const isActive =
          pathname === href ||
          (item.path !== '/room' && pathname?.startsWith(href + '/'));

        if (item.path === '/room' && !approved) {
          return (
            <div
              key={item.path}
              aria-disabled
              className={cn(
                'flex cursor-not-allowed items-center gap-3 rounded-lg px-4 py-3 text-sm font-barlow-condensed font-semibold uppercase tracking-wide opacity-50 transition-colors',
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </div>
          );
        }

        return (
          <Link
            className={cn(
              'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-barlow-condensed font-semibold uppercase tracking-wide transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20',
            )}
            href={href}
            key={item.path}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
