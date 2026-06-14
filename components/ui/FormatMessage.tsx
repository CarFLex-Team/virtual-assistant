export default function FormattedMessage({ text }: { text: string }) {
  const lines = text.split("\n").filter(Boolean);

  return (
    <div className="flex flex-col gap-3 text-sm mb-2">
      {lines.map((line, i) => {
        if (line.startsWith("- ")) {
          const content = line.slice(2);
          const [year, ...rest] = content.split(":");
          return (
            <div key={i} className="flex gap-2">
              <span className=" mt-0.5">•</span>
              <span>
                <span className="font-bold text-sky-900">{year}:</span>
                <span>{rest.join(":")}</span>
              </span>
            </div>
          );
        }

        if (line.startsWith("Recommendation:")) {
          return (
            <p key={i} className="italic border-t border-brand-mid pt-3 mt-1">
              <span className="font-bold not-italic text-sky-900">
                Recommendation:{" "}
              </span>
              {line.replace("Recommendation:", "").trim()}
            </p>
          );
        }

        return (
          <p key={i} className=" font-medium">
            {line}
          </p>
        );
      })}
    </div>
  );
}
