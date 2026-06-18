import 'server-only';

import { cookies } from 'next/headers';
import type { Lang } from '@/i18n/types';

export async function getLangFromCookie(): Promise<Lang> {
  const store = await cookies();
  const value = store.get('lang')?.value;
  return value === 'en' ? 'en' : 'es';
}
