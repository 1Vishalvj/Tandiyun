'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin, ExternalLink, Navigation, Layers, Compass, Image as ImageIcon, X, AlertCircle } from 'lucide-react';

export const VillageMap: React.FC = () => {
  const { language } = useLanguage();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeLayer, setActiveLayer] = useState<'satellite' | 'topo' | 'osm'>('satellite');
  const [showSatelliteModal, setShowSatelliteModal] = useState(false);

  const bidaliyaCoords: [number, number] = [30.0026375, 78.8332031];
  const tandiyunCoords: [number, number] = [30.001952, 78.834910];

  // Motorable road coordinates derived from the Google Maps satellite screenshot (source of truth)
  const motorableRoadCoords: [number, number][] = [
    [30.0006, 78.8290],
    [30.0011, 78.8298],
    [30.0016, 78.8306], // Lower hairpin bend
    [30.0021, 78.8315],
    [30.0024, 78.8323],
    [30.0026375, 78.8332031], // Passes directly beside Bidaliya Niwaas
    [30.00258, 78.8339],
    [30.0028, 78.8344],
    [30.0035, 78.8348],
    [30.0046, 78.8351],
  ];

  // Separate uphill walking path starting to the left/west of Bidaliya Niwaas climbing to the village settlement
  const walkingPathCoords: [number, number][] = [
    [30.0026375, 78.83312], // Uphill trail start beside Bidaliya Niwaas
    [30.00248, 78.83365],   // Lower hillside terrace climb
    [30.00222, 78.83425],   // Middle hillside
    [30.001952, 78.834910], // Tandiyun Village hillside settlement
  ];

  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (!mapContainerRef.current || mapInstanceRef.current) return;

      // Dynamically import Leaflet
      const L = (await import('leaflet')).default;

      if (!isMounted || !mapContainerRef.current) return;

      // Fix Leaflet marker icons
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const centerLat = (bidaliyaCoords[0] + tandiyunCoords[0]) / 2;
      const centerLng = (bidaliyaCoords[1] + tandiyunCoords[1]) / 2;

      const map = L.map(mapContainerRef.current, {
        center: [centerLat, centerLng],
        zoom: 16,
        zoomControl: true,
        scrollWheelZoom: false,
      });
      mapInstanceRef.current = map;

      // 1. Satellite Imagery Layer (Esri World Imagery)
      const satelliteLayer = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 19,
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        }
      );

      // 2. Topographic Tile Layer (OpenTopoMap)
      const topoLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution: 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap',
      });

      // 3. Standard OSM layer
      const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      });

      // Default to Satellite Layer for immediate match with user source of truth
      satelliteLayer.addTo(map);
      (map as any)._customSat = satelliteLayer;
      (map as any)._customTopo = topoLayer;
      (map as any)._customOsm = osmLayer;

      // Motorable Road: Solid outer casing & inner road styling
      L.polyline(motorableRoadCoords, {
        color: '#e5dec9',
        weight: 6,
        opacity: 0.95,
      }).addTo(map);

      const motorableRoadMesh = L.polyline(motorableRoadCoords, {
        color: '#3d3832',
        weight: 4,
        opacity: 0.95,
      }).addTo(map);

      motorableRoadMesh.bindTooltip('Motorable Mountain Road (Paved)', {
        permanent: false,
        direction: 'center',
        className: 'custom-map-tooltip',
      });

      // Separate Uphill Walking Path: Distinct Dashed Styling
      const uphillTrail = L.polyline(walkingPathCoords, {
        color: '#A66F43',
        weight: 3.5,
        dashArray: '6, 8',
        opacity: 0.95,
      }).addTo(map);

      uphillTrail.bindTooltip('Separate Uphill Walking Trail (~300m / +45m ascent)', {
        permanent: false,
        direction: 'top',
        className: 'custom-map-tooltip',
      });

      // Custom Icon for Bidaliya Niwaas (Earth Brown)
      const bidaliyaIcon = L.divIcon({
        className: 'custom-pin-bidaliya',
        html: `
          <div style="background-color: #A66F43; color: #EDE5D5; padding: 6px 10px; border-radius: 9999px; font-weight: 700; font-size: 11px; white-space: nowrap; box-shadow: 0 4px 14px rgba(0,0,0,0.6); border: 2px solid #EDE5D5; display: flex; align-items: center; gap: 4px;">
            <span>📍 Bidaliya Niwaas (Roadside)</span>
          </div>
        `,
        iconSize: [160, 30],
        iconAnchor: [80, 30],
      });

      // Custom Icon for Tandiyun Village (Forest Green & Gold)
      const tandiyunIcon = L.divIcon({
        className: 'custom-pin-tandiyun',
        html: `
          <div style="background-color: #183C32; color: #EDE5D5; padding: 6px 12px; border-radius: 9999px; font-weight: 700; font-size: 12px; white-space: nowrap; box-shadow: 0 4px 14px rgba(0,0,0,0.7); border: 2px solid #A66F43; display: flex; align-items: center; gap: 4px;">
            <span>🏔️ टांडियूं (Tandiyun Village)</span>
          </div>
        `,
        iconSize: [170, 32],
        iconAnchor: [85, 32],
      });

      // Add Markers
      const markerBidaliya = L.marker(bidaliyaCoords, { icon: bidaliyaIcon }).addTo(map);
      markerBidaliya.bindPopup(`
        <div style="font-family: inherit; font-size: 13px; line-height: 1.4;">
          <strong style="color: #A66F43; font-size: 14px;">Bidaliya Niwaas</strong><br/>
          <span style="font-size: 11px; color: #333;">Situated directly beside the motorable road. Common arrival landmark & distance reference point.</span><br/>
          <div style="margin-top: 6px; font-size: 11px; font-family: monospace; color: #555;">
            30.0026375° N, 78.8332031° E
          </div>
          <div style="margin-top: 8px;">
            <a href="https://maps.google.com/?q=30.0026375,78.8332031" target="_blank" rel="noopener noreferrer" style="color: #A66F43; font-weight: 700; text-decoration: underline;">
              Open in Google Maps &rarr;
            </a>
          </div>
        </div>
      `);

      const markerTandiyun = L.marker(tandiyunCoords, { icon: tandiyunIcon }).addTo(map);
      markerTandiyun.bindPopup(`
        <div style="font-family: inherit; font-size: 13px; line-height: 1.4;">
          <strong style="color: #183C32; font-size: 14px;">Tandiyun Village (टांडियूं)</strong><br/>
          <span style="font-size: 11px; color: #333;">Hillside settlement uphill from the motor road. Accessible via the traditional walking footpath from Bidaliya Niwaas.</span><br/>
          <div style="margin-top: 6px; font-size: 11px; font-family: monospace; color: #555;">
            30.001952° N, 78.834910° E (Provisional)
          </div>
          <div style="margin-top: 8px;">
            <a href="https://maps.google.com/?q=30.001952,78.834910" target="_blank" rel="noopener noreferrer" style="color: #A66F43; font-weight: 700; text-decoration: underline;">
              Open in Google Maps &rarr;
            </a>
          </div>
        </div>
      `);

      // Fit bounds to show both clearly
      const bounds = L.latLngBounds([
        [30.0006, 78.8290],
        [30.0046, 78.8351],
      ]);
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 16 });

      setMapLoaded(true);
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const switchLayer = (type: 'satellite' | 'topo' | 'osm') => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;
    
    // Remove all custom tile layers
    if (map.hasLayer((map as any)._customSat)) map.removeLayer((map as any)._customSat);
    if (map.hasLayer((map as any)._customTopo)) map.removeLayer((map as any)._customTopo);
    if (map.hasLayer((map as any)._customOsm)) map.removeLayer((map as any)._customOsm);

    if (type === 'satellite') {
      map.addLayer((map as any)._customSat);
      setActiveLayer('satellite');
    } else if (type === 'topo') {
      map.addLayer((map as any)._customTopo);
      setActiveLayer('topo');
    } else {
      map.addLayer((map as any)._customOsm);
      setActiveLayer('osm');
    }
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-mist/20 bg-forest-dark shadow-cinematic">
      {/* 2D Map Canvas Container */}
      <div ref={mapContainerRef} className="w-full h-[460px] sm:h-[540px] z-0" />

      {/* Layer Switcher & Details Overlay */}
      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 flex flex-wrap items-center gap-1.5 sm:gap-2 bg-forest-dark/95 backdrop-blur-md p-1 sm:p-1.5 rounded-xl border border-mist/20 shadow-xl">
        <button
          onClick={() => switchLayer('satellite')}
          className={`px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs rounded-lg font-medium transition-colors ${
            activeLayer === 'satellite' ? 'bg-earth text-ivory font-bold' : 'text-mist/75 hover:text-ivory'
          }`}
        >
          Satellite
        </button>
        <button
          onClick={() => switchLayer('topo')}
          className={`px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs rounded-lg font-medium transition-colors ${
            activeLayer === 'topo' ? 'bg-earth text-ivory font-bold' : 'text-mist/75 hover:text-ivory'
          }`}
        >
          Topographic
        </button>
        <button
          onClick={() => switchLayer('osm')}
          className={`px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs rounded-lg font-medium transition-colors ${
            activeLayer === 'osm' ? 'bg-earth text-ivory font-bold' : 'text-mist/75 hover:text-ivory'
          }`}
        >
          Street Map
        </button>

        {/* Source of Truth Satellite Screenshot Button */}
        <button
          onClick={() => setShowSatelliteModal(true)}
          className="px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs rounded-lg font-medium bg-forest hover:bg-forest-light text-earth-light border border-earth/30 transition-colors flex items-center gap-1 shadow-sm"
          title="Inspect the official Google Maps satellite screenshot reference"
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Source Satellite</span>
        </button>
      </div>

      {/* Legend & Verification Disclaimer */}
      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 hidden md:block max-w-xs pointer-events-auto">
        <div className="p-3 rounded-xl bg-deepGreen-dark/95 backdrop-blur-md border border-mist/20 shadow-xl space-y-2 text-xs">
          <div className="text-[10px] font-mono uppercase tracking-wider text-earth-light font-bold flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            <span>Geographical Ground Truth</span>
          </div>
          <div className="space-y-1 text-[11px] font-mono text-mist/85">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-1 bg-stone-300 inline-block border border-black/40 rounded-sm" />
              <span>Motorable Road (Solid)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-0.5 border-t-2 border-dashed border-earth inline-block" />
              <span>Uphill Walking Trail (Dashed)</span>
            </div>
          </div>
          <div className="text-[10px] text-mist/60 italic pt-1 border-t border-mist/10">
            Bidaliya Niwaas beside road • Tandiyun uphill (~300m walk)
          </div>
        </div>
      </div>

      {/* Bottom Info Bar with Coordinates & External Links */}
      <div className="p-4 sm:p-5 bg-forest-dark/95 border-t border-mist/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-3 h-3 rounded-full bg-earth inline-block shrink-0" />
            <span className="font-semibold text-ivory">Bidaliya Niwaas:</span>
            <span className="font-mono text-mist/80">30.002638, 78.833203</span>
            <a
              href="https://maps.google.com/?q=30.0026375,78.8332031"
              target="_blank"
              rel="noopener noreferrer"
              className="text-earth-light hover:text-ivory inline-flex items-center gap-1"
              title="Open Bidaliya Niwaas on Google Maps"
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <span className="text-mist/30 hidden sm:inline">|</span>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-3 h-3 rounded-full bg-forest-light inline-block border border-mist/40 shrink-0" />
            <span className="font-semibold text-ivory">Tandiyun Village:</span>
            <span className="font-mono text-mist/80">30.001952, 78.834910</span>
            <a
              href="https://maps.google.com/?q=30.001952,78.834910"
              target="_blank"
              rel="noopener noreferrer"
              className="text-earth-light hover:text-ivory inline-flex items-center gap-1"
              title="Open Tandiyun Village on Google Maps"
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-earth-light bg-forest/40 px-3 py-1.5 rounded-lg border border-mist/10 shrink-0">
          <Navigation className="w-3.5 h-3.5" />
          <span>~300m Uphill Walk</span>
        </div>
      </div>

      {/* Satellite Source of Truth Modal */}
      {showSatelliteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setShowSatelliteModal(false)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-deepGreen-dark border border-mist/20 shadow-2xl p-4 sm:p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-mist/10 pb-3">
              <div>
                <span className="text-[11px] font-mono text-earth-light uppercase tracking-wider block">
                  Definitive Visual Ground Truth
                </span>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-ivory">
                  Official Google Maps Satellite Screenshot
                </h3>
              </div>
              <button
                onClick={() => setShowSatelliteModal(false)}
                className="p-1.5 rounded-full bg-forest hover:bg-forest-light text-ivory border border-mist/20 transition-colors"
                aria-label="Close satellite view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full h-[380px] sm:h-[500px] rounded-2xl overflow-hidden border border-mist/15 bg-black">
              <Image
                src="/assets/satellite/tandiyun-satellite.jpg"
                alt="Definitive Google Maps Satellite Screenshot of Tandiyun and Bidaliya Niwaas"
                fill
                className="object-contain"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-forest-dark/80 border border-mist/10 text-xs font-mono text-mist/90 space-y-1 leading-relaxed">
              <div className="text-earth-light font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Geographical Verification Points</span>
              </div>
              <p>• <strong>Bidaliya Niwaas:</strong> Located directly beside the curved motorable road.</p>
              <p>• <strong>Motorable Road:</strong> Winding mountain road traversing along the contour.</p>
              <p>• <strong>Uphill Walking Path:</strong> Distinct trail climbing uphill to the left of Bidaliya Niwaas.</p>
              <p>• <strong>Tandiyun Settlement:</strong> Traditional homes and terraced agricultural slopes situated on the hillside above.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
