'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { ImageLightbox, PhotoItem } from './ImageLightbox';
import photosData from '@/data/photos.json';
import { Camera, Maximize2, Sparkles } from 'lucide-react';

interface LandscapeGalleryProps {
  selectedPhotoId?: string | null;
  onClearSelectedPhoto?: () => void;
}

export const LandscapeGallery: React.FC<LandscapeGalleryProps> = ({
  selectedPhotoId,
  onClearSelectedPhoto,
}) => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'All', labelEn: 'All Photos', labelHi: 'सभी तस्वीरें' },
    { id: 'Mountain Views', labelEn: 'Mountain Views', labelHi: 'पर्वत शिखर' },
    { id: 'Clouds & Mist', labelEn: 'Clouds & Mist', labelHi: 'बादल एवं धुंध' },
    { id: 'Green Landscapes', labelEn: 'Green Landscapes', labelHi: 'हरियाली व वादियां' },
    { id: 'Village Memories', labelEn: 'Village Memories', labelHi: 'ग्राम स्मृतियां' },
    { id: 'Sunrise & Sunset', labelEn: 'Sunrise & Sunset', labelHi: 'सूर्योदय व संध्या' },
    { id: 'Village Life', labelEn: 'Village Life', labelHi: 'ग्रामीण जीवन' },
  ];

  const photos = photosData as PhotoItem[];

  // Filter photos
  const filteredPhotos = activeCategory === 'All'
    ? photos
    : photos.filter((p) => p.categories.includes(activeCategory));

  // If a photo was selected from the landscape section, open it directly in the lightbox
  React.useEffect(() => {
    if (selectedPhotoId) {
      const idx = photos.findIndex((p) => p.id === selectedPhotoId);
      if (idx !== -1) {
        setLightboxIndex(idx);
      }
      if (onClearSelectedPhoto) onClearSelectedPhoto();
    }
  }, [selectedPhotoId, photos, onClearSelectedPhoto]);

  const openLightbox = (indexInFiltered: number) => {
    const photo = filteredPhotos[indexInFiltered];
    const fullIndex = photos.findIndex((p) => p.id === photo.id);
    setLightboxIndex(fullIndex !== -1 ? fullIndex : 0);
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % photos.length : 0));
  };

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : 0));
  };

  return (
    <section id="gallery" className="relative py-16 sm:py-24 lg:py-28 px-3 xs:px-4 sm:px-6 lg:px-8 bg-forest border-t border-mist/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-mist/20 bg-forest-dark/40 text-earth-light text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>{t.gallery.badge}</span>
          </div>
          <h2 className="font-heading text-2xl xs:text-3xl sm:text-5xl md:text-6xl text-ivory font-bold tracking-wide px-2">
            {t.gallery.title}
          </h2>
          <p className="mt-2 sm:mt-4 text-mist/80 text-xs sm:text-base md:text-lg max-w-2xl px-2">
            {t.gallery.subtitle}
          </p>
          <div className="w-16 sm:w-20 h-0.5 bg-earth mt-4 sm:mt-6 rounded-full" />
        </div>

        {/* Mobile Horizontal Scrollable Category Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto scrollbar-none py-2 gap-2 sm:gap-3 mb-8 sm:mb-12 px-1 -mx-2 sm:mx-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`min-h-[40px] px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap transition-all shrink-0 active:scale-95 ${
                activeCategory === cat.id
                  ? 'bg-earth text-ivory shadow-lg font-bold'
                  : 'bg-forest-dark/80 text-mist/75 hover:text-ivory hover:bg-forest-dark border border-mist/15'
              }`}
            >
              {language === 'hi' ? cat.labelHi : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Responsive Grid: 1 col on <375px, 2 cols on 375px–1023px, 3 cols on desktop */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
          {filteredPhotos.map((photo, idx) => {
            const isLandscape = photo.orientation === 'landscape';
            return (
              <div
                key={photo.id}
                onClick={() => openLightbox(idx)}
                className="group relative rounded-2xl overflow-hidden border border-mist/15 bg-forest-dark cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-earth/60 active:scale-[0.99]"
              >
                <div className={`relative w-full ${isLandscape ? 'aspect-[4/3]' : 'aspect-[3/4]'} overflow-hidden`}>
                  <Image
                    src={photo.thumbSrc}
                    alt={language === 'hi' ? photo.titleHi : photo.titleEn}
                    fill
                    sizes="(max-width: 375px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-forest-dark/20 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />

                  {/* Tap to expand hint */}
                  <div className="absolute top-2.5 right-2.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="p-1.5 sm:p-2 rounded-full bg-forest-dark/80 backdrop-blur-md text-ivory border border-mist/20">
                      <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-earth-light" />
                    </div>
                  </div>

                  {/* Caption & Metadata */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-earth-light bg-forest-dark/80 px-2 py-0.5 rounded border border-mist/10 truncate">
                        {photo.category}
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-mono text-mist/60 shrink-0">
                        {photo.capturedAt.split(' ')[0]}
                      </span>
                    </div>
                    <h3 className="font-heading text-sm xs:text-base sm:text-xl text-ivory font-semibold group-hover:text-earth-light transition-colors line-clamp-1">
                      {language === 'hi' ? photo.titleHi : photo.titleEn}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-mist/80 mt-0.5 line-clamp-2">
                      {language === 'hi' ? photo.captionHi : photo.captionEn}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Authenticity Guarantee Note */}
        <div className="mt-10 sm:mt-14 max-w-2xl mx-auto p-3.5 sm:p-4 rounded-xl border border-mist/15 bg-forest-dark/50 text-center flex items-center justify-center gap-2 text-xs font-mono text-mist/75">
          <Sparkles className="w-4 h-4 text-earth-light shrink-0" />
          <span>8 Genuine Photographs preserved from July & August 2020. No synthetic replacements.</span>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <ImageLightbox
        photos={photos}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
};
