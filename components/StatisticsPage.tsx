import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
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
  TrendingUp,
  TrendingDown,
  Package,
  AlertTriangle,
  DollarSign,
  Users,
  ShoppingCart,
  Clock,
} from "lucide-react";

// Sales Over Time Data
const salesData = [
  { date: "2026-04-15", value: 120 },
  { date: "2026-04-16", value: 150 },
  { date: "2026-04-17", value: 100 },
  { date: "2026-04-18", value: 130 },
  { date: "2026-04-19", value: 170 },
  { date: "2026-04-20", value: 160 },
  { date: "2026-04-21", value: 185 },
  { date: "2026-04-22", value: 200 },
];

// Inventory by Category
const inventoryData = [
  { category: "Parts", count: 45 },
  { category: "Filters", count: 120 },
  { category: "Disks", count: 80 },
  { category: "Pads", count: 55 },
];

// Customer Growth
const customerGrowthData = [
  { month: "Jan", customers: 200 },
  { month: "Feb", customers: 280 },
  { month: "Mar", customers: 350 },
  { month: "Apr", customers: 480 },
  { month: "May", customers: 620 },
];

// Revenue Sources
const revenueData = [
  { name: "Online", value: 3000, color: "#3b82f6" },
  { name: "Retail", value: 2000, color: "#f59e0b" },
  { name: "Wholesale", value: 2500, color: "#10b981" },
];

// Orders Over Time
const ordersData = [
  { date: "2026-04-15", orders: 45 },
  { date: "2026-04-16", orders: 65 },
  { date: "2026-04-17", orders: 55 },
  { date: "2026-04-18", orders: 40 },
  { date: "2026-04-19", orders: 75 },
  { date: "2026-04-20", orders: 85 },
  { date: "2026-04-21", orders: 95 },
  { date: "2026-04-22", orders: 100 },
];

// Deadstock SKUs
const deadstockData = [
  {
    sku: "SKU-2341",
    product: "Oil Filter Type A",
    daysIdle: 245,
    quantity: 150,
    value: "$3,750",
  },
  {
    sku: "SKU-5678",
    product: "Brake Pad Set Classic",
    daysIdle: 198,
    quantity: 85,
    value: "$2,125",
  },
  {
    sku: "SKU-9012",
    product: "Air Filter Legacy",
    daysIdle: 167,
    quantity: 120,
    value: "$1,800",
  },
  {
    sku: "SKU-3456",
    product: "Spark Plug Old Gen",
    daysIdle: 156,
    quantity: 200,
    value: "$1,000",
  },
  {
    sku: "SKU-7890",
    product: "Wiper Blade V1",
    daysIdle: 134,
    quantity: 95,
    value: "$950",
  },
];

export default function StatisticsPage() {
  const inventoryHealth = {
    healthy: 65,
    warning: 20,
    critical: 15,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Operational Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-linear-to-br from-primary-600 to-blue-600 text-white rounded-xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-white/20 rounded-lg">
              <DollarSign className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 opacity-80" />
          </div>
          <div className="text-3xl font-bold mb-1">$45,231</div>
          <div className="text-blue-100 text-sm">Total Revenue</div>
          <div className="text-xs text-blue-200 mt-2">
            +12.5% from last month
          </div>
        </div>

        <div className="bg-linear-to-br from-green-800 to-green-700 text-white rounded-xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-white/20 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 opacity-80" />
          </div>
          <div className="text-3xl font-bold mb-1">1,567</div>
          <div className="text-green-100 text-sm">Active Customers</div>
          <div className="text-xs text-green-200 mt-2">+8.2% growth rate</div>
        </div>

        <div className="bg-linear-to-br from-purple-800 to-purple-700 text-white rounded-xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-white/20 rounded-lg">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 opacity-80" />
          </div>
          <div className="text-3xl font-bold mb-1">2,845</div>
          <div className="text-purple-100 text-sm">Total Orders</div>
          <div className="text-xs text-purple-200 mt-2">+15.3% this week</div>
        </div>

        <div className="bg-linear-to-br from-orange-800 to-orange-700 text-white rounded-xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-white/20 rounded-lg">
              <Package className="w-6 h-6" />
            </div>
            <TrendingDown className="w-5 h-5 opacity-80" />
          </div>
          <div className="text-3xl font-bold mb-1">8,924</div>
          <div className="text-orange-100 text-sm">Inventory Items</div>
          <div className="text-xs text-orange-200 mt-2">
            -3.1% stock reduction
          </div>
        </div>
      </div>

      {/* Inventory Health Bar */}
      <div className="bg-sky-100 rounded-xl shadow-lg p-6 border border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <Package className="w-5 h-5 text-slate-700" />
          <h3 className="text-slate-900">Inventory Health Overview</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-slate-600">
              Overall Health Score:{" "}
              <span className="font-semibold text-slate-900">72/100</span>
            </span>
            <span className="text-slate-600">
              Total SKUs:{" "}
              <span className="font-semibold text-slate-900">8,924</span>
            </span>
          </div>

          {/* Health Bar */}
          <div className="relative h-12 bg-slate-100 rounded-lg overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-linear-to-r from-green-700 to-green-600 flex items-center justify-center text-white text-sm font-semibold transition-all"
              style={{ width: `${inventoryHealth.healthy}%` }}
            >
              {inventoryHealth.healthy > 15 &&
                `${inventoryHealth.healthy}% Healthy`}
            </div>
            <div
              className="absolute inset-y-0 bg-linear-to-r from-yellow-700 to-yellow-600 flex items-center justify-center text-white text-sm font-semibold transition-all"
              style={{
                left: `${inventoryHealth.healthy}%`,
                width: `${inventoryHealth.warning}%`,
              }}
            >
              {inventoryHealth.warning}% Warning
            </div>
            <div
              className="absolute inset-y-0 bg-linear-to-r from-red-700 to-red-600 flex items-center justify-center text-white text-sm font-semibold transition-all"
              style={{
                left: `${inventoryHealth.healthy + inventoryHealth.warning}%`,
                width: `${inventoryHealth.critical}%`,
              }}
            >
              {inventoryHealth.critical}% Critical
            </div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-700 rounded"></div>
              <div className="text-sm">
                <div className="font-semibold text-slate-900">5,801 SKUs</div>
                <div className="text-slate-600">Optimal Stock</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-700 rounded"></div>
              <div className="text-sm">
                <div className="font-semibold text-slate-900">1,785 SKUs</div>
                <div className="text-slate-600">Low Stock</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-700 rounded"></div>
              <div className="text-sm">
                <div className="font-semibold text-slate-900">1,338 SKUs</div>
                <div className="text-slate-600">Overstock/Deadstock</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Over Time */}
        <div className="bg-sky-100 rounded-xl shadow-lg p-6 border border-slate-200">
          <h3 className="text-slate-900 mb-4">Sales Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 12 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Inventory by Category */}
        <div className="bg-sky-100 rounded-xl shadow-lg p-6 border border-slate-200">
          <h3 className="text-slate-900 mb-4">Inventory by Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={inventoryData}>
              <defs>
                <linearGradient
                  id="inventoryBarGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                  <stop offset="100%" stopColor="#059669" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="category"
                stroke="#64748b"
                tick={{ fontSize: 12 }}
              />
              <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Bar
                dataKey="count"
                fill="url(#inventoryBarGradient)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Customer Growth */}
        <div className="bg-sky-100 rounded-xl shadow-lg p-6 border border-slate-200">
          <h3 className="text-slate-900 mb-4">Customer Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={customerGrowthData}>
              <defs>
                <linearGradient
                  id="customerGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 12 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="customers"
                stroke="#f59e0b"
                strokeWidth={2}
                fill="url(#customerGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Sources */}
        <div className="bg-sky-100 rounded-xl shadow-lg p-6 border border-slate-200">
          <h3 className="text-slate-900 mb-4">Revenue Sources</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={revenueData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: $${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {revenueData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) =>
                  value ? `$${Number(value).toLocaleString()}` : "$0"
                }
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Deadstock Table */}
      <div className="bg-sky-100 rounded-xl shadow-lg p-6 border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="text-slate-900">
              Deadstock Items - Immediate Action Required
            </h3>
          </div>
          <div className="text-sm text-slate-600">
            <Clock className="w-4 h-4 inline mr-1" />
            Last updated: 2 hours ago
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                  SKU
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                  Product Name
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">
                  Days Idle
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">
                  Quantity
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">
                  Total Value
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {deadstockData.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="py-3 px-4 text-sm font-mono text-blue-600">
                    {item.sku}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-900">
                    {item.product}
                  </td>
                  <td className="py-3 px-4 text-sm text-right">
                    <span
                      className={`font-semibold ${item.daysIdle > 200 ? "text-red-600" : item.daysIdle > 150 ? "text-orange-600" : "text-yellow-600"}`}
                    >
                      {item.daysIdle} days
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-right text-slate-700">
                    {item.quantity}
                  </td>
                  <td className="py-3 px-4 text-sm text-right font-semibold text-slate-900">
                    {item.value}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        item.daysIdle > 200
                          ? "bg-red-100 text-red-700"
                          : item.daysIdle > 150
                            ? "bg-orange-100 text-orange-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.daysIdle > 200
                        ? "Critical"
                        : item.daysIdle > 150
                          ? "High Risk"
                          : "Monitor"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-sky-50 font-semibold">
                <td colSpan={3} className="py-3 px-4 text-sm text-slate-700">
                  Total Deadstock Value
                </td>
                <td className="py-3 px-4 text-sm text-right text-slate-700">
                  650 units
                </td>
                <td className="py-3 px-4 text-sm text-right text-slate-900">
                  $9,625
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Orders Over Time - Full Width */}
      <div className="bg-sky-100 rounded-xl shadow-lg p-6 border border-slate-200">
        <h3 className="text-slate-900 mb-4">Orders Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={ordersData}>
            <defs>
              <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 12 }} />
            <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ fill: "#8b5cf6", r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
