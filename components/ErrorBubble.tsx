import { AlertTriangle } from "lucide-react";

interface ErrorBubbleProps {
  content: { code?: string; message: string };
}

export default function ErrorBubble({ content }: ErrorBubbleProps) {
  return (
    <div className="max-w-[70vw] flex gap-2 items-start bg-danger-bg text-danger-text p-3 rounded-2xl rounded-bl-sm border border-danger-border">
      <AlertTriangle size={16} className="shrink-0 mt-0.5 text-danger" />
      <div>
        {content.code && (
          <p className="font-semibold text-danger">{content.code}</p>
        )}
        <p className="text-sm">{content.message}</p>
      </div>
    </div>
  );
}
