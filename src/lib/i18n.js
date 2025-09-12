export const locales = ['en'];
export const defaultLocale = 'en';

export const i18n = {
  locales,
  defaultLocale,
};

export function getLocaleFromHeaders(headers) {
  try {
    const acceptLanguage = headers?.get?.('accept-language') || '';
    const preferred = acceptLanguage.split(',').map(s => s.split(';')[0].trim());
    return preferred.find(l => locales.includes(l)) || defaultLocale;
  } catch {
    return defaultLocale;
  }
}

