"use client";
import React from 'react'
import { useGlobalLang } from '../hooks/useGlobalLang'

export default function LanguageSwitch() {
  const { lang, setLang } = useGlobalLang()
  // Simple bilingual toggle: ES <-> EN
  const toggle = () => {
    const next = lang === 'es' ? 'en' : 'es'
    setLang(next)
    // Notify other client components about language change
    try {
      window.dispatchEvent(new Event('langChanged'))
    } catch {}
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
