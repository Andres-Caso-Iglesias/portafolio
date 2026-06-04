import { Lang } from "@/i18n/types";
import {
  chatResponses,
  fallbackResponse,
  followUpResponses,
  affirmativeKeywords,
  type ChatResponse,
  type FollowUpResponse,
  type ChatConfig,
} from "@/data/chatData";

// ──────────────────────────────────────────────────────────────
// Text Normalization (for better keyword matching)
// ──────────────────────────────────────────────────────────────
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[¿¡!?,.;:\"']/g, "") // Remove punctuation
    .replace(/\s+/g, " ") // Collapse whitespace
    .trim();
}

// ──────────────────────────────────────────────────────────────
// Tokenize text into individual words
// ──────────────────────────────────────────────────────────────
export function tokenize(text: string): string[] {
  return normalizeText(text)
    .split(" ")
    .filter((word) => word.length > 1); // Filter single chars
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
export function calculateMatchScore(
  userInput: string,
  keywords: string[]
): number {
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
    if (normalizedInput.includes(normalizedKeyword) || normalizedKeyword.includes(normalizedInput)) {
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

      // Partial token match (one contains the other)
      if (token.includes(normalizedKeyword) || normalizedKeyword.includes(token)) {
        totalScore += 3;
        matchCount++;
        break;
      }

      // Fuzzy match (typo tolerance)
      if (isFuzzyMatch(token, normalizedKeyword)) {
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
  responses: ChatResponse[] = chatResponses,
  threshold: number = 0.15 // Lower threshold to catch more queries
): ChatResponse | null {
  let bestMatch: ChatResponse | null = null;
  let bestScore = 0;

  for (const response of responses) {
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
export function getResponseMessage(
  response: ChatResponse | null,
  lang: Lang
): string {
  if (!response) {
    return fallbackResponse[lang];
  }
  return response.message[lang];
}

// ──────────────────────────────────────────────────────────────
// Main chat processing function (Rule-Based with Context)
// ──────────────────────────────────────────────────────────────
export function processUserMessage(
  userInput: string,
  lang: Lang,
  lastTopic: string | null = null,
  _config: ChatConfig = { mode: "rule-based" }
): { response: string; topic: string | null } {
  // 1. First, check if this is a follow-up response to a previous topic
  const followUpResponse = findFollowUpResponse(userInput, lastTopic, lang);
  if (followUpResponse) {
    return { response: followUpResponse, topic: null }; // Reset topic after follow-up
  }

  // 2. Otherwise, find the best matching response
  const bestMatch = findBestResponse(userInput);
  const response = getResponseMessage(bestMatch, lang);
  
  // Return the topic ID if a match was found
  return { 
    response, 
    topic: bestMatch?.id || null 
  };

  // Future AI integration placeholder:
  // if (config.mode === "ai" || config.mode === "hybrid") {
  //   const aiResponse = await callAIProvider(userInput, lang, config);
  //   if (aiResponse) return aiResponse;
  // }
  //
  // // Fallback to rule-based if AI fails or in hybrid mode
  // const bestMatch = findBestResponse(userInput);
  // return getResponseMessage(bestMatch, lang);
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

// ──────────────────────────────────────────────────────────────
// Future: AI Provider Interface
// ──────────────────────────────────────────────────────────────
export interface AIProvider {
  name: string;
  generateResponse(input: string, lang: Lang, config: ChatConfig): Promise<string | null>;
}

// Placeholder for future Gemini integration
// export class GeminiProvider implements AIProvider {
//   name = "gemini";
//   async generateResponse(input: string, lang: Lang, config: ChatConfig): Promise<string | null> {
//     // TODO: Implement Gemini API call
//     return null;
//   }
// }
