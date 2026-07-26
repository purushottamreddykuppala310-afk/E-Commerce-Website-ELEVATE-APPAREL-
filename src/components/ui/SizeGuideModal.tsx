'use client';

import React from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Ruler className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-lg">Official Apparel Size Guide (Inches)</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[80vh] space-y-6">
          <p className="text-xs text-slate-500">
            * Measurements refer to body size, not garment dimensions. If your measurements fall between two sizes, choose the larger size for a relaxed oversized fit.
          </p>

          <div>
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-3 text-indigo-600">
              Men&apos;s Tops & Hoodies
            </h4>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase">
                  <tr>
                    <th className="p-3">Size Tag</th>
                    <th className="p-3">Chest (Inches)</th>
                    <th className="p-3">Length</th>
                    <th className="p-3">Shoulder</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-600 font-medium">
                  <tr><td className="p-3 font-bold text-slate-900">S</td><td className="p-3">36 - 38 &quot;</td><td className="p-3">27 &quot;</td><td className="p-3">18 &quot;</td></tr>
                  <tr><td className="p-3 font-bold text-slate-900">M</td><td className="p-3">39 - 41 &quot;</td><td className="p-3">28 &quot;</td><td className="p-3">19 &quot;</td></tr>
                  <tr><td className="p-3 font-bold text-slate-900">L</td><td className="p-3">42 - 44 &quot;</td><td className="p-3">29 &quot;</td><td className="p-3">20 &quot;</td></tr>
                  <tr><td className="p-3 font-bold text-slate-900">XL</td><td className="p-3">45 - 47 &quot;</td><td className="p-3">30 &quot;</td><td className="p-3">21 &quot;</td></tr>
                  <tr><td className="p-3 font-bold text-slate-900">XXL</td><td className="p-3">48 - 50 &quot;</td><td className="p-3">31 &quot;</td><td className="p-3">22 &quot;</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-3 text-rose-600">
              Women&apos;s Dresses & Blazers
            </h4>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase">
                  <tr>
                    <th className="p-3">Size Tag</th>
                    <th className="p-3">Bust (Inches)</th>
                    <th className="p-3">Waist</th>
                    <th className="p-3">Hips</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-600 font-medium">
                  <tr><td className="p-3 font-bold text-slate-900">XS</td><td className="p-3">31 - 32 &quot;</td><td className="p-3">24 - 25 &quot;</td><td className="p-3">34 - 35 &quot;</td></tr>
                  <tr><td className="p-3 font-bold text-slate-900">S</td><td className="p-3">33 - 34 &quot;</td><td className="p-3">26 - 27 &quot;</td><td className="p-3">36 - 37 &quot;</td></tr>
                  <tr><td className="p-3 font-bold text-slate-900">M</td><td className="p-3">35 - 36 &quot;</td><td className="p-3">28 - 29 &quot;</td><td className="p-3">38 - 39 &quot;</td></tr>
                  <tr><td className="p-3 font-bold text-slate-900">L</td><td className="p-3">37 - 39 &quot;</td><td className="p-3">30 - 32 &quot;</td><td className="p-3">40 - 42 &quot;</td></tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition"
          >
            Got It
          </button>
        </div>

      </div>
    </div>
  );
}
