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
      className="px-3 py-1 border border-slate-500 rounded text-sm text-slate-100 bg-slate-800 hover:bg-slate-700"
      title="Change language"
    >
      ES/EN
    </button>
  )
}
