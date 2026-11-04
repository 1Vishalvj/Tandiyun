'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { TerrainViewer3D } from './TerrainViewer3D';
import { VillageMap } from './VillageMap';
import { Compass, Box, Map } from 'lucide-react';

export const ExploreSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [viewMode, setViewMode] = useState<'3d' | 'map'>('3d');

  return (
    <section id="explore" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-forest-dark border-t border-mist/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-mist/20 bg-forest/40 text-earth-light text-xs uppercase tracking-[0.2em] font-semibold mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>{t.terrain.badge}</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl text-ivory font-bold tracking-wide">
              {t.terrain.title}
            </h2>
            <p className="mt-4 text-mist/80 text-base sm:text-lg leading-relaxed">
              {t.terrain.subtitle}
            </p>
          </div>

          {/* View Mode Toggle Button */}
          <div className="flex items-center p-1 rounded-xl bg-forest/80 border border-mist/20 shadow-lg shrink-0">
            <button
              onClick={() => setViewMode('3d')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                viewMode === '3d'
                  ? 'bg-earth text-ivory shadow font-bold'
                  : 'text-mist/70 hover:text-ivory'
              }`}
            >
              <Box className="w-4 h-4" />
              <span>{t.terrain.controls.viewMode3D}</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                viewMode === 'map'
                  ? 'bg-earth text-ivory shadow font-bold'
                  : 'text-mist/70 hover:text-ivory'
              }`}
            >
              <Map className="w-4 h-4" />
              <span>{t.terrain.controls.viewModeMap}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Display: 3D Terrain or 2D Map */}
        <div className="w-full">
          {viewMode === '3d' ? (
            <TerrainViewer3D />
          ) : (
            <VillageMap />
          )}
        </div>
      </div>
    </section>
  );
};

