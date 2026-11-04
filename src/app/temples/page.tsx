'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SpiritualPlaces } from '@/components/SpiritualPlaces';
import { useLanguage } from '@/context/LanguageContext';
import templesData from '@/data/temples.json';
import { Sparkles, MapPin, ExternalLink, ArrowRight, ShieldCheck, AlertCircle, Compass } from 'lucide-react';

export default function TemplesIndexPage() {
  const { t, language } = useLanguage();

  return (
    <main className="min-h-screen bg-deepGreen-dark flex flex-col text-ivory">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-28 sm:pt-36 pb-12 px-4 sm:px-6 lg:px-8 bg-forest border-b border-mist/10 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-mist/20 bg-forest-dark/80 text-earth-light text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'आध्यात्मिक धरोहर एवं तीर्थ' : 'Spiritual Destinations & Shrines'}</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-wide text-ivory">
            {language === 'hi'
              ? 'टांडियूं और आसपास के पवित्र स्थल'
              : 'Temples & Sacred Places Around टांडियूं'}
          </h1>

          <p className="mt-4 text-mist/85 text-base sm:text-lg font-serif max-w-2xl mx-auto leading-relaxed">
            {language === 'hi'
              ? 'पौड़ी गढ़वाल के पावन शक्तिपीठ, शिखर मंदिर और प्राचीन धार्मिक स्थल — बिडालिया निवास से एकतरफा सड़क दूरी एवं यात्रा विवरण सहित।'
              : 'Sacred Shaktipeeths, ancient stone sanctuaries, and mountain shrines of Pauri Garhwal — with authenticated one-way road distances from Bidaliya Niwaas.'}
          </p>
        </div>
      </section>

      {/* The 4 Sacred Destinations Grid */}
      <div className="flex-1">
        <SpiritualPlaces limit={undefined} showAllCta={false} />
      </div>

      {/* Road Distance Matrix Table */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-forest border-t border-mist/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl sm:text-3xl text-ivory font-bold mb-3 text-center">
            {language === 'hi'
              ? 'तीर्थ दूरी तालिका (एकतरफा सड़क मार्ग)'
              : 'Sacred Destinations Road Distance Matrix'}
          </h2>
          <p className="text-xs text-mist/80 text-center mb-8 font-mono">
            Origin: Bidaliya Niwaas (30.002638° N, 78.833203° E)
          </p>

          <div className="overflow-x-auto rounded-2xl border border-mist/15 bg-deepGreen-dark/90 shadow-xl">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-forest-dark border-b border-mist/20 text-earth-light uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-4 sm:px-6 font-semibold">
                    {language === 'hi' ? 'तीर्थ स्थल' : 'Destination'}
                  </th>
                  <th className="py-4 px-4 sm:px-6 font-semibold">
                    {language === 'hi' ? 'देवी-देवता / श्रेणी' : 'Deity / Category'}
                  </th>
                  <th className="py-4 px-4 sm:px-6 font-semibold">
                    {language === 'hi' ? 'सत्यापन स्थिति' : 'Status'}
                  </th>
                  <th className="py-4 px-4 sm:px-6 font-semibold text-right">
                    Road distance from Bidaliya Niwaas (one way)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mist/10 text-mist/90">
                {templesData.map((temple) => (
                  <tr key={temple.id} className="hover:bg-forest/50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-ivory">
                      <Link
                        href={`/temples/${temple.slug}`}
                        className="hover:text-earth-light transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>{language === 'hi' ? temple.nameHi : temple.nameEn}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-earth-light" />
                      </Link>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6">
                      {language === 'hi' ? temple.deityHi : temple.deityEn}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6">
                      {temple.distanceStatus === 'Verified' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-300">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Verified</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] text-amber-300">
                          <AlertCircle className="w-3 h-3" />
                          <span>Approximate</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-right font-bold text-earth-light">
                      {temple.roadDistance}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

