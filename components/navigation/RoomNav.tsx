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

interface RoomNavItem {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const roomNavItems: RoomNavItem[] = [
  {
    href: '/room',
    icon: LayoutDashboard,
    label: 'Resumen',
  },
  {
    href: '/room/files',
    icon: FileText,
    label: 'Archivos',
  },
  {
    href: '/room/investment',
    icon: PiggyBank,
    label: 'Mi inversión',
  },
  {
    href: '/room/helper',
    icon: HandHelping,
    label: 'Ayuda',
  },
];

export function RoomNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-2">
      {roomNavItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          pathname === item.href ||
          (item.href !== '/room' && pathname?.startsWith(item.href));

        return (
          <Link
            className={cn(
              'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-barlow-condensed font-semibold uppercase tracking-wide transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'hover:bg-accent hover:text-accent-foreground',
            )}
            href={item.href}
            key={item.href}
          >
            <Icon className="h-5 w-5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
