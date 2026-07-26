'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  ShieldCheck, 
  LogOut, 
  LayoutDashboard,
  Sparkles
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { getCategories, getProducts } from '@/lib/store';
import { Category, Product } from '@/lib/types';

export default function Navbar() {
  const router = useRouter();
  const { itemCount, wishlist, setIsCartDrawerOpen } = useCart();
  const { user, admin, logout, adminLogout, isAuthenticated, isAdminAuthenticated } = useAuth();

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  useEffect(() => {
    const loadData = () => {
      setCategories(getCategories());
      setProducts(getProducts());
    };

    loadData();
    window.addEventListener('elevate_products_updated', loadData);
    return () => window.removeEventListener('elevate_products_updated', loadData);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const matched = products.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.categoryName?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      ).slice(0, 5);
      setSearchResults(matched);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, products]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      {/* Top Banner Bar */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 text-center flex items-center justify-between border-b border-slate-800">
        <div className="hidden md:flex items-center space-x-4">
          <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Authentic Quality</span>
          <span>•</span>
          <span>Free Express Delivery on Orders Over ₹1500</span>
        </div>
        <div className="mx-auto md:mx-0 font-medium tracking-wide">
          🔥 MID-SEASON SALE: GET EXTRA 20% OFF WITH CODE <span className="font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">ELEVATE20</span>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/static/faq" className="hover:text-slate-300 transition">Help & FAQs</Link>
          {isAdminAuthenticated ? (
            <Link href="/admin" className="text-amber-400 font-semibold hover:underline flex items-center gap-1">
              <LayoutDashboard className="w-3.5 h-3.5" /> Admin Panel
            </Link>
          ) : (
            <Link href="/admin/login" className="hover:text-slate-300 transition">Admin Login</Link>
          )}
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-theme-header text-white shadow-lg transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Mobile Hamburger */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-slate-300 hover:text-white focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-amber-400 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black tracking-wider uppercase bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                    ELEVATE
                  </span>
                  <span className="text-[10px] tracking-[0.25em] text-slate-400 font-semibold uppercase -mt-1">
                    APPAREL
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold tracking-wide uppercase">
              <Link href="/" className="hover:text-amber-400 transition-colors">
                Home
              </Link>
              <Link href="/products" className="hover:text-amber-400 transition-colors">
                All Collections
              </Link>

              {/* Category Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-1 hover:text-amber-400 transition-colors py-6">
                  <span>Categories</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                <div className="absolute top-full left-0 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/products?category=${cat.slug}`}
                      className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition"
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full">
                        {products.filter(p => p.categoryId === cat.id || p.categoryName?.toLowerCase() === cat.name.toLowerCase()).length}+
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/products?featured=true" className="hover:text-amber-400 transition-colors flex items-center gap-1 text-amber-400 font-bold">
                <Sparkles className="w-3.5 h-3.5" /> Trending
              </Link>
              <Link href="/static/about" className="hover:text-amber-400 transition-colors">
                About Us
              </Link>
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center space-x-5">
              
              {/* Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-slate-300 hover:text-amber-400 transition rounded-full hover:bg-slate-800/60"
                title="Search products"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-2 text-slate-300 hover:text-amber-400 transition rounded-full hover:bg-slate-800/60"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-md animate-pulse">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="relative p-2 text-slate-300 hover:text-amber-400 transition rounded-full hover:bg-slate-800/60 flex items-center gap-2"
                title="Cart"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1.5 w-5 h-5 bg-indigo-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-md">
                      {itemCount}
                    </span>
                  )}
                </div>
              </button>

              {/* Account Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-full border border-slate-700 hover:border-slate-500 transition focus:outline-none"
                >
                  <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white uppercase">
                    {user ? user.name[0] : <User className="w-4 h-4" />}
                  </div>
                </button>

                {isUserMenuOpen && (
                  <div 
                    className="absolute right-0 mt-3 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50 text-sm"
                    onMouseLeave={() => setIsUserMenuOpen(false)}
                  >
                    {user ? (
                      <>
                        <div className="px-4 py-3 border-b border-slate-800">
                          <p className="font-semibold text-white truncate">{user.name}</p>
                          <p className="text-xs text-slate-400 truncate">{user.email}</p>
                        </div>
                        <Link
                          href="/account"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                          My Orders & Account
                        </Link>
                        <Link
                          href="/wishlist"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                          Saved Wishlist
                        </Link>
                        {isAdminAuthenticated && (
                          <Link
                            href="/admin"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="block px-4 py-2 text-amber-400 hover:bg-slate-800 font-semibold"
                          >
                            Admin Dashboard
                          </Link>
                        )}
                        <button
                          onClick={() => {
                            logout();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-rose-400 hover:bg-slate-800 flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" /> Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="px-4 py-2 text-xs text-slate-400 font-semibold uppercase tracking-wider">
                          Welcome
                        </div>
                        <Link
                          href="/auth/login"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-4 py-2.5 text-slate-200 hover:bg-slate-800 hover:text-white font-medium"
                        >
                          Customer Login / Signup
                        </Link>
                        <div className="border-t border-slate-800 my-1"></div>
                        <Link
                          href="/admin/login"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-4 py-2.5 text-amber-400 hover:bg-slate-800 font-medium"
                        >
                          Admin Portal Login
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 pt-3 pb-6 space-y-3">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-slate-200 hover:text-amber-400"
            >
              Home
            </Link>
            <Link
              href="/products"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-slate-200 hover:text-amber-400"
            >
              All Products
            </Link>
            
            <div className="py-2 border-y border-slate-800">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Categories</p>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/products?category=${cat.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm text-slate-300 hover:text-white py-1"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/account"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-slate-200 hover:text-amber-400"
            >
              My Orders & Profile
            </Link>
            <Link
              href="/admin/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-amber-400"
            >
              Admin Dashboard
            </Link>
          </div>
        )}
      </header>

      {/* Instant Search Overlay Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-16 px-4">
          <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center px-4 py-4 border-b border-slate-800">
              <Search className="w-6 h-6 text-slate-400 mr-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search shirts, hoodies, shoes, jeans, Zara blazers..."
                className="w-full bg-transparent text-white text-lg focus:outline-none placeholder-slate-500"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </form>

            {searchResults.length > 0 ? (
              <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Product Results</p>
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="flex items-center space-x-4 p-2 rounded-xl hover:bg-slate-800 transition"
                  >
                    <img
                      src={product.images[0]?.url || 'https://via.placeholder.com/100'}
                      alt={product.title}
                      className="w-12 h-14 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white truncate text-sm">{product.title}</p>
                      <p className="text-xs text-slate-400">{product.categoryName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-amber-400 text-sm">₹{product.price.toLocaleString()}</p>
                      {product.originalPrice > product.price && (
                        <p className="text-xs text-slate-500 line-through">₹{product.originalPrice.toLocaleString()}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : searchQuery.trim().length > 1 ? (
              <div className="p-8 text-center text-slate-400 text-sm">
                No matching apparel found for &quot;{searchQuery}&quot;.
              </div>
            ) : (
              <div className="p-6">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {['Oversized Hoodie', 'Linen Shirt', 'Nike Air', 'Zara Blazer', 'Selvedge Jeans', 'Acid Wash Tee'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-full transition"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
