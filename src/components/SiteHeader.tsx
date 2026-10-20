'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSwitch from '@/components/LanguageSwitch';
import { useLanguage, t } from '@/lib/i18n';

const NAV_ITEMS = [
  { id: 'perfil', labelKey: 'nav.profile' },
  { id: 'trayectoria', labelKey: 'nav.timeline' },
  { id: 'habilidades', labelKey: 'nav.skills' },
  { id: 'proyectos', labelKey: 'nav.projects' },
  { id: 'contacto', labelKey: 'nav.contact' },
] as const;

const FOCUS_RING = [
  'focus-visible:outline-none',
  'focus-visible:ring-2',
  'focus-visible:ring-blue-500',
  'focus-visible:ring-offset-2',
  'focus-visible:ring-offset-white',
  'dark:focus-visible:ring-offset-slate-900',
].join(' ');

export default function SiteHeader() {
  const { lang } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // On the home page, section anchors scroll in place; elsewhere they link back home.
  const hrefFor = (id: string) => (pathname === '/' ? `#${id}` : `/#${id}`);

  return (
    <>
      <a href="#contenido" className={`skip-link ${FOCUS_RING}`}>
        {t(lang, 'nav.skipToContent')}
      </a>
      <header
        data-testid="site-header"
        className={`sticky top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? 'border-b border-neutral-200/80 bg-white/85 backdrop-blur-md dark:border-slate-700/70 dark:bg-slate-900/85'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav
          aria-label={t(lang, 'nav.menuLabel')}
          className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6"
        >
          <Link
            href="/"
            aria-label="Andrés Caso Iglesias"
            className={`shrink-0 rounded-md text-lg font-extrabold tracking-tight text-neutral-900 dark:text-white ${FOCUS_RING}`}
          >
            <span className="hidden sm:inline">Andrés Caso Iglesias</span>
            <span className="sm:hidden" aria-hidden="true">
              AC
            </span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map(item => (
              <li key={item.id}>
                <a
                  href={hrefFor(item.id)}
                  className={`rounded-md px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white ${FOCUS_RING}`}
                >
                  {t(lang, item.labelKey)}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <LanguageSwitch />
          </div>
        </nav>
      </header>
    </>
  );
}
