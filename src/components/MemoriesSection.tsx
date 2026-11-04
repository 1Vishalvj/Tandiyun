'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { BookOpen, Heart, ArrowRight, Camera, MessageSquareQuote } from 'lucide-react';

export const MemoriesSection: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="memories" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-forest border-t border-mist/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-mist/20 bg-forest-dark/50 text-earth-light text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'स्मृतियों की धरोहर' : 'Living Heritage'}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl text-ivory font-bold tracking-wide">
            {language === 'hi' ? 'टांडियूं की स्मृतियां एवं संस्मरण' : 'Memories of Tandiyun'}
          </h2>
          <p className="mt-4 text-mist/80 text-base sm:text-lg max-w-2xl font-serif">
            {language === 'hi'
              ? 'बचपन के दिन, बुजुर्गों की बातें, खेतों की हलचल और त्योहारों की गूंज — जो हमें हमेशा अपनी जड़ों से जोड़ कर रखती हैं।'
              : 'Preserving village memories, family gatherings, elder voices, and the quiet dignity of traditional mountain life across generations.'}
          </p>
          <div className="w-20 h-0.5 bg-earth mt-6 rounded-full" />
        </div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Visual Photo (7 cols) */}
          <div className="lg:col-span-7 relative group">
            <div className="relative h-96 sm:h-[460px] w-full rounded-3xl overflow-hidden border border-mist/20 shadow-2xl bg-forest-dark">
              <Image
                src="/assets/photos/gallery/IMG_20200708_161601.webp"
                alt="Traditional mountain homes of Tandiyun"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deepGreen-dark/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[11px] font-mono text-earth-light uppercase tracking-widest block">
                  Original Village Scene • July 2020
                </span>
                <p className="font-heading text-xl sm:text-2xl font-bold text-ivory mt-1">
                  {language === 'hi'
                    ? 'पहाड़ी ढलान पर शांत बसे पारम्परिक घर'
                    : 'Traditional Stone Homes Resting on the Hillside'}
                </p>
                <p className="text-xs sm:text-sm text-mist/85 font-serif italic mt-1">
                  {language === 'hi'
                    ? 'बिडालिया निवास से ऊपर चढ़ाई पर बसा हमारा आत्मीय गांव'
                    : 'The heart of Tandiyun above the motorable approach route'}
                </p>
              </div>
            </div>
          </div>

          {/* Memory Snippets (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-deepGreen-dark/70 border border-mist/15 space-y-3">
              <div className="flex items-center gap-2 text-earth-light text-xs font-mono font-bold uppercase tracking-wider">
                <MessageSquareQuote className="w-4 h-4" />
                <span>{language === 'hi' ? 'बुजुर्गों की वाणी' : 'Voices of the Elders'}</span>
              </div>
              <p className="text-sm text-mist/90 leading-relaxed font-serif">
                {language === 'hi'
                  ? '“गांव में जब सांझ ढलती थी और चूल्हों से धुआं उठता था, तो पूरा गांव एक आंगन की तरह लगता था। हर सुख-दुख में सब साथ थे।”'
                  : '“When twilight descended over the ridges and woodsmoke curled from family hearths, the entire village felt like one shared courtyard.”'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-deepGreen-dark/70 border border-mist/15 space-y-3">
              <div className="flex items-center gap-2 text-earth-light text-xs font-mono font-bold uppercase tracking-wider">
                <Heart className="w-4 h-4" />
                <span>{language === 'hi' ? 'प्रवासी बंधुओं का जुड़ाव' : 'Diaspora Connection'}</span>
              </div>
              <p className="text-sm text-mist/90 leading-relaxed font-serif">
                {language === 'hi'
                  ? 'देश-विदेश में बसे परिवारों के लिए बिडालिया निवास से गांव की ओर चढ़ाई केवल एक रास्ता नहीं, बल्कि अपनी मिट्टी से साक्षात्कार का पावन अनुभव है।'
                  : 'For families dwelling in distant cities, the uphill walk from Bidaliya Niwaas to Tandiyun remains an emotional homecoming.'}
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/stories"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-earth hover:bg-earth-light text-ivory text-xs font-mono uppercase tracking-wider transition-all shadow-xl hover:scale-105"
              >
                <span>{language === 'hi' ? 'सभी संस्मरण एवं इतिहास पढ़ें' : 'Read Full Stories & Archive'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
