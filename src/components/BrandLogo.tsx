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
      href="#home"
      className={`group inline-flex items-center gap-3 transition-opacity duration-300 hover:opacity-95 ${className}`}
      aria-label="Tandiyun Home"
    >
      {/* Mountain Crest Icon */}
      <div className="relative flex items-center justify-center w-11 h-11 rounded-lg bg-forest/80 border border-mist/20 p-2 shadow-inner group-hover:border-earth/60 transition-colors">
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
      <div className="flex flex-col text-left">
        <div className="flex items-baseline gap-2">
          <span className="font-heading tracking-[0.25em] text-xl font-bold text-ivory uppercase">
            TANDIYUN
          </span>
          <span className="font-devanagari text-xs text-mist/75 font-normal tracking-wide">
            तंडियूं
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] uppercase tracking-[0.2em] text-earth-light font-medium">
            Garhwal • Uttarakhand
          </span>
        )}
      </div>
    </Link>
  );
};

