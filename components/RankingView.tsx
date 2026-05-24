interface RankingViewProps {
  data: {
    ranking: { label: string; value: number }[];
  };
}

export default function RankingView({ data }: RankingViewProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 w-full">
      {data.ranking.map((item, idx) => (
        <div key={item.label} className="flex items-center gap-2 mb-2">
          <span className="min-w-32 text-gray-500">{item.label}</span>
          <div className="flex-1 h-4 bg-gray-200 rounded-full relative">
            <div
              className="h-4 bg-blue-700 rounded-full absolute top-0 left-0"
              style={{
                width: `${(item.value / data.ranking[0].value) * 100}%`,
              }}
            />
          </div>
          <span className="ml-2 text-gray-800 font-medium">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
