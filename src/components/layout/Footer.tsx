'use client';

import React from 'react';
import Link from 'next/link';
import { ChefHat, Shield, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-[#EAE7DF] pt-14 pb-20 lg:pb-12 text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-deep-green flex items-center justify-center text-white shadow-subtle">
                <ChefHat className="w-5 h-5 text-peach" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-deep-green">
                  Cook With Krushi
                </span>
                <p className="text-xs text-charcoal-muted font-medium">
                  Cook. Learn. Enjoy.
                </p>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed max-w-sm">
              {t('aboutText')}
            </p>

            {/* Philosophy Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sage-50 border border-sage-200 text-deep-green text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>{t('philosophy')}</span>
            </div>

            {/* Damayanti Technologies Parent Brand Badge */}
            <div className="pt-2">
              <div className="p-3.5 rounded-2xl bg-[#FAF8F2] border border-[#E0DCCE] inline-block">
                <p className="text-[11px] font-semibold text-charcoal-muted uppercase tracking-wider">
                  Technology & Product Engineering
                </p>
                <p className="text-sm font-bold text-deep-green flex items-center gap-1.5 mt-0.5">
                  Damayanti Technologies
                  <span className="text-[10px] font-normal px-2 py-0.5 rounded-md bg-white border border-[#E0DCCE] text-terracotta">
                    Official Release
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-base font-bold text-deep-green mb-4">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-charcoal-muted">
              <li>
                <Link href="/explore" className="hover:text-deep-green transition-colors">
                  {t('navExplore')}
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-deep-green transition-colors">
                  {t('navCategories')}
                </Link>
              </li>
              <li>
                <Link href="/what-can-i-cook" className="hover:text-deep-green transition-colors">
                  {t('navWhatCanICook')}
                </Link>
              </li>
              <li>
                <Link href="/cooking-guide" className="hover:text-deep-green transition-colors">
                  {t('navGuide')}
                </Link>
              </li>
              <li>
                <Link href="/my-kitchen" className="hover:text-deep-green transition-colors">
                  {t('navMyKitchen')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="font-serif text-base font-bold text-deep-green mb-4">
              {t('browseByMeal')}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-charcoal-muted">
              <li>
                <Link href="/category/breakfast" className="hover:text-deep-green transition-colors">
                  Breakfast Favorites
                </Link>
              </li>
              <li>
                <Link href="/category/lunch" className="hover:text-deep-green transition-colors">
                  Lunch & Biryanis
                </Link>
              </li>
              <li>
                <Link href="/category/snacks" className="hover:text-deep-green transition-colors">
                  Evening Snacks
                </Link>
              </li>
              <li>
                <Link href="/category/desserts" className="hover:text-deep-green transition-colors">
                  Festive Sweets & Desserts
                </Link>
              </li>
              <li>
                <Link href="/category/healthy-food" className="hover:text-deep-green transition-colors">
                  Healthy & Low-Oil Meals
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Damayanti Technologies Info */}
          <div>
            <h4 className="font-serif text-base font-bold text-deep-green mb-4">
              {t('legalLinks')}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-charcoal-muted">
              <li>
                <Link href="/about" className="hover:text-deep-green transition-colors">
                  About Us & Damayanti Technologies
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-deep-green transition-colors">
                  {t('contactUs')}
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-deep-green transition-colors">
                  {t('privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-deep-green transition-colors">
                  {t('termsOfService')}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-deep-green transition-colors flex items-center gap-1 font-semibold text-primary">
                  <Shield className="w-3.5 h-3.5" /> Admin Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 border-t border-[#EAE7DF] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-muted">
          <p className="flex items-center gap-1 text-center sm:text-left">
            <span>© {currentYear} Cook With Krushi. All rights reserved.</span>
          </p>

          <div className="flex items-center gap-2 font-semibold text-deep-green bg-sage-50 px-3.5 py-1.5 rounded-full border border-sage-200">
            <span>{t('poweredBy')}</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Link href="/privacy-policy" className="hover:underline">Privacy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:underline">Terms</Link>
            <span>•</span>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
