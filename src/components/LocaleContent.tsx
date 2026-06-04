"use client";
import { useState, useEffect, createContext, useContext, type ReactNode } from 'react';
import type { Lang } from '@/i18n/types';

const LangContext = createContext<Lang>('es');

export function useLang(): Lang {
  return useContext(LangContext);
}

interface LocaleContentProps {
  defaultLang: Lang;
  children: ReactNode;
}

export default function LocaleContent({ defaultLang, children }: LocaleContentProps) {
  const [lang, setLang] = useState<Lang>(defaultLang);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('lang') as Lang | null;
      if (stored && stored !== defaultLang && (stored === 'es' || stored === 'en')) {
        setLang(stored);
      }
    } catch {}

    const onLangChanged = () => {
      try {
        const stored = localStorage.getItem('lang') as Lang | null;
        if (stored && (stored === 'es' || stored === 'en')) {
          setLang(stored);
        }
      } catch {}
    };
    window.addEventListener('langChanged', onLangChanged);
    return () => window.removeEventListener('langChanged', onLangChanged);
  }, [defaultLang]);

  return (
    <LangContext.Provider value={lang}>
      {children}
    </LangContext.Provider>
  );
}
