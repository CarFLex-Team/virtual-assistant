"use client";
import { Menu } from "lucide-react";

export default function TopNav({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <nav
      className="h-[8vh] px-6 sm:px-9 bg-background"
      aria-label="Main navigation"
    >
      <div className="flex justify-between items-center h-full border-b border-border">
        <button
          onClick={onMenuClick}
          className="md:hidden text-slate-300 hover:text-white transition-colors"
          aria-controls="app-sidebar"
          aria-label="Open sidebar"
        >
          <Menu size={24} />
        </button>

        <div className="w-fit" />
      </div>
    </nav>
  );
}
