'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin, Mountain, Footprints, ShieldCheck, Compass, ArrowRight, Heart } from 'lucide-react';

export default function AboutPage() {
  const { t, language } = useLanguage();

  return (
    <main className="min-h-screen bg-deepGreen-dark flex flex-col text-ivory">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 px-4 sm:px-6 lg:px-8 border-b border-mist/10 bg-forest overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <Image
            src="/assets/photos/gallery/IMG_20200814_063519.webp"
            alt="Tandiyun Village Landscape"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-mist/20 bg-forest-dark/70 text-earth-light text-xs uppercase tracking-[0.25em] font-semibold mb-4">
            <Mountain className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'गांव का प्रामाणिक परिचय' : 'About Tandiyun'}</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-wide">
            {language === 'hi' ? 'टांडियूं — हमारा गांव, हमारी पहचान' : 'Tandiyun — Cradled by the Mountains'}
          </h1>
          <p className="mt-4 text-base sm:text-xl text-mist/90 max-w-3xl mx-auto font-serif">
            {language === 'hi'
              ? 'पौड़ी गढ़वाल की सुरम्य वादियों में बसा एक छोटा सा संसार — जहां पर्वत, स्मृतियां और परम्पराएं जीवंत हैं।'
              : 'A mountain village in Pauri Garhwal, Uttarakhand, where serene landscapes, sacred heritage, and ancestral roots abide.'}
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-xs font-mono text-mist/75">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-earth-light" />
              Pauri Garhwal, Uttarakhand
            </span>
            <span>•</span>
            <span className="text-earth-light font-semibold">
              OUR ROOTS. OUR MOUNTAINS. OUR MEMORIES.
            </span>
          </div>
        </div>
      </section>

      {/* Section 1: Our Village */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs uppercase font-mono tracking-widest text-earth-light font-bold">
              {language === 'hi' ? 'हमारा गांव' : 'Our Mountain Sanctuary'}
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl text-ivory font-bold leading-tight">
              {language === 'hi'
                ? 'शांत हिमालयी ढलानों पर बसा एक आत्मीय संसार'
                : 'A Quiet Sanctuary in the Garhwal Himalayas'}
            </h2>
            <p className="text-mist/90 text-base leading-relaxed font-serif">
              {language === 'hi'
                ? 'टांडियूं उत्तराखंड के पौड़ी गढ़वाल जनपद का एक अत्यंत सुरम्य और शांत पर्वतीय गांव है। चीड़, बांज और बुरांश के जंगलों से घिरी घाटियों के मध्य स्थित यह गांव प्रकृति के शांत सानिध्य में बसा है। यह केवल एक भौगोलिक स्थान नहीं, बल्कि उन सभी परिवारों की आत्मा और स्मृतियों का केंद्र है जिनकी जड़ें इस पावन मिट्टी से जुड़ी हैं।'
                : 'Tandiyun is a serene mountain village situated in the Pauri Garhwal district of Uttarakhand, India. Sheltered by surrounding oak and pine ridges, it carries the peaceful cadence of traditional Himalayan life. It is not merely a geographic location, but an intimate home preserving living heritage, ancestral connection, and natural beauty.'}
            </p>
            <p className="text-mist/80 text-sm leading-relaxed">
              {language === 'hi'
                ? 'सुबह की सुनहरी धूप जब सीढ़ीदार खेतों पर उतरती है और दूर पर्वत शिखरों पर सफेद बादलों की चादर फैलती है, तब टांडियूं का अनुपम सौंदर्य देखते ही बनता है। यहां का जीवन सादगी, प्राकृतिक सामंजस्य और पारस्परिक सौहार्द की मिसाल है।'
                : 'When morning mist drifts across the terraced mountain slopes and birds call from the valley forests, Tandiyun reveals its timeless character — simple, grounded, and harmoniously intertwined with nature.'}
            </p>
          </div>
          <div className="lg:col-span-5 relative h-96 sm:h-[420px] rounded-3xl overflow-hidden border border-mist/20 shadow-2xl">
            <Image
              src="/assets/photos/gallery/IMG_20200814_063612.webp"
              alt="Tandiyun terraced hills"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 2: Geography & Landscape */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-forest border-y border-mist/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs uppercase font-mono tracking-widest text-earth-light font-bold mb-2">
              {language === 'hi' ? 'भूगोल एवं प्राकृतिक परिदृश्य' : 'Geography & Landscape'}
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl text-ivory font-bold">
              {language === 'hi' ? 'पर्वत, बादल, हरियाली और सीढ़ीदार खेत' : 'Ridges, Mist, Green Valleys & Stepped Terraces'}
            </h2>
            <p className="mt-4 text-mist/85 text-base font-serif">
              {language === 'hi'
                ? 'टांडियूं का प्राकृतिक परिदृश्य मौसम के साथ बदलता है — मानसून की गहरी हरियाली से लेकर सर्दियों की निर्मल नीली धूप तक।'
                : 'The geography of Tandiyun is characterized by stepped mountain terraces carved patiently over generations, dramatic clouds rising from the valleys, and crisp mountain horizons.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-mist/15 bg-deepGreen-dark/70 p-6 space-y-4">
              <div className="relative h-48 w-full rounded-xl overflow-hidden">
                <Image
                  src="/assets/photos/gallery/IMG_20200814_062035.webp"
                  alt="Mountain panorama"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-heading text-xl font-bold text-ivory">
                {language === 'hi' ? 'विशाल पर्वत श्रृंखलाएं' : 'Mountain Panoramas'}
              </h3>
              <p className="text-xs text-mist/85 leading-relaxed font-serif">
                {language === 'hi'
                  ? 'गांव की ऊंचाई से गढ़वाल के सुदूर पर्वत शिखरों का खुला और विहंगम दृश्य दिखाई देता है, जहां मौसम के अनुसार रंगों की अनूठी छटा बिखरती है।'
                  : 'Elevated vantage points offer sweeping panoramic perspectives across undulating Garhwal hills, layered ridges, and distant horizons.'}
              </p>
            </div>

            <div className="rounded-2xl border border-mist/15 bg-deepGreen-dark/70 p-6 space-y-4">
              <div className="relative h-48 w-full rounded-xl overflow-hidden">
                <Image
                  src="/assets/photos/gallery/IMG_20200707_090849.webp"
                  alt="Terraced Fields"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-heading text-xl font-bold text-ivory">
                {language === 'hi' ? 'सीढ़ीदार ढलान व हरियाली' : 'Stepped Terraces & Vegetation'}
              </h3>
              <p className="text-xs text-mist/85 leading-relaxed font-serif">
                {language === 'hi'
                  ? 'पहाड़ों की ढलानों पर सदियों से तराशे गए सीढ़ीदार खेत पारंपरिक कृषि और पर्यावरण के साथ गहरे सामंजस्य का प्रतीक हैं।'
                  : 'Carefully tended agricultural terraces descend the slopes, supporting traditional crops like mandua (finger millet), gahat, and seasonal grains.'}
              </p>
            </div>

            <div className="rounded-2xl border border-mist/15 bg-deepGreen-dark/70 p-6 space-y-4">
              <div className="relative h-48 w-full rounded-xl overflow-hidden">
                <Image
                  src="/assets/photos/gallery/IMG_20200708_161634.webp"
                  alt="Clouds and sky"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-heading text-xl font-bold text-ivory">
                {language === 'hi' ? 'धुंध और नीले आकाश का संगम' : 'Clouds, Mist & Mountain Skies'}
              </h3>
              <p className="text-xs text-mist/85 leading-relaxed font-serif">
                {language === 'hi'
                  ? 'घाटियों से उठती बादलों की लहरें जब गांव को छूती हैं, तो पूरा वातावरण एक अलौकिक और ध्यानमयी शांति में डूब जाता है।'
                  : 'Valley currents bring drifting sheets of fog and luminous clouds that wrap the hillside settlements in peaceful mountain quietude.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: How to Reach Tandiyun — Strict Geographical Reality */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-forest-dark border border-earth/40 shadow-2xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-earth/20 border border-earth/40 text-earth-light text-xs font-mono font-semibold mb-4">
              <Footprints className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'प्रामाणिक पहुंच मार्ग' : 'Geographical Approach'}</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl text-ivory font-bold mb-4">
              {language === 'hi' ? 'टांडियूं कैसे पहुंचे — वास्तविक भूगोल' : 'How to Reach Tandiyun — Authentic Route'}
            </h2>
            <p className="text-mist/90 text-sm sm:text-base leading-relaxed font-serif">
              {language === 'hi'
                ? 'टांडियूं का भौगोलिक स्वरूप समझना प्रत्येक आगंतुक के लिए आवश्यक है। गांव सीधे मुख्य मोटर मार्ग पर स्थित नहीं है, बल्कि मोटर मार्ग से ऊपर पहाड़ी ढलान पर बसा है:'
                : 'Understanding the physical approach to Tandiyun is essential. Tandiyun is situated uphill on the mountain slope and is not directly adjacent to the motorable highway:'}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-forest/80 border border-mist/15">
              <div className="flex items-center gap-3 text-earth-light font-mono text-sm font-bold">
                <span className="w-7 h-7 rounded-full bg-earth text-ivory flex items-center justify-center text-xs">
                  1
                </span>
                <span>Bidaliya Niwaas (Roadhead Arrival)</span>
              </div>
              <p className="mt-3 text-xs sm:text-sm text-mist/85 leading-relaxed">
                {language === 'hi'
                  ? 'बिडालिया निवास मुख्य मोटर मार्ग के किनारे स्थित है। आगंतुक वाहन द्वारा इसी स्थान तक पहुंचते हैं। यह क्षेत्र की सभी दूरियों का आधिकारिक संदर्भ बिंदु है।'
                  : 'Bidaliya Niwaas is situated directly beside the motorable road. Visitors travel by road to this point, which serves as the established arrival benchmark for the area.'}
              </p>
              <div className="mt-4 pt-3 border-t border-mist/10 text-xs font-mono text-earth-light">
                GPS: 30.0026375° N, 78.8332031° E
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-forest/80 border border-mist/15">
              <div className="flex items-center gap-3 text-earth-light font-mono text-sm font-bold">
                <span className="w-7 h-7 rounded-full bg-earth text-ivory flex items-center justify-center text-xs">
                  2
                </span>
                <span>Tandiyun Village (Uphill Footpath Walk)</span>
              </div>
              <p className="mt-3 text-xs sm:text-sm text-mist/85 leading-relaxed">
                {language === 'hi'
                  ? 'बिडालिया निवास से टांडियूं गांव तक पहुंचने के लिए लगभग ३०० मीटर की पारंपरिक पहाड़ी पगडंडी पर चढ़ाई करके पैदल जाना होता है। यह चढ़ाई गांव को मोटर मार्ग के शोर से दूर शांत रखती है।'
                  : 'From Bidaliya Niwaas, visitors walk uphill along a traditional winding mountain trail (approx. 300m) to reach Tandiyun village on the slope above.'}
              </p>
              <div className="mt-4 pt-3 border-t border-mist/10 text-xs font-mono text-mist/80">
                Provisional Coordinates: 30.001952° N, 78.834910° E
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-mist/15 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs font-mono text-mist/75">
              Strictly verified geographical information. No invented road access claims.
            </div>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-earth hover:bg-earth-light text-ivory text-xs font-semibold tracking-wide transition-colors"
            >
              <Compass className="w-4 h-4" />
              <span>{language === 'hi' ? '3D में चढ़ाई मार्ग देखें' : 'View Uphill Route in 3D'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4: Our Identity */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="text-xs uppercase font-mono tracking-widest text-earth-light font-bold">
            {language === 'hi' ? 'हमारी पहचान और जड़ें' : 'Our Identity'}
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl text-ivory font-bold">
            {language === 'hi'
              ? 'जड़ें जो समय और दूरी से परे बंधी हैं'
              : 'Our Roots. Our Mountains. Our Memories.'}
          </h2>
          <p className="text-mist/90 text-base sm:text-lg leading-relaxed font-serif">
            {language === 'hi'
              ? 'टांडियूं केवल एक गांव नहीं, बल्कि आस्था, पारिवारिक आत्मीयता, लोक परंपराओं और पर्वतीय जीवन का पवित्र प्रतीक है। चाहे हम देश-दुनिया में कहीं भी रहें, हमारी स्मृतियां और हमारा आत्मिक संबंध सदैव टांडियूं के पहाड़ों से जुड़ा रहता है।'
              : 'Tandiyun is a place of belonging, faith, deep traditions, and enduring memories. Dedicated to authentic preservation, this digital sanctuary stands without exaggeration or fabricated history — celebrating the honest beauty of our mountain roots.'}
          </p>
          <div className="pt-6">
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-forest hover:bg-forest-light text-ivory text-xs font-mono border border-mist/20 transition-colors shadow-lg"
            >
              <Heart className="w-4 h-4 text-earth-light" />
              <span>{language === 'hi' ? 'गांव के संस्मरण पढ़ें' : 'Read Village Memories & Stories'}</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
