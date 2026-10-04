'use client';

import ThemeToggle from '@/components/ThemeToggle';
import LanguageSwitch from '@/components/LanguageSwitch';

export default function SiteControls() {
  return (
    <div className="fixed top-4 right-4 md:top-6 md:right-6 z-40 flex items-center gap-3">
      <ThemeToggle />
      <LanguageSwitch />
    </div>
  );
}
