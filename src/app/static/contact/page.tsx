'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight">CONTACT CUSTOMER CARE</h1>
        <p className="text-sm text-slate-500">
          Have a question about your order, sizing, or 7-day doorstep return? We are here 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Contact Info Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center space-x-3 text-indigo-600">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Customer Helpline</h4>
                <p className="text-xs text-slate-500">+91 (022) 8000-ELEVATE (Mon-Sat, 9AM - 8PM)</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center space-x-3 text-emerald-600">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Email Support</h4>
                <p className="text-xs text-slate-500">support@elevateapparel.com</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center space-x-3 text-amber-600">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Headquarters</h4>
                <p className="text-xs text-slate-500">Corporate Tower B, BKC, Mumbai, MH - 400051</p>
              </div>
            </div>
          </div>

        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="text-xl font-bold text-slate-900">Message Sent Successfully!</h3>
              <p className="text-xs text-slate-500">Our customer care specialist will respond within 4 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-extrabold text-slate-900 text-lg uppercase tracking-wider mb-4">Send Us a Direct Message</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Order tracking, size exchange, billing query..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase">Message</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> SUBMIT MESSAGE
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
