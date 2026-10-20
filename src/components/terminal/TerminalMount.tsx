'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Terminal = dynamic(() => import('./Terminal').then(mod => mod.Terminal), {
  ssr: false,
  loading: () => null,
});

export function TerminalMount() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timeoutId: number | null = null;
    let idleId: number | null = null;

    const win = window as Window & {
      requestIdleCallback?: (callback: () => void) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    const onReady = () => {
      if (!cancelled) setReady(true);
    };

    if (typeof win.requestIdleCallback === 'function') {
      idleId = win.requestIdleCallback(onReady);
    } else {
      timeoutId = window.setTimeout(onReady, 200);
    }

    return () => {
      cancelled = true;
      if (idleId !== null && typeof win.cancelIdleCallback === 'function') {
        win.cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  if (!ready) return null;
  return <Terminal />;
}
