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

  pendingThread: Thread | null;
  setPendingThread: (thread: Thread | null) => void;

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

  pendingThread: null,
  setPendingThread: (thread) => set({ pendingThread: thread }),

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
