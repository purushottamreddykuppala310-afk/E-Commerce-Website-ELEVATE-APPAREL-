'use client';

import React from 'react';
import { Truck } from 'lucide-react';

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <div className="space-y-2">
        <Truck className="w-10 h-10 text-indigo-600" />
        <h1 className="text-3xl font-black text-slate-900 uppercase">SHIPPING & DELIVERY POLICY</h1>
        <p className="text-xs text-slate-500">Fast, Reliable Nationwide Shipping</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4 text-xs text-slate-600 leading-relaxed">
        <h3 className="font-bold text-slate-900 text-sm">1. Express Shipping Timeline</h3>
        <p>Orders are dispatched within 24 business hours from our Mumbai central warehouse. Delivery takes 2-4 business days across India.</p>

        <h3 className="font-bold text-slate-900 text-sm">2. Free Delivery Eligibility</h3>
        <p>Free Express Delivery is automatically applied to all orders above ₹1,500 or when using code FREESHIP.</p>
      </div>
    </div>
  );
}
