import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import templesData from '@/data/temples.json';
import { Sparkles, MapPin, Navigation, ExternalLink, ArrowLeft, ShieldCheck, AlertCircle, Compass, Globe, BookOpen } from 'lucide-react';
import type { Metadata } from 'next';

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return templesData.map((temple) => ({
    slug: temple.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const temple = templesData.find((t) => t.slug === params.slug);
  if (!temple) return { title: 'Temple Not Found | Tandiyun' };

  return {
    title: `${temple.nameEn} (${temple.nameHi}) | Tandiyun Spiritual Heritage`,
    description: temple.significanceEn,
    openGraph: {
      title: `${temple.nameEn} | Sacred Places Around Tandiyun`,
      description: temple.significanceEn,
      images: temple.image ? [{ url: temple.image }] : [],
    },
  };
}

export default function TempleDetailPage({ params }: PageProps) {
  const temple = templesData.find((t) => t.slug === params.slug);
  if (!temple) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-deepGreen-dark flex flex-col text-ivory">
      <Navbar />

      {/* Hero Banner with Breadcrumb */}
      <section className="pt-28 sm:pt-36 pb-12 px-4 sm:px-6 lg:px-8 bg-forest border-b border-mist/10">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/temples"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-earth-light hover:text-ivory transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>← Back to Temples & Sacred Places Around टांडियूं</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-deepGreen-dark/80 text-earth-light border border-earth/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{temple.categoryEn} • {temple.categoryHi}</span>
            </span>

            {temple.distanceStatus === 'Verified' ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono bg-forest-dark text-mist border border-mist/20">
                <ShieldCheck className="w-3.5 h-3.5 text-earth-light" />
                <span>Verified Road Distance</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono bg-earth/20 text-earth-light border border-earth/40">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Approximate / User-provided</span>
              </span>
            )}
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-wide text-ivory">
            {temple.nameEn}
          </h1>
          <div className="font-devanagari text-2xl sm:text-4xl text-mist/95 mt-2 font-normal">
            {temple.nameHi}
          </div>

          <p className="mt-4 text-sm sm:text-base text-mist/85 font-mono flex items-center gap-2">
            <MapPin className="w-4 h-4 text-earth-light shrink-0" />
            <span>{temple.locationEn}</span>
          </p>
        </div>
      </section>

      {/* Main Content Details */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-12">
        {/* Authentic Photograph or Coming Soon Box */}
        <div className="rounded-3xl overflow-hidden border border-mist/20 bg-forest-dark shadow-2xl relative">
          {temple.hasAuthenticPhoto && temple.image ? (
            <div className="relative w-full h-72 sm:h-[480px]">
              <Image
                src={temple.image}
                alt={temple.nameEn}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1000px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deepGreen-dark/80 via-transparent to-transparent" />
              {temple.photoCredit && (
                <div className="absolute bottom-4 left-4 sm:left-6 z-10 text-[11px] font-mono text-mist/75 bg-deepGreen-dark/85 px-3 py-1 rounded-lg border border-mist/20">
                  {temple.photoCredit}
                </div>
              )}
            </div>
          ) : (
            <div className="py-20 sm:py-28 px-6 text-center flex flex-col items-center justify-center bg-gradient-to-b from-forest-dark to-deepGreen-dark">
              <div className="w-16 h-16 rounded-2xl bg-forest/80 border border-earth/40 flex items-center justify-center text-earth-light mb-4 shadow-inner">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="font-heading text-xl sm:text-2xl text-ivory font-bold">
                Authentic Photograph Coming Soon
              </h3>
              <p className="font-devanagari text-base sm:text-lg text-earth-light mt-1">
                प्रामाणिक छायाचित्र संकलन प्रक्रिया में
              </p>
              <p className="text-xs sm:text-sm text-mist/70 max-w-md mt-3 font-serif leading-relaxed">
                In strict adherence to authenticity, only verified photographs of the actual shrine are published. Photographic records are undergoing community review.
              </p>
            </div>
          )}
        </div>

        {/* Travel & Distance Methodology Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Origin & Distance */}
          <div className="p-6 rounded-2xl bg-forest/60 border border-mist/20 backdrop-blur-sm space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-earth-light block">
              Road Distance from Bidaliya Niwaas
            </span>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-ivory">
              {temple.roadDistance}
            </div>
            <p className="text-xs text-mist/75 font-mono">
              Origin: Bidaliya Niwaas (30.002638° N, 78.833203° E)
            </p>
            <div className="pt-1">
              <span className="inline-block text-[11px] font-mono px-2.5 py-0.5 rounded bg-forest-dark text-mist/90 border border-mist/20">
                {temple.distanceStatusEn}
              </span>
            </div>
          </div>

          {/* Driving Route */}
          <div className="p-6 rounded-2xl bg-forest/60 border border-mist/20 backdrop-blur-sm space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-earth-light block flex items-center gap-1.5">
              <Compass className="w-4 h-4" />
              <span>Driving Route Details</span>
            </span>
            <p className="text-xs sm:text-sm text-ivory/90 leading-relaxed font-sans">
              {temple.drivingInfoEn}
            </p>
            <p className="text-xs font-devanagari text-mist/85 pt-1">
              {temple.drivingInfoHi}
            </p>
          </div>

          {/* Walking / Trekking Approach */}
          <div className="p-6 rounded-2xl bg-forest/60 border border-mist/20 backdrop-blur-sm space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-earth-light block flex items-center gap-1.5">
              <Navigation className="w-4 h-4" />
              <span>Walking / Approach Trail</span>
            </span>
            <p className="text-xs sm:text-sm text-ivory/90 leading-relaxed font-sans">
              {temple.walkingInfoEn}
            </p>
            <p className="text-xs font-devanagari text-mist/85 pt-1">
              {temple.walkingInfoHi}
            </p>
          </div>
        </div>

        {/* Religious & Cultural Significance */}
        <div className="p-8 sm:p-10 rounded-3xl bg-forest/50 border border-mist/15 backdrop-blur-md space-y-6">
          <div className="flex items-center gap-2 text-earth-light text-xs font-mono uppercase tracking-widest">
            <BookOpen className="w-4 h-4" />
            <span>Spiritual Significance & Heritage</span>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-ivory">
              About the Sacred Sanctuary
            </h2>
            <p className="text-base sm:text-lg text-mist/90 leading-relaxed font-serif">
              {temple.significanceEn}
            </p>
            <div className="p-4 sm:p-5 rounded-2xl bg-deepGreen-dark/70 border border-mist/15 font-devanagari text-base sm:text-lg text-ivory/95 leading-relaxed">
              {temple.significanceHi}
            </div>
          </div>

          {/* Key Festivals */}
          {temple.festivals && temple.festivals.length > 0 && (
            <div className="pt-4 border-t border-mist/10">
              <span className="text-xs font-mono uppercase tracking-wider text-earth-light block mb-3">
                Key Melas & Religious Observances
              </span>
              <div className="flex flex-wrap gap-2">
                {temple.festivals.map((fest, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-xl bg-forest-dark border border-mist/20 text-xs text-ivory font-medium"
                  >
                    🌸 {fest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action & External Directions Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 sm:p-8 rounded-2xl bg-deepGreen-dark border border-mist/20">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-heading text-xl font-bold text-ivory">
              Plan Your Journey from Tandiyun
            </h3>
            <p className="text-xs text-mist/75 font-mono">
              Origin: Bidaliya Niwaas (Roadside Reference Landmark)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={temple.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-earth hover:bg-earth-light text-ivory font-medium text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-xl"
            >
              <span>Get Directions in Google Maps</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            {temple.officialWebsite && (
              <a
                href={temple.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-mist/20 bg-forest hover:bg-forest-dark text-ivory text-xs sm:text-sm font-medium transition-all"
              >
                <span>Official Temple Site</span>
                <Globe className="w-4 h-4 text-earth-light" />
              </a>
            )}

            {temple.wikipediaUrl && (
              <a
                href={temple.wikipediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-mist/20 bg-forest hover:bg-forest-dark text-ivory text-xs sm:text-sm font-medium transition-all"
              >
                <span>Reference Article</span>
                <ExternalLink className="w-4 h-4 text-earth-light" />
              </a>
            )}
          </div>
        </div>

        {/* Back Link */}
        <div className="pt-4 text-center">
          <Link
            href="/temples"
            className="inline-flex items-center gap-2 text-sm font-mono text-earth-light hover:text-ivory transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Temples & Sacred Places Around टांडियूं</span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

