import type { Locale } from './config';

/**
 * Returns the path with locale prefix when needed. Default locale (es) has no prefix.
 */
export function pathForLocale(locale: Locale, path: string): string {
  const normalized = path === '' ? '/' : path.startsWith('/') ? path : `/${path}`;
  if (locale === 'es') return normalized === '/' ? '/' : normalized;
  return normalized === '/' ? '/en' : `/en${normalized}`;
}
