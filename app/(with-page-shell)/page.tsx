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
      <div className="max-w-7xl mx-auto p-8">
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
          {showBrief && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
                {/* Header */}
                <div className="sticky top-0 bg-linear-to-r from-sky-900 to-sky-900 text-white p-6 rounded-tl-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm opacity-90 mb-1">
                        AI Morning Operations Brief
                      </div>
                      <h2 className="text-white">Cairo Operations Center</h2>
                      <div className="text-sm opacity-90 mt-1">
                        Friday, 23-May-2025 08:45
                      </div>
                    </div>
                    <button
                      onClick={() => setShowBrief(false)}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* AI Monitoring Status */}
                  <section className="bg-green-50 border border-green-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <h3 className="text-green-900">AI Monitoring Status</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-green-800">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>All systems running normally</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>
                          Anomaly Detection: 0/15,082/0.523/3706.806.687/172720
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>Predictive Risk Score: 8602.65515 (Blue)</span>
                      </li>
                    </ul>
                  </section>

                  {/* Executive Summary */}
                  <section className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <h3 className="text-blue-900">Executive Summary</h3>
                    </div>
                    <div className="space-y-2 text-sm text-blue-800">
                      <p>
                        Current customer base stands at 1,567 with 264,209
                        active open balances totals.
                      </p>
                      <div className="mt-3 grid grid-cols-2 gap-4">
                        <div className="bg-white/60 rounded-lg p-3">
                          <div className="text-xs text-blue-600 mb-1">
                            Financial Health Score
                          </div>
                          <div>78.102</div>
                        </div>
                        <div className="bg-white/60 rounded-lg p-3">
                          <div className="text-xs text-blue-600 mb-1">
                            Average overdue duration
                          </div>
                          <div>12.5 days</div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Critical Alerts */}
                  <section className="bg-red-50 border border-red-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <h3 className="text-red-900">Critical Alerts</h3>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-sm">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 shrink-0"></div>
                        <span className="text-red-800">
                          High-risk overdue accounts above $50 AED: 445 EX-0468
                        </span>
                      </li>
                      <li className="flex items-start gap-3 text-sm">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 shrink-0"></div>
                        <span className="text-red-800">
                          Backdated overdue exposure between 30-60 days:
                          801,556,730
                        </span>
                      </li>
                      <li className="flex items-start gap-3 text-sm">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 shrink-0"></div>
                        <span className="text-red-800">
                          Top 5 customers represent 45.2% of total overdue value
                          (collective)
                        </span>
                      </li>
                    </ul>
                  </section>

                  {/* AI Highlights */}
                  <section className="bg-purple-50 border border-purple-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-purple-600" />
                      <h3 className="text-purple-900">AI Highlights</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-purple-800">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span>
                          Natural Customer Attritions
                          20008-00006.80158.4825.225.6555
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span>
                          Primary Supplier Sourcing Insight: United Arab E.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span>
                          Collection pressure metrics concentrated among
                          high-value customer accounts
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span>
                          Overdue review concentration may impact short term
                          operational liquidity
                        </span>
                      </li>
                    </ul>
                  </section>

                  {/* Recommended Actions */}
                  <section className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-600" />
                      <h3 className="text-amber-900">Recommended Actions</h3>
                    </div>
                    <ol className="space-y-2 text-sm text-amber-800 list-decimal list-inside">
                      <li>
                        Prioritize outreach for overdue overdue more than 30
                        days
                      </li>
                      <li>
                        Execute high-value customer accounts pending financial
                        risk thresholds
                      </li>
                      <li>Review customer credit approval concentrations</li>
                      <li>
                        Monitor supplier dependency concentrations across
                        sourcing reports
                      </li>
                    </ol>
                  </section>

                  {/* Forecast & Operational Status */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <section className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
                      <h3 className="text-indigo-900 mb-3">Forecast</h3>
                      <p className="text-sm text-indigo-800">
                        Forecasted next-period risk may increase within the next
                        14 days if current payment behavior continues.
                      </p>
                    </section>

                    <section className="bg-teal-50 border border-teal-200 rounded-xl p-5">
                      <h3 className="text-teal-900 mb-3">Operational Status</h3>
                      <ul className="space-y-1 text-sm text-teal-800">
                        <li>• Active Customers: 1,567</li>
                        <li>• High Risk Accounts: 12</li>
                        <li>• Responded Suppliers: 265</li>
                        <li>• AI Monitoring Engines: Real-time</li>
                      </ul>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Customer Exposure */}
            <div className="bg-white rounded-2xl shadow-lg p-3 border border-slate-200">
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
            <div className="bg-white rounded-2xl shadow-lg p-3 border border-slate-200">
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
            <div className="bg-white rounded-2xl shadow-lg p-3 border border-slate-200">
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
            <div className="bg-white rounded-2xl shadow-lg p-3 border border-slate-200">
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
