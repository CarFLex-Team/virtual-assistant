"use client";

export default function StreamingMessage({
  tokens,
  variant = "default",
}: {
  tokens: string[];
  variant?: "default" | "search" | "investigate";
}) {
  const isSearch = variant === "search";
  const isInvestigate = variant === "investigate";

  return (
    <div
      className={`max-w-[70vw] px-4 py-2.5 rounded-2xl rounded-bl-sm shadow-sm text-slate-100 wrap-break-word border ${
        isSearch
          ? "bg-search/10 border-search/40"
          : isInvestigate
            ? "bg-investigate/10 border-investigate/40"
            : "bg-surface border-border"
      }`}
    >
      <p className="font-medium leading-relaxed">
        {tokens.map((token, i) => (
          <span
            key={i}
            className="inline-block animate-[wordIn_0.25s_ease-out]"
          >
            {token}
          </span>
        ))}
        <span
          className={`inline-block w-0.5 h-[1em] ml-0.5 -mb-0.5 animate-pulse ${
            isSearch
              ? "bg-search"
              : isInvestigate
                ? "bg-investigate"
                : "bg-accent"
          }`}
        />
      </p>
    </div>
  );
}
