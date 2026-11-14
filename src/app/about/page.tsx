'use client';

import React from 'react';
import Link from 'next/link';
import { ChefHat, Sparkles, Heart, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Hero */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage-100 text-deep-green border border-sage-200 text-xs font-semibold">
          <ChefHat className="w-4 h-4 text-primary" />
          <span>About Our Culinary Mission</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-charcoal">
          Cook With Krushi
        </h1>
        <p className="text-base sm:text-lg text-charcoal-muted max-w-2xl mx-auto leading-relaxed">
          A premium cooking & recipe learning platform developed and powered by{' '}
          <strong className="text-deep-green font-bold">Damayanti Technologies</strong>.
        </p>
      </div>

      {/* Philosophy Banner */}
      <div className="bg-gradient-to-r from-deep-green to-[#1e3827] text-white rounded-3xl p-8 sm:p-10 shadow-lifted space-y-4 text-center">
        <span className="text-xs uppercase tracking-widest text-peach font-bold">
          Our Guiding Philosophy
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold">
          Discover → Prepare → Cook → Complete → Enjoy
        </h2>
        <p className="text-xs sm:text-sm text-white/80 max-w-xl mx-auto leading-relaxed">
          We believe home cooking shouldn&apos;t feel stressful or chaotic. By breaking down authentic culinary heritage into structured preparation checklists and timed instructions, we turn kitchen beginners into confident home chefs.
        </p>
      </div>

      {/* Core Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-[#EAE7DF] shadow-subtle space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-sage-100 text-deep-green flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-serif font-bold text-lg text-charcoal">Culinary Precision</h3>
          <p className="text-xs text-charcoal-muted leading-relaxed">
            Every published recipe is structured with exact ingredient gram measurements, real kitchen tips, and doneness indicators so your dish turns out right every single time.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#EAE7DF] shadow-subtle space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-peach text-deep-green flex items-center justify-center font-bold">
            <Heart className="w-5 h-5 text-terracotta" />
          </div>
          <h3 className="font-serif font-bold text-lg text-charcoal">Heritage & Inclusivity</h3>
          <p className="text-xs text-charcoal-muted leading-relaxed">
            Celebrating regional Indian cuisine, festive traditions, and international favorites with full bilingual English and Telugu support and thoughtful dietary labels.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#EAE7DF] shadow-subtle space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-sage-200 text-deep-green flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5 text-deep-green" />
          </div>
          <h3 className="font-serif font-bold text-lg text-charcoal">Damayanti Engineering</h3>
          <p className="text-xs text-charcoal-muted leading-relaxed">
            Engineered with modern web architectures, zero-drift target timestamps, responsive smartphone ergonomics, and rock-solid Firebase database synchronization.
          </p>
        </div>
      </div>

      {/* About Damayanti Technologies */}
      <div className="bg-white rounded-3xl border border-[#EAE7DF] p-8 shadow-subtle space-y-4">
        <h3 className="font-serif text-2xl font-bold text-deep-green">
          About Damayanti Technologies
        </h3>
        <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
          Damayanti Technologies is an innovative product engineering company specializing in high-performance web platforms, intuitive user interfaces, and intelligent interactive applications. Cook With Krushi represents our dedication to bringing high craftsmanship and human-centric software design to everyday lifestyle and home cooking experiences.
        </p>

        <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-deep-green">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-primary" /> Production-Quality Architecture
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-primary" /> Mobile-First Ergonomics
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-primary" /> Multi-Language Localization
          </span>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="text-center pt-4">
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-deep-green hover:bg-deep-hover text-white text-sm font-bold rounded-full shadow-lifted transition-all"
        >
          <span>Start Exploring Recipes</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
