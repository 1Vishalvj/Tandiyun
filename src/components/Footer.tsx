'use client';

import React from 'react';
import { BrandLogo } from './BrandLogo';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin, Compass, Heart, ArrowUp, Mountain } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-forest-dark border-t border-mist/15 pt-20 pb-12 px-4 sm:px-6 lg:px-8 text-mist/80">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-mist/10">
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <BrandLogo />
            <p className="font-devanagari text-lg text-earth-light pt-2">
              &ldquo;{t.footer.hindiQuote}&rdquo;
            </p>
            <p className="text-sm text-mist/75 max-w-sm font-serif italic">
              {t.footer.tagline}
            </p>
            <div className="pt-2 text-xs font-mono text-mist/60 space-y-1">
              <div>{t.footer.coordinates}</div>
              <div>{t.footer.district}</div>
            </div>
          </div>

          {/* Quick Nav Col (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-ivory font-semibold">
              Exploration
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="hover:text-ivory transition-colors">
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a href="#explore" className="hover:text-ivory transition-colors">
                  {t.nav.explore} (3D & Maps)
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-ivory transition-colors">
                  {t.nav.gallery} (Original Photos)
                </a>
              </li>
              <li>
                <a href="#spiritual" className="hover:text-ivory transition-colors">
                  {t.nav.spiritual}
                </a>
              </li>
              <li>
                <a href="#culture" className="hover:text-ivory transition-colors">
                  {t.nav.culture}
                </a>
              </li>
            </ul>
          </div>

          {/* Community & Coordinates Col (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-ivory font-semibold">
              Heritage Archive
            </div>
            <p className="text-xs leading-relaxed text-mist/75">
              Preserving original photographs, sacred geography from Bidaliya Niwaas to Tandiyun Village, and oral memories for future generations.
            </p>
            <div className="pt-2">
              <a
                href="#community"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-forest hover:bg-forest-light text-xs font-mono text-ivory border border-mist/20 transition-colors"
              >
                <Heart className="w-3.5 h-3.5 text-earth-light" />
                <span>Share a Village Story</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-mist/60">
          <div>
            &copy; {new Date().getFullYear()} Tandiyun Village Community. {t.footer.rights}
          </div>

          <div className="flex items-center gap-6">
            <span className="font-serif italic text-mist/80">
              &ldquo;{t.footer.mantra}&rdquo;
            </span>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-forest hover:bg-forest-light text-ivory transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

