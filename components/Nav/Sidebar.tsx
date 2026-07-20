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
  Save,
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
  const ellipsisRef = useRef<HTMLDivElement>(null);

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

  return (
    <aside
      className={`h-screen flex flex-col justify-around sm:justify-between bg-background border-r-2 border-r-sky-950 px-4 py-6 transform  z-10 max-md:fixed max-md:inset-0 transition-transform ${
        open ? "w-58 max-md:translate-x-0" : "w-16 max-md:-translate-x-full"
      }`}
    >
      <div className="">
        {/* Logo & toggle */}
        <div
          className={`flex items-center mb-4 ${open ? "justify-between" : "justify-center"}`}
        >
          {open && (
            <div className="flex gap-2 items-center">
              <img src="/Logo.png" className="w-7 rounded-lg" />
              <p className="text-gray-100 font-bold text-xl">ELIARA AI</p>
            </div>
          )}
          <button
            onClick={() => setOpen(!open)}
            className="p-1 rounded-sm hover:bg-gray-600 text-gray-300"
          >
            {open ? <PanelLeftClose size={22} /> : <PanelLeftOpen size={22} />}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-2 mt-10">
          {navItems.map((item) => (
            <NavButton
              key={item.href}
              onClick={() => {
                setActiveNav(item.label);
                if (item.label === "Statistics" || item.label === "Dashboard") {
                  setActiveThread(null);
                }
                item.onClick && item.onClick();
              }}
              item={item}
              isActive={activeNav === item.label}
              className={
                open
                  ? "px-4 py-3 rounded-lg"
                  : "p-1 mb-2 rounded-md justify-center"
              }
            >
              <item.icon size={20} strokeWidth={3} />
              {open && (
                <span
                  className={` ${activeNav === item.label ? "text-white" : "text-sky-100"}`}
                >
                  {item.label}
                </span>
              )}
            </NavButton>
          ))}

          {/* Threads */}
          {open && (
            <div className="mt-6 overflow-y-auto max-h-[35vh]">
              <p className={`text-gray-400 ${open ? "px-4 py-1" : ""}`}>
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
                    className={`cursor-pointer p-2 my-1 rounded flex justify-between items-center relative ${
                      t.id === activeThread
                        ? "bg-blue-100"
                        : "text-white hover:bg-gray-100 hover:text-gray-900"
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
                        className="w-full rounded border border-gray-300 px-1"
                      />
                    ) : (
                      <p>
                        {t.title !== "New Chat"
                          ? t.title
                          : t.chat_messages[0]?.content
                              ?.split(" ")
                              .slice(0, 2)
                              .join(" ") ||
                            t.buffer[0]?.content
                              ?.split(" ")
                              .slice(0, 2)
                              .join(" ") ||
                            "New Chat"}
                      </p>
                    )}
                    {t.saved && (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setEllipsisOpenThreadId(
                            ellipsisOpenThreadId === t.id ? null : t.id,
                          );
                        }}
                        className="p-1 hover:bg-gray-200  rounded-lg"
                      >
                        <EllipsisVertical size={18} />
                      </div>
                    )}
                    {ellipsisOpenThreadId === t.id && (
                      <div
                        className="absolute right-0 mt-1 bg-background rounded-lg shadow-md z-20 p-1 "
                        ref={ellipsisRef}
                      >
                        <button
                          className="flex justify-start items-center gap-1 px-5 py-1 hover:bg-gray-500 w-full text-left text-white rounded-lg my-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingThreadId(t.id);
                            setTempTitle(t.title || "");
                            setEllipsisOpenThreadId(null);
                          }}
                        >
                          <Pen size={16} /> Rename
                        </button>
                        <button
                          className="flex justify-start items-center gap-1 px-5 py-1 hover:bg-red-200 w-full  text-red-500 rounded-lg my-1"
                          onClick={(e) => handleThreadDelete(t.id, e)}
                        >
                          <Trash size={16} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                ),
              )}
            </div>
          )}
        </div>
      </div>

      {session && (
        <>
          <div
            onClick={() => setProfileModalOpen(true)}
            className={`cursor-pointer mt-10 rounded flex items-center gap-2 transition-colors ${
              open
                ? "px-2 py-3 rounded-lg"
                : "p-1 mb-2 rounded-md justify-center"
            } hover:bg-gray-600  text-gray-100`}
          >
            <div className="w-8 h-8 rounded-full bg-sky-900 flex items-center justify-center text-xs font-semibold shrink-0">
              {initials}
            </div>

            {open && (
              <span className="truncate">
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
                className="bg-background border border-sky-900 rounded-xl p-6 w-72 relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => {
                    setIsEditingProfile(false);
                    setProfileModalOpen(false);
                  }}
                  className="absolute top-3 right-3 text-gray-400 hover:text-white"
                >
                  <X size={18} />
                </button>

                <div className="flex flex-col items-center gap-2 mb-6">
                  <div className="w-14 h-14 rounded-full bg-sky-900 flex items-center justify-center text-lg font-semibold text-white">
                    {initials}
                  </div>

                  <input
                    type="text"
                    value={name}
                    readOnly={!isEditingProfile}
                    onChange={(e) => setName(e.target.value)}
                    className={`text-white  bg-transparent  focus:outline-none ${isEditingProfile ? "focus:ring-2 focus:ring-blue-900  border-b border-sky-900" : ""} text-center w-full`}
                  />
                  <p className="text-gray-400 text-sm">{session.user?.email}</p>
                </div>
                {editError && (
                  <p className="font-body text-brand-red text-sm mt-3">
                    {editError}
                  </p>
                )}
                <div className="flex flex-col gap-2">
                  {isEditingProfile && (
                    <div className="flex items-center justify-center gap-2 ">
                      <button
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:bg-sky-900 transition-colors`}
                        onClick={() => {
                          handleEditProfile();
                        }}
                      >
                        {editLoading ? "Saving..." : <>Save</>}
                      </button>
                      <button
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-red-500 hover:bg-red-100 hover:text-red-600 transition-colors`}
                        onClick={() => {
                          setIsEditingProfile(false);
                          setName(session?.user?.name || "Account");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                  {!isEditingProfile && (
                    <button
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:bg-sky-900 transition-colors`}
                      onClick={() => {
                        if (isEditingProfile) handleEditProfile();
                        else setIsEditingProfile(true);
                      }}
                    >
                      {editLoading ? (
                        "Saving..."
                      ) : isEditingProfile ? (
                        "Save Changes"
                      ) : (
                        <>
                          <User size={16} /> Edit Profile
                        </>
                      )}
                    </button>
                  )}
                  {/* <button
                    onClick={handleEditProfile}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:bg-sky-900 transition-colors"
                  >
                    <User size={16} /> Edit Profile
                  </button> */}
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-500 hover:bg-red-100 hover:text-red-600 transition-colors"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </aside>
  );
}
