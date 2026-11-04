'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Volume2, VolumeX, ChevronDown, Play, Pause, Mountain } from 'lucide-react';

interface HeroVideoProps {
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({ isMuted, setIsMuted }) => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const toggleSound = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  const scrollToWelcome = () => {
    const target = document.querySelector('#about');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden bg-forest-dark flex items-center justify-center">
      {/* Background Video with Poster Fallback */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        poster="/assets/videos/hero-poster.webp"
        onLoadedData={() => setVideoLoaded(true)}
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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-mist/20 bg-forest/40 backdrop-blur-md mb-6 animate-fade-in shadow-lg">
          <Mountain className="w-3.5 h-3.5 text-earth-light" />
          <span className="font-devanagari text-sm sm:text-base text-mist/95 tracking-wide">
            {t.hero.kicker}
          </span>
        </div>

        {/* Village Title */}
        <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-[0.25em] text-ivory uppercase leading-none drop-shadow-2xl mb-4">
          {t.hero.title}
        </h1>

        {/* English Tagline */}
        <p className="font-serif italic text-base sm:text-xl md:text-2xl text-mist/90 tracking-[0.15em] uppercase font-light max-w-3xl mb-8 drop-shadow-md">
          {t.hero.tagline}
        </p>

        {/* Geographical Coordinates Badge */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-mist/75 font-mono mb-10 bg-forest-dark/50 px-4 py-2 rounded-lg border border-mist/10 backdrop-blur-sm">
          <span>Lat: 30.001952° N</span>
          <span className="text-earth">•</span>
          <span>Long: 78.834910° E</span>
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
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-full bg-forest-dark/70 hover:bg-forest/80 border border-mist/20 text-ivory text-xs sm:text-sm font-medium backdrop-blur-md transition-all"
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
                  <span className="hidden sm:inline text-earth-light">{t.hero.soundToggleMute}</span>
                </>
              )}
            </button>

            <button
              onClick={togglePlay}
              className="p-3.5 rounded-full bg-forest-dark/70 hover:bg-forest/80 border border-mist/20 text-ivory backdrop-blur-md transition-all"
              title={isPlaying ? t.hero.pauseVideo : t.hero.playVideo}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div
        onClick={scrollToWelcome}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 cursor-pointer flex flex-col items-center text-mist/60 hover:text-ivory transition-colors group"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] mb-2 font-mono">Scroll</span>
        <div className="w-5 h-9 rounded-full border-2 border-mist/30 flex items-start justify-center p-1 group-hover:border-earth transition-colors">
          <div className="w-1 h-2 rounded-full bg-earth-light animate-bounce" />
        </div>
      </div>
    </section>
  );
};
