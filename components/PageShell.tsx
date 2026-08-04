"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import Sidebar from "./Nav/Sidebar";
import { useThreadStore } from "@/store/threadStore";
import TopNav from "./Nav/TopNav";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

export default function PageShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [threadsLoaded, setThreadsLoaded] = useState(false);
  const { mergeServerThreads } = useThreadStore();
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const loadedForUserId = useRef<string | null>(null);

  useEffect(() => {
    if (isPending || !session) return;
    if (loadedForUserId.current === session.user.id) return;
    loadedForUserId.current = session.user.id;

    const loadThreads = async () => {
      setThreadsLoaded(false);
      const res = await fetch(`/api/threads`);
      const data = await res.json();
      mergeServerThreads(data);
      setThreadsLoaded(true);
    };
    loadThreads();
  }, [session, isPending, mergeServerThreads]);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [session, isPending, router]);

  return (
    <div className="flex h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <Sidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          threadsLoaded={threadsLoaded}
        />
      </Suspense>
      <div className="flex flex-col flex-1">
        <TopNav onMenuClick={() => setSidebarOpen(true)} />
        <div className="flex-1 overflow-auto">
          <main className="flex-1 bg-background">{children}</main>
        </div>
      </div>
    </div>
  );
}
