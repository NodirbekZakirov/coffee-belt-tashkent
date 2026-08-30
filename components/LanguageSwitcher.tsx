'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/components/LanguageContext';
import { Language } from '@/lib/i18n';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { lang, setLang } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  const languages: { code: Language; label: string }[] = [
    { code: 'ru', label: 'RU' },
    { code: 'uz', label: 'UZ' },
    { code: 'en', label: 'EN' },
  ];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center bg-cream-100/90 border border-cream-300 rounded-full p-1 text-xs shadow-warm-sm transition-all duration-300 group cursor-pointer"
    >
      {/* Globe Icon & Active Language Label */}
      <div className="flex items-center space-x-1.5 px-2 py-1 rounded-full text-espresso-800 font-bold select-none">
        <Globe className={`w-4 h-4 text-terracotta-500 transition-transform duration-500 ${isHovered ? 'rotate-180 scale-110' : ''}`} />
        <span className="uppercase text-[11px] font-bold text-espresso-900 tracking-wider">
          {lang}
        </span>
      </div>

      {/* Expanding Options Drawer on Hover */}
      <div
        className={`flex items-center space-x-1 overflow-hidden transition-all duration-300 ease-out ${
          isHovered ? 'max-w-[140px] opacity-100 ml-1 pr-1' : 'max-w-0 opacity-0 ml-0 pr-0'
        }`}
      >
        {languages.map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            className={`px-2.5 py-1 rounded-full uppercase font-bold text-[10px] transition-all duration-200 ${
              lang === l.code
                ? 'bg-terracotta-500 text-white shadow-sm scale-105'
                : 'text-espresso-700 hover:text-espresso-900 hover:bg-cream-200'
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}
