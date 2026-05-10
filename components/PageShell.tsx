"use client";
import { useEffect, useState } from "react";
import Sidebar from "./Nav/Sidebar";

import { usePathname } from "next/navigation";

export default function PageShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [activeThread, setActiveThread] = useState<string | null>(null);
  const pathname = usePathname();

  //   useEffect(() => {
  //     setSidebarOpen(true);
  //   }, [pathname]);
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
