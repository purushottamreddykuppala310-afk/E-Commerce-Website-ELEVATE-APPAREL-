export interface User {
  id: string;
  name: string;
  email: string;
  role: 'CUSTOMER' | 'ADMIN';
  phone?: string;
  avatar?: string;
  googleId?: string;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  adminId: string;
  name: string;
  email: string;
  superAdmin: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount?: number;
}

export interface ProductColor {
  id: string;
  name: string;
  hexCode: string;
}

export interface ProductImage {
  id: string;
  url: string;
  altText?: string;
  isPrimary?: boolean;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  categoryId: string;
  categoryName?: string;
  inStock: boolean;
  stockQuantity: number;
  highlights: string[];
  specifications: Record<string, string>;
  deliveryInfo?: string;
  returnPolicy?: string;
  featured?: boolean;
  isNewArrival?: boolean;
  images: ProductImage[];
  colors: ProductColor[];
  sizes: string[]; // XS, S, M, L, XL, XXL
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  unitPrice: number;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface OrderItem {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  color: string;
  size: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. ELV-92841
  userId?: string;
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: Address;
  items: OrderItem[];
  totalAmount: number;
  discountAmount: number;
  taxAmount: number;
  shippingFee: number;
  status: OrderStatus;
  paymentStatus: 'PAID' | 'UNPAID' | 'FAILED' | 'REFUNDED';
  paymentMethod: 'RAZORPAY' | 'COD' | 'CARD' | 'UPI';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  verified: boolean;
  createdAt: string;
}

export interface ThemeSettings {
  id: string;
  themeName: string;
  primaryColor: string;
  primaryHover: string;
  headerBg: string;
  footerBg: string;
  cardBg: string;
  accentColor: string;
  borderRadius: string;
}

export interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  lowStockItems: number;
  salesGrowth: number;
  ordersGrowth: number;
  recentOrders: Order[];
  topCategories: { name: string; sales: number }[];
  monthlyRevenue: { month: string; revenue: number }[];
}
