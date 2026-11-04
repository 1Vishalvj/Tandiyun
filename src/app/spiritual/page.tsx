'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SpiritualPlaces } from '@/components/SpiritualPlaces';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, MapPin, Footprints, AlertTriangle } from 'lucide-react';

export default function SpiritualPage() {
  const { t, language } = useLanguage();

  return (
    <main className="min-h-screen bg-deepGreen-dark flex flex-col text-ivory">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-8 px-4 sm:px-6 lg:px-8 bg-forest border-b border-mist/10 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-mist/20 bg-forest-dark/80 text-earth-light text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'आध्यात्मिक धरोहर एवं तीर्थ' : 'Spiritual Destinations & Shrines'}</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-wide">
            {language === 'hi' ? 'आस्था जो हमें जोड़ती है' : 'Faith That Connects Us'}
          </h1>
          <p className="mt-4 text-mist/85 text-base sm:text-lg font-serif max-w-2xl mx-auto">
            {language === 'hi'
              ? 'पौड़ी गढ़वाल के पावन शक्तिपीठ, शिखर मंदिर और प्राचीन धार्मिक स्थल — बिडालिया निवास से एकतरफा सड़क दूरी एवं यात्रा विवरण सहित।'
              : 'Sacred Shaktipeeths, ancient stone shrines, and mountain temples of Pauri Garhwal — with authenticated one-way road distances from Bidaliya Niwaas.'}
          </p>
        </div>
      </section>

      {/* Full 9 Destinaton Directory */}
      <div className="flex-1">
        <SpiritualPlaces limit={undefined} showAllCta={false} />
      </div>

      {/* Summary Table Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-forest border-t border-mist/10">
        <div className="max-w-4xl mx-auto">
          <h3 className="font-heading text-2xl text-ivory font-bold mb-4 text-center">
            {language === 'hi' ? 'तीर्थ दूरी तालिका (एकतरफा सड़क मार्ग)' : 'Spiritual Destinations Road Distance Matrix'}
          </h3>
          <p className="text-xs text-mist/80 text-center mb-6 font-mono">
            Origin: Bidaliya Niwaas (30.002638° N, 78.833203° E)
          </p>

          <div className="overflow-x-auto rounded-2xl border border-mist/15 bg-deepGreen-dark/90 shadow-xl">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-forest-dark border-b border-mist/20 text-earth-light uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6 font-semibold">Destination</th>
                  <th className="py-3.5 px-4 sm:px-6 font-semibold">Deity / Category</th>
                  <th className="py-3.5 px-4 sm:px-6 font-semibold text-right">Road distance from Bidaliya Niwaas (one way)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mist/10 text-mist/90">
                <tr className="hover:bg-forest/50 transition-colors">
                  <td className="py-3 px-4 sm:px-6 font-semibold text-ivory">Maa Jwalpa Devi Temple</td>
                  <td className="py-3 px-4 sm:px-6">Maa Jwalpa Devi / Durga</td>
                  <td className="py-3 px-4 sm:px-6 text-right font-bold text-earth-light">14 km</td>
                </tr>
                <tr className="hover:bg-forest/50 transition-colors">
                  <td className="py-3 px-4 sm:px-6 font-semibold text-ivory">Deeba Devi Temple</td>
                  <td className="py-3 px-4 sm:px-6">Maa Deeba Devi</td>
                  <td className="py-3 px-4 sm:px-6 text-right font-bold text-earth-light">Approximately 25 km</td>
                </tr>
                <tr className="hover:bg-forest/50 transition-colors">
                  <td className="py-3 px-4 sm:px-6 font-semibold text-ivory">Kyunkaleshwar Mahadev</td>
                  <td className="py-3 px-4 sm:px-6">Lord Shiva (8th-century)</td>
                  <td className="py-3 px-4 sm:px-6 text-right font-bold text-earth-light">50 km</td>
                </tr>
                <tr className="hover:bg-forest/50 transition-colors">
                  <td className="py-3 px-4 sm:px-6 font-semibold text-ivory">Bunkhal Kalinka Devi Temple</td>
                  <td className="py-3 px-4 sm:px-6">Maa Kalinka / Kali</td>
                  <td className="py-3 px-4 sm:px-6 text-right font-bold text-earth-light">50 Km</td>
                </tr>
                <tr className="hover:bg-forest/50 transition-colors">
                  <td className="py-3 px-4 sm:px-6 font-semibold text-ivory">Tarakund Mahadev</td>
                  <td className="py-3 px-4 sm:px-6">Lord Shiva & Alpine Lake</td>
                  <td className="py-3 px-4 sm:px-6 text-right font-bold text-earth-light">56 km</td>
                </tr>
                <tr className="hover:bg-forest/50 transition-colors">
                  <td className="py-3 px-4 sm:px-6 font-semibold text-ivory">Danda Nagraja Temple</td>
                  <td className="py-3 px-4 sm:px-6">Lord Krishna (Nagraja)</td>
                  <td className="py-3 px-4 sm:px-6 text-right font-bold text-earth-light">75 km</td>
                </tr>
                <tr className="hover:bg-forest/50 transition-colors">
                  <td className="py-3 px-4 sm:px-6 font-semibold text-ivory">Binsar Mahadev</td>
                  <td className="py-3 px-4 sm:px-6">Lord Shiva / Bindeshwar (~2,480m)</td>
                  <td className="py-3 px-4 sm:px-6 text-right font-bold text-earth-light">106 km</td>
                </tr>
                <tr className="hover:bg-forest/50 transition-colors">
                  <td className="py-3 px-4 sm:px-6 font-semibold text-ivory">Gujru Garhi</td>
                  <td className="py-3 px-4 sm:px-6">Medieval Garhi Hill Fort</td>
                  <td className="py-3 px-4 sm:px-6 text-right font-bold text-earth-light">125 km</td>
                </tr>
                <tr className="hover:bg-forest/50 transition-colors">
                  <td className="py-3 px-4 sm:px-6 font-semibold text-ivory">Maa Bungi Devi Temple</td>
                  <td className="py-3 px-4 sm:px-6">Maa Bungi Devi</td>
                  <td className="py-3 px-4 sm:px-6 text-right font-bold text-earth-light">142 km</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
