'use client';

import { useState } from 'react';
import type { Snippet } from '@/lib/snippetLoaderClient';
import { useLanguage, t } from '@/lib/i18n';

const CODE_PLATE = [
  'rounded-lg border border-neutral-200 dark:border-slate-700',
  'bg-neutral-950 overflow-hidden shadow-lg',
].join(' ');

const CODE_HEADER = [
  'bg-neutral-900 dark:bg-slate-800 px-4 py-2',
  'border-b border-slate-700 flex items-center justify-between gap-3',
].join(' ');

const CODE_BODY = [
  'p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed',
  'text-neutral-100 bg-neutral-950',
].join(' ');

const CONTROL_RING = [
  'focus-visible:outline-none',
  'focus-visible:ring-2',
  'focus-visible:ring-blue-500',
  'focus-visible:ring-offset-2',
  'focus-visible:ring-offset-neutral-900',
  'dark:focus-visible:ring-offset-slate-800',
].join(' ');

const COPY_BUTTON = [
  'min-h-7 px-3 py-1 rounded text-xs font-mono transition-colors shrink-0',
  'bg-neutral-300 dark:bg-slate-700 hover:bg-neutral-400 dark:hover:bg-slate-600',
  'text-neutral-800 dark:text-slate-200',
  CONTROL_RING,
].join(' ');

const EXPAND_BUTTON = [
  'min-h-7 px-2 py-1 rounded text-xs font-medium transition-colors',
  'text-blue-400 hover:text-blue-300',
  CONTROL_RING,
].join(' ');

const COLLAPSED_LINES = 24;

interface SnippetViewerProps {
  snippets: Snippet[];
  emptyLabel?: string;
}

export default function SnippetViewer({ snippets, emptyLabel }: SnippetViewerProps) {
  const { lang } = useLanguage();
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  if (!snippets || snippets.length === 0) {
    return (
      <p className="text-neutral-500 dark:text-slate-400">
        {emptyLabel ?? t(lang, 'project.snippetsEmpty')}
      </p>
    );
  }

  const handleCopy = async (snippet: Snippet) => {
    if (!navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(snippet.content);
      setCopiedPath(snippet.path);
      setTimeout(() => setCopiedPath(null), 1500);
    } catch {
      // clipboard access denied; silent fallback
    }
  };

  return (
    <div className="space-y-6">
      {snippets.map(snippet => {
        const fileName = snippet.path.split('/').pop() ?? snippet.path;
        const isCopied = copiedPath === snippet.path;
        const lines = snippet.content.split(/\r?\n/);
        const isCollapsible = lines.length > COLLAPSED_LINES;
        const isExpanded = expanded[snippet.path] === true;
        const visibleContent =
          isCollapsible && !isExpanded
            ? lines.slice(0, COLLAPSED_LINES).join('\n')
            : snippet.content;
        return (
          <div key={snippet.path} className={CODE_PLATE}>
            <div className={CODE_HEADER}>
              <span className="min-w-0 truncate text-xs font-mono text-blue-400">{fileName}</span>
              <span className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(snippet)}
                  className={COPY_BUTTON}
                  aria-label={t(lang, 'project.copyCodeAria', { file: fileName })}
                >
                  {isCopied ? t(lang, 'project.copyCodeDone') : t(lang, 'project.copyCode')}
                </button>
                <span className="sr-only" role="status" aria-live="polite">
                  {isCopied ? t(lang, 'project.copyCodeDone') : ''}
                </span>
              </span>
            </div>
            <div tabIndex={0} role="region" aria-label={fileName} className={CODE_BODY}>
              <pre>
                <code className={`language-${snippet.language}`}>{visibleContent}</code>
              </pre>
            </div>
            {isCollapsible && (
              <div className="border-t border-slate-700 bg-neutral-900 px-4 py-2 dark:bg-slate-800">
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  onClick={() => setExpanded(prev => ({ ...prev, [snippet.path]: !isExpanded }))}
                  className={EXPAND_BUTTON}
                >
                  {isExpanded ? t(lang, 'project.viewLessCode') : t(lang, 'project.viewFullCode')}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
