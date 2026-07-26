'use client';

import React from 'react';
import { Order } from '@/lib/types';
import { X, Printer, Download, Sparkles, CheckCircle2 } from 'lucide-react';

interface InvoiceModalProps {
  isOpen: boolean;
  order: Order | null;
  onClose: () => void;
}

export default function InvoiceModal({ isOpen, order, onClose }: InvoiceModalProps) {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white max-w-3xl w-full rounded-2xl shadow-2xl overflow-hidden my-8 border border-slate-200">
        
        {/* Action Header */}
        <div className="bg-slate-900 text-white p-4 px-6 flex items-center justify-between no-print">
          <h3 className="font-bold text-sm uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" /> Tax Invoice #{order.orderNumber}
          </h3>
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 transition"
            >
              <Printer className="w-4 h-4" /> Print / Save as PDF
            </button>
            <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Printable Tax Invoice Container */}
        <div id="printable-invoice" className="p-8 text-slate-900 bg-white space-y-6">
          
          {/* Company Branding & Invoice Header */}
          <div className="flex justify-between items-start border-b border-slate-200 pb-6">
            <div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-sm">
                  E
                </div>
                <span className="text-xl font-black tracking-wider uppercase">ELEVATE APPAREL</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">Elevate Retail Logistics Pvt Ltd</p>
              <p className="text-xs text-slate-500">GSTIN: 27AAAAA0000A1Z5 • PAN: AAAAA0000A</p>
              <p className="text-xs text-slate-500">Corporate Tower B, BKC, Mumbai - 400051</p>
            </div>

            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 font-extrabold text-xs rounded-md uppercase tracking-wider mb-2">
                ORIGINAL TAX INVOICE
              </span>
              <p className="text-sm font-bold text-slate-900">Invoice No: INV-{order.orderNumber}</p>
              <p className="text-xs text-slate-600">Date: {new Date(order.createdAt).toLocaleDateString('en-IN', { dateStyle: 'long' })}</p>
              <p className="text-xs text-slate-600">Payment Status: <span className="font-bold text-emerald-600">{order.paymentStatus}</span></p>
              <p className="text-xs text-slate-600">Payment Method: {order.paymentMethod}</p>
            </div>
          </div>

          {/* Billing & Shipping Addresses */}
          <div className="grid grid-cols-2 gap-6 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <h5 className="font-bold text-slate-900 uppercase tracking-wider mb-1">Customer / Billed To</h5>
              <p className="font-semibold text-slate-900">{order.customerName}</p>
              <p>{order.phone}</p>
              <p>{order.email}</p>
            </div>
            <div>
              <h5 className="font-bold text-slate-900 uppercase tracking-wider mb-1">Shipping Address</h5>
              <p className="font-semibold text-slate-900">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.addressLine}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}</p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>

          {/* Order Items Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-900 font-bold uppercase border-b border-slate-200">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Item Description</th>
                  <th className="p-3">Variant</th>
                  <th className="p-3 text-center">HSN</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Unit Price</th>
                  <th className="p-3 text-right">Total Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {order.items.map((item, idx) => (
                  <tr key={item.id}>
                    <td className="p-3 font-semibold">{idx + 1}</td>
                    <td className="p-3 font-medium text-slate-900">{item.productTitle}</td>
                    <td className="p-3">{item.size} / {item.color}</td>
                    <td className="p-3 text-center text-slate-500">610910</td>
                    <td className="p-3 text-center font-bold">{item.quantity}</td>
                    <td className="p-3 text-right">₹{item.unitPrice.toLocaleString()}</td>
                    <td className="p-3 text-right font-bold text-slate-900">₹{item.totalPrice.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Financial Totals Calculation */}
          <div className="flex justify-end pt-2">
            <div className="w-64 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-semibold text-slate-900">₹{(order.totalAmount + order.discountAmount - order.taxAmount - order.shippingFee).toLocaleString()}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount Applied:</span>
                  <span>-₹{order.discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>CGST (2.5%) + SGST (2.5%):</span>
                <span>₹{order.taxAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping & Freight:</span>
                <span>{order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 border-t border-slate-300 pt-2">
                <span>Grand Total Paid:</span>
                <span className="text-indigo-600">₹{order.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Authorized Signature & Terms */}
          <div className="pt-8 border-t border-slate-200 flex justify-between items-end text-xs text-slate-500">
            <div>
              <p className="font-bold text-slate-700">Terms & Conditions:</p>
              <p>1. Goods once sold can be returned within 7 days under standard return policy.</p>
              <p>2. This is a computer-generated tax invoice and requires no physical signature.</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-10 border-b border-slate-400 mb-1 flex items-center justify-center font-serif text-slate-400 italic">
                ELEVATE LOGISTICS
              </div>
              <p className="font-semibold text-slate-800">Authorized Signatory</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
