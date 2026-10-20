'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useLanguage, t } from '@/lib/i18n';

export function FakeAdminLogin() {
  const { lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="bg-white dark:bg-slate-800 border border-neutral-300 dark:border-slate-700 rounded-lg shadow-sm p-6 space-y-4">
        <div>
          <h1 className="text-lg font-semibold text-neutral-900 dark:text-slate-100">
            {t(lang, 'honeypot.title')}
          </h1>
          <p className="text-sm text-neutral-500 dark:text-slate-400">
            {t(lang, 'honeypot.subtitle')}
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label
                htmlFor="admin-user"
                className="block text-sm font-medium text-neutral-700 dark:text-slate-300 mb-1"
              >
                {t(lang, 'honeypot.user')}
              </label>
              <input
                id="admin-user"
                name="user"
                type="text"
                required
                autoComplete="off"
                className="w-full px-3 py-2 text-sm border border-neutral-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-neutral-900 dark:text-slate-100"
              />
            </div>
            <div>
              <label
                htmlFor="admin-password"
                className="block text-sm font-medium text-neutral-700 dark:text-slate-300 mb-1"
              >
                {t(lang, 'honeypot.password')}
              </label>
              <input
                id="admin-password"
                name="password"
                type="password"
                required
                autoComplete="off"
                className="w-full px-3 py-2 text-sm border border-neutral-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-neutral-900 dark:text-slate-100"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              {t(lang, 'honeypot.submit')}
            </button>
          </form>
        ) : (
          <div role="status" className="space-y-3">
            <p className="text-sm text-neutral-900 dark:text-slate-100">
              {t(lang, 'honeypot.joke')}
            </p>
            <Link
              href="/#contacto"
              className="inline-block text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              {t(lang, 'honeypot.jokeLink')}
            </Link>
          </div>
        )}
      </div>
      <p className="mt-4 text-center text-xs text-neutral-500 dark:text-slate-400">
        {t(lang, 'honeypot.footnote')}
      </p>
    </div>
  );
}
