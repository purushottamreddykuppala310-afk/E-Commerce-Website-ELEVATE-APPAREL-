'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Ruler, 
  ChevronRight, 
  Check, 
  MapPin, 
  AlertCircle,
  Sparkles,
  Share2
} from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import SizeGuideModal from '@/components/ui/SizeGuideModal';
import { getProductById, getProducts } from '@/lib/store';
import { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  // Modals & Pincode state
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [pincode, setPincode] = useState('');
  const [pincodeMessage, setPincodeMessage] = useState<string | null>(null);

  // Accordion Toggles
  const [activeTab, setActiveTab] = useState<'highlights' | 'specs' | 'delivery'>('highlights');

  useEffect(() => {
    if (productId) {
      const found = getProductById(productId);
      if (found) {
        setProduct(found);
        if (found.colors && found.colors.length > 0) setSelectedColor(found.colors[0].name);
        if (found.sizes && found.sizes.length > 0) setSelectedSize(found.sizes[0]);
        
        const allProds = getProducts();
        const related = allProds.filter(p => p.id !== found.id && p.categoryId === found.categoryId).slice(0, 4);
        setRelatedProducts(related);
      }
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Product Not Found</h2>
        <p className="text-slate-500 text-sm">The apparel item you requested does not exist.</p>
        <button onClick={() => router.push('/products')} className="px-6 py-2.5 bg-indigo-600 text-white font-bold text-sm rounded-xl">
          Back to Shop
        </button>
      </div>
    );
  }

  const inWish = isInWishlist(product.id);
  const isOutOfStock = !product.inStock || product.stockQuantity === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedColor || 'Standard', selectedSize || 'M', quantity);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedColor || 'Standard', selectedSize || 'M', quantity);
    router.push('/checkout');
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeMessage(`Express Delivery Available to ${pincode}! Delivered in 2 business days.`);
    } else {
      setPincodeMessage('Please enter a valid 6-digit Indian PIN Code.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
        <button onClick={() => router.push('/')} className="hover:text-slate-900">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => router.push('/products')} className="hover:text-slate-900">Products</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-bold truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Gallery Thumbnails & Main Image Zoom (7 cols) */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          
          {/* Thumbnails list */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-[520px]">
            {product.images.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setSelectedImageIndex(idx)}
                className={`w-20 h-24 rounded-xl overflow-hidden border-2 flex-shrink-0 transition ${
                  selectedImageIndex === idx ? 'border-indigo-600 ring-2 ring-indigo-600/30' : 'border-slate-200 hover:border-slate-400'
                }`}
              >
                <img src={img.url} alt={product.title} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Main Image View */}
          <div className="flex-1 relative aspect-[4/5] bg-slate-100 rounded-3xl overflow-hidden shadow-lg group">
            <img
              src={product.images[selectedImageIndex]?.url || product.images[0]?.url}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 cursor-zoom-in"
            />
            {product.discountPercent > 0 && (
              <div className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                {product.discountPercent}% OFF
              </div>
            )}
          </div>

        </div>

        {/* Product Information & Purchase Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Title & Category Header */}
          <div className="space-y-2 border-b border-slate-200 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                {product.categoryName || 'Apparel'}
              </span>
              <button
                onClick={() => toggleWishlist(product)}
                className="flex items-center space-x-1 text-xs font-semibold text-slate-600 hover:text-rose-500 transition"
              >
                <Heart className={`w-4 h-4 ${inWish ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{inWish ? 'Saved to Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
              {product.title}
            </h1>

            {/* Rating Stars & Stock Badge */}
            <div className="flex items-center space-x-4 pt-1">
              <div className="flex items-center space-x-1 text-amber-500 text-xs font-bold bg-amber-50 px-2 py-1 rounded border border-amber-200">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-slate-400">({product.reviewCount} Reviews)</span>
              </div>

              {/* Stock Status Badge */}
              {isOutOfStock ? (
                <span className="text-xs font-extrabold text-rose-700 bg-rose-100 px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Out of Stock
                </span>
              ) : product.stockQuantity <= 5 ? (
                <span className="text-xs font-extrabold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full animate-pulse">
                  🔥 Hurry! Only {product.stockQuantity} Left in Stock
                </span>
              ) : (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> In Stock & Ready to Ship
                </span>
              )}
            </div>
          </div>

          {/* Pricing Box */}
          <div className="flex items-baseline space-x-3">
            <span className="text-3xl font-black text-slate-900">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-lg text-slate-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
            <span className="text-xs text-slate-500">(Inclusive of all GST taxes)</span>
          </div>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Select Color: <span className="text-indigo-600">{selectedColor}</span>
              </label>
              <div className="flex items-center space-x-3">
                {product.colors.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c.name)}
                    style={{ backgroundColor: c.hexCode }}
                    className={`w-8 h-8 rounded-full border-2 transition transform active:scale-95 ${
                      selectedColor === c.name ? 'ring-2 ring-indigo-600 ring-offset-2 border-slate-900' : 'border-slate-300'
                    }`}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Selector + Size Guide Modal */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Select Size Tag
                </label>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                >
                  <Ruler className="w-3.5 h-3.5" /> Size Guide
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2.5 rounded-xl font-bold text-xs border transition ${
                      selectedSize === sz
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                        : 'border-slate-300 text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector & Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex space-x-3">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex-1 py-4 px-6 font-bold text-sm rounded-2xl flex items-center justify-center space-x-2 transition shadow-xl ${
                  isOutOfStock
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                <span>{isOutOfStock ? 'OUT OF STOCK' : 'ADD TO BAG'}</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className={`px-8 py-4 font-black text-sm rounded-2xl transition shadow-xl ${
                  isOutOfStock
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                }`}
              >
                BUY NOW
              </button>
            </div>
          </div>

          {/* Pincode Estimator */}
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-indigo-600" /> Check Delivery Estimate
            </label>
            <form onSubmit={handlePincodeCheck} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter 6-digit PIN Code"
                className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-600 font-semibold"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition"
              >
                Check
              </button>
            </form>
            {pincodeMessage && (
              <p className="text-xs text-emerald-700 font-semibold mt-1">{pincodeMessage}</p>
            )}
          </div>

          {/* Key Highlights Accordion */}
          <div className="border-t border-slate-200 pt-4 space-y-4">
            <div className="flex border-b border-slate-200">
              <button
                onClick={() => setActiveTab('highlights')}
                className={`pb-2 px-4 text-xs font-bold uppercase transition ${
                  activeTab === 'highlights' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-slate-500'
                }`}
              >
                Highlights
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-2 px-4 text-xs font-bold uppercase transition ${
                  activeTab === 'specs' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-slate-500'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('delivery')}
                className={`pb-2 px-4 text-xs font-bold uppercase transition ${
                  activeTab === 'delivery' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-slate-500'
                }`}
              >
                Policy
              </button>
            </div>

            {activeTab === 'highlights' && (
              <ul className="space-y-2 text-xs text-slate-600">
                {product.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === 'specs' && (
              <div className="divide-y divide-slate-100 text-xs">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="py-1.5 flex justify-between">
                    <span className="font-semibold text-slate-500">{key}:</span>
                    <span className="text-slate-900 font-bold">{val}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'delivery' && (
              <div className="text-xs text-slate-600 space-y-2">
                <p>• <strong>Free Delivery:</strong> Applied on all orders over ₹1500.</p>
                <p>• <strong>7-Day Returns:</strong> Doorstep pickup with instant bank refund upon quality check.</p>
                <p>• <strong>Original Packaging:</strong> Shipped in tamper-proof branded box.</p>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-slate-200">
          <h3 className="text-xl font-black text-slate-900 uppercase tracking-wide mb-6">
            Complete The Look / Related Apparel
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}

      {/* Size Guide Modal */}
      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />

    </div>
  );
}
