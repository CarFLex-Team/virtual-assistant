"use client";
import { memo } from "react";
import Message from "./MessageBubble";
import ErrorBubble from "./ErrorBubble";
import StreamingMessage from "./StreamingMessage";
import { Thread, ChatMessage } from "@/store/threadStore";
import { formatChatDate } from "@/utils/formatChatDate";

const SafeMessage = memo(function SafeMessage({
  message,
}: {
  message: ChatMessage;
}) {
  if (typeof message.content === "object" && message.type === "user") {
    return (
      <Message
        message={{
          ...message,
          content: JSON.stringify(message.content),
          source:
            message.source === "search"
              ? "search"
              : message.source === "investigate"
                ? "investigate"
                : undefined,
        }}
      />
    );
  }
  return (
    <Message
      message={{
        ...message,
        source:
          message.source === "search"
            ? "search"
            : message.source === "investigate"
              ? "investigate"
              : undefined,
      }}
    />
  );
});

function renderMessage(msg: ChatMessage) {
  switch (msg.visual?.type?.toLowerCase() || msg.type) {
    case "user":
    case "bot":
      return <SafeMessage message={msg} />;
    case "error":
      return <ErrorBubble content={msg.content} />;
    default:
      return <SafeMessage message={{ ...msg, type: "bot" }} />;
  }
}

interface MessageListProps {
  currentThread: Thread | null;
  isLoadingThisThread: boolean;
  liveStage: string;
  getStreamTokens: (id: number) => string[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

function MessageListImpl({
  currentThread,
  isLoadingThisThread,
  liveStage,
  getStreamTokens,
  messagesEndRef,
}: MessageListProps) {
  const displayedMessages = currentThread ? currentThread.chat_messages : [];

  const streamingMessage =
    isLoadingThisThread &&
    displayedMessages[displayedMessages.length - 1]?.type === "bot"
      ? displayedMessages[displayedMessages.length - 1]
      : null;
  const isAwaitingFirstToken =
    isLoadingThisThread &&
    (!streamingMessage || streamingMessage.content === "");
  const isSearchStream = streamingMessage?.source === "search";
  const isInvestigateStream = streamingMessage?.source === "investigate";

  return (
    <div className="flex-1 overflow-y-auto px-2 py-4 space-y-3">
      {currentThread && displayedMessages.length > 0 && (
        <div className="flex justify-center mb-2">
          <p className="text-slate-400 text-xs text-center">
            {formatChatDate(currentThread.created_at)}
          </p>
        </div>
      )}

      {displayedMessages.map((msg: ChatMessage, i) => {
        const isStreamingPlaceholder =
          isLoadingThisThread &&
          i === displayedMessages.length - 1 &&
          msg.type === "bot";

        if (isStreamingPlaceholder && msg.content === "") return null;

        return (
          <div
            key={msg.id}
            className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
          >
            {isStreamingPlaceholder ? (
              <StreamingMessage
                tokens={getStreamTokens(msg.id)}
                variant={
                  msg.source === "search"
                    ? "search"
                    : msg.source === "investigate"
                      ? "investigate"
                      : "default"
                }
              />
            ) : (
              renderMessage(msg)
            )}
          </div>
        );
      })}

      {isAwaitingFirstToken && (
        <div className="flex justify-start">
          <div
            className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl rounded-bl-sm border ${
              isSearchStream
                ? "bg-search/10 border-search/40"
                : isInvestigateStream
                  ? "bg-investigate/10 border-investigate/40"
                  : "bg-surface border-border"
            }`}
          >
            <span className="flex gap-1">
              <span
                className={`w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:-0.3s] ${
                  isSearchStream
                    ? "bg-search"
                    : isInvestigateStream
                      ? "bg-investigate"
                      : "bg-accent"
                }`}
              />
              <span
                className={`w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:-0.15s] ${
                  isSearchStream
                    ? "bg-search"
                    : isInvestigateStream
                      ? "bg-investigate"
                      : "bg-accent"
                }`}
              />
              <span
                className={`w-1.5 h-1.5 rounded-full animate-bounce ${
                  isSearchStream
                    ? "bg-search"
                    : isInvestigateStream
                      ? "bg-investigate"
                      : "bg-accent"
                }`}
              />
            </span>
            <span
              key={liveStage}
              className="text-sm text-slate-400 animate-[fadeIn_0.3s_ease-in]"
            >
              {liveStage}
            </span>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}

export default memo(MessageListImpl);
