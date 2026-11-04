'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { TerrainViewer3D } from '@/components/TerrainViewer3D';
import { Compass, Box, Map, MapPin, Footprints, AlertTriangle, ExternalLink, Info, ArrowLeft } from 'lucide-react';

// Dynamic import for Leaflet 2D Map to avoid SSR window issues
const VillageMap = dynamic(
  () => import('@/components/VillageMap').then((mod) => mod.VillageMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[650px] w-full rounded-3xl bg-forest-dark border border-mist/20 flex flex-col items-center justify-center text-mist/60">
        <Map className="w-10 h-10 mb-3 animate-pulse text-earth-light" />
        <span className="text-sm font-mono">Loading 2D Interactive Map...</span>
      </div>
    ),
  }
);

export default function ExplorePage() {
  const { t, language } = useLanguage();
  const [viewMode, setViewMode] = useState<'3d' | 'map'>('3d');

  return (
    <main className="min-h-screen bg-deepGreen-dark flex flex-col text-ivory">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-8 px-4 sm:px-6 lg:px-8 bg-forest border-b border-mist/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-mist/20 bg-forest-dark/80 text-earth-light text-xs uppercase tracking-[0.2em] font-semibold mb-3">
                <Compass className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? '3D भौगोलिक अन्वेषण' : 'Interactive 3D Geographical Exploration'}</span>
              </div>
              <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-wide">
                {language === 'hi' ? 'टांडियूं 3D भू-भाग एवं भौगोलिक मानचित्र' : 'Explore Tandiyun in 3D & Maps'}
              </h1>
              <p className="mt-2 text-mist/85 text-sm sm:text-base font-serif max-w-3xl">
                {language === 'hi'
                  ? 'बिडालिया निवास (सड़क मार्ग) से टांडियूं गांव (पहाड़ी ढलान) के भौगोलिक संबंध, चढ़ाई वाले पैदल मार्ग और पर्वत श्रेणियों का त्रिविमीय अन्वेषण करें।'
                  : 'Examine the uphill geographical relationship from the motor road at Bidaliya Niwaas to Tandiyun Village, featuring authentic coordinates, mountain ridges, and walking trail visualization.'}
              </p>
            </div>

            {/* 3D / 2D Switcher */}
            <div className="flex items-center p-1.5 rounded-2xl bg-forest-dark border border-mist/20 shadow-xl shrink-0">
              <button
                onClick={() => setViewMode('3d')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  viewMode === '3d'
                    ? 'bg-earth text-ivory shadow-lg scale-102'
                    : 'text-mist/70 hover:text-ivory'
                }`}
              >
                <Box className="w-4 h-4" />
                <span>{language === 'hi' ? '3D भू-भाग (Three.js)' : '3D Terrain'}</span>
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  viewMode === 'map'
                    ? 'bg-earth text-ivory shadow-lg scale-102'
                    : 'text-mist/70 hover:text-ivory'
                }`}
              >
                <Map className="w-4 h-4" />
                <span>{language === 'hi' ? '2D उपग्रह मानचित्र' : '2D Map'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Viewer Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Viewer (8 or 9 cols on desktop) */}
          <div className="lg:col-span-8 xl:col-span-9 w-full">
            <div className="rounded-3xl overflow-hidden border border-mist/20 bg-forest-dark shadow-2xl relative min-h-[580px] sm:min-h-[660px]">
              {viewMode === '3d' ? (
                <TerrainViewer3D isDedicatedPage={true} />
              ) : (
                <div className="p-4 sm:p-6">
                  <VillageMap />
                </div>
              )}
            </div>

            {/* Interaction Tips Bar */}
            <div className="mt-4 p-4 rounded-2xl bg-forest/40 border border-mist/10 flex flex-wrap items-center justify-between text-xs font-mono text-mist/75 gap-3">
              <div className="flex items-center gap-4">
                <span>🖱️ Left-Click + Drag: Rotate</span>
                <span>•</span>
                <span>Scroll: Zoom In / Out</span>
                <span>•</span>
                <span>Right-Click + Drag: Pan</span>
              </div>
              <div className="text-earth-light">
                WebGL High-Performance Render
              </div>
            </div>
          </div>

          {/* Geographical Reference Panel (4 or 3 cols on desktop) */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-6">
            {/* Coordinate 1: Bidaliya Niwaas */}
            <div className="p-6 rounded-3xl bg-forest/70 border border-mist/15 space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono bg-earth/20 text-earth-light border border-earth/30">
                  <MapPin className="w-3 h-3" />
                  Roadhead Arrival Point
                </span>
                <span className="text-[10px] font-mono text-mist/60">Benchmark</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-ivory">
                Bidaliya Niwaas
              </h3>
              <p className="text-xs text-mist/85 leading-relaxed font-serif">
                {language === 'hi'
                  ? 'मुख्य मोटर मार्ग के किनारे स्थित। वाहन द्वारा पहुंचने का अंतिम पड़ाव और सभी दिशाओं का प्रामाणिक संदर्भ केंद्र।'
                  : 'Located directly beside the motorable road. The standard vehicular arrival point and reference origin for all road distance measurements.'}
              </p>
              <div className="p-3 rounded-xl bg-forest-dark/90 font-mono text-xs text-earth-light space-y-1">
                <div>Lat: 30.0026375° N</div>
                <div>Long: 78.8332031° E</div>
              </div>
              <a
                href="https://www.google.com/maps/place/Bidaliya+Niwaas/@30.0022945,78.8331629,93m/data=!3m1!1e3!4m6!3m5!1s0x3909990045116f6b:0x65346244ae358083!8m2!3d30.0026375!4d78.8332031!16s%2Fg%2F11ygfr8b6d"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-forest hover:bg-forest-light text-xs font-medium text-ivory border border-mist/20 transition-colors"
              >
                <span>Google Maps Landmark</span>
                <ExternalLink className="w-3 h-3 text-earth-light" />
              </a>
            </div>

            {/* Coordinate 2: Tandiyun Village */}
            <div className="p-6 rounded-3xl bg-forest/70 border border-mist/15 space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono bg-forest-dark text-mist/90 border border-mist/20">
                  <Footprints className="w-3 h-3 text-earth-light" />
                  Hillside Village
                </span>
                <span className="text-[10px] font-mono text-earth-light">Provisional</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-ivory">
                Tandiyun (टांडियूं)
              </h3>
              <p className="text-xs text-mist/85 leading-relaxed font-serif">
                {language === 'hi'
                  ? 'बिडालिया निवास से ऊपर पहाड़ी ढलान पर बसा शांत गांव। आगंतुक पगडंडी से चढ़ाई करके पैदल गांव में प्रवेश करते हैं।'
                  : 'Situated uphill on the mountain slope above Bidaliya Niwaas. Reached via an ascending walking footpath (~300m).'}
              </p>
              <div className="p-3 rounded-xl bg-forest-dark/90 font-mono text-xs text-mist/90 space-y-1">
                <div>Lat: 30.001952° N</div>
                <div>Long: 78.834910° E</div>
                <div className="text-[10px] text-earth-light italic">(Provisional Coordinate)</div>
              </div>
            </div>

            {/* Elevation & Verification Notice */}
            <div className="p-5 rounded-2xl bg-earth-dark/25 border border-earth/40 text-xs text-mist/85 space-y-2">
              <div className="flex items-center gap-2 text-earth-light font-bold font-mono uppercase text-[11px]">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Geographical Integrity Notice</span>
              </div>
              <p className="leading-relaxed">
                {language === 'hi'
                  ? 'यह 3D परिदृश्य क्षेत्रीय हिमालयी समोच्च रेखाओं के आधार पर निर्मित एक कलात्मक एवं भू-आकृतिक मॉडल है। किसी भी असत्यापित ऊंचाई या ढलान आंकड़े को अंतिम सत्य के रूप में प्रस्तुत नहीं किया गया है।'
                  : 'This 3D terrain visualization represents a conceptual geographical model calibrated to regional Garhwal contours. Unverified elevation figures are not presented as definitive.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
