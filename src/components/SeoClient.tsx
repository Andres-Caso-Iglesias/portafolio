"use client";
import React, { useEffect } from 'react'
import { useGlobalLang } from '../hooks/useGlobalLang'
import { t } from '../i18n/locales'

export default function SeoClient() {
  const { lang } = useGlobalLang()
  useEffect(() => {
    try {
      const title = t(lang, 'home.seoTitle')
      const description = t(lang, 'home.seoDescription')
      if (title) document.title = title
      const metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
      if (metaDesc) metaDesc.setAttribute('content', description)
      // Open Graph / Twitter mock updates
      const og = document.querySelector('meta[property="og:description"]') as HTMLMetaElement | null
      if (og) og.setAttribute('content', description)
    } catch {}
  }, [lang])
  return null
}
