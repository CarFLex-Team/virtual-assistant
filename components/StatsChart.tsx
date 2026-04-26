import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface StatsChartProps {
  data: { name: string; value: number }[];
}

export default function StatsChart({ data }: StatsChartProps) {
  return (
    <div className="w-full h-64 bg-white p-4 rounded-xl shadow-lg border border-gray-200">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#555" />
          <YAxis stroke="#555" />
          <Tooltip
            contentStyle={{ backgroundColor: "#f3f4f6", borderRadius: 8 }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
