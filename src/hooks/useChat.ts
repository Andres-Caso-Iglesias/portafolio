"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Lang } from "@/i18n/types";
import { useLanguage } from "@/lib/i18n";
import { processUserMessage, isValidInput, generateMessageId } from "@/lib/chatUtils";
import { welcomeMessage, quickActions } from "@/data/chatData";
import { type ProjectData } from "@/components/chat/ProjectCard";

// ──────────────────────────────────────────────────────────────
// Message Interface
// ──────────────────────────────────────────────────────────────
export interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "assistant";
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
  sendMessage: (content: string) => void;
  setInputValue: (value: string) => void;
  toggleChat: () => void;
  openChat: () => void;
  closeChat: () => void;
  clearMessages: () => void;
}

// ──────────────────────────────────────────────────────────────
// useChat Hook
// ──────────────────────────────────────────────────────────────
export function useChat(): ChatState & ChatActions {
  const { lang } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Track the last topic discussed for context-aware follow-ups
  const lastTopicRef = useRef<string | null>(null);

  // Add welcome message when chat is first opened
  const addWelcomeMessage = useCallback(() => {
    const welcomeMsg: ChatMessage = {
      id: generateMessageId(),
      content: welcomeMessage[lang],
      sender: "assistant",
      timestamp: new Date(),
    };
    setMessages([welcomeMsg]);
  }, [lang]);

  // Update welcome message when language changes
  useEffect(() => {
    if (messages.length > 0 && messages[0].sender === "assistant") {
      setMessages((prev) => {
        const updated = [...prev];
        updated[0] = {
          ...updated[0],
          content: welcomeMessage[lang],
        };
        return updated;
      });
    }
  }, [lang]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Send a message
  const sendMessage = useCallback(
    (content: string) => {
      if (!isValidInput(content)) return;

      // Add user message
      const userMessage: ChatMessage = {
        id: generateMessageId(),
        content: content.trim(),
        sender: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");
      setIsTyping(true);

      // Simulate typing delay (150-400ms)
      const typingDelay = 150 + Math.random() * 250;

      setTimeout(() => {
        // Process and get response with context
        const { response: responseContent, topic: newTopic, project } = processUserMessage(
          content, 
          lang, 
          lastTopicRef.current
        );

        // Update the last topic for context tracking
        lastTopicRef.current = newTopic;

        const assistantMessage: ChatMessage = {
          id: generateMessageId(),
          content: responseContent,
          sender: "assistant",
          timestamp: new Date(),
          project, // Include project data if available
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setIsTyping(false);
      }, typingDelay);
    },
    [lang]
  );

  // Toggle chat open/close
  const toggleChat = useCallback(() => {
    setIsOpen((prev) => {
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
