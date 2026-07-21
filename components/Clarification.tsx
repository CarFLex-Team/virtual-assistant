interface ClarificationProps {
  data: {
    question: string;
    options: string[];
  };
  onSelect: (option: string) => void;
}

export default function Clarification({ data, onSelect }: ClarificationProps) {
  return (
    <div className="bg-background p-4 rounded-xl border border-border w-full flex flex-col gap-2">
      <p className="text-slate-200 font-medium mb-2">{data.question}</p>
      <div className="flex gap-2 flex-wrap">
        {data.options.map((opt) => (
          <button
            key={opt}
            className="bg-surface border border-border hover:border-accent hover:text-white text-slate-200 px-4 py-2 rounded-xl transition-colors cursor-pointer"
            onClick={() => onSelect(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
