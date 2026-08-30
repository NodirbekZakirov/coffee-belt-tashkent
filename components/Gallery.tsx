'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/components/LanguageContext';
import { Sparkles, Maximize2, X } from 'lucide-react';

const galleryImages = [
  {
    url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800',
    title: 'Интерьер & Растения',
    aspect: 'aspect-[4/3]',
  },
  {
    url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800',
    title: 'Зона коворкинга',
    aspect: 'aspect-[3/4]',
  },
  {
    url: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?auto=format&fit=crop&q=80&w=800',
    title: 'Фисташковый эклер',
    aspect: 'aspect-square',
  },
  {
    url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800',
    title: 'Specialty Cappuccino',
    aspect: 'aspect-square',
  },
  {
    url: 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&q=80&w=800',
    title: 'Taro Bubble Tea',
    aspect: 'aspect-[4/3]',
  },
  {
    url: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?auto=format&fit=crop&q=80&w=800',
    title: 'Настольные игры',
    aspect: 'aspect-[3/4]',
  },
];

export function Gallery() {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-24 bg-cream-100/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-cream-200 border border-cream-300 px-3.5 py-1 rounded-full text-xs font-semibold text-espresso-800 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-terracotta-500" />
            <span>{t.gallery.badge}</span>
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-espresso-900 mb-2">
            {t.gallery.title}
          </h2>
          <p className="text-espresso-700 text-sm">{t.gallery.sub}</p>
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => setSelectedImage(img.url)}
              className="group relative rounded-3xl overflow-hidden shadow-warm-sm hover:shadow-warm-lg cursor-pointer bg-cream-200"
            >
              <div className={img.aspect}>
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
                <span className="font-serif font-bold text-white text-base">{img.title}</span>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-espresso-900/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full rounded-3xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={selectedImage} alt="Expanded gallery image" className="w-full h-auto object-contain max-h-[85vh] mx-auto rounded-2xl" />
          </div>
        </div>
      )}
    </section>
  );
}
