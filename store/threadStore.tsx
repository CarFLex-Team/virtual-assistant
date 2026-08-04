// store/threadStore.ts
import { create } from "zustand";

export type ChatMessage = {
  id: number;
  summary?: string;
  source?: string;
  type: "user" | "bot" | "error";
  content: any;
  visual?: any;
  timestamp: string;
};

export type Thread = {
  id: string;
  title?: string;
  chat_messages: ChatMessage[];
  created_at: string;
  buffer: ChatMessage[];
  saved?: boolean;
};

interface ThreadState {
  threads: Thread[];
  setThreads: (update: Thread[] | ((prev: Thread[]) => Thread[])) => void;

  activeThread: string | null;
  setActiveThread: (id: string | null) => void;

  pendingThreads: Thread[] | null;
  setPendingThreads: (
    update: Thread[] | null | ((prev: Thread[] | null) => Thread[] | null),
  ) => void;

  // merges freshly-fetched server threads with any unflushed local buffers,
  // so a background refetch can never silently drop in-flight messages.
  mergeServerThreads: (serverThreads: any[]) => void;

  messageBuffer: ChatMessage[];
  addToBuffer: (msg: ChatMessage) => void;
  setMessageBuffer: (msgs: ChatMessage[]) => void;
  clearBuffer: () => void;
}

export const useThreadStore = create<ThreadState>((set, get) => ({
  threads: [],
  setThreads: (update) =>
    set((state) => ({
      threads: typeof update === "function" ? update(state.threads) : update,
    })),

  activeThread: null,
  setActiveThread: (id) => set({ activeThread: id }),

  pendingThreads: null,
  setPendingThreads: (update) =>
    set((state) => ({
      pendingThreads:
        typeof update === "function" ? update(state.pendingThreads) : update,
    })),

  mergeServerThreads: (serverThreads) => {
    const prevById = new Map(get().threads.map((t) => [t.id, t]));

    const merged: Thread[] = serverThreads.map((t) => {
      const existing = prevById.get(t.id);

      if (existing?.buffer?.length) {
        return {
          ...t,
          saved: existing.saved,
          buffer: existing.buffer,
          chat_messages: existing.chat_messages,
        };
      }

      const savedBuffer =
        typeof window !== "undefined"
          ? localStorage.getItem(`messageBuffer ${t.id}`)
          : null;
      const buffered: ChatMessage[] = savedBuffer
        ? JSON.parse(savedBuffer)
        : [];
      const existingIds = new Set(
        (t.chat_messages ?? []).map((m: any) => m.id),
      );
      const newMsgs = buffered.filter((m) => !existingIds.has(m.id));

      return {
        ...t,
        saved: true,
        buffer: buffered,
        chat_messages: [...(t.chat_messages ?? []), ...newMsgs],
      };
    });

    set({ threads: merged });
  },

  messageBuffer: [],
  addToBuffer: (msg) => {
    localStorage.setItem(
      `messageBuffer ${get().activeThread}`,
      JSON.stringify([...get().messageBuffer, msg]),
    );
    set({ messageBuffer: [...get().messageBuffer, msg] });
  },
  setMessageBuffer: (msgs) => set({ messageBuffer: msgs }),
  clearBuffer: () => {
    localStorage.removeItem(`messageBuffer ${get().activeThread}`);
    set({ messageBuffer: [] });
  },
}));
