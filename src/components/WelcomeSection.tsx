'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin, Compass, ArrowRight, Mountain } from 'lucide-react';

export const WelcomeSection: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-forest-dark border-t border-mist/10 overflow-hidden">
      {/* Decorative mountain background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-forest-light/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-mist/20 bg-forest/40 text-earth-light text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>{t.welcome.badge}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl text-ivory font-bold tracking-wide max-w-3xl">
            {t.welcome.title}
          </h2>
          <div className="w-20 h-0.5 bg-earth mt-6 rounded-full" />
        </div>

        {/* Editorial Story Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Main Visual Landscape Image */}
          <div className="lg:col-span-7 relative group">
            <div className="relative overflow-hidden rounded-2xl shadow-cinematic border border-mist/15 aspect-[16/10]">
              <Image
                src="/assets/photos/gallery/IMG_20200814_063519.webp"
                alt="Sea of clouds in Tandiyun valley, August 2020"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-transparent to-transparent opacity-80" />

              {/* In-image caption */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-end justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-earth-light block">
                    Original Village Photograph • Aug 2020
                  </span>
                  <p className="text-sm sm:text-base font-serif italic text-ivory/95 mt-1 drop-shadow">
                    {language === 'hi'
                      ? 'तंडियूं की वादियों में तैरती प्रातःकालीन बादलों की चादर'
                      : 'Dawn mist cascading through the forested valleys beneath Tandiyun'}
                  </p>
                </div>
              </div>
            </div>

            {/* Overlapping small accent card */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-forest/95 backdrop-blur-md border border-mist/20 p-5 rounded-xl shadow-2xl max-w-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-earth-light shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-mist/60 font-mono">
                    {t.welcome.locationLabel}
                  </div>
                  <div className="text-sm font-semibold text-ivory mt-0.5">
                    {t.welcome.locationVal}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative & Context */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <p className="text-lg sm:text-xl font-serif text-ivory/90 leading-relaxed font-normal">
              {t.welcome.intro1}
            </p>

            <p className="text-base text-mist/80 leading-relaxed">
              {t.welcome.intro2}
            </p>

            {/* Essential Geographical Context (Bidaliya Niwaas to Tandiyun) */}
            <div className="bg-forest/60 border border-mist/15 rounded-xl p-5 backdrop-blur-sm space-y-3">
              <div className="flex items-center gap-2 text-earth-light text-xs uppercase font-mono tracking-wider">
                <Mountain className="w-4 h-4" />
                <span>Approach & Geography</span>
              </div>
              <p className="text-sm text-ivory/85 leading-relaxed">
                {t.welcome.approachNote}
              </p>
              <div className="pt-2 flex items-center justify-between text-xs text-mist/70 font-mono border-t border-mist/10">
                <span>Motorable Road: Bidaliya Niwaas</span>
                <span>Uphill Walk: Tandiyun</span>
              </div>
            </div>

            {/* Link to Explore & 3D */}
            <div className="pt-2">
              <a
                href="#explore"
                className="inline-flex items-center gap-2 text-earth-light hover:text-ivory font-medium tracking-wide group transition-colors"
              >
                <span>{t.welcome.readMore}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

