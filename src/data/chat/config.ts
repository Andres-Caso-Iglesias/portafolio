import { Lang } from '@/i18n/types';
import { type ChatConfig } from './types';

// ──────────────────────────────────────────────────────────────
// Default Chat Configuration
// ──────────────────────────────────────────────────────────────
export const defaultChatConfig: ChatConfig = {
  mode: 'rule-based',
  // Future AI config:
  // mode: "hybrid",
  // aiProvider: "gemini",
  // apiKey: process.env.NEXT_PUBLIC_AI_API_KEY,
  // maxTokens: 150,
};

// ──────────────────────────────────────────────────────────────
// System Prompts for AI Mode (future)
// ──────────────────────────────────────────────────────────────
export const systemPrompts: Record<Lang, string> = {
  es: `Eres el pinche virtual del portafolio de Andrés Caso Iglesias.
       Tu función es responder preguntas sobre su perfil profesional.
       Sé conciso, profesional y amable.
       Si no sabes la respuesta, di que pueden contactarle directamente.
       Responde en máximo 2-3 oraciones.`,
  en: `You are the virtual sous-chef for Andrés Caso Iglesias' portfolio.
       Your function is to answer questions about his professional profile.
       Be concise, professional, and friendly.
       If you don't know the answer, say they can contact him directly.
       Respond in 2-3 sentences maximum.`,
};
