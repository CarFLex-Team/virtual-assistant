interface MessageProps {
  message: {
    id: number;
    content: string;
    type: "user" | "bot" | "chart";
  };
}

export default function MessageBubble({ message }: MessageProps) {
  const isUser = message.type === "user";
  return (
    <div
      className={`max-w-xs px-4 py-2 rounded-2xl wrap-break-word
        ${isUser ? "bg-zinc-600 text-white  rounded-br-none" : "bg-gray-300 text-gray-800  rounded-bl-none"}
        shadow-md`}
    >
      {message.content}
    </div>
  );
}
