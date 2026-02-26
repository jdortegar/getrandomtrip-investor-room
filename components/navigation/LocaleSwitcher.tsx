'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';

import { COOKIE_LOCALE, LOCALE_LABELS, type Locale } from '@/lib/i18n/config';
import { pathForLocale } from '@/lib/i18n/pathForLocale';

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

interface LocaleSwitcherProps {
  locale: Locale;
}

export function LocaleSwitcher({ locale }: LocaleSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback((newLocale: Locale) => {
    if (newLocale === locale) {
      setOpen(false);
      return;
    }

    // Create white flash overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: #999;
      z-index: 40;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
      pointer-events: none;
    `;
    document.body.appendChild(overlay);

    // Trigger fade to white
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
    });

    // After fade to white, navigate
    setTimeout(() => {
      document.cookie = `${COOKIE_LOCALE}=${newLocale}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
      const pathWithoutLocale = pathname?.startsWith('/en') ? pathname.slice(3) || '/' : pathname ?? '/';
      const target = pathForLocale(newLocale, pathWithoutLocale);
      router.push(target);

      // Fade out overlay after navigation
      setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => {
          overlay.remove();
        }, 300);
      }, 400);
    }, 300);

    setOpen(false);
  }, [locale, pathname, router]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        aria-label="Select language"
        className="flex items-center gap-1.5 text-white cursor-pointer outline-none"
        type="button"
        onClick={() => setOpen(!open)}
      >
        <Globe className="h-5 w-5" />
        <span className="font-barlow-condensed text-base font-semibold uppercase">{locale.toUpperCase()}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 min-w-[120px] rounded-md bg-white shadow-lg py-1 z-50">
          {(['es', 'en'] as const).map((loc) => (
            <button
              key={loc}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer font-barlow"
              onClick={() => handleSelect(loc)}
              type="button"
            >
              {LOCALE_LABELS[loc]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
