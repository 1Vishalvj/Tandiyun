'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroVideo } from '@/components/HeroVideo';
import { WelcomeSection } from '@/components/WelcomeSection';
import { LandscapeSection } from '@/components/LandscapeSection';
import { ExploreSection } from '@/components/ExploreSection';
import { LandscapeGallery } from '@/components/LandscapeGallery';
import { SpiritualPlaces } from '@/components/SpiritualPlaces';
import { CultureSection } from '@/components/CultureSection';
import { CommunitySection } from '@/components/CommunitySection';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  const [isMuted, setIsMuted] = useState(true);
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);

  const handleSelectPhoto = (photoId: string) => {
    setSelectedPhotoId(photoId);
    const galleryEl = document.querySelector('#gallery');
    if (galleryEl) {
      galleryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-forest-dark flex flex-col">
      {/* Navigation */}
      <Navbar
        isMuted={isMuted}
        onToggleSound={() => setIsMuted((prev) => !prev)}
      />

      {/* Section 1: Hero Video */}
      <HeroVideo
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />

      {/* Section 2: Welcome to Tandiyun */}
      <WelcomeSection />

      {/* Section 3: Discover Our Landscape */}
      <LandscapeSection onSelectPhoto={handleSelectPhoto} />

      {/* Section 4: Explore Tandiyun in 3D & Maps */}
      <ExploreSection />

      {/* Section 5: Photo Gallery & Lightbox */}
      <LandscapeGallery
        selectedPhotoId={selectedPhotoId}
        onClearSelectedPhoto={() => setSelectedPhotoId(null)}
      />

      {/* Section 6: Spiritual Places */}
      <SpiritualPlaces />

      {/* Section 7: Culture & Traditions */}
      <CultureSection />

      {/* Section 8: Community */}
      <CommunitySection />

      {/* Section 9: Footer */}
      <Footer />
    </main>
  );
}
