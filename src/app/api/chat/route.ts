import { NextRequest, NextResponse } from 'next/server';
import { systemPrompts } from '@/data/chat/config';
import { profileContextES, profileContextEN } from '@/data/chat/aiContext';
import { checkRateLimit } from '@/lib/rateLimiter';
import type { Lang } from '@/i18n/types';

// ──────────────────────────────────────────────────────────────
// POST /api/chat — Gemini AI chat endpoint
// ──────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'AI provider not configured', fallback: true },
      { status: 503 }
    );
  }

  // Parse body
  let body: { message?: string; lang?: string; sessionId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const message = body.message?.trim();
  const lang: Lang = body.lang === 'en' ? 'en' : 'es';
  const sessionId = body.sessionId ?? 'anonymous';

  // Validate input
  if (!message || message.length === 0 || message.length > 500) {
    return NextResponse.json({ error: 'Message must be 1-500 characters' }, { status: 400 });
  }

  // Rate limiting
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() ?? '127.0.0.1';
  const { allowed, remaining } = checkRateLimit(ip, sessionId);

  if (!allowed) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Try again in a minute.', fallback: true },
      { status: 429 }
    );
  }

  // Call Gemini API with timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: `${systemPrompts[lang]}\n\n${lang === 'en' ? profileContextEN : profileContextES}`,
              },
            ],
          },
          contents: [
            {
              role: 'user',
              parts: [{ text: message }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 150,
          },
          safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      throw new Error(`Gemini API error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text || typeof text !== 'string') {
      throw new Error('Empty response from Gemini API');
    }

    return NextResponse.json({
      response: text.trim(),
      provider: 'ai' as const,
      remaining,
    });
  } catch (err: unknown) {
    const isAbort = err instanceof DOMException && err.name === 'AbortError';
    const message = isAbort ? 'Request timed out' : (err as Error).message;

    return NextResponse.json({ error: message, fallback: true }, { status: 502 });
  } finally {
    clearTimeout(timeoutId);
  }
}
