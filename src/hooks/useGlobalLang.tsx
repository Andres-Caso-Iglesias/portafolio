"use client";
import { Lang } from '@/i18n/types'
import { useEffect, useState } from 'react'

// Global language hook based on a simple client-side store with hydration-safe initial render
export function useGlobalLang(): { lang: Lang; setLang: (l: Lang) => void } {
  const [lang, setLangState] = useState<Lang>('es')

  // Persist changes and reflect when an external event triggers a change
  const setLang = (l: Lang) => {
    if (l !== 'es' && l !== 'en') return
    setLangState(l)
    try {
      localStorage.setItem('lang', l)
    } catch {}
  }

  useEffect(() => {
    // Listen for language changes from the toggle via event
    const onLangChanged = () => {
      try {
        const v = (localStorage.getItem('lang') as Lang | null)
        if (v === 'es' || v === 'en') setLangState(v)
      } catch {}
    }
    window.addEventListener('langChanged', onLangChanged as any)
    return () => window.removeEventListener('langChanged', onLangChanged as any)
  }, [])

  return { lang, setLang }
}
