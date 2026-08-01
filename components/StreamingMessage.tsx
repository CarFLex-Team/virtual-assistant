"use client";

export default function StreamingMessage({ tokens }: { tokens: string[] }) {
  return (
    <div className="max-w-[70vw] px-4 py-2.5 rounded-2xl rounded-bl-sm shadow-sm bg-surface border border-border text-slate-100 break-words">
      <p className="font-medium leading-relaxed">
        {tokens.map((token, i) => (
          <span
            key={i}
            className="inline-block animate-[wordIn_0.25s_ease-out]"
          >
            {token}
          </span>
        ))}
        <span className="inline-block w-[2px] h-[1em] bg-accent ml-0.5 -mb-0.5 animate-pulse" />
      </p>
    </div>
  );
}
