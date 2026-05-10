"use client";
import { useEffect, useState } from "react";
import Sidebar from "./Nav/Sidebar";
import { useThreadStore } from "@/store/threadStore";

export default function PageShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { setThreads } = useThreadStore();

  useEffect(() => {
    const loadThreads = async () => {
      const res = await fetch(`/api/threads`);
      const data = await res.json();
      // console.log("Loaded threads:", data);
      setThreads(data.map((t: any) => ({ ...t, saved: true })));
      // setActiveThread(data.length > 0 ? data[0].id : null);
    };
    loadThreads();
  }, [setThreads]);
  return (
    <div className="flex h-screen">
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        // activeThread={activeThread}
        // setActiveThread={setActiveThread}
      />

      <div className="flex flex-col flex-1 overflow-auto">
        <main className="flex-1  bg-background ">{children}</main>
      </div>
    </div>
  );
}
