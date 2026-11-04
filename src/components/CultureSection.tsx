'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import cultureData from '@/data/culture.json';
import { Feather, Utensils, Home, Calendar, PlusCircle, CheckCircle2 } from 'lucide-react';

export const CultureSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'festivals' | 'food' | 'traditions'>('festivals');
  const [showSuggestModal, setShowSuggestModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="culture" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-forest border-t border-mist/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-mist/20 bg-forest-dark/40 text-earth-light text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            <Feather className="w-3.5 h-3.5" />
            <span>{t.culture.badge}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl text-ivory font-bold tracking-wide">
            {t.culture.title}
          </h2>
          <p className="mt-4 text-mist/80 text-base sm:text-lg max-w-3xl">
            {t.culture.subtitle}
          </p>
          <div className="w-20 h-0.5 bg-earth mt-6 rounded-full" />
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-14">
          <button
            onClick={() => setActiveTab('festivals')}
            className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all ${
              activeTab === 'festivals'
                ? 'bg-earth text-ivory shadow-lg scale-105'
                : 'bg-forest-dark/70 text-mist/75 hover:text-ivory hover:bg-forest-dark border border-mist/15'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>{t.culture.tabs.festivals}</span>
          </button>

          <button
            onClick={() => setActiveTab('food')}
            className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all ${
              activeTab === 'food'
                ? 'bg-earth text-ivory shadow-lg scale-105'
                : 'bg-forest-dark/70 text-mist/75 hover:text-ivory hover:bg-forest-dark border border-mist/15'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>{t.culture.tabs.food}</span>
          </button>

          <button
            onClick={() => setActiveTab('traditions')}
            className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all ${
              activeTab === 'traditions'
                ? 'bg-earth text-ivory shadow-lg scale-105'
                : 'bg-forest-dark/70 text-mist/75 hover:text-ivory hover:bg-forest-dark border border-mist/15'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>{t.culture.tabs.traditions}</span>
          </button>
        </div>

        {/* Tab 1: Folk Festivals */}
        {activeTab === 'festivals' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
            {cultureData.festivals.map((fest) => (
              <div
                key={fest.id}
                className="rounded-2xl border border-mist/15 bg-forest-dark/80 p-7 shadow-xl hover:border-earth/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest text-[11px] font-mono text-earth-light border border-mist/10 mb-3">
                    <Calendar className="w-3 h-3" />
                    <span>{language === 'hi' ? fest.seasonHi : fest.seasonEn}</span>
                  </div>
                  <h3 className="font-heading text-2xl text-ivory font-bold">
                    {language === 'hi' ? fest.nameHi : fest.nameEn}
                  </h3>
                  <p className="text-sm text-mist/85 mt-3 leading-relaxed font-serif">
                    {language === 'hi' ? fest.descriptionHi : fest.descriptionEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Traditional Food */}
        {activeTab === 'food' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
            {cultureData.food.map((dish) => (
              <div
                key={dish.id}
                className="rounded-2xl border border-mist/15 bg-forest-dark/80 p-7 shadow-xl hover:border-earth/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest text-[11px] font-mono text-earth-light border border-mist/10 mb-3">
                    <Utensils className="w-3 h-3" />
                    <span>{language === 'hi' ? dish.ingredientsHi : dish.ingredientsEn}</span>
                  </div>
                  <h3 className="font-heading text-2xl text-ivory font-bold">
                    {language === 'hi' ? dish.nameHi : dish.nameEn}
                  </h3>
                  <p className="text-sm text-mist/85 mt-3 leading-relaxed font-serif">
                    {language === 'hi' ? dish.descriptionHi : dish.descriptionEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Customs & Traditions */}
        {activeTab === 'traditions' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
            {cultureData.traditions.map((trad) => (
              <div
                key={trad.id}
                className="rounded-2xl border border-mist/15 bg-forest-dark/80 p-7 shadow-xl hover:border-earth/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-forest flex items-center justify-center text-earth-light mb-4 border border-mist/10">
                    <Home className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading text-xl text-ivory font-bold">
                    {language === 'hi' ? trad.nameHi : trad.nameEn}
                  </h3>
                  <p className="text-sm text-mist/85 mt-3 leading-relaxed font-serif">
                    {language === 'hi' ? trad.descriptionHi : trad.descriptionEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Community Cultural Placeholder Invitation */}
        <div className="mt-14 p-6 rounded-2xl bg-forest-dark/40 border border-mist/15 text-center max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-heading text-lg text-ivory font-semibold">
              {language === 'hi' ? 'तंडियूं की विशिष्ट परंपराएं साझा करें' : 'Help Document Tandiyun’s Living Heritage'}
            </h4>
            <p className="text-xs text-mist/75 mt-0.5">
              {language === 'hi'
                ? 'यदि आपके पास गांव के विशेष रीति-रिवाज या लोककथाएं हैं, तो उन्हें अभिलेख में शामिल करने के लिए भेजें।'
                : 'Have oral stories, specific clan customs or recipe memories from Tandiyun? Contribute below.'}
            </p>
          </div>
          <a
            href="#community"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-earth hover:bg-earth-light text-xs font-semibold text-ivory transition-colors shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{language === 'hi' ? 'संस्मरण भेजें' : 'Contribute Story'}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
