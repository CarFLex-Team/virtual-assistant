// app/api/messages/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user.id;
  console.log("User ID from session:", user);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { title, id } = await req.json();
  const threadId = id ?? crypto.randomUUID();
  const { data, error } = await db
    .from("chat_threads")
    .insert({
      title,
      id: threadId,
      user_id: user,
    })
    .select();

  if (error) {
    console.error("Error creating thread:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  console.log("Thread created:", data);
  return NextResponse.json(data);
}

export async function GET(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user.id;
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { data: threads, error } = await db
    .from("chat_threads")
    .select("*, chat_messages(*)")
    .eq("user_id", user)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(threads);
}
