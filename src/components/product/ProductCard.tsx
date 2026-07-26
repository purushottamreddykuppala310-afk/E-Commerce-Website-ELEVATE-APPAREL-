'use client';

import React from 'react';
import Link from 'next/link';
import { Star, Heart, ShoppingBag, AlertCircle } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const inWish = isInWishlist(product.id);

  const primaryImage = product.images.find(img => img.isPrimary)?.url || product.images[0]?.url || 'https://via.placeholder.com/400';
  const secondaryImage = product.images[1]?.url || primaryImage;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock || product.stockQuantity === 0) return;
    const defaultColor = product.colors[0]?.name || 'Standard';
    const defaultSize = product.sizes[0] || 'M';
    addToCart(product, defaultColor, defaultSize, 1);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="group relative bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      
      {/* Product Image Container */}
      <Link href={`/products/${product.id}`} className="block relative aspect-[4/5] bg-slate-100 overflow-hidden">
        {/* Main Image */}
        <img
          src={primaryImage}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Secondary Image on Hover */}
        {secondaryImage !== primaryImage && (
          <img
            src={secondaryImage}
            alt={product.title}
            className="w-full h-full object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}

        {/* Discount Badge */}
        {product.discountPercent > 0 && (
          <div className="absolute top-3 left-3 bg-rose-600 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-md tracking-wider uppercase">
            {product.discountPercent}% OFF
          </div>
        )}

        {/* Out of Stock Overlay */}
        {(!product.inStock || product.stockQuantity === 0) && (
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] flex items-center justify-center p-4">
            <div className="bg-rose-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
              <AlertCircle className="w-4 h-4" /> Out of Stock
            </div>
          </div>
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:text-rose-500 shadow-md transition transform active:scale-95 z-10"
          title={inWish ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${inWish ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Quick Add Overlay Button on Desktop */}
        {product.inStock && product.stockQuantity > 0 && (
          <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleQuickAdd}
              className="w-full py-2.5 bg-slate-900/90 hover:bg-slate-900 backdrop-blur-md text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-2 shadow-xl"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Quick Add to Bag</span>
            </button>
          </div>
        )}
      </Link>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold uppercase tracking-wider text-slate-400">{product.categoryName || 'Apparel'}</span>
            
            {/* Rating */}
            <div className="flex items-center space-x-1 text-amber-500 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          <Link href={`/products/${product.id}`} className="block">
            <h3 className="font-bold text-slate-900 text-sm line-clamp-1 hover:text-indigo-600 transition">
              {product.title}
            </h3>
          </Link>
        </div>

        {/* Color Swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center space-x-1.5 py-1">
            {product.colors.slice(0, 4).map((color) => (
              <span
                key={color.id}
                style={{ backgroundColor: color.hexCode }}
                className="w-3 h-3 rounded-full border border-slate-300 shadow-sm"
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-slate-500 font-medium">+{product.colors.length - 4}</span>
            )}
          </div>
        )}

        {/* Pricing & Stock Warning */}
        <div className="pt-1 flex items-baseline justify-between border-t border-slate-100">
          <div className="flex items-baseline space-x-2">
            <span className="text-base font-extrabold text-slate-900">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Low Stock Warning */}
          {product.inStock && product.stockQuantity <= 5 && (
            <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
              Only {product.stockQuantity} Left!
            </span>
          )}
        </div>

      </div>

    </div>
  );
}
