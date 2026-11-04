'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import cultureData from '@/data/culture.json';
import { Feather, Utensils, Home, Sparkles, Calendar, Heart, ShieldCheck, PlusCircle } from 'lucide-react';

export default function CulturePage() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'festivals' | 'food' | 'traditions' | 'spiritual'>('festivals');

  return (
    <main className="min-h-screen bg-deepGreen-dark flex flex-col text-ivory">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-forest border-b border-mist/10 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <Image
            src="/assets/photos/gallery/IMG_20200814_063612.webp"
            alt="Garhwal Mountain Heritage"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-mist/20 bg-forest-dark/80 text-earth-light text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            <Feather className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'जीवंत गढ़वाली संस्कृति' : 'Living Garhwali Heritage'}</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-wide">
            {language === 'hi' ? 'परम्पराएं, उत्सव, खान-पान एवं जीवनशैली' : 'Culture, Traditions & Living Memories'}
          </h1>
          <p className="mt-4 text-mist/85 text-base sm:text-lg font-serif max-w-3xl mx-auto">
            {language === 'hi'
              ? 'प्रकृति के प्रति गहरी कृतज्ञता, पारंपरिक प्रस्तर वास्तु, पौष्टिक पहाड़ी खान-पान और मौसम के साथ बहती लोक संस्कृति का सजीव दस्तावेज।'
              : 'The timeless fabric of Garhwali mountain life — seasonal festivals honoring nature, authentic grain and lentil cuisine, and traditional slate-roof architecture.'}
          </p>

          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-forest-dark/70 text-xs font-mono text-mist/75 border border-mist/10">
            <ShieldCheck className="w-4 h-4 text-earth-light" />
            <span>Authentic Regional Traditions Documented with Cultural Integrity</span>
          </div>
        </div>
      </section>

      {/* Tab Switcher */}
      <section className="sticky top-20 z-40 bg-deepGreen-dark/95 backdrop-blur-md border-b border-mist/10 py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center flex-wrap gap-2 sm:gap-4">
          <button
            onClick={() => setActiveTab('festivals')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all ${
              activeTab === 'festivals'
                ? 'bg-earth text-ivory shadow-lg scale-105'
                : 'bg-forest/80 text-mist/75 hover:text-ivory hover:bg-forest border border-mist/15'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>{language === 'hi' ? '१. गढ़वाली लोक पर्व' : '1. Garhwali Festivals'}</span>
          </button>

          <button
            onClick={() => setActiveTab('food')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all ${
              activeTab === 'food'
                ? 'bg-earth text-ivory shadow-lg scale-105'
                : 'bg-forest/80 text-mist/75 hover:text-ivory hover:bg-forest border border-mist/15'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>{language === 'hi' ? '२. पारंपरिक खान-पान' : '2. Traditional Cuisine'}</span>
          </button>

          <button
            onClick={() => setActiveTab('traditions')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all ${
              activeTab === 'traditions'
                ? 'bg-earth text-ivory shadow-lg scale-105'
                : 'bg-forest/80 text-mist/75 hover:text-ivory hover:bg-forest border border-mist/15'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>{language === 'hi' ? '३. वास्तुकला व रहन-सहन' : '3. Customs & Architecture'}</span>
          </button>

          <button
            onClick={() => setActiveTab('spiritual')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all ${
              activeTab === 'spiritual'
                ? 'bg-earth text-ivory shadow-lg scale-105'
                : 'bg-forest/80 text-mist/75 hover:text-ivory hover:bg-forest border border-mist/15'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{language === 'hi' ? '४. आध्यात्मिक परंपरा' : '4. Spiritual Heritage'}</span>
          </button>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Subsection 1: Festivals */}
        {activeTab === 'festivals' && (
          <div className="space-y-12 animate-fade-in">
            <div className="max-w-3xl">
              <h2 className="font-heading text-3xl font-bold text-ivory">
                {language === 'hi' ? 'गढ़वाल के पारंपरिक ऋतु उत्सव' : 'Garhwali Seasonal Festivals'}
              </h2>
              <p className="mt-2 text-sm text-mist/85 font-serif leading-relaxed">
                {language === 'hi'
                  ? 'पहाड़ों में उत्सव केवल धार्मिक अनुष्ठान नहीं होते, बल्कि वे प्रकृति, ऋतु परिवर्तन, नई फसलों और सामुदायिक सौहार्द का उत्सव होते हैं। यहां क्षेत्रीय परंपराओं के साथ गांव के विशेष परिवेश का संगम दिखाई देता है।'
                  : 'Festivals in the Garhwal Himalayas follow the natural turning of mountain seasons — from spring blossoms on doorsteps to winter bonfires on terraced hilltops.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cultureData.festivals.map((fest) => (
                <div
                  key={fest.id}
                  className="rounded-3xl border border-mist/15 bg-forest/70 p-6 sm:p-7 shadow-xl hover:border-earth/60 hover:-translate-y-1 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-earth-light mb-3">
                      <span className="px-3 py-1 rounded-full bg-forest-dark border border-earth/30">
                        {language === 'hi' ? fest.seasonHi : fest.seasonEn}
                      </span>
                      <span className="text-mist/60">{fest.category}</span>
                    </div>

                    <h3 className="font-heading text-2xl text-ivory font-bold">
                      {language === 'hi' ? fest.nameHi : fest.nameEn}
                    </h3>

                    <div className="mt-2 text-[11px] font-mono text-mist/75 bg-forest-dark/50 px-2.5 py-1 rounded-md inline-block">
                      Scope: {fest.scope}
                    </div>

                    <p className="text-sm text-mist/85 mt-4 leading-relaxed font-serif">
                      {language === 'hi' ? fest.descriptionHi : fest.descriptionEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Subsection 2: Traditional Cuisine */}
        {activeTab === 'food' && (
          <div className="space-y-12 animate-fade-in">
            <div className="max-w-3xl">
              <h2 className="font-heading text-3xl font-bold text-ivory">
                {language === 'hi' ? 'पहाड़ का प्रामाणिक एवं पौष्टिक खान-पान' : 'Authentic Himalayan Cuisine'}
              </h2>
              <p className="mt-2 text-sm text-mist/85 font-serif leading-relaxed">
                {language === 'hi'
                  ? 'गढ़वाली खान-पान सादगी, प्राकृतिक पौष्टिकता और स्थानीय जलवायु के अनुसार शरीर को ऊर्जा प्रदान करने के लिए जाना जाता है। मंडुवा, झंगोरा, कंडाली और गहत दाल यहां की पहचान हैं।'
                  : 'Himalayan food traditions are deeply attuned to climate and seasonal health, drawing from nutrient-dense indigenous millets, wild greens, pulses, and cold-pressed mustard oil.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cultureData.food.map((dish) => (
                <div
                  key={dish.id}
                  className="rounded-3xl border border-mist/15 bg-forest/70 p-7 shadow-xl hover:border-earth/60 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-dark text-[11px] font-mono text-earth-light border border-mist/10 mb-3">
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
          </div>
        )}

        {/* Subsection 3: Customs & Architecture */}
        {activeTab === 'traditions' && (
          <div className="space-y-12 animate-fade-in">
            <div className="max-w-3xl">
              <h2 className="font-heading text-3xl font-bold text-ivory">
                {language === 'hi' ? 'पारंपरिक प्रस्तर वास्तु एवं ग्रामीण जीवन' : 'Customs, Slate Architecture & Mountain Life'}
              </h2>
              <p className="mt-2 text-sm text-mist/85 font-serif leading-relaxed">
                {language === 'hi'
                  ? 'स्थानीय पत्थर, लकड़ी और स्लेट की छतों से बने घर पहाड़ों के कठोर मौसम में प्राकृतिक अनुकूलन प्रदान करते हैं।'
                  : 'Traditional stone masonry, carved timber doors, and slate-tile roofs reflect centuries of architectural wisdom engineered for mountain slopes and seismic resilience.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cultureData.customs.map((trad) => (
                <div
                  key={trad.id}
                  className="rounded-3xl border border-mist/15 bg-forest/70 p-7 shadow-xl hover:border-earth/60 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-dark text-[11px] font-mono text-earth-light border border-mist/10 mb-3">
                      <Home className="w-3 h-3" />
                      <span>Heritage Craft</span>
                    </div>

                    <h3 className="font-heading text-2xl text-ivory font-bold">
                      {language === 'hi' ? trad.nameHi : trad.nameEn}
                    </h3>

                    <p className="text-sm text-mist/85 mt-3 leading-relaxed font-serif">
                      {language === 'hi' ? trad.descriptionHi : trad.descriptionEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Subsection 4: Spiritual Heritage */}
        {activeTab === 'spiritual' && (
          <div className="space-y-12 animate-fade-in">
            <div className="max-w-3xl">
              <h2 className="font-heading text-3xl font-bold text-ivory">
                {language === 'hi' ? 'आध्यात्मिक आस्था एवं कुलदेवी परंपरा' : 'Spiritual Reverence & Clan Deities'}
              </h2>
              <p className="mt-2 text-sm text-mist/85 font-serif leading-relaxed">
                {language === 'hi'
                  ? 'गढ़वाल को देवभूमि कहा जाता है। प्रत्येक पर्वत शिखर, जलधारा और वन क्षेत्र किसी न किसी पावन शक्ति से संरक्षित माना जाता है।'
                  : 'In the Garhwal Himalayas, every high ridge, river confluence, and sacred grove is revered as a sanctuary of divine energy, anchoring generations through pilgrimage and quiet worship.'}
              </p>
            </div>

            <div className="p-8 sm:p-10 rounded-3xl bg-forest/80 border border-mist/20 shadow-2xl space-y-6">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-earth-light" />
                <h3 className="font-heading text-2xl font-bold text-ivory">
                  {language === 'hi' ? 'शिखर मंदिरों एवं शक्तिपीठों से संबंध' : 'Connection to Regional Shrines'}
                </h3>
              </div>
              <p className="text-mist/90 text-sm sm:text-base leading-relaxed font-serif">
                {language === 'hi'
                  ? 'टांडियूं के निवासी आदिकाल से मां ज्वाल्पा देवी, दीबा देवी, क्युंकालेश्वर महादेव, ताराकुंड, डांडा नागराजा, बिन्सर महादेव, गुजड़ू गढ़ी, मां बुंगी देवी और बुंखाल कालिंका देवी जैसे पावन धामों में मन्नत मांगते और शीश नवाते आए हैं। यह आस्था केवल पूजा तक सीमित नहीं है, बल्कि यह पर्वतवासियों के नैतिक और सामाजिक जीवन का आधार है।'
                  : 'Families from Tandiyun have maintained generations of pilgrimage devotion to regional sacred centers including Maa Jwalpa Devi, Deeba Devi, Kyunkaleshwar Mahadev, Tarakund, Danda Nagraja, Binsar Mahadev, Gujru Garhi, Maa Bungi Devi, and Bunkhal Kalinka Devi.'}
              </p>
              <div className="pt-4 border-t border-mist/15">
                <Link
                  href="/spiritual"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-earth hover:bg-earth-light text-xs font-semibold text-ivory transition-colors shadow-lg"
                >
                  <span>{language === 'hi' ? 'तीर्थ एवं मंदिर मार्गदर्शिका देखें' : 'View Spiritual Places Directory'}</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Contribution Invitation Box */}
        <div className="mt-16 p-8 rounded-3xl bg-forest-dark border border-mist/20 text-center max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-left space-y-1">
            <h4 className="font-heading text-xl text-ivory font-bold">
              {language === 'hi' ? 'टांडियूं की विशिष्ट परंपराएं साझा करें' : 'Help Document Tandiyun’s Living Heritage'}
            </h4>
            <p className="text-xs text-mist/75 max-w-xl">
              {language === 'hi'
                ? 'यदि आपके पास गांव के विशेष रीति-रिवाज, लोककथाएं या पुरानी रेसिपीज हैं, तो उन्हें डिजिटल अभिलेखागार में शामिल करने के लिए भेजें।'
                : 'Have oral stories, clan traditions, or ancestral memory from Tandiyun? Submit them to our living village archive.'}
            </p>
          </div>
          <Link
            href="/community"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-earth hover:bg-earth-light text-xs font-semibold text-ivory transition-colors shrink-0 shadow-lg"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{language === 'hi' ? 'संस्मरण भेजें' : 'Contribute Story'}</span>
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
