'use client';

import React from 'react';
import { FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <div className="space-y-2">
        <FileText className="w-10 h-10 text-indigo-600" />
        <h1 className="text-3xl font-black text-slate-900 uppercase">TERMS & CONDITIONS</h1>
        <p className="text-xs text-slate-500">Effective Date: July 2026</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4 text-xs text-slate-600 leading-relaxed">
        <h3 className="font-bold text-slate-900 text-sm">1. Terms of Use</h3>
        <p>By accessing or purchasing from ELEVATE APPAREL, you agree to comply with our terms, privacy policies, and shipping/return guidelines.</p>

        <h3 className="font-bold text-slate-900 text-sm">2. Product Availability & Stock</h3>
        <p>All items are subject to real-time inventory tracking. If an item stock reduces to zero, purchase options will be automatically disabled until restocked.</p>

        <h3 className="font-bold text-slate-900 text-sm">3. Pricing & Taxes</h3>
        <p>All prices listed on ELEVATE APPAREL include applicable GST tax. Tax breakdowns are itemized on your Tax Invoice PDF.</p>
      </div>
    </div>
  );
}
