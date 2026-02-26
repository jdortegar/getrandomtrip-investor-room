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

interface RoomNavItem {
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const roomNavItems: RoomNavItem[] = [
  { icon: LayoutDashboard, label: 'Resumen', path: '/room' },
  { icon: FileText, label: 'Archivos', path: '/room/files' },
  { icon: PiggyBank, label: 'Mi inversión', path: '/room/investment' },
  { icon: HandHelping, label: 'Ayuda', path: '/room/helper' },
];

interface RoomNavProps {
  locale: Locale;
}

export function RoomNav({ locale }: RoomNavProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const approved = !!(session as any)?.investor?.approved;

  return (
    <nav className="space-y-2">
      {roomNavItems.map((item) => {
        const Icon = item.icon;
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
              {item.label}
            </div>
          );
        }

        return (
          <Link
            className={cn(
              'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-barlow-condensed font-semibold uppercase tracking-wide transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'hover:bg-accent hover:text-accent-foreground',
            )}
            href={href}
            key={item.path}
          >
            <Icon className="h-5 w-5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
