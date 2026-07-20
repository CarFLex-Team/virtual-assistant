import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DistributionViewProps {
  data: {
    series: { label: string; value: number }[];
  };
}

export default function DistributionView({ data }: DistributionViewProps) {
  return (
    <div className="w-full h-64 md:h-72 lg:h-80 bg-background p-4 rounded-xl border border-border">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data.series}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
          <XAxis dataKey="label" stroke="#94A3B8" tick={{ fill: "#94A3B8" }} />
          <YAxis stroke="#94A3B8" tick={{ fill: "#94A3B8" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",
              border: "1px solid #1E293B",
              borderRadius: 8,
              color: "#F1F5F9",
            }}
            labelStyle={{ color: "#94A3B8" }}
            itemStyle={{ color: "#38BDF8" }}
          />
          <Bar dataKey="value" fill="#38BDF8" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
