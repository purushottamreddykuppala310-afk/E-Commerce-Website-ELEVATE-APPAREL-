'use client';

import React from 'react';
import { Users, ShieldCheck, Mail, Phone, Calendar } from 'lucide-react';

export default function AdminCustomersPage() {
  const customers = [
    { id: 'usr-1', name: 'John Doe', email: 'john@example.com', phone: '+91 98765 43210', totalOrders: 4, totalSpent: 12496, role: 'CUSTOMER', isGoogle: false, joined: '2026-07-01' },
    { id: 'usr-2', name: 'Priya Sharma', email: 'priya@example.com', phone: '+91 99887 76655', totalOrders: 2, totalSpent: 7998, role: 'CUSTOMER', isGoogle: true, joined: '2026-07-10' },
    { id: 'usr-3', name: 'Aarav Patel', email: 'aarav@example.com', phone: '+91 91234 56789', totalOrders: 5, totalSpent: 24995, role: 'CUSTOMER', isGoogle: true, joined: '2026-06-15' },
    { id: 'usr-4', name: 'Ananya Sen', email: 'ananya@example.com', phone: '+91 98111 22334', totalOrders: 1, totalSpent: 4999, role: 'CUSTOMER', isGoogle: false, joined: '2026-07-20' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white uppercase tracking-tight">CUSTOMER DIRECTORY</h1>
        <p className="text-xs text-slate-400">View registered customer accounts, Google OAuth users, purchase history, and spend metrics</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase border-b border-slate-800">
              <tr>
                <th className="p-3">Customer Profile</th>
                <th className="p-3">Contact Email & Phone</th>
                <th className="p-3 text-center">Auth Method</th>
                <th className="p-3 text-center">Orders Count</th>
                <th className="p-3 text-right">Lifetime Spend</th>
                <th className="p-3">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {customers.map((c) => (
                <tr key={c.id}>
                  <td className="p-3 font-bold text-white flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white">
                      {c.name[0]}
                    </div>
                    <span>{c.name}</span>
                  </td>
                  <td className="p-3">
                    <p className="text-slate-200">{c.email}</p>
                    <p className="text-slate-500">{c.phone}</p>
                  </td>
                  <td className="p-3 text-center">
                    {c.isGoogle ? (
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        Google OAuth
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-400">
                        Email & Pass
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-center font-bold text-white">{c.totalOrders} orders</td>
                  <td className="p-3 text-right font-black text-amber-400">₹{c.totalSpent.toLocaleString()}</td>
                  <td className="p-3 text-slate-400">{c.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
