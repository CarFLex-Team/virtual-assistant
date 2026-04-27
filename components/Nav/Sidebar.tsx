"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  PanelLeftClose,
  PanelLeftOpen,
  MessageSquare,
  ChartColumnDecreasing,
} from "lucide-react";
import NavButton from "../ui/NavButton";
import { saveThreads, loadThreads } from "@/utils/storage";

export default function Sidebar({
  open,
  setOpen,
  activeThread,
  setActiveThread,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeThread: string | null;
  setActiveThread: (id: string) => void;
}) {
  const router = useRouter();
  const [threads, setThreads] = useState<any[]>([]);
  const [activeNav, setActiveNav] = useState<string | null>(null);

  // Load threads from localStorage
  useEffect(() => {
    const saved = loadThreads();
    setThreads(saved);
    if (!activeThread && saved.length > 0) setActiveThread(saved[0].id);
  }, []);

  // Auto-save threads
  // useEffect(() => saveThreads(threads), [threads]);

  const startNewChat = () => {
    const newThread = {
      id: crypto.randomUUID(),
      title: "New Chat",
      messages: [],
      createdAt: new Date().toISOString(),
    };
    setThreads([newThread, ...threads]); // state updates
    setActiveThread(newThread.id);
    saveThreads([newThread, ...threads]); // persist to localStorage
    router.push(`/?threadId=${newThread.id}`);
  };

  const navItems = [
    {
      id: "VirtualAssistant",
      label: "Virtual Assistant",
      href: "/",
      icon: MessageSquare,
    },
    {
      id: "Stats",
      label: "Statistics",
      href: "/stats",
      icon: ChartColumnDecreasing,
    },
  ];

  useEffect(() => {
    const current = navItems.find((i) => i.href === window.location.pathname);
    setActiveNav(current?.label || null);
  }, []);

  const setActiveThreadAndUrl = (id: string) => {
    setActiveThread(id);
    router.push(`/?threadId=${id}`);
  };

  return (
    <aside
      className={`h-screen flex flex-col bg-background border-r-2 border-r-sky-950 px-4 py-6 transform transition-transform ${open ? "w-58 max-md:translate-x-0" : "w-16 max-md:-translate-x-full"}`}
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
              onClick={() => setActiveNav(item.label)}
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
          <div className="mt-6">
            <p className={`text-gray-400 ${open ? "px-4 py-1" : ""}`}>Chats</p>
            {threads.map((t) => (
              <div
                key={t.id}
                onClick={() => setActiveThreadAndUrl(t.id)}
                className={`cursor-pointer p-2 rounded ${t.id === activeThread ? "bg-blue-100" : "hover:bg-gray-100"}`}
              >
                {t.title || t.messages[0]?.content || "New Chat"}
              </div>
            ))}
            <button
              className="bg-blue-500 text-white p-2 m-2 rounded w-full"
              onClick={startNewChat}
            >
              + New Chat
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
