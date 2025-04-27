import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { defaultLocale, isValidLocale } from './config';

const COOKIE_NAME = 'NEXT_LOCALE';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const locale = cookieStore.get(COOKIE_NAME)?.value || defaultLocale;

  if (!isValidLocale(locale)) {
    return {
      locale: defaultLocale,
      messages: (await import(`@/messages/${defaultLocale}.json`)).default
    };
  }

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default
  };
}); 