import { NextResponse } from 'next/server';
import { getLangFromCookie } from '@/lib/i18n-server';
import { t } from '@/lib/i18n';

export async function GET() {
  const lang = await getLangFromCookie();
  return new NextResponse(t(lang, 'teapot.body'), {
    status: 418,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
