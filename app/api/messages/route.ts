// app/api/messages/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// export async function POST(req: Request) {
//   const { threadId, message } = await req.json();
//   const saved = await db.chat_messages.create({
//     data: { thread_id: threadId, ...message },
//   });
//   return NextResponse.json(saved);
// }

// export async function GET(req: Request) {
//   const userId = req.url.split("userId=")[1];
//   const messages = await db.chat_messages.findMany({
//     where: { user_id: userId },
//     orderBy: { created_at: "asc" },
//   });
//   return NextResponse.json(messages);
// }
