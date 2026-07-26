import { Category, Product, ThemeSettings, Order, User, Review } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Men',
    slug: 'men',
    description: 'Elevated menswear, streetwear, sharp tailoring and essentials.',
    image: 'https://images.unsplash.com/photo-1490578474895-699bc4e2cf59?q=80&w=800&auto=format&fit=crop',
    itemCount: 42
  },
  {
    id: 'cat-2',
    name: 'Women',
    slug: 'women',
    description: 'Chic dresses, modern tailoring, luxury streetwear and tops.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    itemCount: 56
  },
  {
    id: 'cat-3',
    name: 'Kids',
    slug: 'kids',
    description: 'Vibrant, durable, and comfortable clothing for boys and girls.',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=800&auto=format&fit=crop',
    itemCount: 24
  },
  {
    id: 'cat-4',
    name: 'Shirts',
    slug: 'shirts',
    description: 'Premium linen, crisp cotton oxford, and relaxed Cuban collar shirts.',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop',
    itemCount: 30
  },
  {
    id: 'cat-5',
    name: 'T-Shirts',
    slug: 't-shirts',
    description: 'Heavyweight organic cotton tees, oversized graphic drop-shoulders.',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
    itemCount: 38
  },
  {
    id: 'cat-6',
    name: 'Jeans',
    slug: 'jeans',
    description: 'Selvedge denim, relaxed straight cuts, and distressed urban jeans.',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop',
    itemCount: 18
  },
  {
    id: 'cat-7',
    name: 'Shoes',
    slug: 'shoes',
    description: 'Minimalist leather sneakers, retro runners, and formal boots.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
    itemCount: 22
  },
  {
    id: 'cat-8',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Leather belts, caps, sunglasses, backpacks, and minimalist jewelry.',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop',
    itemCount: 29
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Aura Heavyweight Oversized Cotton Hoodie',
    slug: 'aura-heavyweight-oversized-cotton-hoodie',
    description: 'Crafted from 450 GSM French Terry cotton, the Aura Hoodie delivers unmatched warmth, structure, and drape. Designed with drop shoulders, double-stitched seams, and a fleece-lined kangaroo pocket.',
    price: 2499,
    originalPrice: 3999,
    discountPercent: 37,
    categoryId: 'cat-1',
    categoryName: 'Men',
    inStock: true,
    stockQuantity: 18,
    highlights: [
      '450 GSM 100% Organic French Terry Cotton',
      'Relaxed Oversized Fit with Drop Shoulder Silhouette',
      'Pre-shrunk Fabric & Anti-Pilling Technology',
      'Deep Double-Layered Hood with Custom Metal Aglets'
    ],
    specifications: {
      'Material': '100% French Terry Cotton',
      'Fit': 'Oversized / Relaxed',
      'Pattern': 'Solid',
      'Wash Care': 'Machine wash cold, lay flat to dry',
      'Country of Origin': 'India'
    },
    deliveryInfo: 'Free express delivery within 2-4 business days. COD available.',
    returnPolicy: '7 Days Hassle-Free Returns & Instant Refunds.',
    featured: true,
    isNewArrival: true,
    images: [
      { id: 'img-1-1', url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop', isPrimary: true },
      { id: 'img-1-2', url: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=800&auto=format&fit=crop' },
      { id: 'img-1-3', url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop' }
    ],
    colors: [
      { id: 'col-1', name: 'Charcoal Black', hexCode: '#1e1e1e' },
      { id: 'col-2', name: 'Oatmeal Beige', hexCode: '#e3d7c5' },
      { id: 'col-3', name: 'Sage Green', hexCode: '#5c6b5e' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.8,
    reviewCount: 142,
    createdAt: '2026-07-01T10:00:00Z'
  },
  {
    id: 'prod-2',
    title: 'Monochrome Italian Linen Relaxed Resort Shirt',
    slug: 'monochrome-italian-linen-relaxed-resort-shirt',
    description: 'Elevate your summer wardrobe with 100% pure European flax linen. Ultra-breathable, moisture-wicking, with a Cuban camp collar and subtle mother-of-pearl buttons.',
    price: 1999,
    originalPrice: 2999,
    discountPercent: 33,
    categoryId: 'cat-4',
    categoryName: 'Shirts',
    inStock: true,
    stockQuantity: 4, // Low stock demo!
    highlights: [
      '100% Pure European Flax Linen',
      'Breathable & Naturally Temperature Regulating',
      'Classic Cuban Camp Collar & Curved Hem',
      'Genuine Mother of Pearl Buttons'
    ],
    specifications: {
      'Material': '100% Linen',
      'Sleeve': 'Short Sleeves',
      'Collar': 'Camp / Resort Collar',
      'Transparency': 'Opaque',
      'Origin': 'Made in India'
    },
    deliveryInfo: 'Ships within 24 hours. Standard 3-day delivery.',
    returnPolicy: '7 Days Replacement / Full Refund Guaranteed.',
    featured: true,
    isNewArrival: true,
    images: [
      { id: 'img-2-1', url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop', isPrimary: true },
      { id: 'img-2-2', url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop' }
    ],
    colors: [
      { id: 'col-4', name: 'Optic White', hexCode: '#ffffff' },
      { id: 'col-5', name: 'Deep Navy', hexCode: '#0b192c' }
    ],
    sizes: ['M', 'L', 'XL'],
    rating: 4.7,
    reviewCount: 98,
    createdAt: '2026-07-05T12:00:00Z'
  },
  {
    id: 'prod-3',
    title: 'Nike VaporMax Air Retro Street Runners',
    slug: 'nike-vapormax-air-retro-street-runners',
    description: 'Engineered for high performance and striking streetwear appeal. Featuring revolutionised full-length Air cushioning, breathable Flyknit upper, and high-traction rubber outsole.',
    price: 8999,
    originalPrice: 12999,
    discountPercent: 30,
    categoryId: 'cat-7',
    categoryName: 'Shoes',
    inStock: true,
    stockQuantity: 12,
    highlights: [
      'Seamless Stretch Flyknit Upper',
      'Full-Length Revolutionary Air Cushioning Unit',
      'Lugged Outsole with High Rubber Friction',
      'Ultra Lightweight & Responsive Energy Return'
    ],
    specifications: {
      'Upper': 'Flyknit Textile & TPU Overlays',
      'Sole': 'Translucent Air Cushioning Outer Rubber',
      'Closure': 'Lace-Up',
      'Weight': '290g per shoe',
      'Warranty': '6 Months Manufacturer Warranty'
    },
    deliveryInfo: 'Free Express Shipping in Premium Double Box.',
    returnPolicy: '7 Days Return Policy with intact tag & box.',
    featured: true,
    isNewArrival: false,
    images: [
      { id: 'img-3-1', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop', isPrimary: true },
      { id: 'img-3-2', url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop' }
    ],
    colors: [
      { id: 'col-6', name: 'Crimson Volt', hexCode: '#e63946' },
      { id: 'col-7', name: 'Triple Black', hexCode: '#111111' }
    ],
    sizes: ['7', '8', '9', '10', '11'],
    rating: 4.9,
    reviewCount: 310,
    createdAt: '2026-06-15T09:30:00Z'
  },
  {
    id: 'prod-4',
    title: 'Zara Sculpted Tailored Double-Breasted Blazer',
    slug: 'zara-sculpted-tailored-double-breasted-blazer',
    description: 'Structured silhouette designed with padded shoulders, peak lapels, and custom tortoise buttons. Perfect for powerful boardroom looks or casual denim pairings.',
    price: 4999,
    originalPrice: 7999,
    discountPercent: 37,
    categoryId: 'cat-2',
    categoryName: 'Women',
    inStock: true,
    stockQuantity: 9,
    highlights: [
      'Premium Wool Blend Structural Fabric',
      'Double Breasted Front with Horn Buttons',
      'Satin Lined Interior with Pocket Flaps',
      'Peak Lapel Collar & Sharp Tailoring'
    ],
    specifications: {
      'Fabric': '65% Polyester, 30% Viscose, 5% Elastane',
      'Lining': '100% Cupro Satin',
      'Fit': 'Structured Slim Fit',
      'Care': 'Dry Clean Only'
    },
    deliveryInfo: 'Express delivery available.',
    returnPolicy: '7 Days Return & Exchange.',
    featured: true,
    isNewArrival: true,
    images: [
      { id: 'img-4-1', url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop', isPrimary: true },
      { id: 'img-4-2', url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop' }
    ],
    colors: [
      { id: 'col-8', name: 'Midnight Emerald', hexCode: '#064e3b' },
      { id: 'col-9', name: 'Camel Tan', hexCode: '#c89d7c' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.8,
    reviewCount: 76,
    createdAt: '2026-07-10T14:20:00Z'
  },
  {
    id: 'prod-5',
    title: 'Vintage Japanese Selvedge Straight Jeans',
    slug: 'vintage-japanese-selvedge-straight-jeans',
    description: 'Crafted on traditional shuttle looms in Kurashiki, Japan. 14oz raw indigo denim with red selvedge ID line, copper rivets, and a classic mid-rise straight leg.',
    price: 3499,
    originalPrice: 4999,
    discountPercent: 30,
    categoryId: 'cat-6',
    categoryName: 'Jeans',
    inStock: false, // Out of Stock Demo!
    stockQuantity: 0,
    highlights: [
      '14 oz Kurashiki Selvedge Japanese Denim',
      'Red Selvedge ID Line on Cuff Turnover',
      'Hand-punched Solid Copper Rivets',
      'Genuine Leather Waist Patch'
    ],
    specifications: {
      'Denim Weight': '14 oz Heavyweight',
      'Rise': 'Mid Rise',
      'Leg Opening': 'Straight Cut',
      'Shrinkage': 'Sanforized (Will not shrink)'
    },
    deliveryInfo: 'Out of stock currently. Join waitlist for restock alert.',
    returnPolicy: '7 Days Return Policy.',
    featured: false,
    isNewArrival: false,
    images: [
      { id: 'img-5-1', url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop', isPrimary: true },
      { id: 'img-5-2', url: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=800&auto=format&fit=crop' }
    ],
    colors: [
      { id: 'col-10', name: 'Raw Indigo Blue', hexCode: '#1d2a44' }
    ],
    sizes: ['28', '30', '32', '34', '36'],
    rating: 4.9,
    reviewCount: 204,
    createdAt: '2026-06-01T08:00:00Z'
  },
  {
    id: 'prod-6',
    title: 'Essential Heavyweight 240 GSM Acid Wash Tee',
    slug: 'essential-heavyweight-240-gsm-acid-wash-tee',
    description: 'Vintage mineral wash aesthetic combined with thick, durable 240 GSM combed cotton. Ribbed crew collar that keeps its shape wash after wash.',
    price: 1199,
    originalPrice: 1799,
    discountPercent: 33,
    categoryId: 'cat-5',
    categoryName: 'T-Shirts',
    inStock: true,
    stockQuantity: 25,
    highlights: [
      '240 GSM Combed Ring-Spun Cotton',
      'Custom Vintage Acid Wash Treatment',
      'Reinforced Ribbed Crewneck Collar',
      'Double Needle Hemmed Sleeves'
    ],
    specifications: {
      'Material': '100% Combed Cotton',
      'Fit': 'Boxy Oversized Fit',
      'Finish': 'Mineral Acid Wash',
      'Sleeve': 'Half Sleeves'
    },
    deliveryInfo: 'Standard 2-3 Day Express Shipping.',
    returnPolicy: '7 Days Easy Returns.',
    featured: true,
    isNewArrival: true,
    images: [
      { id: 'img-6-1', url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop', isPrimary: true },
      { id: 'img-6-2', url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop' }
    ],
    colors: [
      { id: 'col-11', name: 'Washed Slate Grey', hexCode: '#4a5568' },
      { id: 'col-12', name: 'Washed Olive', hexCode: '#4d5d4d' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.6,
    reviewCount: 188,
    createdAt: '2026-07-12T16:00:00Z'
  },
  {
    id: 'prod-7',
    title: 'Kids Organic Cotton Graphic Explorer Set',
    slug: 'kids-organic-cotton-graphic-explorer-set',
    description: 'Soft, breathable, skin-friendly 100% GOTS certified organic cotton two-piece set featuring cheerful playful prints and elasticated waist shorts.',
    price: 1299,
    originalPrice: 1999,
    discountPercent: 35,
    categoryId: 'cat-3',
    categoryName: 'Kids',
    inStock: true,
    stockQuantity: 15,
    highlights: [
      'GOTS Certified Organic Cotton',
      'Hypoallergenic Non-Toxic Dyes',
      'Flexible Elastic Waistband Shorts',
      'Tagless Comfort Printing'
    ],
    specifications: {
      'Age Group': '2 - 8 Years',
      'Set Includes': '1 T-Shirt + 1 Shorts',
      'Fabric': '100% Organic Cotton Jersey'
    },
    deliveryInfo: 'Express Delivery across India.',
    returnPolicy: '7 Days Return & Exchange.',
    featured: false,
    isNewArrival: true,
    images: [
      { id: 'img-7-1', url: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=800&auto=format&fit=crop', isPrimary: true }
    ],
    colors: [
      { id: 'col-13', name: 'Sunshine Yellow', hexCode: '#fbbf24' },
      { id: 'col-14', name: 'Sky Blue', hexCode: '#38bdf8' }
    ],
    sizes: ['2Y', '4Y', '6Y', '8Y'],
    rating: 4.9,
    reviewCount: 64,
    createdAt: '2026-07-02T11:00:00Z'
  },
  {
    id: 'prod-8',
    title: 'Handcrafted Full-Grain Leather Minimalist Weekender Bag',
    slug: 'handcrafted-full-grain-leather-minimalist-weekender-bag',
    description: 'Built for lifetime travel. Meticulously handcrafted from vegetable-tanned full grain leather with solid brass hardware, YKK zippers, and padded laptop sleeve.',
    price: 6499,
    originalPrice: 9999,
    discountPercent: 35,
    categoryId: 'cat-8',
    categoryName: 'Accessories',
    inStock: true,
    stockQuantity: 6,
    highlights: [
      '100% Full-Grain Vegetable-Tanned Leather',
      'Heavy-Duty Solid Brass Hardware & YKK Zippers',
      'Dedicated 16" Padded Laptop Compartment',
      'Includes Detachable Leather Shoulder Strap'
    ],
    specifications: {
      'Dimensions': '48cm x 26cm x 24cm',
      'Capacity': '35 Litres',
      'Weight': '1.8 kg',
      'Hardware': 'Antique Antique Brass'
    },
    deliveryInfo: 'Free Premium Express Shipping.',
    returnPolicy: '7 Days Return Policy.',
    featured: true,
    isNewArrival: false,
    images: [
      { id: 'img-8-1', url: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop', isPrimary: true },
      { id: 'img-8-2', url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop' }
    ],
    colors: [
      { id: 'col-15', name: 'Cognac Brown', hexCode: '#78350f' },
      { id: 'col-16', name: 'Matte Obsidian', hexCode: '#18181b' }
    ],
    sizes: ['One Size'],
    rating: 4.95,
    reviewCount: 112,
    createdAt: '2026-06-20T10:00:00Z'
  }
];

export const INITIAL_THEME: ThemeSettings = {
  id: 'default',
  themeName: 'Elevate Indigo',
  primaryColor: '#4f46e5',
  primaryHover: '#4338ca',
  headerBg: '#0f172a',
  footerBg: '#0f172a',
  cardBg: '#ffffff',
  accentColor: '#f59e0b',
  borderRadius: '0.75rem'
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'ELV-98421',
    userId: 'usr-1',
    customerName: 'John Doe',
    email: 'john@example.com',
    phone: '+91 98765 43210',
    shippingAddress: {
      id: 'addr-1',
      fullName: 'John Doe',
      phone: '+91 98765 43210',
      addressLine: 'Flat 402, Skyline Residency, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400050',
      country: 'India',
      isDefault: true
    },
    items: [
      {
        id: 'item-1',
        productId: 'prod-1',
        productTitle: 'Aura Heavyweight Oversized Cotton Hoodie',
        productImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop',
        color: 'Charcoal Black',
        size: 'L',
        quantity: 1,
        unitPrice: 2499,
        totalPrice: 2499
      }
    ],
    totalAmount: 2499,
    discountAmount: 250,
    taxAmount: 112,
    shippingFee: 0,
    status: 'DELIVERED',
    paymentStatus: 'PAID',
    paymentMethod: 'RAZORPAY',
    razorpayOrderId: 'order_Nxl98421893',
    razorpayPaymentId: 'pay_Nxl98421893_success',
    createdAt: '2026-07-22T14:30:00Z',
    updatedAt: '2026-07-24T10:00:00Z'
  },
  {
    id: 'ord-1002',
    orderNumber: 'ELV-98422',
    userId: 'usr-2',
    customerName: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '+91 99887 76655',
    shippingAddress: {
      id: 'addr-2',
      fullName: 'Priya Sharma',
      phone: '+91 99887 76655',
      addressLine: '74 Cyber City, DLF Phase 2',
      city: 'Gurugram',
      state: 'Haryana',
      postalCode: '122002',
      country: 'India'
    },
    items: [
      {
        id: 'item-2',
        productId: 'prod-4',
        productTitle: 'Zara Sculpted Tailored Double-Breasted Blazer',
        productImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
        color: 'Midnight Emerald',
        size: 'S',
        quantity: 1,
        unitPrice: 4999,
        totalPrice: 4999
      }
    ],
    totalAmount: 4999,
    discountAmount: 500,
    taxAmount: 224,
    shippingFee: 0,
    status: 'SHIPPED',
    paymentStatus: 'PAID',
    paymentMethod: 'RAZORPAY',
    razorpayOrderId: 'order_Nxl98422104',
    razorpayPaymentId: 'pay_Nxl98422104_success',
    createdAt: '2026-07-25T09:15:00Z',
    updatedAt: '2026-07-26T08:00:00Z'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    userId: 'usr-1',
    userName: 'John Doe',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    comment: 'Absolute top tier heavy hoodie. The fabric weight feels like high-end streetwear brands charging triple. Warm, premium, and fits perfectly oversized!',
    verified: true,
    createdAt: '2026-07-23T11:00:00Z'
  },
  {
    id: 'rev-2',
    productId: 'prod-3',
    userId: 'usr-3',
    userName: 'Aarav Patel',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    comment: 'Super comfortable air soles, vibrant color accent! Original quality, delivered in 2 days.',
    verified: true,
    createdAt: '2026-07-18T16:20:00Z'
  }
];
