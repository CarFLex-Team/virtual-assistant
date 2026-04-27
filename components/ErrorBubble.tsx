interface ErrorBubbleProps {
  content: { code?: string; message: string };
}

export default function ErrorBubble({ content }: ErrorBubbleProps) {
  console.error("AI Error:", content);
  return (
    <div className="bg-red-100 text-red-700 p-3 rounded-lg shadow-sm border border-red-300 w-full">
      {content.code && <p className="font-bold">{content.code}</p>}
      <p>{content.message}</p>
    </div>
  );
}
