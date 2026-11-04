'use client';

import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  showTagline = true,
}) => {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2 sm:gap-3 transition-opacity duration-300 hover:opacity-95 shrink-0 ${className}`}
      aria-label="Tandiyun Home"
    >
      {/* Mountain Crest Icon */}
      <div className="relative flex items-center justify-center w-8 h-8 xs:w-9 xs:h-9 sm:w-11 sm:h-11 rounded-lg bg-forest/80 border border-mist/20 p-1.5 sm:p-2 shadow-inner group-hover:border-earth/60 transition-colors shrink-0">
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-mist group-hover:text-ivory transition-colors"
        >
          {/* Background Mountain Ridge */}
          <path
            d="M4 32L16 14L24 24L36 32H4Z"
            fill="currentColor"
            fillOpacity="0.25"
          />
          {/* Forefront Prominent Peaks (Garhwal Ridge) */}
          <path
            d="M12 32L21 8L32 26L38 32H12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Central Ridge Highlight */}
          <path
            d="M21 8L20 32"
            stroke="#A66F43"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Traditional Himalayan Arch Base */}
          <path
            d="M2 34H38"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Sun / Spiritual Bindu */}
          <circle cx="21" cy="4" r="1.5" fill="#A66F43" />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col text-left min-w-0">
        <div className="flex items-baseline gap-1.5 sm:gap-2">
          <span className="font-heading tracking-[0.16em] sm:tracking-[0.22em] text-base xs:text-lg sm:text-xl font-bold text-ivory uppercase leading-none">
            TANDIYUN
          </span>
          <span className="font-devanagari text-[11px] xs:text-xs sm:text-sm text-mist/85 font-medium tracking-normal shrink-0 leading-none">
            टांडियूं
          </span>
        </div>
        {showTagline && (
          <span className="hidden sm:inline text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-earth-light font-medium mt-1 truncate">
            Pauri Garhwal • Uttarakhand
          </span>
        )}
      </div>
    </Link>
  );
};
