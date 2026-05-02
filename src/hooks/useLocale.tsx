import { Lang, } from '../i18n/types'
import { useEffect, useState } from 'react'

export function useLocale(defaultLang: Lang = 'es') {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('lang') as Lang | null
      if (stored === 'es' || stored === 'en') return stored
    }
    return defaultLang
  })

  useEffect(() => {
    try {
      localStorage.setItem('lang', lang)
    } catch {}
  }, [lang])

  return { lang, setLang }
}
