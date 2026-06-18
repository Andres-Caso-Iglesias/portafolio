'use client';
import { useLanguage, t } from '@/lib/i18n';

export default function ProfileIntroText() {
  const { lang } = useLanguage();
  return (
    <p className="text-slate-300 mb-8 text-lg leading-relaxed whitespace-pre-line">
      {t(lang, 'home.profileIntroFull')}
    </p>
  );
}
