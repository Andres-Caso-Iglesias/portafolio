"use client";
import React from 'react'
import { useLocale } from '../hooks/useLocale'

export default function LanguageSwitch() {
  const { lang, setLang } = useLocale()
  // Simple bilingual toggle: ES <-> EN
  const toggle = () => {
    setLang(lang === 'es' ? 'en' : 'es')
  }

  const onClick = () => {
      toggle()
      // Notify other client components about language change
      try {
        window.dispatchEvent(new Event('langChanged'))
      } catch {}
    }

  return (
    <button
      onClick={onClick}
      aria-label="Toggle language"
      className="px-3 py-1 border border-slate-500 rounded text-sm text-slate-100 bg-slate-800 hover:bg-slate-700"
      title="Change language"
    >
      {lang === 'es' ? 'ES' : 'EN'}
    </button>
  )
}
