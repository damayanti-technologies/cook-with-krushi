import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { AuthProvider } from '@/context/AuthContext';
import { KitchenProvider } from '@/context/KitchenContext';
import { NotificationProvider } from '@/context/NotificationContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';

export const metadata: Metadata = {
  title: 'Cook With Krushi | Premium Cooking & Recipe Learning Platform',
  description:
    'Cook. Learn. Enjoy. Master home cooking with interactive checklists, serving scalers, and distraction-free step-by-step guidance. Powered by Damayanti Technologies.',
  keywords: [
    'Cook With Krushi',
    'Damayanti Technologies',
    'recipes',
    'cooking lessons',
    'Telugu recipes',
    'Indian cuisine',
    'step by step cooking',
    'cooking timer',
  ],
  authors: [{ name: 'Damayanti Technologies' }],
  metadataBase: new URL('https://cookwithkrushi.damayantitechnologies.com'),
  openGraph: {
    title: 'Cook With Krushi | Cook. Learn. Enjoy.',
    description:
      'Discover delicious recipes, auto-scale ingredients, and follow interactive step-by-step cooking with built-in timers. Built by Damayanti Technologies.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Cook With Krushi',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#FAF8F2] text-[#292D29] selection:bg-sage-200 selection:text-deep-green antialiased">
        <LanguageProvider>
          <AuthProvider>
            <KitchenProvider>
              <NotificationProvider>
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-1 pb-16 lg:pb-0">{children}</main>
                  <Footer />
                  <MobileNav />
                </div>
              </NotificationProvider>
            </KitchenProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
