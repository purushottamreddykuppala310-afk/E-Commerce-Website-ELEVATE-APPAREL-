'use client';

import React from 'react';
import { Sparkles, ShieldCheck, Award, HeartHandshake } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-amber-400 flex items-center justify-center mx-auto text-white">
          <Sparkles className="w-6 h-6" />
        </div>
        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight">ABOUT ELEVATE APPAREL</h1>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          Crafting premium, modern streetwear and sharp tailoring inspired by global fashion powerhouses.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6 text-sm text-slate-600 leading-relaxed">
        <h3 className="font-black text-slate-900 text-lg uppercase">OUR PHILOSOPHY</h3>
        <p>
          Founded in 2026, ELEVATE APPAREL was created to bridge the gap between high-end international streetwear design aesthetics and accessible Indian luxury. Inspired by the tailored minimalism of Zara, the athletic energy of Nike, and the vast curation of AJIO and Myntra, ELEVATE delivers uncompromised quality.
        </p>
        <p>
          Every fabric is meticulously sourced—from 450 GSM organic French Terry cotton for our signature oversized hoodies to European flax linen for resort shirts.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
          <div className="space-y-2 text-center p-4 bg-slate-50 rounded-2xl">
            <ShieldCheck className="w-8 h-8 text-indigo-600 mx-auto" />
            <h4 className="font-bold text-slate-900 text-sm">Ethical Sourcing</h4>
            <p className="text-xs text-slate-500">100% organic, pre-shrunk, anti-pilling materials.</p>
          </div>
          <div className="space-y-2 text-center p-4 bg-slate-50 rounded-2xl">
            <Award className="w-8 h-8 text-amber-500 mx-auto" />
            <h4 className="font-bold text-slate-900 text-sm">Enterprise Quality</h4>
            <p className="text-xs text-slate-500">Double-stitched seams and custom metal aglets.</p>
          </div>
          <div className="space-y-2 text-center p-4 bg-slate-50 rounded-2xl">
            <HeartHandshake className="w-8 h-8 text-emerald-500 mx-auto" />
            <h4 className="font-bold text-slate-900 text-sm">Customer Priority</h4>
            <p className="text-xs text-slate-500">7-Day easy returns and instant Razorpay refunds.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
