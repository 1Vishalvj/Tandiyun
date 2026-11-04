'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { Layers, Eye, Mountain, Trees, CloudRain, Navigation } from 'lucide-react';

interface LandscapeSectionProps {
  onSelectPhoto?: (photoId: string) => void;
}

export const LandscapeSection: React.FC<LandscapeSectionProps> = ({ onSelectPhoto }) => {
  const { t, language } = useLanguage();

  const landscapeHighlights = [
    {
      id: 'IMG_20200814_063612',
      image: '/assets/photos/gallery/IMG_20200814_063612.webp',
      badgeEn: 'Surrounding Mountains',
      badgeHi: 'पर्वत शिखर',
      titleEn: 'Endless Horizons of Uttarakhand',
      titleHi: 'उत्तराखंड की अंतहीन पर्वत श्रृंखलाएं',
      descEn: 'Layered Himalayan ridges stretching under the morning dawn.',
      descHi: 'सुबह के उजाले में दूर तक फैली नीली पर्वत चोटियां।',
      icon: Mountain,
      colSpan: 'md:col-span-8',
      aspect: 'aspect-[16/9]',
    },
    {
      id: 'IMG_20200707_090849',
      image: '/assets/photos/gallery/IMG_20200707_090849.webp',
      badgeEn: 'Terraced Hills & Valleys',
      badgeHi: 'सीढ़ीदार खेत एवं घाटी',
      titleEn: 'Lush Terraces of Tandiyun',
      titleHi: 'तंडियूं के हरे-भरे सीढ़ीदार खेत',
      descEn: 'Monsoon greenery covering the slopes and peaceful valley contours.',
      descHi: 'वर्षा ऋतु में हरी चादर ओढ़े शांत पहाड़ी ढलानें।',
      icon: Layers,
      colSpan: 'md:col-span-4',
      aspect: 'aspect-[4/5]',
    },
    {
      id: 'IMG_20200708_161634',
      image: '/assets/photos/gallery/IMG_20200708_161634.webp',
      badgeEn: 'Himalayan Forests',
      badgeHi: 'बांज एवं चीड़ वन',
      titleEn: 'Oak & Pine Canopies',
      titleHi: 'सघन वन संपदा',
      descEn: 'Pristine mountain forests guarding the fresh springs of the hills.',
      descHi: 'शीतल जलस्रोतों को सहेजने वाले पवित्र बांज-बुरांश के जंगल।',
      icon: Trees,
      colSpan: 'md:col-span-4',
      aspect: 'aspect-[4/5]',
    },
    {
      id: 'IMG_20200708_161605',
      image: '/assets/photos/gallery/IMG_20200708_161605.webp',
      badgeEn: 'Approach Route',
      badgeHi: 'आगमन मार्ग',
      titleEn: 'The Uphill Trail from Bidaliya Niwaas',
      titleHi: 'बिडालिया निवास से चढ़ाई मार्ग',
      descEn: 'The traditional footpath leading from the motor road upward.',
      descHi: 'मुख्य सड़क से गांव की ओर जाता पारम्परिक पैदल रास्ता।',
      icon: Navigation,
      colSpan: 'md:col-span-4',
      aspect: 'aspect-[4/5]',
    },
    {
      id: 'IMG_20200814_062035',
      image: '/assets/photos/gallery/IMG_20200814_062035.webp',
      badgeEn: 'Clouds & Dawn',
      badgeHi: 'धुंध और प्रभात',
      titleEn: 'Dawn Mist Over the Ridges',
      titleHi: 'पर्वतमाला पर प्रभात की स्वर्णिम किरणें',
      descEn: 'First sunlight touching the slopes as mist hovers below.',
      descHi: 'सुबह का उजास और पहाड़ियों के बीच अठखेलियां करती धुंध।',
      icon: CloudRain,
      colSpan: 'md:col-span-4',
      aspect: 'aspect-[4/5]',
    },
  ];

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-forest border-t border-mist/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-mist/20 bg-forest-dark/40 text-earth-light text-xs uppercase tracking-[0.2em] font-semibold mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>{t.landscape.badge}</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl text-ivory font-bold tracking-wide">
              {t.landscape.title}
            </h2>
            <p className="mt-4 text-mist/80 text-base sm:text-lg leading-relaxed">
              {t.landscape.subtitle}
            </p>
          </div>

          <a
            href="#gallery"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-mist/20 bg-forest-dark/50 text-ivory hover:border-earth text-sm font-medium transition-all group shrink-0"
          >
            <span>{language === 'hi' ? 'सभी 8 मूल तस्वीरें देखें' : 'View All Original Photos'}</span>
            <Eye className="w-4 h-4 text-earth group-hover:scale-110 transition-transform" />
          </a>
        </div>

        {/* Dynamic Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          {landscapeHighlights.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => onSelectPhoto && onSelectPhoto(item.id)}
                className={`${item.colSpan} group relative rounded-2xl overflow-hidden border border-mist/15 bg-forest-dark cursor-pointer shadow-xl transition-all duration-500 hover:-translate-y-1 hover:border-earth/60`}
              >
                <div className={`relative w-full ${item.aspect} overflow-hidden`}>
                  <Image
                    src={item.image}
                    alt={item.titleEn}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-forest-dark/30 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-dark/80 backdrop-blur-md text-[11px] font-mono text-earth-light border border-mist/15">
                      <IconComponent className="w-3 h-3" />
                      <span>{language === 'hi' ? item.badgeHi : item.badgeEn}</span>
                    </span>
                  </div>

                  {/* Caption & Title */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <h3 className="font-heading text-xl sm:text-2xl text-ivory font-semibold group-hover:text-earth-light transition-colors">
                      {language === 'hi' ? item.titleHi : item.titleEn}
                    </h3>
                    <p className="text-xs sm:text-sm text-mist/80 mt-1 line-clamp-2">
                      {language === 'hi' ? item.descHi : item.descEn}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
