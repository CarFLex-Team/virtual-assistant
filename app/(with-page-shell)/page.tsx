"use client";
import DailyBrief from "@/components/DailyBrief";
import { Clock } from "lucide-react";
import { useMemo, useState } from "react";
import DashboardData from "@/utils/DashboardData";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { authClient, useSession } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}k`;
  }
  return value.toString();
};

const tooltipStyle = {
  backgroundColor: "#111827",
  border: "1px solid #1E293B",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
  color: "#F1F5F9",
};

export default function Home() {
  const [showBrief, setShowBrief] = useState(true);
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const company = session?.user?.company;

  const { TopSellingItems, agingData, inventoryPerWarehouse, salesData } =
    company === "e01" ? DashboardData.e01data : DashboardData.e02data;
  const agingTotal = useMemo(() => {
    return agingData.reduce((sum, item) => sum + item.value, 0);
  }, []);
  const truncateLabel = (label: string, maxLength = 23) =>
    label.length > maxLength ? `${label.slice(0, maxLength)}…` : label;
  return (
    <div className="min-h-screen overflow-auto bg-background">
      <div className=" mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-slate-100">
            Business Analytics Dashboard
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => setShowBrief(true)}
              className="px-4 py-2 bg-accent text-background rounded-lg hover:bg-accent-hover transition-colors flex items-center gap-2 font-medium cursor-pointer"
            >
              <Clock className="w-4 h-4" />
              Morning Brief
            </button>
          </div>
        </div>

        {showBrief && <DailyBrief setShowBrief={setShowBrief} />}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-surface rounded-2xl shadow-lg p-4 border border-border">
            <h2 className="mb-4 text-slate-100 font-semibold">
              Top Selling Items
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={TopSellingItems}
                margin={{ top: 20, right: 20, left: 20, bottom: 60 }}
              >
                <defs>
                  <linearGradient
                    id="supplierGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity={1} />
                    <stop offset="100%" stopColor="#0EA5E9" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis
                  type="category"
                  dataKey="name"
                  style={{ overflow: "hidden" }}
                  stroke="#94A3B8"
                  tickFormatter={(value) => truncateLabel(String(value))}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
                />
                <YAxis
                  type="number"
                  stroke="#94A3B8"
                  tickFormatter={formatCurrency}
                  dataKey="amount"
                  tick={{ fontSize: 12, fill: "#94A3B8" }}
                />
                <Tooltip
                  cursor={{ fill: "#94A3B8", opacity: 0.1 }}
                  formatter={(value) =>
                    typeof value === "number"
                      ? `${value.toLocaleString()} AED`
                      : ""
                  }
                  contentStyle={tooltipStyle}
                />
                <Bar
                  dataKey="amount"
                  label={{
                    position: "top",
                    fill: "#94A3B8",
                    fontSize: 12,
                    formatter: (value: any) =>
                      typeof value === "number" ? formatCurrency(value) : "",
                  }}
                  fill="url(#supplierGradient)"
                  radius={[8, 8, 0, 0]}
                  // label={{ position: "top", fill: "#94A3B8", fontSize: 12 }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-surface rounded-2xl shadow-lg p-4 border border-border">
            <h2 className="mb-4 text-slate-100 font-semibold">
              Inventory Aging
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <defs>
                  {agingData.map((entry, index) => (
                    <linearGradient
                      key={index}
                      id={`gradient-${index}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor={entry.color}
                        stopOpacity={1}
                      />
                      <stop
                        offset="100%"
                        stopColor={entry.color}
                        stopOpacity={0.75}
                      />
                    </linearGradient>
                  ))}
                </defs>
                <Pie
                  data={agingData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) =>
                    `${entry.name}: ${(entry.percent * 100).toFixed(1)}%`
                  }
                  outerRadius={120}
                  innerRadius={60}
                  dataKey="value"
                  paddingAngle={2}
                >
                  {agingData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`url(#gradient-${index})`}
                      stroke="#0B1120"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  cursor={{ fill: "#94A3B8", opacity: 0.1 }}
                  formatter={(value: any) =>
                    typeof value === "number"
                      ? `${value.toFixed(1)}`
                      : (value ?? "N/A")
                  }
                  contentStyle={tooltipStyle}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  formatter={(name) => {
                    const item = agingData.find((item) => item.name === name);
                    const percent = item ? (item.value / agingTotal) * 100 : 0;

                    return (
                      <span className="text-slate-300">
                        {name} ({percent.toFixed(1)}%)
                      </span>
                    );
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-surface rounded-2xl shadow-lg p-4 border border-border">
            <h2 className="mb-4 text-slate-100 font-semibold">
              Inventory Value Per Warehouse
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={inventoryPerWarehouse}
                layout="vertical"
                margin={{ left: 10, right: 30, top: 10, bottom: 10 }}
              >
                <defs>
                  <linearGradient
                    id="customerGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#0EA5E9" stopOpacity={0.85} />
                    <stop offset="100%" stopColor="#38BDF8" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis
                  type="number"
                  stroke="#94A3B8"
                  tick={{ fontSize: 12, fill: "#94A3B8" }}
                  tickFormatter={(value) => formatCurrency(value)}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={100}
                  style={{ overflow: "hidden" }}
                  stroke="#94A3B8"
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
                  tickFormatter={(value) => truncateLabel(String(value))}
                />
                <Tooltip
                  cursor={{ fill: "#94A3B8", opacity: 0.1 }}
                  formatter={(value) =>
                    typeof value === "number"
                      ? `${value.toLocaleString()} AED`
                      : ""
                  }
                  contentStyle={tooltipStyle}
                />
                <Bar
                  dataKey="amount"
                  fill="url(#customerGradient)"
                  radius={[0, 8, 8, 0]}
                  label={{
                    position: "right",
                    fill: "#94A3B8",
                    fontSize: 12,
                    formatter: (value: unknown) =>
                      typeof value === "number" ? formatCurrency(value) : "",
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-surface rounded-xl shadow-lg p-6 border border-border">
            <h3 className="text-slate-100 font-semibold mb-4">
              Sales vs Purchases
            </h3>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={salesData}
                margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />

                <XAxis
                  dataKey="period"
                  stroke="#94A3B8"
                  tick={{
                    fontSize: 12,
                    fill: "#94A3B8",
                  }}
                />

                <YAxis
                  stroke="#94A3B8"
                  tick={{
                    fontSize: 12,
                    fill: "#94A3B8",
                  }}
                  tickFormatter={formatCurrency}
                />

                <Tooltip
                  contentStyle={tooltipStyle}
                  cursor={{
                    fill: "#94A3B8",
                    opacity: 0.1,
                  }}
                  itemSorter={(item) => (item.name === "Sales" ? 0 : 1)}
                  formatter={(value, name) => [
                    `${Number(value).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })} AED`,
                    name,
                  ]}
                />

                <Legend
                  wrapperStyle={{
                    color: "#94A3B8",
                    fontSize: "12px",
                  }}
                  itemSorter={(item) => (item.dataKey === "Sales" ? 0 : 1)}
                />

                <Line
                  type="monotone"
                  dataKey="sales"
                  name="Sales"
                  stroke="#38BDF8"
                  strokeWidth={3}
                  dot={{
                    fill: "#38BDF8",
                    r: 4,
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="purchases"
                  name="Purchases"
                  stroke="#A78BFA"
                  strokeWidth={3}
                  dot={{
                    fill: "#A78BFA",
                    r: 4,
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
