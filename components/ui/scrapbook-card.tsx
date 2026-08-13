'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Sparkles, Pin, Zap, Terminal, CornerDownRight } from 'lucide-react';

export function ScrapbookCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse 3D Parallax Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      style={{ perspective: 1200 }}
      className="relative flex items-center justify-center p-2 sm:p-6 w-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, rotate: -1.5 }}
        whileHover={{ scale: 1.03, rotate: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[490px] bg-[#121217] p-5 sm:p-6 rounded-3xl border border-white/20 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95),0_0_40px_rgba(66,133,244,0.18)] group cursor-pointer"
      >
        {/* 1. Translucent Frosted Washi Tape (Top Center) */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-36 h-8 bg-white/20 backdrop-blur-md border-t border-b border-white/40 shadow-lg rotate-[-2deg] z-30 pointer-events-none rounded-sm">
          <div className="w-full h-full opacity-30 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(255,255,255,0.4)_4px,rgba(255,255,255,0.4)_8px)]" />
        </div>

        {/* 2. Neon Gemini Corner Tape (Top Left) */}
        <div className="absolute -top-3.5 -left-3.5 w-20 h-6 bg-gradient-to-r from-[#4285F4]/70 to-[#8B5CF6]/70 backdrop-blur-sm border border-white/30 shadow-md -rotate-45 z-30 pointer-events-none rounded-sm" />

        {/* 3. Archival Photo Polaroid Frame with Subhadeep's Photo */}
        <div className="relative w-full aspect-[4/5] min-h-[380px] sm:min-h-[420px] rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shadow-inner group-hover:border-blue-500/40 transition-colors">
          <Image
            src="/images/subhadeep-profile.jpg"
            alt="Subhadeep Chell - Senior Software Engineer"
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            priority
            className="object-cover object-center filter contrast-[1.05] brightness-[0.98] group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Vignette & Subtle Film Grain Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

          {/* Photo Live Badge Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono-tech text-zinc-300 pointer-events-none">
            <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SUBHADEEP // IN THE ZONE
            </span>
            <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm text-[11px] text-zinc-300 border border-white/15">
              CKC • 2026
            </span>
          </div>
        </div>

        {/* 4. Scrapbook Bottom Caption & Handwritten Notes */}
        <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between font-mono-tech">
          <div>
            <h4 className="text-base font-semibold text-white tracking-tight flex items-center gap-2 font-serif-editorial">
              Subhadeep Chell
              <Sparkles className="w-3.5 h-3.5 text-amber-400 inline" />
            </h4>
            <p className="text-xs text-zinc-400 tracking-wide mt-0.5">
              Full-Stack Crafter & Passionate Designer
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-400 font-semibold tracking-wider">
              TCS
            </span>
          </div>
        </div>

        {/* 5. Floating Sticker 1: Holographic Rolling Stones Vibe Stamp */}
        <motion.div
          animate={{ y: [0, -4, 0], rotate: [6, 4, 6] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-4 -left-2 sm:-bottom-6 sm:-left-6 z-40 bg-zinc-950/95 backdrop-blur-xl border border-white/20 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-mono-tech text-white"
        >
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 text-xs">
            <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] sm:text-[11px] font-bold text-white leading-tight">FULLY CHARGED</span>
            <span className="text-[8px] sm:text-[9px] text-zinc-400">Zero Lag • 120fps</span>
          </div>
        </motion.div>

        {/* 6. Floating Sticker 2: Rotating Circular Specimen Stamp */}
        <div className="absolute -top-4 -right-2 sm:-top-7 sm:-right-7 z-40 w-16 h-16 sm:w-24 sm:h-24 pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
            className="w-full h-full relative flex items-center justify-center"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                id="stampPath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="none"
              />
              <text className="text-[9px] font-mono-tech tracking-[2.5px] uppercase fill-amber-300 font-bold">
                <textPath href="#stampPath" startOffset="0%">
                  • VERIFIED DEV • UNIQUE CODE DEV •
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 m-auto w-6 h-6 sm:w-9 sm:h-9 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
          </motion.div>
        </div>

        {/* 7. Floating Post-It Sticky Memo Tag */}
        <motion.div
          animate={{ y: [0, 3, 0], rotate: [-8, -6, -8] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -right-2 sm:-right-5 top-20 sm:top-24 z-30 hidden sm:flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-amber-200/95 text-zinc-950 shadow-xl border border-amber-300 font-mono-tech text-[10px] sm:text-[11px] font-medium"
        >
          <Pin className="w-3 h-3 text-rose-600 fill-rose-600 -rotate-45" />
          <span>Building at scale ⚡</span>
        </motion.div>

        {/* 8. Specimen Barcode Tag (Bottom Right) */}
        <div className="absolute -bottom-2 -right-1 sm:-bottom-3.5 sm:-right-2.5 bg-zinc-900/95 border border-white/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded text-[8px] sm:text-[9px] font-mono-tech text-zinc-400 shadow-md">
          REC-ID: SC//2026-HQ
        </div>
      </motion.div>
    </div>
  );
}
