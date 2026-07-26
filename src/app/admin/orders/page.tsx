'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Printer, 
  Download, 
  CheckCircle2, 
  Truck, 
  AlertCircle
} from 'lucide-react';
import { getOrders, updateOrderStatus } from '@/lib/store';
import { Order, OrderStatus } from '@/lib/types';
import InvoiceModal from '@/components/ui/InvoiceModal';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    setOrders(getOrders());
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    loadOrders();
  };

  const handleExportCSV = () => {
    const headers = ['Order Number', 'Customer Name', 'Email', 'Phone', 'Total Amount', 'Status', 'Payment Method', 'Date'];
    const rows = orders.map(o => [
      o.orderNumber,
      `"${o.customerName}"`,
      o.email,
      o.phone,
      o.totalAmount,
      o.status,
      o.paymentMethod,
      new Date(o.createdAt).toLocaleDateString()
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Elevate_Orders_Export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredOrders = orders.filter(o => {
    if (statusFilter && o.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchNum = o.orderNumber.toLowerCase().includes(q);
      const matchName = o.customerName.toLowerCase().includes(q);
      const matchEmail = o.email.toLowerCase().includes(q);
      if (!matchNum && !matchName && !matchEmail) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">ORDER MANAGEMENT</h1>
          <p className="text-xs text-slate-400">Search orders, update statuses, print tax invoices, and export Excel CSV dataset</p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-2"
        >
          <Download className="w-4 h-4" /> Export Orders (Excel / CSV)
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by order #, customer name, email..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 font-bold">Status Filter:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 text-white border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none"
          >
            <option value="">All Statuses</option>
            <option value="PENDING">PENDING</option>
            <option value="PROCESSING">PROCESSING</option>
            <option value="SHIPPED">SHIPPED</option>
            <option value="DELIVERED">DELIVERED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase border-b border-slate-800">
              <tr>
                <th className="p-3">Order Number</th>
                <th className="p-3">Customer Details</th>
                <th className="p-3">Items Count</th>
                <th className="p-3">Total Amount</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Order Status</th>
                <th className="p-3 text-center">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredOrders.map((o) => (
                <tr key={o.id}>
                  <td className="p-3 font-mono font-bold text-white">{o.orderNumber}</td>
                  <td className="p-3">
                    <p className="font-bold text-white">{o.customerName}</p>
                    <p className="text-[10px] text-slate-400">{o.email} • {o.phone}</p>
                  </td>
                  <td className="p-3 font-bold">{o.items.reduce((sum, i) => sum + i.quantity, 0)} items</td>
                  <td className="p-3 font-bold text-white">₹{o.totalAmount.toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      o.paymentStatus === 'PAID' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      {o.paymentMethod} ({o.paymentStatus})
                    </span>
                  </td>
                  <td className="p-3">
                    <select
                      value={o.status}
                      onChange={(e) => handleStatusChange(o.id, e.target.value as OrderStatus)}
                      className="bg-slate-950 text-amber-400 border border-slate-800 rounded-lg px-2.5 py-1 text-xs font-bold focus:outline-none cursor-pointer"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => setSelectedInvoiceOrder(o)}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg transition"
                      title="Print / View Invoice"
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

      {/* Invoice Modal */}
      <InvoiceModal
        isOpen={!!selectedInvoiceOrder}
        order={selectedInvoiceOrder}
        onClose={() => setSelectedInvoiceOrder(null)}
      />

    </div>
  );
}
