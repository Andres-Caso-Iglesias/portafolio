"use client";
import React from 'react'
import { useLanguage } from '@/lib/i18n'

export default function LanguageSwitch() {
  const { lang, setLang } = useLanguage()
  // Simple bilingual toggle: ES <-> EN
  // setLang now persists to localStorage + cookie + dispatches langChanged automatically
  const toggle = () => {
    const next = lang === 'es' ? 'en' : 'es'
    setLang(next)
  }
  const onClick = () => {
    toggle()
  }

  return (
    <button
      onClick={onClick}
      aria-label="Toggle language"
      className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
      title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      <img
        src={lang === 'es' ? '/ingles.png' : '/espanola.png'}
        alt={lang === 'es' ? 'English' : 'Español'}
        className="w-8 h-8"
      />
    </button>
  )
}
