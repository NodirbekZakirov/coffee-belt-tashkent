'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations, Translations, detectBrowserLanguage } from '@/lib/i18n';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('ru');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Detect browser language or stored preference on mount
    const savedLang = localStorage.getItem('coffee_belt_lang') as Language | null;
    if (savedLang && ['ru', 'uz', 'en'].includes(savedLang)) {
      setLangState(savedLang);
    } else {
      const detected = detectBrowserLanguage();
      setLangState(detected);
    }
    setMounted(true);
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('coffee_belt_lang', newLang);
  };

  const t = translations[lang] || translations.ru;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
