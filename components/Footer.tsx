'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@/components/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Instagram, Star } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();
  const googleReviewUrl = 'https://search.google.com/local/writereview?placeid=ChIJCzhg74v1rjgRTrF_52DTUDc';

  return (
    <footer className="bg-cream-100 border-t border-cream-300 py-12 text-espresso-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center space-x-3">
            <img
              src="/images/logo.png"
              alt="The Coffee Belt Logo"
              className="w-8 h-8 object-contain rounded-full border border-cream-300 bg-white p-0.5"
            />
            <span className="font-serif font-bold text-lg text-espresso-900">The Coffee Belt</span>
          </Link>

          {/* Social Links & Review CTA */}
          <div className="flex items-center space-x-6">
            <a
              href="https://instagram.com/thecoffeebelt_uz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 hover:text-terracotta-500 font-semibold transition-colors"
            >
              <Instagram className="w-4 h-4 text-pink-600" />
              <span>@thecoffeebelt_uz</span>
            </a>

            <a
              href={googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200 hover:bg-amber-100 transition-colors font-semibold"
            >
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{t.footer.reviewGoogle}</span>
            </a>
          </div>

          {/* Compact Hover Language Switcher */}
          <LanguageSwitcher />
        </div>

        <div className="pt-6 border-t border-cream-200 flex flex-col sm:flex-row items-center justify-between text-espresso-600 space-y-2 sm:space-y-0">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
