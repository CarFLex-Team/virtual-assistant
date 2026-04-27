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
    <div className="w-full h-64 md:h-72 lg:h-80 bg-white p-4 rounded-xl shadow-lg border border-gray-200">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data.series}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" stroke="#555" />
          <YAxis stroke="#555" />
          <Tooltip
            contentStyle={{ backgroundColor: "#f3f4f6", borderRadius: 8 }}
          />
          <Bar dataKey="value" fill="#1e3a8a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
