'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Palette, 
  LogOut, 
  ExternalLink,
  Sparkles,
  Bell
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { admin, adminLogout, isAdminAuthenticated } = useAuth();

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      
      {/* Admin Sidebar (Left) */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-5 flex flex-col justify-between space-y-6">
        <div className="space-y-8">
          
          {/* Logo */}
          <Link href="/admin" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-400 to-indigo-500 flex items-center justify-center text-slate-950 font-black text-xs">
              ADM
            </div>
            <div>
              <span className="font-black text-sm uppercase tracking-wider text-white">ELEVATE</span>
              <span className="block text-[10px] text-amber-400 font-bold tracking-widest uppercase">ADMIN PORTAL</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {[
              { label: 'Executive Dashboard', href: '/admin', icon: LayoutDashboard },
              { label: 'Product Catalog', href: '/admin/products', icon: Package },
              { label: 'Orders & Sales', href: '/admin/orders', icon: ShoppingBag },
              { label: 'Customer Directory', href: '/admin/customers', icon: Users },
              { label: 'Theme Manager', href: '/admin/theme', icon: Palette },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <Link
            href="/"
            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800 transition"
          >
            <span className="flex items-center gap-2"><ExternalLink className="w-3.5 h-3.5 text-indigo-400" /> Customer Shop</span>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">Live</span>
          </Link>

          <button
            onClick={() => {
              adminLogout();
              router.push('/admin/login');
            }}
            className="w-full flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-slate-800 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Topbar */}
        <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-slate-400">Admin ID: <strong className="text-amber-400">{admin ? admin.adminId : 'ADMIN-9901'}</strong></span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800">
                <Bell className="w-5 h-5" />
              </button>
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
            </div>

            <div className="flex items-center space-x-2 pl-4 border-l border-slate-800">
              <div className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center">
                A
              </div>
              <span className="text-xs font-bold text-white hidden sm:inline">{admin ? admin.name : 'Executive Admin'}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 sm:p-8 flex-1 space-y-8">
          {children}
        </main>
      </div>

    </div>
  );
}
