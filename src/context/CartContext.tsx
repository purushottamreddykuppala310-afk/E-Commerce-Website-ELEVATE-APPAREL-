'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, Address } from '@/lib/types';

interface Coupon {
  code: string;
  discountPercent: number;
  maxDiscount?: number;
  description: string;
}

const AVAILABLE_COUPONS: Coupon[] = [
  { code: 'WELCOME10', discountPercent: 10, description: '10% OFF on your first purchase' },
  { code: 'ELEVATE20', discountPercent: 20, maxDiscount: 1000, description: '20% OFF on orders above ₹2000' },
  { code: 'FREESHIP', discountPercent: 0, description: 'Free Shipping applied' }
];

interface CartContextType {
  cart: CartItem[];
  wishlist: Product[];
  isCartDrawerOpen: boolean;
  appliedCoupon: Coupon | null;
  savedAddresses: Address[];
  selectedAddress: Address | null;
  setIsCartDrawerOpen: (open: boolean) => void;
  addToCart: (product: Product, color: string, size: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  addAddress: (address: Omit<Address, 'id'>) => Address;
  setSelectedAddress: (address: Address) => void;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  taxAmount: number;
  finalTotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([
    {
      id: 'addr-default',
      fullName: 'John Doe',
      phone: '+91 98765 43210',
      addressLine: 'Flat 402, Skyline Heights, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400050',
      country: 'India',
      isDefault: true
    }
  ]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(savedAddresses[0]);

  // Load cart and wishlist from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('elevate_cart');
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (e) {}
    }

    const savedWishlist = localStorage.getItem('elevate_wishlist');
    if (savedWishlist) {
      try { setWishlist(JSON.parse(savedWishlist)); } catch (e) {}
    }

    const savedAddr = localStorage.getItem('elevate_addresses');
    if (savedAddr) {
      try {
        const parsed = JSON.parse(savedAddr);
        setSavedAddresses(parsed);
        if (parsed.length > 0) setSelectedAddress(parsed[0]);
      } catch (e) {}
    }
  }, []);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('elevate_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('elevate_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('elevate_addresses', JSON.stringify(savedAddresses));
  }, [savedAddresses]);

  const addToCart = (product: Product, color: string, size: string, quantity = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.productId === product.id && item.selectedColor === color && item.selectedSize === size
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          productId: product.id,
          product,
          selectedColor: color,
          selectedSize: size,
          quantity,
          unitPrice: product.price
        };
        return [...prev, newItem];
      }
    });
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(p => p.id === productId);
  };

  const applyCoupon = (code: string) => {
    const coupon = AVAILABLE_COUPONS.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!coupon) {
      return { success: false, message: 'Invalid coupon code. Try WELCOME10 or ELEVATE20.' };
    }
    setAppliedCoupon(coupon);
    return { success: true, message: `Coupon '${coupon.code}' applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const addAddress = (addressData: Omit<Address, 'id'>): Address => {
    const newAddr: Address = {
      ...addressData,
      id: `addr-${Date.now()}`
    };
    const updated = [newAddr, ...savedAddresses];
    setSavedAddresses(updated);
    setSelectedAddress(newAddr);
    return newAddr;
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon && appliedCoupon.discountPercent > 0) {
    discountAmount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    if (appliedCoupon.maxDiscount && discountAmount > appliedCoupon.maxDiscount) {
      discountAmount = appliedCoupon.maxDiscount;
    }
  }

  const shippingFee = subtotal > 1500 || appliedCoupon?.code === 'FREESHIP' || cart.length === 0 ? 0 : 99;
  const taxAmount = Math.round((subtotal - discountAmount) * 0.05); // 5% GST
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee + taxAmount);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        isCartDrawerOpen,
        appliedCoupon,
        savedAddresses,
        selectedAddress,
        setIsCartDrawerOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        applyCoupon,
        removeCoupon,
        addAddress,
        setSelectedAddress,
        subtotal,
        discountAmount,
        shippingFee,
        taxAmount,
        finalTotal,
        itemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
