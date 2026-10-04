'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useChat } from '@/hooks/useChat';
import { useLanguage, t } from '@/lib/i18n';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { cn } from '@/lib/utils';

// ──────────────────────────────────────────────────────────────
// Chat Component (Container)
// ──────────────────────────────────────────────────────────────
export function Chat() {
  const {
    messages,
    isOpen,
    isTyping,
    inputValue,
    quickActions,
    sendMessage,
    setInputValue,
    toggleChat,
    closeChat,
    messagesEndRef,
  } = useChat();

  const { lang } = useLanguage();

  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    } else if (wasOpenRef.current) {
      launcherRef.current?.focus();
    }
    wasOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeChat();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeChat]);

  const handleQuickAction = (keywords: string[]) => {
    // Use the first keyword as the search term
    const searchTerm = keywords[0];
    sendMessage(searchTerm);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        ref={launcherRef}
        onClick={toggleChat}
        aria-label={t(lang, isOpen ? 'chat.close' : 'chat.open')}
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
          // Close icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-white dark:text-white"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          // Custom chat icon
          <Image src="/chat.png" alt="" width={40} height={40} className="w-10 h-10" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label={t(lang, 'chat.dialogLabel')}
          className={cn(
            'fixed bottom-24 right-6 z-50',
            'w-[380px] max-w-[calc(100vw-3rem)]',
            'bg-white dark:bg-slate-900 rounded-lg shadow-2xl',
            'border border-neutral-200 dark:border-slate-700',
            'flex flex-col',
            'overflow-hidden'
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-neutral-100 dark:bg-slate-800 border-b border-neutral-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 dark:bg-blue-700 flex items-center justify-center">
                <span className="text-white dark:text-white font-semibold text-sm">AC</span>
              </div>
              <div>
                <h3 className="text-neutral-900 dark:text-white font-medium text-sm">
                  {t(lang, 'chat.title')}
                </h3>
                <p className="text-neutral-600 dark:text-slate-400 text-xs">
                  {t(lang, 'chat.subtitle')}
                </p>
              </div>
            </div>
            <button
              onClick={closeChat}
              className="text-neutral-600 dark:text-slate-400 hover:text-neutral-900 dark:hover:text-white transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label={t(lang, 'chat.close')}
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

          {/* Messages Container */}
          <div
            role="log"
            aria-live="polite"
            className="flex-1 overflow-y-auto p-4 space-y-1 min-h-[300px] max-h-[400px]"
          >
            {messages.map(message => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start mb-3" role="status">
                <span className="sr-only">{t(lang, 'chat.typing')}</span>
                <div
                  aria-hidden="true"
                  className="bg-neutral-200 dark:bg-slate-700 text-neutral-800 dark:text-slate-100 rounded-2xl rounded-bl-md px-4 py-3"
                >
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-neutral-400 dark:bg-slate-400 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-neutral-400 dark:bg-slate-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.1s' }}
                    />
                    <div
                      className="w-2 h-2 bg-neutral-400 dark:bg-slate-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-3">
              <p className="text-neutral-600 dark:text-slate-400 text-xs mb-2">
                {t(lang, 'chat.quickActions')}
              </p>
              <div className="flex flex-wrap gap-2">
                {quickActions.map(action => (
                  <button
                    key={action.id}
                    onClick={() => handleQuickAction(action.keywords)}
                    className="px-3 py-1.5 text-xs bg-neutral-100 dark:bg-slate-800 text-neutral-700 dark:text-slate-300 rounded-lg hover:bg-neutral-200 dark:hover:bg-slate-700 hover:text-neutral-900 dark:hover:text-white transition-colors duration-150"
                  >
                    {action.label[lang]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <ChatInput
            value={inputValue}
            onChange={setInputValue}
            onSend={sendMessage}
            disabled={isTyping}
            inputRef={inputRef}
            placeholder={t(lang, 'chat.placeholder')}
            sendLabel={t(lang, 'chat.send')}
          />
        </div>
      )}
    </>
  );
}
