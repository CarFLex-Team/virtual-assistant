export default function FormattedMessage({ text }: { text: string }) {
  const lines = text.split("\n").filter(Boolean);

  return (
    <div className="flex flex-col gap-3 text-sm mb-2">
      {lines.map((line, i) => {
        if (line.startsWith("- ")) {
          const content = line.slice(2);
          const hasLabel = content.includes(":");
          const [label, ...rest] = content.split(":");

          return (
            <div key={i} className="flex gap-2">
              <span className="mt-0.5">•</span>
              {hasLabel ? (
                <span>
                  <span className="font-bold text-accent">{label}:</span>
                  <span>{rest.join(":")}</span>
                </span>
              ) : (
                <span>{content}</span>
              )}
            </div>
          );
        }

        if (line.toLowerCase().startsWith("recommendation:")) {
          return (
            <p key={i} className="italic border-t border-border pt-3 mt-1">
              <span className="font-bold not-italic text-accent">
                Recommendation:{" "}
              </span>
              {line.slice(line.indexOf(":") + 1).trim()}
            </p>
          );
        }

        return (
          <p key={i} className="font-medium">
            {line}
          </p>
        );
      })}
    </div>
  );
}
