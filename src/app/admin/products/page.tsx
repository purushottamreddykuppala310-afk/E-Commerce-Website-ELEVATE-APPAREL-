'use client';

import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  X, 
  Check, 
  AlertCircle,
  Image as ImageIcon
} from 'lucide-react';
import { getProducts, addProduct, updateProduct, deleteProduct, getCategories } from '@/lib/store';
import { Product, Category } from '@/lib/types';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Add / Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 1999,
    originalPrice: 2999,
    discountPercent: 33,
    categoryId: 'cat-1',
    stockQuantity: 10,
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop',
    sizes: ['S', 'M', 'L', 'XL']
  });

  useEffect(() => {
    loadProducts();
    const cats = getCategories();
    setCategories(cats);
    if (cats.length > 0) {
      setFormData(prev => ({ ...prev, categoryId: cats[0].id }));
    }

    window.addEventListener('elevate_products_updated', loadProducts);
    return () => window.removeEventListener('elevate_products_updated', loadProducts);
  }, []);

  const loadProducts = () => {
    setProducts(getProducts());
  };

  const filteredProducts = products.filter(p => {
    if (selectedCategory && p.categoryId !== selectedCategory) return false;
    if (searchQuery.trim() && !p.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleOpenAddModal = () => {
    setEditingProductId(null);
    setFormData({
      title: '',
      description: 'Crafted from premium heavyweight cotton, providing soft structure, breathability, and superior comfort for daily wear.',
      price: 1999,
      originalPrice: 2999,
      discountPercent: 33,
      categoryId: categories[0]?.id || 'cat-1',
      stockQuantity: 10,
      imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop',
      sizes: ['S', 'M', 'L', 'XL']
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProductId(product.id);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice,
      discountPercent: product.discountPercent,
      categoryId: product.categoryId,
      stockQuantity: product.stockQuantity,
      imageUrl: product.images[0]?.url || '',
      sizes: product.sizes
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
      loadProducts();
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = categories.find(c => c.id === formData.categoryId);
    const catName = cat?.name || 'Apparel';

    if (editingProductId) {
      updateProduct(editingProductId, {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        originalPrice: formData.originalPrice,
        discountPercent: formData.discountPercent,
        categoryId: formData.categoryId,
        categoryName: catName,
        stockQuantity: formData.stockQuantity,
        inStock: formData.stockQuantity > 0,
        images: [{ id: `img-${Date.now()}`, url: formData.imageUrl, isPrimary: true }]
      });
    } else {
      const generatedSlug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `product-${Date.now()}`;
      
      addProduct({
        title: formData.title,
        slug: generatedSlug,
        description: formData.description,
        price: formData.price,
        originalPrice: formData.originalPrice,
        discountPercent: formData.discountPercent,
        categoryId: formData.categoryId,
        categoryName: catName,
        inStock: formData.stockQuantity > 0,
        stockQuantity: formData.stockQuantity,
        highlights: [
          '100% Organic Premium Cotton',
          'Relaxed Tailored Fit & Pre-Shrunk',
          'Reinforced Stitching & Durable Finish',
          'Machine Wash Cold'
        ],
        specifications: { Material: 'Combed Cotton', Fit: 'Relaxed Fit', Origin: 'Made in India' },
        deliveryInfo: 'Free Express Delivery in 2-3 Business Days.',
        returnPolicy: '7 Days Doorstep Returns & Exchanges.',
        featured: true,
        isNewArrival: true,
        images: [{ id: `img-${Date.now()}`, url: formData.imageUrl, isPrimary: true }],
        colors: [
          { id: 'col-1', name: 'Charcoal Black', hexCode: '#1e1e1e' },
          { id: 'col-2', name: 'Optic White', hexCode: '#ffffff' }
        ],
        sizes: formData.sizes,
        rating: 4.9,
        reviewCount: 1
      });
    }

    setIsModalOpen(false);
    loadProducts();
  };

  return (
    <div className="space-y-6">
      
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">PRODUCT MANAGEMENT</h1>
          <p className="text-xs text-slate-400">Add, edit, delete, and update product prices & stock quantities</p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add New Product
        </button>
      </div>

      {/* Filter & Search Controls */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by product title..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 font-bold">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-950 text-white border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none"
          >
            <option value="">All Categories</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase border-b border-slate-800">
              <tr>
                <th className="p-3">Apparel Item</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock Units</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredProducts.map((p) => (
                <tr key={p.id}>
                  <td className="p-3">
                    <div className="flex items-center space-x-3">
                      <img src={p.images[0]?.url} alt="" className="w-10 h-12 object-cover rounded-lg" />
                      <div>
                        <p className="font-bold text-white truncate max-w-xs">{p.title}</p>
                        <p className="text-[10px] text-slate-400">{p.sizes.join(', ')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 font-semibold">{p.categoryName || 'Apparel'}</td>
                  <td className="p-3 font-bold text-white">₹{p.price.toLocaleString()}</td>
                  <td className="p-3 font-bold">
                    <span className={p.stockQuantity <= 5 ? 'text-rose-400' : 'text-slate-200'}>
                      {p.stockQuantity} units
                    </span>
                  </td>
                  <td className="p-3">
                    {p.inStock && p.stockQuantity > 0 ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        In Stock
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                        OUT OF STOCK
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEditModal(p)}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg transition"
                      title="Edit Product"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-rose-400 rounded-lg transition"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 max-w-xl w-full rounded-2xl shadow-2xl overflow-hidden text-white">
            <div className="bg-slate-950 p-4 px-6 flex items-center justify-between border-b border-slate-800">
              <h3 className="font-bold text-sm uppercase tracking-wider text-amber-400">
                {editingProductId ? 'Edit Product Details' : 'Add New Apparel Product'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-slate-300">Product Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Heavyweight Organic Oversized Hoodie"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 mt-1 font-semibold"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold uppercase text-slate-300">Category</label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none mt-1 font-semibold"
                  >
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-slate-300">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none mt-1 font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-slate-300">Stock Quantity</label>
                  <input
                    type="number"
                    required
                    value={formData.stockQuantity}
                    onChange={(e) => setFormData({ ...formData, stockQuantity: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none mt-1 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-300">Image URL</label>
                <input
                  type="text"
                  required
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-300">Description</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none mt-1"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-lg hover:bg-amber-300 transition uppercase tracking-wider"
                >
                  Save & Publish Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
