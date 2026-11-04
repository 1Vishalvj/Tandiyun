'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useLanguage } from '@/context/LanguageContext';
import { RotateCw, Compass, Eye, Maximize2, Minimize2, Navigation, AlertCircle } from 'lucide-react';

interface TerrainViewer3DProps {
  className?: string;
}

export const TerrainViewer3D: React.FC<TerrainViewer3DProps> = ({ className = '' }) => {
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeFocus, setActiveFocus] = useState<'overview' | 'bidaliya' | 'village'>('overview');
  const [mistEnabled, setMistEnabled] = useState(true);
  const [trailVisible, setTrailVisible] = useState(true);

  // References to 3D objects for interaction
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const trailGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 520;

    // SCENE
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const mistColor = 0x183c32;
    scene.background = new THREE.Color(mistColor);
    scene.fog = new THREE.FogExp2(mistColor, 0.012);

    // CAMERA
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.5, 1000);
    camera.position.set(0, 38, 55);
    cameraRef.current = camera;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.05; // don't go below ground
    controls.minDistance = 15;
    controls.maxDistance = 120;
    controls.target.set(0, 8, 0);
    controlsRef.current = controls;

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xd8e1d4, 0.85);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff5e0, 2.2);
    sunLight.position.set(40, 60, 25);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 150;
    sunLight.shadow.camera.left = -40;
    sunLight.shadow.camera.right = 40;
    sunLight.shadow.camera.top = 40;
    sunLight.shadow.camera.bottom = -40;
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0xa66f43, 0.4);
    fillLight.position.set(-30, 20, -20);
    scene.add(fillLight);

    // TERRAIN GEOMETRY
    // Plane oriented along XZ, simulating the hillside rising from road level (Y=2, Z=15)
    // up towards village level (Y=14, Z=-15) and back ridges (Y=24, Z=-35)
    const terrainWidth = 90;
    const terrainDepth = 90;
    const gridRes = 90;
    const terrainGeo = new THREE.PlaneGeometry(terrainWidth, terrainDepth, gridRes, gridRes);
    terrainGeo.rotateX(-Math.PI / 2);

    const pos = terrainGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);

      // Primary slope: rises from positive Z (road valley) to negative Z (mountain ridge)
      const baseSlope = ((-z + 40) / 80) * 20;

      // Hillside ridge variations with sine/cosine
      const ridge1 = Math.sin(x * 0.08) * Math.cos(z * 0.06) * 4.5;
      const ridge2 = Math.sin((x + z) * 0.12) * 2.0;

      // Valley depression along road side
      const valley = Math.exp(-Math.pow((z - 16) / 12, 2)) * -2.5;

      let y = Math.max(1, baseSlope + ridge1 + ridge2 + valley);

      // Flatten terrace around Bidaliya Niwaas (X: -12, Z: 14)
      const distToBidaliya = Math.hypot(x - (-12), z - 14);
      if (distToBidaliya < 8) {
        y = THREE.MathUtils.lerp(y, 3.2, (8 - distToBidaliya) / 8 * 0.6);
      }

      // Flatten terrace around Tandiyun village (X: 10, Z: -10)
      const distToVillage = Math.hypot(x - 10, z - (-10));
      if (distToVillage < 14) {
        y = THREE.MathUtils.lerp(y, 14.5, (14 - distToVillage) / 14 * 0.55);
      }

      pos.setY(i, y);
    }
    terrainGeo.computeVertexNormals();

    // Terrain Material with subtle terraced mountain grass color
    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0x243d32,
      roughness: 0.88,
      metalness: 0.08,
      flatShading: true,
    });
    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    terrainMesh.receiveShadow = true;
    scene.add(terrainMesh);

    // MOTORABLE ROAD (curve passing Bidaliya Niwaas)
    const roadCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-40, 2.2, 18),
      new THREE.Vector3(-25, 2.8, 16),
      new THREE.Vector3(-12, 3.3, 14), // Bidaliya Niwaas
      new THREE.Vector3(2, 3.6, 15),
      new THREE.Vector3(20, 4.0, 19),
      new THREE.Vector3(40, 4.5, 24),
    ]);
    const roadGeo = new THREE.TubeGeometry(roadCurve, 64, 1.2, 8, false);
    const roadMat = new THREE.MeshStandardMaterial({
      color: 0x5a544c,
      roughness: 0.9,
    });
    const roadMesh = new THREE.Mesh(roadGeo, roadMat);
    roadMesh.receiveShadow = true;
    scene.add(roadMesh);

    // WALKING TRAIL (uphill from Bidaliya Niwaas to Tandiyun Village)
    const trailGroup = new THREE.Group();
    trailGroupRef.current = trailGroup;
    scene.add(trailGroup);

    const trailCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-12, 3.8, 14),   // Start: Bidaliya Niwaas
      new THREE.Vector3(-6, 6.2, 8),     // Ascent curve 1
      new THREE.Vector3(0, 9.5, 2),      // Intermediate ridge slope
      new THREE.Vector3(4, 12.0, -4),    // Upper terrace approach
      new THREE.Vector3(10, 14.8, -10),  // Arrival: Tandiyun Village
    ]);

    const trailGeo = new THREE.TubeGeometry(trailCurve, 50, 0.35, 6, false);
    const trailMat = new THREE.MeshStandardMaterial({
      color: 0xa66f43,
      emissive: 0x8c5a32,
      emissiveIntensity: 0.4,
      roughness: 0.8,
    });
    const trailMesh = new THREE.Mesh(trailGeo, trailMat);
    trailGroup.add(trailMesh);

    // Glowing Trail Dashes (Points)
    const trailPoints = trailCurve.getPoints(80);
    const trailPointsGeo = new THREE.BufferGeometry().setFromPoints(trailPoints);
    const trailPointsMat = new THREE.PointsMaterial({
      color: 0xffe5b4,
      size: 0.8,
      transparent: true,
      opacity: 0.85,
    });
    const trailPointsMesh = new THREE.Points(trailPointsGeo, trailPointsMat);
    trailGroup.add(trailPointsMesh);

    // MARKER 1: BIDALIYA NIWAAS (beside road)
    const bidaliyaPos = new THREE.Vector3(-12, 4.2, 14);
    const bidaliyaGroup = new THREE.Group();
    bidaliyaGroup.position.copy(bidaliyaPos);

    // Pin Pole
    const poleGeo = new THREE.CylinderGeometry(0.12, 0.12, 3, 12);
    poleGeo.translate(0, 1.5, 0);
    const poleMat = new THREE.MeshBasicMaterial({ color: 0xede5d5 });
    const poleMesh = new THREE.Mesh(poleGeo, poleMat);
    bidaliyaGroup.add(poleMesh);

    // Pin Head (Sphere)
    const pinHeadGeo = new THREE.SphereGeometry(0.8, 16, 16);
    pinHeadGeo.translate(0, 3.2, 0);
    const pinHeadMat = new THREE.MeshStandardMaterial({
      color: 0xa66f43,
      emissive: 0xa66f43,
      emissiveIntensity: 0.6,
      roughness: 0.3,
    });
    const pinHeadMesh = new THREE.Mesh(pinHeadGeo, pinHeadMat);
    bidaliyaGroup.add(pinHeadMesh);

    // Pulsing Ground Ring
    const ringGeo = new THREE.RingGeometry(1.2, 1.6, 24);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xa66f43,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.y = 0.1;
    bidaliyaGroup.add(ringMesh);

    // Small House Model representing Bidaliya Niwaas roadside home
    const houseBaseGeo = new THREE.BoxGeometry(2.4, 1.8, 2);
    houseBaseGeo.translate(0, 0.9, -1.8);
    const houseMat = new THREE.MeshStandardMaterial({ color: 0xede5d5, roughness: 0.7 });
    const houseMesh = new THREE.Mesh(houseBaseGeo, houseMat);
    houseMesh.castShadow = true;
    bidaliyaGroup.add(houseMesh);

    const roofGeo = new THREE.ConeGeometry(2.2, 1.2, 4);
    roofGeo.rotateY(Math.PI / 4);
    roofGeo.translate(0, 2.4, -1.8);
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x5a544c, roughness: 0.5 });
    const roofMesh = new THREE.Mesh(roofGeo, roofMat);
    bidaliyaGroup.add(roofMesh);

    scene.add(bidaliyaGroup);

    // MARKER 2: TANDIYUN VILLAGE (hillside above)
    const villagePos = new THREE.Vector3(10, 15.2, -10);
    const villageGroup = new THREE.Group();
    villageGroup.position.copy(villagePos);

    // Village Pin
    const vPoleGeo = new THREE.CylinderGeometry(0.12, 0.12, 4.5, 12);
    vPoleGeo.translate(0, 2.25, 0);
    const vPoleMat = new THREE.MeshBasicMaterial({ color: 0xfff5e0 });
    const vPoleMesh = new THREE.Mesh(vPoleGeo, vPoleMat);
    villageGroup.add(vPoleMesh);

    const vPinHeadGeo = new THREE.SphereGeometry(1.2, 16, 16);
    vPinHeadGeo.translate(0, 4.8, 0);
    const vPinHeadMat = new THREE.MeshStandardMaterial({
      color: 0xd8e1d4,
      emissive: 0xd8e1d4,
      emissiveIntensity: 0.8,
      roughness: 0.2,
    });
    const vPinHeadMesh = new THREE.Mesh(vPinHeadGeo, vPinHeadMat);
    villageGroup.add(vPinHeadMesh);

    // Village Cluster Houses
    const villageHouses = [
      { x: -2.5, z: -1.5, rot: 0.2 },
      { x: 1.5, z: -2.2, rot: -0.3 },
      { x: 3.2, z: 1.0, rot: 0.1 },
      { x: -1.0, z: 2.2, rot: -0.15 },
    ];
    villageHouses.forEach(h => {
      const vhBase = new THREE.BoxGeometry(2.2, 1.6, 1.8);
      vhBase.translate(h.x, 0.8, h.z);
      const vhMesh = new THREE.Mesh(vhBase, houseMat);
      vhMesh.castShadow = true;
      villageGroup.add(vhMesh);

      const vhRoof = new THREE.ConeGeometry(2.0, 1.0, 4);
      vhRoof.rotateY(Math.PI / 4 + h.rot);
      vhRoof.translate(h.x, 2.1, h.z);
      const vhRoofMesh = new THREE.Mesh(vhRoof, roofMat);
      villageGroup.add(vhRoofMesh);
    });

    scene.add(villageGroup);

    // PINE TREES (clusters on the slopes)
    const treeGroup = new THREE.Group();
    const treeTrunkGeo = new THREE.CylinderGeometry(0.15, 0.25, 1.2, 6);
    const treeFoliageGeo = new THREE.ConeGeometry(1.4, 3.2, 7);
    const treeTrunkMat = new THREE.MeshStandardMaterial({ color: 0x4a2e1b });
    const treeFoliageMat = new THREE.MeshStandardMaterial({ color: 0x183c32, roughness: 0.9 });

    // Seeded tree placements avoiding road & village center
    const treePositions = [
      { x: -25, z: 5 }, { x: -22, z: -2 }, { x: -18, z: -8 },
      { x: -5, z: -15 }, { x: -10, z: -22 }, { x: 2, z: -24 },
      { x: 18, z: -20 }, { x: 25, z: -12 }, { x: 22, z: 2 },
      { x: 15, z: 8 }, { x: -2, z: 22 }, { x: 12, z: 20 },
      { x: -30, z: 20 }, { x: 28, z: -25 }, { x: 0, z: -32 },
    ];

    treePositions.forEach(tp => {
      // Find approximate terrain height at tp.x, tp.z
      const baseSlope = ((-tp.z + 40) / 80) * 20;
      const ty = Math.max(1.5, baseSlope + Math.sin(tp.x * 0.08) * 3);

      const trunk = new THREE.Mesh(treeTrunkGeo, treeTrunkMat);
      trunk.position.set(tp.x, ty + 0.6, tp.z);
      trunk.castShadow = true;
      treeGroup.add(trunk);

      const foliage = new THREE.Mesh(treeFoliageGeo, treeFoliageMat);
      foliage.position.set(tp.x, ty + 2.4, tp.z);
      foliage.castShadow = true;
      treeGroup.add(foliage);
    });
    scene.add(treeGroup);

    // ANIMATION LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Pulsing effect on markers
      const scalePulse = 1 + Math.sin(elapsedTime * 3) * 0.15;
      pinHeadMesh.scale.set(scalePulse, scalePulse, scalePulse);
      vPinHeadMesh.scale.set(scalePulse, scalePulse, scalePulse);
      ringMesh.scale.set(1 + Math.sin(elapsedTime * 2) * 0.25, 1 + Math.sin(elapsedTime * 2) * 0.25, 1);

      // Trail glowing animation
      if (trailPointsMat) {
        trailPointsMat.size = 0.7 + Math.sin(elapsedTime * 4) * 0.25;
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight || 520;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // CAMERA CONTROLS
  const focusOn = (mode: 'overview' | 'bidaliya' | 'village') => {
    if (!controlsRef.current || !cameraRef.current) return;
    const controls = controlsRef.current;
    const camera = cameraRef.current;
    setActiveFocus(mode);

    if (mode === 'overview') {
      controls.target.set(0, 8, 0);
      camera.position.set(0, 38, 55);
    } else if (mode === 'bidaliya') {
      controls.target.set(-12, 4.2, 14);
      camera.position.set(-20, 14, 30);
    } else if (mode === 'village') {
      controls.target.set(10, 15.2, -10);
      camera.position.set(14, 26, 8);
    }
    controls.update();
  };

  const toggleMist = () => {
    if (!sceneRef.current) return;
    if (mistEnabled) {
      sceneRef.current.fog = null;
    } else {
      sceneRef.current.fog = new THREE.FogExp2(0x183c32, 0.012);
    }
    setMistEnabled(!mistEnabled);
  };

  const toggleTrail = () => {
    if (trailGroupRef.current) {
      trailGroupRef.current.visible = !trailVisible;
      setTrailVisible(!trailVisible);
    }
  };

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden border border-mist/20 bg-forest-dark shadow-cinematic ${className}`}>
      {/* 3D Canvas Container */}
      <div
        ref={containerRef}
        className={`w-full ${isFullscreen ? 'fixed inset-0 z-50 h-screen' : 'h-[500px] sm:h-[580px]'}`}
      />

      {/* Top Overlay: Prototype Notice & Badge */}
      <div className="absolute top-4 left-4 right-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pointer-events-none z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-forest-dark/85 backdrop-blur-md border border-mist/20 text-xs font-mono text-mist shadow-lg pointer-events-auto">
          <Compass className="w-4 h-4 text-earth-light animate-spin-slow" />
          <span className="font-semibold text-ivory">Garhwal Hillside Topography</span>
          <span className="text-earth">•</span>
          <span className="text-mist/75">3D Model</span>
        </div>

        {/* Clear Conceptual Terrain Prototype Banner (Instruction Requirement) */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-earth-dark/80 backdrop-blur-md border border-earth/40 text-[11px] text-ivory/95 font-sans pointer-events-auto shadow-md">
          <AlertCircle className="w-3.5 h-3.5 text-earth-light shrink-0" />
          <span>{t.terrain.disclaimer}</span>
        </div>
      </div>

      {/* Interactive Legend & Marker Details Card */}
      <div className="absolute bottom-4 left-4 z-10 pointer-events-auto max-w-sm hidden md:block">
        <div className="bg-forest-dark/90 backdrop-blur-md border border-mist/20 rounded-xl p-4 shadow-2xl space-y-3">
          <div className="text-xs uppercase tracking-wider text-mist/60 font-mono">
            Key Geographical Markers
          </div>

          {/* Bidaliya Niwaas Marker */}
          <div
            onClick={() => focusOn('bidaliya')}
            className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
              activeFocus === 'bidaliya'
                ? 'border-earth bg-earth/15'
                : 'border-mist/10 hover:border-mist/30 bg-forest/40'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-ivory flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-earth inline-block" />
                {t.terrain.bidaliyaTitle}
              </span>
              <span className="text-[11px] font-mono text-mist/70">Road Level</span>
            </div>
            <p className="text-xs text-mist/80 mt-1 leading-relaxed">
              {t.terrain.bidaliyaDesc}
            </p>
            <div className="text-[10px] font-mono text-earth-light mt-1">
              Lat: 30.0026375, Long: 78.8332031
            </div>
          </div>

          {/* Tandiyun Village Marker */}
          <div
            onClick={() => focusOn('village')}
            className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
              activeFocus === 'village'
                ? 'border-mist bg-mist/15'
                : 'border-mist/10 hover:border-mist/30 bg-forest/40'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-ivory flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-mist inline-block" />
                {t.terrain.villageTitle}
              </span>
              <span className="text-[11px] font-mono text-earth-light">Hillside Settlement</span>
            </div>
            <p className="text-xs text-mist/80 mt-1 leading-relaxed">
              {t.terrain.villageDesc}
            </p>
            <div className="text-[10px] font-mono text-earth-light mt-1">
              Lat: 30.001952, Long: 78.834910
            </div>
          </div>

          {/* Walking Path Note */}
          <div className="pt-1 flex items-center gap-2 text-[11px] text-mist/75 font-mono">
            <Navigation className="w-3.5 h-3.5 text-earth-light" />
            <span>{t.terrain.uphillTrail}</span>
          </div>
        </div>
      </div>

      {/* Floating View Controls (Top Right / Bottom Right) */}
      <div className="absolute bottom-4 right-4 z-10 flex flex-wrap sm:flex-col items-end gap-2 pointer-events-auto">
        <div className="flex items-center gap-1.5 bg-forest-dark/90 backdrop-blur-md p-1.5 rounded-xl border border-mist/20 shadow-xl">
          <button
            onClick={() => focusOn('overview')}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
              activeFocus === 'overview' ? 'bg-earth text-ivory' : 'text-mist/80 hover:text-ivory'
            }`}
            title="Reset overview view"
          >
            <span className="flex items-center gap-1">
              <RotateCw className="w-3 h-3" />
              <span>{t.terrain.controls.reset}</span>
            </span>
          </button>

          <button
            onClick={() => focusOn('bidaliya')}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
              activeFocus === 'bidaliya' ? 'bg-earth text-ivory' : 'text-mist/80 hover:text-ivory'
            }`}
          >
            {t.terrain.controls.focusBidaliya}
          </button>

          <button
            onClick={() => focusOn('village')}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
              activeFocus === 'village' ? 'bg-earth text-ivory' : 'text-mist/80 hover:text-ivory'
            }`}
          >
            {t.terrain.controls.focusVillage}
          </button>
        </div>

        <div className="flex items-center gap-1.5 bg-forest-dark/90 backdrop-blur-md p-1.5 rounded-xl border border-mist/20 shadow-xl">
          <button
            onClick={toggleMist}
            className={`px-2.5 py-1 text-xs rounded-lg border transition-colors ${
              mistEnabled ? 'border-mist/40 text-ivory bg-forest' : 'border-mist/10 text-mist/60'
            }`}
            title="Toggle morning mist fog"
          >
            {t.terrain.controls.fog}
          </button>

          <button
            onClick={toggleTrail}
            className={`px-2.5 py-1 text-xs rounded-lg border transition-colors ${
              trailVisible ? 'border-earth text-ivory bg-earth/20' : 'border-mist/10 text-mist/60'
            }`}
            title="Toggle walking trail"
          >
            {t.terrain.controls.trail}
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg border border-mist/20 text-ivory hover:text-earth-light transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mouse / Touch interaction hint */}
      <div className="absolute bottom-16 sm:bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none hidden lg:block">
        <span className="text-[11px] font-mono text-mist/60 bg-forest-dark/70 px-3 py-1 rounded-full border border-mist/10 backdrop-blur-sm">
          Left Click + Drag: Rotate • Scroll: Zoom • Right Click: Pan
        </span>
      </div>
    </div>
  );
};

