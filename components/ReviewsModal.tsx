'use client';

import React, { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useTranslation } from '@/components/LanguageContext';
import { Star, X, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

interface ReviewItem {
  id: string;
  userName: string;
  userEmail: string;
  userImage?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReviewsUpdated?: (avg: string, count: number) => void;
}

export function ReviewsModal({ isOpen, onClose, onReviewsUpdated }: ReviewsModalProps) {
  const { data: session } = useSession();
  const { t } = useTranslation();

  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [avgRating, setAvgRating] = useState('5.0');
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // New Review Form
  const [userRating, setUserRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const loadReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      if (data && Array.isArray(data.reviews)) {
        setReviews(data.reviews);
        setAvgRating(data.avgRating);
        setTotalCount(data.totalCount);
        if (onReviewsUpdated) {
          onReviewsUpdated(data.avgRating, data.totalCount);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadReviews();
    }
  }, [isOpen]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: userRating, comment }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to post review');
      }

      setSubmitted(true);
      setComment('');
      loadReviews();
    } catch (err: any) {
      setErrorMsg(err.message || 'Error posting review');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-espresso-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-cream-50 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-warm-lg border border-cream-300 overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 bg-cream-100 border-b border-cream-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-600 flex items-center justify-center font-bold">
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-espresso-900 leading-tight">
                {t.reviews.title}
              </h3>
              <div className="flex items-center space-x-2 text-xs font-semibold text-espresso-700 mt-0.5">
                <span className="text-amber-600 font-bold">★ {avgRating}</span>
                <span>•</span>
                <span>{totalCount} {totalCount === 1 ? 'отзыв' : totalCount < 5 ? 'отзыва' : 'отзывов'}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-espresso-600 hover:text-espresso-900 rounded-full hover:bg-cream-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="p-6 overflow-y-auto flex-grow space-y-6">
          {/* Submit Review Card */}
          <div className="bg-cream-100/90 border border-cream-200 p-5 rounded-2xl space-y-4">
            <h4 className="font-serif font-bold text-base text-espresso-900 flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-terracotta-500" />
              <span>{t.reviews.addReviewTitle}</span>
            </h4>

            {!session ? (
              <div className="text-center py-4 space-y-3">
                <p className="text-xs text-espresso-700">{t.reviews.mustLoginText}</p>
                <button
                  onClick={() => signIn('google')}
                  className="inline-flex items-center space-x-2 bg-white hover:bg-cream-50 text-espresso-900 border border-cream-300 font-bold text-xs px-4 py-2.5 rounded-xl shadow-warm-sm transition-all"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
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
              <div className="flex items-center space-x-2 text-sage-700 bg-sage-50 p-3 rounded-xl border border-sage-200 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-sage-600 flex-shrink-0" />
                <span>Спасибо! Ваш отзыв опубликован.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-3">
                {errorMsg && (
                  <div className="p-2.5 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                    {errorMsg}
                  </div>
                )}

                {/* Rating Picker */}
                <div className="flex items-center space-x-1">
                  <span className="text-xs font-bold text-espresso-800 mr-2">{t.reviews.ratingLabel}:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setUserRating(star)}
                      className="p-1 text-amber-500 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= userRating ? 'fill-amber-500 text-amber-500' : 'text-cream-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <textarea
                  rows={2}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={t.reviews.commentPlaceholder}
                  className="w-full p-3 bg-cream-50 border border-cream-300 rounded-xl text-xs text-espresso-900 focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                />

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center space-x-2 bg-terracotta-500 hover:bg-terracotta-600 disabled:opacity-50 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-warm-sm transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? t.reviews.submitting : t.reviews.submitReview}</span>
                </button>
              </form>
            )}
          </div>

          {/* List of Reviews */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-sm text-espresso-900 uppercase tracking-wider">
              Все отзывы гостей
            </h4>

            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 bg-cream-200/50 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : reviews.length === 0 ? (
              <p className="text-xs text-espresso-600 text-center py-6">{t.reviews.noReviewsYet}</p>
            ) : (
              <div className="space-y-3">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 bg-cream-100/60 border border-cream-200 rounded-2xl space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <img
                          src={rev.userImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'}
                          alt={rev.userName}
                          className="w-7 h-7 rounded-full object-cover border border-cream-300"
                        />
                        <span className="font-bold text-xs text-espresso-900">{rev.userName}</span>
                      </div>

                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3.5 h-3.5 ${
                              star <= rev.rating ? 'fill-amber-500 text-amber-500' : 'text-cream-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-espresso-800 leading-relaxed">{rev.comment}</p>
                    <span className="text-[10px] text-espresso-600 block">
                      {new Date(rev.createdAt).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
