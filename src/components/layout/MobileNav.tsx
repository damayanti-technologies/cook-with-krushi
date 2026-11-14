'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, UtensilsCrossed, BookOpen, User } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';

export const MobileNav: React.FC = () => {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { user } = useAuth();

  // If in cooking mode, we hide the bottom bar to provide distraction-free cooking experience
  if (pathname.includes('/cook')) {
    return null;
  }

  const items = [
    { href: '/', label: t('navHome'), icon: Home },
    { href: '/explore', label: t('navExplore'), icon: Compass },
    { href: '/my-kitchen', label: t('navMyKitchen'), icon: UtensilsCrossed },
    { href: '/cooking-guide', label: t('navGuide'), icon: BookOpen },
    { href: user ? '/profile' : '/login', label: user ? t('navProfile') : t('navLogin'), icon: User },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EAE7DF] px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const active = isActive(item.href);
          const IconComponent = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
                active
                  ? 'text-deep-green font-bold'
                  : 'text-charcoal-muted hover:text-charcoal font-medium'
              }`}
            >
              <div className={`p-1 rounded-xl transition-all ${active ? 'bg-sage-100 scale-105' : ''}`}>
                <IconComponent className={`w-5 h-5 ${active ? 'text-deep-green stroke-[2.4]' : 'text-charcoal-muted'}`} />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[65px]">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
