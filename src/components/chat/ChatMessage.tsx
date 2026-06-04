import { type ChatMessage as ChatMessageType } from "@/hooks/useChat";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";

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
          {message.content}
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
