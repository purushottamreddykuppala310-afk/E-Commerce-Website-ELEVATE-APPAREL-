'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  AlertTriangle, 
  ArrowUpRight, 
  Printer, 
  Plus,
  Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { getDashboardStats, getProducts } from '@/lib/store';
import { DashboardStats, Product } from '@/lib/types';
import InvoiceModal from '@/components/ui/InvoiceModal';

const PIE_COLORS = ['#4f46e5', '#f59e0b', '#10b981', '#ef4444'];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<any>(null);

  useEffect(() => {
    const loadedStats = getDashboardStats();
    setStats(loadedStats);

    const prods = getProducts();
    setLowStockProducts(prods.filter(p => p.stockQuantity <= 5));
  }, []);

  if (!stats) return <div className="text-slate-400">Loading Dashboard Metrics...</div>;

  return (
    <div className="space-y-8">
      
      {/* Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">EXECUTIVE SALES DASHBOARD</h1>
          <p className="text-xs text-slate-400">Real-time revenue, inventory tracking, and order analytics</p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/products"
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Product
          </Link>
          <Link
            href="/admin/theme"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition"
          >
            Live Theme Manager
          </Link>
        </div>
      </div>

      {/* KPI Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Revenue */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase">
            <span>Total Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white">₹{stats.totalSales.toLocaleString()}</p>
          <div className="flex items-center space-x-1 text-xs text-emerald-400 font-bold">
            <ArrowUpRight className="w-4 h-4" />
            <span>+{stats.salesGrowth}% vs last month</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase">
            <span>Total Orders</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white">{stats.totalOrders}</p>
          <div className="flex items-center space-x-1 text-xs text-emerald-400 font-bold">
            <ArrowUpRight className="w-4 h-4" />
            <span>+{stats.ordersGrowth}% order growth</span>
          </div>
        </div>

        {/* Active Customers */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase">
            <span>Active Customers</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white">{stats.totalCustomers}</p>
          <p className="text-xs text-slate-400">Verified buyer accounts</p>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase">
            <span>Low Stock Items</span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-rose-400">{lowStockProducts.length}</p>
          <p className="text-xs text-rose-400/80 font-medium">Stock ≤ 5 units left</p>
        </div>

      </div>

      {/* Visual Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Monthly Revenue Chart (2 cols) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
            Monthly Sales & Revenue Growth (₹)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.monthlyRevenue}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution Pie Chart (1 col) */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
            Sales By Category
          </h3>
          <div className="h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.topCategories}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="sales"
                >
                  {stats.topCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {stats.topCategories.map((cat, i) => (
              <div key={cat.name} className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                <span className="text-slate-300 font-semibold">{cat.name}: {cat.sales}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recent Orders & Low Stock Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Orders (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Recent Orders</h3>
            <Link href="/admin/orders" className="text-xs font-bold text-amber-400 hover:underline">
              View All Orders &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase border-b border-slate-800">
                <tr>
                  <th className="p-3">Order #</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Amount</th>
                  <th className="p-3 text-center">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {stats.recentOrders.map((ord) => (
                  <tr key={ord.id}>
                    <td className="p-3 font-mono font-bold text-white">{ord.orderNumber}</td>
                    <td className="p-3">{ord.customerName}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {ord.status}
                      </span>
                    </td>
                    <td className="p-3 text-right font-bold text-white">₹{ord.totalAmount.toLocaleString()}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => setSelectedInvoiceOrder(ord)}
                        className="p-1 text-slate-400 hover:text-amber-400"
                        title="Tax Invoice"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400" /> Low Inventory Alerts
          </h3>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {lowStockProducts.length === 0 ? (
              <p className="text-xs text-slate-500">All products have healthy stock levels.</p>
            ) : (
              lowStockProducts.map((p) => (
                <div key={p.id} className="p-3 bg-slate-950 border border-rose-900/40 rounded-xl flex items-center justify-between text-xs">
                  <div className="truncate max-w-[160px]">
                    <p className="font-bold text-white truncate">{p.title}</p>
                    <p className="text-slate-400 text-[10px]">{p.categoryName}</p>
                  </div>
                  <span className="px-2 py-1 bg-rose-500/20 text-rose-400 font-extrabold rounded">
                    {p.stockQuantity === 0 ? 'OUT OF STOCK' : `${p.stockQuantity} left`}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Invoice Modal */}
      <InvoiceModal
        isOpen={!!selectedInvoiceOrder}
        order={selectedInvoiceOrder}
        onClose={() => setSelectedInvoiceOrder(null)}
      />

    </div>
  );
}
