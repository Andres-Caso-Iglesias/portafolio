'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Server Components resolve language from the `lang` cookie at request time.
// LanguageProvider only dispatches a DOM event on change, so without this
// listener the RSC tree (and <html lang>) would stay stale until a reload.
export default function LangRefresh() {
  const router = useRouter();

  useEffect(() => {
    const refresh = () => router.refresh();
    window.addEventListener('langChanged', refresh);
    return () => window.removeEventListener('langChanged', refresh);
  }, [router]);

  return null;
}
