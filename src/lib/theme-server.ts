import 'server-only';

import { cookies } from 'next/headers';
import type { Theme } from './theme-context';

export async function getThemeFromCookie(): Promise<Theme> {
  const store = await cookies();
  const value = store.get('theme')?.value;
  if (value === 'light' || value === 'dark') return value;
  return 'dark'; // default
}
