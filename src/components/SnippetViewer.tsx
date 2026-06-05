"use client";

import { useState } from "react";
import type { Snippet } from "@/lib/snippetLoaderClient";

interface SnippetViewerProps {
  snippets: Snippet[];
  emptyLabel?: string;
}

export default function SnippetViewer({ snippets, emptyLabel = "No hay snippets disponibles." }: SnippetViewerProps) {
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  if (!snippets || snippets.length === 0) {
    return <p className="text-slate-400">{emptyLabel}</p>;
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
      {snippets.map((snippet) => {
        const fileName = snippet.path.split("/").pop() ?? snippet.path;
        const isCopied = copiedPath === snippet.path;
        return (
          <div
            key={snippet.path}
            className="bg-[#0f172a] rounded-lg border border-slate-700 overflow-hidden shadow-lg"
          >
            <div className="bg-slate-800/80 px-4 py-2 border-b border-slate-700 flex items-center justify-between">
              <span className="text-xs font-mono text-blue-400">{fileName}</span>
              <button
                type="button"
                onClick={() => handleCopy(snippet)}
                className="px-2 py-1 bg-slate-700 hover:bg-slate-600 text-xs rounded text-slate-200 transition-colors font-mono"
                aria-label={`Copy snippet ${fileName}`}
              >
                {isCopied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="p-4 overflow-x-auto text-xs sm:text-sm text-slate-300 font-mono leading-relaxed bg-[#0d1117]">
              <pre>
                <code className={`language-${snippet.language}`}>{snippet.content}</code>
              </pre>
            </div>
          </div>
        );
      })}
    </div>
  );
}
