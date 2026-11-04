'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import storiesData from '@/data/stories.json';
import { BookOpen, Heart, Globe, Footprints, MessageSquareQuote, PlusCircle, ShieldAlert } from 'lucide-react';

export default function StoriesPage() {
  const { t, language } = useLanguage();

  return (
    <main className="min-h-screen bg-deepGreen-dark flex flex-col text-ivory">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-forest border-b border-mist/10 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <Image
            src="/assets/photos/gallery/IMG_20200708_161601.webp"
            alt="Old village memories"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-mist/20 bg-forest-dark/80 text-earth-light text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'मौखिक इतिहास एवं संस्मरण' : 'Village History & Oral Archive'}</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-wide">
            {language === 'hi' ? 'हमारे संस्मरण — टांडियूं की यादें' : 'Our Stories — Memories of Tandiyun'}
          </h1>
          <p className="mt-4 text-mist/85 text-base sm:text-lg font-serif max-w-3xl mx-auto">
            {language === 'hi'
              ? 'पीढ़ियों के अनुभव, बुजुर्गों की आवाजें, बचपन की यादें और देश-दुनिया में बसे प्रवासियों का अपनी पैतृक माटी से अटूट नाता।'
              : 'Preserving the identity, elder oral histories, childhood memories, and traditional mountain life of Tandiyun for generations to come.'}
          </p>

          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-forest-dark/70 text-xs font-mono text-mist/75 border border-mist/10">
            <Heart className="w-4 h-4 text-earth-light" />
            <span>“Wherever we go, our roots remain in Tandiyun.”</span>
          </div>
        </div>
      </section>

      {/* Magazine-Style Editorial Articles */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-24">
        {storiesData.sections.map((section, index) => {
          const isEven = index % 2 === 0;
          return (
            <article
              key={section.id}
              className="relative p-8 sm:p-12 rounded-3xl bg-forest/60 border border-mist/15 shadow-2xl space-y-6"
            >
              {/* Category Pill & Index */}
              <div className="flex items-center justify-between text-xs font-mono text-earth-light border-b border-mist/10 pb-4">
                <span className="uppercase tracking-widest font-bold">
                  {language === 'hi' ? `अध्याय ०${index + 1}` : `Chapter 0${index + 1}`}
                </span>
                <span className="text-mist/60 font-serif italic">Living Archive</span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h2 className="font-heading text-2xl sm:text-4xl text-ivory font-bold">
                  {language === 'hi' ? section.titleHi : section.titleEn}
                </h2>
                <p className="text-sm sm:text-base text-earth-light font-serif italic mt-2">
                  {language === 'hi' ? section.subtitleHi : section.subtitleEn}
                </p>
              </div>

              {/* Editorial Prose */}
              <div className="text-mist/90 text-base sm:text-lg leading-relaxed font-serif space-y-4 pt-2">
                <p>{language === 'hi' ? section.contentHi : section.contentEn}</p>
              </div>

              {/* Marked Contribution Placeholder */}
              {section.placeholderNoteEn && (
                <div className="mt-6 p-4 rounded-2xl bg-forest-dark/80 border border-earth/30 flex items-start gap-3 text-xs font-mono text-mist/80">
                  <ShieldAlert className="w-4 h-4 text-earth-light shrink-0 mt-0.5" />
                  <div>
                    <span className="text-earth-light font-bold block mb-0.5">
                      {language === 'hi' ? 'अभिलेख सूचना' : 'Archival Documentation Status'}
                    </span>
                    <p>{language === 'hi' ? section.placeholderNoteHi : section.placeholderNoteEn}</p>
                  </div>
                </div>
              )}
            </article>
          );
        })}

        {/* Contribution Invitation Box */}
        <div className="p-8 sm:p-12 rounded-3xl bg-forest-dark border border-earth/40 text-center shadow-2xl space-y-6">
          <div className="w-12 h-12 rounded-full bg-earth/20 border border-earth/40 text-earth-light flex items-center justify-center mx-auto">
            <PlusCircle className="w-6 h-6" />
          </div>
          <h3 className="font-heading text-3xl font-bold text-ivory">
            {language === 'hi' ? 'अपनी और अपने परिवार की कहानी साझा करें' : 'Share Your Family’s Story or Memories'}
          </h3>
          <p className="text-sm text-mist/85 max-w-2xl mx-auto font-serif leading-relaxed">
            {language === 'hi'
              ? 'क्या आपके पास गांव के पुराने दिन, बुजुर्गों की बातें, खेतों की यादें या पुरानी तस्वीरें हैं? आइए मिलकर टांडियूं के इतिहास को समृद्ध करें।'
              : 'Did you grow up in Tandiyun or visit during family holidays? Share your recollections, elder anecdotes, or old photographs with the village digital archive.'}
          </p>
          <div className="pt-2">
            <Link
              href="/community"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-earth hover:bg-earth-light text-xs font-mono font-semibold text-ivory transition-colors shadow-xl"
            >
              <Heart className="w-4 h-4" />
              <span>{language === 'hi' ? 'समुदाय पृष्ठ पर संस्मरण दर्ज करें' : 'Submit a Memory on Community Page'}</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

