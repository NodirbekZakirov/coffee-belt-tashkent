'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useTranslation } from '@/components/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Menu as MenuIcon, X, Calendar, User, LogOut, ShieldCheck } from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = pathname === '/';
  const getNavHref = (anchor: string) => (isHomePage ? `#${anchor}` : `/#${anchor}`);

  const navLinks = [
    { href: getNavHref('about'), label: t.nav.about },
    { href: '/menu', label: t.nav.menu },
    { href: getNavHref('gallery'), label: t.nav.gallery },
    { href: getNavHref('reserve'), label: t.nav.games },
    { href: getNavHref('location'), label: t.nav.location },
  ];

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'iceone843@gmail.com';
  const isAdmin = session?.user?.email?.trim().toLowerCase() === adminEmail.trim().toLowerCase();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream-50/90 backdrop-blur-md shadow-warm-sm border-b border-cream-200/80 py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <img
            src="/images/logo.png"
            alt="The Coffee Belt Tashkent Logo"
            className="w-10 h-10 object-contain rounded-full border border-cream-300 bg-white p-0.5 group-hover:scale-105 transition-transform duration-200 shadow-warm-sm"
          />
          <div>
            <span className="font-serif font-bold text-xl text-espresso-900 tracking-tight block leading-none">
              The Coffee Belt
            </span>
            <span className="text-[10px] uppercase tracking-widest text-espresso-600 font-medium block mt-0.5">
              Tashkent • Specialty
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-espresso-800 hover:text-terracotta-500 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Header Actions: Compact Hover Language Switcher + User Profile + Booking CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <LanguageSwitcher />

          {/* User Auth Profile Dropdown */}
          {session?.user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-2 bg-cream-100 border border-cream-300 p-1 pr-3 rounded-full hover:bg-cream-200 transition-colors"
              >
                <img
                  src={session.user.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'}
                  alt={session.user.name || 'User'}
                  className="w-7 h-7 rounded-full object-cover border border-cream-300"
                />
                <span className="text-xs font-bold text-espresso-900 max-w-[100px] truncate">
                  {session.user.name?.split(' ')[0]}
                </span>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-cream-50 rounded-2xl shadow-warm-lg border border-cream-300 p-2 space-y-1 text-xs z-50 animate-fade-up">
                  <div className="px-3 py-2 border-b border-cream-200">
                    <p className="font-bold text-espresso-900 truncate">{session.user.name}</p>
                    <p className="text-[10px] text-espresso-600 truncate">{session.user.email}</p>
                  </div>

                  {isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center space-x-2 px-3 py-2 text-terracotta-600 font-bold hover:bg-cream-100 rounded-xl transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 text-terracotta-500" />
                      <span>{t.nav.adminPanel}</span>
                    </Link>
                  )}

                  <button
                    onClick={() => signOut()}
                    className="w-full text-left flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t.nav.signOut}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => signIn('google')}
              className="inline-flex items-center space-x-1.5 bg-cream-100 hover:bg-cream-200 border border-cream-300 text-espresso-900 text-xs font-bold px-3.5 py-2 rounded-full transition-colors"
            >
              <User className="w-3.5 h-3.5 text-espresso-700" />
              <span>{t.nav.signIn}</span>
            </button>
          )}

          {/* Table Reservation CTA */}
          <Link
            href={getNavHref('reserve')}
            className="inline-flex items-center space-x-2 bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-warm-sm hover:shadow-warm-md transition-all duration-200 transform active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            <span>{t.nav.reserve}</span>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center space-x-3">
          <LanguageSwitcher />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-espresso-900 hover:text-terracotta-500 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cream-50/98 backdrop-blur-xl border-b border-cream-200 px-6 py-6 space-y-4 shadow-warm-lg animate-fade-up">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-espresso-900 hover:text-terracotta-500 py-1"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-cream-200 flex flex-col space-y-3">
            {session ? (
              <button
                onClick={() => signOut()}
                className="w-full text-center bg-cream-200 text-espresso-900 font-bold py-2.5 rounded-xl text-sm"
              >
                {t.nav.signOut} ({session.user?.name})
              </button>
            ) : (
              <button
                onClick={() => signIn('google')}
                className="w-full text-center bg-cream-200 text-espresso-900 font-bold py-2.5 rounded-xl text-sm"
              >
                {t.nav.signIn} через Google
              </button>
            )}

            <Link
              href={getNavHref('reserve')}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-terracotta-500 text-white font-semibold py-3 rounded-xl shadow-warm-sm"
            >
              {t.nav.reserve}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
