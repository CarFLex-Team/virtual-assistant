"use client";
import { useState, useEffect, useRef } from "react";
import Message from "./MessageBubble";
import StatsChart from "./StatsChart";
import { ArrowUp } from "lucide-react";
// import { fetchStats } from "@/utils/api";
import { ChatMessage, MessageType } from "./type";
import TableView from "./TableView";
import RankingView from "./RankingView";
import DistributionView from "./DistributionView";
import Clarification from "./Clarification";
import ErrorBubble from "./ErrorBubble";
import { loadThreads, saveThreads } from "@/utils/storage";
import { fetchAIResponse } from "@/utils/api";
import { useSearchParams } from "next/navigation";
export default function ChatWindow() {
  const searchParams = useSearchParams();
  const threadIdFromUrl = searchParams.get("threadId");
  const [threads, setThreads] = useState<any[]>([]);
  const [activeThread, setActiveThread] = useState<string | null>(
    threadIdFromUrl,
  );
  // const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (threadIdFromUrl && threadIdFromUrl !== activeThread) {
      setActiveThread(threadIdFromUrl);
    }
  }, [threadIdFromUrl]);

  useEffect(() => {
    const saved = loadThreads();
    setThreads(saved);
    if (!activeThread && saved.length > 0) setActiveThread(saved[0].id);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [threads, activeThread]);

  const sendMessage = async (content: string) => {
    if (!activeThread) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      type: "user",
      content,
      timestamp: new Date().toISOString(),
    };

    let updatedThreads = threads.map((t) =>
      t.id === activeThread
        ? { ...t, messages: [...t.messages, userMessage] }
        : t,
    );
    setThreads(updatedThreads);
    saveThreads(updatedThreads);

    const botTyping: ChatMessage = {
      id: Date.now() + 1,
      type: "bot",
      content: "Typing...",
      timestamp: new Date().toISOString(),
    };
    updatedThreads = updatedThreads.map((t) =>
      t.id === activeThread
        ? { ...t, messages: [...t.messages, botTyping] }
        : t,
    );
    setThreads(updatedThreads);
    saveThreads(updatedThreads);

    try {
      const aiData = await fetchAIResponse(content);

      updatedThreads = updatedThreads.map((t) =>
        t.id === activeThread
          ? {
              ...t,
              messages: [
                ...t.messages.filter((m: any) => m.id !== botTyping.id),
                {
                  id: Date.now() + 2,
                  type: aiData.type,
                  content: aiData.data,
                  timestamp: new Date().toISOString(),
                },
              ],
            }
          : t,
      );
      setThreads(updatedThreads);
      saveThreads(updatedThreads);
    } catch (err: any) {
      updatedThreads = updatedThreads.map((t) =>
        t.id === activeThread
          ? {
              ...t,
              messages: [
                ...t.messages.filter((m: any) => m.id !== botTyping.id),
                {
                  id: Date.now() + 2,
                  type: "error",
                  content: { message: err.message },
                  timestamp: new Date().toISOString(),
                },
              ],
            }
          : t,
      );
      setThreads(updatedThreads);
      saveThreads(updatedThreads);
    }
  };
  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };
  function renderMessage(msg: ChatMessage) {
    switch (msg.type) {
      case "user":
      case "bot":
        return <Message message={msg} />;
      case "chart":
        return <StatsChart data={msg.content} />;
      case "table":
        return <TableView data={msg.content} />;
      case "ranking":
        return <RankingView data={msg.content} />;
      case "distribution":
        return <DistributionView data={msg.content} />;
      case "clarification":
        return <Clarification data={msg.content} onSelect={() => {}} />;
      case "error":
        return <ErrorBubble content={msg.content} />;
      default:
        return <Message message={{ ...msg, type: "bot" }} />;
    }
  }
  return (
    <div className="h-screen p-4 ">
      <div className="flex flex-col gap-4 h-full bg-[url('/bg-chat.jpg')] bg-cover bg-center  p-4 rounded-lg shadow-lg ">
        {threads.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center gap-6 ">
            <div className="p-6 rounded-2xl bg-linear-to-b from-white to-sky-100 px-4s shadow-lg flex flex-col items-center gap-4 max-w-xs">
              <img
                src="/chat-bot2.png"
                alt="Chat Bot"
                className="w-32 h-32 object-contain"
              />
              <p className="text-center text-gray-700 text-lg font-semibold">
                Hi, I'm <span className="text-primary-600">ELIARA</span>, your
                AI assistant.
              </p>
              <p className="text-center text-gray-500 text-sm">
                Ask me anything about your data and I'll provide insights
                instantly.
              </p>
            </div>

            {/* Optional tip */}
            <p className="text-gray-600 text-sm italic">
              Tip: Try typing a question like "Show me sales for last week"
            </p>
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 rounded-lg scrollbar-thin scrollbar-thumb-sky-800 scrollbar-track-sky-500">
          {activeThread &&
            threads
              .find((t) => t.id === activeThread)
              ?.messages.map((msg: ChatMessage) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  {renderMessage(msg)}
                </div>
              ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="flex gap-2 ">
          <input
            type="text"
            className="flex-1 border border-sky-900 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-950"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
          />
          <button
            className="bg-sky-900 hover:bg-sky-800 text-white font-semibold p-2 rounded-xl transition-colors duration-200 cursor-pointer"
            onClick={handleSend}
          >
            <ArrowUp />
          </button>
        </div>
      </div>
    </div>
  );
}
