import { Locale } from 'next-intl';

export const locales = ['vi', 'en'] as const;
export const defaultLocale = 'vi' as const;

export type AppLocale = (typeof locales)[number];

export function isValidLocale(locale: string): locale is AppLocale {
  return locales.includes(locale as AppLocale);
} 