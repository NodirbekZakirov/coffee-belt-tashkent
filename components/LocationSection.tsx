'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/components/LanguageContext';
import { MapPin, Clock, Phone, Send, MessageCircle, Instagram, Compass } from 'lucide-react';

export function LocationSection() {
  const { t } = useTranslation();

  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=41.2974418,69.2740486';
  const whatsappUrl = 'https://wa.me/998771124054';
  const telegramUrl = 'https://t.me/the_CoffeBelt'; // User specified exact Telegram handle
  const instagramUrl = 'https://instagram.com/thecoffeebelt_uz';

  return (
    <section id="location" className="py-24 bg-cream-100/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-cream-200 border border-cream-300 px-3.5 py-1 rounded-full text-xs font-semibold text-espresso-800 mb-3">
            <span>{t.location.badge}</span>
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-espresso-900">
            {t.location.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-cream-50 rounded-3xl p-8 border border-cream-200 shadow-warm-md flex flex-col justify-between space-y-8"
          >
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-2xl bg-terracotta-500/10 text-terracotta-500 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-espresso-900">{t.location.addressLabel}</h4>
                  <p className="text-sm text-espresso-700 mt-1 leading-relaxed">{t.location.addressValue}</p>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-xs font-bold text-terracotta-500 hover:underline mt-2"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>{t.location.openInMaps}</span>
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-2xl bg-sage-500/10 text-sage-600 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-espresso-900">{t.location.hoursLabel}</h4>
                  <p className="text-sm text-espresso-700 mt-1">{t.location.hoursValue}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-espresso-900">{t.location.phoneLabel}</h4>
                  <a
                    href="tel:+998771124054"
                    className="text-sm font-semibold text-espresso-900 hover:text-terracotta-500 transition-colors mt-1 block"
                  >
                    +998 77 112 40 54
                  </a>
                </div>
              </div>
            </div>

            {/* Click-to-Chat Messengers */}
            <div className="pt-6 border-t border-cream-200">
              <h5 className="text-xs font-bold uppercase tracking-wider text-espresso-600 mb-3">
                {t.location.chatTitle}
              </h5>
              <div className="grid grid-cols-3 gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-1.5 p-3 rounded-2xl bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 text-xs font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-1.5 p-3 rounded-2xl bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 text-xs font-semibold transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Telegram</span>
                </a>

                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-1.5 p-3 rounded-2xl bg-pink-50 text-pink-700 hover:bg-pink-100 border border-pink-200 text-xs font-semibold transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Embedded Google Maps iframe */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 rounded-3xl overflow-hidden shadow-warm-md border border-cream-200 min-h-[380px] bg-cream-200"
          >
            <iframe
              title="The Coffee Belt Tashkent Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2997.4528187869675!2d69.2740486!3d41.2974418!2m3!1f0!f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8bfba760380b%3A0x3750d366e7bfa54e!2sThe%20Coffee%20Belt!5e0!3m2!1sen!2suz!4v1700000000000!5m2!1sen!2suz"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
