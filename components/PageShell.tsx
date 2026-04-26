"use client";
import { useEffect, useState } from "react";
import Sidebar from "./Nav/Sidebar";

import { usePathname } from "next/navigation";

export default function PageShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const pathname = usePathname();
  //   useEffect(() => {
  //     setSidebarOpen(true);
  //   }, [pathname]);
  return (
    <div className="flex h-screen">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex flex-col flex-1 overflow-auto">
        <main className="flex-1  bg-stone-800 ">{children}</main>
      </div>
    </div>
  );
}
