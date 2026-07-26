'use client';

import React from 'react';
import { RotateCcw } from 'lucide-react';

export default function ReturnPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <div className="space-y-2">
        <RotateCcw className="w-10 h-10 text-indigo-600" />
        <h1 className="text-3xl font-black text-slate-900 uppercase">7-DAY RETURN & EXCHANGE POLICY</h1>
        <p className="text-xs text-slate-500">Doorstep Pickup & Instant Refund Guarantee</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4 text-xs text-slate-600 leading-relaxed">
        <h3 className="font-bold text-slate-900 text-sm">1. 7-Day Doorstep Returns</h3>
        <p>If you are not 100% satisfied with the fit or quality of your apparel, you can request a return or size exchange within 7 days of delivery from your account dashboard.</p>

        <h3 className="font-bold text-slate-900 text-sm">2. Instant Refund Processing</h3>
        <p>Upon doorstep pickup quality inspection, instant refund is credited back to your original Razorpay payment method or UPI bank account within 24 hours.</p>
      </div>
    </div>
  );
}
