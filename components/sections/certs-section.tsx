'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Award,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  X,
  Zap,
  Shield,
  Star,
  Flame,
  Layers,
  Cpu,
  Volume2,
} from 'lucide-react';
import { TextReveal } from '@/components/ui/text-reveal';

interface HallOfFameAchievement {
  id: string;
  title: string;
  subtitle: string;
  issuer: string;
  year: string;
  tier: 'MYTHIC' | 'LEGENDARY' | 'EPIC' | 'MASTER' | 'DIAMOND' | 'PLATINUM';
  tierColor: string;
  glowColor: string;
  xpPoints: number;
  credentialId: string;
  verifyUrl: string;
  pixelIcon: 'trophy' | 'cloud' | 'shield' | 'database' | 'code' | 'grad' | 'terminal';
  description: string;
  buffs: string[];
  rarityPercent: string;
}

const ACHIEVEMENTS: HallOfFameAchievement[] = [
  {
    id: 'gcp-digital-leader',
    title: 'Cloud Digital Leader',
    subtitle: 'Google Cloud Certified Professional',
    issuer: 'Google Cloud',
    year: '2023',
    tier: 'LEGENDARY',
    tierColor: '#4285F4',
    glowColor: 'rgba(66, 133, 244, 0.45)',
    xpPoints: 1200,
    credentialId: 'GCP-CDL-2023',
    verifyUrl: 'https://cloud.google.com/certification',
    pixelIcon: 'cloud',
    description: 'Validated enterprise mastery over Google Cloud compute, storage paradigms, VPC networks, and data analytics architectures.',
    buffs: ['+45% Cloud Architecture SLA', 'GCP Ecosystem Mastery', 'Enterprise Security'],
    rarityPercent: 'Top 4.8% of Engineers',
  },
  {
    id: 'ieee-researcher',
    title: 'IEEE Published Author',
    subtitle: 'Real-Time Threat Detection & API Security',
    issuer: 'IEEE ICEECT 2024',
    year: '2024',
    tier: 'MYTHIC',
    tierColor: '#EA4335',
    glowColor: 'rgba(234, 67, 53, 0.45)',
    xpPoints: 2000,
    credentialId: '10.1109/ICEECT61413.2024.10651811',
    verifyUrl: 'https://ieeexplore.ieee.org',
    pixelIcon: 'shield',
    description: 'Conducted empirical peer-reviewed research on sub-4.2ms reverse-proxy threat mitigation for enterprise microservice APIs.',
    buffs: ['Sub-4.2ms Threat Inspection', '99.4% Precision Score', 'OWASP Top 10 API Security'],
    rarityPercent: 'Top 1.2% Peer Reviewed',
  },
  {
    id: 'gcp-foundations',
    title: 'Cloud Foundations',
    subtitle: 'Infrastructure & Security Fundamentals',
    issuer: 'Google Cloud',
    year: '2023',
    tier: 'EPIC',
    tierColor: '#FBBC05',
    glowColor: 'rgba(251, 188, 5, 0.45)',
    xpPoints: 850,
    credentialId: 'GCP-FND-2023',
    verifyUrl: 'https://cloud.google.com',
    pixelIcon: 'terminal',
    description: 'Foundational certification covering IAM role topologies, Cloud Storage lifecycle buckets, and Kubernetes deployment mechanics.',
    buffs: ['IAM Least-Privilege Rules', 'Compute Engine Ops', 'Container Basics'],
    rarityPercent: 'Standard Cloud Fleet',
  },
  {
    id: 'vit-academics',
    title: 'B.Tech in CSE',
    subtitle: 'Vellore Institute of Technology',
    issuer: 'VIT Chennai',
    year: '2020 — 2024',
    tier: 'DIAMOND',
    tierColor: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.45)',
    xpPoints: 1800,
    credentialId: 'VITC-CSE-2024',
    verifyUrl: 'https://chennai.vit.ac.in',
    pixelIcon: 'grad',
    description: 'Graduated with deep academic foundations in Data Structures, Distributed Algorithms, Database Management, and Network Protocols.',
    buffs: ['Core Algorithm Mastery', 'Distributed Systems Math', 'Academic Honors'],
    rarityPercent: 'Top Tier CSE Cohort',
  },
  {
    id: 'spring-boot-pro',
    title: 'Spring Boot Architect',
    subtitle: 'Reactive Microservices & REST APIs',
    issuer: 'Java Enterprise Ecosystem',
    year: '2025',
    tier: 'MASTER',
    tierColor: '#06B6D4',
    glowColor: 'rgba(6, 182, 212, 0.45)',
    xpPoints: 1350,
    credentialId: 'JAVA-SPRING-2025',
    verifyUrl: 'https://spring.io',
    pixelIcon: 'database',
    description: 'Architected high-throughput Spring Boot REST APIs with HikariCP connection pooling, JWT security interceptors, and Redis caching.',
    buffs: ['Sub-15ms P99 Latency', 'HikariCP Optimizations', 'Redis Cache Invalidation'],
    rarityPercent: 'Top 5% Backend Architects',
  },
  {
    id: 'aws-dynamodb',
    title: 'AWS NoSQL Specialist',
    subtitle: 'DynamoDB GSIs & Partition Modeling',
    issuer: 'Amazon Web Services',
    year: '2025',
    tier: 'LEGENDARY',
    tierColor: '#F97316',
    glowColor: 'rgba(249, 115, 22, 0.45)',
    xpPoints: 1400,
    credentialId: 'AWS-DDB-2025',
    verifyUrl: 'https://aws.amazon.com/dynamodb',
    pixelIcon: 'database',
    description: 'Engineered single-table NoSQL designs, secondary global indices (GSIs), and DynamoDB Streams for real-time state sync.',
    buffs: ['Single-Table NoSQL Design', 'GSI Query Sharding', 'DynamoDB Streams'],
    rarityPercent: 'Top 3.5% Cloud Architects',
  },
];

// --- 8-Bit Retro Pixel Sound Engine ---
function playPixelClickSound() {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextClass();

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;

    // 8-bit Square Wave Oscillator (NES/GameBoy Chip Style)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';

    // Ascending 8-bit Arcade Power-up Chime (D5 -> A5 -> D6 -> A6)
    osc.frequency.setValueAtTime(587.33, now);
    osc.frequency.setValueAtTime(880.0, now + 0.035);
    osc.frequency.setValueAtTime(1174.66, now + 0.075);
    osc.frequency.setValueAtTime(1760.0, now + 0.12);

    // Snappy 8-Bit Envelope
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.setValueAtTime(0.12, now + 0.14);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.23);
  } catch (err) {
    console.warn('Pixel sound playback error:', err);
  }
}

function playPixelCloseSound() {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextClass();

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(880.0, now);
    osc.frequency.setValueAtTime(440.0, now + 0.04);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.13);
  } catch (err) {
    console.warn('Pixel close sound error:', err);
  }
}

// 8-Bit Pixelated SVG Glyphs
function PixelGlyph({ type, color }: { type: string; color: string }) {
  switch (type) {
    case 'trophy':
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill={color}>
          <path d="M4 2h16v4h-2v4h-2v2h-2v2h-4v-2H8v-2H6V6H4V2zm2 2v2h2V4H6zm12 0h-2v2h2V4zM9 16h6v2h2v4H7v-4h2v-2zm-1 4h8v-2H8v2z" />
        </svg>
      );
    case 'cloud':
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill={color}>
          <path d="M8 6h8v2h2v2h2v4h-2v2H6v-2H4v-4h2v-2h2V6zm2 2v2h4V8h-4z" />
        </svg>
      );
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill={color}>
          <path d="M3 2h18v4h-2v6h-2v4h-2v4h-2v2h-2v-2H9v-4H7v-4H5V6H3V2zm4 4v6h2v4h2v2h2v-2h2v-4h2V6H7z" />
        </svg>
      );
    case 'database':
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill={color}>
          <path d="M4 2h16v4H4V2zm0 6h16v4H4V8zm0 6h16v4H4v-4zm0 6h16v2H4v-2zM6 4h2v1H6V4zm0 6h2v1H6v-1zm0 6h2v1H6v-1z" />
        </svg>
      );
    case 'code':
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill={color}>
          <path d="M8 5H6v2H4v2H2v6h2v2h2v2h2v-2H6v-2H4V9h2V7h2V5zm8 0h2v2h2v2h2v6h-2v2h-2v2h-2v-2h2v-2h2V9h-2V7h-2V5zm-4 2h2v10h-2V7z" />
        </svg>
      );
    case 'grad':
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill={color}>
          <path d="M12 2L1 7l11 5 9-4.09V17h2V7L12 2zm-7 9.18V17c0 3.31 3.13 6 7 6s7-2.69 7-6v-5.82l-7 3.18-7-3.18z" />
        </svg>
      );
    case 'terminal':
    default:
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill={color}>
          <path d="M2 3h20v18H2V3zm2 2v14h16V5H4zm2 2h2v2H6V7zm2 2h2v2H8V9zm-2 2h2v2H6v-2zm8 4h6v2h-6v-2z" />
        </svg>
      );
  }
}

// Hexagonal Pixelated Trophy Card
function HexagonalBadge({
  item,
  onClick,
}: {
  item: HallOfFameAchievement;
  onClick: () => void;
}) {
  return (
    <div
      onClick={() => {
        playPixelClickSound();
        onClick();
      }}
      className="relative w-[210px] sm:w-[230px] h-[250px] sm:h-[270px] cursor-pointer group shrink-0 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 select-none"
    >
      {/* SVG Hexagonal Frame & Border */}
      <svg
        viewBox="0 0 200 230"
        className="absolute inset-0 w-full h-full transition-all duration-300 pointer-events-none"
      >
        {/* Outer Glowing Hexagon Stroke on Hover */}
        <polygon
          points="100,6 192,58 192,172 100,224 8,172 8,58"
          fill="#0c0c14"
          stroke={item.tierColor}
          strokeWidth="2.5"
          className="transition-all duration-300 group-hover:stroke-[3.5]"
        />

        {/* Inner Subtle Circuit Bevel Line */}
        <polygon
          points="100,16 182,63 182,167 100,214 18,167 18,63"
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Top Metallic Crown Accent */}
        <polygon
          points="100,6 140,29 60,29"
          fill={item.tierColor}
          opacity="0.25"
        />
      </svg>

      {/* Hexagon Inner Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        {/* Tier Micro-Chip */}
        <span
          className="text-[9px] font-mono-tech font-bold tracking-widest px-2 py-0.5 rounded-full border mb-3 uppercase"
          style={{
            color: item.tierColor,
            borderColor: `${item.tierColor}40`,
            backgroundColor: `${item.tierColor}15`,
          }}
        >
          {item.tier}
        </span>

        {/* 8-Bit Pixel Glyph Container */}
        <div
          className="w-14 h-14 rounded-2xl bg-zinc-950 border flex items-center justify-center mb-2 shadow-inner transition-transform duration-300 group-hover:scale-110"
          style={{
            borderColor: `${item.tierColor}50`,
            boxShadow: `0 0 15px ${item.glowColor}`,
          }}
        >
          <PixelGlyph type={item.pixelIcon} color={item.tierColor} />
        </div>

        {/* Title & XP */}
        <h4 className="text-xs sm:text-sm font-bold font-sans text-white tracking-tight leading-tight line-clamp-2 mb-1 px-1">
          {item.title}
        </h4>
        <p className="text-[10px] text-zinc-400 font-light line-clamp-1 mb-2">
          {item.issuer}
        </p>

        {/* XP Points Ribbon */}
        <div className="text-[10px] font-mono-tech text-amber-400 font-bold flex items-center gap-1">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span>+{item.xpPoints} XP</span>
        </div>
      </div>
    </div>
  );
}

export function CertsSection() {
  const [selectedAchievement, setSelectedAchievement] = useState<HallOfFameAchievement | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        playPixelCloseSound();
        setSelectedAchievement(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenAchievement = (item: HallOfFameAchievement) => {
    playPixelClickSound();
    setSelectedAchievement(item);
  };

  const handleCloseAchievement = () => {
    playPixelCloseSound();
    setSelectedAchievement(null);
  };

  // Double the items for seamless infinite marquee loop
  const marqueeList = [...ACHIEVEMENTS, ...ACHIEVEMENTS];

  return (
    <section
      id="certifications"
      className="relative py-28 px-0 bg-[#060609] text-white border-t border-white/10 overflow-hidden select-none"
    >
      {/* Background Subtle Cyber Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-[#4285F4]/10 via-[#FBBC05]/10 to-[#EA4335]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-12 relative z-10 mb-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono-tech text-zinc-400 uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FBBC05] animate-pulse" />
              <span>// HALL OF FAME • TROPHY VAULT</span>
            </div>
            <TextReveal
              text="XP Gained & Levels Cleared."
              as="h2"
              className="text-4xl sm:text-6xl font-bold font-serif-editorial text-white tracking-tight"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono-tech text-amber-300 backdrop-blur-md">
              <Volume2 className="w-3.5 h-3.5" />
              <span>8-BIT RETRO SFX ACTIVE</span>
            </div> */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 text-xs font-mono-tech text-zinc-400 backdrop-blur-md">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>{ACHIEVEMENTS.length} TROPHIES (100%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Endless Hexagonal Badge Marquee Carousel */}
      <div
        className="relative w-full overflow-hidden py-8 border-y border-white/8 bg-black/40 backdrop-blur-md group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left & Right Edge Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-[#060609] via-[#060609]/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-[#060609] via-[#060609]/80 to-transparent z-20 pointer-events-none" />

        <div
          className={`flex gap-6 sm:gap-8 w-max animate-marquee items-center ${isPaused ? '[animation-play-state:paused]' : ''
            }`}
          style={{ animationDuration: '32s' }}
        >
          {marqueeList.map((item, index) => (
            <HexagonalBadge
              key={`${item.id}-${index}`}
              item={item}
              onClick={() => handleOpenAchievement(item)}
            />
          ))}
        </div>
      </div>

      {/* Gamified Achievement Trophy Modal (Play Store / Steam Arcade Style) */}
      <AnimatePresence>
        {selectedAchievement && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl">
            {/* Modal Backdrop Click */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseAchievement}
              className="absolute inset-0 cursor-pointer"
            />

            {/* Arcade Achievement Card Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl rounded-3xl bg-[#0d0d14] border p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.9)] z-10 my-auto text-left"
              style={{
                borderColor: `${selectedAchievement.tierColor}40`,
                boxShadow: `0 0 50px ${selectedAchievement.glowColor}`,
              }}
            >
              {/* Top Accent Light Bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                style={{ backgroundColor: selectedAchievement.tierColor }}
              />

              {/* Close Button */}
              <button
                onClick={handleCloseAchievement}
                className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/15 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header: Achievement Unlocked Badge */}
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: selectedAchievement.tierColor }} />
                <span
                  className="text-[10px] font-mono-tech font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border"
                  style={{
                    color: selectedAchievement.tierColor,
                    borderColor: `${selectedAchievement.tierColor}40`,
                    backgroundColor: `${selectedAchievement.tierColor}15`,
                  }}
                >
                  ACHIEVEMENT UNLOCKED • {selectedAchievement.tier} TIER
                </span>
                <span className="text-[10px] font-mono-tech text-zinc-400 ml-auto mr-8">
                  {selectedAchievement.year}
                </span>
              </div>

              {/* Central Trophy Presentation */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
                {/* Glowing Pixel Icon Vault */}
                <div
                  className="w-24 h-24 rounded-3xl bg-black border-2 flex items-center justify-center shrink-0 shadow-2xl relative group"
                  style={{
                    borderColor: selectedAchievement.tierColor,
                    boxShadow: `0 0 30px ${selectedAchievement.glowColor}`,
                  }}
                >
                  <PixelGlyph type={selectedAchievement.pixelIcon} color={selectedAchievement.tierColor} />
                  <div className="absolute -bottom-2 px-2 py-0.5 rounded-full bg-zinc-900 border border-white/20 text-[9px] font-mono-tech text-amber-300 font-bold flex items-center gap-1 shadow-md">
                    <Star className="w-2.5 h-2.5 fill-amber-300" />
                    <span>+{selectedAchievement.xpPoints} XP</span>
                  </div>
                </div>

                {/* Title & Issuer Info */}
                <div className="text-center sm:text-left space-y-1.5 flex-1">
                  <h3 className="text-2xl font-bold font-serif-editorial text-white tracking-tight">
                    {selectedAchievement.title}
                  </h3>
                  <p className="text-sm text-zinc-300 font-medium">
                    {selectedAchievement.subtitle}
                  </p>
                  <p className="text-xs text-zinc-400 font-light flex items-center justify-center sm:justify-start gap-1.5 pt-1">
                    <Award className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Issued by {selectedAchievement.issuer}</span>
                  </p>
                </div>
              </div>

              {/* Description Card */}
              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/10 mb-6 shadow-inner">
                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                  {selectedAchievement.description}
                </p>
              </div>

              {/* Unlocked Skill Buffs (Gamified Stat Perks) */}
              <div className="space-y-2 mb-6">
                <div className="text-[10px] font-mono-tech text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span>UNLOCKED STAT PERKS & BUFFS</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedAchievement.buffs.map((buff, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono-tech px-3 py-1 rounded-xl bg-zinc-900/90 border border-white/10 text-white flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>{buff}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Footer: Rarity & Verify Action */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4 text-xs font-mono-tech">
                <div className="flex items-center gap-1.5 text-zinc-400 text-[11px]">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  <span>RARITY: <strong className="text-white">{selectedAchievement.rarityPercent}</strong></span>
                </div>

                <a
                  href={selectedAchievement.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playPixelClickSound}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 shadow-md"
                >
                  <span>Verify Credential</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
