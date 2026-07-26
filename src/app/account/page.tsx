'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  User as UserIcon, 
  Package, 
  MapPin, 
  Heart, 
  LogOut, 
  Printer, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { getOrders } from '@/lib/store';
import { Order } from '@/lib/types';
import InvoiceModal from '@/components/ui/InvoiceModal';

export default function CustomerAccountPage() {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();
  const { savedAddresses } = useCart();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Account Profile Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-amber-400 flex items-center justify-center text-white font-black text-2xl uppercase">
            {user ? user.name[0] : 'J'}
          </div>
          <div>
            <h1 className="text-2xl font-black">{user ? user.name : 'John Doe'}</h1>
            <p className="text-xs text-slate-400">{user ? user.email : 'john@example.com'} • Customer ID: #USR-98401</p>
            {user?.googleId && (
              <span className="inline-block mt-1 text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded">
                Google Verified Account
              </span>
            )}
          </div>
        </div>

        <button
          onClick={logout}
          className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-rose-400 font-bold text-xs rounded-xl border border-slate-700 transition flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 px-6 text-sm font-extrabold uppercase tracking-wider transition ${
            activeTab === 'orders' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-slate-500'
          }`}
        >
          My Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-3 px-6 text-sm font-extrabold uppercase tracking-wider transition ${
            activeTab === 'addresses' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-slate-500'
          }`}
        >
          Saved Addresses ({savedAddresses.length})
        </button>
      </div>

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500">
              No orders placed yet.
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                  <div>
                    <span className="font-extrabold text-slate-900 text-base">Order #{order.orderNumber}</span>
                    <p className="text-xs text-slate-500">Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                      order.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-800' :
                      order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {order.status}
                    </span>

                    <button
                      onClick={() => setSelectedInvoiceOrder(order)}
                      className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition"
                    >
                      <Printer className="w-3.5 h-3.5" /> PDF Invoice
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-slate-100">
                  {order.items.map((item) => (
                    <div key={item.id} className="py-2 flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-3">
                        <img src={item.productImage} alt="" className="w-10 h-12 object-cover rounded-md" />
                        <div>
                          <p className="font-bold text-slate-900">{item.productTitle}</p>
                          <p className="text-slate-500">Size: {item.size} | Color: {item.color} | Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-slate-900">₹{item.totalPrice.toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-between items-center text-xs font-bold text-slate-700 bg-slate-50 p-3 rounded-xl">
                  <span>Payment Method: {order.paymentMethod} ({order.paymentStatus})</span>
                  <span className="text-sm font-black text-indigo-600">Total: ₹{order.totalAmount.toLocaleString()}</span>
                </div>

              </div>
            ))
          )}
        </div>
      )}

      {/* Addresses Tab */}
      {activeTab === 'addresses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedAddresses.map((addr) => (
            <div key={addr.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-2 relative">
              {addr.isDefault && (
                <span className="absolute top-4 right-4 bg-indigo-100 text-indigo-800 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                  DEFAULT
                </span>
              )}
              <h4 className="font-bold text-slate-900 text-base">{addr.fullName}</h4>
              <p className="text-xs text-slate-600">{addr.addressLine}</p>
              <p className="text-xs text-slate-600">{addr.city}, {addr.state} - {addr.postalCode}</p>
              <p className="text-xs text-slate-500 font-semibold pt-1">📱 Phone: {addr.phone}</p>
            </div>
          ))}
        </div>
      )}

      {/* Invoice Modal */}
      <InvoiceModal
        isOpen={!!selectedInvoiceOrder}
        order={selectedInvoiceOrder}
        onClose={() => setSelectedInvoiceOrder(null)}
      />

    </div>
  );
}
