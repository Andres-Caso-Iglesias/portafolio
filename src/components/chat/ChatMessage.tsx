import { type ChatMessage as ChatMessageType } from "@/hooks/useChat";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";

// ──────────────────────────────────────────────────────────────
// Parse links in text (converts URLs and [text](url) to clickable links)
// ──────────────────────────────────────────────────────────────
function parseLinks(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  
  // Match markdown-style links: [text](url)
  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  // Match plain URLs
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
  // Match email addresses
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/g;
  
  // Dangerous protocols to reject
  const DANGEROUS_PROTOCOLS = ["javascript:", "data:", "vbscript:", "file:", "about:"];
  
  function isSafeUrl(url: string): boolean {
    const lower = url.toLowerCase().trim();
    return !DANGEROUS_PROTOCOLS.some((proto) => lower.startsWith(proto));
  }
  
  function sanitizeUrl(url: string): string {
    if (!isSafeUrl(url)) {
      return "#"; // Safe fallback
    }
    // Ensure http/https URLs are absolute
    if (url.startsWith("www.")) {
      return `https://${url}`;
    }
    return url;
  }
  
  let lastIndex = 0;
  let match;
  
  // First, handle markdown-style links
  const fullText = text;
  const markdownMatches: Array<{ start: number; end: number; text: string; url: string }> = [];
  
  while ((match = markdownLinkRegex.exec(fullText)) !== null) {
    const url = sanitizeUrl(match[2]);
    markdownMatches.push({
      start: match.index,
      end: match.index + match[0].length,
      text: match[1],
      url,
    });
  }
  
  // If no markdown links, check for plain URLs and emails
  if (markdownMatches.length === 0) {
    // Check for plain URLs
    while ((match = urlRegex.exec(fullText)) !== null) {
      const url = sanitizeUrl(match[0]);
      markdownMatches.push({
        start: match.index,
        end: match.index + match[0].length,
        text: match[0],
        url,
      });
    }
    
    // Check for emails
    while ((match = emailRegex.exec(fullText)) !== null) {
      const url = sanitizeUrl(`mailto:${match[0]}`);
      markdownMatches.push({
        start: match.index,
        end: match.index + match[0].length,
        text: match[0],
        url,
      });
    }
  }
  
  // Sort by position
  markdownMatches.sort((a, b) => a.start - b.start);
  
  // Build result
  lastIndex = 0;
  for (const m of markdownMatches) {
    // Add text before the link
    if (m.start > lastIndex) {
      parts.push(fullText.slice(lastIndex, m.start));
    }
    
    // Add the link
    parts.push(
      <a
        key={m.start}
        href={m.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-300 underline"
      >
        {m.text}
      </a>
    );
    
    lastIndex = m.end;
  }
  
  // Add remaining text
  if (lastIndex < fullText.length) {
    parts.push(fullText.slice(lastIndex));
  }
  
  return parts.length > 0 ? parts : [fullText];
}

// ──────────────────────────────────────────────────────────────
// ChatMessage Props
// ──────────────────────────────────────────────────────────────
interface ChatMessageProps {
  message: ChatMessageType;
}

// ──────────────────────────────────────────────────────────────
// ChatMessage Component (Presentational)
// ──────────────────────────────────────────────────────────────
export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === "user";

  return (
    <div
      className={cn(
        "flex w-full mb-3",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "bg-blue-600 text-white rounded-br-md"
            : "bg-slate-700 text-slate-100 rounded-bl-md"
        )}
      >
        <div className="whitespace-pre-wrap break-words">
          {parseLinks(message.content)}
        </div>
        {message.project && (
          <ProjectCard project={message.project} />
        )}
        <span
          className={cn(
            "text-[10px] mt-1 block opacity-50",
            isUser ? "text-right" : "text-left"
          )}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}
