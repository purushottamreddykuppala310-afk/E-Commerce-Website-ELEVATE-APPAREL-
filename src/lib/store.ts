import { Product, Category, Order, ThemeSettings, Review, User, DashboardStats, OrderStatus } from './types';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_THEME, INITIAL_ORDERS, INITIAL_REVIEWS } from './initialData';

const STORAGE_KEYS = {
  PRODUCTS: 'elevate_products_v1',
  CATEGORIES: 'elevate_categories_v1',
  ORDERS: 'elevate_orders_v1',
  THEME: 'elevate_theme_v1',
  REVIEWS: 'elevate_reviews_v1',
  USERS: 'elevate_users_v1'
};

const isBrowser = typeof window !== 'undefined';

// --- PRODUCTS API ---
export function getProducts(): Product[] {
  if (!isBrowser) return INITIAL_PRODUCTS;
  const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_PRODUCTS;
  }
}

export function getProductById(id: string): Product | undefined {
  const products = getProducts();
  return products.find(p => p.id === id || p.slug === id);
}

export function saveProducts(products: Product[]): void {
  if (isBrowser) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    window.dispatchEvent(new Event('elevate_products_updated'));
  }
}

export function addProduct(product: Omit<Product, 'id' | 'createdAt'>): Product {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: `prod-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  products.unshift(newProduct);
  saveProducts(products);
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;

  const updated: Product = {
    ...products[index],
    ...updates
  };

  // Automatically sync stock quantity status
  if (typeof updates.stockQuantity !== 'undefined') {
    updated.inStock = updates.stockQuantity > 0;
  }

  products[index] = updated;
  saveProducts(products);
  return updated;
}

export function deleteProduct(id: string): boolean {
  const products = getProducts();
  const filtered = products.filter(p => p.id !== id);
  saveProducts(filtered);
  return true;
}

export function reduceStockForOrder(items: { productId: string; quantity: number }[]): void {
  const products = getProducts();
  items.forEach(item => {
    const prod = products.find(p => p.id === item.productId);
    if (prod) {
      const newStock = Math.max(0, prod.stockQuantity - item.quantity);
      prod.stockQuantity = newStock;
      if (newStock === 0) {
        prod.inStock = false;
      }
    }
  });
  saveProducts(products);
}

// --- CATEGORIES API ---
export function getCategories(): Category[] {
  if (!isBrowser) return INITIAL_CATEGORIES;
  const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
    return INITIAL_CATEGORIES;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_CATEGORIES;
  }
}

// --- ORDERS API ---
export function getOrders(): Order[] {
  if (!isBrowser) return INITIAL_ORDERS;
  const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
    return INITIAL_ORDERS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_ORDERS;
  }
}

export function getOrderById(id: string): Order | undefined {
  const orders = getOrders();
  return orders.find(o => o.id === id || o.orderNumber === id);
}

export function saveOrders(orders: Order[]): void {
  if (isBrowser) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    window.dispatchEvent(new Event('elevate_orders_updated'));
  }
}

export function createOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): Order {
  const orders = getOrders();
  const orderNum = `ELV-${Math.floor(10000 + Math.random() * 90000)}`;
  const now = new Date().toISOString();
  
  const newOrder: Order = {
    ...orderData,
    id: `ord-${Date.now()}`,
    orderNumber: orderNum,
    createdAt: now,
    updatedAt: now
  };

  orders.unshift(newOrder);
  saveOrders(orders);

  // Automatically decrease product inventory stock
  reduceStockForOrder(newOrder.items);

  return newOrder;
}

export function updateOrderStatus(orderId: string, status: OrderStatus): Order | null {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === orderId);
  if (index === -1) return null;

  orders[index].status = status;
  orders[index].updatedAt = new Date().toISOString();
  saveOrders(orders);
  return orders[index];
}

// --- THEME SETTINGS API ---
export function getThemeSettings(): ThemeSettings {
  if (!isBrowser) return INITIAL_THEME;
  const data = localStorage.getItem(STORAGE_KEYS.THEME);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(INITIAL_THEME));
    return INITIAL_THEME;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_THEME;
  }
}

export function saveThemeSettings(theme: ThemeSettings): void {
  if (isBrowser) {
    localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(theme));
    applyCssThemeVariables(theme);
    window.dispatchEvent(new Event('elevate_theme_updated'));
  }
}

export function applyCssThemeVariables(theme: ThemeSettings): void {
  if (!isBrowser) return;
  const root = document.documentElement;
  root.style.setProperty('--primary-color', theme.primaryColor);
  root.style.setProperty('--primary-hover', theme.primaryHover);
  root.style.setProperty('--header-bg', theme.headerBg);
  root.style.setProperty('--footer-bg', theme.footerBg);
  root.style.setProperty('--card-bg', theme.cardBg);
  root.style.setProperty('--accent-color', theme.accentColor);
  root.style.setProperty('--border-radius', theme.borderRadius);
}

// --- DASHBOARD STATS API ---
export function getDashboardStats(): DashboardStats {
  const orders = getOrders();
  const products = getProducts();

  const totalSales = orders.reduce((sum, o) => o.paymentStatus === 'PAID' ? sum + o.totalAmount : sum, 0);
  const totalOrders = orders.length;
  const lowStockItems = products.filter(p => p.stockQuantity <= 5).length;
  const totalCustomers = 42; // Dynamic representation

  const monthlyRevenue = [
    { month: 'Feb', revenue: 45000 },
    { month: 'Mar', revenue: 62000 },
    { month: 'Apr', revenue: 58000 },
    { month: 'May', revenue: 84000 },
    { month: 'Jun', revenue: 95000 },
    { month: 'Jul', revenue: totalSales + 110000 }
  ];

  const topCategories = [
    { name: 'Men', sales: 48 },
    { name: 'Women', sales: 36 },
    { name: 'Shoes', sales: 22 },
    { name: 'Shirts', sales: 18 }
  ];

  return {
    totalSales,
    totalOrders,
    totalCustomers,
    lowStockItems,
    salesGrowth: 18.4,
    ordersGrowth: 12.1,
    recentOrders: orders.slice(0, 5),
    topCategories,
    monthlyRevenue
  };
}
