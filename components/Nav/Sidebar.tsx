"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  PanelLeftClose,
  PanelLeftOpen,
  MessageSquare,
  ChartColumnDecreasing,
  Trash,
  EllipsisVertical,
  Pen,
  LayoutDashboard,
  LogOut,
  User,
  X,
  Sparkles,
} from "lucide-react";
import NavButton from "../ui/NavButton";
import { useThreadStore } from "@/store/threadStore";
import { authClient, updateUser } from "@/lib/auth/auth-client";

export default function Sidebar({
  open,
  setOpen,
  threadsLoaded,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  threadsLoaded: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const threadIdFromUrl = searchParams.get("threadId");
  const { data: session } = authClient.useSession();
  const {
    threads,
    setThreads,
    activeThread,
    setActiveThread,
    pendingThreads,
    setPendingThreads,
  } = useThreadStore();

  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [editingThreadId, setEditingThreadId] = useState<string | null>(null);
  const [name, setName] = useState(session?.user?.name || "Account");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [ellipsisOpenThreadId, setEllipsisOpenThreadId] = useState<
    string | null
  >(null);
  const [tempTitle, setTempTitle] = useState("");
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [ellipsisPos, setEllipsisPos] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const ellipsisRef = useRef<HTMLDivElement>(null);
  const threadListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ellipsisRef.current &&
        !ellipsisRef.current.contains(event.target as Node)
      ) {
        setEllipsisOpenThreadId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ellipsisRef]);

  // The dropdown used to be `position: absolute` inside the thread list's
  // `overflow-y-auto` container, so a menu opened near the bottom of that
  // scroll area got visually clipped (the "Delete" option cut off in your
  // screenshot). Positioning it with `fixed` — anchored to the button's real
  // on-screen coordinates — lets it render above everything, unclipped.
  const openEllipsisMenu = (
    e: React.MouseEvent<HTMLDivElement>,
    threadId: string,
  ) => {
    e.stopPropagation();
    if (ellipsisOpenThreadId === threadId) {
      setEllipsisOpenThreadId(null);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const MENU_WIDTH = 144; // w-36
    setEllipsisPos({
      top: rect.bottom + 4,
      left: Math.min(
        rect.right - MENU_WIDTH,
        window.innerWidth - MENU_WIDTH - 8,
      ),
    });
    setEllipsisOpenThreadId(threadId);
  };

  // Fixed-position menus don't move with the scroll container they were
  // opened from, so close it if the thread list scrolls underneath it.
  useEffect(() => {
    const el = threadListRef.current;
    if (!el) return;
    const onScroll = () => setEllipsisOpenThreadId(null);
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    {
      id: "Dashboard",
      label: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      id: "NewChat",
      label: "New Chat",
      href: "/chat",
      icon: MessageSquare,
      onClick: () => {
        startNewChat();
      },
    },
    {
      id: "Stats",
      label: "Statistics",
      href: "/stats",
      icon: ChartColumnDecreasing,
    },
  ];

  useEffect(() => {
    if (threadIdFromUrl && threadIdFromUrl !== activeThread) {
      setActiveThread(threadIdFromUrl);
    }
  }, [threadIdFromUrl, threadsLoaded]);

  useEffect(() => {
    const current = navItems.find((i) => i.href === window.location.pathname);
    setActiveNav(current?.label || null);
  }, []);
  useEffect(() => {
    setName(session?.user?.name || "Account");
  }, [session?.user?.name]);
  useEffect(() => {
    if (
      window.location.pathname === "/chat" &&
      !activeThread &&
      pendingThreads === null
    ) {
      const newThread = {
        id: crypto.randomUUID(),
        title: "New Chat",
        chat_messages: [],
        createdAt: new Date().toISOString(),
        buffer: [],
      };
      setPendingThreads([newThread, ...(pendingThreads || [])]);
      setActiveThread(newThread.id);
      setActiveNav("New Chat");
    }
  }, [activeThread, pendingThreads, setActiveThread, setPendingThreads]);

  const startNewChat = () => {
    const newThread = {
      id: crypto.randomUUID(),
      title: "New Chat",
      chat_messages: [],
      createdAt: new Date().toISOString(),
      buffer: [],
    };
    setPendingThreads([newThread, ...(pendingThreads || [])]);
    setActiveThread(newThread.id);
    setActiveNav("New Chat");
  };

  const setActiveThreadAndUrl = (id: string) => {
    setActiveThread(id);
    router.push(`chat/?threadId=${id}`);
  };

  const handleThreadEdit = (id: string, e: any, title: string) => {
    e.stopPropagation();
    fetch(`/api/threads/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    }).then((res) => {
      if (res.ok) {
        setThreads(threads.map((t) => (t.id === id ? { ...t, title } : t)));
      }
    });
  };

  const handleThreadDelete = (id: string, e: any) => {
    e.stopPropagation();
    fetch(`/api/threads/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setThreads(threads.filter((t) => t.id !== id));
        if (activeThread === id) {
          setActiveThread(null);
        }
      }
    });
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  const handleEditProfile = async () => {
    setEditError(null);
    setEditLoading(true);
    const { error } = await updateUser({
      name: name,
    });
    if (error) {
      setEditError(error.message ?? "Invalid profile information.");
    } else {
      setIsEditingProfile(false);
    }
    setEditLoading(false);
  };

  const initials =
    session?.user?.name
      ?.split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

  // Thread title fallback — guards against `content` being a stringified object
  const getThreadLabel = (t: (typeof threads)[number]) => {
    if (t.title !== "New Chat") return t.title;
    const raw =
      t.chat_messages[0]?.content ?? t.buffer[0]?.content ?? "New Chat";
    const text = typeof raw === "string" ? raw : "New Chat";
    return text.split(" ").slice(0, 4).join(" ") || "New Chat";
  };

  return (
    <aside
      id="app-sidebar"
      className={`h-screen flex flex-col bg-background border-r border-border py-6 z-10 max-md:fixed max-md:inset-0 transition-[width,transform] duration-200 ${
        open ? "w-60 max-md:translate-x-0" : "w-16 max-md:-translate-x-full"
      }`}
    >
      {/* Header — fixed, never scrolls */}
      <div
        className={`shrink-0 flex items-center mb-8 px-3 ${open ? "justify-between" : "justify-center"}`}
      >
        {open && (
          <div className="flex gap-2 items-center">
            <div className="w-7 h-7 rounded-lg bg-surface border border-border flex items-center justify-center">
              <Sparkles size={15} className="text-accent" />
            </div>
            <p className="text-slate-100 font-semibold text-lg tracking-tight">
              ELIARA
            </p>
          </div>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="p-1.5 rounded-md hover:bg-surface text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
        >
          {open ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
        </button>
      </div>

      {/* Nav + Recent Chats — the ONE scrollable region.
          flex-1 + min-h-0 lets this shrink and scroll instead of pushing
          the profile footer off-screen; min-h-0 is required here because a
          flex child won't shrink below its content size by default. */}
      <div ref={threadListRef} className="flex-1 min-h-0 overflow-y-auto px-3">
        <div className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = activeNav === item.label;
            return (
              <NavButton
                key={item.href}
                onClick={() => {
                  setActiveNav(item.label);
                  if (
                    item.label === "Statistics" ||
                    item.label === "Dashboard"
                  ) {
                    setActiveThread(null);
                  }
                  item.onClick && item.onClick();
                }}
                item={item}
                isActive={isActive}
                className={`transition-colors ${
                  isActive
                    ? "bg-surface text-slate-100"
                    : "text-slate-400 hover:bg-surface hover:text-slate-100"
                } ${
                  open
                    ? "px-3 py-2.5 rounded-lg"
                    : "p-2 mb-1 rounded-lg justify-center"
                }`}
              >
                <item.icon
                  size={19}
                  strokeWidth={2.25}
                  className={isActive ? "text-accent" : ""}
                />
                {open && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </NavButton>
            );
          })}

          {open && (
            <div className="mt-6">
              <p className="text-[11px] uppercase tracking-wide text-slate-500 px-3 py-1 mb-1">
                Recent Chats
              </p>
              {[...(pendingThreads ? pendingThreads : []), ...threads].map(
                (t) => (
                  <div
                    key={t.id}
                    onClick={() => {
                      setActiveThreadAndUrl(t.id);
                      setActiveNav(null);
                    }}
                    className={`group cursor-pointer px-3 py-2 my-0.5 rounded-lg flex justify-between items-center relative transition-colors ${
                      t.id === activeThread
                        ? "bg-surface text-slate-100"
                        : "text-slate-400 hover:bg-surface hover:text-slate-100"
                    }`}
                  >
                    {editingThreadId === t.id ? (
                      <input
                        type="text"
                        value={tempTitle}
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => setTempTitle(e.target.value)}
                        onBlur={(e) => {
                          handleThreadEdit(t.id, e, tempTitle);
                          setEditingThreadId(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleThreadEdit(t.id, e, tempTitle);
                            setEditingThreadId(null);
                          }
                        }}
                        className="w-full rounded border border-accent bg-background text-slate-100 px-2 py-0.5 focus:outline-none"
                      />
                    ) : (
                      <p className="text-sm truncate pr-2">
                        {getThreadLabel(t)}
                      </p>
                    )}
                    {t.saved && (
                      <div
                        onClick={(e) => openEllipsisMenu(e, t.id)}
                        className="p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-border transition-opacity shrink-0"
                      >
                        <EllipsisVertical size={16} />
                      </div>
                    )}
                  </div>
                ),
              )}
            </div>
          )}
        </div>
      </div>

      {/* Ellipsis dropdown — rendered at the aside's top level (outside the
          scrollable container) and positioned with `fixed`, so it can never
          be clipped by the thread list's overflow boundary. */}
      {ellipsisOpenThreadId && ellipsisPos && (
        <div
          className="fixed bg-surface border border-border rounded-lg shadow-lg z-50 p-1 w-36"
          style={{ top: ellipsisPos.top, left: ellipsisPos.left }}
          ref={ellipsisRef}
        >
          <button
            className="flex items-center gap-2 px-3 py-1.5 hover:bg-border w-full text-left text-slate-200 rounded-md text-sm"
            onClick={(e) => {
              e.stopPropagation();
              setEditingThreadId(ellipsisOpenThreadId);
              const t = [...(pendingThreads || []), ...threads].find(
                (t) => t.id === ellipsisOpenThreadId,
              );
              setTempTitle(t?.title || "");
              setEllipsisOpenThreadId(null);
            }}
          >
            <Pen size={14} /> Rename
          </button>
          <button
            className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#3F1D1D] w-full text-left text-red-400 rounded-md text-sm"
            onClick={(e) => {
              handleThreadDelete(ellipsisOpenThreadId, e);
              setEllipsisOpenThreadId(null);
            }}
          >
            <Trash size={14} /> Delete
          </button>
        </div>
      )}

      {/* Profile — fixed footer, never scrolls, shrink-0 so it keeps its size */}
      {session && (
        <div className="shrink-0 px-3">
          <div
            onClick={() => setProfileModalOpen(true)}
            className={`cursor-pointer rounded-lg flex items-center gap-2 transition-colors ${
              open ? "px-2 py-2.5" : "p-2 justify-center"
            } hover:bg-surface text-slate-200`}
          >
            <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-xs font-semibold text-accent shrink-0">
              {initials}
            </div>

            {open && (
              <span className="truncate text-sm">
                {session.user?.name || "Account"}
              </span>
            )}
          </div>

          {profileModalOpen && (
            <div
              className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
              onClick={() => {
                setProfileModalOpen(false);
                setIsEditingProfile(false);
              }}
            >
              <div
                className="bg-background border border-border rounded-2xl p-6 w-72 relative shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => {
                    setIsEditingProfile(false);
                    setProfileModalOpen(false);
                  }}
                  className="absolute top-3 right-3 text-slate-500 hover:text-slate-200 transition-colors"
                >
                  <X size={18} />
                </button>

                <div className="flex flex-col items-center gap-2 mb-6">
                  <div className="w-14 h-14 rounded-full bg-surface border border-border flex items-center justify-center text-lg font-semibold text-accent">
                    {initials}
                  </div>

                  <input
                    type="text"
                    value={name}
                    readOnly={!isEditingProfile}
                    onChange={(e) => setName(e.target.value)}
                    className={`text-slate-100 bg-transparent focus:outline-none text-center w-full ${
                      isEditingProfile
                        ? "focus:ring-2 focus:ring-accent border-b border-border rounded-sm"
                        : ""
                    }`}
                  />
                  <p className="text-slate-500 text-sm">
                    {session.user?.email}
                  </p>
                </div>
                {editError && (
                  <p className="text-red-400 text-sm mt-1 mb-3 text-center">
                    {editError}
                  </p>
                )}
                <div className="flex flex-col gap-2">
                  {isEditingProfile ? (
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="px-4 py-2 rounded-lg text-background bg-accent hover:bg-[var(--color-accent-hover)] font-medium transition-colors cursor-pointer"
                        onClick={handleEditProfile}
                      >
                        {editLoading ? "Saving..." : "Save"}
                      </button>
                      <button
                        className="px-4 py-2 rounded-lg text-slate-400 hover:bg-surface hover:text-slate-200 transition-colors cursor-pointer"
                        onClick={() => {
                          setIsEditingProfile(false);
                          setName(session?.user?.name || "Account");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-slate-200 hover:bg-surface border border-border transition-colors cursor-pointer"
                      onClick={() => setIsEditingProfile(true)}
                    >
                      <User size={16} /> Edit profile
                    </button>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-red-400 hover:bg-[#3F1D1D] transition-colors cursor-pointer"
                  >
                    <LogOut size={16} /> Sign out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
