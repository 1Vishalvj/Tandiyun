'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import spiritualData from '@/data/spiritual-places.json';
import { Sparkles, MapPin, Footprints, Clock, ExternalLink, AlertTriangle, Church } from 'lucide-react';

export const SpiritualPlaces: React.FC = () => {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState<string>('all');

  return (
    <section id="spiritual" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-forest-dark border-t border-mist/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-mist/20 bg-forest/40 text-earth-light text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.spiritual.badge}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl text-ivory font-bold tracking-wide">
            {t.spiritual.title}
          </h2>
          <p className="mt-4 text-mist/80 text-base sm:text-lg max-w-3xl">
            {t.spiritual.subtitle}
          </p>
          <div className="w-20 h-0.5 bg-earth mt-6 rounded-full" />
        </div>

        {/* Clear Research Candidates Disclaimer (Strict Requirement) */}
        <div className="mb-12 p-4 sm:p-5 rounded-2xl bg-earth-dark/30 border border-earth/40 backdrop-blur-sm max-w-4xl mx-auto">
          <div className="flex items-start gap-3.5">
            <AlertTriangle className="w-5 h-5 text-earth-light shrink-0 mt-0.5" />
            <div>
              <div className="text-xs uppercase font-mono tracking-wider text-earth-light font-bold">
                {language === 'hi' ? 'महत्वपूर्ण शोध सूचना' : 'Research Candidate Notice'}
              </div>
              <p className="text-xs sm:text-sm text-ivory/90 mt-1 leading-relaxed">
                {t.spiritual.disclaimer}
              </p>
              <div className="mt-2 text-xs font-mono text-mist/80">
                {t.spiritual.startingFrom} (Lat: 30.002638° N, Long: 78.833203° E)
              </div>
            </div>
          </div>
        </div>

        {/* Temple Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {spiritualData.map((temple) => (
            <div
              key={temple.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-mist/15 bg-forest/80 backdrop-blur-md p-6 sm:p-7 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-earth/60"
            >
              <div>
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-earth/20 text-earth-light border border-earth/30">
                    <span>{t.spiritual.researchBadge}</span>
                  </span>
                  <span className="text-[11px] font-mono text-mist/60">
                    Garhwal Shrine
                  </span>
                </div>

                {/* Temple Name */}
                <h3 className="font-heading text-2xl text-ivory font-bold group-hover:text-earth-light transition-colors">
                  {language === 'hi' ? temple.nameHi : temple.nameEn}
                </h3>

                {/* Deity */}
                <div className="text-xs font-medium text-earth-light mt-1">
                  {temple.deity}
                </div>

                {/* Significance */}
                <p className="text-sm text-mist/85 mt-3 leading-relaxed font-serif">
                  {language === 'hi' ? temple.significanceHi : temple.significanceEn}
                </p>

                {/* Festivals */}
                <div className="mt-4 pt-4 border-t border-mist/10">
                  <div className="text-[11px] uppercase tracking-wider text-mist/60 font-mono mb-1.5">
                    {language === 'hi' ? 'प्रमुख उत्सव व पर्व' : 'Festivals & Pilgrimages'}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {temple.festivals.map((fest) => (
                      <span
                        key={fest}
                        className="px-2 py-0.5 rounded bg-forest-dark text-[11px] text-mist/85 font-mono border border-mist/10"
                      >
                        {fest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Distance & Route Metrics */}
              <div className="mt-6 pt-4 border-t border-mist/10 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-mist/70 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-earth-light" />
                    {t.spiritual.roadDistLabel}:
                  </span>
                  <span className="text-earth-light font-semibold">
                    {temple.roadDistance}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-mist/70 flex items-center gap-1.5">
                    <Footprints className="w-3.5 h-3.5 text-earth-light" />
                    {t.spiritual.trekDistLabel}:
                  </span>
                  <span className="text-mist/90 text-right max-w-[55%]">
                    {temple.trekDistance}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-mist/70 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-earth-light" />
                    {t.spiritual.travelTimeLabel}:
                  </span>
                  <span className="text-earth-light">
                    {temple.travelTime}
                  </span>
                </div>

                {/* Google Maps Link */}
                <div className="pt-3">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      temple.googleMapsQuery
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-forest-dark hover:bg-forest text-xs font-medium text-ivory border border-mist/20 hover:border-earth transition-colors"
                  >
                    <span>{t.spiritual.mapsButton}</span>
                    <ExternalLink className="w-3 h-3 text-earth-light" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
