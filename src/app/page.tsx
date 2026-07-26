'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  Flame, 
  Clock, 
  ShieldCheck, 
  Star, 
  TrendingUp, 
  ShoppingBag,
  Zap
} from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { getProducts, getCategories } from '@/lib/store';
import { Product, Category } from '@/lib/types';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const loadData = () => {
      setProducts(getProducts());
      setCategories(getCategories());
    };

    loadData();

    window.addEventListener('elevate_products_updated', loadData);

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      window.removeEventListener('elevate_products_updated', loadData);
    };
  }, []);

  const featuredProducts = products.filter(p => p.featured || p.discountPercent > 30).slice(0, 8);

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Banner Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent z-10" />
        
        {/* Hero Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop')` }}
        />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36 flex flex-col justify-center">
          <div className="max-w-2xl space-y-6">
            
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500/20 to-amber-500/20 border border-amber-400/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-300 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>THE 2026 SUMMER LUXURY COLLECTION HAS ARRIVED</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight uppercase">
              REDEFINE YOUR <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-400 bg-clip-text text-transparent">STREETWEAR</span> & TAILORING
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Curated minimal silhouettes, 450 GSM organic French Terry hoodies, crisp Italian linen resort shirts, and handcrafted leather accessories.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/products"
                className="px-8 py-4 bg-theme-primary hover:bg-theme-hover text-white font-extrabold rounded-2xl shadow-xl transition flex items-center space-x-3 text-sm group"
              >
                <span>EXPLORE ALL COLLECTIONS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/products?category=men"
                className="px-8 py-4 bg-slate-800/80 hover:bg-slate-800 text-white font-bold rounded-2xl border border-slate-700 backdrop-blur-md transition text-sm"
              >
                SHOP MENSWEAR
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Categories Grid Circle Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-wide">Shop By Category</h2>
            <p className="text-xs text-slate-500 mt-1">Select a category to browse specific apparel</p>
          </div>
          <Link href="/products" className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="group flex flex-col items-center text-center space-y-2"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 border-2 border-slate-200 group-hover:border-indigo-600 transition-colors shadow-md overflow-hidden bg-white">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Hot Deals Countdown Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-indigo-800/40 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="space-y-4 max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-rose-500/20 border border-rose-500/40 px-3 py-1 rounded-full text-xs font-bold text-rose-300">
              <Flame className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>FLASH DEALS - LIMITED TIME OFFER</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
              UP TO <span className="text-amber-400">40% OFF</span> ON PREMIUM HOODIES & JACKETS
            </h3>

            <p className="text-sm text-slate-300">
              Use promotional coupon code <span className="font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">WELCOME10</span> at checkout for instant extra discount.
            </p>
          </div>

          {/* Countdown Clock */}
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-3 text-center">
              <div className="bg-slate-800/90 border border-slate-700 p-3 sm:p-4 rounded-2xl min-w-[70px]">
                <span className="text-2xl sm:text-3xl font-black text-amber-400">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="block text-[10px] text-slate-400 font-bold uppercase mt-1">Hours</span>
              </div>
              <span className="text-2xl font-bold text-slate-500">:</span>
              <div className="bg-slate-800/90 border border-slate-700 p-3 sm:p-4 rounded-2xl min-w-[70px]">
                <span className="text-2xl sm:text-3xl font-black text-amber-400">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="block text-[10px] text-slate-400 font-bold uppercase mt-1">Mins</span>
              </div>
              <span className="text-2xl font-bold text-slate-500">:</span>
              <div className="bg-slate-800/90 border border-slate-700 p-3 sm:p-4 rounded-2xl min-w-[70px]">
                <span className="text-2xl sm:text-3xl font-black text-amber-400">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="block text-[10px] text-slate-400 font-bold uppercase mt-1">Secs</span>
              </div>
            </div>

            <Link
              href="/products"
              className="px-8 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider shadow-lg transition"
            >
              CLAIM FLASH DEALS
            </Link>
          </div>

        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-indigo-600" /> Featured Arrivals
            </h2>
            <p className="text-xs text-slate-500 mt-1">Handpicked bestsellers with top customer ratings</p>
          </div>
          <Link href="/products" className="text-xs font-bold text-indigo-600 hover:underline">
            Browse All Products &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Customer Trust Reviews Carousel */}
      <section className="bg-slate-900 text-white py-16 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl font-black uppercase tracking-wider text-white">What Our Customers Say</h2>
            <div className="flex items-center justify-center space-x-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-400">Over 10,000+ verified customer reviews across India</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/60 border border-slate-700/80 p-6 rounded-2xl space-y-4">
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"
                  alt="Vikram"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-white text-sm">Vikram Malhotra</h4>
                  <p className="text-xs text-slate-400">Mumbai • Verified Buyer</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                &quot;The 450 GSM French Terry Hoodie is incredible. The drop shoulder drape and fabric weight match luxury international brands charging triple.&quot;
              </p>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/80 p-6 rounded-2xl space-y-4">
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop"
                  alt="Aarav"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-white text-sm">Aarav Patel</h4>
                  <p className="text-xs text-slate-400">Bengaluru • Verified Buyer</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                &quot;Ordered Nike VaporMax Air runners and received original double-boxed packaging in 2 days. Razorpay payment was seamless.&quot;
              </p>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/80 p-6 rounded-2xl space-y-4">
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                  alt="Ananya"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-white text-sm">Ananya Sen</h4>
                  <p className="text-xs text-slate-400">Delhi NCR • Verified Buyer</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                &quot;The Zara tailored blazer fit like a glove! Tax invoice PDF download and order status tracking made the entire purchase feel enterprise-grade.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
