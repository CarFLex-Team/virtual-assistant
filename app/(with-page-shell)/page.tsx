"use client";
import { useState } from "react";
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
} from "recharts";
import { Clock } from "lucide-react";
import DailyBrief from "@/components/DailyBrief";

const CHART_COLORS = ["#38BDF8", "#818CF8", "#F59E0B", "#34D399", "#F87171"];

const customerExposureData = [
  { name: "ZAATRE EXPRESS LTD", amount: 58000 },
  { name: "YEDDER CO FOR IMPORT", amount: 56000 },
  { name: "AWWDEH AUTO SPARE PARTS TR LLC SOLE PROPRIETORSHIP", amount: 81000 },
  { name: "SIXTY THREE WORLD SPARE PARTS EST", amount: 85000 },
  { name: "ROYAL ARROW AUTO NEW SPARE PARTS", amount: 92000 },
  { name: "LUAY RASHEED TR. TOOLS MERCEDES", amount: 120000 },
  { name: "AL MASIABY FOR TR. & MERCEDES PARTS", amount: 140000 },
  { name: "NAJEM AL FURSAN AUTO SPARE PARTS ESTABLISHMENT", amount: 210000 },
  { name: "MRE AUTO HOLDINGS PTY LTD T/A RENNEN AUTOTEILE", amount: 230000 },
  { name: "GOOD GOODS AUTOS", amount: 690000 },
];

const agingData = [
  { name: "0-30", value: 38.7, color: CHART_COLORS[0] },
  { name: "90+", value: 35.1, color: CHART_COLORS[4] },
  { name: "31-60", value: 19.6, color: CHART_COLORS[2] },
  { name: "61-90", value: 6.54, color: CHART_COLORS[1] },
];

const supplierCountriesData = [
  { country: "United Arab Emir.", count: 162 },
  { country: "China", count: 146 },
  { country: "Taiwan, China", count: 14 },
  { country: "Turkey", count: 4 },
  { country: "Italy", count: 3 },
  { country: "Germany", count: 2 },
  { country: "Singapore", count: 1 },
  { country: "Estonia", count: 1 },
  { country: "Spain", count: 1 },
  { country: "Romania", count: 1 },
];

const overdueData = [
  { days: "0-50", count: 820 },
  { days: "51-100", count: 45 },
  { days: "101-200", count: 8 },
  { days: "201-400", count: 3 },
  { days: "401-600", count: 2 },
  { days: "601-800", count: 1 },
  { days: "801-1000", count: 1 },
  { days: "1001-1200", count: 0 },
  { days: "1201-1400", count: 1 },
];

const formatCurrency = (value: number) => {
  if (value >= 1000) {
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

  return (
    <div className="size-full overflow-auto bg-background">
      <div className="max-w-7xl mx-auto p-8">
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
              Top Customer Exposure
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={customerExposureData}
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
                  tickFormatter={formatCurrency}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={180}
                  stroke="#94A3B8"
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
                />
                <Tooltip
                  formatter={(value) =>
                    typeof value === "number"
                      ? `$${value.toLocaleString()}`
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

          <div className="bg-surface rounded-2xl shadow-lg p-4 border border-border">
            <h2 className="mb-4 text-slate-100 font-semibold">
              Accounts Receivable Aging
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
                  formatter={(value: any) =>
                    typeof value === "number"
                      ? `${value.toFixed(1)}%`
                      : (value ?? "N/A")
                  }
                  contentStyle={tooltipStyle}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  formatter={(value, entry: any) => (
                    <span className="text-slate-300">
                      {value} ({entry.payload.value.toFixed(1)}%)
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-surface rounded-2xl shadow-lg p-4 border border-border">
            <h2 className="mb-4 text-slate-100 font-semibold">
              Top Supplier Countries
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={supplierCountriesData}
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
                  dataKey="country"
                  stroke="#94A3B8"
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
                />
                <YAxis
                  stroke="#94A3B8"
                  tick={{ fontSize: 12, fill: "#94A3B8" }}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar
                  dataKey="count"
                  fill="url(#supplierGradient)"
                  radius={[8, 8, 0, 0]}
                  label={{ position: "top", fill: "#94A3B8", fontSize: 12 }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-surface rounded-2xl shadow-lg p-4 border border-border">
            <h2 className="mb-4 text-slate-100 font-semibold">
              Overdue Days Distribution
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={overdueData}
                margin={{ top: 20, right: 20, left: 20, bottom: 40 }}
              >
                <defs>
                  <linearGradient
                    id="overdueGradient"
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
                  dataKey="days"
                  stroke="#94A3B8"
                  tick={{ fontSize: 12, fill: "#94A3B8" }}
                  label={{
                    value: "Days Overdue",
                    position: "insideBottom",
                    offset: -15,
                    fill: "#94A3B8",
                  }}
                />
                <YAxis
                  stroke="#94A3B8"
                  tick={{ fontSize: 12, fill: "#94A3B8" }}
                  label={{
                    value: "Count",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#94A3B8",
                  }}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar
                  dataKey="count"
                  fill="url(#overdueGradient)"
                  radius={[8, 8, 0, 0]}
                  label={{ position: "top", fill: "#94A3B8", fontSize: 12 }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
