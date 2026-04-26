"use client";
import { useState, useEffect, useRef } from "react";
import Message from "./MessageBubble";
import StatsChart from "./StatsChart";
import { ArrowUp } from "lucide-react";
// import { fetchStats } from "@/utils/api";

interface ChatProps {}

interface ChatMessage {
  id: number;
  content: string;
  type: "user" | "bot" | "chart";
}

let messageId = 0;

export default function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage: ChatMessage = {
      id: messageId++,
      content: input,
      type: "user",
    };
    setMessages([...messages, userMessage]);
    setInput("");

    // Simulate bot response
    const botMessage: ChatMessage = {
      id: messageId++,
      content: "Processing your request...",
      type: "bot",
    };
    setMessages((prev) => [...prev, botMessage]);

    // Fetch stats from backend
    // const stats = await fetchStats();
    setMessages((prev) => [
      ...prev.filter((m) => m.id !== botMessage.id),
      // {
      //   id: messageId++,
      //   content: JSON.stringify({
      //     labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      //     datasets: [
      //       {
      //         label: "Sales",
      //         data: [12, 19, 3, 5, 2],
      //         backgroundColor: "rgba(75, 192, 192, 0.6)",
      //       },
      //     ],
      //   }),
      //   type: "chart",
      // },
      {
        id: messageId++,
        content:
          "This is a placeholder for the chart data. Replace with actual API response.",
        type: "bot",
      },
    ]);
  };

  return (
    <div className="h-screen p-4 ">
      <div className="flex flex-col gap-4 h-full bg-stone-200  p-4 rounded-lg shadow-lg ">
        <div className="flex-1 overflow-y-auto p-4 space-y-3 rounded-lg scrollbar-thin scrollbar-thumb-stone-800 scrollbar-track-stone-500">
          {messages.map((msg) =>
            msg.type === "chart" ? (
              <StatsChart key={msg.id} data={JSON.parse(msg.content)} />
            ) : (
              <div
                key={msg.id}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <Message key={msg.id} message={msg} />
              </div>
            ),
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="flex gap-2 ">
          <input
            type="text"
            className="flex-1 border border-stone-500 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-stone-700"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
          />
          <button
            className="bg-stone-600 hover:bg-stone-500 text-white font-semibold p-2 rounded-xl transition-colors duration-200 cursor-pointer"
            onClick={handleSend}
          >
            <ArrowUp />
          </button>
        </div>
      </div>
    </div>
  );
}
