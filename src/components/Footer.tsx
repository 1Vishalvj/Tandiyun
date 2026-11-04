'use client';

import React from 'react';
import Link from 'next/link';
import { BrandLogo } from './BrandLogo';
import { useLanguage } from '@/context/LanguageContext';
import { Heart, ArrowUp, Compass, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-deepGreen-dark border-t border-mist/15 pt-20 pb-12 px-4 sm:px-6 lg:px-8 text-mist/80">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-mist/10">
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <BrandLogo />
            <div className="pt-2">
              <h3 className="font-heading text-2xl font-bold text-ivory tracking-wide">
                TANDIYUN | टांडियूं
              </h3>
              <p className="text-sm font-medium text-earth-light mt-1">
                Pauri Garhwal, Uttarakhand, India.
              </p>
              <p className="text-xs font-serif italic text-mist/85 mt-1 tracking-wider">
                Our Roots. Our Mountains. Our Memories.
              </p>
            </div>
            <p className="font-devanagari text-base text-earth-light/90 pt-1">
              &ldquo;{t.footer.hindiQuote}&rdquo;
            </p>
            <div className="pt-2 text-xs font-mono text-mist/60 space-y-1">
              <div>{t.footer.coordinates}</div>
            </div>
          </div>

          {/* Navigation Links Col (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-ivory font-semibold">
              {language === 'hi' ? 'नेविगेशन' : 'Navigation'}
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-ivory transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-ivory transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-ivory transition-colors">
                  {t.nav.explore} (3D & Maps)
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-ivory transition-colors">
                  {t.nav.gallery}
                </Link>
              </li>
              <li>
                <Link href="/temples" className="hover:text-ivory transition-colors">
                  {t.nav.spiritual}
                </Link>
              </li>
              <li>
                <Link href="/culture" className="hover:text-ivory transition-colors">
                  {t.nav.culture}
                </Link>
              </li>
              <li>
                <Link href="/stories" className="hover:text-ivory transition-colors">
                  {t.nav.stories}
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-ivory transition-colors">
                  {t.nav.community}
                </Link>
              </li>
            </ul>
          </div>

          {/* Heritage Archive & Contribution Col (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-ivory font-semibold">
              {language === 'hi' ? 'धरोहर एवं अभिलेखागार' : 'Heritage Archive'}
            </div>
            <p className="text-xs leading-relaxed text-mist/75">
              Preserving original photographs, sacred geography from Bidaliya Niwaas to Tandiyun Village, cultural traditions, and community memories for future generations.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <Link
                href="/community"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest hover:bg-forest-light text-xs font-mono text-ivory border border-mist/20 transition-colors"
              >
                <Heart className="w-3.5 h-3.5 text-earth-light" />
                <span>{language === 'hi' ? 'संस्मरण साझा करें' : 'Share a Village Story'}</span>
              </Link>
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest-dark/80 hover:bg-forest text-xs font-mono text-mist hover:text-ivory border border-mist/15 transition-colors"
              >
                <Compass className="w-3.5 h-3.5 text-earth-light" />
                <span>{language === 'hi' ? '3D मानचित्र देखें' : 'View 3D Terrain'}</span>
              </Link>
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
