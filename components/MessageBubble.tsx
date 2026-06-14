"use client";
import ReactMarkdown from "react-markdown";
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
    visual?: any; // for charts/tables
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
    }
  };
  return (
    <div
      className={`max-w-[70vw] px-4 py-2 rounded-xl wrap-break-word
        ${isUser ? "bg-sky-900 text-white  rounded-br-none" : "bg-white text-gray-800  rounded-bl-none"}
        shadow-md ${message.visual && "w-[70vw]"} `}
    >
      <FormattedMessage text={message.content || "No content"} />
      {message.visual && renderMessage(message)}
    </div>
  );
}
