'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useTranslation } from '@/components/LanguageContext';
import { Search, ArrowLeft, Coffee } from 'lucide-react';

interface Category {
  id: string;
  name: string;
}

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
  categoryId: string;
  category: Category;
}

import { INITIAL_MENU_ITEMS, INITIAL_CATEGORIES } from '@/lib/initialData';

export default function FullMenuPage() {
  const { t } = useTranslation();
  const [items, setItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/menu').then((r) => r.json()),
      fetch('/api/categories').then((r) => r.json()),
    ])
      .then(([menuData, catData]) => {
        if (Array.isArray(menuData) && menuData.length > 0) setItems(menuData);
        if (Array.isArray(catData) && catData.length > 0) setCategories(catData);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.categoryId === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));

    let matchesDietary = true;
    if (dietaryFilter === 'vegan') matchesDietary = Boolean(item.isVegan);
    if (dietaryFilter === 'oat') matchesDietary = Boolean(item.isOatMilk);
    if (dietaryFilter === 'specialty') matchesDietary = Boolean(item.isSpecialty);
    if (dietaryFilter === 'cold') matchesDietary = Boolean(item.isCold);

    return matchesCategory && matchesSearch && matchesDietary;
  });

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 font-sans">
      <Header />

      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Breadcrumb & Header */}
        <div className="mb-10 space-y-4">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-bold text-espresso-700 hover:text-terracotta-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Вернуться на главную</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 bg-cream-200 border border-cream-300 px-3.5 py-1 rounded-full text-xs font-semibold text-espresso-800 mb-2">
                <span>The Coffee Belt Menu</span>
              </div>
              <h1 className="font-serif font-bold text-3xl sm:text-5xl text-espresso-900">
                {t.menu.allMenuTitle}
              </h1>
              <p className="text-espresso-700 text-sm mt-1">{t.menu.allMenuSub}</p>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-espresso-600" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.menu.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 bg-cream-100 border border-cream-300 rounded-2xl text-xs text-espresso-900 focus:outline-none focus:ring-2 focus:ring-terracotta-500"
              />
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-3 mb-4 no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-terracotta-500 text-white shadow-warm-sm'
                : 'bg-cream-100 hover:bg-cream-200 text-espresso-800 border border-cream-300'
            }`}
          >
            {t.menu.allCategories} ({items.length})
          </button>
          {categories.map((cat) => {
            const count = items.filter((i) => i.categoryId === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-terracotta-500 text-white shadow-warm-sm'
                    : 'bg-cream-100 hover:bg-cream-200 text-espresso-800 border border-cream-300'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Dietary & Drink Micro Filter Tabs (Idea 2) */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-6 mb-8 text-xs">
          <span className="text-espresso-600 font-bold mr-2 text-[11px] uppercase tracking-wider">
            Фильтр:
          </span>
          {[
            { id: 'all', label: 'Все позиции' },
            { id: 'specialty', label: '☕️ Спешелти 100% Арабика' },
            { id: 'oat', label: '🥛 Овсяное молоко' },
            { id: 'vegan', label: '🌱 Веган' },
            { id: 'cold', label: '🧊 Айс напитки' },
          ].map((df) => (
            <button
              key={df.id}
              onClick={() => setDietaryFilter(df.id)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                dietaryFilter === df.id
                  ? 'bg-espresso-900 text-white'
                  : 'bg-cream-100 text-espresso-700 hover:bg-cream-200 border border-cream-300'
              }`}
            >
              {df.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="h-64 bg-cream-200/70 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-cream-100/50 rounded-3xl border border-cream-200">
            <Coffee className="w-12 h-12 text-espresso-600 mx-auto mb-3 opacity-50" />
            <h3 className="font-serif font-bold text-lg text-espresso-900">Позиций не найдено</h3>
            <p className="text-xs text-espresso-600 mt-1">Попробуйте изменить категорию или фильтры</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className="bg-cream-100/80 border border-cream-200/80 rounded-3xl p-4 shadow-warm-sm hover:shadow-warm-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-cream-200">
                    <img
                      src={item.imageUrl || 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600'}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-cream-50/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold uppercase text-espresso-800">
                      {item.category?.name?.split('/')[0] || 'Menu'}
                    </span>

                    {/* Micro Badges */}
                    <div className="absolute bottom-3 right-3 flex items-center space-x-1 bg-cream-50/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[11px]">
                      {item.isSpecialty && <span title="100% Specialty Arabica">☕️</span>}
                      {item.isOatMilk && <span title="Oat Milk / Овсяное молоко">🥛</span>}
                      {item.isVegan && <span title="Vegan / Веган">🌱</span>}
                      {item.isCold && <span title="Cold Drink / Айс">🧊</span>}
                    </div>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-espresso-900 mb-1">{item.name}</h3>
                  {item.description && (
                    <p className="text-xs text-espresso-600 leading-relaxed mb-4">{item.description}</p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-cream-200/60 mt-2">
                  <span className="font-sans font-bold text-base text-espresso-900">
                    {t.menu.priceFormat(item.price)}
                  </span>
                  <span
                    className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${
                      item.isAvailable ? 'bg-sage-500/10 text-sage-600' : 'bg-red-500/10 text-red-600'
                    }`}
                  >
                    {item.isAvailable ? t.menu.available : t.menu.soldOut}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
