"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [threads, activeThread, pendingThreads]);
  useEffect(() => {
    if (!activeThread) return;

    // Get current thread from store
    let currentThread =
      threads.find((t) => t.id === activeThread) ||
      pendingThreads?.find((t) => t.id === activeThread) ||
      null;

    if (!currentThread) {
      // create pending thread if none exists
      currentThread = pendingThreads?.[0] || threads[0] || null;
      setActiveThread(currentThread?.id || null);
    }

    // Load buffer from localStorage
    const savedBuffer = localStorage.getItem(`messageBuffer ${activeThread}`);
    if (!savedBuffer) return;

    const bufferedMessages: ChatMessage[] = JSON.parse(savedBuffer);
    if (bufferedMessages.length === 0) return;

    // Filter out messages already in chat_messages
    const existingIds = new Set(currentThread.chat_messages.map((m) => m.id));
    const newMessages = bufferedMessages.filter((m) => !existingIds.has(m.id));

    if (newMessages.length === 0) return; // <-- prevent unnecessary state updates

    // Merge new messages
    currentThread.chat_messages = [
      ...currentThread.chat_messages,
      ...newMessages,
    ];
    currentThread.buffer = bufferedMessages;

    // Update Zustand only if state actually changed
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
  }, [activeThread, pendingThreads]); // <-- remove threads/pendingThreads from deps to avoid loop
  // useEffect(() => {
  //   console.log(
  //     "Active thread changed, loading message buffer from localStorage:",
  //     activeThread,
  //   );
  //   const savedBuffer = localStorage.getItem(`messageBuffer ${activeThread}`);
  //   console.log("messageBuffer", activeThread, "saved buffer ", savedBuffer);
  //   if (savedBuffer) {
  //     // console.log("Loaded message buffer from localStorage:", savedBuffer);
  //     setMessageBuffer(JSON.parse(savedBuffer));
  //   }
  // }, [activeThread]);

  const getCurrentThread = (): Thread | null => {
    if (!activeThread) return threads.length > 0 ? threads[0] : null;
    if (pendingThreads?.some((t) => t.id === activeThread))
      return pendingThreads.find((t) => t.id === activeThread) || null;
    return threads.find((t) => t.id === activeThread) || null;
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    let currentThread = getCurrentThread();

    // 1️⃣ Lazy create thread if none exists
    if (!currentThread || !currentThread.saved) {
      await fetch("/api/threads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "New Chat", id: currentThread?.id }),
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
          // setThreads([currentThread, ...threads]);
          // setPendingThreads(); // clear pending threads since we now have a saved thread
          setActiveThread(currentThread.id);
        })
        .catch((err) => {
          console.error("Failed to create thread", err);
          // fallback to local pending thread
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
      // const threadId = crypto.randomUUID();
      // currentThread = {
      //   id: threadId,
      //   title: "New Chat",
      //   chat_messages: [],
      //   buffer: [],
      //   createdAt: new Date().toISOString(),
      //   saved: false,
      // };
      // setPendingThreads([currentThread, ...(pendingThreads || [])]);
    }

    // 2️⃣ Create user message
    const userMessage: ChatMessage = {
      id: Date.now(),
      type: "user",
      content,
      timestamp: new Date().toISOString(),
    };
    console.log("currentThread before adding message:", currentThread);
    // 3️⃣ Add message to chat_messages & buffer
    currentThread?.chat_messages.push(userMessage);
    currentThread?.buffer.push(userMessage);

    // 4️⃣ Update Zustand
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

    // 6️⃣ Fetch AI response
    try {
      const aiData = await fetchAIResponse(content);
      const aiMessage: ChatMessage = {
        id: Date.now() + 2,
        type: aiData.type,
        content: aiData.data,
        timestamp: new Date().toISOString(),
      };

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
      // handle error similarly
    }

    // 7️⃣ Optional: flush buffer if >= 5 messages
    if (currentThread && currentThread?.buffer.length >= 5) {
      flushMessagesToDB(currentThread?.id);
    }
  };
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

      // Clear buffer after flush
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
  const handleSend = () => {
    if (!input.trim()) return;
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
    switch (msg.type) {
      case "user":
      case "bot":
        return <SafeMessage message={msg} />;
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
        return <SafeMessage message={{ ...msg, type: "bot" }} />;
    }
  };

  const currentThread = getCurrentThread();
  const displayedMessages = currentThread ? currentThread.chat_messages : [];
  const showWelcome = currentThread && currentThread.chat_messages.length === 0;

  return (
    <div className="h-[95vh] p-4 bg-transparent">
      {displayedMessages.length <= 0 && <StarBackground />}
      <div className="flex flex-col gap-4 h-full p-4 rounded-lg ">
        {showWelcome && (
          <div className="h-full flex flex-col items-center justify-center gap-6 z-5">
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
            <p className="text-gray-400 text-sm italic">
              Tip: Try typing a question like "Show me sales for last week"
            </p>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 space-y-3 rounded-lg scrollbar-thin scrollbar-thumb-sky-800 scrollbar-track-sky-500">
          {displayedMessages.map((msg: ChatMessage) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              {renderMessage(msg)}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 border border-sky-900 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-950 text-white "
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
