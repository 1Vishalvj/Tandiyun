'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin, ExternalLink, Navigation, Layers } from 'lucide-react';

export const VillageMap: React.FC = () => {
  const { language } = useLanguage();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeLayer, setActiveLayer] = useState<'topo' | 'osm'>('topo');

  const bidaliyaCoords: [number, number] = [30.0026375, 78.8332031];
  const tandiyunCoords: [number, number] = [30.001952, 78.834910];

  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (!mapContainerRef.current || mapInstanceRef.current) return;

      // Dynamically import Leaflet to avoid SSR window issues
      const L = (await import('leaflet')).default;

      if (!isMounted || !mapContainerRef.current) return;

      // Fix Leaflet default icon issues in bundlers
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      // Calculate center between both points
      const centerLat = (bidaliyaCoords[0] + tandiyunCoords[0]) / 2;
      const centerLng = (bidaliyaCoords[1] + tandiyunCoords[1]) / 2;

      const map = L.map(mapContainerRef.current, {
        center: [centerLat, centerLng],
        zoom: 16,
        zoomControl: true,
        scrollWheelZoom: false,
      });
      mapInstanceRef.current = map;

      // Add Topographic Tile Layer (OpenTopoMap)
      const topoLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution: 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap',
      });

      // Standard OSM layer
      const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      });

      topoLayer.addTo(map);
      (map as any)._customTopo = topoLayer;
      (map as any)._customOsm = osmLayer;

      // Custom Icon for Bidaliya Niwaas (Earth Brown)
      const bidaliyaIcon = L.divIcon({
        className: 'custom-pin-bidaliya',
        html: `
          <div style="background-color: #A66F43; color: #EDE5D5; padding: 6px 10px; border-radius: 9999px; font-weight: 600; font-size: 11px; white-space: nowrap; box-shadow: 0 4px 14px rgba(0,0,0,0.5); border: 2px solid #EDE5D5; display: flex; align-items: center; gap: 4px;">
            <span>📍 Bidaliya Niwaas</span>
          </div>
        `,
        iconSize: [120, 30],
        iconAnchor: [60, 30],
      });

      // Custom Icon for Tandiyun Village (Forest Green & Gold)
      const tandiyunIcon = L.divIcon({
        className: 'custom-pin-tandiyun',
        html: `
          <div style="background-color: #183C32; color: #EDE5D5; padding: 6px 12px; border-radius: 9999px; font-weight: 700; font-size: 12px; white-space: nowrap; box-shadow: 0 4px 14px rgba(0,0,0,0.6); border: 2px solid #A66F43; display: flex; align-items: center; gap: 4px;">
            <span>🏔️ Tandiyun Village</span>
          </div>
        `,
        iconSize: [130, 32],
        iconAnchor: [65, 32],
      });

      // Add Markers
      const markerBidaliya = L.marker(bidaliyaCoords, { icon: bidaliyaIcon }).addTo(map);
      markerBidaliya.bindPopup(`
        <div style="font-family: inherit; font-size: 13px; line-height: 1.4;">
          <strong style="color: #A66F43; font-size: 14px;">Bidaliya Niwaas</strong><br/>
          <span style="font-size: 11px; color: #D8E1D4;">Located beside the motorable road.</span><br/>
          <div style="margin-top: 6px; font-size: 11px; font-family: monospace;">
            30.0026375° N, 78.8332031° E
          </div>
          <div style="margin-top: 8px;">
            <a href="https://maps.google.com/?q=30.0026375,78.8332031" target="_blank" rel="noopener noreferrer" style="color: #A66F43; font-weight: 600; text-decoration: underline;">
              Open in Google Maps &rarr;
            </a>
          </div>
        </div>
      `);

      const markerTandiyun = L.marker(tandiyunCoords, { icon: tandiyunIcon }).addTo(map);
      markerTandiyun.bindPopup(`
        <div style="font-family: inherit; font-size: 13px; line-height: 1.4;">
          <strong style="color: #D8E1D4; font-size: 14px;">Tandiyun Village (टांडियूं)</strong><br/>
          <span style="font-size: 11px; color: #D8E1D4;">Hillside settlement above the motor road. Walk uphill from Bidaliya Niwaas.</span><br/>
          <div style="margin-top: 6px; font-size: 11px; font-family: monospace;">
            30.001952° N, 78.834910° E
          </div>
          <div style="margin-top: 8px;">
            <a href="https://maps.google.com/?q=30.001952,78.834910" target="_blank" rel="noopener noreferrer" style="color: #A66F43; font-weight: 600; text-decoration: underline;">
              Open in Google Maps &rarr;
            </a>
          </div>
        </div>
      `);

      // Walking path line between them
      const pathLine = L.polyline([bidaliyaCoords, tandiyunCoords], {
        color: '#A66F43',
        weight: 3,
        dashArray: '6, 8',
        opacity: 0.9,
      }).addTo(map);

      pathLine.bindTooltip('Uphill Walking Path (~250-300m)', {
        permanent: false,
        direction: 'top',
        className: 'custom-map-tooltip',
      });

      // Fit bounds to show both clearly
      const bounds = L.latLngBounds([bidaliyaCoords, tandiyunCoords]);
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 16 });

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

  const switchLayer = (type: 'topo' | 'osm') => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;
    if (type === 'topo') {
      map.removeLayer((map as any)._customOsm);
      map.addLayer((map as any)._customTopo);
      setActiveLayer('topo');
    } else {
      map.removeLayer((map as any)._customTopo);
      map.addLayer((map as any)._customOsm);
      setActiveLayer('osm');
    }
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-mist/20 bg-forest-dark shadow-cinematic">
      {/* 2D Map Canvas Container */}
      <div ref={mapContainerRef} className="w-full h-[450px] sm:h-[520px] z-0" />

      {/* Layer Switcher & Details Overlay */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-forest-dark/90 backdrop-blur-md p-1.5 rounded-xl border border-mist/20 shadow-xl">
        <span className="text-[11px] font-mono text-mist/70 pl-2 pr-1 hidden sm:inline flex items-center gap-1">
          <Layers className="w-3 h-3 text-earth-light" /> View:
        </span>
        <button
          onClick={() => switchLayer('topo')}
          className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
            activeLayer === 'topo' ? 'bg-earth text-ivory font-bold' : 'text-mist/70 hover:text-ivory'
          }`}
        >
          Topographic
        </button>
        <button
          onClick={() => switchLayer('osm')}
          className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
            activeLayer === 'osm' ? 'bg-earth text-ivory font-bold' : 'text-mist/70 hover:text-ivory'
          }`}
        >
          Street Map
        </button>
      </div>

      {/* Bottom Info Bar with Coordinates & External Links */}
      <div className="p-4 sm:p-5 bg-forest-dark/95 border-t border-mist/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-earth inline-block" />
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

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-forest-light inline-block border border-mist/40" />
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

        <div className="flex items-center gap-2 text-xs font-mono text-earth-light bg-forest/40 px-3 py-1.5 rounded-lg border border-mist/10">
          <Navigation className="w-3.5 h-3.5" />
          <span>~300m Uphill Walk</span>
        </div>
      </div>
    </div>
  );
};
