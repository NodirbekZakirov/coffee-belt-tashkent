'use client';

import React from 'react';
import Link from 'next/link';
import { X, Gift, QrCode, ArrowRight } from 'lucide-react';

interface PromoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PromoModal({ isOpen, onClose }: PromoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-espresso-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-cream-50 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-cream-300 relative space-y-6 text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-espresso-600 hover:text-espresso-900 rounded-full hover:bg-cream-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-terracotta-500/15 text-terracotta-500 flex items-center justify-center mx-auto shadow-warm-sm">
          <Gift className="w-7 h-7" />
        </div>

        <div>
          <h3 className="font-serif font-bold text-2xl text-espresso-900">
            Спецпредложение для гостей
          </h3>
          <p className="text-xs text-espresso-700 mt-1 leading-relaxed">
            Покажите этот QR-код бариста при заказе и получите <strong>скидку 10%</strong> на любой авторский десерт или бабл-ти!
          </p>
        </div>

        {/* QR Code Container */}
        <div className="bg-white p-6 rounded-2xl border border-cream-300 inline-block shadow-warm-sm mx-auto">
          <div className="w-36 h-36 bg-cream-100 rounded-xl flex flex-col items-center justify-center p-2 border border-dashed border-terracotta-500/50">
            <QrCode className="w-24 h-24 text-espresso-900" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta-500 mt-1">COFFEEBELT10</span>
          </div>
        </div>

        <div className="pt-2">
          <Link
            href="#reserve"
            onClick={onClose}
            className="w-full inline-flex items-center justify-center space-x-2 bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-warm-sm transition-all"
          >
            <span>Забронировать столик</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
