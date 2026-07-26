'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <div className="space-y-2">
        <ShieldCheck className="w-10 h-10 text-indigo-600" />
        <h1 className="text-3xl font-black text-slate-900 uppercase">PRIVACY POLICY</h1>
        <p className="text-xs text-slate-500">Last updated: July 26, 2026</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4 text-xs text-slate-600 leading-relaxed">
        <h3 className="font-bold text-slate-900 text-sm">1. Data Collection</h3>
        <p>ELEVATE APPAREL collects personal information including name, email address, phone number, shipping address, and payment transaction metadata processed securely through Razorpay.</p>

        <h3 className="font-bold text-slate-900 text-sm">2. Use of Information</h3>
        <p>Your data is strictly utilized for order fulfillment, stock reduction, tax invoice generation, shipping logistics, customer support, and essential transactional notifications.</p>

        <h3 className="font-bold text-slate-900 text-sm">3. Security & Encryption</h3>
        <p>All authentication and payment endpoints use JWT token authorization, password hashing, and 256-Bit SSL encryption. We do not store raw credit card numbers or UPI PINs.</p>
      </div>
    </div>
  );
}
