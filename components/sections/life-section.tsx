'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  Camera,
  Heart,
  Sparkles,
  MapPin,
  X,
  ChevronLeft,
  ChevronRight,
  Grid,
  Maximize2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Film,
  Music,
  Sun,
} from 'lucide-react';
import { TextReveal } from '@/components/ui/text-reveal';

interface PhotoItem {
  id: string;
  image: string;
  oneliner: string;
  location: string;
  category: string;
  rotation: number;
}

const ALL_PHOTOS: PhotoItem[] = [
  {
    id: 'dinner-squad',
    image: '/images/life/life-dinner-squad.jpg',
    oneliner: 'Midnight dinner outings & endless banter 🌙🍛',
    location: 'Late Night Dinner • 2025',
    category: 'Friends',
    rotation: -2.5,
  },
  {
    id: 'cognizant-crew',
    image: '/images/life/life-cognizant-crew.jpg',
    oneliner: 'Cognizant cohort & corporate onboarding crew 💼🚀',
    location: 'Cognizant Campus • 2025',
    category: 'Work & Squad',
    rotation: 2.2,
  },
  {
    id: 'elevator-selfie',
    image: '/images/life/life-elevator-selfie.jpg',
    oneliner: 'Elevator selfies & everyday hostel chaos 🛗✌️',
    location: 'Hostel Block • 2024',
    category: 'Friends',
    rotation: -1.8,
  },
  {
    id: 'formals-trio',
    image: '/images/life/life-formals-trio.jpg',
    oneliner: 'Suited up for milestones & campus events 🎓👔',
    location: 'VIT Chennai • 2025',
    category: 'Milestones',
    rotation: 3,
  },
  {
    id: 'sunny-bros',
    image: '/images/life/life-sunny-bros.jpg',
    oneliner: 'Sunny campus days with the day-ones ☀️🕶️',
    location: 'Weekend Hangout • 2025',
    category: 'Friends',
    rotation: -3,
  },
  {
    id: 'ideapod-speaker',
    image: '/images/life/life-ideapod-speaker.jpg',
    oneliner: 'Taking the stage & mentoring young builders 🎤⚡',
    location: 'IdeaPod Hub • 2024',
    category: 'Speaking',
    rotation: 1.5,
  },
  {
    id: 'starbucks-coffee',
    image: '/images/life/life-starbucks-coffee.jpg',
    oneliner: 'Iced brews, mechanical keys & weekend sprints ☕💻',
    location: 'Starbucks CCU • 2025',
    category: 'Rituals',
    rotation: -2,
  },
  {
    id: 'metro-travel',
    image: '/images/life/life-metro-travel.jpg',
    oneliner: 'Transit beats & city commute rhythm 🚆🎧',
    location: 'Metro Station • 2025',
    category: 'Journeys',
    rotation: 2.8,
  },
  {
    id: 'evanke-portrait',
    image: '/images/life/life-evanke-portrait.jpg',
    oneliner: 'Late-night architecture & design reflections 🖤📐',
    location: 'Design Studio • 2024',
    category: 'Portraits',
    rotation: -1.2,
  },
  {
    id: 'studio-portrait',
    image: '/images/life/life-studio-portrait.jpg',
    oneliner: 'Building with endless curiosity & ambition ✨🎯',
    location: 'Studio Session • 2025',
    category: 'Portraits',
    rotation: 2.1,
  },
  {
    id: 'family-roots',
    image: '/images/subhadeep-contact.jpg',
    oneliner: 'Hometown roots & the circle that grounds me 🏡❤️',
    location: 'West Bengal • Home',
    category: 'Roots',
    rotation: -2.7,
  },
];

// Curated 3 Flagship Spotlight Photos for the Section Background Preview
const PREVIEW_BACKGROUND_PHOTOS: PhotoItem[] = [
  ALL_PHOTOS[5], // IdeaPod Speaker (Mentorship & Stage)
  ALL_PHOTOS[8], // Evanke Studio (B&W Design & Reflection)
  ALL_PHOTOS[0], // Dinner Squad (Friends & Nightlife)
];

export function LifeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [modalCarouselIndex, setModalCarouselIndex] = useState(0);
  const [isCarouselAutoplay, setIsCarouselAutoplay] = useState(true);
  const [hoveredPhotoId, setHoveredPhotoId] = useState<string | null>(null);
  const [fullscreenPhoto, setFullscreenPhoto] = useState<PhotoItem | null>(null);

  // Fruitful Song of Life Audio Engine State
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isUserExplicitlyPaused, setIsUserExplicitlyPaused] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const intervalBeatRef = useRef<NodeJS.Timeout | null>(null);
  const chordOscsRef = useRef<{ osc: OscillatorNode; gain: GainNode }[]>([]);
  const isStartedRef = useRef(false);

  // 1. Background Preview Carousel Auto-Slide (Cycles through 3 Flagship Photos)
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePreviewIndex((prev) => (prev + 1) % PREVIEW_BACKGROUND_PHOTOS.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  // 2. Modal Carousel Auto-Slide
  useEffect(() => {
    if (!isGalleryOpen || viewMode !== 'carousel' || !isCarouselAutoplay) return;

    const timer = setInterval(() => {
      setModalCarouselIndex((prev) => (prev + 1) % ALL_PHOTOS.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isGalleryOpen, viewMode, isCarouselAutoplay]);

  // 3. "Fruitful Song of Life" Audio Synthesizer (Uplifting, acoustic, joyful, and melodic)
  const startFruitfulMusic = () => {
    if (isUserExplicitlyPaused) return;

    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (!isStartedRef.current) {
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.14, ctx.currentTime + 1.2);
        masterGain.connect(ctx.destination);
        masterGainRef.current = masterGain;

        // Warm Analog Filter
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(750, ctx.currentTime);
        filter.connect(masterGain);

        // Chord Progressions of Life (C major -> G major -> A minor -> F major)
        const chords = [
          [130.81, 196.0, 261.63, 329.63], // C major (C3, G3, C4, E4)
          [98.0, 146.83, 196.0, 246.94],   // G major (G2, D3, G3, B3)
          [110.0, 164.81, 220.0, 261.63],  // A minor (A2, E3, A3, C4)
          [87.31, 130.81, 174.61, 220.0],  // F major (F2, C3, F3, A3)
        ];

        // Fruitful Joyful Melody Arpeggio Notes (Major pentatonic sparkles)
        const melodyRuns = [
          [523.25, 659.25, 783.99, 1046.5, 783.99, 659.25], // C5, E5, G5, C6, G5, E5
          [392.0, 493.88, 587.33, 783.99, 587.33, 493.88],  // G4, B4, D5, G5, D5, B4
          [440.0, 523.25, 659.25, 880.0, 659.25, 523.25],   // A4, C5, E5, A5, E5, C5
          [349.23, 440.0, 523.25, 698.46, 523.25, 440.0],   // F4, A4, C5, F5, C5, A4
        ];

        // Sustained Warm Pad Layer
        const padOscs: { osc: OscillatorNode; gain: GainNode }[] = [];
        chords[0].forEach((freq) => {
          const osc = ctx.createOscillator();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          osc.detune.setValueAtTime((Math.random() - 0.5) * 6, ctx.currentTime);

          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.04, ctx.currentTime);
          osc.connect(gain);
          gain.connect(filter);
          osc.start();
          padOscs.push({ osc, gain });
        });
        chordOscsRef.current = padOscs;

        // Rhythmic Fruitful Acoustic Melody Plucks & Beat
        let bar = 0;
        let step = 0;

        intervalBeatRef.current = setInterval(() => {
          if (!audioCtxRef.current || audioCtxRef.current.state === 'suspended') return;
          const currentCtx = audioCtxRef.current;
          const now = currentCtx.currentTime;

          const currentChordIdx = Math.floor(bar) % chords.length;
          const currentMelody = melodyRuns[currentChordIdx];

          // 1. Warm Acoustic Bass Root Note on Beat 0
          if (step === 0) {
            const rootFreq = chords[currentChordIdx][0];
            const bassOsc = currentCtx.createOscillator();
            const bassGain = currentCtx.createGain();

            bassOsc.type = 'sine';
            bassOsc.frequency.setValueAtTime(rootFreq, now);

            bassGain.gain.setValueAtTime(0.12, now);
            bassGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

            bassOsc.connect(bassGain);
            bassGain.connect(masterGain);
            bassOsc.start(now);
            bassOsc.stop(now + 1.3);

            // Shift sustained pad chord gently to current bar
            chords[currentChordIdx].forEach((targetFreq, idx) => {
              if (padOscs[idx]) {
                padOscs[idx].osc.frequency.setTargetAtTime(targetFreq, now, 0.4);
              }
            });
          }

          // 2. Fruitful Sparkling Kalimba / Bell Pluck on every 16th beat
          const noteFreq = currentMelody[step % currentMelody.length];
          const pluckOsc = currentCtx.createOscillator();
          const pluckGain = currentCtx.createGain();

          pluckOsc.type = 'sine';
          pluckOsc.frequency.setValueAtTime(noteFreq, now);

          pluckGain.gain.setValueAtTime(0.001, now);
          pluckGain.gain.exponentialRampToValueAtTime(0.08, now + 0.02);
          pluckGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

          pluckOsc.connect(pluckGain);
          pluckGain.connect(masterGain);

          pluckOsc.start(now);
          pluckOsc.stop(now + 0.7);

          step = (step + 1) % 6;
          if (step === 0) bar += 1;
        }, 320); // Joyful tempo ~94 BPM

        isStartedRef.current = true;
      } else if (masterGainRef.current) {
        masterGainRef.current.gain.setTargetAtTime(0.14, ctx.currentTime, 0.4);
      }

      setIsPlayingMusic(true);
    } catch (err) {
      console.warn('Audio auto-start waiting for interaction:', err);
    }
  };

  const pauseFruitfulMusic = () => {
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.4);
    }
    setIsPlayingMusic(false);
    setIsUserExplicitlyPaused(true);
  };

  const resumeFruitfulMusic = () => {
    setIsUserExplicitlyPaused(false);
    startFruitfulMusic();
  };

  // 4. Auto-Start on Viewport Scroll / Page Gesture
  useEffect(() => {
    const handleFirstGesture = () => {
      if (!isUserExplicitlyPaused) {
        startFruitfulMusic();
      }
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('scroll', handleFirstGesture);
    };

    window.addEventListener('click', handleFirstGesture, { passive: true });
    window.addEventListener('touchstart', handleFirstGesture, { passive: true });
    window.addEventListener('scroll', handleFirstGesture, { passive: true });

    if (sectionRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isUserExplicitlyPaused) {
            startFruitfulMusic();
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(sectionRef.current);
      return () => {
        observer.disconnect();
        window.removeEventListener('click', handleFirstGesture);
        window.removeEventListener('touchstart', handleFirstGesture);
        window.removeEventListener('scroll', handleFirstGesture);
      };
    }
  }, [isUserExplicitlyPaused]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (intervalBeatRef.current) clearInterval(intervalBeatRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const currentPreviewPhoto = PREVIEW_BACKGROUND_PHOTOS[activePreviewIndex];
  const activeModalPhoto = ALL_PHOTOS[modalCarouselIndex];

  return (
    <section
      ref={sectionRef}
      id="life"
      className="relative min-h-[90vh] lg:min-h-screen flex flex-col justify-between py-24 sm:py-32 px-6 sm:px-12 text-white overflow-hidden select-none border-t border-white/10"
    >
      {/* 1. Full-Bleed 3-Photo Spotlight Background Preview */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPreviewPhoto.id}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={currentPreviewPhoto.image}
              alt={currentPreviewPhoto.oneliner}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center filter brightness-[0.42] contrast-[1.12] saturate-[1.1]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Fruitful Ambient Warmth & Contrast Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/65 to-[#050508]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,#050508_95%)]" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-amber-500/15 via-rose-500/10 to-emerald-500/15 rounded-full blur-[180px] pointer-events-none" />
      </div>

      {/* 2. Top Header Status & Fruitful Song of Life Music Control */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-mono-tech text-zinc-300 uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-zinc-950/85 border border-white/15 backdrop-blur-xl shadow-lg w-fit">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
          <span>BEYOND THE CODEBASE</span>
        </div>

        {/* Fruitful Song of Life Controller */}
        <div className="flex items-center gap-3">
          <button
            onClick={isPlayingMusic ? pauseFruitfulMusic : resumeFruitfulMusic}
            className={`px-3.5 py-1.5 rounded-full border text-xs font-mono-tech flex items-center gap-2 backdrop-blur-xl transition-all cursor-pointer shadow-lg ${isPlayingMusic
              ? 'bg-amber-950/80 text-amber-300 border-amber-500/50 shadow-[0_0_20px_rgba(251,188,5,0.25)]'
              : 'bg-zinc-950/80 text-zinc-400 hover:text-white border-white/15'
              }`}
            title={isPlayingMusic ? 'Click to Pause Song of Life' : 'Click to Resume Song of Life'}
          >
            {isPlayingMusic ? (
              <>
                <div className="flex items-center gap-0.5 h-3">
                  <span className="w-0.5 bg-amber-400 animate-pulse h-3" />
                  <span className="w-0.5 bg-emerald-400 animate-pulse h-2" style={{ animationDelay: '0.15s' }} />
                  <span className="w-0.5 bg-rose-400 animate-pulse h-3.5" style={{ animationDelay: '0.3s' }} />
                  <span className="w-0.5 bg-amber-400 animate-pulse h-1.5" style={{ animationDelay: '0.45s' }} />
                </div>
                <span className="font-semibold text-amber-200">MUSIC</span>
                <Pause className="w-3.5 h-3.5 text-amber-400 ml-1" />
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
                <span>MUSIC PAUSED (CLICK TO RESUME)</span>
              </>
            )}
          </button>

          {/* <div className="hidden sm:flex items-center gap-2 text-xs font-mono-tech text-zinc-300 px-3.5 py-1.5 rounded-full bg-zinc-950/80 border border-white/15 backdrop-blur-xl w-fit">
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span>
              PREVIEW [{String(activePreviewIndex + 1).padStart(2, '0')} //{' '}
              {String(PREVIEW_BACKGROUND_PHOTOS.length).padStart(2, '0')}]
            </span>
          </div> */}
        </div>
      </div>

      {/* 3. Central Narrative & Action Launchpad */}
      <div className="relative z-10 max-w-6xl mx-auto w-full my-auto py-8">
        <div className="max-w-4xl space-y-6">
          <TextReveal
            text="My Life, Unplugged."
            as="h2"
            className="text-4xl sm:text-6xl lg:text-7xl font-bold font-serif-editorial text-white tracking-tight leading-[1.05]"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-xl text-zinc-300 font-light leading-relaxed max-w-3xl"
          >
            Software is what I craft, but stories, connections, and shared laughter are what I live for.
            Here is a glimpse into the people, friend circles, mentorship workshops, and everyday adventures that
            keep me inspired.
          </motion.p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => {
                setViewMode('carousel');
                setIsGalleryOpen(true);
                startFruitfulMusic();
              }}
              className="px-6 sm:px-8 py-4 rounded-2xl bg-white hover:bg-zinc-100 text-black font-bold text-sm font-mono-tech flex items-center gap-2.5 shadow-[0_10px_35px_rgba(255,255,255,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
            >
              <Film className="w-4 h-4 text-black group-hover:rotate-6 transition-transform" />
              <span>Moments</span>
            </button>

            <button
              onClick={() => {
                setViewMode('grid');
                setIsGalleryOpen(true);
                startFruitfulMusic();
              }}
              className="px-5 py-4 rounded-2xl bg-zinc-950/80 hover:bg-zinc-900 border border-white/20 text-white font-medium text-xs font-mono-tech flex items-center gap-2 backdrop-blur-xl shadow-lg transition-colors cursor-pointer"
            >
              <Grid className="w-3.5 h-3.5 text-cyan-400" />
              <span>Gallery</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Bottom 3-Photo Slide Indicators */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/15 pt-6 text-xs font-mono-tech text-zinc-400">
        <div className="flex items-center gap-2">
          {PREVIEW_BACKGROUND_PHOTOS.map((photo, idx) => (
            <button
              key={photo.id}
              onClick={() => setActivePreviewIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${activePreviewIndex === idx
                ? 'w-10 bg-gradient-to-r from-amber-400 via-rose-500 to-emerald-400'
                : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              aria-label={`Preview Slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3 text-zinc-400 text-[11px]">
          <span>CLICK EXPLORE</span>
          <span>•</span>
          <span className="text-zinc-300">VIEW THE MOMENTS</span>
        </div>
      </div>

      {/* 5. Interactive Full Memoir Modal (Film Carousel & Mosaic Wall) */}
      <AnimatePresence>
        {isGalleryOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl overflow-y-auto">
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsGalleryOpen(false)}
              className="absolute inset-0 cursor-pointer"
            />

            {/* Gallery Board */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0a0a10] border border-white/20 p-5 sm:p-8 shadow-[0_30px_100px_rgba(0,0,0,0.95)] z-10 my-auto text-left"
            >
              {/* Joyful Color Header Strip */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853]" />

              {/* Close Button */}
              <button
                onClick={() => setIsGalleryOpen(false)}
                className="absolute top-5 right-5 p-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/15 text-zinc-400 hover:text-white transition-colors z-30 shadow-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Gallery Header & Mode Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pr-12">
                <div>
                  <div className="inline-flex items-center gap-2 text-[10px] font-mono-tech text-amber-300 uppercase tracking-widest px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-2">
                    <Sparkles className="w-3 h-3" />
                    <span>MEMOIR ARCHIVE // {ALL_PHOTOS.length} POLAROIDS</span>
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-bold font-serif-editorial text-white tracking-tight">
                    Subhadeep's Life in Snapshots
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Pause-Only Music Pill inside Modal */}
                  <button
                    onClick={isPlayingMusic ? pauseFruitfulMusic : resumeFruitfulMusic}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-mono-tech flex items-center gap-1.5 transition-all cursor-pointer ${isPlayingMusic
                      ? 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border-white/10'
                      }`}
                  >
                    {isPlayingMusic ? (
                      <>
                        <Pause className="w-3.5 h-3.5 text-amber-400" />
                        <span>Pause Music</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Resume Music</span>
                      </>
                    )}
                  </button>

                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-900 border border-white/10">
                    <button
                      onClick={() => setViewMode('carousel')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech flex items-center gap-1.5 transition-all cursor-pointer ${viewMode === 'carousel'
                        ? 'bg-white text-black font-bold shadow-md'
                        : 'text-zinc-400 hover:text-white'
                        }`}
                    >
                      <Film className="w-3.5 h-3.5" />
                      <span>Film Carousel</span>
                    </button>
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech flex items-center gap-1.5 transition-all cursor-pointer ${viewMode === 'grid'
                        ? 'bg-white text-black font-bold shadow-md'
                        : 'text-zinc-400 hover:text-white'
                        }`}
                    >
                      <Grid className="w-3.5 h-3.5" />
                      <span>Mosaic Wall ({ALL_PHOTOS.length})</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* --- MODE 1: AUTOPLAY FILM CAROUSEL --- */}
              {viewMode === 'carousel' && (
                <div className="flex flex-col items-center justify-center py-2">
                  {/* Big Spotlight Carousel Card */}
                  <div className="relative w-full max-w-3xl aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden bg-zinc-950 border border-white/20 shadow-2xl group">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeModalPhoto.id}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 w-full h-full"
                      >
                        <Image
                          src={activeModalPhoto.image}
                          alt={activeModalPhoto.oneliner}
                          fill
                          sizes="(max-width: 1024px) 100vw, 800px"
                          className="object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />
                      </motion.div>
                    </AnimatePresence>

                    {/* Category pill */}
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-mono-tech text-amber-300 shadow-lg">
                      {activeModalPhoto.category}
                    </span>

                    {/* Fullscreen icon */}
                    <button
                      onClick={() => setFullscreenPhoto(activeModalPhoto)}
                      className="absolute top-4 right-4 p-2.5 rounded-full bg-black/70 hover:bg-black text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer"
                      title="Open Fullscreen"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>

                    {/* Navigation Arrows */}
                    <button
                      onClick={() =>
                        setModalCarouselIndex(
                          (prev) => (prev - 1 + ALL_PHOTOS.length) % ALL_PHOTOS.length
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white backdrop-blur-md transition-all hover:scale-110 active:scale-90 cursor-pointer"
                      aria-label="Previous Photo"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() =>
                        setModalCarouselIndex((prev) => (prev + 1) % ALL_PHOTOS.length)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white backdrop-blur-md transition-all hover:scale-110 active:scale-90 cursor-pointer"
                      aria-label="Next Photo"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Bottom Caption Overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                      <div className="space-y-1">
                        <p className="text-base sm:text-xl font-bold font-sans text-white tracking-tight drop-shadow-md">
                          {activeModalPhoto.oneliner}
                        </p>
                        <span className="text-xs font-mono-tech text-zinc-300 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-rose-400" />
                          <span>{activeModalPhoto.location}</span>
                        </span>
                      </div>

                      {/* Autoplay Pause / Play Control */}
                      <button
                        onClick={() => setIsCarouselAutoplay(!isCarouselAutoplay)}
                        className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono-tech text-white flex items-center gap-1.5 backdrop-blur-md transition-colors shrink-0 cursor-pointer"
                      >
                        {isCarouselAutoplay ? (
                          <>
                            <Pause className="w-3.5 h-3.5 text-amber-400" />
                            <span>Pause Carousel</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Play Carousel</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Filmstrip Thumbnail Row */}
                  <div className="flex items-center gap-2 mt-4 overflow-x-auto w-full max-w-3xl py-2 px-1 no-scrollbar">
                    {ALL_PHOTOS.map((photo, idx) => {
                      const isActive = modalCarouselIndex === idx;
                      return (
                        <button
                          key={photo.id}
                          onClick={() => setModalCarouselIndex(idx)}
                          className={`relative w-16 sm:w-20 aspect-[4/3] rounded-xl overflow-hidden border shrink-0 transition-all cursor-pointer ${isActive
                            ? 'border-blue-500 scale-105 ring-2 ring-blue-500/40'
                            : 'border-white/10 opacity-50 hover:opacity-100'
                            }`}
                        >
                          <Image
                            src={photo.image}
                            alt={photo.oneliner}
                            fill
                            className="object-cover object-center"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* --- MODE 2: MOSAIC PHOTO WALL WITH TOOLTIPS ON HOVER (KEPT INTACT) --- */}
              {viewMode === 'grid' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 py-2">
                  {ALL_PHOTOS.map((item) => (
                    <div
                      key={item.id}
                      onMouseEnter={() => setHoveredPhotoId(item.id)}
                      onMouseLeave={() => setHoveredPhotoId(null)}
                      onClick={() => setFullscreenPhoto(item)}
                      className="relative group cursor-pointer aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-950 border border-white/15 hover:border-amber-500/50 hover:shadow-[0_15px_35px_rgba(251,188,5,0.25)] transition-all duration-300"
                    >
                      <Image
                        src={item.image}
                        alt={item.oneliner}
                        fill
                        sizes="(max-width: 768px) 50vw, 250px"
                        className="object-cover object-center filter contrast-[1.05] group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Dark Vignette Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                      {/* Category badge */}
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/15 text-[9px] font-mono-tech text-amber-300">
                        {item.category}
                      </span>

                      {/* Witty Oneliner Tooltip on Hover / Touch */}
                      <div className="absolute bottom-0 inset-x-0 p-3 flex flex-col justify-end transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <p className="text-xs font-bold font-sans text-white tracking-tight leading-snug drop-shadow-md">
                          {item.oneliner}
                        </p>
                        <span className="text-[9px] font-mono-tech text-zinc-400 mt-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MapPin className="w-2.5 h-2.5 text-rose-400" />
                          <span className="truncate">{item.location}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. Fullscreen Single Photo Modal */}
      <AnimatePresence>
        {fullscreenPhoto && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFullscreenPhoto(null)}
              className="absolute inset-0 cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="relative max-w-3xl w-full rounded-3xl bg-[#0e0e14] border border-white/20 p-4 sm:p-6 shadow-2xl z-10 text-center overflow-hidden"
            >
              <button
                onClick={() => setFullscreenPhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/20 text-white z-20 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-black mb-4">
                <Image
                  src={fullscreenPhoto.image}
                  alt={fullscreenPhoto.oneliner}
                  fill
                  className="object-contain object-center"
                />
              </div>

              <div className="px-2">
                <p className="text-base sm:text-lg font-bold font-sans text-white mb-1">
                  {fullscreenPhoto.oneliner}
                </p>
                <span className="text-xs font-mono-tech text-zinc-400">
                  {fullscreenPhoto.location}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
