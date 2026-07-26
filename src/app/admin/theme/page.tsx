'use client';

import React, { useState } from 'react';
import { Palette, Check, RefreshCw, Sparkles, Eye } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { ThemeSettings } from '@/lib/types';

const PRESET_THEMES: { name: string; theme: ThemeSettings }[] = [
  {
    name: 'Elevate Indigo (Default)',
    theme: {
      id: 'indigo',
      themeName: 'Elevate Indigo',
      primaryColor: '#4f46e5',
      primaryHover: '#4338ca',
      headerBg: '#0f172a',
      footerBg: '#0f172a',
      cardBg: '#ffffff',
      accentColor: '#f59e0b',
      borderRadius: '0.75rem'
    }
  },
  {
    name: 'Zara Dark Minimalist',
    theme: {
      id: 'zara-dark',
      themeName: 'Zara Dark Minimalist',
      primaryColor: '#18181b',
      primaryHover: '#09090b',
      headerBg: '#09090b',
      footerBg: '#09090b',
      cardBg: '#ffffff',
      accentColor: '#e4e4e7',
      borderRadius: '0.25rem'
    }
  },
  {
    name: 'Nike Volt Crimson',
    theme: {
      id: 'nike-volt',
      themeName: 'Nike Volt Crimson',
      primaryColor: '#e63946',
      primaryHover: '#d62828',
      headerBg: '#111111',
      footerBg: '#111111',
      cardBg: '#ffffff',
      accentColor: '#ffb703',
      borderRadius: '1rem'
    }
  },
  {
    name: 'AJIO Classic Royal Blue',
    theme: {
      id: 'ajio-royal',
      themeName: 'AJIO Classic Royal Blue',
      primaryColor: '#1e40af',
      primaryHover: '#1e3a8a',
      headerBg: '#0f172a',
      footerBg: '#0f172a',
      cardBg: '#ffffff',
      accentColor: '#f59e0b',
      borderRadius: '0.75rem'
    }
  },
  {
    name: 'Emerald Luxury Gold',
    theme: {
      id: 'emerald-gold',
      themeName: 'Emerald Luxury Gold',
      primaryColor: '#064e3b',
      primaryHover: '#022c22',
      headerBg: '#022c22',
      footerBg: '#022c22',
      cardBg: '#ffffff',
      accentColor: '#d97706',
      borderRadius: '0.75rem'
    }
  }
];

export default function AdminThemePage() {
  const { theme, updateTheme, resetTheme } = useTheme();

  const [currentForm, setCurrentForm] = useState<ThemeSettings>(theme);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleApplyPreset = (preset: ThemeSettings) => {
    setCurrentForm(preset);
    updateTheme(preset);
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 3000);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTheme(currentForm);
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 3000);
  };

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
            <Palette className="w-6 h-6 text-amber-400" /> LIVE THEME MANAGER
          </h1>
          <p className="text-xs text-slate-400">
            Instantly customize the entire website branding colors (buttons, header, footer, background) with one click without changing code!
          </p>
        </div>

        <button
          onClick={resetTheme}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-rose-400 font-bold text-xs rounded-xl border border-slate-700 transition flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset Default Theme
        </button>
      </div>

      {/* Preset Branding Templates Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">One-Click Branding Presets</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRESET_THEMES.map((item) => (
            <button
              key={item.theme.id}
              onClick={() => handleApplyPreset(item.theme)}
              className={`p-4 rounded-2xl border-2 text-left transition flex items-center justify-between ${
                theme.primaryColor === item.theme.primaryColor
                  ? 'border-amber-400 bg-amber-400/10'
                  : 'border-slate-800 bg-slate-900 hover:border-slate-700'
              }`}
            >
              <div className="space-y-2">
                <p className="font-bold text-white text-xs">{item.name}</p>
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full border border-slate-700" style={{ backgroundColor: item.theme.primaryColor }} title="Primary" />
                  <span className="w-5 h-5 rounded-full border border-slate-700" style={{ backgroundColor: item.theme.headerBg }} title="Header" />
                  <span className="w-5 h-5 rounded-full border border-slate-700" style={{ backgroundColor: item.theme.accentColor }} title="Accent" />
                </div>
              </div>
              {theme.primaryColor === item.theme.primaryColor && (
                <Check className="w-5 h-5 text-amber-400" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Color Pickers & Live Preview (2 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Custom Color Controls (7 cols) */}
        <form onSubmit={handleCustomSubmit} className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6 shadow-xl">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Custom Color Palette Configuration
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Primary Accent Color */}
            <div className="space-y-1.5 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <label className="text-xs font-bold text-slate-300">Primary Brand Accent</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={currentForm.primaryColor}
                  onChange={(e) => setCurrentForm({ ...currentForm, primaryColor: e.target.value })}
                  className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                />
                <input
                  type="text"
                  value={currentForm.primaryColor}
                  onChange={(e) => setCurrentForm({ ...currentForm, primaryColor: e.target.value })}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono uppercase"
                />
              </div>
            </div>

            {/* Primary Hover Color */}
            <div className="space-y-1.5 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <label className="text-xs font-bold text-slate-300">Primary Hover Color</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={currentForm.primaryHover}
                  onChange={(e) => setCurrentForm({ ...currentForm, primaryHover: e.target.value })}
                  className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                />
                <input
                  type="text"
                  value={currentForm.primaryHover}
                  onChange={(e) => setCurrentForm({ ...currentForm, primaryHover: e.target.value })}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono uppercase"
                />
              </div>
            </div>

            {/* Header Background */}
            <div className="space-y-1.5 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <label className="text-xs font-bold text-slate-300">Navbar Header Background</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={currentForm.headerBg}
                  onChange={(e) => setCurrentForm({ ...currentForm, headerBg: e.target.value })}
                  className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                />
                <input
                  type="text"
                  value={currentForm.headerBg}
                  onChange={(e) => setCurrentForm({ ...currentForm, headerBg: e.target.value })}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono uppercase"
                />
              </div>
            </div>

            {/* Footer Background */}
            <div className="space-y-1.5 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <label className="text-xs font-bold text-slate-300">Footer Background</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={currentForm.footerBg}
                  onChange={(e) => setCurrentForm({ ...currentForm, footerBg: e.target.value })}
                  className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                />
                <input
                  type="text"
                  value={currentForm.footerBg}
                  onChange={(e) => setCurrentForm({ ...currentForm, footerBg: e.target.value })}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono uppercase"
                />
              </div>
            </div>

          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-lg transition uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> APPLY THEME GLOBALLY ACROSS WEBSITE
          </button>

          {successMessage && (
            <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold text-center flex items-center justify-center gap-2">
              <Check className="w-4 h-4" /> Website Brand Colors Updated Live! Visit Customer Storefront to see changes.
            </div>
          )}

        </form>

        {/* Live Preview Canvas (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Eye className="w-4 h-4 text-indigo-400" /> Live Brand Preview Window
          </h3>

          <div className="bg-slate-100 rounded-2xl p-4 text-slate-900 space-y-4 shadow-inner border border-slate-300">
            {/* Header Preview */}
            <div className="p-3 rounded-xl text-white flex items-center justify-between text-xs font-bold" style={{ backgroundColor: currentForm.headerBg }}>
              <span>ELEVATE APPAREL</span>
              <div className="flex space-x-2 text-[10px]">
                <span>MENS</span>
                <span>WOMENS</span>
                <span>CART (2)</span>
              </div>
            </div>

            {/* Product Card Preview */}
            <div className="bg-white p-4 rounded-xl shadow-md border border-slate-200 space-y-3">
              <div className="w-full h-24 bg-slate-200 rounded-lg flex items-center justify-center text-xs font-bold text-slate-400">
                Product Image Preview
              </div>
              <h4 className="font-bold text-xs text-slate-900">Heavyweight French Terry Hoodie</h4>
              <p className="font-extrabold text-sm" style={{ color: currentForm.primaryColor }}>₹2,499</p>
              
              <button
                type="button"
                style={{ backgroundColor: currentForm.primaryColor }}
                className="w-full py-2 text-white font-bold text-xs rounded-lg shadow transition"
              >
                ADD TO BAG
              </button>
            </div>

            {/* Footer Preview */}
            <div className="p-3 rounded-xl text-slate-400 text-[10px] text-center" style={{ backgroundColor: currentForm.footerBg }}>
              © 2026 ELEVATE APPAREL Inc. All Rights Reserved.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
