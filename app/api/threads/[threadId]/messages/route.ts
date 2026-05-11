import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  context: { params: { threadId: string } },
) {
  const { threadId } = await context.params;
  const { messages, title } = await req.json();

  if (!messages || messages.length === 0) {
    return NextResponse.json(
      { error: "No messages provided" },
      { status: 400 },
    );
  }

  try {
    // 1️⃣ Check if thread exists
    const { data: existingThread } = await db
      .from("chat_threads")
      .select("*")
      .eq("id", threadId)
      .single();

    let dbThreadId = threadId;

    if (!existingThread) {
      // 2️⃣ Create thread if it does not exist
      const { data: newThread } = await db
        .from("chat_threads")
        .insert({
          id: threadId, // keep the frontend ID so state matches
          title: title || "New Chat",
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      dbThreadId = newThread.id;
    }

    // 3️⃣ Insert messages
    const { data: savedMessages, error } = await db
      .from("chat_messages")
      .insert(messages.map((m: any) => ({ ...m, thread_id: dbThreadId })));

    if (error) throw error;

    return NextResponse.json({ threadId: dbThreadId, messages: savedMessages });
  } catch (err: any) {
    // await db.from("chat_threads").delete().eq("id", threadId);
    console.error("Error saving messages:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
