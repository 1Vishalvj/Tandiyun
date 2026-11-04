'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrandLogo } from './BrandLogo';
import { useLanguage } from '@/context/LanguageContext';
import { Menu, X, Globe, Volume2, VolumeX, ArrowRight, Heart } from 'lucide-react';

interface NavbarProps {
  isMuted?: boolean;
  onToggleSound?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isMuted, onToggleSound }) => {
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Detect scroll for background blur
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open to prevent background scrolling
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/explore', label: t.nav.explore },
    { href: '/gallery', label: t.nav.gallery },
    { href: '/temples', label: t.nav.spiritual },
    { href: '/culture', label: t.nav.culture },
    { href: '/stories', label: t.nav.stories },
    { href: '/community', label: t.nav.community },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || pathname !== '/'
            ? 'bg-deepGreen-dark/95 backdrop-blur-md border-b border-mist/10 py-2.5 sm:py-3 shadow-cinematic'
            : 'bg-gradient-to-b from-deepGreen-dark/95 via-deepGreen-dark/60 to-transparent py-3 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2">
            {/* Left: Brand Logo */}
            <BrandLogo />

            {/* Center: Desktop Horizontal Navigation */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 text-xs font-medium tracking-wide rounded-md transition-all duration-200 ${
                      isActive
                        ? 'text-ivory bg-forest/80 border border-mist/20 font-semibold shadow-sm'
                        : 'text-mist/80 hover:text-ivory hover:bg-forest/30'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Audio + Language Controls */}
            <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3">
              {/* Audio Toggle (When on homepage) */}
              {onToggleSound !== undefined && pathname === '/' && (
                <button
                  onClick={onToggleSound}
                  className="flex items-center justify-center min-w-[38px] min-h-[38px] sm:min-w-[42px] sm:min-h-[42px] px-2.5 py-1.5 text-xs rounded-full border border-mist/20 text-ivory/90 hover:border-earth hover:text-ivory bg-forest/40 backdrop-blur-sm transition-all shrink-0 active:scale-95"
                  title={isMuted ? t.hero.soundToggleUnmute : t.hero.soundToggleMute}
                  aria-label="Toggle Sound"
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-4 h-4 text-mist/60" />
                      <span className="hidden md:inline ml-1.5 text-[11px] font-medium">{t.hero.soundToggleUnmute}</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-earth-light animate-pulse" />
                      <span className="hidden md:inline ml-1.5 text-[11px] font-medium text-earth-light">Audio On</span>
                    </>
                  )}
                </button>
              )}

              {/* Accessible Mobile & Desktop Language Selector Pill */}
              <div
                className="flex items-center p-0.5 rounded-full border border-mist/25 bg-forest-dark/80 backdrop-blur-md text-xs shrink-0 shadow-sm"
                role="group"
                aria-label="Language selector"
              >
                <button
                  onClick={() => setLanguage('en')}
                  className={`min-h-[32px] sm:min-h-[34px] px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider transition-all ${
                    language === 'en'
                      ? 'bg-earth text-ivory shadow-md font-bold'
                      : 'text-mist/70 hover:text-ivory'
                  }`}
                  aria-pressed={language === 'en'}
                  aria-label="Switch to English"
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('hi')}
                  className={`min-h-[32px] sm:min-h-[34px] px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-devanagari transition-all ${
                    language === 'hi'
                      ? 'bg-earth text-ivory shadow-md font-bold'
                      : 'text-mist/70 hover:text-ivory'
                  }`}
                  aria-pressed={language === 'hi'}
                  aria-label="Switch to Hindi (हिन्दी)"
                >
                  हिंदी
                </button>
              </div>

              {/* Mobile Hamburger Button (Visible on screens < xl) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden flex items-center justify-center min-w-[42px] min-h-[42px] p-2 text-ivory hover:text-earth-light rounded-xl border border-mist/15 bg-forest/50 hover:bg-forest/80 transition-all shrink-0 active:scale-95"
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer / Full-Screen Overlay */}
      {mobileMenuOpen && (
        <div
          className="xl:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-md animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="absolute top-0 right-0 left-0 pt-20 pb-8 px-4 sm:px-6 bg-deepGreen-dark/98 border-b border-mist/20 shadow-2xl max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Navigation Links Grid */}
            <nav className="flex flex-col space-y-1 pt-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between min-h-[48px] px-4 py-3 text-base rounded-xl transition-all ${
                      isActive
                        ? 'text-ivory bg-forest font-bold border-l-4 border-earth pl-3'
                        : 'text-mist/85 hover:text-ivory hover:bg-forest/40'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-earth" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Drawer Language Selector & Archive Actions */}
            <div className="mt-6 pt-5 border-t border-mist/15 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono tracking-wider text-mist/70 flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-earth-light" />
                  <span>Language / भाषा:</span>
                </span>
                <div className="flex items-center p-1 rounded-xl bg-forest-dark border border-mist/20">
                  <button
                    onClick={() => {
                      setLanguage('en');
                      setMobileMenuOpen(false);
                    }}
                    className={`min-h-[38px] px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                      language === 'en'
                        ? 'bg-earth text-ivory font-bold shadow'
                        : 'text-mist/70 hover:text-ivory'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('hi');
                      setMobileMenuOpen(false);
                    }}
                    className={`min-h-[38px] px-4 py-1.5 rounded-lg text-xs font-devanagari transition-all ${
                      language === 'hi'
                        ? 'bg-earth text-ivory font-bold shadow'
                        : 'text-mist/70 hover:text-ivory'
                    }`}
                  >
                    हिन्दी
                  </button>
                </div>
              </div>

              {/* Quick Heritage Contribution Link */}
              <Link
                href="/community"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full min-h-[46px] py-2.5 px-4 rounded-xl bg-forest hover:bg-forest-light text-xs font-mono text-ivory border border-mist/20 shadow-md transition-colors"
              >
                <Heart className="w-4 h-4 text-earth-light" />
                <span>{language === 'hi' ? 'संस्मरण साझा करें' : 'Share a Village Story'}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
