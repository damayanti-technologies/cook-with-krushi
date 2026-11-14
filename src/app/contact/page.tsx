'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useNotification } from '@/context/NotificationContext';

export default function ContactPage() {
  const { t } = useLanguage();
  const { showToast } = useNotification();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      showToast('Thank you! Your message has been sent.', 'success');
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Support & Enquiries</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-charcoal">
          {t('contactUs')}
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-muted max-w-md mx-auto">
          Have recipe questions, suggestions, or feedback? The Cook With Krushi team at Damayanti Technologies is here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Contact Info (5 cols) */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-[#EAE7DF] p-6 shadow-subtle space-y-4">
            <h3 className="font-serif font-bold text-lg text-charcoal">
              Contact Information
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-charcoal">Email</p>
                  <a href="mailto:support@damayantitechnologies.com" className="text-deep-green hover:underline">
                    support@damayantitechnologies.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-charcoal">Customer Support</p>
                  <p className="text-charcoal-muted">+91 (0) 80 4000 9000</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-charcoal">Engineering Headquarters</p>
                  <p className="text-charcoal-muted">
                    Damayanti Technologies Pvt. Ltd.<br />
                    Culinary Innovation & Software Lab<br />
                    India
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-sage-50 rounded-3xl border border-sage-200 text-xs text-charcoal space-y-2">
            <p className="font-bold text-deep-green">Looking for quick answers?</p>
            <p className="text-charcoal-muted leading-relaxed">
              Check out our comprehensive Culinary Glossary, Kitchen Safety Guide, and Common Mistakes troubleshooting.
            </p>
            <Link
              href="/cooking-guide"
              className="font-bold text-deep-green hover:underline inline-block pt-1"
            >
              Go to Cooking Guide →
            </Link>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="md:col-span-7">
          <div className="bg-white rounded-3xl border border-[#EAE7DF] p-6 sm:p-8 shadow-subtle space-y-6">
            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-xl text-charcoal">
                  Message Sent Successfully
                </h3>
                <p className="text-xs text-charcoal-muted max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out, <strong>{name}</strong>. Our team will review your message and reply to <strong>{email}</strong> within 24 business hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                    setSubject('');
                  }}
                  className="px-5 py-2 bg-deep-green text-white text-xs font-bold rounded-full"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-charcoal-muted">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ananya Verma"
                    className="w-full p-2.5 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs sm:text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-charcoal-muted">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ananya@example.com"
                    className="w-full p-2.5 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs sm:text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-charcoal-muted">Subject</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Recipe feedback / Culinary query"
                    className="w-full p-2.5 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs sm:text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-charcoal-muted">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what's on your mind..."
                    className="w-full p-2.5 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs sm:text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-deep-green hover:bg-deep-hover text-white text-xs sm:text-sm font-bold rounded-2xl shadow-lifted transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
