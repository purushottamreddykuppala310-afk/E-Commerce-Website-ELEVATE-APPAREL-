'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Lock, 
  Mail, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube,
  Send,
  CheckCircle
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-theme-footer text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Proposition Badges */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wide">Express Delivery</h4>
              <p className="text-xs text-slate-400 mt-0.5">Free shipping on orders over ₹1500</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wide">100% Authentic</h4>
              <p className="text-xs text-slate-400 mt-0.5">Direct from verified designer looms</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wide">7 Days Returns</h4>
              <p className="text-xs text-slate-400 mt-0.5">Instant doorstep pickup & refund</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wide">Razorpay Secured</h4>
              <p className="text-xs text-slate-400 mt-0.5">256-Bit SSL Encrypted checkout</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-12 border-b border-slate-800">
          
          {/* Brand Info & Newsletter */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-amber-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-wider uppercase text-white">ELEVATE APPAREL</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Production-ready online clothing shopping destination inspired by AJIO, Zara, Myntra, and Nike. Premium fabrics, sharp fits, and seamless digital commerce.
            </p>

            {/* Newsletter Box */}
            <div className="pt-2">
              <p className="text-xs font-bold text-white uppercase tracking-wider mb-2">Subscribe to VIP Insiders</p>
              {subscribed ? (
                <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold bg-emerald-950/40 border border-emerald-800 p-2.5 rounded-xl">
                  <CheckCircle className="w-4 h-4" />
                  <span>Thank you! You are subscribed for 20% discount codes.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex max-w-sm">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-l-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-r-xl font-medium text-sm transition flex items-center gap-1"
                  >
                    <span>Join</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Shop Collections</h5>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/products?category=men" className="hover:text-amber-400 transition">Men&apos;s Fashion</Link></li>
              <li><Link href="/products?category=women" className="hover:text-amber-400 transition">Women&apos;s Apparel</Link></li>
              <li><Link href="/products?category=kids" className="hover:text-amber-400 transition">Kids Collection</Link></li>
              <li><Link href="/products?category=shirts" className="hover:text-amber-400 transition">Linen & Cotton Shirts</Link></li>
              <li><Link href="/products?category=t-shirts" className="hover:text-amber-400 transition">Oversized T-Shirts</Link></li>
              <li><Link href="/products?category=shoes" className="hover:text-amber-400 transition">Nike & Street Sneakers</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Customer Care</h5>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/static/faq" className="hover:text-amber-400 transition">Track Your Order</Link></li>
              <li><Link href="/static/shipping-policy" className="hover:text-amber-400 transition">Shipping & Delivery</Link></li>
              <li><Link href="/static/return-policy" className="hover:text-amber-400 transition">7-Day Returns & Refund</Link></li>
              <li><Link href="/static/faq" className="hover:text-amber-400 transition">Size Guide & Fit</Link></li>
              <li><Link href="/static/contact" className="hover:text-amber-400 transition">Contact Customer Support</Link></li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Legal & Admin</h5>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/static/about" className="hover:text-amber-400 transition">About ELEVATE</Link></li>
              <li><Link href="/static/privacy" className="hover:text-amber-400 transition">Privacy Policy</Link></li>
              <li><Link href="/static/terms" className="hover:text-amber-400 transition">Terms & Conditions</Link></li>
              <li><Link href="/admin/login" className="text-amber-400 font-semibold hover:underline">Admin Portal</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits & Payment Badges */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} ELEVATE APPAREL Inc. All Rights Reserved. Built with Next.js, Tailwind CSS & Prisma.</p>
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-slate-400">Payment Gateway Partner:</span>
            <span className="bg-slate-900 border border-slate-800 px-3 py-1 rounded text-amber-400 font-bold tracking-wide">
              RAZORPAY SECURE
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
