'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from '@/components/LanguageContext';
import { ReviewsModal } from '@/components/ReviewsModal';
import { Compass, ArrowRight, Star, Wifi, Clock, Check, Copy } from 'lucide-react';

interface DynamicSettings {
  openingHours?: string;
  wifiName?: string;
  wifiPassword?: string;
  ratingValue?: string;
  ratingCount?: string;
}

export function Hero() {
  const { t } = useTranslation();
  const [settings, setSettings] = useState<DynamicSettings | null>(null);
  const [reviewsModalOpen, setReviewsModalOpen] = useState(false);
  const [realAvgRating, setRealAvgRating] = useState('4.9');
  const [realTotalCount, setRealTotalCount] = useState(98);
  const [wifiCopied, setWifiCopied] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch(() => null);

    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.avgRating) {
          setRealAvgRating(data.avgRating);
          setRealTotalCount(data.totalCount);
        }
      })
      .catch(() => null);
  }, []);

  const handleCopyWifi = () => {
    const password = settings?.wifiPassword || 'coffeebelt2026';
    navigator.clipboard.writeText(password);
    setWifiCopied(true);
    setTimeout(() => setWifiCopied(false), 3000);
  };

  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=41.2974418,69.2740486';

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-cream-50">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-terracotta-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-6 text-center lg:text-left"
        >
          {/* Micro Pill Badge */}
          <div className="inline-flex items-center space-x-2 bg-cream-100/90 border border-cream-300 px-4 py-1.5 rounded-full text-xs font-semibold text-espresso-800 shadow-warm-sm">
            <span className="w-2 h-2 rounded-full bg-terracotta-500 animate-pulse" />
            <span>{t.hero.tagline}</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-espresso-900 leading-[1.15] tracking-tight">
            {t.hero.headline}
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-espresso-700 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
            {t.hero.subheadline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <Link
              href="/menu"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-terracotta-500 hover:bg-terracotta-600 text-white font-medium text-base px-7 py-3.5 rounded-2xl shadow-warm-md hover:shadow-warm-lg transition-all duration-200 transform active:scale-95 group"
            >
              <span>{t.hero.viewMenu}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-cream-100 hover:bg-cream-200 text-espresso-900 border border-cream-300 font-medium text-base px-6 py-3.5 rounded-2xl shadow-warm-sm hover:shadow-warm-md transition-all duration-200 transform active:scale-95"
            >
              <Compass className="w-4 h-4 text-terracotta-500" />
              <span>{t.hero.getDirections}</span>
            </a>
          </div>

          {/* Dynamic Interactive Badges (Opening Hours, Wi-Fi Quick Copy, Real Guest Reviews) */}
          <div className="pt-6 border-t border-cream-200/80 grid grid-cols-3 gap-3 text-left">
            {/* Hours */}
            <div className="flex items-center space-x-2.5 p-2.5 bg-cream-100/60 rounded-xl border border-cream-200/60">
              <div className="p-2 rounded-lg bg-cream-200/80 text-espresso-800">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-espresso-600 block">Часы работы</span>
                <span className="text-xs font-semibold text-espresso-900 line-clamp-1">
                  {settings?.openingHours || t.hero.hours}
                </span>
              </div>
            </div>

            {/* Quick Copy Wi-Fi Password Component */}
            <button
              onClick={handleCopyWifi}
              className="flex items-center space-x-2.5 p-2.5 bg-cream-100/60 hover:bg-cream-200/80 rounded-xl border border-cream-200/60 text-left transition-colors cursor-pointer group"
              title="Нажмите, чтобы скопировать пароль Wi-Fi"
            >
              <div className="p-2 rounded-lg bg-sage-500/10 text-sage-600 group-hover:scale-105 transition-transform">
                {wifiCopied ? <Check className="w-4 h-4 text-green-600" /> : <Wifi className="w-4 h-4" />}
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-espresso-600 block flex items-center">
                  {t.hero.wifi}
                  {!wifiCopied && <Copy className="w-2.5 h-2.5 ml-1 text-espresso-600 opacity-60" />}
                </span>
                <span className="text-xs font-semibold text-espresso-900 line-clamp-1">
                  {wifiCopied ? 'Пароль скопирован!' : settings?.wifiName || 'CoffeeBelt_Guest'}
                </span>
              </div>
            </button>

            {/* REAL Guest Rating Card -> Opens Reviews Modal on Click */}
            <button
              onClick={() => setReviewsModalOpen(true)}
              className="flex items-center space-x-2.5 p-2.5 bg-cream-100/60 hover:bg-cream-200/80 rounded-xl border border-cream-200/60 text-left transition-colors cursor-pointer group"
            >
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 group-hover:scale-105 transition-transform">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-espresso-600 block">{t.hero.rating}</span>
                <span className="text-xs font-semibold text-espresso-900 block">
                  ★ {realAvgRating} ({realTotalCount})
                </span>
              </div>
            </button>
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative"
        >
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="relative rounded-3xl overflow-hidden shadow-warm-lg border-4 border-cream-100 bg-cream-200 aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=900"
                alt="The Coffee Belt Tashkent Interior"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-5 left-5 right-5 bg-cream-50/90 backdrop-blur-md p-4 rounded-2xl border border-cream-200/80 shadow-warm-md flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-espresso-900">The Coffee Belt</h4>
                  <p className="text-xs text-espresso-700 mt-0.5">Oybek 12, Tashkent</p>
                </div>
                <span className="bg-sage-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                  Open Daily
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Reviews Modal */}
      <ReviewsModal
        isOpen={reviewsModalOpen}
        onClose={() => setReviewsModalOpen(false)}
        onReviewsUpdated={(avg, count) => {
          setRealAvgRating(avg);
          setRealTotalCount(count);
        }}
      />
    </section>
  );
}
