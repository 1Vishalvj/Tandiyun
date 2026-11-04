# TANDIYUN (तंडियूं) – Official Village Website

> *"पहाड़ों में बसा एक छोटा सा संसार"*  
> *"Our Roots. Our Mountains. Our Memories."*

Official cinematic website and digital heritage archive for **Tandiyun**, a hill village nestled in the Garhwal Himalayas of Uttarakhand, India.

---

## 🏔️ Overview

This project is built to preserve the village's identity, original landscape photography, documentary video footage, cultural heritage, sacred landmarks, and community memories. It blends an editorial Himalayan documentary aesthetic with an archival digital sanctuary.

### Geographical Benchmark
- **Bidaliya Niwaas**: Latitude `30.0026375° N`, Longitude `78.8332031° E` (located beside the motorable road; common arrival point)
- **Tandiyun Village**: Latitude `30.001952° N`, Longitude `78.834910° E` (situated on the hillside above the road; reached via an uphill footpath of ~300 meters)

---

## ✨ Features

1. **Cinematic Hero**:
   - Full-screen original documentary video background (`tandiyun-cinematic.mp4`).
   - Muted autoplay, loop playback, high-contrast text overlay, poster fallback.
   - Interactive sound toggle allowing visitors to unmute authentic mountain ambiance.
   - Play/pause controls and smooth scroll CTA.

2. **Welcome to Tandiyun**:
   - High-resolution authentic landscape imagery.
   - Genuine village introduction avoiding synthetic statistics.
   - Approach route details highlighting the connection between Bidaliya Niwaas and Tandiyun.

3. **Discover Our Landscape**:
   - Curated visual presentation showcasing surrounding mountains, green valleys, pine/oak forests, terraced slopes, and the mountain approach route.
   - Connects directly to the image lightbox.

4. **Explore in 3D & Interactive Topographic Map**:
   - **3D WebGL Terrain Model** (Three.js): Interactive conceptual terrain prototype with OrbitControls (zoom, rotate, pan), road contour, Bidaliya Niwaas pin, Tandiyun village pin with traditional stone slate homes, glowing uphill walking trail, and toggleable morning mist.
   - **2D Interactive Map** (Leaflet / OpenStreetMap): Real coordinates, topographic layer toggle, markers, and direct Google Maps navigation links.

5. **Photo Gallery & Lightbox**:
   - Masonry layout featuring all 8 original photographs supplied by the owner (July & August 2020).
   - Category filtering: *Mountain Views, Clouds & Mist, Green Landscapes, Village Memories, Sunrise & Sunset, Village Life*.
   - Full-screen lightbox with keyboard controls (arrows, escape), original capture timestamps, captions, and links to raw high-resolution files.

6. **Spiritual Places Directory**:
   - Shrines benchmarked from Bidaliya Niwaas: *Bunkhal Kalinka Devi, Maa Bungi Devi, Gujru Garhi, Maa Jwalpa Devi, Danda Nagraja, Tarakund Mahadev, Binsar Mahadev, Kyunkaleshwar Mahadev*.
   - Clearly marked with "Distance to be verified" to uphold factual integrity.
   - Direct Google Maps links for pilgrimage routes.

7. **Culture & Living Traditions**:
   - Garhwali folk festivals (*Phooldei, Igas Bagwal, Harela, Ghee Sankranti*).
   - Traditional mountain cuisine (*Mandua Roti, Chainsoo, Kafuli, Jhangora Kheer*).
   - Architectural heritage (*Pakhana slate roofs, Tiwari woodwork*) and village deity reverence.

8. **Community Noticeboard & Memories**:
   - Announcements and upcoming gatherings.
   - Interactive memory submission form with local browser persistence (ready for future Supabase cloud synchronization).

9. **Bilingual Support**:
   - Full English and Hindi (हिन्दी) dual-language toggle with persistent user preference.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, React 18, TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom Himalayan documentary palette
- **3D Graphics**: [Three.js](https://threejs.org/) with OrbitControls
- **2D Maps**: [Leaflet](https://leafletjs.com/) with OpenStreetMap & OpenTopoMap
- **Icons**: [Lucide React](https://lucide.dev/)
- **Image Optimization**: [Sharp](https://sharp.pixelplumbing.com/) (original preservation + responsive WebP conversion)

---

## 🚀 Getting Started

### 1. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Build for Production
```bash
npm run build
```

### 3. Start Production Server
```bash
npm run start
```

### 4. Optimize Assets (if adding new photos)
```bash
npm run optimize-images
```

---

## 🌿 Asset Directory Structure

```
public/
  assets/
    photos/
      mountains/
      clouds/
      landscapes/
      village/
      gallery/          <-- Original preserved JPGs, WebP files & thumbnails
    videos/
      tandiyun-cinematic.mp4
      hero-poster.webp
    textures/
    icons/
```

---

## 🏷️ Copyright & Reverence

All original landscape photographs and video recordings are property of the Tandiyun village community.  
*"Wherever we go, our roots remain in Tandiyun."*

