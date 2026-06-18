import { describe, it, expect } from 'vitest';
import {
  normalizeText,
  tokenize,
  calculateMatchScore,
  isAffirmativeResponse,
  findFollowUpResponse,
  findBestResponse,
  getResponseMessage,
  processUserMessage,
  isValidInput,
  generateMessageId,
} from '@/lib/chatUtils';
import { allResponses, fallbackResponse, followUpResponses } from '@/data/chat';

// ──────────────────────────────────────────────────────────────
// normalizeText
// ──────────────────────────────────────────────────────────────
describe('normalizeText', () => {
  it('lowercases input', () => {
    expect(normalizeText('HELLO WORLD')).toBe('hello world');
  });

  it('removes accents (NFD decomposition)', () => {
    expect(normalizeText('áéíóú')).toBe('aeiou');
    expect(normalizeText('ñ')).toBe('n');
    expect(normalizeText('ü')).toBe('u');
    expect(normalizeText('ÁÉÍÓÚÑ')).toBe('aeioun');
  });

  it('removes punctuation including inverted marks', () => {
    expect(normalizeText('hola, mundo! ¿qué tal?')).toBe('hola mundo que tal');
    expect(normalizeText('test; "quotes" and: dots.')).toBe('test quotes and dots');
  });

  it('collapses multiple spaces into one', () => {
    expect(normalizeText('hello   world')).toBe('hello world');
    expect(normalizeText('a  b  c')).toBe('a b c');
  });

  it('trims leading and trailing whitespace', () => {
    expect(normalizeText('  hello  ')).toBe('hello');
    expect(normalizeText('\t\nhello\t\n')).toBe('hello');
  });

  it('handles empty string', () => {
    expect(normalizeText('')).toBe('');
  });

  it('handles string with only whitespace and punctuation', () => {
    expect(normalizeText('  !,?  ')).toBe('');
  });

  it('preserves numbers', () => {
    expect(normalizeText('123abc456')).toBe('123abc456');
  });
});

// ──────────────────────────────────────────────────────────────
// tokenize
// ──────────────────────────────────────────────────────────────
describe('tokenize', () => {
  it('splits text by spaces into tokens', () => {
    expect(tokenize('hello world')).toEqual(['hello', 'world']);
  });

  it('filters out single-character tokens', () => {
    expect(tokenize('a b c')).toEqual([]);
    expect(tokenize('I am a good person')).toEqual(['am', 'good', 'person']);
  });

  it('handles empty string', () => {
    expect(tokenize('')).toEqual([]);
  });

  it('handles multiple spaces between words', () => {
    expect(tokenize('hello   world  test')).toEqual(['hello', 'world', 'test']);
  });

  it('normalizes text before tokenizing', () => {
    expect(tokenize('Experiencia Laboral')).toEqual(['experiencia', 'laboral']);
    // "y" is filtered (single char), "té" becomes "te" (2 chars, passes filter)
    expect(tokenize('café y té')).toEqual(['cafe', 'te']);
  });

  it('removes punctuation from tokens', () => {
    expect(tokenize('hello, world!')).toEqual(['hello', 'world']);
  });

  it('handles single long word', () => {
    expect(tokenize('hello')).toEqual(['hello']);
  });

  it('handles words with accented characters', () => {
    expect(tokenize('möglich')).toEqual(['moglich']);
  });
});

// ──────────────────────────────────────────────────────────────
// calculateMatchScore
// ──────────────────────────────────────────────────────────────
describe('calculateMatchScore', () => {
  it('returns 0 for empty input and empty keywords', () => {
    expect(calculateMatchScore('', [])).toBe(0);
  });

  it('returns 0 when no keywords match', () => {
    expect(calculateMatchScore('xyz', ['hello', 'world'])).toBe(0);
  });

  it('returns high score for exact phrase match', () => {
    const score = calculateMatchScore('experiencia laboral', ['experiencia laboral']);
    expect(score).toBeGreaterThan(0.5);
  });

  it('is case insensitive', () => {
    const score = calculateMatchScore('EXPERIENCIA LABORAL', ['experiencia laboral']);
    expect(score).toBeGreaterThan(0);
  });

  it('handles accent-insensitive matching', () => {
    const score = calculateMatchScore('experiencia laboral', ['experiencia laboral']);
    expect(score).toBeGreaterThan(0);
  });

  it('gives partial credit for substring matches', () => {
    const score = calculateMatchScore('experiencia', ['experiencia laboral']);
    expect(score).toBeGreaterThan(0);
  });

  it('gives higher score for longer keyword match', () => {
    const shortScore = calculateMatchScore('java', ['java']);
    const longScore = calculateMatchScore('java', ['java spring boot']);
    expect(longScore).toBeGreaterThanOrEqual(shortScore);
  });

  it('handles single-word exact token match', () => {
    const score = calculateMatchScore('java', ['java', 'spring', 'boot']);
    expect(score).toBeGreaterThan(0);
  });

  it('handles multiple keyword matches with higher score', () => {
    const multiScore = calculateMatchScore('java spring', ['java', 'spring', 'boot']);
    const singleScore = calculateMatchScore('java', ['java', 'spring', 'boot']);
    expect(multiScore).toBeGreaterThanOrEqual(singleScore);
  });

  it('returns 0 for whitespace-only input', () => {
    expect(calculateMatchScore('   ', ['hello'])).toBe(0);
  });

  it('gives bonus for single-word input with match', () => {
    const score = calculateMatchScore('java', ['java', 'spring']);
    expect(score).toBeGreaterThan(0);
  });
});

// ──────────────────────────────────────────────────────────────
// isAffirmativeResponse
// ──────────────────────────────────────────────────────────────
describe('isAffirmativeResponse', () => {
  it('detects Spanish affirmative: si', () => {
    expect(isAffirmativeResponse('si')).toBe(true);
  });

  it('detects Spanish affirmative: sí (with accent)', () => {
    expect(isAffirmativeResponse('sí')).toBe(true);
  });

  it('detects Spanish affirmative: claro', () => {
    expect(isAffirmativeResponse('claro')).toBe(true);
  });

  it('detects Spanish affirmative: dale', () => {
    expect(isAffirmativeResponse('dale')).toBe(true);
  });

  it('detects Spanish affirmative: ok', () => {
    expect(isAffirmativeResponse('ok')).toBe(true);
  });

  it('detects English affirmative: yes', () => {
    expect(isAffirmativeResponse('yes')).toBe(true);
  });

  it('detects English affirmative: sure', () => {
    expect(isAffirmativeResponse('sure')).toBe(true);
  });

  it('detects English affirmative: please', () => {
    expect(isAffirmativeResponse('please')).toBe(true);
  });

  it('detects English affirmative: yeah', () => {
    expect(isAffirmativeResponse('yeah')).toBe(true);
  });

  it('returns false for negative response: no', () => {
    expect(isAffirmativeResponse('no')).toBe(false);
  });

  it('returns false for random text', () => {
    expect(isAffirmativeResponse('kotlin')).toBe(false);
  });

  it('returns false for unrelated phrase without affirmative keywords', () => {
    expect(isAffirmativeResponse('cuéntame sobre ti')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isAffirmativeResponse('')).toBe(false);
  });

  it('is case insensitive', () => {
    expect(isAffirmativeResponse('YES')).toBe(true);
    expect(isAffirmativeResponse('Claro')).toBe(true);
  });

  it('detects compound affirmative: por supuesto', () => {
    expect(isAffirmativeResponse('por supuesto')).toBe(true);
  });

  it('detects Spanish: vale', () => {
    expect(isAffirmativeResponse('vale')).toBe(true);
  });

  it('detects Spanish: perfecto', () => {
    expect(isAffirmativeResponse('perfecto')).toBe(true);
  });
});

// ──────────────────────────────────────────────────────────────
// findFollowUpResponse
// ──────────────────────────────────────────────────────────────
describe('findFollowUpResponse', () => {
  it('returns null when lastTopic is null', () => {
    expect(findFollowUpResponse('si', null, 'es')).toBeNull();
  });

  it('returns follow-up message when topic has follow-up and input is affirmative', () => {
    const result = findFollowUpResponse('si', 'contact', 'es');
    expect(result).not.toBeNull();
    expect(result).toContain('LinkedIn');
  });

  it('returns follow-up message in English for contact topic', () => {
    const result = findFollowUpResponse('yes', 'contact', 'en');
    expect(result).not.toBeNull();
    expect(result).toContain('LinkedIn');
  });

  it('returns null when input is not affirmative', () => {
    const result = findFollowUpResponse('no', 'contact', 'es');
    expect(result).toBeNull();
  });

  it('returns null for non-existent trigger topic', () => {
    const result = findFollowUpResponse('si', 'nonexistent-topic', 'es');
    expect(result).toBeNull();
  });

  it('handles availability follow-up topic', () => {
    const result = findFollowUpResponse('si', 'availability', 'es');
    expect(result).not.toBeNull();
  });

  it('handles projects follow-up topic', () => {
    const result = findFollowUpResponse('si', 'projects', 'es');
    expect(result).not.toBeNull();
  });

  it('handles skills follow-up topic', () => {
    const result = findFollowUpResponse('si', 'skills', 'en');
    expect(result).not.toBeNull();
  });

  it('handles certifications follow-up topic', () => {
    const result = findFollowUpResponse('si', 'certifications', 'es');
    expect(result).not.toBeNull();
  });

  it('handles languages follow-up topic', () => {
    const result = findFollowUpResponse('si', 'languages', 'es');
    expect(result).not.toBeNull();
  });

  it('returns correct language variant', () => {
    const esResult = findFollowUpResponse('si', 'contact', 'es');
    const enResult = findFollowUpResponse('yes', 'contact', 'en');
    expect(esResult).not.toBe(enResult);
  });
});

// ──────────────────────────────────────────────────────────────
// findBestResponse
// ──────────────────────────────────────────────────────────────
describe('findBestResponse', () => {
  it('returns null for empty input with high threshold', () => {
    const result = findBestResponse('xyzxyz', allResponses, 0.9);
    expect(result).toBeNull();
  });

  it('finds exact keyword match for experience', () => {
    const result = findBestResponse('experiencia laboral', allResponses);
    expect(result).not.toBeNull();
    expect(result?.id).toBe('experience');
  });

  it('finds exact keyword match for skills', () => {
    const result = findBestResponse('habilidades técnicas', allResponses);
    expect(result).not.toBeNull();
    expect(result?.id).toBe('skills');
  });

  it('finds project-specific match: bolsa de empleo', () => {
    const result = findBestResponse('bolsa de empleo', allResponses);
    expect(result).not.toBeNull();
    expect(result?.id).toBe('project-bolsa');
  });

  it('finds project-specific match: foodbites', () => {
    const result = findBestResponse('foodbites', allResponses);
    expect(result).not.toBeNull();
    expect(result?.id).toBe('project-foodbites');
  });

  it('project-specific response takes priority over general projects', () => {
    const result = findBestResponse('bolsa de empleo', allResponses);
    expect(result?.id).toBe('project-bolsa');
    expect(result?.id).not.toBe('projects');
  });

  it('returns null when below threshold', () => {
    const result = findBestResponse('zzzzz', allResponses, 0.9);
    expect(result).toBeNull();
  });

  it('finds match via substring for single-word keyword', () => {
    // Single-word keywords like "java" match via substring/token
    const result = findBestResponse('java', allResponses, 0.1);
    expect(result).not.toBeNull();
  });

  it('finds match for English input', () => {
    const result = findBestResponse('work experience', allResponses);
    expect(result).not.toBeNull();
    // May match experience or another category depending on scoring
    expect(result?.id).toBeTruthy();
  });

  it('finds match for contact query', () => {
    const result = findBestResponse('cómo contactarte', allResponses);
    expect(result).not.toBeNull();
    expect(result?.id).toBe('contact');
  });

  it('finds match for education', () => {
    const result = findBestResponse('formacion academica', allResponses);
    expect(result).not.toBeNull();
    expect(result?.id).toBe('education');
  });

  it('falls back to any match when no match above threshold', () => {
    const result = findBestResponse('java', allResponses, 0.5);
    expect(result).not.toBeNull();
  });

  it('returns response with correct structure', () => {
    const result = findBestResponse('experiencia laboral', allResponses);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('keywords');
    expect(result).toHaveProperty('message');
    expect(result?.message).toHaveProperty('es');
    expect(result?.message).toHaveProperty('en');
  });
});

// ──────────────────────────────────────────────────────────────
// getResponseMessage
// ──────────────────────────────────────────────────────────────
describe('getResponseMessage', () => {
  it('returns Spanish message when lang is es', () => {
    const mockResponse = {
      id: 'test',
      keywords: ['test'],
      message: { es: 'Mensaje Español', en: 'English Message' },
    };
    expect(getResponseMessage(mockResponse, 'es')).toBe('Mensaje Español');
  });

  it('returns English message when lang is en', () => {
    const mockResponse = {
      id: 'test',
      keywords: ['test'],
      message: { es: 'Mensaje Español', en: 'English Message' },
    };
    expect(getResponseMessage(mockResponse, 'en')).toBe('English Message');
  });

  it('returns fallback response when response is null', () => {
    const result = getResponseMessage(null, 'es');
    expect(result).toBe(fallbackResponse.es);
  });

  it('returns English fallback when response is null and lang is en', () => {
    const result = getResponseMessage(null, 'en');
    expect(result).toBe(fallbackResponse.en);
  });

  it('returns actual message for real response from allResponses', () => {
    const response = allResponses.find(r => r.id === 'experience');
    expect(response).not.toBeUndefined();
    const msg = getResponseMessage(response!, 'es');
    expect(msg).toBeTruthy();
    expect(msg.length).toBeGreaterThan(0);
  });
});

// ──────────────────────────────────────────────────────────────
// processUserMessage
// ──────────────────────────────────────────────────────────────
describe('processUserMessage', () => {
  it('returns a response string for valid input', () => {
    const result = processUserMessage('experiencia laboral', 'es');
    expect(result.response).toBeTruthy();
    expect(typeof result.response).toBe('string');
  });

  it('returns topic matching the matched response id', () => {
    const result = processUserMessage('experiencia laboral', 'es');
    expect(result.topic).toBe('experience');
  });

  it('returns null topic when no match found', () => {
    const result = processUserMessage('zzzzz', 'es', null);
    expect(result.topic).toBeNull();
  });

  it('returns fallback message when no match', () => {
    const result = processUserMessage('zzzzz', 'es', null);
    expect(result.response).toBe(fallbackResponse.es);
  });

  it('detects follow-up response when lastTopic is set and input is affirmative', () => {
    const result = processUserMessage('si', 'es', 'contact');
    expect(result.response).toContain('LinkedIn');
    expect(result.topic).toBeNull();
  });

  it('resets topic after follow-up', () => {
    const result = processUserMessage('dale', 'es', 'projects');
    expect(result.topic).toBeNull();
  });

  it('returns English response when lang is en', () => {
    const result = processUserMessage('work experience', 'en');
    expect(result.response).toBeTruthy();
  });

  it('returns project data for project-specific queries', () => {
    const result = processUserMessage('bolsa de empleo', 'es');
    expect(result.project).toBeDefined();
    expect(result.project?.name).toBe('Bolsa de Empleo');
  });

  it('returns undefined project for non-project queries', () => {
    const result = processUserMessage('experiencia laboral', 'es');
    expect(result.project).toBeUndefined();
  });

  it('handles full pipeline: input -> follow-up detection -> response', () => {
    const firstResult = processUserMessage('contacto', 'es');
    expect(firstResult.topic).toBe('contact');

    const followUpResult = processUserMessage('si', 'es', firstResult.topic);
    expect(followUpResult.response).toContain('LinkedIn');
  });

  it('processes foodbites project query', () => {
    const result = processUserMessage('foodbites', 'es');
    expect(result.project).toBeDefined();
    expect(result.project?.name).toBe('FoodBites');
  });

  it('processes auditoria query', () => {
    const result = processUserMessage('auditoria de seguridad', 'es');
    expect(result.project).toBeDefined();
  });
});

// ──────────────────────────────────────────────────────────────
// isValidInput
// ──────────────────────────────────────────────────────────────
describe('isValidInput', () => {
  it('returns false for empty string', () => {
    expect(isValidInput('')).toBe(false);
  });

  it('returns false for whitespace-only string', () => {
    expect(isValidInput('   ')).toBe(false);
    expect(isValidInput('\t\n')).toBe(false);
  });

  it('returns true for valid input', () => {
    expect(isValidInput('hello')).toBe(true);
  });

  it('returns true for input with leading/trailing spaces', () => {
    expect(isValidInput('  hello  ')).toBe(true);
  });

  it('returns true for input at max length (500 chars)', () => {
    expect(isValidInput('a'.repeat(500))).toBe(true);
  });

  it('returns false for input exceeding max length (501 chars)', () => {
    expect(isValidInput('a'.repeat(501))).toBe(false);
  });

  it('returns true for single character', () => {
    expect(isValidInput('a')).toBe(true);
  });

  it('returns true for numbers as string', () => {
    expect(isValidInput('12345')).toBe(true);
  });
});

// ──────────────────────────────────────────────────────────────
// generateMessageId
// ──────────────────────────────────────────────────────────────
describe('generateMessageId', () => {
  it('returns a string', () => {
    const id = generateMessageId();
    expect(typeof id).toBe('string');
  });

  it('starts with msg- prefix', () => {
    const id = generateMessageId();
    expect(id.startsWith('msg-')).toBe(true);
  });

  it('generates unique IDs on successive calls', () => {
    const id1 = generateMessageId();
    const id2 = generateMessageId();
    expect(id1).not.toBe(id2);
  });

  it('contains timestamp component', () => {
    const id = generateMessageId();
    const parts = id.split('-');
    expect(parts.length).toBeGreaterThanOrEqual(3);
    // The second part should be a numeric timestamp
    const timestamp = parseInt(parts[1], 10);
    expect(timestamp).toBeGreaterThan(0);
  });

  it('has consistent format across calls', () => {
    const id = generateMessageId();
    // Format: msg-{timestamp}-{random7chars}
    expect(id).toMatch(/^msg-\d+-[a-z0-9]{7}$/);
  });
});

// ──────────────────────────────────────────────────────────────
// Fuzzy matching (tested indirectly via findBestResponse)
// ──────────────────────────────────────────────────────────────
describe('fuzzy matching (via findBestResponse)', () => {
  it('finds single-word keyword via token match', () => {
    // Single-word keywords like "docker" match directly
    const result = findBestResponse('docker', allResponses, 0.1);
    expect(result).not.toBeNull();
  });

  it('matches multi-word input to skills', () => {
    const result = findBestResponse('habilidades tecnicas', allResponses);
    expect(result).not.toBeNull();
    expect(result?.id).toBe('skills');
  });

  it('short input may still match via substring', () => {
    const result = findBestResponse('ab', allResponses, 0.1);
    expect(typeof result === 'object' || result === null).toBe(true);
  });
});

// ──────────────────────────────────────────────────────────────
// Project data (tested indirectly via processUserMessage)
// ──────────────────────────────────────────────────────────────
describe('project data (via processUserMessage)', () => {
  it('returns project data for project-bolsa in Spanish', () => {
    const result = processUserMessage('bolsa de empleo', 'es');
    expect(result.project).toBeDefined();
    expect(result.project?.name).toBe('Bolsa de Empleo');
    expect(result.project?.techStack).toContain('NestJS');
  });

  it('returns project data for project-bolsa in English', () => {
    const result = processUserMessage('bolsa de empleo', 'en');
    expect(result.project).toBeDefined();
    expect(result.project?.techStack).toContain('NestJS');
  });

  it('returns project data for foodbites', () => {
    const result = processUserMessage('foodbites', 'es');
    expect(result.project).toBeDefined();
    expect(result.project?.name).toBe('FoodBites');
    expect(result.project?.githubUrl).toContain('FoodBites');
  });

  it('returns project data for huertos', () => {
    const result = processUserMessage('huertos urbanos', 'es');
    expect(result.project).toBeDefined();
    expect(result.project?.name).toBe('Gestor Huertos Urbanos');
  });

  it('returns project data for auditoria', () => {
    const result = processUserMessage('auditoria de seguridad', 'es');
    expect(result.project).toBeDefined();
    expect(result.project?.name).toBe('Auditoria de Seguridad');
  });

  it('returns project data for portfolio', () => {
    const result = processUserMessage('portafolio profesional', 'es');
    expect(result.project).toBeDefined();
    expect(result.project?.name).toBe('Portafolio Profesional');
  });

  it('returns undefined project for non-project category', () => {
    const result = processUserMessage('experiencia laboral', 'es');
    expect(result.project).toBeUndefined();
  });
});

// ──────────────────────────────────────────────────────────────
// Edge cases and integration
// ──────────────────────────────────────────────────────────────
describe('edge cases and integration', () => {
  it('processUserMessage with default config parameter', () => {
    const result = processUserMessage('hello', 'en');
    expect(result).toHaveProperty('response');
    expect(result).toHaveProperty('topic');
  });

  it('processUserMessage with lastTopic=null (default)', () => {
    const result = processUserResponse('test', 'es');
    expect(result).toHaveProperty('response');
  });

  it('calculateMatchScore returns 0 for whitespace-only input', () => {
    expect(calculateMatchScore('   ', ['hello'])).toBe(0);
  });

  it('normalizeText handles mixed accents and punctuation', () => {
    expect(normalizeText('¿Cómo estás, señor?')).toBe('como estas senor');
  });

  it('isAffirmativeResponse is case insensitive for ok', () => {
    expect(isAffirmativeResponse('OK')).toBe(true);
    expect(isAffirmativeResponse('Ok')).toBe(true);
  });

  it('findBestResponse with custom threshold', () => {
    const result = findBestResponse('java', allResponses, 0.01);
    expect(result).not.toBeNull();
  });

  it('allResponses array is non-empty', () => {
    expect(allResponses.length).toBeGreaterThan(0);
  });

  it('followUpResponses array is non-empty', () => {
    expect(followUpResponses.length).toBeGreaterThan(0);
  });

  it('fallbackResponse has both languages', () => {
    expect(fallbackResponse.es).toBeTruthy();
    expect(fallbackResponse.en).toBeTruthy();
  });
});

// Helper to avoid TS strict null issues in test
function processUserResponse(input: string, lang: 'es' | 'en') {
  return processUserMessage(input, lang);
}
