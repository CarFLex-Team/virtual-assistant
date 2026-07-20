import { AlertTriangle } from "lucide-react";

interface ErrorBubbleProps {
  content: { code?: string; message: string };
}

export default function ErrorBubble({ content }: ErrorBubbleProps) {
  return (
    <div className="max-w-[70vw] flex gap-2 items-start bg-[#3F1D1D] text-[#FCA5A5] p-3 rounded-2xl rounded-bl-sm border border-[#5C2626]">
      <AlertTriangle size={16} className="shrink-0 mt-0.5 text-[#F87171]" />
      <div>
        {content.code && (
          <p className="font-semibold text-[#F87171]">{content.code}</p>
        )}
        <p className="text-sm">{content.message}</p>
      </div>
    </div>
  );
}
