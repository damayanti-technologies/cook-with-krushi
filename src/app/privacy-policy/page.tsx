import React from 'react';
import { Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider">
          <Shield className="w-3.5 h-3.5" />
          <span>Legal & Privacy</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-charcoal">
          Privacy Policy
        </h1>
        <p className="text-xs text-charcoal-muted">
          Last updated: February 2026 • Cook With Krushi by Damayanti Technologies
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#EAE7DF] p-6 sm:p-8 shadow-subtle space-y-6 text-xs sm:text-sm text-charcoal leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-deep-green">1. Introduction</h2>
          <p className="text-charcoal-muted">
            Cook With Krushi (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;), developed and operated by Damayanti Technologies, respects the privacy of our culinary learners and home cooks. This Privacy Policy details the types of information we collect, how it is secured, and your rights.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-deep-green">2. Information We Collect</h2>
          <p className="text-charcoal-muted">
            - <strong>Account Information:</strong> When you register an account, we store your name, email address, dietary preferences, and language selection.
            <br />
            - <strong>Culinary Progress & Favourites:</strong> Your saved recipes, in-progress cooking step checkpoints, ingredient checklists, and cooking history.
            <br />
            - <strong>Anonymous Browsing:</strong> For guest visitors, all session data and active checklist states are stored locally on your device via browser local storage and never transmitted to our servers without an account.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-deep-green">3. Cloud Firestore & Backend Storage</h2>
          <p className="text-charcoal-muted">
            We utilize Google Firebase (Authentication, Cloud Firestore, Firebase Storage) located in secured data centers. Strict Firestore Security Rules ensure users can only view and mutate their own private profile records, while recipe catalogs remain publicly readable.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-deep-green">4. Data Security</h2>
          <p className="text-charcoal-muted">
            We never sell, rent, or trade your personal information. Authentication credentials and passwords are encrypted and managed directly via Firebase Auth without administrative exposure.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-deep-green">5. Contact Us</h2>
          <p className="text-charcoal-muted">
            For privacy inquiries, please contact our Data Protection Officer at{' '}
            <a href="mailto:privacy@damayantitechnologies.com" className="text-deep-green underline font-semibold">
              privacy@damayantitechnologies.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
