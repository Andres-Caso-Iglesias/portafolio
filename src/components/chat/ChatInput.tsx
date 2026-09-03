'use client';

import { type KeyboardEvent } from 'react';

// ──────────────────────────────────────────────────────────────
// ChatInput Props
// ──────────────────────────────────────────────────────────────
interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (content: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

// ──────────────────────────────────────────────────────────────
// ChatInput Component
// ──────────────────────────────────────────────────────────────
export function ChatInput({
  value,
  onChange,
  onSend,
  disabled = false,
  placeholder = 'Escribe tu pregunta...',
}: ChatInputProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) {
        onSend(value);
      }
    }
  };

  const handleSend = () => {
    if (value.trim() && !disabled) {
      onSend(value);
    }
  };

  return (
    <div className="flex items-end gap-2 p-3 bg-neutral-100 dark:bg-slate-800 border-t border-neutral-200 dark:border-slate-700">
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder}
        rows={1}
        className="flex-1 resize-none bg-white dark:bg-slate-700 text-neutral-900 dark:text-white rounded-xl px-4 py-2.5 text-sm 
                   placeholder-neutral-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500
                   disabled:opacity-50 disabled:cursor-not-allowed
                   min-h-[44px] max-h-[120px]"
        style={{ height: 'auto' }}
      />
      <button
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-600 text-white
                   flex items-center justify-center
                   hover:bg-blue-700 active:scale-95
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600
                   transition-all duration-150"
        aria-label="Enviar mensaje"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
        </svg>
      </button>
    </div>
  );
}
