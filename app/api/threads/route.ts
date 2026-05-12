// app/api/messages/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { title, id } = await req.json();

  const { data, error } = await db
    .from("chat_threads")
    .insert({
      title,
      id: id || crypto.randomUUID(),
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
  const { data: threads, error } = await db
    .from("chat_threads")
    .select("*, chat_messages(*)")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(threads);
}
