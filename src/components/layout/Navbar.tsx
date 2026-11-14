'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  ChefHat, 
  Search, 
  Globe, 
  Heart, 
  User as UserIcon, 
  Menu, 
  X, 
  ShieldCheck, 
  LogOut,
  UtensilsCrossed
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useKitchen } from '@/context/KitchenContext';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const { user, isAdmin, logout, demoLoginAsAdmin, demoLoginAsUser } = useAuth();
  const { favorites } = useKitchen();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { href: '/', label: t('navHome') },
    { href: '/explore', label: t('navExplore') },
    { href: '/categories', label: t('navCategories') },
    { href: '/what-can-i-cook', label: t('navWhatCanICook') },
    { href: '/cooking-guide', label: t('navGuide') },
    { href: '/my-kitchen', label: t('navMyKitchen') },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F2]/95 backdrop-blur-md border-b border-[#EAE7DF] transition-all">
      {/* Brand Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          
          {/* Logo & Parent attribution */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-deep-green flex items-center justify-center text-white shadow-subtle group-hover:scale-105 transition-transform">
              <ChefHat className="w-6 h-6 text-peach" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-deep-green">
                  Cook With Krushi
                </span>
                <span className="hidden sm:inline-block text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-sage-100 text-deep-green border border-sage-200">
                  Culinary Hub
                </span>
              </div>
              <p className="text-[11px] text-charcoal-muted tracking-wide flex items-center gap-1 font-medium">
                Cook. Learn. Enjoy. • <span className="text-terracotta font-semibold">Damayanti Tech</span>
              </p>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-[#E0DCCE] rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-charcoal shadow-sm transition-all"
              />
              <Search className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-2.5" />
            </form>
          </div>

          {/* Right Controls: Language, Favourites, User */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Switcher */}
            <div className="relative inline-flex items-center bg-white border border-[#E0DCCE] rounded-full p-0.5 shadow-sm">
              <Globe className="w-3.5 h-3.5 text-primary ml-2 mr-1 shrink-0" />
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all ${
                  language === 'en'
                    ? 'bg-deep-green text-white shadow-sm'
                    : 'text-charcoal-muted hover:text-charcoal'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('te')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all ${
                  language === 'te'
                    ? 'bg-deep-green text-white shadow-sm'
                    : 'text-charcoal-muted hover:text-charcoal font-telugu'
                }`}
              >
                తెలుగు
              </button>
            </div>

            {/* Favourites Quick Link */}
            <Link
              href="/favorites"
              aria-label="Favorites"
              className="relative p-2 rounded-full text-charcoal-muted hover:text-terracotta hover:bg-white border border-transparent hover:border-[#E0DCCE] transition-all"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-terracotta text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* User Account / Profile Menu */}
            <div className="relative">
              {user ? (
                <div>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 pl-2.5 rounded-full bg-white border border-[#E0DCCE] hover:border-primary transition-all text-xs font-medium text-charcoal shadow-sm"
                  >
                    <span className="max-w-[90px] truncate hidden sm:inline">{user.displayName}</span>
                    <div className="w-7 h-7 rounded-full bg-sage-200 text-deep-green flex items-center justify-center font-bold text-xs">
                      {user.displayName.charAt(0).toUpperCase()}
                    </div>
                  </button>

                  {userDropdownOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-lifted border border-[#EAE7DF] py-2 z-50 animate-in fade-in slide-in-from-top-2"
                      onMouseLeave={() => setUserDropdownOpen(false)}
                    >
                      <div className="px-4 py-2 border-b border-[#EAE7DF]">
                        <p className="text-xs text-charcoal-muted font-medium">Signed in as</p>
                        <p className="text-sm font-bold text-charcoal truncate">{user.displayName}</p>
                        <p className="text-[11px] text-charcoal-muted truncate">{user.email}</p>
                        {isAdmin && (
                          <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold uppercase tracking-wider text-deep-green bg-sage-100 px-2 py-0.5 rounded-full">
                            <ShieldCheck className="w-3 h-3" /> Admin
                          </span>
                        )}
                      </div>

                      <Link
                        href="/my-kitchen"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-charcoal hover:bg-sage-50 transition-colors"
                      >
                        <UtensilsCrossed className="w-4 h-4 text-primary" /> {t('navMyKitchen')}
                      </Link>

                      <Link
                        href="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-charcoal hover:bg-sage-50 transition-colors"
                      >
                        <UserIcon className="w-4 h-4 text-primary" /> {t('navProfile')}
                      </Link>

                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-deep-green bg-sage-50 hover:bg-sage-100 transition-colors"
                        >
                          <ShieldCheck className="w-4 h-4 text-deep-green" /> {t('navAdmin')}
                        </Link>
                      )}

                      <div className="border-t border-[#EAE7DF] my-1"></div>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> {t('navLogout')}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <Link
                    href="/login"
                    className="text-xs font-semibold px-3 py-1.5 rounded-full text-deep-green hover:bg-sage-100 transition-colors"
                  >
                    {t('navLogin')}
                  </Link>
                  <Link
                    href="/register"
                    className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-deep-green hover:bg-deep-hover text-white transition-all shadow-sm"
                  >
                    {t('navRegister')}
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-charcoal hover:bg-sage-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center justify-between border-t border-[#EAE7DF]/70 py-2.5">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-deep-green relative py-1 ${
                    isActive(link.href)
                      ? 'text-deep-green font-semibold'
                      : 'text-charcoal-muted'
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center gap-1.5 text-xs font-bold text-deep-green bg-sage-100 hover:bg-sage-200 px-3 py-1 rounded-full border border-sage-200 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                {t('navAdmin')}
              </Link>
            )}
            
            {/* Quick Demo Switcher if not configured or for quick testing */}
            {!user && (
              <div className="flex items-center gap-1 text-[11px] text-charcoal-muted bg-white border border-[#EAE7DF] px-2 py-0.5 rounded-full">
                <span>Demo:</span>
                <button
                  onClick={demoLoginAsAdmin}
                  className="font-bold text-deep-green hover:underline"
                >
                  Admin
                </button>
                <span>|</span>
                <button
                  onClick={demoLoginAsUser}
                  className="font-bold text-primary hover:underline"
                >
                  User
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#EAE7DF] px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200">
          <form onSubmit={handleSearchSubmit} className="relative w-full mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border border-[#E0DCCE] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-charcoal"
            />
            <Search className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-3.5" />
          </form>

          <ul className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive(link.href)
                      ? 'bg-sage-100 text-deep-green font-bold'
                      : 'text-charcoal hover:bg-sage-50'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {isAdmin && (
              <li>
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-deep-green bg-sage-100"
                >
                  <ShieldCheck className="w-4 h-4" /> {t('navAdmin')}
                </Link>
              </li>
            )}
          </ul>

          {!user && (
            <div className="mt-4 pt-4 border-t border-[#EAE7DF] flex items-center justify-between text-xs text-charcoal-muted">
              <span>Quick Test Sign-in:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    demoLoginAsAdmin();
                    setMobileMenuOpen(false);
                  }}
                  className="px-2.5 py-1 bg-sage-100 text-deep-green font-bold rounded-lg"
                >
                  Admin Mode
                </button>
                <button
                  onClick={() => {
                    demoLoginAsUser();
                    setMobileMenuOpen(false);
                  }}
                  className="px-2.5 py-1 bg-peach/40 text-charcoal font-bold rounded-lg"
                >
                  User Mode
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
