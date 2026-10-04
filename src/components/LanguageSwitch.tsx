'use client';

import Image from 'next/image';
import { useLanguage } from '@/lib/i18n';

export default function LanguageSwitch() {
  const { lang, setLang } = useLanguage();

  const toggle = () => {
    const next = lang === 'es' ? 'en' : 'es';
    setLang(next);
  };

  return (
    <button
      onClick={toggle}
      aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
      className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
    >
      <Image
        src={lang === 'es' ? '/ingles.png' : '/espanola.png'}
        alt={lang === 'es' ? 'English' : 'Español'}
        width={32}
        height={32}
        className="w-8 h-8"
      />
    </button>
  );
}
