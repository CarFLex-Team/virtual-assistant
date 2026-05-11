"use client";
import { Menu } from "lucide-react";

export default function TopNav({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <nav
      className="flex justify-between  items-center min-h-[5vh]  px-6 sm:px-9 bg-background "
      aria-label="Listings navigation"
    >
      <button
        onClick={onMenuClick}
        className="md:opacity-0 md:w-25 max-md:block text-gray-300"
        aria-controls="mobile-listings-aside"
      >
        <Menu size={28} />
      </button>

      <div className="w-fit "></div>
    </nav>
  );
}
