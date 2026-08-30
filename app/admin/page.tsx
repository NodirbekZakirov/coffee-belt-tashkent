'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import {
  Coffee,
  Calendar,
  Layers,
  Settings,
  Mail,
  Plus,
  Trash2,
  Edit2,
  LogOut,
  ArrowLeft,
  Download,
  Wifi,
  Star,
  Clock,
  Upload,
  MessageSquare,
  Image as ImageIcon,
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  order: number;
  _count?: { items: number };
}

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  isAvailable: boolean;
  categoryId: string;
  category?: Category;
}

interface Reservation {
  id: string;
  name: string;
  phone: string;
  guests: number;
  date: string;
  note?: string;
  status: string;
  createdAt: string;
}

interface ReviewItem {
  id: string;
  userName: string;
  userEmail: string;
  userImage?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface Subscriber {
  id: string;
  email: string;
  createdAt: string;
}

interface Settings {
  bannerText: string;
  bannerActive: boolean;
  openingHours: string;
  wifiName: string;
  wifiPassword: string;
  ratingValue: string;
  ratingCount: string;
}

export default function AdminDashboardPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<'menu' | 'categories' | 'reservations' | 'reviews' | 'newsletter' | 'settings'>('menu');

  // Data states
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [settings, setSettings] = useState<Settings>({
    bannerText: '',
    bannerActive: false,
    openingHours: 'Ежедневно 07:30 – 22:00',
    wifiName: 'CoffeeBelt_Guest',
    wifiPassword: 'coffeebelt2026',
    ratingValue: '4.9',
    ratingCount: '98+',
  });

  // Modal / Form state for Menu Item
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [itemForm, setItemForm] = useState({
    name: '',
    description: '',
    price: 35000,
    imageUrl: '',
    categoryId: '',
    isAvailable: true,
  });

  // Category Modal Form
  const [catModalOpen, setCatModalOpen] = useState(false);
  const [catForm, setCatForm] = useState({ name: '', order: 0 });

  // Load All Data
  const fetchData = async () => {
    try {
      const [mRes, cRes, rRes, revRes, nRes, sRes] = await Promise.all([
        fetch('/api/menu').then((r) => r.json()),
        fetch('/api/categories').then((r) => r.json()),
        fetch('/api/reservations').then((r) => r.json()),
        fetch('/api/reviews').then((r) => r.json()),
        fetch('/api/newsletter').then((r) => r.json()),
        fetch('/api/settings').then((r) => r.json()),
      ]);

      if (Array.isArray(mRes)) setMenuItems(mRes);
      if (Array.isArray(cRes)) {
        setCategories(cRes);
        if (cRes.length > 0 && !itemForm.categoryId) {
          setItemForm((prev) => ({ ...prev, categoryId: cRes[0].id }));
        }
      }
      if (Array.isArray(rRes)) setReservations(rRes);
      if (revRes && Array.isArray(revRes.reviews)) setReviews(revRes.reviews);
      if (Array.isArray(nRes)) setSubscribers(nRes);
      if (sRes && !sRes.error) setSettings(sRes);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Device Photo Upload Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        setItemForm((prev) => ({ ...prev, imageUrl: data.url }));
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploadingImage(false);
    }
  };

  // Save Menu Item
  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingItem ? `/api/menu/${editingItem.id}` : '/api/menu';
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemForm),
      });

      if (res.ok) {
        setItemModalOpen(false);
        setEditingItem(null);
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Menu Item
  const handleDeleteItem = async (id: string) => {
    if (!confirm('Удалить эту позицию из меню?')) return;
    await fetch(`/api/menu/${id}`, { method: 'DELETE' });
    fetchData();
  };

  // Save Category
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(catForm),
    });
    setCatModalOpen(false);
    setCatForm({ name: '', order: 0 });
    fetchData();
  };

  // Delete Category
  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Удалить категорию? Позиции в ней также будут удалены.')) return;
    await fetch(`/api/categories/${id}`, { method: 'DELETE' });
    fetchData();
  };

  // Update Reservation Status
  const handleUpdateReservationStatus = async (id: string, status: string) => {
    await fetch(`/api/reservations/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchData();
  };

  // Delete Review
  const handleDeleteReview = async (id: string) => {
    if (!confirm('Удалить этот отзыв?')) return;
    await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
    fetchData();
  };

  // Save Site Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    alert('Настройки успешно сохранены!');
    fetchData();
  };

  // Export Newsletter CSV
  const handleExportCSV = () => {
    if (subscribers.length === 0) return alert('Список подписок пуст');
    const headers = 'Email,Date Signed Up\n';
    const rows = subscribers.map((s) => `"${s.email}","${new Date(s.createdAt).toLocaleString()}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `the-coffee-belt-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col font-sans">
      {/* Admin Header */}
      <header className="bg-cream-100 border-b border-cream-300 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <img
            src="/images/logo.png"
            alt="The Coffee Belt Logo"
            className="w-9 h-9 object-contain rounded-full border border-cream-300 bg-white p-0.5"
          />
          <div>
            <h1 className="font-serif font-bold text-lg text-espresso-900 leading-none">
              The Coffee Belt — Управление
            </h1>
            <span className="text-[10px] text-espresso-600">Панель Администратора</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="hidden sm:inline-flex items-center space-x-1 text-xs font-semibold text-espresso-700 hover:text-terracotta-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>На сайт</span>
          </Link>

          {session?.user && (
            <div className="flex items-center space-x-3 bg-cream-200/80 px-3 py-1.5 rounded-full border border-cream-300">
              {session.user.image && (
                <img src={session.user.image} alt="User avatar" className="w-6 h-6 rounded-full" />
              )}
              <span className="text-xs font-bold text-espresso-900 hidden md:inline">
                {session.user.email}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="text-xs text-red-600 hover:underline flex items-center space-x-1"
                title="Выйти"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Admin Content */}
      <div className="flex-grow max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto border-b border-cream-300 pb-2">
          {[
            { id: 'menu', label: 'Позиции Меню', icon: Coffee, count: menuItems.length },
            { id: 'categories', label: 'Категории', icon: Layers, count: categories.length },
            { id: 'reservations', label: 'Брони Столов', icon: Calendar, count: reservations.length },
            { id: 'reviews', label: 'Отзывы Гостей', icon: MessageSquare, count: reviews.length },
            { id: 'newsletter', label: 'Рассылка', icon: Mail, count: subscribers.length },
            { id: 'settings', label: 'Настройки Сайта', icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-espresso-900 text-white shadow-warm-sm'
                  : 'bg-cream-100 text-espresso-700 hover:bg-cream-200 border border-cream-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="ml-1 text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* TAB 1: MENU ITEMS */}
        {activeTab === 'menu' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif font-bold text-xl text-espresso-900">Управление Позициями Меню</h2>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setItemForm({
                    name: '',
                    description: '',
                    price: 35000,
                    imageUrl: '',
                    categoryId: categories[0]?.id || '',
                    isAvailable: true,
                  });
                  setItemModalOpen(true);
                }}
                className="inline-flex items-center space-x-1.5 bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-warm-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Добавить позицию</span>
              </button>
            </div>

            <div className="bg-cream-100 border border-cream-300 rounded-3xl overflow-hidden shadow-warm-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-cream-200 text-espresso-800 font-bold uppercase text-[10px] border-b border-cream-300">
                    <tr>
                      <th className="p-4">Фото</th>
                      <th className="p-4">Название</th>
                      <th className="p-4">Категория</th>
                      <th className="p-4">Цена (сум)</th>
                      <th className="p-4">Статус</th>
                      <th className="p-4 text-right">Действия</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream-200">
                    {menuItems.map((item) => (
                      <tr key={item.id} className="hover:bg-cream-50 transition-colors">
                        <td className="p-4">
                          <img
                            src={item.imageUrl || 'https://placehold.co/100'}
                            alt={item.name}
                            className="w-12 h-12 rounded-xl object-cover border border-cream-300"
                          />
                        </td>
                        <td className="p-4">
                          <span className="font-bold text-espresso-900 block">{item.name}</span>
                          <span className="text-[11px] text-espresso-600 line-clamp-1">{item.description}</span>
                        </td>
                        <td className="p-4">
                          <span className="bg-cream-200 px-2.5 py-1 rounded-full text-[11px] font-semibold text-espresso-800">
                            {item.category?.name?.split('/')[0] || 'Uncategorized'}
                          </span>
                        </td>
                        <td className="p-4 font-bold text-espresso-900">
                          {item.price.toLocaleString('ru-RU')} сум
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              item.isAvailable ? 'bg-sage-500/15 text-sage-700' : 'bg-red-500/15 text-red-700'
                            }`}
                          >
                            {item.isAvailable ? 'В наличии' : 'Нет на складе'}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => {
                              setEditingItem(item);
                              setItemForm({
                                name: item.name,
                                description: item.description || '',
                                price: item.price,
                                imageUrl: item.imageUrl || '',
                                categoryId: item.categoryId,
                                isAvailable: item.isAvailable,
                              });
                              setItemModalOpen(true);
                            }}
                            className="p-2 text-espresso-700 hover:text-terracotta-500 bg-cream-200 rounded-xl"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-2 text-red-600 hover:text-red-800 bg-red-50 rounded-xl"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CATEGORIES */}
        {activeTab === 'categories' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif font-bold text-xl text-espresso-900">Управление Категориями</h2>
              <button
                onClick={() => setCatModalOpen(true)}
                className="inline-flex items-center space-x-1.5 bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-warm-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Создать категорию</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-cream-100 border border-cream-300 rounded-2xl p-4 shadow-warm-sm flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-serif font-bold text-base text-espresso-900">{cat.name}</h3>
                    <p className="text-xs text-espresso-600 mt-0.5">
                      Позиций: {cat._count?.items || 0} • Порядок: {cat.order}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-xl"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: RESERVATIONS */}
        {activeTab === 'reservations' && (
          <div className="space-y-4">
            <h2 className="font-serif font-bold text-xl text-espresso-900">Бронирования Столов</h2>
            <div className="bg-cream-100 border border-cream-300 rounded-3xl overflow-hidden shadow-warm-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-cream-200 text-espresso-800 font-bold uppercase text-[10px] border-b border-cream-300">
                    <tr>
                      <th className="p-4">Имя & Телефон</th>
                      <th className="p-4">Гостей</th>
                      <th className="p-4">Дата & Время</th>
                      <th className="p-4">Пожелания</th>
                      <th className="p-4">Статус</th>
                      <th className="p-4 text-right">Изменить статус</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream-200">
                    {reservations.map((res) => (
                      <tr key={res.id} className="hover:bg-cream-50 transition-colors">
                        <td className="p-4">
                          <span className="font-bold text-espresso-900 block">{res.name}</span>
                          <a href={`tel:${res.phone}`} className="text-[11px] text-terracotta-500 font-semibold">
                            {res.phone}
                          </a>
                        </td>
                        <td className="p-4 font-bold">{res.guests} чел.</td>
                        <td className="p-4 text-espresso-800">
                          {new Date(res.date).toLocaleString('ru-RU', {
                            day: '2-digit',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                        <td className="p-4 text-espresso-600 max-w-xs truncate">{res.note || '—'}</td>
                        <td className="p-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              res.status === 'confirmed'
                                ? 'bg-sage-500/20 text-sage-700'
                                : res.status === 'cancelled'
                                ? 'bg-red-500/20 text-red-700'
                                : 'bg-amber-500/20 text-amber-700 animate-pulse'
                            }`}
                          >
                            {res.status === 'confirmed'
                              ? 'Подтверждено'
                              : res.status === 'cancelled'
                              ? 'Отменено'
                              : 'Ожидает'}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => handleUpdateReservationStatus(res.id, 'confirmed')}
                            className="p-1.5 bg-sage-600 text-white rounded-lg text-[10px] font-bold hover:bg-sage-700"
                          >
                            Подтвердить
                          </button>
                          <button
                            onClick={() => handleUpdateReservationStatus(res.id, 'cancelled')}
                            className="p-1.5 bg-red-600 text-white rounded-lg text-[10px] font-bold hover:bg-red-700"
                          >
                            Отменить
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: REVIEWS MODERATION */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <h2 className="font-serif font-bold text-xl text-espresso-900">Модерация Отзывов</h2>
            <div className="bg-cream-100 border border-cream-300 rounded-3xl overflow-hidden shadow-warm-sm p-4 space-y-3">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="flex items-start justify-between p-4 bg-cream-50 rounded-2xl border border-cream-200"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-xs text-espresso-900">{rev.userName}</span>
                      <span className="text-[10px] text-espresso-600">({rev.userEmail})</span>
                      <div className="flex items-center space-x-1 ml-2">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${
                              s <= rev.rating ? 'fill-amber-500 text-amber-500' : 'text-cream-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-espresso-800 leading-relaxed">{rev.comment}</p>
                    <span className="text-[10px] text-espresso-600 block">
                      {new Date(rev.createdAt).toLocaleString('ru-RU')}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDeleteReview(rev.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-xl"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: NEWSLETTER */}
        {activeTab === 'newsletter' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif font-bold text-xl text-espresso-900">Подписчики на рассылку</h2>
              <button
                onClick={handleExportCSV}
                className="inline-flex items-center space-x-1.5 bg-espresso-900 hover:bg-espresso-800 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-warm-sm"
              >
                <Download className="w-4 h-4" />
                <span>Скачать CSV</span>
              </button>
            </div>

            <div className="bg-cream-100 border border-cream-300 rounded-3xl p-4 shadow-warm-sm space-y-2">
              {subscribers.map((sub) => (
                <div
                  key={sub.id}
                  className="flex items-center justify-between p-3 bg-cream-50 rounded-xl border border-cream-200 text-xs"
                >
                  <span className="font-bold text-espresso-900">{sub.email}</span>
                  <span className="text-espresso-600 text-[11px]">
                    {new Date(sub.createdAt).toLocaleDateString('ru-RU')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: SITE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-3xl">
            <h2 className="font-serif font-bold text-xl text-espresso-900">Настройки Сайта</h2>

            <form onSubmit={handleSaveSettings} className="bg-cream-100 border border-cream-300 rounded-3xl p-6 shadow-warm-sm space-y-6">
              {/* Promo Banner Settings */}
              <div className="space-y-3 pb-6 border-b border-cream-300">
                <h3 className="font-serif font-bold text-base text-espresso-900">
                  Баннер Акции в шапке
                </h3>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="bannerActive"
                    checked={settings.bannerActive}
                    onChange={(e) => setSettings({ ...settings, bannerActive: e.target.checked })}
                    className="w-4 h-4 text-terracotta-500 rounded accent-terracotta-500"
                  />
                  <label htmlFor="bannerActive" className="text-xs font-bold text-espresso-900">
                    Показывать баннер
                  </label>
                </div>
                <input
                  type="text"
                  value={settings.bannerText || ''}
                  onChange={(e) => setSettings({ ...settings, bannerText: e.target.value })}
                  placeholder="Текст акции..."
                  className="w-full px-4 py-2.5 bg-cream-50 border border-cream-300 rounded-xl text-xs text-espresso-900"
                />
              </div>

              {/* Opening Hours */}
              <div className="space-y-3 pb-6 border-b border-cream-300">
                <h3 className="font-serif font-bold text-base text-espresso-900">
                  Часы работы
                </h3>
                <input
                  type="text"
                  value={settings.openingHours}
                  onChange={(e) => setSettings({ ...settings, openingHours: e.target.value })}
                  className="w-full px-4 py-2.5 bg-cream-50 border border-cream-300 rounded-xl text-xs text-espresso-900"
                />
              </div>

              {/* Wi-Fi Settings */}
              <div className="space-y-3 pb-6 border-b border-cream-300">
                <h3 className="font-serif font-bold text-base text-espresso-900">
                  Параметры Wi-Fi для гостей
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-espresso-700 mb-1">Имя сети (SSID)</label>
                    <input
                      type="text"
                      value={settings.wifiName}
                      onChange={(e) => setSettings({ ...settings, wifiName: e.target.value })}
                      className="w-full px-3 py-2 bg-cream-50 border border-cream-300 rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-espresso-700 mb-1">Пароль</label>
                    <input
                      type="text"
                      value={settings.wifiPassword}
                      onChange={(e) => setSettings({ ...settings, wifiPassword: e.target.value })}
                      className="w-full px-3 py-2 bg-cream-50 border border-cream-300 rounded-xl text-xs"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-xs px-6 py-3 rounded-2xl shadow-warm-sm"
              >
                Сохранить настройки
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Menu Item Editor Modal with Device Photo Upload */}
      {itemModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-cream-50 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-cream-300">
            <h3 className="font-serif font-bold text-lg text-espresso-900">
              {editingItem ? 'Редактировать позицию' : 'Новая позиция меню'}
            </h3>
            <form onSubmit={handleSaveItem} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Название</label>
                <input
                  type="text"
                  required
                  value={itemForm.name}
                  onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                  className="w-full p-2.5 bg-cream-100 border border-cream-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Описание</label>
                <textarea
                  rows={2}
                  value={itemForm.description}
                  onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
                  className="w-full p-2.5 bg-cream-100 border border-cream-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">Цена (сум)</label>
                  <input
                    type="number"
                    required
                    value={itemForm.price}
                    onChange={(e) => setItemForm({ ...itemForm, price: Number(e.target.value) })}
                    className="w-full p-2.5 bg-cream-100 border border-cream-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Категория</label>
                  <select
                    value={itemForm.categoryId}
                    onChange={(e) => setItemForm({ ...itemForm, categoryId: e.target.value })}
                    className="w-full p-2.5 bg-cream-100 border border-cream-300 rounded-xl"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Photo Upload from Device Feature */}
              <div className="space-y-2">
                <label className="block font-bold mb-1">Фотография блюда / напитка</label>
                <div className="flex items-center space-x-3">
                  <label className="cursor-pointer inline-flex items-center space-x-2 bg-cream-200 hover:bg-cream-300 text-espresso-900 border border-cream-300 font-bold px-4 py-2.5 rounded-xl transition-colors">
                    <Upload className="w-4 h-4 text-terracotta-500" />
                    <span>{uploadingImage ? 'Загрузка...' : 'Загрузить фото с устройства'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-[10px] text-espresso-600">или вставьте URL</span>
                </div>

                <input
                  type="text"
                  value={itemForm.imageUrl}
                  onChange={(e) => setItemForm({ ...itemForm, imageUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full p-2 bg-cream-100 border border-cream-300 rounded-xl text-[11px]"
                />

                {itemForm.imageUrl && (
                  <div className="mt-2 flex items-center space-x-3 bg-cream-100 p-2 rounded-xl border border-cream-300">
                    <img
                      src={itemForm.imageUrl}
                      alt="Preview"
                      className="w-10 h-10 object-cover rounded-lg"
                    />
                    <span className="text-[10px] text-espresso-700 truncate">{itemForm.imageUrl}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="avail"
                  checked={itemForm.isAvailable}
                  onChange={(e) => setItemForm({ ...itemForm, isAvailable: e.target.checked })}
                />
                <label htmlFor="avail" className="font-bold">
                  В наличии
                </label>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-cream-300">
                <button
                  type="button"
                  onClick={() => setItemModalOpen(false)}
                  className="px-4 py-2 bg-cream-200 font-bold rounded-xl"
                >
                  Отмена
                </button>
                <button type="submit" className="px-5 py-2 bg-terracotta-500 text-white font-bold rounded-xl">
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {catModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-cream-50 rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 border border-cream-300 text-xs">
            <h3 className="font-serif font-bold text-lg text-espresso-900">Новая Категория</h3>
            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div>
                <label className="block font-bold mb-1">Название категории</label>
                <input
                  type="text"
                  required
                  value={catForm.name}
                  onChange={(e) => setCatForm({ ...catForm, name: e.target.value })}
                  placeholder="например: Авторский Чай"
                  className="w-full p-2.5 bg-cream-100 border border-cream-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">Порядок сортировки (число)</label>
                <input
                  type="number"
                  value={catForm.order}
                  onChange={(e) => setCatForm({ ...catForm, order: Number(e.target.value) })}
                  className="w-full p-2.5 bg-cream-100 border border-cream-300 rounded-xl"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCatModalOpen(false)}
                  className="px-4 py-2 bg-cream-200 rounded-xl font-bold"
                >
                  Отмена
                </button>
                <button type="submit" className="px-4 py-2 bg-terracotta-500 text-white font-bold rounded-xl">
                  Создать
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
