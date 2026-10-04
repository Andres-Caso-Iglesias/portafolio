import type { Lang } from '@/i18n/types';
import locales from '@/i18n/locales.json';

// Shape of locales.json. Lives here (pure module) so Server Components can
// import t() without pulling the "use client" i18n-context into their graph.
export type LocaleData = {
  es: Record<string, unknown>;
  en: Record<string, unknown>;
};

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

// Free t() for code paths that have a lang but no hook context (RSC included).
// Pure: no React import, no browser API.
export function t(lang: Lang, key: string, vars?: Record<string, string | number>): string {
  const value = lookup(lang, key);
  if (!value) return key;
  return interpolate(value, vars);
}
