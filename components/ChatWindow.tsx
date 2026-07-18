"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUp, Square } from "lucide-react";
import Message from "./MessageBubble";
import StatsChart from "./StatsChart";
import TableView from "./TableView";
import RankingView from "./RankingView";
import DistributionView from "./DistributionView";
import Clarification from "./Clarification";
import ErrorBubble from "./ErrorBubble";
import { fetchAIResponse } from "@/utils/api";
import { useThreadStore, Thread, ChatMessage } from "@/store/threadStore";
import StarBackground from "./StarBackground";

export default function ChatWindow() {
  const {
    threads,
    setThreads,
    activeThread,
    setActiveThread,
    pendingThreads,
    setPendingThreads,
    addToBuffer,
    messageBuffer,
    clearBuffer,
    setMessageBuffer,
  } = useThreadStore();
  // console.log(
  //   "ChatWindow render - activeThread:",
  //   activeThread,
  //   "threads:",
  //   threads,
  // );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [threads, activeThread, pendingThreads]);
  useEffect(() => {
    const currentThread = getCurrentThread();
    if (!currentThread || currentThread.buffer.length === 0) return;

    const timer = setTimeout(() => {
      flushMessagesToDB(currentThread.id);
    }, 30_000);

    return () => clearTimeout(timer);
  }, [threads, pendingThreads, activeThread]);
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto"; // reset first so it can shrink too
    const newHeight = Math.min(el.scrollHeight, 200);
    el.style.height = `${newHeight}px`;
    el.style.overflowY = el.scrollHeight > 200 ? "auto" : "hidden";
  }, [input]);
  useEffect(() => {
    if (!activeThread) return;

    let currentThread =
      threads.find((t) => t.id === activeThread) ||
      pendingThreads?.find((t) => t.id === activeThread) ||
      null;

    if (!currentThread) {
      currentThread = pendingThreads?.[0] || threads[0] || null;
      setActiveThread(currentThread?.id || null);
    }

    const savedBuffer = localStorage.getItem(`messageBuffer ${activeThread}`);
    if (!savedBuffer) return;

    const bufferedMessages: ChatMessage[] = JSON.parse(savedBuffer);
    if (bufferedMessages.length === 0) return;

    const existingIds = new Set(currentThread.chat_messages.map((m) => m.id));
    const newMessages = bufferedMessages.filter((m) => !existingIds.has(m.id));

    if (newMessages.length === 0) return;

    currentThread.chat_messages = [
      ...currentThread.chat_messages,
      ...newMessages,
    ];
    currentThread.buffer = bufferedMessages;

    if (pendingThreads?.some((t) => t.id === activeThread)) {
      setPendingThreads(
        pendingThreads.map((t) =>
          t.id === activeThread ? { ...currentThread } : t,
        ),
      );
    } else {
      setThreads(
        threads.map((t) => (t.id === activeThread ? { ...currentThread } : t)),
      );
    }
  }, [activeThread, pendingThreads]);

  const flushMessagesToDB = async (threadId: string) => {
    const thread =
      threads.find((t) => t.id === threadId) ||
      pendingThreads?.find((t) => t.id === threadId);
    if (!thread || thread.buffer.length === 0) return;

    try {
      await fetch(`/api/threads/${threadId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: thread.buffer }),
      });

      thread.buffer = [];

      if (pendingThreads?.some((t) => t.id === threadId)) {
        setPendingThreads(
          pendingThreads.map((t) => (t.id === threadId ? { ...thread } : t)),
        );
      } else {
        setThreads(threads.map((t) => (t.id === threadId ? { ...thread } : t)));
      }
      localStorage.removeItem(`messageBuffer ${threadId}`);
    } catch (err) {
      console.error("Failed to flush messages", err);
    }
  };

  const getCurrentThread = (): Thread | null => {
    if (!activeThread) return threads.length > 0 ? threads[0] : null;
    if (pendingThreads?.some((t) => t.id === activeThread))
      return pendingThreads.find((t) => t.id === activeThread) || null;
    return threads.find((t) => t.id === activeThread) || null;
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    controllerRef.current = new AbortController();
    let currentThread = getCurrentThread();

    if (!currentThread || !currentThread.saved) {
      await fetch("/api/threads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "New Chat",
          id: currentThread?.id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Created thread on server:", data);
          currentThread = {
            id: data[0].id,
            title: data[0].title,
            chat_messages: [],
            buffer: [],
            createdAt: data[0].created_at,
            saved: true,
          };
          console.log("Current thread after creation:", currentThread);
          setActiveThread(currentThread.id);
        })
        .catch((err) => {
          console.error("Failed to create thread", err);
          currentThread = {
            id: crypto.randomUUID(),
            title: "New Chat",
            chat_messages: [],
            buffer: [],
            createdAt: new Date().toISOString(),
            saved: false,
          };
          setPendingThreads([currentThread!, ...(pendingThreads || [])]);
          setActiveThread(currentThread!.id);
        });
    }

    const userMessage: ChatMessage = {
      id: Date.now(),
      type: "user",
      content,
      timestamp: new Date().toISOString(),
    };
    console.log("currentThread before adding message:", currentThread);

    currentThread?.chat_messages.push(userMessage);
    currentThread?.buffer.push(userMessage);

    if (pendingThreads?.some((t) => t.id === currentThread?.id)) {
      setPendingThreads(
        pendingThreads.map((t) =>
          t.id === currentThread?.id ? { ...currentThread } : t,
        ),
      );
    } else {
      setThreads(
        threads.map((t) => (t.id === currentThread!.id ? currentThread! : t)),
      );
    }

    setInput("");

    if (pendingThreads?.some((t) => t.id === currentThread?.id)) {
      setPendingThreads(
        pendingThreads.map((t) =>
          t.id === currentThread?.id ? { ...currentThread } : t,
        ),
      );
    } else {
      setThreads(
        threads.map((t) => (t.id === currentThread?.id ? currentThread : t)),
      );
    }

    try {
      setLoading(true);
      const aiData = await fetchAIResponse(content, {
        signal: controllerRef.current?.signal,
      });
      let aiMessage: ChatMessage;
      if (!aiData || aiData.status === "error") {
        aiMessage = {
          id: Date.now() + 1,
          type: "error",
          content: {
            code: aiData?.error?.code || "Unknown Error",
            message:
              aiData?.error?.message ||
              "An error occurred while processing your request.",
          },
          timestamp: new Date().toISOString(),
        };
      } else {
        aiMessage = {
          id: Date.now() + 2,
          // summary: aiData.summary,
          type: "bot",
          content: aiData?.answer,
          visual: aiData?.visual || null,
          timestamp: new Date().toISOString(),
        };
      }

      currentThread?.chat_messages.push(aiMessage);
      currentThread?.buffer.push(aiMessage);
      localStorage.setItem(
        `messageBuffer ${currentThread?.id}`,
        JSON.stringify(currentThread?.buffer),
      );
      if (pendingThreads?.some((t) => t.id === currentThread?.id)) {
        setPendingThreads(
          pendingThreads.map((t) =>
            t.id === currentThread?.id ? { ...currentThread } : t,
          ),
        );
      } else {
        setThreads(
          threads.map((t) => (t.id === currentThread?.id ? currentThread : t)),
        );
      }
    } catch (err) {
      // console.error("Failed to fetch AI response", err);
      const errorMessage: ChatMessage = {
        id: Date.now() + 3,
        type: "error",
        content: {
          code: "Error While Responding",
          message:
            "An error occurred while fetching the AI response. Please try again.",
        },
        timestamp: new Date().toISOString(),
      };
      currentThread?.chat_messages.push(errorMessage);
      currentThread?.buffer.push(errorMessage);
    }
    setLoading(false);

    if (currentThread && currentThread?.buffer.length >= 5) {
      flushMessagesToDB(currentThread?.id);
    }
  };
  const handleSend = () => {
    if (loading) {
      controllerRef.current?.abort();
      setLoading(false);
    }
    if (!input.trim()) return;
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.overflowY = "hidden";
    }
    sendMessage(input);
  };

  const SafeMessage = ({ message }: { message: ChatMessage }) => {
    if (typeof message.content === "object" && message.type === "user") {
      return (
        <Message
          message={{ ...message, content: JSON.stringify(message.content) }}
        />
      );
    }
    return <Message message={message} />;
  };

  const renderMessage = (msg: ChatMessage) => {
    switch (msg.visual?.type?.toLowerCase() || msg.type) {
      case "user":
      case "bot":
        return <SafeMessage message={msg} />;
      case "error":
        return <ErrorBubble content={msg.content} />;
      default:
        return <SafeMessage message={{ ...msg, type: "bot" }} />;
    }
  };

  const currentThread = getCurrentThread();
  const displayedMessages = currentThread ? currentThread.chat_messages : [];
  const showWelcome = currentThread && currentThread.chat_messages.length === 0;

  return (
    <div className="h-[95vh] p-4 bg-transparent">
      {displayedMessages.length <= 0 && <StarBackground />}
      <div className="flex flex-col gap-2 md:gap-4 h-full p-4 rounded-lg ">
        {showWelcome && (
          <div className="h-full flex flex-col items-center justify-center gap-6 z-5">
            <div className="p-6 rounded-2xl bg-linear-to-b from-white to-sky-100 px-4s shadow-lg flex flex-col items-center gap-4 max-w-xs">
              <img
                src="/chat-bot2.png"
                alt="Chat Bot"
                className="md:w-32 md:h-32 w-24 h-24 object-contain"
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
            <p className="text-gray-400 text-sm italic">
              Tip: Try typing a question like "Show me sales for last week"
            </p>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 space-y-3 rounded-lg ">
          {displayedMessages.map((msg: ChatMessage) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              {renderMessage(msg)}
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="animate-pulse max-w-2xl px-4 py-2 rounded-xl wrap-break-word  bg-white text-gray-800  rounded-bl-none h-6" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex gap-2 items-end">
          <textarea
            ref={textareaRef}
            style={{ maxHeight: 200 }}
            rows={1}
            className="flex-1 border border-sky-900 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-950 text-white resize-none max-h-20"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // stop the newline from being added
                handleSend();
              }
              // if Shift+Enter, do nothing special — textarea inserts \n by default
            }}
            placeholder="Type a message..."
          />
          <button
            className="bg-sky-900 hover:bg-sky-800 text-white font-semibold p-2 rounded-xl transition-colors duration-200 cursor-pointer"
            onClick={handleSend}
          >
            {loading ? <Square /> : <ArrowUp />}
          </button>
        </div>
      </div>
    </div>
  );
}
