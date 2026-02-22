import 'server-only';

import type { Locale } from './config';

const dictionaries: Record<Locale, () => Promise<Record<string, unknown>>> = {
  en: () => import('@/dictionaries/en.json').then((m) => m.default as Record<string, unknown>),
  es: () => import('@/dictionaries/es.json').then((m) => m.default as Record<string, unknown>),
};

export function hasLocale(value: string): value is Locale {
  return value === 'en' || value === 'es';
}

export async function getDictionary(locale: Locale): Promise<Record<string, unknown>> {
  return dictionaries[locale]();
}
