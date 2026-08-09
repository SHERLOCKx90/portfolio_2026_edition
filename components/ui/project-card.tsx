'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Sparkles, Terminal, Layers, ExternalLink, Cpu } from 'lucide-react';
import { Project } from '@/types';
import { GithubIcon } from '@/components/ui/icons';

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
  onSelect: (project: Project) => void;
}

// Chromatic identity mapping for each project
const CHROMATIC_THEMES: Record<
  string,
  {
    primary: string;
    borderGlow: string;
    shadowGlow: string;
    pillBg: string;
    pillBorder: string;
    pillText: string;
    metricColor: string;
    spotlight: string;
  }
> = {
  'repair-os': {
    primary: '#4285F4', // Gemini Electric Blue
    borderGlow: 'hover:border-blue-500/60',
    shadowGlow: 'hover:shadow-[0_25px_65px_-15px_rgba(66,133,244,0.35)]',
    pillBg: 'group-hover:bg-blue-500/15',
    pillBorder: 'group-hover:border-blue-500/40',
    pillText: 'group-hover:text-blue-300',
    metricColor: 'group-hover:text-blue-400',
    spotlight: 'rgba(66, 133, 244, 0.12)',
  },
  'brand-flow': {
    primary: '#FBBC05', // Gemini Solar Amber
    borderGlow: 'hover:border-amber-500/60',
    shadowGlow: 'hover:shadow-[0_25px_65px_-15px_rgba(251,188,5,0.35)]',
    pillBg: 'group-hover:bg-amber-500/15',
    pillBorder: 'group-hover:border-amber-500/40',
    pillText: 'group-hover:text-amber-300',
    metricColor: 'group-hover:text-amber-400',
    spotlight: 'rgba(251, 188, 5, 0.12)',
  },
  'globo-ai': {
    primary: '#34A853', // Gemini Cyber Green
    borderGlow: 'hover:border-emerald-500/60',
    shadowGlow: 'hover:shadow-[0_25px_65px_-15px_rgba(52,168,83,0.35)]',
    pillBg: 'group-hover:bg-emerald-500/15',
    pillBorder: 'group-hover:border-emerald-500/40',
    pillText: 'group-hover:text-emerald-300',
    metricColor: 'group-hover:text-emerald-400',
    spotlight: 'rgba(52, 168, 83, 0.12)',
  },
  'query-lens-ai': {
    primary: '#8B5CF6', // Gemini Violet / Purple
    borderGlow: 'hover:border-purple-500/60',
    shadowGlow: 'hover:shadow-[0_25px_65px_-15px_rgba(139,92,246,0.35)]',
    pillBg: 'group-hover:bg-purple-500/15',
    pillBorder: 'group-hover:border-purple-500/40',
    pillText: 'group-hover:text-purple-300',
    metricColor: 'group-hover:text-purple-400',
    spotlight: 'rgba(139, 92, 246, 0.12)',
  },
  'portfolio-2026': {
    primary: '#38BDF8', // Starlight Cyan
    borderGlow: 'hover:border-sky-500/60',
    shadowGlow: 'hover:shadow-[0_25px_65px_-15px_rgba(56,189,248,0.35)]',
    pillBg: 'group-hover:bg-sky-500/15',
    pillBorder: 'group-hover:border-sky-500/40',
    pillText: 'group-hover:text-sky-300',
    metricColor: 'group-hover:text-sky-400',
    spotlight: 'rgba(56, 189, 248, 0.12)',
  },
};

const DEFAULT_THEME = {
  primary: '#4285F4',
  borderGlow: 'hover:border-blue-500/60',
  shadowGlow: 'hover:shadow-[0_25px_65px_-15px_rgba(66,133,244,0.35)]',
  pillBg: 'group-hover:bg-blue-500/15',
  pillBorder: 'group-hover:border-blue-500/40',
  pillText: 'group-hover:text-blue-300',
  metricColor: 'group-hover:text-blue-400',
  spotlight: 'rgba(66, 133, 244, 0.12)',
};

export function ProjectCard({ project, index, total, onSelect }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Dynamic Interactive Cursor Spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 25 });

  const theme = CHROMATIC_THEMES[project.id] || DEFAULT_THEME;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const formattedIndex = String(index + 1).padStart(2, '0');
  const formattedTotal = String(total).padStart(2, '0');

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(project)}
      className={`group relative h-full flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-[#0d0d12]/90 border border-white/10 ${theme.borderGlow} ${theme.shadowGlow} transition-all duration-500 ease-out cursor-pointer overflow-hidden backdrop-blur-xl`}
    >
      {/* 1. Hardware-Accelerated Dynamic Cursor Spotlight (Only pops on hover) */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(550px circle at ${springX}px ${springY}px, ${theme.spotlight}, transparent 60%)`,
        }}
      />

      {/* 2. Top Precision Telemetry Bar */}
      <div className="relative z-10 flex items-center justify-between gap-4 mb-6 border-b border-white/8 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="text-[11px] font-mono-tech text-zinc-400 group-hover:text-white transition-colors font-medium">
            [{formattedIndex} // {formattedTotal}]
          </span>
          <span
            className={`text-[10px] font-mono-tech uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 ${theme.pillBg} ${theme.pillBorder} ${theme.pillText} transition-all duration-300`}
          >
            {project.category}
          </span>
        </div>

        {/* Live Architecture Status Pill */}
        <div className="flex items-center gap-2 text-[10px] font-mono-tech text-zinc-400 group-hover:text-zinc-200 transition-colors">
          <span className="relative flex h-2 w-2">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: theme.primary }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ backgroundColor: theme.primary }}
            />
          </span>
          <span className="hidden sm:inline">PROD READY</span>
        </div>
      </div>

      {/* 3. Architectural Preview & Live HUD Viewport */}
      <div className="relative z-10 rounded-2xl overflow-hidden aspect-[16/9] mb-6 border border-white/10 group-hover:border-white/20 transition-colors bg-zinc-950">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover filter contrast-[1.05] brightness-[0.88] group-hover:brightness-100 group-hover:scale-[1.04] transition-all duration-700 ease-out"
        />

        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-500" />

        {/* Top HUD Blueprint Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono-tech text-zinc-300 pointer-events-none">
          <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/15 flex items-center gap-1.5 shadow-md">
            <Terminal className="w-3 h-3 text-cyan-400" />
            <span>SYS//ARCH-V15</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/15 text-zinc-400">
            LATENCY: &lt;15ms
          </span>
        </div>

        {/* Bottom Interactive Hover Prompt */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <span className="px-3 py-1 rounded-full bg-white text-black font-mono-tech text-[10px] font-bold flex items-center gap-1 shadow-2xl">
            INSPECT CASE STUDY <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* 4. Editorial Headline & Smart 2026 Narrative */}
      <div className="relative z-10 flex-1 flex flex-col justify-between">
        <div className="mb-6">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3
              className="text-2xl sm:text-3xl font-bold font-serif-editorial text-white tracking-tight group-hover:text-white transition-colors flex items-center gap-2"
            >
              {project.title}
              <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-zinc-400 group-hover:text-white" />
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-3">
            {project.subtitle}
          </p>

          <p className="text-[11px] sm:text-xs text-zinc-400 font-light leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* 5. Precision 2026 Benchmarks Grid (3-pillar HUD) */}
        <div className="grid grid-cols-3 gap-2 p-3 sm:p-3.5 rounded-2xl bg-zinc-950/80 border border-white/5 group-hover:border-white/15 transition-colors mb-6 shadow-inner">
          {project.metrics.map((m, mIdx) => (
            <div key={mIdx} className="text-center">
              <div
                className={`text-base sm:text-lg font-bold font-mono-tech text-white ${theme.metricColor} transition-colors duration-300`}
              >
                {m.value}
              </div>
              <div className="text-[9px] font-mono-tech text-zinc-400 uppercase tracking-wider truncate">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* 6. Modular Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono-tech px-2.5 py-1 rounded-md bg-zinc-900/90 text-zinc-300 border border-white/5 group-hover:border-white/15 transition-colors"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="text-[10px] font-mono-tech px-2 py-1 rounded-md bg-zinc-900/50 text-zinc-400 border border-white/5">
              +{project.techStack.length - 4} more
            </span>
          )}
        </div>

        {/* 7. Action Deck */}
        <div className="flex items-center justify-between border-t border-white/8 pt-4 text-xs font-mono-tech text-zinc-400">
          <span className="text-white group-hover:text-blue-300 font-semibold transition-colors flex items-center gap-1.5">
            DEEP DIVE SPEC <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>

          <div className="flex items-center gap-3 text-zinc-400" onClick={(e) => e.stopPropagation()}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors p-1"
                aria-label="Source code"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors p-1"
                aria-label="Live demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
