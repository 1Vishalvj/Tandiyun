'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CommunitySection } from '@/components/CommunitySection';
import { useLanguage } from '@/context/LanguageContext';
import { Heart, Users, MessageSquareQuote } from 'lucide-react';

export default function CommunityPage() {
  const { t, language } = useLanguage();

  return (
    <main className="min-h-screen bg-deepGreen-dark flex flex-col text-ivory">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-8 px-4 sm:px-6 lg:px-8 bg-forest border-b border-mist/10 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-mist/20 bg-forest-dark/80 text-earth-light text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'ग्राम समाज एवं प्रवासी बंधु' : 'Village Community & Diaspora'}</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-wide">
            {language === 'hi' ? 'हमारा गांव। हमारे लोग। हमारी स्मृतियां।' : 'Our Village. Our People. Our Stories.'}
          </h1>
          <p className="mt-4 text-mist/85 text-base sm:text-lg font-serif max-w-2xl mx-auto">
            {language === 'hi'
              ? 'आधिकारिक ग्राम सूचनाएं, आगामी उत्सव, और देश-विदेश में बसे परिवारों के आत्मीय संस्मरणों का साझा मंच।'
              : 'Official village notices, seasonal gatherings, and shared recollections from families and friends connected to Tandiyun.'}
          </p>
        </div>
      </section>

      {/* Interactive Community Section */}
      <div className="flex-1">
        <CommunitySection />
      </div>

      <Footer />
    </main>
  );
}
