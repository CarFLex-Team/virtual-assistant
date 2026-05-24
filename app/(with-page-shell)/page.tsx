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
import {
  AlertCircle,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Clock,
  TrendingUp,
  X,
} from "lucide-react";
import DailyBrief from "@/components/DailyBrief";
const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444"];
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
  { name: "0-30", value: 38.7, color: "#052f4a" },
  { name: "90+", value: 35.1, color: "#1e40af" },
  { name: "31-60", value: 19.6, color: "#BA3636" },
  { name: "61-90", value: 6.54, color: "#966262" },
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
export default function Home() {
  const [showBrief, setShowBrief] = useState(true);

  return (
    <div className="size-full overflow-auto">
      <div className=" mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-sky-100">
            Business Analytics Dashboard
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => setShowBrief(true)}
              className="px-4 py-2 bg-sky-900 text-white rounded-lg hover:bg-sky-900/80 transition-colors flex items-center gap-2"
            >
              <Clock className="w-4 h-4" />
              Morning Brief
            </button>
          </div>
        </div>

        <>
          {/* Morning Operations Brief Overlay */}
          {showBrief && <DailyBrief setShowBrief={setShowBrief} />}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Customer Exposure */}
            <div className="bg-sky-100 rounded-2xl shadow-lg p-3 border border-slate-200">
              <h2 className="mb-4">Top Customer Exposure</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={customerExposureData}
                  layout="vertical"
                  margin={{ left: 10, right: 10, top: 10, bottom: 10 }}
                >
                  <defs>
                    <linearGradient
                      id="customerGradient"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#1e40af" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#052f4a" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    type="number"
                    stroke="#64748b"
                    tick={{ fontSize: 12 }}
                    tickFormatter={formatCurrency}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={180}
                    stroke="#64748b"
                    tick={{ fontSize: 11 }}
                  />
                  <Tooltip
                    formatter={(value) =>
                      typeof value === "number"
                        ? `$${value.toLocaleString()}`
                        : ""
                    }
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      border: "1px solid #052f4a",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Bar
                    dataKey="amount"
                    fill="url(#customerGradient)"
                    radius={[0, 8, 8, 0]}
                    label={{
                      position: "right",
                      fill: "#1e293b",
                      fontSize: 12,
                      formatter: (value: unknown) =>
                        typeof value === "number" ? formatCurrency(value) : "",
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Accounts Receivable Aging */}
            <div className="bg-sky-100 rounded-2xl shadow-lg p-3 border border-slate-200">
              <h2 className="mb-4">Accounts Receivable Aging</h2>
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
                          stopOpacity={0.8}
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
                    fill="#8884d8"
                    dataKey="value"
                    paddingAngle={2}
                  >
                    {agingData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={`url(#gradient-${index})`}
                        stroke="#fff"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    // Recharts may pass non-number value types; accept any and handle at runtime
                    formatter={(value: any) =>
                      typeof value === "number"
                        ? `${value.toFixed(1)}%`
                        : (value ?? "N/A")
                    }
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.5)",
                      border: "1px solid #052f4a",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                    formatter={(value, entry: any) =>
                      `${value} (${entry.payload.value.toFixed(1)}%)`
                    }
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Top Supplier Countries */}
            <div className="bg-sky-100 rounded-2xl shadow-lg p-3 border border-slate-200">
              <h2 className="mb-4">Top Supplier Countries</h2>
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
                      <stop offset="0%" stopColor="#052f4a" stopOpacity={1} />
                      <stop
                        offset="100%"
                        stopColor="#1e40af"
                        stopOpacity={0.8}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="country"
                    stroke="#64748b"
                    angle={-45}
                    textAnchor="end"
                    height={30}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.5)",
                      border: "1px solid #052f4a",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Bar
                    dataKey="count"
                    fill="url(#supplierGradient)"
                    radius={[8, 8, 0, 0]}
                    label={{ position: "top", fill: "#052f4a", fontSize: 12 }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Overdue Days Distribution */}
            <div className="bg-sky-100 rounded-2xl shadow-lg p-3 border border-slate-200">
              <h2 className="mb-4">Overdue Days Distribution</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={overdueData}
                  margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                >
                  <defs>
                    <linearGradient
                      id="overdueGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#052f4a" stopOpacity={1} />
                      <stop
                        offset="100%"
                        stopColor="#1e40af"
                        stopOpacity={0.8}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="days"
                    stroke="#64748b"
                    tick={{ fontSize: 12 }}
                    label={{
                      value: "Days Overdue",
                      position: "insideBottom",
                      offset: -10,
                      fill: "#475569",
                    }}
                  />
                  <YAxis
                    stroke="#64748b"
                    tick={{ fontSize: 12 }}
                    label={{
                      value: "Count",
                      angle: -90,
                      position: "insideLeft",
                      fill: "#475569",
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.5)",
                      border: "1px solid #052f4a",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Bar
                    dataKey="count"
                    fill="url(#overdueGradient)"
                    radius={[8, 8, 0, 0]}
                    label={{ position: "top", fill: "#052f4a", fontSize: 12 }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      </div>
    </div>
  );
}
