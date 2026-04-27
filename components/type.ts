export type MessageRole = "user" | "bot";
export type MessageType =
  | "user"
  | "bot"
  | "chart"
  | "table"
  | "ranking"
  | "distribution"
  | "clarification"
  | "error";

export type ChatMessage = {
  id: number;

  type: MessageType;
  content: any;
  timestamp?: string;
  status?: "sent" | "delivered" | "read" | "typing";
};
export type StatPoint = { t: number; v: number };
