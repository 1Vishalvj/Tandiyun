'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Volume2, VolumeX, Play, Pause, ChevronDown, Mountain } from 'lucide-react';

interface HeroVideoProps {
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({ isMuted, setIsMuted }) => {
  const { t, language } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Sync video muted state with props
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const toggleSound = () => {
    setIsMuted((prev) => !prev);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const scrollToWelcome = () => {
    const welcomeEl = document.querySelector('#welcome-section');
    if (welcomeEl) {
      welcomeEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-deepGreen-dark flex items-center justify-center">
      {/* Background Video with Poster Fallback */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        poster="/assets/videos/hero-poster.webp"
        className="absolute inset-0 w-full h-full object-cover object-center z-0 transition-opacity duration-1000 scale-105"
      >
        <source src="/assets/videos/tandiyun-cinematic.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      {/* Cinematic Dark Gradient & Vignette Overlay */}
      <div className="absolute inset-0 z-10 cinematic-hero-overlay pointer-events-none" />
      <div className="absolute inset-0 z-10 cinematic-vignette pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center pt-16">
        {/* Mountain Icon / Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-mist/20 bg-deepGreen/60 backdrop-blur-md mb-6 animate-fade-in shadow-lg">
          <Mountain className="w-3.5 h-3.5 text-earth-light" />
          <span className="font-devanagari text-sm sm:text-base text-mist/95 tracking-normal">
            {t.hero.kicker}
          </span>
        </div>

        {/* Village Title - Strict formatting: no letter-spacing in Devanagari */}
        <h1
          className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-ivory uppercase leading-tight drop-shadow-2xl mb-3 ${
            language === 'hi'
              ? 'font-devanagari tracking-normal'
              : 'font-heading tracking-[0.22em]'
          }`}
        >
          {t.hero.title}
        </h1>

        {/* Subtitle */}
        {language === 'en' ? (
          <div className="font-devanagari text-2xl sm:text-3xl md:text-4xl text-mist/90 mb-4 tracking-normal font-normal drop-shadow">
            टांडियूं
          </div>
        ) : (
          <div className="font-heading text-lg sm:text-2xl text-mist/90 mb-4 tracking-[0.25em] font-light drop-shadow uppercase">
            TANDIYUN
          </div>
        )}

        {/* Tagline */}
        <p className="font-serif italic text-sm sm:text-lg md:text-xl text-ivory/85 tracking-wide font-light max-w-3xl mb-8 drop-shadow-md">
          {t.hero.tagline}
        </p>

        {/* Geographical Coordinates Badge */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-mist/80 font-mono mb-10 bg-deepGreen-dark/70 px-4 py-2 rounded-xl border border-mist/15 backdrop-blur-sm">
          <span>Bidaliya Niwaas: 30.002638° N, 78.833203° E</span>
          <span className="text-earth">•</span>
          <span>Pauri Garhwal, Uttarakhand</span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={scrollToWelcome}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-earth hover:bg-earth-light text-ivory font-medium tracking-wider text-sm sm:text-base uppercase transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>{t.hero.discoverCta}</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>

          {/* Sound & Play Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSound}
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-full bg-deepGreen/70 hover:bg-forest border border-mist/20 text-ivory text-xs sm:text-sm font-medium backdrop-blur-md transition-all"
              title={isMuted ? t.hero.soundToggleUnmute : t.hero.soundToggleMute}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-mist/70" />
                  <span className="hidden sm:inline">{t.hero.soundToggleUnmute}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-earth-light" />
                  <span className="hidden sm:inline">{t.hero.soundToggleMute}</span>
                </>
              )}
            </button>

            <button
              onClick={togglePlay}
              className="p-3.5 rounded-full bg-deepGreen/70 hover:bg-forest border border-mist/20 text-ivory backdrop-blur-md transition-all"
              title={isPlaying ? t.hero.pauseVideo : t.hero.playVideo}
            >
              {isPlaying ? <Pause className="w-4 h-4 text-mist" /> : <Play className="w-4 h-4 text-earth-light" />}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-mist/70">
          Scroll
        </span>
        <div className="w-4 h-7 rounded-full border border-mist/40 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-earth-light rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};
