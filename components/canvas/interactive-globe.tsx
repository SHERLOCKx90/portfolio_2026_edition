'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Heart, MapPin, Sparkles, Compass, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export interface PreferredLocation {
  name: string;
  lat: number;
  lon: number;
  code: string;
  tagline: string;
  whyLove: string;
  color: string;
}

export const PREFERRED_WORK_LOCATIONS: PreferredLocation[] = [
  {
    name: 'Durgapur',
    lat: 23.5204,
    lon: 87.3119,
    code: 'DGP',
    tagline: 'Hometown Roots & Industrial Tech Hub',
    whyLove: 'Home ground with close family ties and rapid regional tech expansion.',
    color: '#EA4335',
  },
  {
    name: 'Kolkata',
    lat: 22.5726,
    lon: 88.3639,
    code: 'CCU',
    tagline: 'Culture, AI Hubs & Innovation Base',
    whyLove: 'Primary base, vibrant developer community, and thriving tech ecosystem.',
    color: '#34A853',
  },
  {
    name: 'Bengaluru',
    lat: 12.9716,
    lon: 77.5946,
    code: 'BLR',
    tagline: 'Silicon Valley of India & Unicorn Capital',
    whyLove: 'High-density tech innovation, top-tier engineering talent, and cutting-edge startups.',
    color: '#4285F4',
  },
  {
    name: 'Hyderabad',
    lat: 17.385,
    lon: 78.4867,
    code: 'HYD',
    tagline: 'HITEC City & Cloud Mega-Centers',
    whyLove: 'Massive engineering campuses, incredible infrastructure, and enterprise cloud growth.',
    color: '#FBBC05',
  },
  {
    name: 'Chennai',
    lat: 13.0827,
    lon: 80.2707,
    code: 'MAA',
    tagline: 'VIT Alma Mater & Enterprise SaaS Coast',
    whyLove: 'My alma mater roots, rich corporate network, and global SaaS powerhouse.',
    color: '#8B5CF6',
  },
  {
    name: 'Mumbai',
    lat: 19.076,
    lon: 72.8777,
    code: 'BOM',
    tagline: 'FinTech, Media & Fast-Paced Metropolis',
    whyLove: 'High-velocity corporate headquarters, fintech disruptions, and immense scale.',
    color: '#EC4899',
  },
  {
    name: 'Bhubaneswar',
    lat: 20.2961,
    lon: 85.8245,
    code: 'BBI',
    tagline: 'Emerging IT Corridor & Smart City Hub',
    whyLove: 'Fast-emerging Eastern technology center with world-class tech parks and green living.',
    color: '#06B6D4',
  },
];

interface LoveParticle {
  id: number;
  emoji: string;
  x: number;
  y: number;
}

function latLongToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

export function InteractiveGlobe({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedHub, setSelectedHub] = useState<PreferredLocation>(PREFERRED_WORK_LOCATIONS[1]); // Kolkata default
  const [isZoomedIn, setIsZoomedIn] = useState<boolean>(false);
  const [loveCount, setLoveCount] = useState<number>(28);
  const [particles, setParticles] = useState<LoveParticle[]>([]);

  // External controller refs for Three.js scene
  const sceneControlRef = useRef<{
    focusLocation: (hub: PreferredLocation, zoom: boolean) => void;
    resetZoom: () => void;
  } | null>(null);

  // Trigger floating love emojis on click
  const triggerLoveReaction = (e?: React.MouseEvent) => {
    setLoveCount((prev) => prev + 1);

    const emojis = ['❤️', '💖', '✨', '🔥', '😍', '💫', '🎉', '🌸'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    let clientX = 150;
    let clientY = 180;

    if (e && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      clientX = e.clientX - rect.left;
      clientY = e.clientY - rect.top;
    }

    const newParticle: LoveParticle = {
      id: Date.now() + Math.random(),
      emoji: randomEmoji,
      x: clientX + (Math.random() * 40 - 20),
      y: clientY + (Math.random() * 20 - 10),
    };

    setParticles((prev) => [...prev.slice(-15), newParticle]);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 1400);
  };

  const handleSelectLocation = (hub: PreferredLocation, e: React.MouseEvent) => {
    setSelectedHub(hub);
    setIsZoomedIn(true);
    triggerLoveReaction(e);

    if (sceneControlRef.current) {
      sceneControlRef.current.focusLocation(hub, true);
    }
  };

  const handleToggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isZoomedIn) {
      setIsZoomedIn(false);
      if (sceneControlRef.current) sceneControlRef.current.resetZoom();
    } else {
      setIsZoomedIn(true);
      if (sceneControlRef.current) sceneControlRef.current.focusLocation(selectedHub, true);
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 450;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    const DEFAULT_CAMERA_Z = 6.2;
    const ZOOMED_CAMERA_Z = 4.4;
    camera.position.z = DEFAULT_CAMERA_Z;
    let targetCameraZ = DEFAULT_CAMERA_Z;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const GLOBE_RADIUS = 2.2;

    // 2. Fibonacci Point Cloud Sphere Grid
    const dotCount = 1900;
    const positions = new Float32Array(dotCount * 3);
    const colors = new Float32Array(dotCount * 3);

    const primaryColor = new THREE.Color('#4285F4'); // Gemini Blue
    const emeraldColor = new THREE.Color('#34A853'); // Gemini Green
    const amberColor = new THREE.Color('#FBBC05');   // Gemini Amber
    const roseColor = new THREE.Color('#EA4335');    // Gemini Red
    const zincColor = new THREE.Color('#3f3f46');    // Slate

    for (let i = 0; i < dotCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / dotCount);
      const theta = Math.sqrt(dotCount * Math.PI) * phi;

      const x = GLOBE_RADIUS * Math.cos(theta) * Math.sin(phi);
      const y = GLOBE_RADIUS * Math.sin(theta) * Math.sin(phi);
      const z = GLOBE_RADIUS * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const rand = Math.random();
      let c = zincColor;
      if (rand > 0.88) c = primaryColor;
      else if (rand > 0.78) c = emeraldColor;
      else if (rand > 0.7) c = amberColor;
      else if (rand > 0.65) c = roseColor;

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const dotGeometry = new THREE.BufferGeometry();
    dotGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    dotGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const dotMaterial = new THREE.PointsMaterial({
      size: 0.042,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    });

    const dotCloud = new THREE.Points(dotGeometry, dotMaterial);
    globeGroup.add(dotCloud);

    // 3. Dark Inner Core Sphere
    const innerGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 0.98, 36, 36);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x06060a,
      transparent: true,
      opacity: 0.94,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    globeGroup.add(innerSphere);

    // Subtle atmospheric ring
    const ringGeo = new THREE.RingGeometry(GLOBE_RADIUS + 0.02, GLOBE_RADIUS + 0.04, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x34a853,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
    });
    const equatorRing = new THREE.Mesh(ringGeo, ringMat);
    equatorRing.rotation.x = Math.PI / 2;
    globeGroup.add(equatorRing);

    // 4. City Beacons & Pins for the 7 Preferred Hubs
    const waveMeshes: THREE.Mesh[] = [];
    const photonParticles: { mesh: THREE.Mesh; curve: THREE.QuadraticBezierCurve3; progress: number; speed: number }[] = [];

    PREFERRED_WORK_LOCATIONS.forEach((hub) => {
      const hubPos = latLongToVector3(hub.lat, hub.lon, GLOBE_RADIUS);
      const hubColor = new THREE.Color(hub.color);

      // Inner Glowing Pin Sphere
      const pinGeo = new THREE.SphereGeometry(0.065, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({ color: hubColor });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(hubPos);
      globeGroup.add(pinMesh);

      // Pulsing Wave Ring
      const waveGeo = new THREE.RingGeometry(0.07, 0.15, 24);
      const waveMat = new THREE.MeshBasicMaterial({
        color: hubColor,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
      });
      const waveMesh = new THREE.Mesh(waveGeo, waveMat);
      waveMesh.position.copy(hubPos);
      waveMesh.lookAt(new THREE.Vector3(0, 0, 0));
      globeGroup.add(waveMesh);
      waveMeshes.push(waveMesh);

      // Stalk Indicator
      const stalkGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.28, 8);
      const stalkMat = new THREE.MeshBasicMaterial({ color: hubColor });
      const stalk = new THREE.Mesh(stalkGeo, stalkMat);
      stalk.position.copy(hubPos.clone().multiplyScalar(1.05));
      stalk.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), hubPos.clone().normalize());
      globeGroup.add(stalk);
    });

    // 5. Interconnecting Radiant Arcs between Preferred Hubs
    const arcConnections = [
      [0, 1], // Durgapur <-> Kolkata
      [1, 6], // Kolkata <-> Bhubaneswar
      [1, 2], // Kolkata <-> Bengaluru
      [1, 3], // Kolkata <-> Hyderabad
      [2, 4], // Bengaluru <-> Chennai
      [2, 5], // Bengaluru <-> Mumbai
      [3, 4], // Hyderabad <-> Chennai
      [3, 5], // Hyderabad <-> Mumbai
    ];

    arcConnections.forEach(([fromIdx, toIdx], arcIdx) => {
      const fromHub = PREFERRED_WORK_LOCATIONS[fromIdx];
      const toHub = PREFERRED_WORK_LOCATIONS[toIdx];

      const fromPos = latLongToVector3(fromHub.lat, fromHub.lon, GLOBE_RADIUS);
      const toPos = latLongToVector3(toHub.lat, toHub.lon, GLOBE_RADIUS);

      const midPoint = new THREE.Vector3().addVectors(fromPos, toPos).multiplyScalar(0.5);
      const distance = fromPos.distanceTo(toPos);
      const midLength = midPoint.length();
      midPoint.normalize();
      midPoint.multiplyScalar(midLength + distance * 0.28);

      const curve = new THREE.QuadraticBezierCurve3(fromPos, midPoint, toPos);
      const curvePoints = curve.getPoints(40);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);

      const arcMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(fromHub.color),
        transparent: true,
        opacity: 0.5,
        linewidth: 1.5,
      });

      const arcLine = new THREE.Line(curveGeo, arcMat);
      globeGroup.add(arcLine);

      // Moving Photon Pulse on Arc
      const photonGeo = new THREE.SphereGeometry(0.03, 8, 8);
      const photonMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const photonMesh = new THREE.Mesh(photonGeo, photonMat);
      globeGroup.add(photonMesh);

      photonParticles.push({
        mesh: photonMesh,
        curve,
        progress: (arcIdx * 0.15) % 1,
        speed: 0.006 + Math.random() * 0.003,
      });
    });

    // 6. Initial Orientation - Oriented towards Indian subcontinent
    globeGroup.rotation.x = 0.38;
    globeGroup.rotation.y = -1.45;

    let targetRotationY = globeGroup.rotation.y;
    let targetRotationX = globeGroup.rotation.x;
    let autoRotate = true;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    // Function to calculate exact focus angle for a selected city
    const focusLocation = (hub: PreferredLocation, zoom: boolean) => {
      // Calculate target rotation to face city directly to the camera
      const targetLonRad = (hub.lon * Math.PI) / 180;
      const targetLatRad = (hub.lat * Math.PI) / 180;

      targetRotationY = -targetLonRad - Math.PI / 2 + 0.15;
      targetRotationX = targetLatRad * 0.45;
      targetCameraZ = zoom ? ZOOMED_CAMERA_Z : DEFAULT_CAMERA_Z;
      autoRotate = false;

      // Resume auto rotation after 4s
      setTimeout(() => {
        autoRotate = true;
      }, 4000);
    };

    const resetZoom = () => {
      targetCameraZ = DEFAULT_CAMERA_Z;
      targetRotationX = 0.38;
      targetRotationY = -1.45;
      autoRotate = true;
    };

    sceneControlRef.current = {
      focusLocation,
      resetZoom,
    };

    // 7. Scroll-Driven Dynamic Rotation (Spins during page scroll, then slows down smoothly)
    let lastScrollY = window.scrollY;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;

      // Dynamic rotation spin proportional to scroll velocity
      targetRotationY += scrollDelta * 0.0028;
      lastScrollY = currentScrollY;

      // When actively scrolling, pause auto-rotation to prioritize user scroll motion
      autoRotate = false;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        autoRotate = true;
      }, 1500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 8. Interactive Drag & Momentum Physics
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      autoRotate = false;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - previousMousePosition.x;
      const deltaY = clientY - previousMousePosition.y;

      targetRotationY += deltaX * 0.006;
      targetRotationX += deltaY * 0.006;
      targetRotationX = Math.max(-1.2, Math.min(1.2, targetRotationX));

      previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
      setTimeout(() => {
        autoRotate = true;
      }, 3500);
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // 9. IntersectionObserver to avoid background CPU load
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // 10. Animation Render Loop (Optimized 60fps)
    let animationFrameId: number;
    let waveScale = 1;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      // Smooth camera zoom interpolation
      camera.position.z += (targetCameraZ - camera.position.z) * 0.06;

      // Inertial damping on rotation
      globeGroup.rotation.y += (targetRotationY - globeGroup.rotation.y) * 0.08;
      globeGroup.rotation.x += (targetRotationX - globeGroup.rotation.x) * 0.08;

      // Gentle continuous auto-rotation in background
      if (autoRotate && !isDragging) {
        targetRotationY += 0.0012;
      }

      // Animate Waves on all 7 cities
      waveScale += 0.02;
      if (waveScale > 2.6) waveScale = 1;
      waveMeshes.forEach((mesh) => {
        mesh.scale.set(waveScale, waveScale, waveScale);
        (mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - waveScale / 2.6);
      });

      // Animate Photons along inter-city network
      photonParticles.forEach((photon) => {
        photon.progress += photon.speed;
        if (photon.progress > 1) photon.progress = 0;
        const currentPoint = photon.curve.getPoint(photon.progress);
        photon.mesh.position.copy(currentPoint);
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || 500;
      const newHeight = container.clientHeight || 450;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className || ''}`}>
      {/* 3D Canvas Viewport with click love reaction */}
      <div
        ref={containerRef}
        onClick={(e) => triggerLoveReaction(e)}
        className="w-full aspect-square max-w-[480px] h-[360px] sm:h-[420px] cursor-grab active:cursor-grabbing relative z-10"
      />

      {/* Floating Love Emojis Container */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 1, scale: 0.6, y: 0 }}
              animate={{ opacity: 0, scale: 1.9, y: -95, x: (Math.random() - 0.5) * 45 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              style={{ left: p.x, top: p.y }}
              className="absolute text-2xl drop-shadow-[0_5px_15px_rgba(234,67,53,0.6)]"
            >
              {p.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Love Reaction Counter & Interactive Hub Quick-Pills */}
      <div className="w-full relative z-20 space-y-3 pt-2">
        {/* City Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 px-2">
          {PREFERRED_WORK_LOCATIONS.map((hub) => {
            const isSelected = selectedHub.name === hub.name;
            return (
              <button
                key={hub.code}
                onClick={(e) => handleSelectLocation(hub, e)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono-tech transition-all flex items-center gap-1 cursor-pointer ${
                  isSelected
                    ? 'bg-white text-black font-bold shadow-lg scale-105'
                    : 'bg-zinc-900/90 text-zinc-400 hover:text-white border border-white/10 hover:border-white/25'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: hub.color }} />
                <span>{hub.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Hub Detail HUD with Love Heart Button & Zoom Controls */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-950/85 border border-white/15 backdrop-blur-xl text-xs font-mono-tech shadow-2xl">
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => triggerLoveReaction(e)}
              aria-label="Send Love Reaction"
              className="p-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-400 hover:scale-110 active:scale-90 transition-transform cursor-pointer flex items-center gap-1.5"
            >
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
              <span className="text-[10px] font-bold text-rose-300">{loveCount}</span>
            </button>

            <div className="flex flex-col text-left">
              <span className="text-white font-bold text-sm flex items-center gap-1.5">
                {selectedHub.name.toUpperCase()}
                <span
                  className="text-[9px] px-1.5 py-0.2 rounded font-normal"
                  style={{ backgroundColor: `${selectedHub.color}25`, color: selectedHub.color }}
                >
                  {selectedHub.code}
                </span>
              </span>
              <span className="text-[10px] text-zinc-400 font-light truncate max-w-[190px] sm:max-w-xs">
                {selectedHub.tagline}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom Toggle Button */}
            <button
              onClick={handleToggleZoom}
              aria-label="Toggle Zoom"
              className={`p-2 rounded-xl border transition-all flex items-center gap-1 text-[10px] font-mono-tech cursor-pointer ${
                isZoomedIn
                  ? 'bg-blue-500/20 text-blue-300 border-blue-500/40 shadow-md'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border-white/10'
              }`}
            >
              {isZoomedIn ? (
                <>
                  <ZoomOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">RESET</span>
                </>
              ) : (
                <>
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">ZOOM</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
