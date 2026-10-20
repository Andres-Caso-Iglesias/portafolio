import type { Metadata } from 'next';
import { FakeAdminLogin } from '@/components/honeypot/FakeAdminLogin';
import { getLangFromCookie } from '@/lib/i18n-server';
import { t } from '@/lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLangFromCookie();
  return {
    title: t(lang, 'honeypot.title'),
    robots: {
      index: false,
      follow: false,
      noarchive: true,
    },
  };
}

export default async function AdminBackupPage() {
  return (
    <main
      id="contenido"
      className="min-h-screen flex items-center justify-center px-6 bg-white dark:bg-slate-900 transition-colors duration-300"
    >
      <FakeAdminLogin />
    </main>
  );
}
