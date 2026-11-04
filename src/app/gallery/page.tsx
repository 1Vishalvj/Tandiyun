'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { LandscapeGallery } from '@/components/LandscapeGallery';
import { useLanguage } from '@/context/LanguageContext';
import { Camera, Sparkles, ShieldCheck } from 'lucide-react';

export default function GalleryPage() {
  const { t, language } = useLanguage();

  return (
    <main className="min-h-screen bg-deepGreen-dark flex flex-col text-ivory">
      <Navbar />

      {/* Gallery Header */}
      <section className="pt-32 pb-6 px-4 sm:px-6 lg:px-8 bg-forest border-b border-mist/10 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-mist/20 bg-forest-dark/80 text-earth-light text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'प्रामाणिक छायाचित्र दीर्घा' : 'Original Photography Archive'}</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-wide">
            {language === 'hi' ? 'टांडियूं की पावन वादियां एवं स्मृतियां' : 'Visual Chronicles of Tandiyun'}
          </h1>
          <p className="mt-4 text-mist/85 text-base sm:text-lg font-serif max-w-2xl mx-auto">
            {language === 'hi'
              ? 'गांव के मूल और प्रामाणिक छायाचित्र — जहां प्रकृति की शांति, बादलों का खेल, सीढ़ीदार खेत और पर्वतीय जीवन का सौंदर्य अमर है।'
              : 'A curated photographic chronicle preserving authentic landscapes, terraced slopes, mountain light, and living memories of Tandiyun.'}
          </p>

          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-forest-dark/70 text-xs font-mono text-mist/75 border border-mist/10">
            <ShieldCheck className="w-4 h-4 text-earth-light" />
            <span>100% Genuine Village Photography. No AI or Stock Imagery.</span>
          </div>
        </div>
      </section>

      {/* Interactive Gallery Component with Filters & Lightbox */}
      <div className="flex-1">
        <LandscapeGallery />
      </div>

      <Footer />
    </main>
  );
}
