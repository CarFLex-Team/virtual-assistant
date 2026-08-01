"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUp, Square, Sparkles } from "lucide-react";
import Message from "./MessageBubble";
import ErrorBubble from "./ErrorBubble";
import { fetchAIResponse } from "@/utils/api";
import { useThreadStore, Thread, ChatMessage } from "@/store/threadStore";
import { formatChatDate } from "@/utils/formatChatDate";

const SUGGESTIONS = [
  "What you should actually be buying this week?",
  "Trace supplier risk and dependency issues",
  "Top inventory risks right now",
];

const LOADING_STAGES = [
  "Reading your question...",
  "Querying your data...",
  "Running the numbers...",
  "Putting together an answer...",
];

export default function ChatWindow() {
  const {
    threads,
    setThreads,
    activeThread,
    setActiveThread,
    pendingThreads,
    setPendingThreads,
  } = useThreadStore();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const controllerRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [threads, activeThread, pendingThreads]);

  useEffect(() => {
    if (!loading) {
      setLoadingStage(0);
      return;
    }
    const interval = setInterval(() => {
      setLoadingStage((s) =>
        s + 1 > LOADING_STAGES.length - 1 ? LOADING_STAGES.length - 1 : s + 1,
      );
    }, 1800);
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    const currentThread = getCurrentThread();
    if (!currentThread || currentThread.buffer.length === 0) return;

    const timer = setTimeout(() => {
      flushMessagesToDB(currentThread.id);
    }, 30_000);

    return () => clearTimeout(timer);
  }, [threads, pendingThreads, activeThread]);

  const TEXTAREA_MAX_HEIGHT = 160;
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    const newHeight = Math.min(el.scrollHeight, TEXTAREA_MAX_HEIGHT);
    el.style.height = `${newHeight}px`;
    el.style.overflowY =
      el.scrollHeight > TEXTAREA_MAX_HEIGHT ? "auto" : "hidden";
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
          currentThread = {
            id: data[0].id,
            title: data[0].title,
            chat_messages: [],
            buffer: [],
            created_at: data[0].created_at,
            saved: true,
          };
          setActiveThread(currentThread.id);
        })
        .catch((err) => {
          console.error("Failed to create thread", err);
          currentThread = {
            id: crypto.randomUUID(),
            title: "New Chat",
            chat_messages: [],
            buffer: [],
            created_at: new Date().toISOString(),
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
      return;
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
    <div className="h-[95vh] p-4 bg-background relative overflow-hidden">
      {displayedMessages.length <= 0 && (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #38BDF8 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      )}

      <div className="relative flex flex-col gap-2 md:gap-4 h-full rounded-lg">
        {showWelcome && (
          <div className="h-full flex flex-col items-center justify-center gap-6 ">
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-surface border border-border flex items-center justify-center">
                <Sparkles className="text-accent" size={26} />
              </div>
              <p className="text-center text-slate-100 text-xl font-semibold tracking-tight">
                Hi, I'm <span className="text-accent">ELIARA</span>
              </p>
              <p className="text-center text-slate-400 text-sm max-w-xs">
                Ask about your data and get instant insights.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 max-w-md">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-sm text-slate-300 bg-surface border border-border rounded-full px-4 py-2 hover:border-accent hover:text-white transition-colors cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-2 py-4 space-y-3 ">
          {currentThread && displayedMessages.length > 0 && (
            <div className="flex justify-center mb-2">
              <p className="text-slate-400 text-xs text-center">
                {formatChatDate(currentThread.created_at)}
              </p>
            </div>
          )}
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
              <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl rounded-bl-sm bg-surface border border-border">
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" />
                </span>

                <span
                  key={loadingStage}
                  className="text-sm text-slate-400 animate-[fadeIn_0.3s_ease-in]"
                >
                  {LOADING_STAGES[loadingStage]}
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className=" flex gap-2 items-end bg-surface border border-border rounded-2xl p-2 focus-within:border-accent transition-colors">
          <textarea
            ref={textareaRef}
            rows={1}
            className="flex-1 bg-transparent px-3 py-2 focus:outline-none text-slate-100 placeholder:text-slate-500 resize-none"
            style={{ maxHeight: TEXTAREA_MAX_HEIGHT }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask about your data..."
          />
          <button
            className="shrink-0 bg-accent hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed text-background font-semibold p-2.5 rounded-xl transition-colors cursor-pointer"
            onClick={handleSend}
            disabled={!loading && !input.trim()}
            aria-label={loading ? "Stop response" : "Send message"}
          >
            {loading ? <Square size={18} /> : <ArrowUp size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
