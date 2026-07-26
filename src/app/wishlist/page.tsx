'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { useCart } from '@/context/CartContext';

export default function WishlistPage() {
  const { wishlist } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
          <Heart className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 uppercase">Your Wishlist is Empty</h2>
        <p className="text-slate-500 text-sm max-w-sm mx-auto">
          Save your favorite hoodies, linen shirts, and sneakers to shop them anytime.
        </p>
        <Link href="/products" className="inline-block px-8 py-3 bg-slate-900 text-white font-bold text-xs rounded-xl shadow-lg">
          BROWSE PRODUCTS
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
        <Heart className="w-6 h-6 text-rose-500 fill-rose-500" /> SAVED WISHLIST ({wishlist.length})
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
