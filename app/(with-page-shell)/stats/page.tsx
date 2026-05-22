"use client";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend,
} from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444"];

export default function Statistics() {
  const [salesData, setSalesData] = useState<
    Array<{ date: string; value: number }>
  >([]);
  const [inventoryData, setInventoryData] = useState<
    Array<{ category: string; value: number }>
  >([]);
  const [customersData, setCustomersData] = useState<
    Array<{ month: string; value: number }>
  >([]);
  const [revenueData, setRevenueData] = useState<
    Array<{ source: string; value: number }>
  >([]);
  const [ordersData, setOrdersData] = useState<
    Array<{ date: string; value: number }>
  >([]);

  useEffect(() => {
    setSalesData([
      { date: "2026-04-21", value: 120 },
      { date: "2026-04-22", value: 150 },
      { date: "2026-04-23", value: 100 },
      { date: "2026-04-24", value: 180 },
      { date: "2026-04-25", value: 200 },
    ]);

    setInventoryData([
      { category: "Parts", value: 50 },
      { category: "Filters", value: 120 },
      { category: "Disks", value: 80 },
      { category: "Pads", value: 60 },
    ]);

    setCustomersData([
      { month: "Jan", value: 300 },
      { month: "Feb", value: 450 },
      { month: "Mar", value: 400 },
      { month: "Apr", value: 500 },
      { month: "May", value: 600 },
    ]);

    setRevenueData([
      { source: "Online", value: 4000 },
      { source: "Retail", value: 3000 },
      { source: "Wholesale", value: 2000 },
    ]);

    setOrdersData([
      { date: "2026-04-21", value: 50 },
      { date: "2026-04-22", value: 70 },
      { date: "2026-04-23", value: 40 },
      { date: "2026-04-24", value: 90 },
      { date: "2026-04-25", value: 100 },
    ]);
  }, []);

  return (
    <div className="p-4  ">
      <div className="p-7 rounded-2xl shadow-lg flex flex-col gap-8 min-h-screen">
        {/* Sales Line Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">
            Sales Over Time
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
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

        {/* Inventory Bar Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">
            Inventory by Category
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={inventoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="category" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{ backgroundColor: "#f3f4f6", borderRadius: 8 }}
              />
              <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Customers Area Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">
            Customer Growth
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={customersData}>
              <defs>
                <linearGradient id="colorCust" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{ backgroundColor: "#f3f4f6", borderRadius: 8 }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#f59e0b"
                fill="url(#colorCust)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Pie Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">
            Revenue Sources
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Tooltip
                contentStyle={{ backgroundColor: "#f3f4f6", borderRadius: 8 }}
              />
              <Legend />
              <Pie
                data={revenueData}
                dataKey="value"
                nameKey="source"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#3b82f6"
                label
              >
                {revenueData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Orders Line Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">
            Orders Over Time
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ordersData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{ backgroundColor: "#f3f4f6", borderRadius: 8 }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8b5cf6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
