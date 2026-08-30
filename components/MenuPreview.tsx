'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from '@/components/LanguageContext';
import { ArrowRight } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  isAvailable: boolean;
  isVegan?: boolean;
  isOatMilk?: boolean;
  isSpecialty?: boolean;
  isCold?: boolean;
  category: { name: string };
}

import { INITIAL_MENU_ITEMS } from '@/lib/initialData';

export function MenuPreview() {
  const { t } = useTranslation();
  const [items, setItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS.slice(0, 6));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/menu')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data.slice(0, 6));
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="menu-preview" className="py-24 bg-cream-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
          <div>
            <div className="inline-flex items-center space-x-2 bg-cream-100 border border-cream-300 px-3.5 py-1 rounded-full text-xs font-semibold text-espresso-800 mb-3">
              <span>{t.menu.previewBadge}</span>
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-espresso-900">
              {t.menu.previewTitle}
            </h2>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center space-x-2 text-terracotta-500 hover:text-terracotta-600 font-semibold text-base group"
          >
            <span>{t.menu.viewFullMenu}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-cream-200/60 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group bg-cream-100/70 border border-cream-200/80 rounded-3xl p-4 shadow-warm-sm hover:shadow-warm-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image container */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-cream-200">
                    <img
                      src={item.imageUrl || 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600'}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-cream-50/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold uppercase text-espresso-800 tracking-wider">
                      {item.category?.name?.split('/')[0] || 'Menu'}
                    </div>

                    {/* Dietary Badges overlay */}
                    <div className="absolute bottom-3 right-3 flex items-center space-x-1 bg-cream-50/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[11px]">
                      {item.isSpecialty && <span title="100% Specialty Arabica">☕️</span>}
                      {item.isOatMilk && <span title="Oat Milk / Овсяное молоко">🥛</span>}
                      {item.isVegan && <span title="Vegan / Веган">🌱</span>}
                      {item.isCold && <span title="Cold Drink / Айс">🧊</span>}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-serif font-bold text-lg text-espresso-900 mb-1 group-hover:text-terracotta-500 transition-colors">
                    {item.name}
                  </h3>
                  {item.description && (
                    <p className="text-xs text-espresso-600 line-clamp-2 mb-4 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Footer: Price & Stock Status */}
                <div className="flex items-center justify-between pt-3 border-t border-cream-200/60 mt-2">
                  <span className="font-sans font-bold text-base text-espresso-900">
                    {t.menu.priceFormat(item.price)}
                  </span>
                  <span
                    className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${
                      item.isAvailable
                        ? 'bg-sage-500/10 text-sage-600'
                        : 'bg-red-500/10 text-red-600'
                    }`}
                  >
                    {item.isAvailable ? t.menu.available : t.menu.soldOut}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
