"use client";
import { useGlobalLang } from '@/hooks/useGlobalLang'
import { t } from '@/i18n/locales'

export default function ProfileIntroText() {
  const { lang } = useGlobalLang()
  return (
    <p className="text-slate-300 mb-8 text-lg leading-relaxed">{t(lang, 'home.profileIntroFull')}</p>
  )
}
