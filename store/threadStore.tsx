// store/threadStore.ts
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
  chat_messages: ChatMessage[];
  createdAt: string;
  buffer: ChatMessage[]; // for unsaved messages
  saved?: boolean;
};

interface ThreadState {
  threads: Thread[];
  setThreads: (threads: Thread[]) => void;

  activeThread: string | null;
  setActiveThread: (id: string | null) => void;

  pendingThreads: Thread[] | null;
  setPendingThreads: (threads: Thread[] | null) => void;

  messageBuffer: ChatMessage[];
  addToBuffer: (msg: ChatMessage) => void;
  setMessageBuffer: (msgs: ChatMessage[]) => void;
  clearBuffer: () => void;
}

export const useThreadStore = create<ThreadState>((set, get) => ({
  threads: [],
  setThreads: (threads) => set({ threads }),

  activeThread: null,
  setActiveThread: (id) => set({ activeThread: id }),

  pendingThreads: null,
  setPendingThreads: (threads) => set({ pendingThreads: threads }),

  messageBuffer: [],
  addToBuffer: (msg) => {
    localStorage.setItem(
      `messageBuffer ${get().activeThread}`,
      JSON.stringify([...get().messageBuffer, msg]),
    );
    set({ messageBuffer: [...get().messageBuffer, msg] });
  },
  setMessageBuffer: (msgs) => {
    set({ messageBuffer: msgs });
  },
  clearBuffer: () => {
    localStorage.removeItem(`messageBuffer ${get().activeThread}`);
    set({ messageBuffer: [] });
  },
}));
