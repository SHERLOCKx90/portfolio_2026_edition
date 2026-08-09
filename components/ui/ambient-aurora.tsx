'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function AmbientAurora() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      {/* --- HERO / TOP SECTION AURORA PATCHES --- */}
      {/* Gemini Electric Blue Orb (Top Left / Center) */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.15, 0.95, 1],
          opacity: [0.18, 0.28, 0.16, 0.18],
        }}
        transition={{
          repeat: Infinity,
          duration: 18,
          ease: 'easeInOut',
        }}
        className="absolute -top-24 left-1/4 w-[500px] h-[500px] rounded-full bg-[#4285F4] blur-[150px] mix-blend-screen opacity-20"
      />

      {/* Gemini Crimson / Coral Red Orb (Top Right) */}
      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.9, 1.12, 1],
          opacity: [0.15, 0.24, 0.12, 0.15],
        }}
        transition={{
          repeat: Infinity,
          duration: 22,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute top-12 -right-20 w-[460px] h-[460px] rounded-full bg-[#EA4335] blur-[160px] mix-blend-screen opacity-15"
      />

      {/* Gemini Solar Yellow / Amber Orb (Center Hero Accent) */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 30, 0],
          scale: [0.9, 1.1, 0.85, 0.9],
          opacity: [0.10, 0.18, 0.08, 0.10],
        }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: 'easeInOut',
          delay: 4,
        }}
        className="absolute top-96 left-1/3 w-[380px] h-[380px] rounded-full bg-[#FBBC05] blur-[150px] mix-blend-screen opacity-10"
      />

      {/* --- MID-PAGE / ABOUT & PROJECTS SECTION AURORA PATCHES --- */}
      {/* Gemini Cyber Emerald Green Orb (Mid Left / About) */}
      <motion.div
        animate={{
          x: [0, 35, -40, 0],
          y: [0, 50, -25, 0],
          scale: [1, 1.18, 0.92, 1],
          opacity: [0.12, 0.22, 0.10, 0.12],
        }}
        transition={{
          repeat: Infinity,
          duration: 24,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute top-[1200px] -left-28 w-[520px] h-[520px] rounded-full bg-[#34A853] blur-[160px] mix-blend-screen opacity-15"
      />

      {/* Gemini Ethereal Violet / Indigo Orb (Mid Right / Projects) */}
      <motion.div
        animate={{
          x: [0, -45, 25, 0],
          y: [0, -35, 45, 0],
          scale: [0.95, 1.1, 0.9, 0.95],
          opacity: [0.14, 0.25, 0.12, 0.14],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: 'easeInOut',
          delay: 3,
        }}
        className="absolute top-[1800px] -right-24 w-[480px] h-[480px] rounded-full bg-[#8B5CF6] blur-[150px] mix-blend-screen opacity-15"
      />

      {/* --- LOWER PAGE / STACK & TIMELINE PATCHES --- */}
      {/* Gemini Electric Blue + Coral Conic Blend (Stack Section) */}
      <motion.div
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.08, 0.95, 1],
          opacity: [0.12, 0.20, 0.10, 0.12],
        }}
        transition={{
          repeat: Infinity,
          duration: 35,
          ease: 'linear',
        }}
        className="absolute top-[2600px] left-1/4 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#4285F4]/30 via-[#EA4335]/20 to-[#FBBC05]/20 blur-[170px] mix-blend-screen opacity-15"
      />

      {/* Gemini Emerald + Amber Patch (Experience Timeline) */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -30, 40, 0],
          opacity: [0.10, 0.18, 0.08, 0.10],
        }}
        transition={{
          repeat: Infinity,
          duration: 26,
          ease: 'easeInOut',
          delay: 5,
        }}
        className="absolute top-[3400px] right-1/4 w-[450px] h-[450px] rounded-full bg-gradient-to-br from-[#34A853]/25 via-[#FBBC05]/20 to-transparent blur-[160px] mix-blend-screen opacity-12"
      />

      {/* --- BOTTOM SECTION / CONTACT & FOOTER AURORA --- */}
      {/* Deep Gemini 4-Color Ambient Core (Contact Area) */}
      <motion.div
        animate={{
          scale: [1, 1.2, 0.9, 1],
          opacity: [0.15, 0.28, 0.14, 0.15],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: 'easeInOut',
        }}
        className="absolute bottom-16 left-1/3 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-[#4285F4]/30 via-[#EA4335]/20 via-[#FBBC05]/20 to-[#34A853]/25 blur-[180px] mix-blend-screen opacity-20"
      />
    </div>
  );
}
