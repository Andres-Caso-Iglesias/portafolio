"use client";

import { useChat } from "@/hooks/useChat";
import { useLanguage } from "@/lib/i18n";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { cn } from "@/lib/utils";

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

  const handleQuickAction = (keywords: string[]) => {
    // Use the first keyword as the search term
    const searchTerm = keywords[0];
    sendMessage(searchTerm);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={toggleChat}
        className={cn(
          "fixed bottom-6 right-6 z-50",
          "w-14 h-14 rounded-full",
          "flex items-center justify-center",
          "shadow-lg transition-all duration-200",
          "hover:scale-105 active:scale-95",
          isOpen
            ? "bg-slate-700 hover:bg-slate-600"
            : "bg-blue-600 hover:bg-blue-700"
        )}
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
      >
        {isOpen ? (
          // Close icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          // Custom chat icon
          <img
            src="/chat.png"
            alt="Chat"
            className="w-10 h-10"
          />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={cn(
            "fixed bottom-24 right-6 z-50",
            "w-[380px] max-w-[calc(100vw-3rem)]",
            "bg-slate-900 rounded-2xl shadow-2xl",
            "border border-slate-700",
            "flex flex-col",
            "overflow-hidden",
            "animate-in fade-in slide-in-from-bottom-4 duration-200"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-slate-800 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">AC</span>
              </div>
              <div>
                <h3 className="text-white font-medium text-sm">
                  {lang === "es" ? "Pinche de Andrés" : "Andrés' Sous-chef"}
                </h3>
                <p className="text-slate-400 text-xs">
                  {lang === "es"
                    ? "Respuestas sobre su perfil"
                    : "Profile information"}
                </p>
              </div>
            </div>
            <button
              onClick={closeChat}
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="Cerrar chat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
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
          <div className="flex-1 overflow-y-auto p-4 space-y-1 min-h-[300px] max-h-[400px]">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start mb-3">
                <div className="bg-slate-700 text-slate-100 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
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
              <p className="text-slate-500 text-xs mb-2">
                {lang === "es" ? "Preguntas frecuentes:" : "Quick questions:"}
              </p>
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleQuickAction(action.keywords)}
                    className="px-3 py-1.5 text-xs bg-slate-800 text-slate-300 
                               rounded-full hover:bg-slate-700 hover:text-white
                               transition-colors duration-150"
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
            placeholder={
              lang === "es"
                ? "Escribe tu pregunta..."
                : "Type your question..."
            }
          />
        </div>
      )}
    </>
  );
}
