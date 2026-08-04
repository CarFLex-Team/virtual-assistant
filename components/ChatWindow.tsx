"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUp, Square, Sparkles, Search, HatGlasses } from "lucide-react";
import MessageList from "./MessageList";
import { streamAIResponse } from "@/utils/StreamApi";
import { useThreadStore, Thread, ChatMessage } from "@/store/threadStore";

const SUGGESTIONS = [
  "What you should actually be buying this week?",
  "Trace supplier risk and dependency issues",
  "Top inventory risks right now",
];

const DEFAULT_STAGE = "Thinking...";
const SEARCH_STAGE = "Searching the web...";
const INVESTIGATE_STAGE = "Investigating...";

const SEARCH_PREFIX = "/search";
const INVESTIGATE_PREFIX = "/investigate";
const isSearchCommand = (text: string) =>
  text.trim().toLowerCase().startsWith(SEARCH_PREFIX);
const isInvestigateCommand = (text: string) =>
  text.trim().toLowerCase().startsWith(INVESTIGATE_PREFIX);
// const stripSearchPrefix = (text: string) =>
//   text.trim().slice(SEARCH_PREFIX.length).trim();

const COMMANDS = [
  {
    key: "/search",
    label: "Search the web",
    description: "Look up live information instead of your data",
    icon: Search,
  },
  {
    key: "/investigate",
    label: "Investigate",
    description: "Ask for a deeper analysis of your data",
    icon: HatGlasses,
  },
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
  const [liveStage, setLiveStage] = useState(DEFAULT_STAGE);
  const [highlightedCommand, setHighlightedCommand] = useState(0);
  const [streamingThreadId, setStreamingThreadId] = useState<string | null>(
    null,
  );
  const controllerRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null!);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const streamTokensRef = useRef<Map<number, string[]>>(new Map());
  const getStreamTokens = useCallback(
    (id: number) => streamTokensRef.current.get(id) || [],
    [],
  );

  useEffect(() => {
    if (streamingThreadId && streamingThreadId !== activeThread) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [threads, activeThread, pendingThreads, streamingThreadId]);

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
    const exists =
      threads.some((t) => t.id === activeThread) ||
      pendingThreads?.some((t) => t.id === activeThread);
    if (exists) return;
    const fallback = pendingThreads?.[0] || threads[0] || null;
    setActiveThread(fallback?.id || null);
  }, [activeThread, threads, pendingThreads, setActiveThread]);
  // useEffect(() => {
  //   if (!activeThread) return;

  //   let currentThread =
  //     threads.find((t) => t.id === activeThread) ||
  //     pendingThreads?.find((t) => t.id === activeThread) ||
  //     null;

  //   if (!currentThread) {
  //     currentThread = pendingThreads?.[0] || threads[0] || null;
  //     setActiveThread(currentThread?.id || null);
  //   }

  //   const savedBuffer = localStorage.getItem(`messageBuffer ${activeThread}`);
  //   if (!savedBuffer) return;

  //   const bufferedMessages: ChatMessage[] = JSON.parse(savedBuffer);
  //   if (bufferedMessages.length === 0) return;

  //   const existingIds = new Set(currentThread.chat_messages.map((m) => m.id));
  //   const newMessages = bufferedMessages.filter((m) => !existingIds.has(m.id));

  //   if (newMessages.length === 0) return;

  //   currentThread.chat_messages = [
  //     ...currentThread.chat_messages,
  //     ...newMessages,
  //   ];
  //   currentThread.buffer = bufferedMessages;

  //   if (pendingThreads?.some((t) => t.id === activeThread)) {
  //     setPendingThreads(
  //       pendingThreads.map((t) =>
  //         t.id === activeThread ? { ...currentThread } : t,
  //       ),
  //     );
  //   } else {
  //     setThreads(
  //       threads.map((t) => (t.id === activeThread ? { ...currentThread } : t)),
  //     );
  //   }
  // }, [activeThread, pendingThreads]);

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

      const isPending = pendingThreads?.some((t) => t.id === threadId);

      if (isPending) {
        setPendingThreads((prev) =>
          prev
            ? prev.map((t) => (t.id === threadId ? { ...t, buffer: [] } : t))
            : prev,
        );
      } else {
        setThreads((prev) =>
          prev.map((t) => (t.id === threadId ? { ...t, buffer: [] } : t)),
        );
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

  const syncCurrentThread = (currentThread: Thread) => {
    const isPending = pendingThreads?.some((t) => t.id === currentThread.id);

    if (isPending) {
      setPendingThreads((prev) =>
        prev
          ? prev.map((t) =>
              t.id === currentThread.id ? { ...currentThread } : t,
            )
          : prev,
      );
    } else {
      setThreads((prev) =>
        prev.map((t) => (t.id === currentThread.id ? { ...currentThread } : t)),
      );
    }
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    controllerRef.current = new AbortController();
    let currentThread = getCurrentThread();

    const isSearch = isSearchCommand(content);
    const isInvestigate = isInvestigateCommand(content);
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
          setPendingThreads((prev) => [currentThread!, ...(prev || [])]);
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
    setInput("");
    if (currentThread) syncCurrentThread(currentThread);

    if (!currentThread) return;

    const aiMessage: ChatMessage = {
      id: Date.now() + 2,
      type: "bot",
      content: "",
      visual: null,
      timestamp: new Date().toISOString(),
      ...(isSearch ? { source: "search" as const } : {}),
      ...(isInvestigate ? { source: "investigate" as const } : {}),
    };
    currentThread.chat_messages.push(aiMessage);
    currentThread.buffer.push(aiMessage);
    streamTokensRef.current.set(aiMessage.id, []);

    setLoading(true);
    setStreamingThreadId(currentThread.id);
    setLiveStage(
      isSearch
        ? SEARCH_STAGE
        : isInvestigate
          ? INVESTIGATE_STAGE
          : DEFAULT_STAGE,
    );

    await streamAIResponse(content, {
      signal: controllerRef.current?.signal,

      onStage: (stage) => {
        setLiveStage(stage);
      },

      onToken: (token) => {
        aiMessage.content = (aiMessage.content as string) + token;
        const tokens = streamTokensRef.current.get(aiMessage.id) || [];
        tokens.push(token);
        streamTokensRef.current.set(aiMessage.id, tokens);
        syncCurrentThread(currentThread!);
      },

      onVisual: (visual) => {
        aiMessage.visual = visual;
        syncCurrentThread(currentThread!);
      },

      onDone: () => {
        setLoading(false);
        setStreamingThreadId(null);
        streamTokensRef.current.delete(aiMessage.id);
        localStorage.setItem(
          `messageBuffer ${currentThread!.id}`,
          JSON.stringify(currentThread!.buffer),
        );
        syncCurrentThread(currentThread!);
        if (currentThread!.buffer.length >= 5) {
          flushMessagesToDB(currentThread!.id);
        }
      },

      onError: (error) => {
        setLoading(false);
        setStreamingThreadId(null);
        streamTokensRef.current.delete(aiMessage.id);
        const errorMessage: ChatMessage = {
          id: Date.now() + 3,
          type: "error",
          content: {
            code: error.code || "Error While Responding",
            message: error.message,
          },
          timestamp: new Date().toISOString(),
        };
        currentThread!.chat_messages.push(errorMessage);
        currentThread!.buffer.push(errorMessage);
        syncCurrentThread(currentThread!);
      },
    });
  };

  const commandMatch = input.match(/^\/(\S*)$/);
  const filteredCommands = commandMatch
    ? COMMANDS.filter((c) =>
        c.key.slice(1).toLowerCase().startsWith(commandMatch[1].toLowerCase()),
      )
    : [];
  const showCommandMenu = filteredCommands.length > 0;
  useEffect(() => {
    setHighlightedCommand(0);
  }, [input]);

  const selectCommand = (cmd: (typeof COMMANDS)[number]) => {
    setInput(`${cmd.key} `);
    requestAnimationFrame(() => textareaRef.current?.focus());
  };

  const handleSend = () => {
    if (loading && streamingThreadId === activeThread) {
      controllerRef.current?.abort();
      setLoading(false);
      setStreamingThreadId(null);
      return;
    }
    if (!input.trim()) return;
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.overflowY = "hidden";
    }
    sendMessage(input);
  };

  const currentThread = getCurrentThread();
  const showWelcome = currentThread && currentThread.chat_messages.length === 0;

  const isLoadingThisThread =
    loading && streamingThreadId === currentThread?.id;

  return (
    <div className="h-[92vh] p-4 bg-background relative overflow-hidden">
      {(!currentThread || currentThread.chat_messages.length === 0) && (
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

        <MessageList
          currentThread={currentThread}
          isLoadingThisThread={!!isLoadingThisThread}
          liveStage={liveStage}
          getStreamTokens={getStreamTokens}
          messagesEndRef={messagesEndRef}
        />

        <div className="relative flex gap-2 items-end bg-surface border border-border rounded-2xl p-2 focus-within:border-accent transition-colors">
          {showCommandMenu && (
            <div className="absolute bottom-full mb-2 left-0 w-72 bg-surface border border-border rounded-xl shadow-lg p-1 z-20">
              {filteredCommands.map((cmd, i) => (
                <button
                  key={cmd.key}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    selectCommand(cmd);
                  }}
                  onMouseEnter={() => setHighlightedCommand(i)}
                  className={`w-full flex items-start gap-2 px-3 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                    i === highlightedCommand
                      ? "bg-border"
                      : "hover:bg-border/60"
                  }`}
                >
                  <cmd.icon size={16} className="text-accent mt-0.5 shrink-0" />
                  <span>
                    <span className="block text-sm font-medium text-slate-100">
                      {cmd.key}
                    </span>
                    <span className="block text-xs text-slate-400">
                      {cmd.description}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          )}

          <textarea
            ref={textareaRef}
            rows={1}
            className="flex-1 bg-transparent px-3 py-2 focus:outline-none text-slate-100 placeholder:text-slate-500 resize-none"
            style={{ maxHeight: TEXTAREA_MAX_HEIGHT }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (showCommandMenu) {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setHighlightedCommand(
                    (i) => (i + 1) % filteredCommands.length,
                  );
                  return;
                }
                if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setHighlightedCommand(
                    (i) =>
                      (i - 1 + filteredCommands.length) %
                      filteredCommands.length,
                  );
                  return;
                }
                if (e.key === "Enter" || e.key === "Tab") {
                  e.preventDefault();
                  selectCommand(filteredCommands[highlightedCommand]);
                  return;
                }
                if (e.key === "Escape") {
                  e.preventDefault();
                  setInput("");
                  return;
                }
              }
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask about your data, or type / for commands..."
          />
          <button
            className="shrink-0 bg-accent hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed text-background font-semibold p-2.5 rounded-xl transition-colors cursor-pointer"
            onClick={handleSend}
            disabled={!isLoadingThisThread && !input.trim()}
            aria-label={isLoadingThisThread ? "Stop response" : "Send message"}
          >
            {isLoadingThisThread ? <Square size={18} /> : <ArrowUp size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
