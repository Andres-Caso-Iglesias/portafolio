import { Lang } from '@/i18n/types';

// ──────────────────────────────────────────────────────────────
// Default Fallback Response
// ──────────────────────────────────────────────────────────────
export const fallbackResponse: Record<Lang, string> = {
  es: 'No estoy seguro de haber entendido tu pregunta. Puedo ayudarte con información sobre mi experiencia, habilidades, formación, proyectos, certificaciones, idiomas, seguridad, arquitectura, testing o contacto. ¿Qué te gustaría saber?',
  en: "I'm not sure I understood your question. I can help with information about my experience, skills, education, projects, certifications, languages, security, architecture, testing, or contact. What would you like to know?",
};

// ──────────────────────────────────────────────────────────────
// Welcome Message
// ──────────────────────────────────────────────────────────────
export const welcomeMessage: Record<Lang, string> = {
  es: '¡Hola! Soy el pinche de Andrés. Puedo responder preguntas sobre su perfil profesional. ¿Qué te gustaría saber?',
  en: "Hello! I'm Andrés' sous-chef. I can answer questions about his professional profile. What would you like to know?",
};

// ──────────────────────────────────────────────────────────────
// Affirmative Response Keywords (for detecting "yes" type answers)
// ──────────────────────────────────────────────────────────────
export const affirmativeKeywords: string[] = [
  // Español
  'sí',
  'si',
  'claro',
  'dale',
  'por favor',
  'pf',
  'ok',
  'vale',
  'guay',
  'perfecto',
  'excelente',
  'genial',
  'por supuesto',
  'desde luego',
  'obvio',
  'ya',
  'ya quiero',
  'quiero',
  'me gustaría',
  'gustaría',
  // Inglés
  'yes',
  'yep',
  'yeah',
  'sure',
  'please',
  'ok',
  'okay',
  'definitely',
  'absolutely',
  'of course',
  'why not',
  "I'd like",
  'i would like',
  'I want',
  'want',
];
