import { NextResponse } from "next/server";
import { db } from "@/lib/db";
export async function POST(
  req: Request,
  context: { params: { threadId: string } },
) {
  const { threadId } = await context.params;
  console.log("Received messages for thread:", threadId);
  const { messages } = await req.json();
  console.log("Messages to save:", messages);

  const { data: threads, error } = await db
    .from("chat_messages")
    .insert(messages.map((m: any) => ({ ...m, thread_id: threadId })));

  if (error) {
    console.error("Error saving messages:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(threads);
}
