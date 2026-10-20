'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage, t } from '@/lib/i18n';
import { useKeySequence } from '@/hooks/useKeySequence';
import { KONAMI_SEQUENCE, IDDQD_SEQUENCE, TILDE_KEY, BACKQUOTE_KEY } from '@/lib/keySequence';

const TOAST_DISMISS_MS = 4000;

export function SecretWatcher() {
  const { lang } = useLanguage();
  const [toast, setToast] = useState<string | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const retroOnRef = useRef(false);
  const consoleLoggedRef = useRef(false);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (consoleLoggedRef.current) return;
    consoleLoggedRef.current = true;
    const art = t(lang, 'secrets.consoleArt');
    console.log(`%c${art}`, 'color:#34d399; font-family: monospace;');
  }, [lang]);

  const showToast = (message: string) => {
    setToast(message);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), TOAST_DISMISS_MS);
  };

  const toggleRetro = () => {
    retroOnRef.current = !retroOnRef.current;
    document.documentElement.classList.toggle('retro', retroOnRef.current);
    showToast(t(lang, retroOnRef.current ? 'secrets.konamiOn' : 'secrets.konamiOff'));
  };

  const showIddqd = () => {
    showToast(t(lang, 'secrets.iddqd'));
  };

  useKeySequence({ sequence: KONAMI_SEQUENCE, onMatch: toggleRetro });
  useKeySequence({ sequence: IDDQD_SEQUENCE, onMatch: showIddqd });
  useKeySequence({ sequence: [TILDE_KEY], onMatch: toggleRetro });
  useKeySequence({ sequence: [BACKQUOTE_KEY], onMatch: toggleRetro });

  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-6 z-50 max-w-[calc(100vw-3rem)] bg-slate-900 text-emerald-300 border border-emerald-700/50 rounded-lg px-4 py-3 font-mono text-sm shadow-xl"
    >
      {toast}
    </div>
  );
}
