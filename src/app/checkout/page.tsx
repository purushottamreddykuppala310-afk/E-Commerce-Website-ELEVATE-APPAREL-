'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  MapPin, 
  Plus, 
  CreditCard, 
  Lock, 
  CheckCircle2, 
  ArrowRight,
  Truck
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import RazorpayModal from '@/components/ui/RazorpayModal';
import { createOrder } from '@/lib/store';
import { Address } from '@/lib/types';

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const {
    cart,
    savedAddresses,
    selectedAddress,
    setSelectedAddress,
    addAddress,
    subtotal,
    discountAmount,
    shippingFee,
    taxAmount,
    finalTotal,
    clearCart
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<'RAZORPAY' | 'COD'>('RAZORPAY');
  const [isRazorpayModalOpen, setIsRazorpayModalOpen] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  // New Address Form State
  const [newAddr, setNewAddr] = useState({
    fullName: user ? user.name : 'John Doe',
    phone: '+91 98765 43210',
    addressLine: '',
    city: '',
    state: '',
    postalCode: ''
  });

  if (cart.length === 0) {
    router.push('/cart');
    return null;
  }

  const handleAddNewAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.addressLine || !newAddr.city || !newAddr.postalCode) return;
    const added = addAddress({
      ...newAddr,
      country: 'India',
      isDefault: false
    });
    setSelectedAddress(added);
    setIsAddingAddress(false);
  };

  const handleProceedToPayment = () => {
    if (!selectedAddress) {
      alert('Please select or add a shipping address.');
      return;
    }

    if (paymentMethod === 'RAZORPAY') {
      setIsRazorpayModalOpen(true);
    } else {
      // COD Order Creation
      completeOrder('COD_PENDING', 'COD');
    }
  };

  const handleRazorpaySuccess = (paymentId: string, method: string) => {
    setIsRazorpayModalOpen(false);
    completeOrder(paymentId, method);
  };

  const completeOrder = (paymentId: string, method: string) => {
    const activeAddress = selectedAddress || savedAddresses[0];
    const orderItems = cart.map(item => ({
      id: `item-${Date.now()}-${Math.random()}`,
      productId: item.productId,
      productTitle: item.product.title,
      productImage: item.product.images[0]?.url || '',
      color: item.selectedColor,
      size: item.selectedSize,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.unitPrice * item.quantity
    }));

    const created = createOrder({
      customerName: activeAddress.fullName,
      email: user ? user.email : 'john@example.com',
      phone: activeAddress.phone,
      shippingAddress: activeAddress,
      items: orderItems,
      totalAmount: finalTotal,
      discountAmount,
      taxAmount,
      shippingFee,
      status: 'PROCESSING',
      paymentStatus: method === 'COD' ? 'UNPAID' : 'PAID',
      paymentMethod: method as any,
      razorpayPaymentId: paymentId
    });

    clearCart();
    router.push(`/order-success/${created.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
        <Lock className="w-6 h-6 text-emerald-600" /> SECURE CHECKOUT
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form Panel (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Step 1: Shipping Address */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-base uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-5 h-5 text-indigo-600" /> 1. Select Shipping Address
              </h3>
              <button
                onClick={() => setIsAddingAddress(!isAddingAddress)}
                className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> {isAddingAddress ? 'Cancel' : 'Add New Address'}
              </button>
            </div>

            {/* Add New Address Form */}
            {isAddingAddress ? (
              <form onSubmit={handleAddNewAddressSubmit} className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700">Full Name</label>
                    <input
                      type="text"
                      required
                      value={newAddr.fullName}
                      onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700">Mobile Phone</label>
                    <input
                      type="text"
                      required
                      value={newAddr.phone}
                      onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">Street Address / House No.</label>
                  <input
                    type="text"
                    required
                    value={newAddr.addressLine}
                    onChange={(e) => setNewAddr({ ...newAddr, addressLine: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700">City</label>
                    <input
                      type="text"
                      required
                      value={newAddr.city}
                      onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700">State</label>
                    <input
                      type="text"
                      required
                      value={newAddr.state}
                      onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700">PIN Code</label>
                    <input
                      type="text"
                      required
                      value={newAddr.postalCode}
                      onChange={(e) => setNewAddr({ ...newAddr, postalCode: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-700"
                >
                  Save Address & Select
                </button>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedAddresses.map((addr) => (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedAddress(addr)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition relative ${
                      selectedAddress?.id === addr.id
                        ? 'border-indigo-600 bg-indigo-50/50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {selectedAddress?.id === addr.id && (
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 absolute top-3 right-3" />
                    )}
                    <p className="font-bold text-slate-900 text-sm">{addr.fullName}</p>
                    <p className="text-xs text-slate-600 mt-1">{addr.addressLine}</p>
                    <p className="text-xs text-slate-600">{addr.city}, {addr.state} - {addr.postalCode}</p>
                    <p className="text-xs text-slate-500 font-semibold mt-2">📱 {addr.phone}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Step 2: Payment Gateway Selection */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-indigo-600" /> 2. Payment Method
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                onClick={() => setPaymentMethod('RAZORPAY')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition flex items-center justify-between ${
                  paymentMethod === 'RAZORPAY'
                    ? 'border-blue-600 bg-blue-50/50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <p className="font-bold text-slate-900 text-sm">Razorpay Payment Gateway</p>
                  <p className="text-xs text-slate-500">UPI, Cards, NetBanking, GPay</p>
                </div>
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-black text-[10px] flex items-center justify-center">
                  RZP
                </div>
              </div>

              <div
                onClick={() => setPaymentMethod('COD')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition flex items-center justify-between ${
                  paymentMethod === 'COD'
                    ? 'border-emerald-600 bg-emerald-50/50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <p className="font-bold text-slate-900 text-sm">Cash on Delivery (COD)</p>
                  <p className="text-xs text-slate-500">Pay cash upon delivery</p>
                </div>
                <Truck className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </div>

        </div>

        {/* Right Summary Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-black text-slate-900 text-base uppercase tracking-wider border-b border-slate-100 pb-3">
              ITEMS ({cart.length})
            </h3>

            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-xs">
                  <div className="flex items-center space-x-3">
                    <img src={item.product.images[0]?.url} alt="" className="w-10 h-12 object-cover rounded-lg" />
                    <div>
                      <p className="font-bold text-slate-900 truncate max-w-[140px]">{item.product.title}</p>
                      <p className="text-slate-500">Size: {item.selectedSize} | Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900">₹{(item.unitPrice * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 pt-3 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600"><span>Subtotal:</span><span>₹{subtotal.toLocaleString()}</span></div>
              {discountAmount > 0 && <div className="flex justify-between text-emerald-600 font-bold"><span>Discount:</span><span>-₹{discountAmount.toLocaleString()}</span></div>}
              <div className="flex justify-between text-slate-600"><span>GST Tax (5%):</span><span>₹{taxAmount.toLocaleString()}</span></div>
              <div className="flex justify-between text-slate-600"><span>Delivery:</span><span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span></div>
              <div className="flex justify-between text-sm font-black text-slate-900 border-t border-slate-200 pt-2">
                <span>Grand Total:</span>
                <span className="text-indigo-600">₹{finalTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleProceedToPayment}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-2xl flex items-center justify-center space-x-2 shadow-xl shadow-indigo-600/20 transition"
            >
              <span>{paymentMethod === 'RAZORPAY' ? 'PAY WITH RAZORPAY' : 'CONFIRM COD ORDER'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Razorpay Popup Modal */}
      <RazorpayModal
        isOpen={isRazorpayModalOpen}
        amount={finalTotal}
        customerName={selectedAddress?.fullName || 'Customer'}
        email={user ? user.email : 'customer@example.com'}
        phone={selectedAddress?.phone || '+91 98765 43210'}
        onSuccess={handleRazorpaySuccess}
        onCancel={() => setIsRazorpayModalOpen(false)}
      />

    </div>
  );
}
