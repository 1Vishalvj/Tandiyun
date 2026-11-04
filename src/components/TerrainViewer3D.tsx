'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useLanguage } from '@/context/LanguageContext';
import { RotateCw, Compass, Maximize2, Minimize2, Navigation, AlertCircle, ExternalLink, MapPin } from 'lucide-react';

interface TerrainViewer3DProps {
  className?: string;
  isDedicatedPage?: boolean;
}

export const TerrainViewer3D: React.FC<TerrainViewer3DProps> = ({
  className = '',
  isDedicatedPage = false,
}) => {
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeFocus, setActiveFocus] = useState<'overview' | 'bidaliya' | 'village'>('overview');
  const [mistEnabled, setMistEnabled] = useState(true);
  const [trailVisible, setTrailVisible] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState<'bidaliya' | 'village' | null>(null);
  const [isTouchActive, setIsTouchActive] = useState(false);

  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const trailGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || (isDedicatedPage ? 650 : 540);

    // SCENE
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const mistColor = 0x0f2922;
    scene.background = new THREE.Color(mistColor);
    scene.fog = new THREE.FogExp2(mistColor, 0.011);

    // CAMERA
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.5, 1200);
    camera.position.set(0, 36, 54);
    cameraRef.current = camera;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.06;
    controls.minDistance = 14;
    controls.maxDistance = 140;
    controls.target.set(0, 8, 0);
    // Smooth mobile scrolling: two fingers to rotate by default so single finger scrolls the page
    controls.touches = {
      ONE: -1 as unknown as THREE.TOUCH,
      TWO: THREE.TOUCH.ROTATE,
    };
    renderer.domElement.style.touchAction = 'pan-y';
    controlsRef.current = controls;

    // LIGHTING (Himalayan Morning Atmosphere)
    const ambientLight = new THREE.AmbientLight(0xd8e1d4, 0.9);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff7e8, 2.4);
    sunLight.position.set(45, 65, 30);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 160;
    sunLight.shadow.camera.left = -45;
    sunLight.shadow.camera.right = 45;
    sunLight.shadow.camera.top = 45;
    sunLight.shadow.camera.bottom = -45;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    const mountainFill = new THREE.DirectionalLight(0xa66f43, 0.55);
    mountainFill.position.set(-35, 25, -25);
    scene.add(mountainFill);

    // HIMALAYAN MOUNTAIN TERRAIN GEOMETRY
    const terrainWidth = 100;
    const terrainDepth = 100;
    const gridRes = 100;
    const terrainGeo = new THREE.PlaneGeometry(terrainWidth, terrainDepth, gridRes, gridRes);
    terrainGeo.rotateX(-Math.PI / 2);

    const pos = terrainGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);

      // Primary Himalayan hillside slope rising from road base (Z > 0) to village & ridge (Z < 0)
      const baseSlope = ((-z + 50) / 100) * 24;

      // Layered Garhwal mountain contours
      const ridge1 = Math.sin(x * 0.075) * Math.cos(z * 0.055) * 5.2;
      const ridge2 = Math.sin((x + z) * 0.11) * 2.5;
      const microTerrace = Math.sin(z * 0.4) * 0.4;

      // Valley depression along lower road boundary
      const valley = Math.exp(-Math.pow((z - 18) / 14, 2)) * -3.0;

      let y = Math.max(1.2, baseSlope + ridge1 + ridge2 + microTerrace + valley);

      // Terrace around Bidaliya Niwaas (X: -14, Z: 15) beside road
      const distToBidaliya = Math.hypot(x - (-14), z - 15);
      if (distToBidaliya < 9) {
        y = THREE.MathUtils.lerp(y, 3.4, (9 - distToBidaliya) / 9 * 0.65);
      }

      // Upper hillside terrace around Tandiyun village settlement (X: 12, Z: -12)
      const distToVillage = Math.hypot(x - 12, z - (-12));
      if (distToVillage < 16) {
        y = THREE.MathUtils.lerp(y, 16.2, (16 - distToVillage) / 16 * 0.6);
      }

      pos.setY(i, y);
    }
    terrainGeo.computeVertexNormals();

    // Natural mountain terrain material
    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0x183c32,
      roughness: 0.85,
      metalness: 0.05,
      flatShading: true,
    });
    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    terrainMesh.receiveShadow = true;
    scene.add(terrainMesh);

    // MOTORABLE ROAD (Curving along the lower contour past Bidaliya Niwaas)
    const roadCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-45, 2.2, 20),
      new THREE.Vector3(-28, 2.9, 17),
      new THREE.Vector3(-14, 3.5, 15), // Bidaliya Niwaas
      new THREE.Vector3(4, 3.8, 16),
      new THREE.Vector3(24, 4.3, 21),
      new THREE.Vector3(45, 4.8, 26),
    ]);
    const roadGeo = new THREE.TubeGeometry(roadCurve, 70, 1.3, 8, false);
    const roadMat = new THREE.MeshStandardMaterial({
      color: 0x4a453f,
      roughness: 0.92,
    });
    const roadMesh = new THREE.Mesh(roadGeo, roadMat);
    roadMesh.receiveShadow = true;
    scene.add(roadMesh);

    // UPHILL WALKING FOOTPATH (From Bidaliya Niwaas up to Tandiyun Village)
    const trailGroup = new THREE.Group();
    trailGroupRef.current = trailGroup;
    scene.add(trailGroup);

    const trailCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-14, 4.1, 15),   // Start: Bidaliya Niwaas
      new THREE.Vector3(-7, 6.8, 9),     // Lower hillside ascent
      new THREE.Vector3(-1, 10.4, 3),    // Middle ridge slope
      new THREE.Vector3(5, 13.5, -4),    // Upper terrace approach
      new THREE.Vector3(12, 16.5, -12),  // Arrival: Tandiyun Village
    ]);

    const trailGeo = new THREE.TubeGeometry(trailCurve, 60, 0.38, 6, false);
    const trailMat = new THREE.MeshStandardMaterial({
      color: 0xa66f43,
      emissive: 0x8c5a32,
      emissiveIntensity: 0.45,
      roughness: 0.8,
    });
    const trailMesh = new THREE.Mesh(trailGeo, trailMat);
    trailGroup.add(trailMesh);

    // Glowing Trail Dashes (Points)
    const trailPoints = trailCurve.getPoints(90);
    const trailPointsGeo = new THREE.BufferGeometry().setFromPoints(trailPoints);
    const trailPointsMat = new THREE.PointsMaterial({
      color: 0xffe5b4,
      size: 0.9,
      transparent: true,
      opacity: 0.85,
    });
    const trailPointsMesh = new THREE.Points(trailPointsGeo, trailPointsMat);
    trailGroup.add(trailPointsMesh);

    // MARKER 1: BIDALIYA NIWAAS (Beside Road)
    const bidaliyaPos = new THREE.Vector3(-14, 4.4, 15);
    const bidaliyaGroup = new THREE.Group();
    bidaliyaGroup.position.copy(bidaliyaPos);

    const poleGeo = new THREE.CylinderGeometry(0.14, 0.14, 3.2, 12);
    poleGeo.translate(0, 1.6, 0);
    const poleMat = new THREE.MeshBasicMaterial({ color: 0xede5d5 });
    const poleMesh = new THREE.Mesh(poleGeo, poleMat);
    bidaliyaGroup.add(poleMesh);

    const pinHeadGeo = new THREE.SphereGeometry(0.85, 16, 16);
    pinHeadGeo.translate(0, 3.4, 0);
    const pinHeadMat = new THREE.MeshStandardMaterial({
      color: 0xa66f43,
      emissive: 0xa66f43,
      emissiveIntensity: 0.65,
      roughness: 0.3,
    });
    const pinHeadMesh = new THREE.Mesh(pinHeadGeo, pinHeadMat);
    bidaliyaGroup.add(pinHeadMesh);

    const ringGeo = new THREE.RingGeometry(1.3, 1.8, 24);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xa66f43,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.y = 0.1;
    bidaliyaGroup.add(ringMesh);

    // Roadside building replica
    const houseBaseGeo = new THREE.BoxGeometry(2.5, 1.9, 2.1);
    houseBaseGeo.translate(0, 0.95, -2);
    const houseMat = new THREE.MeshStandardMaterial({ color: 0xede5d5, roughness: 0.7 });
    const houseMesh = new THREE.Mesh(houseBaseGeo, houseMat);
    houseMesh.castShadow = true;
    bidaliyaGroup.add(houseMesh);

    const roofGeo = new THREE.ConeGeometry(2.3, 1.3, 4);
    roofGeo.rotateY(Math.PI / 4);
    roofGeo.translate(0, 2.5, -2);
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x5a544c, roughness: 0.5 });
    const roofMesh = new THREE.Mesh(roofGeo, roofMat);
    bidaliyaGroup.add(roofMesh);

    scene.add(bidaliyaGroup);

    // MARKER 2: TANDIYUN VILLAGE (On hillside above)
    const villagePos = new THREE.Vector3(12, 16.8, -12);
    const villageGroup = new THREE.Group();
    villageGroup.position.copy(villagePos);

    const vPoleGeo = new THREE.CylinderGeometry(0.14, 0.14, 4.6, 12);
    vPoleGeo.translate(0, 2.3, 0);
    const vPoleMesh = new THREE.Mesh(vPoleGeo, poleMat);
    villageGroup.add(vPoleMesh);

    const vPinHeadGeo = new THREE.SphereGeometry(1.25, 16, 16);
    vPinHeadGeo.translate(0, 5.0, 0);
    const vPinHeadMat = new THREE.MeshStandardMaterial({
      color: 0xd8e1d4,
      emissive: 0xd8e1d4,
      emissiveIntensity: 0.85,
      roughness: 0.2,
    });
    const vPinHeadMesh = new THREE.Mesh(vPinHeadGeo, vPinHeadMat);
    villageGroup.add(vPinHeadMesh);

    // Cluster of traditional stone slate houses
    const villageHouses = [
      { x: -3.0, z: -1.8, rot: 0.2 },
      { x: 1.8, z: -2.5, rot: -0.3 },
      { x: 3.5, z: 1.2, rot: 0.15 },
      { x: -1.2, z: 2.4, rot: -0.1 },
    ];
    villageHouses.forEach(h => {
      const vhBase = new THREE.BoxGeometry(2.3, 1.7, 1.9);
      vhBase.translate(h.x, 0.85, h.z);
      const vhMesh = new THREE.Mesh(vhBase, houseMat);
      vhMesh.castShadow = true;
      villageGroup.add(vhMesh);

      const vhRoof = new THREE.ConeGeometry(2.1, 1.1, 4);
      vhRoof.rotateY(Math.PI / 4 + h.rot);
      vhRoof.translate(h.x, 2.2, h.z);
      const vhRoofMesh = new THREE.Mesh(vhRoof, roofMat);
      villageGroup.add(vhRoofMesh);
    });

    scene.add(villageGroup);

    // MOUNTAIN FOREST CANOPIES (Oak & Pine Clusters)
    const treeGroup = new THREE.Group();
    const treeTrunkGeo = new THREE.CylinderGeometry(0.16, 0.26, 1.3, 6);
    const treeFoliageGeo = new THREE.ConeGeometry(1.5, 3.4, 7);
    const treeTrunkMat = new THREE.MeshStandardMaterial({ color: 0x4a2e1b });
    const treeFoliageMat = new THREE.MeshStandardMaterial({ color: 0x13352c, roughness: 0.9 });

    const treePositions = [
      { x: -28, z: 6 }, { x: -24, z: -3 }, { x: -20, z: -9 },
      { x: -6, z: -17 }, { x: -11, z: -24 }, { x: 3, z: -26 },
      { x: 20, z: -22 }, { x: 28, z: -14 }, { x: 24, z: 3 },
      { x: 17, z: 10 }, { x: -3, z: 24 }, { x: 14, z: 22 },
      { x: -34, z: 22 }, { x: 32, z: -27 }, { x: 0, z: -34 },
    ];

    treePositions.forEach(tp => {
      const baseSlope = ((-tp.z + 50) / 100) * 24;
      const ty = Math.max(1.8, baseSlope + Math.sin(tp.x * 0.075) * 3);

      const trunk = new THREE.Mesh(treeTrunkGeo, treeTrunkMat);
      trunk.position.set(tp.x, ty + 0.65, tp.z);
      trunk.castShadow = true;
      treeGroup.add(trunk);

      const foliage = new THREE.Mesh(treeFoliageGeo, treeFoliageMat);
      foliage.position.set(tp.x, ty + 2.5, tp.z);
      foliage.castShadow = true;
      treeGroup.add(foliage);
    });
    scene.add(treeGroup);

    // ANIMATION LOOP
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Pulsing effect on markers
      const scalePulse = 1 + Math.sin(elapsedTime * 3) * 0.14;
      pinHeadMesh.scale.set(scalePulse, scalePulse, scalePulse);
      vPinHeadMesh.scale.set(scalePulse, scalePulse, scalePulse);
      ringMesh.scale.set(1 + Math.sin(elapsedTime * 2) * 0.22, 1 + Math.sin(elapsedTime * 2) * 0.22, 1);

      if (trailPointsMat) {
        trailPointsMat.size = 0.8 + Math.sin(elapsedTime * 4) * 0.25;
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight || (isDedicatedPage ? 650 : 540);
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
  }, [isDedicatedPage]);

  // Sync touch controls for seamless mobile page scrolling
  useEffect(() => {
    if (controlsRef.current) {
      if (isTouchActive) {
        controlsRef.current.touches = {
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DOLLY_PAN,
        };
      } else {
        controlsRef.current.touches = {
          ONE: -1 as unknown as THREE.TOUCH,
          TWO: THREE.TOUCH.ROTATE,
        };
      }
    }
  }, [isTouchActive]);

  // CAMERA PRESETS
  const focusOn = (mode: 'overview' | 'bidaliya' | 'village') => {
    if (!controlsRef.current || !cameraRef.current) return;
    const controls = controlsRef.current;
    const camera = cameraRef.current;
    setActiveFocus(mode);

    if (mode === 'overview') {
      controls.target.set(0, 8, 0);
      camera.position.set(0, 36, 54);
      setSelectedMarker(null);
    } else if (mode === 'bidaliya') {
      controls.target.set(-14, 4.4, 15);
      camera.position.set(-22, 15, 32);
      setSelectedMarker('bidaliya');
    } else if (mode === 'village') {
      controls.target.set(12, 16.8, -12);
      camera.position.set(16, 28, 8);
      setSelectedMarker('village');
    }
    controls.update();
  };

  const toggleMist = () => {
    if (!sceneRef.current) return;
    if (mistEnabled) {
      sceneRef.current.fog = null;
    } else {
      sceneRef.current.fog = new THREE.FogExp2(0x0f2922, 0.011);
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
    <div className={`relative w-full rounded-2xl overflow-hidden border border-mist/20 bg-deepGreen-dark shadow-cinematic ${className}`}>
      {/* 3D Canvas Container */}
      <div
        ref={containerRef}
        className={`w-full ${isFullscreen ? 'fixed inset-0 z-50 h-screen' : isDedicatedPage ? 'h-[580px] sm:h-[660px]' : 'h-[500px] sm:h-[580px]'}`}
      />

      {/* Top Overlay: Prototype Notice & Badge */}
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 sm:gap-2 pointer-events-none z-10">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg bg-deepGreen-dark/90 backdrop-blur-md border border-mist/20 text-[11px] sm:text-xs font-mono text-mist shadow-lg pointer-events-auto">
          <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-earth-light animate-spin-slow shrink-0" />
          <span className="font-semibold text-ivory">Garhwal Hillside Topography</span>
          <span className="text-earth hidden xs:inline">•</span>
          <span className="text-mist/80 hidden xs:inline">Interactive 3D</span>
        </div>

        {/* Clear Conceptual Terrain Prototype Label */}
        <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-earth-dark/90 backdrop-blur-md border border-earth/40 text-[10px] sm:text-[11px] text-ivory/95 font-sans pointer-events-auto shadow-md">
          <AlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-earth-light shrink-0" />
          <span>{t.terrain.disclaimer}</span>
        </div>
      </div>

      {/* Interactive Legend & Marker Details Card */}
      <div className="absolute bottom-4 left-4 z-10 pointer-events-auto max-w-sm hidden md:block">
        <div className="bg-deepGreen-dark/95 backdrop-blur-md border border-mist/20 rounded-xl p-4 shadow-2xl space-y-3">
          <div className="text-[11px] uppercase tracking-wider text-mist/60 font-mono font-semibold">
            Key Geographical Markers
          </div>

          {/* Bidaliya Niwaas Marker */}
          <div
            onClick={() => focusOn('bidaliya')}
            className={`p-3 rounded-lg border transition-all cursor-pointer ${
              activeFocus === 'bidaliya'
                ? 'border-earth bg-earth/20'
                : 'border-mist/10 hover:border-mist/30 bg-forest/40'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-ivory flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-earth inline-block" />
                {t.terrain.bidaliyaTitle}
              </span>
              <span className="text-[10px] font-mono text-earth-light uppercase font-semibold">Road Level</span>
            </div>
            <p className="text-xs text-mist/85 mt-1 leading-relaxed font-serif">
              {t.terrain.bidaliyaDesc}
            </p>
            <div className="flex items-center justify-between text-[11px] font-mono text-mist/75 mt-1.5 pt-1.5 border-t border-mist/10">
              <span>{t.terrain.bidaliyaCoords}</span>
              <a
                href="https://www.google.com/maps/place/Bidaliya+Niwaas/@30.0022945,78.8331629,93m/data=!3m1!1e3!4m6!3m5!1s0x3909990045116f6b:0x65346244ae358083!8m2!3d30.0026375!4d78.8332031!16s%2Fg%2F11ygfr8b6d"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-earth-light hover:text-ivory inline-flex items-center gap-1"
                title="Google Maps Reference"
              >
                <span>Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Tandiyun Village Marker */}
          <div
            onClick={() => focusOn('village')}
            className={`p-3 rounded-lg border transition-all cursor-pointer ${
              activeFocus === 'village'
                ? 'border-mist bg-mist/20'
                : 'border-mist/10 hover:border-mist/30 bg-forest/40'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-ivory flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-mist inline-block" />
                {t.terrain.villageTitle}
              </span>
              <span className="text-[10px] font-mono text-mist uppercase font-semibold">Hillside Above</span>
            </div>
            <p className="text-xs text-mist/85 mt-1 leading-relaxed font-serif">
              {t.terrain.villageDesc}
            </p>
            <div className="text-[11px] font-mono text-earth-light mt-1.5 pt-1.5 border-t border-mist/10">
              {t.terrain.villageCoords}
            </div>
            <div className="text-[10px] text-mist/60 mt-1 font-sans italic">
              {t.terrain.provisionalNotice}
            </div>
          </div>

          {/* Walking Path Footnote */}
          <div className="pt-1 flex items-center gap-2 text-[11px] text-mist/85 font-mono">
            <Navigation className="w-3.5 h-3.5 text-earth-light" />
            <span>{t.terrain.uphillTrail}</span>
          </div>
        </div>
      </div>

      {/* Floating View Controls */}
      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 flex flex-wrap sm:flex-col items-end gap-1.5 sm:gap-2 pointer-events-auto">
        {/* Mobile 3D Touch Rotation Toggle */}
        <div className="sm:hidden flex items-center bg-deepGreen-dark/95 backdrop-blur-md p-1 rounded-xl border border-mist/20 shadow-xl">
          <button
            onClick={() => setIsTouchActive((prev) => !prev)}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
              isTouchActive
                ? 'bg-earth text-ivory font-bold shadow-md'
                : 'text-mist/90 hover:text-ivory'
            }`}
          >
            <RotateCw className="w-3 h-3" />
            <span>
              {isTouchActive
                ? (language === 'hi' ? 'स्क्रॉल पर लौटें' : 'Done')
                : (language === 'hi' ? '3D घुमाएं' : 'Rotate 3D')}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 bg-deepGreen-dark/95 backdrop-blur-md p-1 sm:p-1.5 rounded-xl border border-mist/20 shadow-xl">
          <button
            onClick={() => focusOn('overview')}
            className={`px-2.5 sm:px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
              activeFocus === 'overview' ? 'bg-earth text-ivory font-bold' : 'text-mist/80 hover:text-ivory'
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
            className={`px-2.5 sm:px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
              activeFocus === 'bidaliya' ? 'bg-earth text-ivory font-bold' : 'text-mist/80 hover:text-ivory'
            }`}
          >
            {t.terrain.controls.focusBidaliya}
          </button>

          <button
            onClick={() => focusOn('village')}
            className={`px-2.5 sm:px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
              activeFocus === 'village' ? 'bg-earth text-ivory font-bold' : 'text-mist/80 hover:text-ivory'
            }`}
          >
            {t.terrain.controls.focusVillage}
          </button>
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 bg-deepGreen-dark/95 backdrop-blur-md p-1 sm:p-1.5 rounded-xl border border-mist/20 shadow-xl">
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
              trailVisible ? 'border-earth text-ivory bg-earth/25' : 'border-mist/10 text-mist/60'
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
      <div className="absolute bottom-16 sm:bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none text-center w-full px-4">
        <span className="hidden sm:inline-block text-[11px] font-mono text-mist/70 bg-deepGreen-dark/80 px-3.5 py-1 rounded-full border border-mist/15 backdrop-blur-sm">
          Left Click + Drag: Rotate • Scroll: Zoom • Right Click: Pan
        </span>
        <span className="sm:hidden inline-block text-[10px] font-mono text-mist/85 bg-deepGreen-dark/90 px-3 py-1 rounded-full border border-mist/20 backdrop-blur-sm">
          {isTouchActive
            ? (language === 'hi' ? '1 उंगली से 3D घुमाएं • बाहर टैप करके स्क्रॉल करें' : '1 Finger: Rotate 3D • Tap Done to scroll page')
            : (language === 'hi' ? '2 उंगलियों से 3D घुमाएं या \'3D घुमाएं\' दबाएं' : '2 Fingers: Rotate 3D • Tap \'Rotate 3D\' to interact')}
        </span>
      </div>
    </div>
  );
};
