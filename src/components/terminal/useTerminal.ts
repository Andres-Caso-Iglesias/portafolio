'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { processUserMessage, isValidInput, generateMessageId } from '@/lib/chatUtils';
import { defaultChatConfig } from '@/data/chat/config';
import {
  parseTerminalCommand,
  getCommandOutput,
  isLangArg,
  type TerminalProjectItem,
} from '@/lib/terminalUtils';
import { projects } from '@/data/projectsData';
import { type TerminalLineData, type TerminalLineKind } from './TerminalLine';

const AI_ENABLED = process.env.NEXT_PUBLIC_AI_ENABLED === 'true';

export interface UseTerminalReturn {
  lines: TerminalLineData[];
  isTyping: boolean;
  submit: (input: string) => Promise<void>;
  clearLines: () => void;
  ensureWelcome: () => void;
  linesEndRef: React.RefObject<HTMLDivElement | null>;
}

function terminalProjects(lang: 'es' | 'en'): TerminalProjectItem[] {
  return projects.map(project => ({
    name: (lang === 'en' ? project.enName : project.name) ?? project.name,
  }));
}

export function useTerminal(): UseTerminalReturn {
  const { lang, setLang, t } = useLanguage();
  const [lines, setLines] = useState<TerminalLineData[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const linesEndRef = useRef<HTMLDivElement>(null);
  const lastTopicRef = useRef<string | null>(null);
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

  useEffect(() => {
    if (linesEndRef.current) {
      linesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [lines, isTyping]);

  const pushLine = useCallback(
    (kind: TerminalLineKind, text: string, project?: TerminalLineData['project']) => {
      setLines(prev => [
        ...prev,
        { id: generateMessageId(), kind, text, ...(project ? { project } : {}) },
      ]);
    },
    []
  );

  const pushMany = useCallback((kind: TerminalLineKind, output: string[]) => {
    setLines(prev => [...prev, ...output.map(text => ({ id: generateMessageId(), kind, text }))]);
  }, []);

  const clearLines = useCallback(() => {
    setLines([]);
    lastTopicRef.current = null;
  }, []);

  const fetchAIResponse = useCallback(
    async (message: string, msgLang: string): Promise<string | null> => {
      if (!AI_ENABLED) return null;
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

  const submit = useCallback(
    async (input: string) => {
      if (!isValidInput(input)) return;

      pushLine('input', input.trim());

      const parsed = parseTerminalCommand(input);

      if (parsed?.command === 'clear') {
        clearLines();
        return;
      }

      if (parsed?.command === 'lang') {
        if (isLangArg(parsed.arg)) {
          setLang(parsed.arg);
          pushLine('system', t('terminal.langChanged'));
        } else {
          pushMany('error', [t('terminal.langUsage')]);
        }
        return;
      }

      if (parsed) {
        const output = getCommandOutput(parsed, {
          t,
          lang,
          projects: terminalProjects(lang),
        });
        if (output) {
          pushMany(output.kind === 'ok' ? 'system' : 'error', output.lines);
        }
        return;
      }

      setIsTyping(true);
      try {
        const { response, topic, project } = await processUserMessage(
          input,
          lang,
          lastTopicRef.current,
          defaultChatConfig,
          fetchAIResponse
        );
        lastTopicRef.current = topic;
        pushLine('assistant', response, project);
      } finally {
        setIsTyping(false);
      }
    },
    [pushLine, pushMany, clearLines, setLang, t, lang, fetchAIResponse]
  );

  const ensureWelcome = useCallback(() => {
    setLines(prev => {
      if (prev.length > 0) return prev;
      return t('terminal.welcome')
        .split('\n')
        .map(text => ({ id: generateMessageId(), kind: 'system' as const, text }));
    });
  }, [t]);

  return {
    lines,
    isTyping,
    submit,
    clearLines,
    ensureWelcome,
    linesEndRef,
  };
}
