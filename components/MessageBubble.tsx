"use client";
import ReactMarkdown from "react-markdown";
interface MessageProps {
  message: {
    id: number;
    content: string;
    type:
      | "user"
      | "bot"
      | "error"
      | "chart"
      | "table"
      | "ranking"
      | "distribution"
      | "clarification"
      | "time_series";
  };
}

export default function MessageBubble({ message }: MessageProps) {
  const isUser = message.type === "user";
  return (
    <div
      className={`max-w-2xl px-4 py-2 rounded-xl wrap-break-word
        ${isUser ? "bg-sky-900 text-white  rounded-br-none" : "bg-white text-gray-800  rounded-bl-none"}
        shadow-md`}
    >
      <ReactMarkdown>{message.content || "No content"}</ReactMarkdown>
    </div>
  );
}
