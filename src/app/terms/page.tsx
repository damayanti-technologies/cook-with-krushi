import React from 'react';
import { Shield } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider">
          <Shield className="w-3.5 h-3.5" />
          <span>Terms of Service</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-charcoal">
          Terms & Conditions
        </h1>
        <p className="text-xs text-charcoal-muted">
          Last updated: February 2026 • Damayanti Technologies
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#EAE7DF] p-6 sm:p-8 shadow-subtle space-y-6 text-xs sm:text-sm text-charcoal leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-deep-green">1. Agreement to Terms</h2>
          <p className="text-charcoal-muted">
            By accessing or using Cook With Krushi, a digital service operated by Damayanti Technologies, you agree to comply with and be bound by these terms.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-deep-green">2. Recipe Information & Food Safety</h2>
          <p className="text-charcoal-muted">
            All culinary instructions, ingredient quantities, and cooking duration timers provided on Cook With Krushi are prepared in good faith for instructional and home cooking education. Users are responsible for exercising standard food safety, hygiene, proper allergen inspection, and fire/heat caution in their personal kitchens.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-deep-green">3. Intellectual Property</h2>
          <p className="text-charcoal-muted">
            The platform design, brand identity &quot;Cook With Krushi&quot;, proprietary interactive serving calculators, timer logic, and culinary curriculum are the exclusive intellectual property of Damayanti Technologies.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-deep-green">4. Administrative Governance</h2>
          <p className="text-charcoal-muted">
            Administrative privileges to publish, edit, or remove catalog recipes and categories are restricted to authorized personnel verified through server-side claims.
          </p>
        </section>
      </div>
    </div>
  );
}
