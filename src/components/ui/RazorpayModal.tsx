'use client';

import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, Lock, Smartphone, Building2, CheckCircle2, Loader2 } from 'lucide-react';

interface RazorpayModalProps {
  isOpen: boolean;
  amount: number;
  customerName: string;
  email: string;
  phone: string;
  onSuccess: (paymentId: string, method: string) => void;
  onCancel: () => void;
}

export default function RazorpayModal({
  isOpen,
  amount,
  customerName,
  email,
  phone,
  onSuccess,
  onCancel
}: RazorpayModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<'CARD' | 'UPI' | 'NETBANKING' | 'COD'>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePayNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const fakePaymentId = `pay_razor_${Math.random().toString(36).substring(2, 11).toUpperCase()}`;
      onSuccess(fakePaymentId, selectedMethod);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95">
        
        {/* Razorpay Brand Header */}
        <div className="bg-[#072654] text-white p-5 relative">
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 p-1 text-slate-300 hover:text-white rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center font-black text-white text-xs">
              RZP
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-wide uppercase">Razorpay Secure Checkout</h3>
              <p className="text-[11px] text-blue-200">ELEVATE APPAREL Merchant ID: rzp_live_elv9821</p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-blue-900/60 flex items-center justify-between">
            <span className="text-xs text-blue-200">Total Payable Amount</span>
            <span className="text-2xl font-black text-white">₹{amount.toLocaleString()}</span>
          </div>
        </div>

        {/* Customer Information Summary */}
        <div className="bg-slate-50 p-3 px-5 text-xs text-slate-600 border-b border-slate-200 flex justify-between">
          <span>{customerName} • {phone}</span>
          <span className="truncate max-w-[140px]">{email}</span>
        </div>

        {/* Payment Methods Selection */}
        <div className="p-5 space-y-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Payment Method</p>

          <div className="space-y-2">
            {/* UPI Option */}
            <button
              type="button"
              onClick={() => setSelectedMethod('UPI')}
              className={`w-full p-3 rounded-xl border flex items-center justify-between transition ${
                selectedMethod === 'UPI'
                  ? 'border-blue-600 bg-blue-50/60 text-blue-900 font-bold'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5 text-blue-600" />
                <div className="text-left">
                  <p className="text-sm">UPI / GPay / PhonePe / Paytm</p>
                  <p className="text-[11px] text-slate-500 font-normal">Instant 0% fee payment</p>
                </div>
              </div>
              {selectedMethod === 'UPI' && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
            </button>

            {/* Card Option */}
            <button
              type="button"
              onClick={() => setSelectedMethod('CARD')}
              className={`w-full p-3 rounded-xl border flex items-center justify-between transition ${
                selectedMethod === 'CARD'
                  ? 'border-blue-600 bg-blue-50/60 text-blue-900 font-bold'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <div className="text-left">
                  <p className="text-sm">Credit / Debit Card</p>
                  <p className="text-[11px] text-slate-500 font-normal">Visa, Mastercard, RuPay, Amex</p>
                </div>
              </div>
              {selectedMethod === 'CARD' && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
            </button>

            {/* NetBanking Option */}
            <button
              type="button"
              onClick={() => setSelectedMethod('NETBANKING')}
              className={`w-full p-3 rounded-xl border flex items-center justify-between transition ${
                selectedMethod === 'NETBANKING'
                  ? 'border-blue-600 bg-blue-50/60 text-blue-900 font-bold'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Building2 className="w-5 h-5 text-blue-600" />
                <div className="text-left">
                  <p className="text-sm">Net Banking</p>
                  <p className="text-[11px] text-slate-500 font-normal">HDFC, ICICI, SBI, Axis & 50+ Banks</p>
                </div>
              </div>
              {selectedMethod === 'NETBANKING' && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
            </button>

            {/* COD Option */}
            <button
              type="button"
              onClick={() => setSelectedMethod('COD')}
              className={`w-full p-3 rounded-xl border flex items-center justify-between transition ${
                selectedMethod === 'COD'
                  ? 'border-blue-600 bg-blue-50/60 text-blue-900 font-bold'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <div className="text-left">
                  <p className="text-sm">Cash on Delivery (COD)</p>
                  <p className="text-[11px] text-slate-500 font-normal">Pay cash upon delivery</p>
                </div>
              </div>
              {selectedMethod === 'COD' && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
            </button>
          </div>

          {/* Action Button */}
          <button
            onClick={handlePayNow}
            disabled={isProcessing}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-lg transition flex items-center justify-center space-x-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing Payment...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Pay ₹{amount.toLocaleString()} via Razorpay</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3 text-emerald-500" /> Guaranteed 256-Bit Bank Level Encryption
          </p>

        </div>

      </div>
    </div>
  );
}
