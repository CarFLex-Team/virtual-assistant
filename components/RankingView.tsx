interface RankingViewProps {
  data: {
    ranking: { label: string; value: number }[];
  };
}

export default function RankingView({ data }: RankingViewProps) {
  const max = data.ranking[0]?.value || 1;

  if (data.ranking.length === 0) {
    return (
      <div className="bg-background p-4 rounded-xl border border-border w-full text-slate-500 text-sm">
        No ranking data.
      </div>
    );
  }

  return (
    <div className="bg-background p-4 rounded-xl border border-border w-full">
      {data.ranking.map((item) => (
        <div key={item.label} className="flex items-center gap-2 mb-2">
          <span className="min-w-32 text-slate-400 text-sm">{item.label}</span>
          <div className="flex-1 h-4 bg-border rounded-full relative overflow-hidden">
            <div
              className="h-4 bg-accent rounded-full absolute top-0 left-0"
              style={{
                width: `${Math.min((item.value / max) * 100, 100)}%`,
              }}
            />
          </div>
          <span className="ml-2 text-slate-100 font-medium text-sm">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}
