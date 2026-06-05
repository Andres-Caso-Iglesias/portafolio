"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Lang } from "@/i18n/types";

export type LocaleData = {
  es: Record<string, unknown>;
  en: Record<string, unknown>;
};

export type LanguageContextValue = {
  lang: Lang;
  setLang: (newLang: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function lookup(locales: LocaleData, lang: Lang, key: string): string {
  const parts = key.split(".");
  let current: unknown = locales[lang];
  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return "";
    }
  }
  return typeof current === "string" ? current : "";
}

function interpolate(
  text: string,
  vars?: Record<string, string | number>
): string {
  if (!vars) return text;
  return text.replace(/\{(\w+)\}/g, (_, name) =>
    String(vars[name] ?? `{${name}}`)
  );
}

function makeT(locales: LocaleData, lang: Lang) {
  return (key: string, vars?: Record<string, string | number>): string => {
    const value = lookup(locales, lang, key);
    if (!value) return key;
    return interpolate(value, vars);
  };
}

export type LanguageProviderProps = {
  children: ReactNode;
  initialLang: Lang;
  initialLocales: LocaleData;
};

export function LanguageProvider({
  children,
  initialLang,
  initialLocales,
}: LanguageProviderProps) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback((newLang: Lang) => {
    if (newLang !== "es" && newLang !== "en") return;
    setLangState(newLang);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("lang", newLang);
        document.cookie = `lang=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
        window.dispatchEvent(new Event("langChanged"));
      } catch {
        // ignore storage / cookie errors
      }
    }
  }, []);

  const t = useMemo(
    () => makeT(initialLocales, lang),
    [initialLocales, lang]
  );

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, t }),
    [lang, setLang, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
