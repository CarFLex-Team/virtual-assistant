"use client";
import { useEffect, useState } from "react";
import NavButton from "../ui/NavButton";
import {
  PanelLeftClose,
  PanelLeftOpen,
  ChartColumnDecreasing,
  MessageSquare,
  Settings,
} from "lucide-react";

import { usePathname } from "next/navigation";

export default function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [active, setActive] = useState<string | null>(null);
  const pathname = usePathname() ?? "/";

  const navItems = [
    {
      id: "VirtualAssistant",
      label: "Virtual Assistant",
      href: "/",
      icon: MessageSquare,
    },
    {
      id: "Stats",
      label: "Statistics",
      href: "/stats",
      icon: ChartColumnDecreasing,
    },
    {
      id: "settings",
      label: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];
  useEffect(() => {
    if (!navItems.length) return;

    const current = navItems.find((i) => i.href === pathname);

    setActive(current?.label || null);
  }, [pathname, navItems]);

  return (
    <>
      <button
        type="button"
        className={`absolute inset-0 bg-black/40 transition-opacity duration-200 z-20 md:hidden ${
          open ? "opacity-100" : "hidden"
        }`}
        onClick={() => setOpen(false)}
        aria-label="Close menu"
      />

      <aside
        className={`h-screen flex flex-col justify-around sm:justify-between bg-zinc-800 border-r-2 border-r-gray-600  px-4 py-6  z-50  max-md:fixed max-md:inset-0 transform transition-transform duration-300 ease-in-out ${
          open ? "w-58 max-md:translate-x-0" : "w-16 max-md:-translate-x-full"
        }`}
      >
        <div className="overflow-auto">
          <div
            className={`flex items-center  mb-4 ${
              open ? "justify-between" : "justify-center"
            }`}
          >
            {open && (
              <div className="flex gap-2">
                <img src="/Logo.png" alt=" Logo" className=" w-7 rounded-lg" />
                <p className="text-gray-100 font-bold text-xl">ELIARA AI</p>
              </div>
            )}
            <button
              onClick={() => setOpen(!open)}
              aria-label="Close listings menu"
              className="p-1 rounded-sm  hover:bg-zinc-700 cursor-pointer text-gray-300 transition-colors duration-200"
            >
              {open ? (
                <PanelLeftClose size={22} />
              ) : (
                <PanelLeftOpen size={22} />
              )}
            </button>
          </div>

          <div
            className="flex flex-col gap-2 mt-10"
            aria-label="Mobile listings"
          >
            {navItems.map((item) => (
              <NavButton
                key={item.href}
                onClick={() => setActive(item.label)}
                item={item}
                isActive={active === item.label}
                className={
                  open ? " px-4 py-3 rounded-lg" : "p-1 mb-2 rounded-md"
                }
              >
                <item.icon size={20} />
                {open && item.label}
              </NavButton>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
