'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Tag, 
  ArrowRight, 
  ShieldCheck, 
  Truck
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function FullCartPage() {
  const router = useRouter();
  const {
    cart,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    shippingFee,
    taxAmount,
    finalTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ success: boolean; text: string } | null>(null);

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    setCouponMsg({ success: res.success, text: res.message });
    if (res.success) setCouponCode('');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 uppercase">Your Shopping Cart is Empty</h2>
        <p className="text-slate-500 text-sm max-w-sm mx-auto">
          Explore our trending menswear, oversized hoodies, and sneakers to fill your bag.
        </p>
        <Link href="/products" className="inline-block px-8 py-3.5 bg-slate-900 text-white font-bold text-sm rounded-2xl shadow-xl hover:bg-slate-800 transition">
          EXPLORE COLLECTIONS
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
        SHOPPING BAG ({cart.reduce((sum, i) => sum + i.quantity, 0)} ITEMS)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Cart Item List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 items-center shadow-sm">
              <img
                src={item.product.images[0]?.url || 'https://via.placeholder.com/150'}
                alt={item.product.title}
                className="w-24 h-32 object-cover rounded-xl flex-shrink-0"
              />

              <div className="flex-1 min-w-0 space-y-2 text-center sm:text-left w-full">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded">
                      {item.product.categoryName}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base mt-1 line-clamp-1">{item.product.title}</h3>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-slate-400 hover:text-rose-600 transition"
                    title="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center justify-center sm:justify-start space-x-3 text-xs text-slate-500 font-medium">
                  <span className="bg-slate-100 px-2.5 py-1 rounded-md">Size: <strong className="text-slate-900">{item.selectedSize}</strong></span>
                  <span className="bg-slate-100 px-2.5 py-1 rounded-md">Color: <strong className="text-slate-900">{item.selectedColor}</strong></span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-3 border border-slate-300 rounded-xl bg-slate-50 p-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 text-slate-600 hover:bg-slate-200 rounded-lg"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 text-slate-600 hover:bg-slate-200 rounded-lg"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <span className="text-lg font-black text-slate-900">
                    ₹{(item.unitPrice * item.quantity).toLocaleString()}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Summary Card (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="font-black text-slate-900 text-lg uppercase tracking-wider border-b border-slate-100 pb-3">
              ORDER SUMMARY
            </h3>

            {/* Coupon Box */}
            <div className="space-y-2">
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs font-semibold text-emerald-800">
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-emerald-600" />
                    <span>Coupon &apos;{appliedCoupon.code}&apos; (-₹{discountAmount})</span>
                  </div>
                  <button onClick={removeCoupon} className="text-rose-600 font-bold hover:underline">Remove</button>
                </div>
              ) : (
                <form onSubmit={handleCouponSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon (e.g. WELCOME10)"
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs uppercase font-bold focus:outline-none focus:border-indigo-600"
                  />
                  <button type="submit" className="bg-slate-900 text-white font-bold text-xs px-4 rounded-xl hover:bg-slate-800">
                    Apply
                  </button>
                </form>
              )}
              {couponMsg && (
                <p className={`text-xs font-medium ${couponMsg.success ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {couponMsg.text}
                </p>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">₹{subtotal.toLocaleString()}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount</span>
                  <span>-₹{discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated GST (5%)</span>
                <span>₹{taxAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span className={shippingFee === 0 ? 'text-emerald-600 font-bold' : ''}>
                  {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 border-t border-slate-200 pt-3">
                <span>Total Payable</span>
                <span className="text-indigo-600">₹{finalTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => router.push('/checkout')}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl flex items-center justify-center space-x-2 transition shadow-xl shadow-indigo-600/20"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
