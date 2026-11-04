'use client';

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { X, ChevronLeft, ChevronRight, Calendar, Camera, ExternalLink, Download } from 'lucide-react';

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

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-forest-dark/98 backdrop-blur-2xl animate-fade-in">
      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-4 border-b border-mist/10 bg-forest/40">
        <div className="flex items-center gap-3">
          <span className="font-heading text-lg text-ivory tracking-wider">
            TANDIYUN ARCHIVE
          </span>
          <span className="text-mist/40">•</span>
          <span className="text-xs font-mono text-mist/80">
            {currentIndex + 1} / {photos.length}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={currentPhoto.src}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-mist/20 text-xs text-mist hover:text-ivory hover:border-earth transition-colors"
            title="View original uncompressed photo"
          >
            <Download className="w-3.5 h-3.5 text-earth-light" />
            <span>Original RAW</span>
          </a>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-forest-light/30 hover:bg-forest text-ivory transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden select-none">
        {/* Previous Button */}
        <button
          onClick={onPrev}
          className="absolute left-2 sm:left-6 z-20 p-3 rounded-full bg-forest-dark/70 hover:bg-forest text-ivory border border-mist/20 backdrop-blur-md transition-all hover:scale-105"
          aria-label="Previous Photo"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Current Photo Frame */}
        <div className="relative max-w-5xl max-h-[72vh] w-full h-full flex items-center justify-center">
          <div className="relative w-full h-full">
            <Image
              src={currentPhoto.webpSrc}
              alt={language === 'hi' ? currentPhoto.titleHi : currentPhoto.titleEn}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={onNext}
          className="absolute right-2 sm:right-6 z-20 p-3 rounded-full bg-forest-dark/70 hover:bg-forest text-ivory border border-mist/20 backdrop-blur-md transition-all hover:scale-105"
          aria-label="Next Photo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Caption & Metadata Bar */}
      <div className="relative z-10 px-4 sm:px-8 py-5 border-t border-mist/10 bg-forest-dark/95">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              {currentPhoto.categories.map((cat) => (
                <span
                  key={cat}
                  className="px-2.5 py-0.5 rounded-full bg-forest text-[11px] font-mono text-earth-light border border-mist/10"
                >
                  {cat}
                </span>
              ))}
            </div>
            <h3 className="font-heading text-xl sm:text-2xl text-ivory font-semibold">
              {language === 'hi' ? currentPhoto.titleHi : currentPhoto.titleEn}
            </h3>
            <p className="text-sm text-mist/85 mt-1 font-serif italic">
              {language === 'hi' ? currentPhoto.captionHi : currentPhoto.captionEn}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-mist/70 shrink-0">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-earth-light" />
              <span>{currentPhoto.capturedAt}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-earth-light" />
              <span>{currentPhoto.width} × {currentPhoto.height} px</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
