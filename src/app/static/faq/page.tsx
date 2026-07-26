'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const FAQS = [
  {
    q: 'How does doorstep 7-day return work?',
    a: 'You can initiate a return within 7 days of delivery directly from your account page. Our logistics partner will pick up the item from your doorstep free of cost, and instant refund is initiated upon quality verification.'
  },
  {
    q: 'Are all payment transactions on Razorpay secure?',
    a: 'Yes, 100%. All payments are processed through Razorpay using 256-Bit SSL Encryption. We support UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, NetBanking, and Cash on Delivery.'
  },
  {
    q: 'What should I do if an item is Out of Stock?',
    a: 'When an item inventory reaches 0, it will display "Out of Stock" and disable purchasing. You can click on the product to subscribe for restock notifications.'
  },
  {
    q: 'How do I download my Tax Invoice?',
    a: 'Log into your customer portal, navigate to "My Orders", and click "PDF Invoice" to view, print, or download your official tax invoice formatted with GST breakdown.'
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-2">
        <HelpCircle className="w-10 h-10 text-indigo-600 mx-auto" />
        <h1 className="text-3xl font-black text-slate-900 uppercase">FREQUENTLY ASKED QUESTIONS</h1>
        <p className="text-xs text-slate-500">Quick answers to common questions about orders, payments, and returns.</p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full p-5 text-left font-bold text-slate-900 text-sm flex justify-between items-center hover:bg-slate-50 transition"
            >
              <span>{faq.q}</span>
              {openIndex === idx ? <ChevronUp className="w-4 h-4 text-indigo-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>
            {openIndex === idx && (
              <div className="p-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
