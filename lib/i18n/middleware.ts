import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextRequest, NextResponse } from 'next/server';

import { COOKIE_LOCALE, DEFAULT_LOCALE, type Locale } from './config';

const LOCALES: Locale[] = ['es', 'en'];

function getLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(COOKIE_LOCALE)?.value;
  if (cookie === 'en' || cookie === 'es') return cookie;

  const acceptLanguage = request.headers.get('accept-language') ?? '';
  const negotiator = new Negotiator({ headers: { 'accept-language': acceptLanguage } });
  const languages = negotiator.languages();
  const matched = match(languages, LOCALES, DEFAULT_LOCALE);
  return matched as Locale;
}

export function handleI18n(request: NextRequest): NextResponse | null {
  const pathname = request.nextUrl.pathname;
  const hasEs = pathname === '/es' || pathname.startsWith('/es/');
  const hasEn = pathname === '/en' || pathname.startsWith('/en/');

  if (hasEs) {
    const target = pathname.replace(/^\/es/, '') || '/';
    return NextResponse.redirect(new URL(target, request.url));
  }

  if (hasEn) {
    return null;
  }

  const locale = getLocale(request);
  if (locale === 'es') {
    const rewritePath = `/es${pathname}`;
    const response = NextResponse.rewrite(new URL(rewritePath, request.url));
    response.cookies.set(COOKIE_LOCALE, locale, { path: '/', maxAge: 60 * 60 * 24 * 365 });
    return response;
  }

  const redirectPath = pathname === '/' ? '/en' : `/en${pathname}`;
  const response = NextResponse.redirect(new URL(redirectPath, request.url));
  response.cookies.set(COOKIE_LOCALE, 'en', { path: '/', maxAge: 60 * 60 * 24 * 365 });
  return response;
}
