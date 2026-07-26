'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AdminUser } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  admin: AdminUser | null;
  isAuthenticated: boolean;
  isAdminAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  adminLogin: (adminId: string, password?: string) => Promise<boolean>;
  logout: () => void;
  adminLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState<AdminUser | null>(null);

  useEffect(() => {
    // Check saved sessions
    const savedUser = localStorage.getItem('elevate_user_session');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('elevate_user_session');
      }
    }

    const savedAdmin = localStorage.getItem('elevate_admin_session');
    if (savedAdmin) {
      try {
        setAdmin(JSON.parse(savedAdmin));
      } catch (e) {
        localStorage.removeItem('elevate_admin_session');
      }
    }
  }, []);

  const login = async (email: string): Promise<boolean> => {
    const newUser: User = {
      id: 'usr-' + Date.now(),
      name: email.split('@')[0].toUpperCase(),
      email,
      role: 'CUSTOMER',
      createdAt: new Date().toISOString()
    };
    setUser(newUser);
    localStorage.setItem('elevate_user_session', JSON.stringify(newUser));
    return true;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    const googleUser: User = {
      id: 'usr-google-' + Date.now(),
      name: 'Google User',
      email: 'user.google@gmail.com',
      role: 'CUSTOMER',
      googleId: '10984918237912',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      createdAt: new Date().toISOString()
    };
    setUser(googleUser);
    localStorage.setItem('elevate_user_session', JSON.stringify(googleUser));
    return true;
  };

  const adminLogin = async (adminId: string): Promise<boolean> => {
    const newAdmin: AdminUser = {
      id: 'adm-01',
      adminId: adminId || 'ADMIN-9901',
      name: 'Executive Admin',
      email: 'admin@elevate.com',
      superAdmin: true
    };
    setAdmin(newAdmin);
    localStorage.setItem('elevate_admin_session', JSON.stringify(newAdmin));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('elevate_user_session');
  };

  const adminLogout = () => {
    setAdmin(null);
    localStorage.removeItem('elevate_admin_session');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        isAuthenticated: !!user,
        isAdminAuthenticated: !!admin,
        login,
        loginWithGoogle,
        adminLogin,
        logout,
        adminLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
