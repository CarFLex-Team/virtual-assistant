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
  data: {
    labels: string[];
    datasets: { label: string; data: number[]; backgroundColor: string }[];
  };
}

export default function StatsChart({ data }: StatsChartProps) {
  return (
    <div className="w-full h-64 md:h-72 lg:h-80 bg-white p-4 rounded-xl shadow-lg border border-gray-200 min-h-64">
      <ResponsiveContainer height={264} width="100%">
        <LineChart
          data={data.datasets[0].data.map((value, index) => ({
            name: data.labels[index],
            value,
          }))}
        >
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
