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
  points: {
    label: string;
    value: number;
  }[];
}

interface StatsChartProps {
  apiData: ApiResponse;
}

export default function StatsChart({ apiData }: StatsChartProps) {
  // Convert API response into Recharts format
  console.log(apiData);
  const chartData = apiData.points.map((item) => ({
    name: item.label, // You can format this label as needed
    value: item.value,
    fullDate: item.label,
  }));

  return (
    <div className="w-full h-64 md:h-72 lg:h-80 bg-white p-4 rounded-xl shadow-lg border border-gray-200 min-h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" stroke="#555" tick={{ fontSize: 12 }} />

          <YAxis stroke="#555" allowDecimals={false} />

          <Tooltip
            contentStyle={{
              backgroundColor: "#f9fafb",
              borderRadius: 10,
              border: "1px solid #e5e7eb",
            }}
            formatter={(value) => [`${value} customers`, "Sales"]}
            labelFormatter={(label, payload) =>
              payload?.[0]?.payload?.fullDate || label
            }
          />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#024a70"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
