'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/components/LanguageContext';
import { Globe2, Flame, Mountain, Droplets, CheckCircle2 } from 'lucide-react';

const origins = [
  {
    id: 'ethiopia',
    country: 'ЭфиопияИргачефф',
    flag: '🇪🇹',
    region: 'Yirgacheffe • Gedeo Zone',
    altitude: '1,900 – 2,200 м',
    process: 'Мытая (Washed)',
    roast: 'Светлая / Medium-Light',
    tastingNotes: ['Жасмин 🌸', 'Бергамот 🍊', 'Сочный персик 🍑', 'Белый чай 🍵'],
    description: 'Легендарная спешелти арабика из высокогорной Эфиопии. Обладает нежнейшим букетом цветущего жасмина, яркой цитрусовой кислинкой и шелковистым послевкусием.',
    recommended: 'V60 Воронка, Айс Американо, Флэт Уайт',
  },
  {
    id: 'colombia',
    country: 'КолумбияУила',
    flag: '🇨🇴',
    region: 'Huila • San Agustin',
    altitude: '1,600 – 1,900 м',
    process: 'Натуральная (Natural)',
    roast: 'Средняя / Medium Roast',
    tastingNotes: ['Темный шоколад 🍫', 'Спелая вишня 🍒', 'Тростниковый сахар 🍯'],
    description: 'Богатый, сбалансированный кофе из сердца Анд. Плотное кремовое тело с сочной вишневой сладостью и глубоким шоколадным подтоном.',
    recommended: 'Фирменный Капучино, Солёно-Карамельный Раф',
  },
  {
    id: 'brazil',
    country: 'БразилияСеррадо',
    flag: '🇧🇷',
    region: 'Cerrado Mineiro',
    altitude: '1,100 – 1,300 м',
    process: 'Сухая (Natural)',
    roast: 'Средне-тёмная / Medium-Dark',
    tastingNotes: ['Жареный фундук 🌰', 'Какао 🍫', 'Карамель 🍮'],
    description: 'Классическая бразильская арабика с бархатистой текстурой, низкой кислотностью и ярко выраженными орехово-шоколадными оттенками.',
    recommended: 'Эспрессо, Двойной Латте',
  },
];

export function CoffeeTerroirWidget() {
  const { t } = useTranslation();
  const [selectedOrigin, setSelectedOrigin] = useState(origins[0]);

  return (
    <section className="py-20 bg-cream-100/70 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-cream-200 border border-cream-300 px-3.5 py-1 rounded-full text-xs font-semibold text-espresso-800 mb-3">
            <Globe2 className="w-3.5 h-3.5 text-terracotta-500" />
            <span>География Зерен • 100% Arabica</span>
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-espresso-900 mb-2">
            Терруар & Искусство Обжарки
          </h2>
          <p className="text-espresso-700 text-sm">
            Каждая чашка в The Coffee Belt варится на свежеобжаренных моносортах с прозрачной историей происхождения
          </p>
        </div>

        {/* Origin Selector Tabs */}
        <div className="flex items-center justify-center space-x-3 mb-10 overflow-x-auto pb-2">
          {origins.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedOrigin(item)}
              className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all duration-200 ${
                selectedOrigin.id === item.id
                  ? 'bg-espresso-900 text-white shadow-warm-md scale-105'
                  : 'bg-cream-50 hover:bg-cream-200 text-espresso-800 border border-cream-300'
              }`}
            >
              <span className="text-base">{item.flag}</span>
              <span>{item.country}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Card Info */}
        <motion.div
          key={selectedOrigin.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-cream-50 rounded-3xl p-6 sm:p-10 border border-cream-300 shadow-warm-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center space-x-3">
              <span className="text-4xl">{selectedOrigin.flag}</span>
              <div>
                <h3 className="font-serif font-bold text-2xl text-espresso-900">
                  {selectedOrigin.country}
                </h3>
                <p className="text-xs text-espresso-600 font-medium">{selectedOrigin.region}</p>
              </div>
            </div>

            <p className="text-sm text-espresso-800 leading-relaxed">
              {selectedOrigin.description}
            </p>

            {/* Tasting Notes Pills */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-espresso-600 block mb-2">
                Дегустационный профиль
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedOrigin.tastingNotes.map((note, idx) => (
                  <span
                    key={idx}
                    className="bg-terracotta-500/10 text-terracotta-700 border border-terracotta-500/20 px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-cream-200 text-xs text-espresso-800 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-sage-600 flex-shrink-0" />
              <span>
                <strong>Рекомендуется в напитках:</strong> {selectedOrigin.recommended}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-cream-100/90 rounded-2xl p-6 border border-cream-300 space-y-4 text-xs">
            <h4 className="font-serif font-bold text-sm text-espresso-900 border-b border-cream-200 pb-2">
              Характеристики терруара
            </h4>

            <div className="flex items-center justify-between">
              <span className="text-espresso-600 flex items-center">
                <Mountain className="w-4 h-4 mr-2 text-terracotta-500" />
                Высота произрастания
              </span>
              <span className="font-bold text-espresso-900">{selectedOrigin.altitude}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-espresso-600 flex items-center">
                <Droplets className="w-4 h-4 mr-2 text-sky-600" />
                Обработка зерна
              </span>
              <span className="font-bold text-espresso-900">{selectedOrigin.process}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-espresso-600 flex items-center">
                <Flame className="w-4 h-4 mr-2 text-amber-600" />
                Профиль обжарки
              </span>
              <span className="font-bold text-espresso-900">{selectedOrigin.roast}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
