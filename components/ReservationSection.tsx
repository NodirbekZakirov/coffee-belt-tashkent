'use client';

import React, { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { useTranslation } from '@/components/LanguageContext';
import { Calendar, Users, Clock, CheckCircle2, Phone, User, FileText, LogIn } from 'lucide-react';

export function ReservationSection() {
  const { data: session } = useSession();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '2',
    date: new Date().toISOString().split('T')[0],
    time: '18:00',
    note: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (session?.user?.name) {
      setFormData((prev) => ({ ...prev, name: session.user?.name || '' }));
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      signIn('google');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to submit reservation');
      }

      // Micro-animation delight confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C86D51', '#2C4A3E', '#D49A4B', '#F7F3EC'],
      });

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setErrorMsg(t.reservation.errorText);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="reserve" className="py-24 bg-cream-50 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-cream-100/90 border border-cream-300 rounded-3xl p-6 sm:p-10 shadow-warm-lg">
          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="inline-flex items-center space-x-2 bg-cream-200 border border-cream-300 px-3.5 py-1 rounded-full text-xs font-semibold text-espresso-800 mb-3">
              <span>{t.reservation.badge}</span>
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-espresso-900 mb-2">
              {t.reservation.title}
            </h2>
            <p className="text-espresso-700 text-sm">{t.reservation.subtitle}</p>
          </div>

          {/* If NOT logged in: Prompt Google Sign-In */}
          {!session ? (
            <div className="text-center py-10 bg-cream-50 rounded-2xl border border-cream-300 max-w-md mx-auto space-y-4 p-6 shadow-warm-sm">
              <div className="w-12 h-12 rounded-full bg-terracotta-500/15 text-terracotta-500 flex items-center justify-center mx-auto">
                <LogIn className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-espresso-900">
                  {t.reservation.loginToBookTitle}
                </h3>
                <p className="text-xs text-espresso-600 mt-1">
                  {t.reservation.loginToBookDesc}
                </p>
              </div>

              <button
                onClick={() => signIn('google')}
                className="w-full flex items-center justify-center space-x-3 bg-white hover:bg-cream-100 text-espresso-900 border border-cream-300 font-bold text-sm py-3 px-4 rounded-xl shadow-warm-sm transition-all transform active:scale-95"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>{t.reservation.signInWithGoogle}</span>
              </button>
            </div>
          ) : submitted ? (
            /* Success confirmation screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-4"
            >
              <div className="w-16 h-16 bg-sage-500 text-white rounded-full flex items-center justify-center mx-auto shadow-warm-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-espresso-900">
                {t.reservation.successTitle}
              </h3>
              <p className="text-espresso-700 max-w-md mx-auto text-sm">
                {t.reservation.successDesc}
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: session?.user?.name || '',
                    phone: '',
                    guests: '2',
                    date: new Date().toISOString().split('T')[0],
                    time: '18:00',
                    note: '',
                  });
                }}
                className="mt-4 inline-flex items-center text-xs font-bold text-terracotta-500 hover:underline"
              >
                Забронировать ещё один стол
              </button>
            </motion.div>
          ) : (
            /* Reservation Form for Logged-In User */
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold uppercase text-espresso-800 mb-2 flex items-center">
                    <User className="w-3.5 h-3.5 mr-1 text-terracotta-500" />
                    {t.reservation.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.reservation.namePlaceholder}
                    className="w-full px-4 py-3 bg-cream-50 border border-cream-300 rounded-xl text-espresso-900 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500 transition-all"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold uppercase text-espresso-800 mb-2 flex items-center">
                    <Phone className="w-3.5 h-3.5 mr-1 text-terracotta-500" />
                    {t.reservation.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t.reservation.phonePlaceholder}
                    className="w-full px-4 py-3 bg-cream-50 border border-cream-300 rounded-xl text-espresso-900 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500 transition-all"
                  />
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-xs font-bold uppercase text-espresso-800 mb-2 flex items-center">
                    <Users className="w-3.5 h-3.5 mr-1 text-terracotta-500" />
                    {t.reservation.guestsLabel}
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-4 py-3 bg-cream-50 border border-cream-300 rounded-xl text-espresso-900 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500 transition-all"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'человек' : num < 5 ? 'человека' : 'человек'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-espresso-800 mb-2 flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-terracotta-500" />
                      {t.reservation.dateLabel}
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3 py-3 bg-cream-50 border border-cream-300 rounded-xl text-espresso-900 text-xs focus:outline-none focus:ring-2 focus:ring-terracotta-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-espresso-800 mb-2 flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1 text-terracotta-500" />
                      {t.reservation.timeLabel}
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-3 py-3 bg-cream-50 border border-cream-300 rounded-xl text-espresso-900 text-xs focus:outline-none focus:ring-2 focus:ring-terracotta-500 transition-all"
                    >
                      {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'].map(
                        (tStr) => (
                          <option key={tStr} value={tStr}>
                            {tStr}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>
              </div>

              {/* Note */}
              <div>
                <label className="block text-xs font-bold uppercase text-espresso-800 mb-2 flex items-center">
                  <FileText className="w-3.5 h-3.5 mr-1 text-terracotta-500" />
                  {t.reservation.noteLabel}
                </label>
                <textarea
                  rows={3}
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  placeholder={t.reservation.notePlaceholder}
                  className="w-full px-4 py-3 bg-cream-50 border border-cream-300 rounded-xl text-espresso-900 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500 transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-terracotta-500 hover:bg-terracotta-600 disabled:opacity-50 text-white font-bold text-base py-4 rounded-2xl shadow-warm-md hover:shadow-warm-lg transition-all duration-200 transform active:scale-[0.99] flex items-center justify-center space-x-2"
              >
                <span>{loading ? t.reservation.submitting : t.reservation.submitButton}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
