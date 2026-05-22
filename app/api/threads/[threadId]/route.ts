import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ threadId: string }> },
) {
  const { threadId } = await context.params;
  try {
    const { data, error } = await db
      .from("chat_threads")
      .delete()
      .eq("id", threadId);

    if (error) throw error;
    return NextResponse.json({ message: "Thread deleted", data });
  } catch (err: any) {
    // await db.from("chat_threads").delete().eq("id", threadId);
    console.error("Error deleting thread:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ threadId: string }> },
) {
  const { threadId } = await context.params;

  const { title } = await req.json();

  if (!title) {
    return NextResponse.json({ error: "No title provided" }, { status: 400 });
  }

  try {
    const { data, error } = await db
      .from("chat_threads")
      .update({ title })
      .eq("id", threadId)
      .select()
      .single();
    if (error) throw error;

    return NextResponse.json({ data });
  } catch (err: any) {
    // await db.from("chat_threads").delete().eq("id", threadId);
    console.error("Error editing Thread:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
