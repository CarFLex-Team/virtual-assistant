"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  PanelLeftClose,
  PanelLeftOpen,
  MessageSquare,
  ChartColumnDecreasing,
} from "lucide-react";
import NavButton from "../ui/NavButton";
import { useThreadStore } from "@/store/threadStore";

export default function Sidebar({
  open,
  setOpen,
  threadsLoaded,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  threadsLoaded: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const threadIdFromUrl = searchParams.get("threadId");

  const {
    threads,
    setThreads,
    activeThread,
    setActiveThread,
    pendingThread,
    setPendingThread,
  } = useThreadStore();

  const [activeNav, setActiveNav] = useState<string | null>(null);

  const navItems = [
    {
      id: "NewChat",
      label: "New Chat",
      href: "/",
      icon: MessageSquare,
      onClick: () => {
        startNewChat();
      },
    },
    {
      id: "Stats",
      label: "Statistics",
      href: "/stats",
      icon: ChartColumnDecreasing,
    },
  ];

  // Sync URL param with active thread
  useEffect(() => {
    if (threadIdFromUrl && threadIdFromUrl !== activeThread) {
      setActiveThread(threadIdFromUrl);
    }
  }, [threadIdFromUrl, threadsLoaded]);

  // Highlight nav based on current page
  useEffect(() => {
    const current = navItems.find((i) => i.href === window.location.pathname);
    setActiveNav(current?.label || null);
  }, []);
  useEffect(() => {
    // If we are on "/" and no active thread exists, create a pending thread
    if (window.location.pathname === "/" && !activeThread && !pendingThread) {
      const newThread = {
        id: crypto.randomUUID(),
        title: "New Chat",
        chat_messages: [], // empty so welcome shows
        createdAt: new Date().toISOString(),
      };
      setPendingThread(newThread);
      setActiveThread(newThread.id);
      setActiveNav("New Chat");
    }
  }, [activeThread, pendingThread, setActiveThread, setPendingThread]);
  // Click "New Chat" in sidebar
  const startNewChat = () => {
    const newThread = {
      id: crypto.randomUUID(),
      title: "New Chat",
      chat_messages: [], // empty to show welcome
      createdAt: new Date().toISOString(),
    };
    setPendingThread(newThread);
    setActiveThread(newThread.id);
    setActiveNav("New Chat");
    // no router.push — stay on same page
  };

  const setActiveThreadAndUrl = (id: string) => {
    setActiveThread(id);
    router.push(`/?threadId=${id}`);
  };

  return (
    <aside
      className={`h-screen flex flex-col bg-background border-r-2 border-r-sky-950 px-4 py-6 transform transition-transform ${
        open ? "w-58 max-md:translate-x-0" : "w-16 max-md:-translate-x-full"
      }`}
    >
      <div className="overflow-auto">
        {/* Logo & toggle */}
        <div
          className={`flex items-center mb-4 ${open ? "justify-between" : "justify-center"}`}
        >
          {open && (
            <div className="flex gap-2 items-center">
              <img src="/Logo.png" className="w-7 rounded-lg" />
              <p className="text-gray-100 font-bold text-xl">ELIARA AI</p>
            </div>
          )}
          <button
            onClick={() => setOpen(!open)}
            className="p-1 rounded-sm hover:bg-gray-600 text-gray-300"
          >
            {open ? <PanelLeftClose size={22} /> : <PanelLeftOpen size={22} />}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-2 mt-10">
          {navItems.map((item) => (
            <NavButton
              key={item.href}
              onClick={() => {
                setActiveNav(item.label);
                item.onClick && item.onClick();
              }}
              item={item}
              isActive={activeNav === item.label}
              className={
                open
                  ? "px-4 py-3 rounded-lg"
                  : "p-1 mb-2 rounded-md justify-center"
              }
            >
              <item.icon size={20} strokeWidth={3} />
              {open && <span className="text-white">{item.label}</span>}
            </NavButton>
          ))}

          {/* Threads */}
          {open && (
            <div className="mt-6">
              <p className={`text-gray-400 ${open ? "px-4 py-1" : ""}`}>
                Recent Chats
              </p>
              {[...(pendingThread ? [pendingThread] : []), ...threads].map(
                (t) => (
                  <div
                    key={t.id}
                    onClick={() => setActiveThreadAndUrl(t.id)}
                    className={`cursor-pointer p-2 my-1 rounded ${
                      t.id === activeThread
                        ? "bg-blue-100"
                        : "text-white hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    {t.chat_messages[0]?.content
                      .split(" ")
                      .slice(0, 2)
                      .join(" ") ||
                      t.title ||
                      "New Chat"}
                  </div>
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
