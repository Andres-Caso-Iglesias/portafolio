'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n';
import { processUserMessage, isValidInput, generateMessageId } from '@/lib/chatUtils';
import { defaultChatConfig } from '@/data/chat/config';
import { welcomeMessage, quickActions } from '@/data/chat';
import { type ProjectData } from '@/components/chat/ProjectCard';

// ──────────────────────────────────────────────────────────────
// Message Interface
// ──────────────────────────────────────────────────────────────
export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  project?: ProjectData; // Optional project card data
}

// ──────────────────────────────────────────────────────────────
// Chat State Interface
// ──────────────────────────────────────────────────────────────
export interface ChatState {
  messages: ChatMessage[];
  isOpen: boolean;
  isTyping: boolean;
  inputValue: string;
  quickActions: typeof quickActions;
}

// ──────────────────────────────────────────────────────────────
// Chat Actions Interface
// ──────────────────────────────────────────────────────────────
export interface ChatActions {
  sendMessage: (content: string) => Promise<void>;
  setInputValue: (value: string) => void;
  toggleChat: () => void;
  openChat: () => void;
  closeChat: () => void;
  clearMessages: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

// ──────────────────────────────────────────────────────────────
// useChat Hook
// ──────────────────────────────────────────────────────────────
export function useChat(): ChatState & ChatActions {
  const { lang } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Track the last topic discussed for context-aware follow-ups
  const lastTopicRef = useRef<string | null>(null);

  // Session ID for rate limiting (persisted in sessionStorage)
  const sessionIdRef = useRef<string>('');
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let sid = sessionStorage.getItem('chat-session-id');
    if (!sid) {
      sid = `sess-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      sessionStorage.setItem('chat-session-id', sid);
    }
    sessionIdRef.current = sid;
  }, []);

  // Add welcome message when chat is first opened
  const addWelcomeMessage = useCallback(() => {
    const welcomeMsg: ChatMessage = {
      id: generateMessageId(),
      content: welcomeMessage[lang],
      sender: 'assistant',
      timestamp: new Date(),
    };
    setMessages([welcomeMsg]);
  }, [lang]);

  // Update welcome message when language changes
  useEffect(() => {
    if (messages.length > 0 && messages[0].sender === 'assistant') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMessages(prev => {
        const updated = [...prev];
        updated[0] = {
          ...updated[0],
          content: welcomeMessage[lang],
        };
        return updated;
      });
    }
    // messages is read but not in deps to avoid infinite loop on language switch
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // AI fetcher: calls the server API route, returns null on failure
  const fetchAIResponse = useCallback(
    async (message: string, msgLang: string): Promise<string | null> => {
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message,
            lang: msgLang,
            sessionId: sessionIdRef.current,
          }),
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.response ?? null;
      } catch {
        return null;
      }
    },
    []
  );

  // Send a message
  const sendMessage = useCallback(
    async (content: string) => {
      if (!isValidInput(content)) return;

      // Add user message
      const userMessage: ChatMessage = {
        id: generateMessageId(),
        content: content.trim(),
        sender: 'user',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage]);
      setInputValue('');
      setIsTyping(true);

      try {
        // Process with hybrid mode: AI first, fallback to rule-based
        const {
          response: responseContent,
          topic: newTopic,
          project,
        } = await processUserMessage(
          content,
          lang,
          lastTopicRef.current,
          defaultChatConfig,
          fetchAIResponse
        );

        // Update the last topic for context tracking
        lastTopicRef.current = newTopic;

        const assistantMessage: ChatMessage = {
          id: generateMessageId(),
          content: responseContent,
          sender: 'assistant',
          timestamp: new Date(),
          project,
        };

        setMessages(prev => [...prev, assistantMessage]);
      } finally {
        setIsTyping(false);
      }
    },
    [lang, fetchAIResponse]
  );

  // Toggle chat open/close
  const toggleChat = useCallback(() => {
    setIsOpen(prev => {
      if (!prev) {
        // Opening chat - add welcome message if empty
        if (messages.length === 0) {
          addWelcomeMessage();
        }
      }
      return !prev;
    });
  }, [messages.length, addWelcomeMessage]);

  // Open chat
  const openChat = useCallback(() => {
    setIsOpen(true);
    if (messages.length === 0) {
      addWelcomeMessage();
    }
  }, [messages.length, addWelcomeMessage]);

  // Close chat
  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Clear all messages
  const clearMessages = useCallback(() => {
    setMessages([]);
    lastTopicRef.current = null; // Reset topic tracking
    addWelcomeMessage();
  }, [addWelcomeMessage]);

  return {
    // State
    messages,
    isOpen,
    isTyping,
    inputValue,
    quickActions: quickActions,
    // Actions
    sendMessage,
    setInputValue,
    toggleChat,
    openChat,
    closeChat,
    clearMessages,
    // Ref for scroll
    messagesEndRef,
  };
}
