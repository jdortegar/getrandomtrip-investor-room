'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { COOKIE_LOCALE, LOCALE_LABELS, type Locale } from '@/lib/i18n/config';
import { pathForLocale } from '@/lib/i18n/pathForLocale';

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

interface LocaleSwitcherProps {
  locale: Locale;
}

export function LocaleSwitcher({ locale }: LocaleSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleSelect = (newLocale: Locale) => {
    if (newLocale === locale) return;
    document.cookie = `${COOKIE_LOCALE}=${newLocale}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
    const pathWithoutLocale = pathname?.startsWith('/en') ? pathname.slice(3) || '/' : pathname ?? '/';
    const target = pathForLocale(newLocale, pathWithoutLocale);
    router.push(target);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Select language"
          className="bg-white/10 text-white hover:bg-white/20"
          size="icon"
          variant="ghost"
        >
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {(['es', 'en'] as const).map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleSelect(loc)}
          >
            {LOCALE_LABELS[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
