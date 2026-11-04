'use client';

import React, { useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { X, ChevronLeft, ChevronRight, Calendar, Camera, Download } from 'lucide-react';

export interface PhotoItem {
  id: string;
  filename: string;
  src: string;
  webpSrc: string;
  thumbSrc: string;
  category: string;
  categories: string[];
  titleEn: string;
  titleHi: string;
  captionEn: string;
  captionHi: string;
  capturedAt: string;
  orientation: string;
  width: number;
  height: number;
  featured: boolean;
}

interface ImageLightboxProps {
  photos: PhotoItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  photos,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}) => {
  const { language } = useLanguage();
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    if (currentIndex !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, handleKeyDown]);

  if (currentIndex === null || !photos[currentIndex]) return null;

  const currentPhoto = photos[currentIndex];

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      onNext(); // swipe left to view next
    } else if (distance < -minSwipeDistance) {
      onPrev(); // swipe right to view prev
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-deepGreen-dark/98 backdrop-blur-2xl animate-fade-in select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Photo Lightbox"
    >
      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between px-3 sm:px-8 py-3 sm:py-4 border-b border-mist/10 bg-forest/40">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <span className="font-heading text-sm sm:text-lg text-ivory tracking-wider truncate">
            TANDIYUN ARCHIVE
          </span>
          <span className="text-mist/40">•</span>
          <span className="text-xs font-mono text-earth-light shrink-0">
            {currentIndex + 1} / {photos.length}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href={currentPhoto.src}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-mist/20 text-xs text-mist hover:text-ivory hover:border-earth transition-colors"
            title="View original uncompressed photo"
          >
            <Download className="w-3.5 h-3.5 text-earth-light" />
            <span>Original</span>
          </a>

          {/* Accessible Close Button (Min 44x44px Touch Target) */}
          <button
            onClick={onClose}
            className="flex items-center justify-center min-w-[44px] min-h-[44px] p-2 rounded-full bg-forest-light/40 hover:bg-forest text-ivory transition-colors active:scale-95"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>

      {/* Main Image Stage with Swipe Gestures */}
      <div
        className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Previous Button (Hidden on very small mobile to prioritize photo view, accessible via swipe) */}
        <button
          onClick={onPrev}
          className="absolute left-2 sm:left-6 z-20 flex items-center justify-center min-w-[44px] min-h-[44px] p-2 rounded-full bg-deepGreen-dark/75 hover:bg-forest text-ivory border border-mist/20 backdrop-blur-md transition-all active:scale-95"
          aria-label="Previous Photo"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Current Photo Frame */}
        <div className="relative max-w-5xl max-h-[65vh] sm:max-h-[72vh] w-full h-full flex items-center justify-center">
          <div className="relative w-full h-full">
            <Image
              src={currentPhoto.webpSrc}
              alt={language === 'hi' ? currentPhoto.titleHi : currentPhoto.titleEn}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 90vw"
              priority
            />
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={onNext}
          className="absolute right-2 sm:right-6 z-20 flex items-center justify-center min-w-[44px] min-h-[44px] p-2 rounded-full bg-deepGreen-dark/75 hover:bg-forest text-ivory border border-mist/20 backdrop-blur-md transition-all active:scale-95"
          aria-label="Next Photo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Swipe Hint Pill for Mobile */}
        <div className="sm:hidden absolute top-3 left-1/2 -translate-x-1/2 pointer-events-none px-3 py-1 rounded-full bg-black/60 text-[10px] font-mono text-mist/70">
          Swipe left / right to navigate
        </div>
      </div>

      {/* Bottom Caption & Metadata Bar */}
      <div className="relative z-10 px-4 sm:px-8 py-3 sm:py-5 border-t border-mist/10 bg-deepGreen-dark/95 max-h-[30vh] overflow-y-auto">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-1.5 mb-1">
              {currentPhoto.categories.map((cat) => (
                <span
                  key={cat}
                  className="px-2 py-0.5 rounded-full bg-forest text-[10px] sm:text-[11px] font-mono text-earth-light border border-mist/10"
                >
                  {cat}
                </span>
              ))}
            </div>
            <h3 className="font-heading text-lg sm:text-2xl text-ivory font-semibold">
              {language === 'hi' ? currentPhoto.titleHi : currentPhoto.titleEn}
            </h3>
            <p className="text-xs sm:text-sm text-mist/85 mt-0.5 sm:mt-1 font-serif italic">
              {language === 'hi' ? currentPhoto.captionHi : currentPhoto.captionEn}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] sm:text-xs font-mono text-mist/70 shrink-0">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-earth-light" />
              <span>{currentPhoto.capturedAt.split(' ')[0]}</span>
            </div>
            <div className="hidden xs:flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-earth-light" />
              <span>{currentPhoto.width} × {currentPhoto.height} px</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
