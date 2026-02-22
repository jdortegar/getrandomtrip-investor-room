'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Menu, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { COOKIE_LOCALE, LOCALE_LABELS } from '@/lib/i18n/config';
import { pathForLocale } from '@/lib/i18n/pathForLocale';
import type { Locale } from '@/lib/i18n/config';

interface NavbarDict {
  contact: string;
  home: string;
  investorsRoom: string;
  logIn: string;
}

interface NavbarProps {
  dict: NavbarDict;
  locale: Locale;
}

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function Navbar({ dict, locale }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const approved = !!(session as any)?.investor?.approved;

  const otherLocale: Locale = locale === 'es' ? 'en' : 'es';
  const basePath = pathname?.startsWith('/en') ? pathname.slice(3) || '/' : pathname ?? '/';
  const localeSwitchPath = pathForLocale(otherLocale, basePath);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLocaleSwitch = () => {
    document.cookie = `${COOKIE_LOCALE}=${otherLocale}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
    router.push(localeSwitchPath);
    closeMobileMenu();
  };

  return (
    <>
      <nav className="absolute left-0 right-0 top-0 z-50 w-full">
        <div className="mx-auto flex max-w-7xl xl:max-w-[1600px] 2xl:max-w-[1800px] items-center justify-between px-12 py-8 text-white md:px-16 md:py-10 xl:px-20 xl:py-12 2xl:px-24 2xl:py-14">
          <Link
            className="flex items-center gap-2"
            href={pathForLocale(locale, '/')}
            onClick={closeMobileMenu}
          >
            <img
              alt="Randomtrip"
              className="h-10 md:h-14"
              src="/assets/logos/logo_getrandomtrip_1.png"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-[100px] xl:gap-[120px] 2xl:gap-[150px] md:flex">
            <Link
              className="text-xl transition-colors hover:text-white hover:font-bold"
              href={pathForLocale(locale, '/')}
            >
              {dict.home}
            </Link>
            <Link
              className="text-xl transition-colors hover:text-white hover:font-bold"
              href={pathForLocale(locale, '/contact')}
            >
              {dict.contact}
            </Link>
            {/* Disable Investors Room until investor is approved */}
            {!approved ? (
              <div className="text-xl transition-colors text-white/60 cursor-not-allowed">
                {dict.investorsRoom}
              </div>
            ) : (
              <Link
                className="text-xl transition-colors hover:text-white hover:font-bold"
                href={pathForLocale(locale, '/room')}
              >
                {dict.investorsRoom}
              </Link>
            )}
            <button
              className="text-xl transition-colors hover:text-white hover:font-bold"
              onClick={handleLocaleSwitch}
              type="button"
            >
              {LOCALE_LABELS[otherLocale]}
            </button>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button
            aria-label="Toggle menu"
            className="flex items-center justify-center md:hidden"
            onClick={toggleMobileMenu}
            type="button"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/80 transition-opacity duration-300 md:hidden',
          isMobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={closeMobileMenu}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={cn(
          'fixed right-0 top-0 z-50 h-full w-80 p-8 transition-transform duration-300 md:hidden',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        style={{ backgroundColor: '#0F2D37' }}
      >
        <div className="flex flex-col gap-6 pt-16">
          <Link
            className="text-xl text-white transition-colors hover:text-white/80"
            href={pathForLocale(locale, '/')}
            onClick={closeMobileMenu}
          >
            {dict.home}
          </Link>
          <Link
            className="text-xl text-white transition-colors hover:text-white/80"
            href={pathForLocale(locale, '/contact')}
            onClick={closeMobileMenu}
          >
            {dict.contact}
          </Link>
          {!approved ? (
            <span className="cursor-not-allowed text-xl text-white/60">
              {dict.investorsRoom}
            </span>
          ) : (
            <Link
              className="text-xl text-white transition-colors hover:text-white/80"
              href={pathForLocale(locale, '/room')}
              onClick={closeMobileMenu}
            >
              {dict.investorsRoom}
            </Link>
          )}
          <button
            className="text-xl font-bold text-white transition-colors hover:text-white/80"
            onClick={handleLocaleSwitch}
            type="button"
          >
            {LOCALE_LABELS[otherLocale]}
          </button>
          <Link
            className="text-xl font-bold text-white transition-colors hover:text-white/80"
            href={pathForLocale(locale, '/login')}
            onClick={closeMobileMenu}
          >
            {dict.logIn}
          </Link>
        </div>
      </div>
    </>
  );
}
