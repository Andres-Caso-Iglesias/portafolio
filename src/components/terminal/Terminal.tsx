'use client';

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { useLanguage, t } from '@/lib/i18n';
import { useKeySequence } from '@/hooks/useKeySequence';
import { CTRL_K_KEY } from '@/lib/keySequence';
import { useTerminal } from './useTerminal';
import { TerminalLine } from './TerminalLine';
import { cn } from '@/lib/utils';

export function Terminal() {
  const { lines, isTyping, submit, ensureWelcome, linesEndRef } = useTerminal();
  const { lang } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const wasOpenRef = useRef(false);

  useKeySequence({
    sequence: [CTRL_K_KEY],
    onMatch: () => setIsOpen(prev => !prev),
  });

  useEffect(() => {
    if (isOpen) {
      ensureWelcome();
      inputRef.current?.focus();
    } else if (wasOpenRef.current) {
      launcherRef.current?.focus();
    }
    wasOpenRef.current = isOpen;
  }, [isOpen, ensureWelcome]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = inputValue.trim();
    if (!value) return;
    setHistory(prev => [...prev, value]);
    setHistoryIndex(-1);
    setInputValue('');
    void submit(value);
  };

  const handleInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputValue(history[nextIndex]);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInputValue('');
      } else {
        setHistoryIndex(nextIndex);
        setInputValue(history[nextIndex]);
      }
    }
  };

  return (
    <>
      <button
        ref={launcherRef}
        onClick={() => setIsOpen(prev => !prev)}
        aria-label={t(lang, isOpen ? 'terminal.close' : 'terminal.open')}
        aria-expanded={isOpen}
        className={cn(
          'fixed bottom-6 right-6 z-50',
          'w-14 h-14 rounded-full',
          'flex items-center justify-center',
          'bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800',
          'shadow-lg transition-all duration-200',
          'hover:scale-105 active:scale-95',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
          'focus-visible:ring-offset-2 focus-visible:ring-offset-white',
          'dark:focus-visible:ring-offset-slate-900'
        )}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-white"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <span className="font-mono text-white font-bold text-lg" aria-hidden="true">
            {'>_'}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label={t(lang, 'terminal.dialogLabel')}
          className={cn(
            'fixed bottom-24 right-6 z-50',
            'w-[420px] max-w-[calc(100vw-3rem)]',
            'h-[520px] max-h-[70vh]',
            'bg-slate-950 rounded-lg shadow-2xl',
            'border border-emerald-700/40',
            'flex flex-col overflow-hidden'
          )}
        >
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-emerald-800/40">
            <div className="flex items-baseline gap-2 min-w-0">
              <span className="font-mono text-emerald-400 text-sm font-semibold shrink-0">
                {t(lang, 'terminal.title')}
              </span>
              <span className="font-mono text-slate-400 text-xs truncate">
                {t(lang, 'terminal.subtitle')}
              </span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span
                className="hidden sm:inline font-mono text-slate-400 text-xs"
                aria-hidden="true"
              >
                Esc
              </span>
              <button
                onClick={() => setIsOpen(false)}
                aria-label={t(lang, 'terminal.close')}
                className="text-slate-400 hover:text-slate-100 transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div role="log" aria-live="polite" className="flex-1 overflow-y-auto p-4 space-y-1">
            {lines.map(line => (
              <TerminalLine key={line.id} line={line} />
            ))}

            {isTyping && (
              <div role="status" className="font-mono text-[13px] text-slate-400">
                <span className="sr-only">{t(lang, 'terminal.typing')}</span>
                <span aria-hidden="true">...</span>
              </div>
            )}

            <div ref={linesEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-emerald-800/40 px-4 py-3 flex items-center gap-2"
          >
            <span className="font-mono text-emerald-400 select-none" aria-hidden="true">
              {'> '}
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={event => setInputValue(event.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder={t(lang, 'terminal.placeholder')}
              aria-label={t(lang, 'terminal.placeholder')}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              className="flex-1 min-w-0 bg-transparent text-slate-100 placeholder:text-slate-400 font-mono text-[13px] outline-none"
            />
            <button
              type="submit"
              aria-label={t(lang, 'terminal.send')}
              className="font-mono text-emerald-400 hover:text-emerald-300 text-sm px-2 py-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <span aria-hidden="true">{'↵'}</span>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
