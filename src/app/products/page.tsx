'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, SlidersHorizontal, ArrowUpDown, RefreshCw, X, Check } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { getProducts, getCategories } from '@/lib/store';
import { Product, Category } from '@/lib/types';

export default function ProductsCatalogPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [priceMax, setPriceMax] = useState<number>(15000);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadData = () => {
      setProducts(getProducts());
      setCategories(getCategories());
    };

    loadData();

    // Listen for live updates when products are added or updated in Admin panel
    window.addEventListener('elevate_products_updated', loadData);
    return () => window.removeEventListener('elevate_products_updated', loadData);
  }, []);

  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || '');
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  // Compute filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory) {
        const cat = categories.find(c => c.slug === selectedCategory || c.id === selectedCategory);
        if (cat) {
          const catIdMatch = product.categoryId === cat.id;
          const catNameMatch = product.categoryName?.toLowerCase() === cat.name.toLowerCase();
          if (!catIdMatch && !catNameMatch) return false;
        }
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(q);
        const matchesDesc = product.description?.toLowerCase().includes(q);
        const matchesCat = product.categoryName?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesCat) return false;
      }

      // Price filter
      if (product.price > priceMax) return false;

      // Size filter
      if (selectedSize && (!product.sizes || !product.sizes.includes(selectedSize))) return false;

      // In stock filter
      if (onlyInStock && (!product.inStock || product.stockQuantity === 0)) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default featured
    });
  }, [products, categories, selectedCategory, searchQuery, priceMax, selectedSize, onlyInStock, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('');
    setSearchQuery('');
    setPriceMax(15000);
    setSelectedSize('');
    setOnlyInStock(false);
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Title & Sorting Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
            {selectedCategory ? `${selectedCategory.toUpperCase()} COLLECTION` : 'ALL APPAREL & SNEAKERS'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Showing {filteredProducts.length} of {products.length} total products
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="md:hidden px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>

          <div className="flex items-center space-x-2 bg-white border border-slate-300 px-3 py-2 rounded-xl text-xs font-medium">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-500">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-slate-900 font-bold focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured Bestsellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Layout Grid (Sidebar + Products) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Sidebar Filters Desktop */}
        <aside className={`md:block space-y-6 bg-white p-6 rounded-2xl border border-slate-200 h-fit ${isMobileFilterOpen ? 'block' : 'hidden'}`}>
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Filter className="w-4 h-4 text-indigo-600" /> Filter Apparel
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-rose-600 hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Search Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Keywords</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by title..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-600"
            />
          </div>

          {/* Category Filter List */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Categories</label>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedCategory('')}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition flex justify-between ${
                  selectedCategory === '' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>All Categories</span>
                <span>({products.length})</span>
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition flex justify-between ${
                    selectedCategory === cat.slug ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-slate-400">
                    ({products.filter(p => p.categoryId === cat.id || p.categoryName?.toLowerCase() === cat.name.toLowerCase()).length})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex justify-between text-xs font-bold text-slate-700 uppercase">
              <span>Max Price</span>
              <span className="text-indigo-600">₹{priceMax.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={500}
              max={15000}
              step={500}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          {/* Size Filter Buttons */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Filter By Size</label>
            <div className="grid grid-cols-3 gap-2">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(selectedSize === sz ? '' : sz)}
                  className={`py-1.5 rounded-lg text-xs font-bold border transition ${
                    selectedSize === sz
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Stock Availability Toggle */}
          <div className="pt-2 border-t border-slate-100">
            <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <span>In Stock Only</span>
            </label>
          </div>

        </aside>

        {/* Products Grid Section */}
        <main className="md:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <SlidersHorizontal className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg">No matching apparel found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try clearing your search query or resetting your size and category filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
