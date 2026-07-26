import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ELEVATE APPAREL - Premium Online Clothing E-Commerce Store',
  description: 'Production-ready online clothing shopping website inspired by AJIO, Zara, Myntra, and Nike. Fast loading, responsive, dynamic theme manager, Razorpay payments, and automated PDF invoices.',
  manifest: '/manifest.json',
  themeColor: '#4f46e5'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col antialiased bg-slate-50 text-slate-900`}>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <CartDrawer />
              <Footer />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
