'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Tag, 
  ArrowRight, 
  Check, 
  Sparkles,
  Truck
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
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
  const [couponMessage, setCouponMessage] = useState<{ success: boolean; text: string } | null>(null);

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    setCouponMessage({ success: res.success, text: res.message });
    if (res.success) setCouponCode('');
  };

  const freeShippingThreshold = 1500;
  const freeShipProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark Overlay */}
      <div 
        onClick={() => setIsCartDrawerOpen(false)}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Cart Header */}
          <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-lg">Your Shopping Bag ({cart.reduce((sum, i) => sum + i.quantity, 0)})</h3>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-indigo-50 border-b border-indigo-100 p-3.5 px-5">
            <div className="flex items-center justify-between text-xs font-semibold text-indigo-900 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-indigo-600" />
                {subtotal >= freeShippingThreshold ? (
                  <span className="text-emerald-700 font-bold">🎉 You unlocked FREE Express Delivery!</span>
                ) : (
                  <span>Add ₹{(freeShippingThreshold - subtotal).toLocaleString()} more for FREE Delivery</span>
                )}
              </span>
              <span>{freeShipProgress}%</span>
            </div>
            <div className="w-full bg-indigo-200 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full transition-all duration-300"
                style={{ width: `${freeShipProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg">Your bag is empty</h4>
                  <p className="text-slate-500 text-sm mt-1">Discover trending oversized hoodies, blazers & sneakers.</p>
                </div>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="mt-4 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex space-x-4 p-3 bg-slate-50 border border-slate-200 rounded-xl relative group">
                  <img
                    src={item.product.images[0]?.url || 'https://via.placeholder.com/100'}
                    alt={item.product.title}
                    className="w-20 h-24 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h5 className="font-semibold text-slate-900 text-sm truncate pr-4">{item.product.title}</h5>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-rose-500 transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-slate-500 mt-1">
                        <span className="bg-slate-200 px-2 py-0.5 rounded font-medium text-slate-700">Size: {item.selectedSize}</span>
                        <span className="bg-slate-200 px-2 py-0.5 rounded font-medium text-slate-700">Color: {item.selectedColor}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2 border border-slate-300 rounded-lg bg-white p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-slate-600 hover:bg-slate-100 rounded"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-slate-600 hover:bg-slate-100 rounded"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="font-bold text-slate-900 text-sm">
                        ₹{(item.unitPrice * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Order Summary */}
          {cart.length > 0 && (
            <div className="border-t border-slate-200 p-5 bg-slate-50 space-y-4">
              
              {/* Coupon Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-xs font-medium text-emerald-800">
                    <div className="flex items-center space-x-2">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <span>Coupon &apos;{appliedCoupon.code}&apos; Applied (-₹{discountAmount})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-rose-600 hover:underline font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Coupon (e.g. WELCOME10)"
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs uppercase focus:outline-none focus:border-indigo-600 font-semibold"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 text-xs font-bold rounded-xl transition"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponMessage && (
                  <p className={`text-[11px] mt-1 font-medium ${couponMessage.success ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {couponMessage.text}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">₹{subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span>₹{taxAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className={shippingFee === 0 ? 'text-emerald-600 font-semibold' : ''}>
                    {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Estimated Total</span>
                  <span className="text-indigo-600">₹{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition shadow-lg shadow-indigo-600/20"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-full text-center text-xs font-semibold text-slate-600 hover:text-slate-900 py-1"
                >
                  Continue Shopping
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
