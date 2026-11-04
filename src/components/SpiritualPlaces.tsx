'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import spiritualData from '@/data/spiritual-places.json';
import { Sparkles, MapPin, Footprints, ExternalLink, AlertTriangle, X, Compass, Globe, Info } from 'lucide-react';

interface TempleItem {
  id: string;
  nameEn: string;
  nameHi: string;
  deity: string;
  category: string;
  descriptionEn: string;
  descriptionHi: string;
  roadDistance: string;
  walkingInfo: string;
  festivals: string[];
  officialWebsite: string | null;
  districtInfo: string | null;
  googleMapsUrl: string;
  image: string;
}

interface SpiritualPlacesProps {
  limit?: number;
  showAllCta?: boolean;
}

export const SpiritualPlaces: React.FC<SpiritualPlacesProps> = ({ limit, showAllCta = true }) => {
  const { t, language } = useLanguage();
  const [selectedTemple, setSelectedTemple] = useState<TempleItem | null>(null);

  const temples = spiritualData as TempleItem[];
  const displayedTemples = limit ? temples.slice(0, limit) : temples;

  return (
    <section id="spiritual" className="relative py-16 sm:py-24 lg:py-28 px-3 xs:px-4 sm:px-6 lg:px-8 bg-deepGreen-dark border-t border-mist/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-mist/20 bg-forest/40 text-earth-light text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.spiritual.badge}</span>
          </div>
          <h2 className="font-heading text-2xl xs:text-3xl sm:text-5xl md:text-6xl text-ivory font-bold tracking-wide px-2">
            {t.spiritual.title}
          </h2>
          <p className="mt-2 sm:mt-4 text-mist/80 text-xs sm:text-base md:text-lg max-w-3xl px-2 font-serif">
            {t.spiritual.subtitle}
          </p>
          <div className="w-16 sm:w-20 h-0.5 bg-earth mt-4 sm:mt-6 rounded-full" />
        </div>

        {/* Starting Point & Methodology Notice */}
        <div className="mb-8 sm:mb-12 p-4 sm:p-6 rounded-2xl bg-earth-dark/25 border border-earth/40 backdrop-blur-sm max-w-4xl mx-auto">
          <div className="flex items-start gap-3 sm:gap-4">
            <AlertTriangle className="w-5 h-5 text-earth-light shrink-0 mt-0.5" />
            <div>
              <div className="text-[11px] sm:text-xs uppercase font-mono tracking-wider text-earth-light font-bold">
                {language === 'hi' ? 'दूरी गणना पद्धति एवं संदर्भ बिंदु' : 'Distance Methodology & Starting Benchmark'}
              </div>
              <p className="text-xs sm:text-sm text-ivory/90 mt-1 sm:mt-1.5 leading-relaxed">
                {language === 'hi'
                  ? 'सभी दूरियां उपयोगकर्ता द्वारा प्रदान की गई एकतरफा सड़क दूरियां हैं। प्रत्येक दूरी का संदर्भ आरंभ बिंदु: बिडालिया निवास (अक्षांश: 30.002638° N, देशांतर: 78.833203° E) है। किसी भी अनुमानित यात्रा समय या हवाई दूरी का उपयोग नहीं किया गया है।'
                  : 'All figures represent user-supplied one-way road distances measured strictly from Bidaliya Niwaas (Lat: 30.002638° N, Long: 78.833203° E). No approximate driving times or straight-line calculations are used.'}
              </p>
              <div className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-mono px-2.5 sm:px-3 py-1 rounded-lg bg-forest-dark/80 text-mist/90 border border-mist/15">
                <MapPin className="w-3.5 h-3.5 text-earth-light shrink-0" />
                <span>Road distance from Bidaliya Niwaas (one way)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Temple Cards Grid: Vertically stacked on mobile, 2 col on tablet, 3 col on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedTemples.map((temple) => (
            <div
              key={temple.id}
              className="group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-mist/15 bg-forest/70 hover:bg-forest/90 backdrop-blur-md overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-earth/60"
            >
              <div>
                {/* Temple Image */}
                <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-forest-dark">
                  <Image
                    src={temple.image}
                    alt={language === 'hi' ? temple.nameHi : temple.nameEn}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/20 to-transparent" />

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono bg-forest-dark/85 backdrop-blur-md text-earth-light border border-earth/30">
                      <span>{temple.category}</span>
                    </span>
                  </div>

                  {/* One-Way Road Distance Badge */}
                  <div className="absolute bottom-3 right-3">
                    <div className="px-2.5 py-1 rounded-lg bg-forest-dark/95 backdrop-blur-md border border-earth/40 text-right">
                      <div className="text-[9px] uppercase font-mono tracking-wider text-mist/75">
                        {language === 'hi' ? 'सड़क दूरी' : 'One Way'}
                      </div>
                      <div className="text-xs sm:text-sm font-bold font-mono text-earth-light">
                        {temple.roadDistance}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  {/* Temple Name */}
                  <h3 className="font-heading text-xl sm:text-2xl text-ivory font-bold group-hover:text-earth-light transition-colors">
                    {language === 'hi' ? temple.nameHi : temple.nameEn}
                  </h3>

                  {/* Deity */}
                  <div className="text-xs font-semibold text-earth-light mt-1">
                    {temple.deity}
                  </div>

                  {/* Short Introduction */}
                  <p className="text-xs sm:text-sm text-mist/85 mt-2.5 leading-relaxed font-serif line-clamp-3">
                    {language === 'hi' ? temple.descriptionHi : temple.descriptionEn}
                  </p>

                  {/* Festivals Preview */}
                  <div className="mt-3.5 pt-3.5 border-t border-mist/10">
                    <div className="text-[10px] uppercase tracking-wider text-mist/60 font-mono mb-1.5">
                      {language === 'hi' ? 'प्रमुख उत्सव' : 'Festivals'}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {temple.festivals.slice(0, 2).map((fest) => (
                        <span
                          key={fest}
                          className="px-2 py-0.5 rounded-full bg-forest-dark text-[10px] sm:text-[11px] text-mist/85 font-mono border border-mist/10"
                        >
                          {fest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer: Distance Metric & Touch Actions */}
              <div className="p-4 sm:p-6 pt-0 space-y-3">
                <div className="p-3 rounded-xl bg-forest-dark/70 border border-mist/10 space-y-1.5">
                  <div className="flex items-start justify-between text-xs font-mono">
                    <span className="text-mist/70 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-earth-light shrink-0" />
                      <span className="text-[10px] sm:text-[11px]">Road distance from Bidaliya Niwaas (one way):</span>
                    </span>
                    <span className="text-earth-light font-bold shrink-0 ml-2">
                      {temple.roadDistance}
                    </span>
                  </div>

                  <div className="flex items-start justify-between text-xs font-mono pt-1 border-t border-mist/10">
                    <span className="text-mist/70 flex items-center gap-1.5">
                      <Footprints className="w-3.5 h-3.5 text-earth-light shrink-0" />
                      <span className="text-[10px] sm:text-[11px]">{language === 'hi' ? 'पैदल मार्ग:' : 'Walking:'}</span>
                    </span>
                    <span className="text-mist/85 text-[10px] sm:text-[11px] text-right line-clamp-1 ml-2">
                      {temple.walkingInfo}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => setSelectedTemple(temple)}
                    className="inline-flex items-center justify-center gap-1.5 min-h-[44px] py-2 px-3 rounded-xl bg-forest-dark hover:bg-forest text-xs font-medium text-ivory border border-mist/20 hover:border-earth transition-colors active:scale-95"
                  >
                    <Info className="w-3.5 h-3.5 text-earth-light shrink-0" />
                    <span>{language === 'hi' ? 'विवरण' : 'Details'}</span>
                  </button>

                  <a
                    href={temple.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 min-h-[44px] py-2 px-3 rounded-xl bg-earth hover:bg-earth-light text-xs font-semibold text-ivory transition-colors shadow-md active:scale-95"
                  >
                    <span>{language === 'hi' ? 'दिशा-मार्ग' : 'Directions'}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Homepage CTA to Explore Full Directory */}
        {showAllCta && limit && temples.length > limit && (
          <div className="mt-12 sm:mt-16 text-center">
            <Link
              href="/spiritual"
              className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 sm:px-8 py-3.5 rounded-xl bg-earth hover:bg-earth-light text-ivory font-semibold text-xs sm:text-sm tracking-wide shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Compass className="w-4 h-4 shrink-0" />
              <span>{language === 'hi' ? 'सभी ९ पवित्र तीर्थ देखें' : 'Explore All 9 Spiritual Destinations'}</span>
            </Link>
          </div>
        )}
      </div>

      {/* Destination Detailed Profile Modal */}
      {selectedTemple && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedTemple(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-deepGreen-dark border border-mist/25 p-4 sm:p-8 shadow-2xl text-ivory"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Accessible Touch Close Button (44x44px) */}
            <button
              onClick={() => setSelectedTemple(null)}
              className="absolute top-3 right-3 sm:top-5 sm:right-5 flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full bg-forest text-mist hover:text-ivory hover:bg-forest-light border border-mist/20 transition-colors z-20 active:scale-95"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative h-48 sm:h-72 w-full rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-6 bg-forest">
              <Image
                src={selectedTemple.image}
                alt={language === 'hi' ? selectedTemple.nameHi : selectedTemple.nameEn}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deepGreen-dark via-transparent to-black/30" />
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 right-12">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-mono bg-forest/80 backdrop-blur-md text-earth-light border border-earth/30">
                  {selectedTemple.category}
                </span>
                <h3 className="font-heading text-xl sm:text-3xl text-ivory font-bold mt-1.5 leading-tight">
                  {language === 'hi' ? selectedTemple.nameHi : selectedTemple.nameEn}
                </h3>
                <div className="text-xs sm:text-sm font-semibold text-earth-light">
                  {selectedTemple.deity}
                </div>
              </div>
            </div>

            {/* Modal Details */}
            <div className="space-y-4 sm:space-y-6 text-xs sm:text-sm">
              {/* Significance */}
              <div>
                <h4 className="text-[11px] sm:text-xs uppercase font-mono tracking-widest text-earth-light font-semibold mb-1.5">
                  {language === 'hi' ? 'धार्मिक एवं सांस्कृतिक महत्व' : 'Religious & Cultural Significance'}
                </h4>
                <p className="text-mist/90 leading-relaxed font-serif text-sm sm:text-base">
                  {language === 'hi' ? selectedTemple.descriptionHi : selectedTemple.descriptionEn}
                </p>
              </div>

              {/* Distance & Walking Information */}
              <div className="p-4 sm:p-5 rounded-2xl bg-forest/70 border border-mist/15 space-y-2.5">
                <h4 className="text-[11px] sm:text-xs uppercase font-mono tracking-widest text-earth-light font-semibold">
                  {language === 'hi' ? 'यात्रा विवरण एवं पहुंच मार्ग' : 'Journey Metrics & Approach'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono pt-1">
                  <div>
                    <span className="text-mist/70 block mb-0.5">Road distance from Bidaliya Niwaas (one way):</span>
                    <span className="text-sm sm:text-base font-bold text-earth-light">{selectedTemple.roadDistance}</span>
                  </div>
                  <div>
                    <span className="text-mist/70 block mb-0.5">Walking / Trek Details:</span>
                    <span className="text-xs sm:text-sm text-mist/90">{selectedTemple.walkingInfo}</span>
                  </div>
                </div>
              </div>

              {/* Festivals */}
              <div>
                <h4 className="text-[11px] sm:text-xs uppercase font-mono tracking-widest text-earth-light font-semibold mb-1.5">
                  {language === 'hi' ? 'वार्षिक पर्व एवं मेले' : 'Festivals & Pilgrimage Events'}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTemple.festivals.map((fest) => (
                    <span
                      key={fest}
                      className="px-2.5 py-1 rounded-xl bg-forest text-[11px] sm:text-xs text-ivory font-mono border border-mist/15"
                    >
                      {fest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links & Actions */}
              <div className="pt-3 border-t border-mist/15 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {selectedTemple.officialWebsite && (
                    <a
                      href={selectedTemple.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-earth-light hover:underline min-h-[36px]"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Official Website</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {selectedTemple.districtInfo && (
                    <a
                      href={selectedTemple.districtInfo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-mist/75 hover:text-ivory hover:underline min-h-[36px]"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>District Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <a
                  href={selectedTemple.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-earth hover:bg-earth-light text-xs font-semibold text-ivory transition-colors shadow-lg active:scale-95 text-center"
                >
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{language === 'hi' ? 'गूगल मैप्स दिशा-मार्ग (बिडालिया निवास से)' : 'Directions from Bidaliya Niwaas'}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
