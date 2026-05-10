// stores/threadStore.ts
import { create } from "zustand";

export type ChatMessage = {
  id: number;
  type:
    | "user"
    | "bot"
    | "error"
    | "chart"
    | "table"
    | "ranking"
    | "distribution"
    | "clarification";
  content: any;
  timestamp: string;
};

export type Thread = {
  id: string;
  title?: string;
  messages: ChatMessage[];
  createdAt: string;
};

interface ThreadState {
  threads: Thread[];
  setThreads: (threads: Thread[]) => void;
  activeThread: string | null;
  setActiveThread: (id: string | null) => void;
  pendingThread: Thread | null;
  setPendingThread: (thread: Thread | null) => void;
}

export const useThreadStore = create<ThreadState>((set) => ({
  threads: [],
  setThreads: (threads) => set({ threads }),
  activeThread: null,
  setActiveThread: (id) => set({ activeThread: id }),
  pendingThread: null,
  setPendingThread: (thread) => set({ pendingThread: thread }),
}));
