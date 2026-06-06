import { Lang } from "@/i18n/types";

// ──────────────────────────────────────────────────────────────
// Chat Response Interface
// ──────────────────────────────────────────────────────────────
export interface ChatResponse {
  id: string;
  keywords: string[];
  message: Record<Lang, string>;
}

// ──────────────────────────────────────────────────────────────
// Follow-Up Response Interface (for context-aware replies)
// ──────────────────────────────────────────────────────────────
export interface FollowUpResponse {
  triggerTopic: string; // The topic that was just discussed
  affirmativeKeywords: string[];
  message: Record<Lang, string>;
}

// ──────────────────────────────────────────────────────────────
// Quick Action Button Interface
// ──────────────────────────────────────────────────────────────
export interface QuickAction {
  id: string;
  label: Record<Lang, string>;
  keywords: string[];
}

// ──────────────────────────────────────────────────────────────
// Chat Config Interface (for future AI integration)
// ──────────────────────────────────────────────────────────────
export interface ChatConfig {
  mode: "rule-based" | "ai" | "hybrid";
  aiProvider?: "gemini" | "openai" | "anthropic";
  apiKey?: string;
  maxTokens?: number;
  systemPrompt?: Record<Lang, string>;
}

// ──────────────────────────────────────────────────────────────
// AI Provider Interface (for future AI integration)
// ──────────────────────────────────────────────────────────────
export interface AIProvider {
  name: string;
  generateResponse(input: string, lang: Lang, config: ChatConfig): Promise<string | null>;
}