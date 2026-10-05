'use client';

import Link from 'next/link';
import { useLanguage, t } from '@/lib/i18n';

const FOCUS_RING = [
  'focus-visible:outline-none',
  'focus-visible:ring-2',
  'focus-visible:ring-blue-500',
  'focus-visible:ring-offset-2',
  'focus-visible:ring-offset-white',
  'dark:focus-visible:ring-offset-slate-900',
].join(' ');

const BACK_BUTTON = [
  'fixed top-4 left-4 md:top-6 md:left-6 z-40',
  'inline-flex items-center gap-2 rounded-full border px-3 py-2',
  'text-sm font-medium whitespace-nowrap transition-colors backdrop-blur-sm',
  'bg-white/90 dark:bg-slate-900/90',
  'border-neutral-200 dark:border-slate-700',
  'text-neutral-700 dark:text-slate-300',
  'hover:border-blue-500 dark:hover:border-blue-400',
  'hover:text-blue-600 dark:hover:text-blue-400',
  FOCUS_RING,
].join(' ');

export default function BackButton() {
  const { lang } = useLanguage();

  return (
    <Link href="/" className={BACK_BUTTON}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 shrink-0"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
      {t(lang, 'project.back')}
    </Link>
  );
}
