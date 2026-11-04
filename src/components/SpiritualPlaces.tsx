'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import templesData from '@/data/temples.json';
import { Sparkles, MapPin, Footprints, ExternalLink, AlertTriangle, AlertCircle, X, Compass, Globe, Info, ShieldCheck, ArrowRight } from 'lucide-react';

interface TempleItem {
  id: string;
  slug: string;
  nameEn: string;
  nameHi: string;
  deityEn: string;
  deityHi: string;
  categoryEn: string;
  categoryHi: string;
  locationEn: string;
  locationHi: string;
  roadDistance: string;
  distanceStatus: string;
  distanceStatusEn: string;
  distanceStatusHi: string;
  drivingInfoEn: string;
  drivingInfoHi: string;
  walkingInfoEn: string;
  walkingInfoHi: string;
  significanceEn: string;
  significanceHi: string;
  festivals: string[];
  officialWebsite: string | null;
  districtInfo: string | null;
  wikipediaUrl?: string;
  googleMapsUrl: string;
  image: string | null;
  hasAuthenticPhoto: boolean;
  photoCredit?: string;
}

interface SpiritualPlacesProps {
  limit?: number;
  showAllCta?: boolean;
}

export const SpiritualPlaces: React.FC<SpiritualPlacesProps> = ({ limit, showAllCta = true }) => {
  const { t, language } = useLanguage();
  const [selectedTemple, setSelectedTemple] = useState<TempleItem | null>(null);

  const temples = templesData as TempleItem[];
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

        {/* Temple Cards Grid: Vertically stacked on mobile, 2 col on tablet, 2 or 4 col on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {displayedTemples.map((temple) => (
            <div
              key={temple.id}
              className="group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-mist/15 bg-forest/70 hover:bg-forest/90 backdrop-blur-md overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-earth/60"
            >
              <div>
                {/* Temple Image or Authentic Coming Soon Placeholder */}
                <div className="relative h-52 sm:h-64 w-full overflow-hidden bg-forest-dark">
                  {temple.hasAuthenticPhoto && temple.image ? (
                    <>
                      <Image
                        src={temple.image}
                        alt={language === 'hi' ? temple.nameHi : temple.nameEn}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/20 to-transparent" />
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-forest-dark via-deepGreen-dark to-forest border-b border-mist/10">
                      <div className="w-12 h-12 rounded-full bg-forest border border-earth/40 flex items-center justify-center text-earth-light mb-2.5">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono uppercase tracking-wider text-earth-light font-semibold">
                        {language === 'hi' ? 'प्रामाणिक छायाचित्र संकलन प्रक्रिया में' : 'Authentic Photograph Coming Soon'}
                      </span>
                      <span className="text-[11px] text-mist/60 mt-1 max-w-xs font-serif">
                        {language === 'hi'
                          ? 'मूल मंदिर का प्रामाणिक छायाचित्र सत्यापन उपरांत प्रकाशित किया जाएगा'
                          : 'Genuine photographic documentation undergoing community verification'}
                      </span>
                    </div>
                  )}

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono bg-forest-dark/90 backdrop-blur-md text-earth-light border border-earth/30">
                      <span>{language === 'hi' ? temple.categoryHi : temple.categoryEn}</span>
                    </span>
                  </div>

                  {/* One-Way Road Distance Badge */}
                  <div className="absolute bottom-3 right-3 z-10">
                    <div className="px-3 py-1.5 rounded-xl bg-forest-dark/95 backdrop-blur-md border border-earth/40 text-right shadow-lg">
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
                <div className="p-5 sm:p-7">
                  {/* Status Badge */}
                  <div className="mb-2">
                    {temple.distanceStatus === 'Verified' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-300 bg-emerald-950/40 px-2.5 py-0.5 rounded border border-emerald-800/40">
                        <ShieldCheck className="w-3 h-3" />
                        <span>{language === 'hi' ? temple.distanceStatusHi : temple.distanceStatusEn}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-300 bg-amber-950/40 px-2.5 py-0.5 rounded border border-amber-800/40">
                        <AlertCircle className="w-3 h-3" />
                        <span>{language === 'hi' ? temple.distanceStatusHi : temple.distanceStatusEn}</span>
                      </span>
                    )}
                  </div>

                  {/* Temple Name */}
                  <h3 className="font-heading text-xl sm:text-2xl text-ivory font-bold group-hover:text-earth-light transition-colors">
                    {language === 'hi' ? temple.nameHi : temple.nameEn}
                  </h3>

                  {/* Deity & Location */}
                  <div className="text-xs font-semibold text-earth-light mt-1 flex items-center gap-1.5">
                    <span>{language === 'hi' ? temple.deityHi : temple.deityEn}</span>
                  </div>
                  <div className="text-[11px] text-mist/70 font-mono mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-earth-light shrink-0" />
                    <span>{language === 'hi' ? temple.locationHi : temple.locationEn}</span>
                  </div>

                  {/* Short Introduction */}
                  <p className="text-xs sm:text-sm text-mist/85 mt-3 leading-relaxed font-serif line-clamp-3">
                    {language === 'hi' ? temple.significanceHi : temple.significanceEn}
                  </p>
                </div>
              </div>

              {/* Card Footer: Distance Metric & Touch Actions */}
              <div className="p-5 sm:p-7 pt-0 space-y-3">
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
                      {language === 'hi' ? temple.walkingInfoHi : temple.walkingInfoEn}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    href={`/temples/${temple.slug}`}
                    className="inline-flex items-center justify-center gap-1.5 min-h-[44px] py-2 px-3 rounded-xl bg-forest-dark hover:bg-forest text-xs font-medium text-ivory border border-mist/20 hover:border-earth transition-colors active:scale-95"
                  >
                    <Info className="w-3.5 h-3.5 text-earth-light shrink-0" />
                    <span>{language === 'hi' ? 'संपूर्ण विवरण' : 'Temple Details'}</span>
                  </Link>

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
        {showAllCta && (
          <div className="mt-12 sm:mt-16 text-center">
            <Link
              href="/temples"
              className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 sm:px-8 py-3.5 rounded-xl bg-earth hover:bg-earth-light text-ivory font-semibold text-xs sm:text-sm tracking-wide shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Compass className="w-4 h-4 shrink-0" />
              <span>{language === 'hi' ? 'सभी पवित्र तीर्थ एवं दूरी तालिका देखें' : 'Explore All Sacred Destinations & Distance Matrix'}</span>
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
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-deepGreen-dark border border-mist/20 shadow-2xl p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-mist/10 pb-4">
              <div>
                <span className="text-xs font-mono text-earth-light uppercase tracking-wider block">
                  {language === 'hi' ? selectedTemple.categoryHi : selectedTemple.categoryEn}
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-ivory mt-1">
                  {language === 'hi' ? selectedTemple.nameHi : selectedTemple.nameEn}
                </h3>
                <p className="text-xs font-mono text-mist/75 mt-1">
                  {language === 'hi' ? selectedTemple.deityHi : selectedTemple.deityEn}
                </p>
              </div>

              <button
                onClick={() => setSelectedTemple(null)}
                className="p-2 rounded-full bg-forest hover:bg-forest-light text-ivory border border-mist/20 transition-colors shrink-0"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image or Placeholder */}
            {selectedTemple.hasAuthenticPhoto && selectedTemple.image ? (
              <div className="relative h-60 w-full rounded-2xl overflow-hidden border border-mist/20">
                <Image
                  src={selectedTemple.image}
                  alt={selectedTemple.nameEn}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="py-10 px-4 text-center rounded-2xl bg-forest-dark border border-mist/15">
                <Sparkles className="w-8 h-8 text-earth-light mx-auto mb-2" />
                <span className="text-xs font-mono text-earth-light uppercase font-semibold">
                  {language === 'hi' ? 'प्रामाणिक छायाचित्र संकलन प्रक्रिया में' : 'Authentic Photograph Coming Soon'}
                </span>
              </div>
            )}

            {/* Description */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-earth-light block">
                {language === 'hi' ? 'आध्यात्मिक परिचय एवं महत्व' : 'Spiritual Significance'}
              </span>
              <p className="text-sm text-mist/90 leading-relaxed font-serif">
                {language === 'hi' ? selectedTemple.significanceHi : selectedTemple.significanceEn}
              </p>
            </div>

            {/* Distance & Travel Box */}
            <div className="p-4 rounded-xl bg-forest/50 border border-mist/15 space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center text-ivory">
                <span className="text-mist/70">Road distance from Bidaliya Niwaas (one way):</span>
                <span className="text-earth-light font-bold">{selectedTemple.roadDistance}</span>
              </div>
              <div className="pt-1 border-t border-mist/10 text-mist/85">
                <span className="text-earth-light">{language === 'hi' ? 'पैदल मार्ग: ' : 'Walking Approach: '}</span>
                <span>{language === 'hi' ? selectedTemple.walkingInfoHi : selectedTemple.walkingInfoEn}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <Link
                href={`/temples/${selectedTemple.slug}`}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-forest hover:bg-forest-dark border border-mist/20 text-xs font-mono text-ivory transition-colors"
              >
                <span>{language === 'hi' ? 'विस्तृत पृष्ठ खोलें' : 'Open Dedicated Page'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-earth-light" />
              </Link>

              <a
                href={selectedTemple.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-earth hover:bg-earth-light text-xs font-semibold text-ivory transition-colors shadow-md"
              >
                <span>{language === 'hi' ? 'गूगल मैप्स पर मार्ग' : 'Open in Google Maps'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
