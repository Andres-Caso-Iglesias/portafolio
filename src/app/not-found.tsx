import Link from 'next/link';
import { getLangFromCookie } from '@/lib/i18n-server';
import { t } from '@/lib/i18n';

export default async function NotFound() {
  const lang = await getLangFromCookie();

  return (
    <main
      id="contenido"
      className="min-h-screen flex items-center justify-center px-6 bg-white dark:bg-slate-900 text-neutral-900 dark:text-slate-100 transition-colors duration-300"
    >
      <div className="max-w-2xl text-center space-y-6">
        <p className="font-mono text-sm text-blue-600 dark:text-blue-400" aria-hidden="true">
          {'> _'}
        </p>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
          404
        </h1>
        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-slate-100">
            {t(lang, 'notFound.heading')}
          </h2>
          <p className="text-neutral-500 dark:text-slate-400 text-base md:text-lg leading-relaxed">
            {t(lang, 'notFound.body')}
          </p>
          <p className="font-mono text-sm text-neutral-500 dark:text-slate-400">
            {t(lang, 'notFound.terminalHint')}
          </p>
        </div>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
        >
          {t(lang, 'notFound.home')}
        </Link>
      </div>
    </main>
  );
}
