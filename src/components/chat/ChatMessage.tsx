import { type ChatMessage as ChatMessageType } from "@/hooks/useChat";
import { cn } from "@/lib/utils";

// ──────────────────────────────────────────────────────────────
// ChatMessage Props
// ──────────────────────────────────────────────────────────────
interface ChatMessageProps {
  message: ChatMessageType;
}

// ──────────────────────────────────────────────────────────────
// Parse markdown links to JSX elements
// ──────────────────────────────────────────────────────────────
function parseMarkdownLinks(text: string): React.ReactNode[] {
  // Match [text](url) pattern
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    // Add the link
    const linkText = match[1];
    const linkUrl = match[2];
    parts.push(
      <a
        key={`link-${match.index}`}
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
      >
        {linkText}
      </a>
    );

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

// ──────────────────────────────────────────────────────────────
// ChatMessage Component (Presentational)
// ──────────────────────────────────────────────────────────────
export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === "user";

  // Parse the message content for markdown links
  const contentParts = parseMarkdownLinks(message.content);

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
        <p className="whitespace-pre-wrap break-words">{contentParts}</p>
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
