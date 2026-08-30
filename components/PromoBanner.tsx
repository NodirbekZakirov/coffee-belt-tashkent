'use client';

import React, { useEffect, useState } from 'react';
import { PromoModal } from '@/components/PromoModal';
import { X, Gift } from 'lucide-react';

export function PromoBanner() {
  const [banner, setBanner] = useState<{ active: boolean; text: string } | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.bannerActive && data.bannerText) {
          setBanner({ active: data.bannerActive, text: data.bannerText });
        }
      })
      .catch(() => null);
  }, []);

  if (!banner || !banner.active || dismissed) return null;

  return (
    <>
      <div className="bg-gradient-to-r from-terracotta-500 via-amber-500 to-terracotta-600 text-white text-xs sm:text-sm py-2 px-4 shadow-sm relative flex items-center justify-center font-medium">
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center space-x-2 text-center hover:underline cursor-pointer"
        >
          <Gift className="w-4 h-4 text-amber-200 animate-bounce flex-shrink-0" />
          <span>{banner.text}</span>
          <span className="bg-white/20 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ml-2">
            Подробнее
          </span>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setDismissed(true);
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
          aria-label="Close announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <PromoModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
