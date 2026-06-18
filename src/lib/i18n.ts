import type { Lang } from '@/i18n/types';
import locales from '@/i18n/locales.json';
import type { LocaleData } from './i18n-context';

export type { LocaleData, LanguageContextValue } from './i18n-context';
export { LanguageProvider, useLanguage } from './i18n-context';

const localeData = locales as unknown as LocaleData;

function lookup(lang: Lang, key: string): string {
  const parts = key.split('.');
  let current: unknown = localeData[lang];
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return '';
    }
  }
  return typeof current === 'string' ? current : '';
}

function interpolate(text: string, vars?: Record<string, string | number>): string {
  if (!vars) return text;
  return text.replace(/\{(\w+)\}/g, (_, name) => String(vars[name] ?? `{${name}}`));
}

// Free t() function for code paths that have a lang but no hook context.
// Looks up key with dot-notation against locales.json.
export function t(lang: Lang, key: string, vars?: Record<string, string | number>): string {
  const value = lookup(lang, key);
  if (!value) return key;
  return interpolate(value, vars);
}
