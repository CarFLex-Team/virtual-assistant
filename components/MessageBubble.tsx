"use client";
import { HatGlasses, ScanSearch, Search, SearchCheck } from "lucide-react";
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

    source?: "search" | "investigate" | "scan" | "detect";
  };
}

export default function MessageBubble({ message }: MessageProps) {
  const isUser = message.type === "user";
  const isSearch = !isUser && message.source === "search";
  const isInvestigate = !isUser && message.source === "investigate";
  const isScan = !isUser && message.source === "scan";
  const isDetect = !isUser && message.source === "detect";

  const trimmedContent =
    typeof message.content === "string" ? message.content.trim() : "";
  const isUserSearchCommand =
    isUser && trimmedContent.toLowerCase().startsWith("/search");
  const isUserInvestigateCommand =
    isUser && trimmedContent.toLowerCase().startsWith("/investigate");
  const isUserScanCommand =
    isUser && trimmedContent.toLowerCase().startsWith("/scan");
  const isUserDetectCommand =
    isUser && trimmedContent.toLowerCase().startsWith("/detect");
  const searchQuery = isUserSearchCommand
    ? trimmedContent.slice("/search".length).trim()
    : null;
  const investigateQuery = isUserInvestigateCommand
    ? trimmedContent.slice("/investigate".length).trim()
    : null;
  const scanQuery = isUserScanCommand
    ? trimmedContent.slice("/scan".length).trim()
    : null;
  const detectQuery = isUserDetectCommand
    ? trimmedContent.slice("/detect".length).trim()
    : null;

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
      className={`px-4 py-2.5 rounded-2xl wrap-break-word shadow-sm border
        ${message.visual ? "w-[70vw]" : "max-w-[70vw]"}
        ${
          isUser
            ? "bg-accent text-background rounded-br-sm border-transparent"
            : isSearch
              ? "bg-search/10 border-search/40 text-slate-100 rounded-bl-sm"
              : isInvestigate
                ? "bg-investigate/10 border-investigate/40 text-slate-100 rounded-bl-sm"
                : isScan
                  ? "bg-scan/10 border-scan/40 text-slate-100 rounded-bl-sm"
                  : isDetect
                    ? "bg-detect/10 border-detect/40 text-slate-100 rounded-bl-sm"
                : "bg-surface border-border text-slate-100 rounded-bl-sm"
        }`}
    >
      {isSearch && (
        <div className="flex items-center gap-1.5 text-xs font-medium text-search mb-1.5">
          <Search size={12} />
          Search
        </div>
      )}
      {isInvestigate && (
        <div className="flex items-center gap-1.5 text-xs font-medium text-investigate mb-1.5">
          <HatGlasses size={12} />
          Investigate
        </div>
      )}
      {isScan && (
        <div className="flex items-center gap-1.5 text-xs font-medium text-scan mb-1.5">
          <ScanSearch size={12} />
          Scan
        </div>
      )}
      {isDetect && (
        <div className="flex items-center gap-1.5 text-xs font-medium text-detect mb-1.5">
          <SearchCheck size={12} />
          Detect
        </div>
      )}
      {isUserSearchCommand ? (
        <div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold border border-background/30 shadow-sm rounded-md px-2 py-1 mb-1.5 bg-background/15">
            <Search size={12} />
            Search
          </span>
          {searchQuery && <FormattedMessage text={searchQuery} />}
        </div>
      ) : isUserInvestigateCommand ? (
        <div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold border border-background/30 shadow-sm rounded-md px-2 py-1 mb-1.5 bg-background/15">
            <HatGlasses size={12} />
            Investigate
          </span>
          {investigateQuery && <FormattedMessage text={investigateQuery} />}
        </div>
      ) : isUserScanCommand ? (
        <div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold border border-background/30 shadow-sm rounded-md px-2 py-1 mb-1.5 bg-background/15">
            <ScanSearch size={12} />
            Scan
          </span>
          {scanQuery && <FormattedMessage text={scanQuery} />}
        </div>
      ) : isUserDetectCommand ? (
        <div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold border border-background/30 shadow-sm rounded-md px-2 py-1 mb-1.5 bg-background/15">
            <SearchCheck size={12} />
            Detect
          </span>
          {detectQuery && <FormattedMessage text={detectQuery} />}
        </div>
      ) : (
        <FormattedMessage text={message.content || "No content"} />
      )}
      {message.visual && renderMessage(message as ChatMessage)}
    </div>
  );
}
