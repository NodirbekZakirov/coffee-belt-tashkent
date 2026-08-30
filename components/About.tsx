'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/components/LanguageContext';
import { Coffee, Dices, Laptop, Leaf, HeartHandshake, Sparkles } from 'lucide-react';

export function About() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Coffee,
      color: 'bg-terracotta-500/10 text-terracotta-500',
      title: t.about.feature1Title,
      desc: t.about.feature1Desc,
    },
    {
      icon: Dices,
      color: 'bg-amber-500/10 text-amber-600',
      title: t.about.feature2Title,
      desc: t.about.feature2Desc,
    },
    {
      icon: Laptop,
      color: 'bg-sage-500/10 text-sage-600',
      title: t.about.feature3Title,
      desc: t.about.feature3Desc,
    },
  ];

  return (
    <section id="about" className="py-24 bg-cream-100/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Atmospheric Images Grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 grid grid-cols-2 gap-4 relative"
          >
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-warm-md aspect-[3/4]">
                <img
                  src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=600"
                  alt="Atmosphere plants & coffee"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="bg-sage-600 text-white p-6 rounded-2xl shadow-warm-md flex flex-col justify-between">
                <Leaf className="w-8 h-8 opacity-80 mb-4" />
                <div>
                  <h4 className="font-serif font-bold text-lg">Живая зелень</h4>
                  <p className="text-xs text-sage-100 mt-1">Оазис свежести в ритме большого города</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="bg-terracotta-500 text-white p-6 rounded-2xl shadow-warm-md">
                <HeartHandshake className="w-8 h-8 opacity-80 mb-4" />
                <h4 className="font-serif font-bold text-lg">Уют и коворкинг</h4>
                <p className="text-xs text-terracotta-100 mt-1">Комфорт для работы, учёбы и встреч</p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-warm-md aspect-[3/4]">
                <img
                  src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=600"
                  alt="Specialty latte art cup"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column: About Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center space-x-2 bg-cream-200 border border-cream-300 px-3.5 py-1 rounded-full text-xs font-semibold text-espresso-800">
              <Sparkles className="w-3.5 h-3.5 text-terracotta-500" />
              <span>{t.about.badge}</span>
            </div>

            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-espresso-900 leading-tight">
              {t.about.title}
            </h2>

            <p className="text-espresso-700 text-base leading-relaxed">
              {t.about.desc1}
            </p>

            <p className="text-espresso-700 text-base leading-relaxed">
              {t.about.desc2}
            </p>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-cream-50 rounded-2xl border border-cream-200/80 shadow-warm-sm hover:shadow-warm-md hover:-translate-y-1 transition-all duration-200"
                >
                  <div className={`w-10 h-10 rounded-xl ${feat.color} flex items-center justify-center mb-3`}>
                    <feat.icon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <h3 className="font-serif font-bold text-sm text-espresso-900 mb-1">{feat.title}</h3>
                  <p className="text-xs text-espresso-600 leading-normal">{feat.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
