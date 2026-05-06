import { Lang, } from '../i18n/types'
import { useEffect, useState } from 'react'

export function useLocale(defaultLang: Lang = 'es') {
  // Do not read localStorage during initial render to avoid hydration mismatches.
  const [lang, setLang] = useState<Lang>(defaultLang)

  // Persist changes to localStorage after they happen on the client
  useEffect(() => {
    try {
      localStorage.setItem('lang', lang)
    } catch {}
  }, [lang])

  // On mount, load any previously saved language from localStorage to align with user preference
  useEffect(() => {
    try {
      const stored = localStorage.getItem('lang') as Lang | null
      if (stored === 'es' || stored === 'en') {
        setLang(stored)
      }
    } catch {}
  }, [])

  return { lang, setLang }
}
