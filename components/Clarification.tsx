interface ClarificationProps {
  data: {
    question: string;
    options: string[];
  };
  onSelect: (option: string) => void;
}

export default function Clarification({ data, onSelect }: ClarificationProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 w-full flex flex-col gap-2">
      <p className="text-gray-700 font-medium mb-2">{data.question}</p>
      <div className="flex gap-2 flex-wrap">
        {data.options.map((opt) => (
          <button
            key={opt}
            className="bg-sky-900 hover:bg-sky-800 text-white px-4 py-2 rounded-xl transition-colors"
            onClick={() => onSelect(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
