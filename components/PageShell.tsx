"use client";
import { Suspense, useEffect, useState } from "react";
import Sidebar from "./Nav/Sidebar";
import { useThreadStore } from "@/store/threadStore";
import TopNav from "./Nav/TopNav";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
export default function PageShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [threadsLoaded, setThreadsLoaded] = useState(false);
  const { setThreads } = useThreadStore();
  const { data: session } = authClient.useSession();
  const router = useRouter();
  useEffect(() => {
    const loadThreads = async () => {
      setThreadsLoaded(false);
      const res = await fetch(`/api/threads`);
      const data = await res.json();
      // console.log("Loaded threads:", data);
      setThreads(data.map((t: any) => ({ ...t, saved: true, buffer: [] })));
      setThreadsLoaded(true);
      // setActiveThread(data.length > 0 ? data[0].id : null);
    };
    loadThreads();
  }, [setThreads]);
  if (!session) {
    router.push("/login");
  }
  return (
    <div className="flex h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <Sidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          threadsLoaded={threadsLoaded}
          // activeThread={activeThread}
          // setActiveThread={setActiveThread}
        />
      </Suspense>
      <div className="flex flex-col flex-1">
        <TopNav onMenuClick={() => setSidebarOpen(true)} />
        <div className=" flex-1 overflow-auto ">
          <main className="flex-1  bg-background ">{children}</main>
        </div>
      </div>
    </div>
  );
}
