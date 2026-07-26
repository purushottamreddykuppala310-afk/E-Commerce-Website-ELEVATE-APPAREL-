'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  MapPin, 
  Printer, 
  Download, 
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { getOrderById } from '@/lib/store';
import { Order } from '@/lib/types';
import InvoiceModal from '@/components/ui/InvoiceModal';

export default function OrderSuccessPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params?.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  useEffect(() => {
    if (orderId) {
      const found = getOrderById(orderId);
      if (found) setOrder(found);
    }
  }, [orderId]);

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Order Information</h2>
        <p className="text-slate-500 text-sm">Processing order receipt...</p>
        <button onClick={() => router.push('/')} className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-xl text-xs">
          Return to Storefront
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Animated Success Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-indigo-800/40 shadow-2xl text-center space-y-4 relative overflow-hidden">
        <div className="w-20 h-20 bg-emerald-500/20 border-2 border-emerald-400 rounded-full flex items-center justify-center mx-auto text-emerald-400 animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="inline-block px-3 py-1 bg-amber-400/20 text-amber-300 font-bold text-xs rounded-full uppercase tracking-wider border border-amber-400/30">
          AUTOMATIC ORDER CONFIRMED
        </span>

        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
          THANK YOU FOR YOUR ORDER!
        </h1>

        <p className="text-slate-300 text-sm max-w-lg mx-auto">
          Your order <strong className="text-amber-400">#{order.orderNumber}</strong> has been successfully placed. Stock has been updated and a confirmation email has been dispatched to <strong>{order.email}</strong>.
        </p>

        <div className="pt-4 flex justify-center space-x-4">
          <button
            onClick={() => setIsInvoiceOpen(true)}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-2"
          >
            <Printer className="w-4 h-4" /> Download / Print PDF Tax Invoice
          </button>
          <Link
            href="/account"
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition"
          >
            View Order History
          </Link>
        </div>
      </div>

      {/* Live Order Tracking Stepper */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
        <h3 className="font-extrabold text-slate-900 text-base uppercase tracking-wider flex items-center gap-2">
          <Truck className="w-5 h-5 text-indigo-600" /> Order Tracking Timeline
        </h3>

        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center mx-auto shadow-md">✓</div>
            <p className="font-bold text-slate-900">Order Placed</p>
            <p className="text-[10px] text-slate-400">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center mx-auto shadow-md">2</div>
            <p className="font-bold text-slate-900">Processing</p>
            <p className="text-[10px] text-slate-500 font-semibold">In Warehouse</p>
          </div>

          <div className="space-y-2 opacity-50">
            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 font-bold flex items-center justify-center mx-auto">3</div>
            <p className="font-bold text-slate-700">Shipped</p>
            <p className="text-[10px] text-slate-400">Delhivery Express</p>
          </div>

          <div className="space-y-2 opacity-50">
            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 font-bold flex items-center justify-center mx-auto">4</div>
            <p className="font-bold text-slate-700">Delivered</p>
            <p className="text-[10px] text-slate-400">Est. 2-3 Days</p>
          </div>
        </div>
      </div>

      {/* Order Item Details */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="font-extrabold text-slate-900 text-base uppercase tracking-wider border-b border-slate-100 pb-3">
          Order Items Summary
        </h3>

        <div className="divide-y divide-slate-100">
          {order.items.map((item) => (
            <div key={item.id} className="py-3 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-4">
                <img src={item.productImage} alt="" className="w-12 h-14 object-cover rounded-lg" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{item.productTitle}</h4>
                  <p className="text-slate-500">Size: {item.size} | Color: {item.color} | Qty: {item.quantity}</p>
                </div>
              </div>
              <span className="font-extrabold text-slate-900 text-sm">₹{item.totalPrice.toLocaleString()}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-200 pt-4 flex justify-between items-center text-sm font-black text-slate-900">
          <span>Grand Total Paid ({order.paymentMethod}):</span>
          <span className="text-indigo-600 text-lg">₹{order.totalAmount.toLocaleString()}</span>
        </div>
      </div>

      {/* Invoice Modal Trigger */}
      <InvoiceModal isOpen={isInvoiceOpen} order={order} onClose={() => setIsInvoiceOpen(false)} />

    </div>
  );
}
