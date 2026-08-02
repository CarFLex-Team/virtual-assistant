import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ApiResponse {
  trend: {
    label: string;
    value: number;
  }[];
}

interface StatsChartProps {
  apiData: ApiResponse;
}

export default function StatsChart({ apiData }: StatsChartProps) {
  const chartData = apiData.trend.map((item) => ({
    name: item.label,
    value: item.value,
    fullDate: item.label,
  }));

  return (
    <div className="w-full h-64 md:h-72 lg:h-80 bg-background p-4 rounded-xl border border-border min-h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />

          <XAxis
            dataKey="name"
            stroke="#94A3B8"
            tick={{ fontSize: 12, fill: "#94A3B8" }}
          />

          <YAxis
            stroke="#94A3B8"
            tick={{ fill: "#94A3B8" }}
            fontSize={12}
            allowDecimals={false}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",
              borderRadius: 10,
              border: "1px solid #1E293B",
              color: "#F1F5F9",
            }}
            labelStyle={{ color: "#94A3B8" }}
            itemStyle={{ color: "#38BDF8" }}
            formatter={(value) => [`${value} `, "Value"]}
            labelFormatter={(label, payload) =>
              payload?.[0]?.payload?.fullDate || label
            }
          />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#38BDF8"
            strokeWidth={3}
            dot={{ r: 4, fill: "#38BDF8", strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
