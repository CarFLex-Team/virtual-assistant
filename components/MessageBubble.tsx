"use client";
import TableView from "./TableView";
import { ChatMessage } from "@/store/threadStore";
import StatsChart from "./StatsChart";
import RankingView from "./RankingView";
import DistributionView from "./DistributionView";
import Clarification from "./Clarification";
import FormattedMessage from "./ui/FormatMessage";

interface MessageProps {
  message: {
    id: number;
    content: string;
    type: "user" | "bot" | "error";
    visual?: any;
    timestamp: string;
  };
}

export default function MessageBubble({ message }: MessageProps) {
  const isUser = message.type === "user";
  const renderMessage = (msg: ChatMessage) => {
    switch (msg.visual?.type?.toLowerCase()) {
      case "trend":
        return <StatsChart apiData={msg.visual} />;
      case "table":
        return <TableView data={msg.visual} />;
      case "ranking":
        return <RankingView data={msg.visual} />;
      case "distribution":
        return <DistributionView data={msg.visual} />;
      case "clarification":
        return <Clarification data={msg.visual} onSelect={() => {}} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`px-4 py-2.5 rounded-2xl wrap-break-word shadow-sm
        ${message.visual ? "w-[70vw]" : "max-w-[70vw]"}
        ${
          isUser
            ? "bg-accent text-background rounded-br-sm"
            : "bg-surface border border-border text-slate-100 rounded-bl-sm"
        }`}
    >
      <FormattedMessage text={message.content || "No content"} />
      {message.visual && renderMessage(message as ChatMessage)}
    </div>
  );
}
