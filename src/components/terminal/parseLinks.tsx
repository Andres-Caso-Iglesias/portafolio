import React from 'react';

const MARKDOWN_LINK_REGEX = /\[([^\]]+)\]\(([^)]+)\)/g;
const URL_REGEX = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
const EMAIL_REGEX = /[\w.-]+@[\w.-]+\.\w+/g;

const DANGEROUS_PROTOCOLS = ['javascript:', 'data:', 'vbscript:', 'file:', 'about:'];

function isSafeUrl(url: string): boolean {
  const lower = url.toLowerCase().trim();
  return !DANGEROUS_PROTOCOLS.some(proto => lower.startsWith(proto));
}

function sanitizeUrl(url: string): string {
  if (!isSafeUrl(url)) {
    return '#';
  }
  if (url.startsWith('www.')) {
    return `https://${url}`;
  }
  return url;
}

interface LinkMatch {
  start: number;
  end: number;
  text: string;
  url: string;
}

function collectMatches(text: string): LinkMatch[] {
  const matches: LinkMatch[] = [];
  let match;

  MARKDOWN_LINK_REGEX.lastIndex = 0;
  while ((match = MARKDOWN_LINK_REGEX.exec(text)) !== null) {
    matches.push({
      start: match.index,
      end: match.index + match[0].length,
      text: match[1],
      url: sanitizeUrl(match[2]),
    });
  }

  if (matches.length > 0) return matches;

  URL_REGEX.lastIndex = 0;
  while ((match = URL_REGEX.exec(text)) !== null) {
    matches.push({
      start: match.index,
      end: match.index + match[0].length,
      text: match[0],
      url: sanitizeUrl(match[0]),
    });
  }

  EMAIL_REGEX.lastIndex = 0;
  while ((match = EMAIL_REGEX.exec(text)) !== null) {
    matches.push({
      start: match.index,
      end: match.index + match[0].length,
      text: match[0],
      url: sanitizeUrl(`mailto:${match[0]}`),
    });
  }

  matches.sort((a, b) => a.start - b.start);
  return matches;
}

export function parseLinks(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const matches = collectMatches(text);
  let lastIndex = 0;

  for (const match of matches) {
    if (match.start > lastIndex) {
      parts.push(text.slice(lastIndex, match.start));
    }
    parts.push(
      <a
        key={match.start}
        href={match.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-emerald-400 hover:text-emerald-300 underline"
      >
        {match.text}
      </a>
    );
    lastIndex = match.end;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}
