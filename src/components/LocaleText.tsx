"use client";
import React from 'react'

declare global {
  interface WindowEventMap {
    langChanged: CustomEvent
  }
}

type Props = {
  es: string
  en: string
  className?: string
}

export default function LocaleText({ es, en, className }: Props) {
  const [lang, setLang] = React.useState<'es'|'en'>('es')
  React.useEffect(() => {
    try {
      const v = localStorage.getItem('lang') as 'es'|'en' | null
      if (v === 'es' || v === 'en') setLang(v)
    } catch {}
  }, [])

  React.useEffect(() => {
    const onLangChanged = () => {
      try {
        const v = localStorage.getItem('lang') as 'es'|'en' | null
        if (v === 'es' || v === 'en') setLang(v)
      } catch {}
    }
    window.addEventListener('langChanged', onLangChanged)
    return () => window.removeEventListener('langChanged', onLangChanged)
  }, [])

  return (
    <span className={className}>{lang === 'en' ? en : es}</span>
  )
}
