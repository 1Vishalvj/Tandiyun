'use client';

import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { useLanguage } from '@/context/LanguageContext';
import { Menu, X, Globe, Volume2, VolumeX } from 'lucide-react';

interface NavbarProps {
  isMuted?: boolean;
  onToggleSound?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isMuted, onToggleSound }) => {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#about', label: t.nav.about },
    { href: '#explore', label: t.nav.explore },
    { href: '#gallery', label: t.nav.gallery },
    { href: '#spiritual', label: t.nav.spiritual },
    { href: '#culture', label: t.nav.culture },
    { href: '#community', label: t.nav.community },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const topOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-forest-dark/95 backdrop-blur-md border-b border-mist/10 py-3 shadow-cinematic'
          : 'bg-gradient-to-b from-forest-dark/90 via-forest-dark/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <BrandLogo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3 py-2 text-xs xl:text-sm font-medium tracking-wide text-ivory/80 hover:text-ivory hover:bg-forest-light/30 rounded-md transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions: Audio Toggle + Language Switcher */}
          <div className="hidden sm:flex items-center gap-3">
            {onToggleSound !== undefined && (
              <button
                onClick={onToggleSound}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full border border-mist/20 text-ivory/90 hover:border-earth hover:text-ivory bg-forest/40 backdrop-blur-sm transition-all"
                title={isMuted ? t.hero.soundToggleUnmute : t.hero.soundToggleMute}
                aria-label="Sound Toggle"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-mist/60" />
                    <span className="text-[11px] font-medium">{t.hero.soundToggleUnmute}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-earth-light animate-pulse" />
                    <span className="text-[11px] font-medium text-earth-light">Audio Playing</span>
                  </>
                )}
              </button>
            )}

            {/* Language Switcher */}
            <div className="flex items-center p-0.5 rounded-full border border-mist/20 bg-forest/60 backdrop-blur-sm text-xs">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold tracking-wider transition-all ${
                  language === 'en'
                    ? 'bg-earth text-ivory shadow'
                    : 'text-mist/70 hover:text-ivory'
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2.5 py-1 rounded-full text-xs font-devanagari transition-all ${
                  language === 'hi'
                    ? 'bg-earth text-ivory shadow'
                    : 'text-mist/70 hover:text-ivory'
                }`}
                aria-label="Switch to Hindi"
              >
                हिन्दी
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            {/* Quick Language Toggle on Mobile */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="px-2 py-1 text-xs font-semibold rounded border border-mist/20 text-ivory bg-forest/50"
              aria-label="Toggle language"
            >
              {language === 'en' ? 'हिन्दी' : 'EN'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-ivory hover:text-earth-light rounded-md focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-forest-dark/98 border-b border-mist/10 px-4 pt-3 pb-6 space-y-2 backdrop-blur-xl animate-fade-in shadow-2xl">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3 py-2.5 text-base font-medium text-ivory/90 hover:text-ivory hover:bg-forest/60 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-mist/10 flex items-center justify-between">
            <span className="text-xs text-mist/60 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" /> Language / भाषा:
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setLanguage('en');
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-1 text-xs rounded ${
                  language === 'en' ? 'bg-earth text-ivory font-bold' : 'text-mist/70'
                }`}
              >
                English
              </button>
              <button
                onClick={() => {
                  setLanguage('hi');
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-1 text-xs rounded font-devanagari ${
                  language === 'hi' ? 'bg-earth text-ivory font-bold' : 'text-mist/70'
                }`}
              >
                हिन्दी
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
