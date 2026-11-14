'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShieldCheck, 
  Utensils, 
  Layers, 
  Package, 
  Users, 
  Sliders, 
  Settings, 
  ArrowLeft, 
  PlusCircle, 
  ChefHat
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isAdmin, demoLoginAsAdmin } = useAuth();

  const navItems = [
    { href: '/admin', label: 'Overview', icon: Sliders },
    { href: '/admin/recipes', label: 'Recipes', icon: Utensils },
    { href: '/admin/categories', label: 'Categories', icon: Layers },
    { href: '/admin/ingredients', label: 'Ingredients', icon: Package },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/content', label: 'Content & Tips', icon: ChefHat },
    { href: '/admin/settings', label: 'Settings & Database', icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  // If not logged in as Admin, show Authorization Guard
  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-sage-100 text-deep-green flex items-center justify-center mx-auto shadow-subtle">
          <ShieldCheck className="w-8 h-8 text-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-2xl font-bold text-charcoal">
            Administrator Access Required
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            This administrative area is restricted to authorized culinary staff of Damayanti Technologies.
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#EAE7DF] shadow-subtle space-y-3">
          <p className="text-xs font-semibold text-charcoal">
            Testing or evaluating the platform?
          </p>
          <button
            onClick={demoLoginAsAdmin}
            className="w-full py-2.5 bg-deep-green hover:bg-deep-hover text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Switch to Admin Role</span>
          </button>
        </div>

        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-deep-green hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Website
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Top Header */}
      <div className="bg-deep-green text-white rounded-3xl p-6 sm:p-8 shadow-lifted flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-peach text-xs font-bold border border-white/20">
            <ShieldCheck className="w-3.5 h-3.5 text-peach" />
            <span>Admin Control Center</span>
            <span className="text-white/60">•</span>
            <span className="text-white font-medium">Damayanti Technologies</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight">
            Cook With Krushi Management
          </h1>
          <p className="text-xs sm:text-sm text-white/80">
            Publish, edit, and curate recipes, categories, ingredients, and platform configurations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/recipes/new"
            className="px-5 py-2.5 bg-peach hover:bg-peach-dark text-deep-green rounded-full text-xs font-bold shadow-xs flex items-center gap-2 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Recipe</span>
          </Link>

          <Link
            href="/"
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-semibold backdrop-blur-md transition-colors"
          >
            View Live Site →
          </Link>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <nav className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#EAE7DF]">
        {navItems.map((item) => {
          const IconComp = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                active
                  ? 'bg-deep-green text-white shadow-sm'
                  : 'bg-white hover:bg-sage-100 text-charcoal border border-[#E0DCCE]'
              }`}
            >
              <IconComp className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Admin Body Content */}
      <div>{children}</div>

    </div>
  );
}
