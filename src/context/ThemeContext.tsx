'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeSettings } from '@/lib/types';
import { getThemeSettings, saveThemeSettings, applyCssThemeVariables } from '@/lib/store';

interface ThemeContextType {
  theme: ThemeSettings;
  updateTheme: (newTheme: ThemeSettings) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeSettings>(getThemeSettings());

  useEffect(() => {
    const loadedTheme = getThemeSettings();
    setTheme(loadedTheme);
    applyCssThemeVariables(loadedTheme);

    const handleThemeUpdate = () => {
      const current = getThemeSettings();
      setTheme(current);
      applyCssThemeVariables(current);
    };

    window.addEventListener('elevate_theme_updated', handleThemeUpdate);
    return () => window.removeEventListener('elevate_theme_updated', handleThemeUpdate);
  }, []);

  const updateTheme = (newTheme: ThemeSettings) => {
    setTheme(newTheme);
    saveThemeSettings(newTheme);
  };

  const resetTheme = () => {
    const defaultTheme: ThemeSettings = {
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
    updateTheme(defaultTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
