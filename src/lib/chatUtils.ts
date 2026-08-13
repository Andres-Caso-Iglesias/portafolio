import { Lang } from '@/i18n/types';
import {
  allResponses,
  fallbackResponse,
  followUpResponses,
  affirmativeKeywords,
  type ChatResponse,
  type ChatConfig,
} from '@/data/chat';
import { type ProjectData } from '@/components/chat/ProjectCard';

// ──────────────────────────────────────────────────────────────
// Project Data for inline display
// ──────────────────────────────────────────────────────────────
const projectsData: Record<string, Record<Lang, ProjectData>> = {
  'project-bolsa': {
    es: {
      name: 'Bolsa de Empleo',
      description:
        'API RESTful completa para gestión de bolsa de empleo con autenticación JWT, roles por usuario (Aspirantes/Empresas), gestión de ofertas laborales, postulaciones y notificaciones.',
      techStack: 'NestJS 11, PostgreSQL, TypeORM, Flutter 3, JWT, Docker',
      detailUrl: 'https://andres-caso-iglesias.vercel.app/projects/bolsa-empleo',
      githubUrl: 'https://github.com/Andres-Caso-Iglesias/Bolsa_Empleo',
    },
    en: {
      name: 'Bolsa de Empleo',
      description:
        'Complete RESTful API for job board management with JWT authentication, role-based users (Applicants/Companies), job offers, applications and notifications.',
      techStack: 'NestJS 11, PostgreSQL, TypeORM, Flutter 3, JWT, Docker',
      detailUrl: 'https://andres-caso-iglesias.vercel.app/projects/bolsa-empleo',
      githubUrl: 'https://github.com/Andres-Caso-Iglesias/Bolsa_Empleo',
    },
  },
  'project-foodbites': {
    es: {
      name: 'FoodBites',
      description:
        'Backend Spring Boot para gestión de food trucks con 6 entidades interrelacionadas. Búsqueda por ubicación geográfica, recomendaciones por tipo de cocina, ranking y cálculo de beneficios.',
      techStack: 'Java 17, Spring Boot 3.2.0, MySQL 8.2, Spring Data JPA, Hibernate, Lombok',
      detailUrl: 'https://andres-caso-iglesias.vercel.app/projects/foodbites',
      githubUrl: 'https://github.com/Andres-Caso-Iglesias/FoodBites',
    },
    en: {
      name: 'FoodBites',
      description:
        'Spring Boot backend for food truck management with 6 interrelated entities. Geographic location search, cuisine recommendations, ranking and profit calculation.',
      techStack: 'Java 17, Spring Boot 3.2.0, MySQL 8.2, Spring Data JPA, Hibernate, Lombok',
      detailUrl: 'https://andres-caso-iglesias.vercel.app/projects/foodbites',
      githubUrl: 'https://github.com/Andres-Caso-Iglesias/FoodBites',
    },
  },
  'project-huertos': {
    es: {
      name: 'Gestor Huertos Urbanos',
      description:
        'Aplicación web para gestión de huertos urbanos con CRUD completo. Frontend con Bootstrap 5 y vanilla JS, backend Spring Boot.',
      techStack: 'Java 17, Spring Boot 3.2.0, MySQL 8.2, JPA/Hibernate, Bootstrap 5',
      detailUrl: 'https://andres-caso-iglesias.vercel.app/projects/gestor-huertos',
      githubUrl: 'https://github.com/Andres-Caso-Iglesias/Gestor_Huertos_Urbanos',
    },
    en: {
      name: 'Gestor Huertos Urbanos',
      description:
        'Web application for urban garden management with full CRUD. Frontend with Bootstrap 5 and vanilla JS, Spring Boot backend.',
      techStack: 'Java 17, Spring Boot 3.2.0, MySQL 8.2, JPA/Hibernate, Bootstrap 5',
      detailUrl: 'https://andres-caso-iglesias.vercel.app/projects/gestor-huertos',
      githubUrl: 'https://github.com/Andres-Caso-Iglesias/Gestor_Huertos_Urbanos',
    },
  },
  'project-auditoria': {
    es: {
      name: 'Auditoria de Seguridad',
      description:
        'Herramienta de auditoría de seguridad web que analiza vulnerabilidades OWASP Top 10. Backend NestJS con endpoints para análisis, frontend React con resultados visualizados.',
      techStack: 'NestJS 11, React 19, TypeScript, OWASP',
      detailUrl: 'https://andres-caso-iglesias.vercel.app/projects/auditoria-web',
      githubUrl: 'https://github.com/Andres-Caso-Iglesias/Auditoria-web',
    },
    en: {
      name: 'Security Audit',
      description:
        'Web security auditing tool that analyzes OWASP Top 10 vulnerabilities. NestJS backend with analysis endpoints, React frontend with visualized results.',
      techStack: 'NestJS 11, React 19, TypeScript, OWASP',
      detailUrl: 'https://andres-caso-iglesias.vercel.app/projects/auditoria-web',
      githubUrl: 'https://github.com/Andres-Caso-Iglesias/Auditoria-web',
    },
  },
  'project-portfolio': {
    es: {
      name: 'Portafolio Profesional',
      description:
        'Este portafolio con arquitectura en capas, chat interactivo bilingüe, timeline de experiencia y grid de proyectos.',
      techStack: 'Next.js 16, React 19, TypeScript, Tailwind CSS v4',
      detailUrl: 'https://github.com/Andres-Caso-Iglesias/portafolio',
      githubUrl: 'https://github.com/Andres-Caso-Iglesias/portafolio',
    },
    en: {
      name: 'Professional Portfolio',
      description:
        'This portfolio with layered architecture, bilingual interactive chat, experience timeline and project grid.',
      techStack: 'Next.js 16, React 19, TypeScript, Tailwind CSS v4',
      detailUrl: 'https://github.com/Andres-Caso-Iglesias/portafolio',
      githubUrl: 'https://github.com/Andres-Caso-Iglesias/portafolio',
    },
  },
};

// ──────────────────────────────────────────────────────────────
// Get project data for inline display
// ──────────────────────────────────────────────────────────────
function getProjectData(topicId: string | null, lang: Lang): ProjectData | undefined {
  if (!topicId || !topicId.startsWith('project-')) return undefined;
  return projectsData[topicId]?.[lang];
}

// ──────────────────────────────────────────────────────────────
// Text Normalization (for better keyword matching)
// ──────────────────────────────────────────────────────────────
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[¿¡!?,.;:"']/g, '') // Remove punctuation
    .replace(/\s+/g, ' ') // Collapse whitespace
    .trim();
}

// ──────────────────────────────────────────────────────────────
// Tokenize text into individual words
// ──────────────────────────────────────────────────────────────
export function tokenize(text: string): string[] {
  return normalizeText(text)
    .split(' ')
    .filter(word => word.length > 1); // Filter single chars
}

// ──────────────────────────────────────────────────────────────
// Simple fuzzy match (Levenshtein distance <= 2)
// ──────────────────────────────────────────────────────────────
function isFuzzyMatch(input: string, keyword: string): boolean {
  // Skip fuzzy for very short words
  if (input.length < 3 || keyword.length < 3) return false;

  // Quick check: first and last char must match
  if (input[0] !== keyword[0] || input[input.length - 1] !== keyword[keyword.length - 1]) {
    return false;
  }

  // Calculate Levenshtein distance
  const matrix: number[][] = [];
  for (let i = 0; i <= keyword.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= input.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= keyword.length; i++) {
    for (let j = 1; j <= input.length; j++) {
      const cost = keyword[i - 1] === input[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  const distance = matrix[keyword.length][input.length];
  // Allow distance of 1-2 depending on word length
  const maxDistance = keyword.length <= 5 ? 1 : 2;
  return distance <= maxDistance;
}

// ──────────────────────────────────────────────────────────────
// Calculate match score between user input and keywords
// Returns a score between 0 and 1 (0 = no match, 1 = perfect match)
// ──────────────────────────────────────────────────────────────
export function calculateMatchScore(userInput: string, keywords: string[]): number {
  const normalizedInput = normalizeText(userInput);
  const tokens = tokenize(userInput);

  if (tokens.length === 0 && normalizedInput.length === 0) return 0;

  // For single word inputs, give higher weight to exact matches
  const isSingleWord = tokens.length === 1;

  let totalScore = 0;
  let matchCount = 0;

  for (const keyword of keywords) {
    const normalizedKeyword = normalizeText(keyword);

    // Skip empty keywords
    if (!normalizedKeyword) continue;

    // 1. Exact phrase match in input (highest confidence)
    if (normalizedInput === normalizedKeyword) {
      totalScore += 10; // Very high score for exact match
      matchCount++;
      continue;
    }

    // 2. Keyword contains the input or input contains keyword (strong match)
    if (
      normalizedInput.includes(normalizedKeyword) ||
      normalizedKeyword.includes(normalizedInput)
    ) {
      // Longer keywords matching = better
      const lengthBonus = normalizedKeyword.length / 10;
      totalScore += 5 + lengthBonus;
      matchCount++;
      continue;
    }

    // 3. Token-level matching
    for (const token of tokens) {
      // Exact token match
      if (token === normalizedKeyword) {
        totalScore += 4;
        matchCount++;
        break;
      }

      // Partial token match - ONLY for single-word keywords (no spaces)
      // For multi-word keywords, require exact phrase match or multiple tokens
      const keywordIsPhrase = normalizedKeyword.includes(' ');
      if (
        !keywordIsPhrase &&
        (token.includes(normalizedKeyword) || normalizedKeyword.includes(token))
      ) {
        totalScore += 3;
        matchCount++;
        break;
      }

      // For multi-word keywords, check if at least 2 tokens match
      if (keywordIsPhrase) {
        const keywordTokens = normalizedKeyword.split(' ').filter(t => t.length > 1);
        let matchingTokens = 0;
        for (const kwToken of keywordTokens) {
          if (tokens.includes(kwToken)) {
            matchingTokens++;
          }
        }
        if (matchingTokens >= 2) {
          totalScore += 4;
          matchCount++;
          break;
        }
      }

      // Fuzzy match (typo tolerance) - only for single-word keywords
      if (!keywordIsPhrase && isFuzzyMatch(token, normalizedKeyword)) {
        totalScore += 2;
        matchCount++;
        break;
      }
    }
  }

  // Normalize based on number of matches vs keywords
  // More matches = higher confidence
  const matchRatio = matchCount / Math.min(keywords.length, 5);

  // Bonus for single-word exact matches
  const singleWordBonus = isSingleWord && matchCount > 0 ? 0.3 : 0;

  // Calculate final score (0-1 range)
  const rawScore = Math.min(totalScore / 8, 1) * matchRatio + singleWordBonus;
  return Math.min(rawScore, 1);
}

// ──────────────────────────────────────────────────────────────
// Detect if user input is an affirmative response
// ──────────────────────────────────────────────────────────────
export function isAffirmativeResponse(userInput: string): boolean {
  const normalizedInput = normalizeText(userInput);
  const tokens = tokenize(userInput);

  // Check if any token matches an affirmative keyword
  for (const token of tokens) {
    for (const keyword of affirmativeKeywords) {
      const normalizedKeyword = normalizeText(keyword);
      if (token === normalizedKeyword || normalizedInput.includes(normalizedKeyword)) {
        return true;
      }
    }
  }

  return false;
}

// ──────────────────────────────────────────────────────────────
// Find follow-up response based on context
// ──────────────────────────────────────────────────────────────
export function findFollowUpResponse(
  userInput: string,
  lastTopic: string | null,
  lang: Lang
): string | null {
  if (!lastTopic) return null;

  // Check if user input is affirmative
  const isAffirmative = isAffirmativeResponse(userInput);

  // Find follow-up response for the last topic
  for (const followUp of followUpResponses) {
    if (followUp.triggerTopic === lastTopic) {
      if (isAffirmative) {
        return followUp.message[lang];
      }
    }
  }

  return null;
}

// ──────────────────────────────────────────────────────────────
// Find best matching response
// ──────────────────────────────────────────────────────────────
export function findBestResponse(
  userInput: string,
  responses: ChatResponse[] = allResponses,
  threshold: number = 0.15 // Lower threshold to catch more queries
): ChatResponse | null {
  let bestMatch: ChatResponse | null = null;
  let bestScore = 0;

  // FIRST: Check for specific project matches (higher priority)
  const projectResponses = responses.filter(r => r.id.startsWith('project-'));
  for (const response of projectResponses) {
    const score = calculateMatchScore(userInput, response.keywords);
    if (score > bestScore && score >= threshold) {
      bestScore = score;
      bestMatch = response;
    }
  }

  // If we found a project match, return it
  if (bestMatch) {
    return bestMatch;
  }

  // OTHERWISE: Check other categories
  const otherResponses = responses.filter(r => !r.id.startsWith('project-'));
  for (const response of otherResponses) {
    const score = calculateMatchScore(userInput, response.keywords);
    if (score > bestScore && score >= threshold) {
      bestScore = score;
      bestMatch = response;
    }
  }

  // If no match above threshold, try to find ANY match
  if (!bestMatch) {
    for (const response of responses) {
      const score = calculateMatchScore(userInput, response.keywords);
      if (score > bestScore) {
        bestScore = score;
        bestMatch = response;
      }
    }

    // Only use if score is at least 0.1 (something matched)
    if (bestScore < 0.1) {
      return null;
    }
  }

  return bestMatch;
}

// ──────────────────────────────────────────────────────────────
// Get response message in the correct language
// ──────────────────────────────────────────────────────────────
export function getResponseMessage(response: ChatResponse | null, lang: Lang): string {
  if (!response) {
    return fallbackResponse[lang];
  }
  return response.message[lang];
}

// ──────────────────────────────────────────────────────────────
// Rule-based response (pure function, no side effects)
// ──────────────────────────────────────────────────────────────
function getRuleBasedResponse(
  userInput: string,
  lang: Lang,
  lastTopic: string | null
): { response: string; topic: string | null; project?: ProjectData } {
  const followUpResponse = findFollowUpResponse(userInput, lastTopic, lang);
  if (followUpResponse) {
    return { response: followUpResponse, topic: null };
  }

  const bestMatch = findBestResponse(userInput);
  const response = getResponseMessage(bestMatch, lang);
  const project = getProjectData(bestMatch?.id || null, lang);

  return {
    response,
    topic: bestMatch?.id || null,
    project,
  };
}

// ──────────────────────────────────────────────────────────────
// Main chat processing function (Hybrid: AI + Rule-Based fallback)
// ──────────────────────────────────────────────────────────────
export async function processUserMessage(
  userInput: string,
  lang: Lang,
  lastTopic: string | null = null,
  config: ChatConfig = { mode: 'rule-based' },
  aiFetcher?: (message: string, lang: Lang) => Promise<string | null>
): Promise<{
  response: string;
  topic: string | null;
  project?: ProjectData;
  provider?: 'ai' | 'rule-based';
}> {
  // 1. Check for follow-ups first (rule-based, always fast)
  const followUpResponse = findFollowUpResponse(userInput, lastTopic, lang);
  if (followUpResponse) {
    return { response: followUpResponse, topic: null, provider: 'rule-based' };
  }

  // 2. Try AI if mode allows it and fetcher is provided
  if ((config.mode === 'ai' || config.mode === 'hybrid') && aiFetcher) {
    try {
      const aiResponse = await aiFetcher(userInput, lang);
      if (aiResponse && aiResponse.trim().length > 0) {
        return { response: aiResponse, topic: null, provider: 'ai' };
      }
    } catch {
      // AI failed — fall through to rule-based
    }
  }

  // 3. Fallback: rule-based matching
  return { ...getRuleBasedResponse(userInput, lang, lastTopic), provider: 'rule-based' };
}

// ──────────────────────────────────────────────────────────────
// Validate user input
// ──────────────────────────────────────────────────────────────
export function isValidInput(input: string): boolean {
  const trimmed = input.trim();
  return trimmed.length > 0 && trimmed.length <= 500; // Max 500 chars
}

// ──────────────────────────────────────────────────────────────
// Generate unique message ID
// ──────────────────────────────────────────────────────────────
export function generateMessageId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
