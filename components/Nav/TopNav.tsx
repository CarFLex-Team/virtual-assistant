"use client";
import { Menu } from "lucide-react";

export default function TopNav({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <nav
      className=" max-h-[5vh]  px-6 sm:px-9 bg-background  "
      aria-label="Listings navigation"
    >
      <div className="flex justify-between items-center border-b border-sky-950 shadow-sky-950 inset-shadow-xl">
        <button
          onClick={onMenuClick}
          className="md:opacity-0 md:w-25 max-md:block text-gray-300"
          aria-controls="mobile-listings-aside"
        >
          <Menu size={28} />
        </button>

        <div className="w-fit "></div>
      </div>
    </nav>
  );
}
