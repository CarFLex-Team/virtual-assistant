export default function FormattedMessage({ text }: { text: string }) {
  const lines = text.split("\n").filter((line) => line.trim() !== "");

  const renderInlineText = (content: string) => {
    const parts = content.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-bold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <em key={index} className="italic">
            {part.slice(1, -1)}
          </em>
        );
      }

      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="flex flex-col gap-3 text-sm mb-2">
      {lines.map((line, i) => {
        const trimmedLine = line.trim();
        // if (trimmedLine.startsWith("- ")) {
        //   const content = line.slice(2);
        //   const hasLabel = content.includes(":");
        //   const [label, ...rest] = content.split(":");
        //   return (
        //     <div key={i} className="flex gap-2">
        //       <span className="mt-0.5">•</span>
        //       {hasLabel ? (
        //         <span>
        //           <span className="font-bold text-accent">{label}:</span>
        //           <span>{rest.join(":")}</span>
        //         </span>
        //       ) : (
        //         <span>{content}</span>
        //       )}
        //     </div>
        //   );
        // }
        // Horizontal divider
        if (trimmedLine === "---") {
          return <hr key={i} className="border-border my-1" />;
        }

        // ### Section Header
        if (trimmedLine.startsWith("###")) {
          return (
            <h3 key={i} className="text-base font-bold text-accent mt-2">
              {trimmedLine.slice(4).trim()}
            </h3>
          );
        }
        // ## Main Header
        if (trimmedLine.startsWith("##")) {
          return (
            <h2 key={i} className="text-lg font-bold text-accent mt-3">
              {trimmedLine.slice(2).trim()}
            </h2>
          );
        }
        if (trimmedLine.startsWith("#")) {
          return (
            <h2 key={i} className=" font-xl font-bold text-accent mt-3">
              {trimmedLine.slice(1).trim()}
            </h2>
          );
        }

        // Bullet point using •
        if (trimmedLine === "•") {
          return null;
        }

        if (trimmedLine.startsWith("•")) {
          const content = trimmedLine.slice(1).trim();

          return (
            <div key={i} className="flex gap-2">
              <span className="mt-0.5">•</span>
              <span>{renderInlineText(content)}</span>
            </div>
          );
        }

        // Bullet point using -
        if (trimmedLine.startsWith("- ")) {
          const content = trimmedLine.slice(2).trim();

          return (
            <div key={i} className="flex gap-2">
              <span className="mt-0.5">•</span>
              <span>{renderInlineText(content)}</span>
            </div>
          );
        }

        // Recommendation
        if (trimmedLine.toLowerCase().startsWith("recommendation:")) {
          return (
            <p key={i} className="italic border-t border-border pt-3 mt-1">
              <span className="font-bold not-italic text-accent">
                Recommendation:{" "}
              </span>

              {renderInlineText(
                trimmedLine.slice(trimmedLine.indexOf(":") + 1).trim(),
              )}
            </p>
          );
        }

        // Normal paragraph
        return (
          <p key={i} className="font-medium">
            {renderInlineText(trimmedLine)}
          </p>
        );
      })}
    </div>
  );
}
