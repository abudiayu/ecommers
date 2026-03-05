import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};

const defaultSettings = {
  storeName: 'TinaMart',
  storeTagline: 'Your One-Stop Shop',
  storeEmail: 'abudiayuu@gmail.com',
  storePhone: '+251 901 013 902',
  storeAddress: 'Addis Ababa, Ethiopia',
  storeDescription: 'TinaMart is your trusted online marketplace offering quality products at competitive prices.',
  currency: 'ETB',
  taxRate: 15,
  shippingFee: 50,
  freeShippingThreshold: 1000,
  processingTime: 2,
  returnPeriod: 30,
  emailNotifications: true,
  smsNotifications: true,
  orderNotifications: true,
  lowStockAlerts: true,
  marketingEmails: false,
  creditCard: true,
  mobileMoney: true,
  bankTransfer: true,
  cashOnDelivery: true,
  twoFactorAuth: false,
  themeColor: '#FFD700',
  language: 'en',
  darkMode: false
};

const languageNames = {
  en: 'English',
  am: 'አማርኛ',
  om: 'Afaan Oromoo',
  ti: 'ትግርኛ'
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('tinamartSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('tinamartSettings', JSON.stringify(settings));
    
    // Apply theme color to CSS variables
    document.documentElement.style.setProperty('--theme-primary', settings.themeColor);
    document.documentElement.style.setProperty('--theme-secondary', adjustColor(settings.themeColor, -20));
    document.documentElement.style.setProperty('--theme-light', adjustColor(settings.themeColor, 40));
    
    // Apply dark mode
    if (settings.darkMode) {
      document.body.classList.add('dark-mode');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      document.documentElement.setAttribute('data-theme', 'light');
    }

    // Apply language
    document.documentElement.setAttribute('lang', settings.language);
    
  }, [settings]);

  // Helper function to adjust color brightness
  const adjustColor = (color, amount) => {
    const clamp = (val) => Math.min(Math.max(val, 0), 255);
    const num = parseInt(color.replace('#', ''), 16);
    const r = clamp((num >> 16) + amount);
    const g = clamp(((num >> 8) & 0x00FF) + amount);
    const b = clamp((num & 0x0000FF) + amount);
    return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
  };

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('tinamartSettings');
  };

  const getLanguageName = () => {
    return languageNames[settings.language] || 'English';
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings, getLanguageName }}>
      {children}
    </SettingsContext.Provider>
  );
};
