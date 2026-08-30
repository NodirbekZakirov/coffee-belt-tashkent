'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/components/LanguageContext';
import { Mail, CheckCircle2 } from 'lucide-react';

export function NewsletterSection() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSuccess(true);
        setEmail('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-espresso-900 text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-terracotta-500/20 text-terracotta-500 flex items-center justify-center mx-auto">
          <Mail className="w-6 h-6" />
        </div>

        <h3 className="font-serif font-bold text-2xl sm:text-3xl text-cream-50">
          {t.newsletter.title}
        </h3>

        <p className="text-cream-200/80 text-sm max-w-lg mx-auto leading-relaxed">
          {t.newsletter.subtitle}
        </p>

        {success ? (
          <div className="inline-flex items-center space-x-2 bg-sage-600/30 text-sage-200 border border-sage-500/40 px-6 py-3 rounded-full text-sm font-semibold">
            <CheckCircle2 className="w-4 h-4 text-sage-400" />
            <span>{t.newsletter.success}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.newsletter.placeholder}
              className="w-full px-4 py-3 bg-espresso-800/80 border border-espresso-700 rounded-2xl text-cream-50 text-sm placeholder-cream-400/50 focus:outline-none focus:ring-2 focus:ring-terracotta-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-warm-sm transition-all"
            >
              {t.newsletter.button}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
