'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ShieldAlert, FileText, Sparkles, ExternalLink, ArrowUpRight, Lock, Terminal } from 'lucide-react';

interface ResearchCanvasManuscriptProps {
  onHoverStateChange?: (isHovered: boolean) => void;
  doi?: string;
  pdfUrl?: string;
}

export function ResearchCanvasManuscript({
  onHoverStateChange,
  doi = '10.1109/ICEECT61413.2024.10651811',
  pdfUrl = 'https://ieeexplore.ieee.org',
}: ResearchCanvasManuscriptProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Motion Values for smooth physics tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    stiffness: 180,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 180,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverStateChange?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    onHoverStateChange?.(false);
  };

  // Canvas Waveform & Anomaly Inspection Particle Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth * 2);
    let height = (canvas.height = canvas.offsetHeight * 2);

    // Particle nodes representing API payload inspection AST nodes
    const particleCount = 35;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    let scanLineY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Subtle Security Matrix Grid
      ctx.strokeStyle = 'rgba(234, 67, 53, 0.06)';
      ctx.lineWidth = 1;
      const gridSize = 32;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw Moving Security Scan Laser Beam
      scanLineY = (scanLineY + 1.5) % height;
      const scanGradient = ctx.createLinearGradient(0, scanLineY - 40, 0, scanLineY);
      scanGradient.addColorStop(0, 'rgba(234, 67, 53, 0)');
      scanGradient.addColorStop(0.8, 'rgba(251, 188, 5, 0.15)');
      scanGradient.addColorStop(1, 'rgba(234, 67, 53, 0.45)');

      ctx.fillStyle = scanGradient;
      ctx.fillRect(0, scanLineY - 40, width, 40);

      ctx.strokeStyle = 'rgba(251, 188, 5, 0.7)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, scanLineY);
      ctx.lineTo(width, scanLineY);
      ctx.stroke();

      // 3. Draw Payload Nodes & Connected AST Lines
      ctx.strokeStyle = 'rgba(234, 67, 53, 0.12)';
      ctx.lineWidth = 0.8;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update & Draw Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(251, 188, 5, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * 2;
      height = canvas.height = canvas.offsetHeight * 2;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ perspective: 1200 }}
      className="relative flex items-center justify-center p-2 sm:p-6 w-full cursor-pointer select-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Tilted Manuscript Layer */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[420px] sm:max-w-[460px] aspect-[1/1.35] bg-[#0c0c12] rounded-3xl border border-white/20 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95),0_0_40px_rgba(234,67,53,0.18)] group overflow-hidden"
      >
        {/* Background Waveform Canvas Layer */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none opacity-50 z-0"
        />

        {/* Ambient Chromatic Hover Halo */}
        <div
          className={`absolute -inset-10 rounded-full blur-[100px] transition-opacity duration-700 pointer-events-none ${
            isHovered ? 'opacity-40' : 'opacity-15'
          }`}
          style={{
            background: 'radial-gradient(circle, #EA4335 0%, #FBBC05 40%, transparent 70%)',
          }}
        />

        {/* --- Authentic IEEE Paper Document Overlay --- */}
        <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-between h-full text-left">
          {/* Top Header Row: IEEE Seal & DOI Tag */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center shadow-[0_0_12px_rgba(234,67,53,0.3)]">
                <ShieldAlert className="w-4 h-4 text-red-400" />
              </div>
              <div>
                <span className="text-[11px] font-mono-tech font-bold text-white tracking-wider block">
                  IEEE XPLORE
                </span>
                <span className="text-[9px] font-mono-tech text-zinc-400">ICEECT 2024</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900/90 border border-white/10 text-[9px] font-mono-tech text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>PEER REVIEWED</span>
            </div>
          </div>

          {/* Manuscript Body: Paper Title & Authors */}
          <div className="my-auto py-4">
            <div className="text-[10px] font-mono-tech text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-amber-400" />
              <span>OFFICIAL MANUSCRIPT // APPLIED SECURITY</span>
            </div>

            <h4 className="text-xl sm:text-2xl font-bold font-serif-editorial text-white tracking-tight leading-snug mb-3 group-hover:text-amber-200 transition-colors">
              Real-Time Threat Detection and Mitigation in Web API Development
            </h4>

            {/* Author Credit */}
            <div className="text-xs font-mono-tech text-zinc-300 mb-4 flex items-center gap-2">
              <span className="text-white font-semibold">Subhadeep Chell</span>
              <span className="text-zinc-500">•</span>
              <span className="text-zinc-400">Published Author</span>
            </div>

            {/* Abstract Preview Lines with Typing Effect Emulation */}
            <div className="space-y-1.5 text-[11px] font-sans text-zinc-400 font-light leading-relaxed border-l-2 border-red-500/40 pl-3 bg-zinc-950/40 py-2 rounded-r-lg">
              <p className="line-clamp-3">
                &ldquo;Modern web architectures rely heavily on REST API endpoints... This paper proposes a hybrid machine learning inspection pipeline operating directly at the reverse-proxy layer to mitigate zero-day payloads in sub-4.2ms.&rdquo;
              </p>
            </div>
          </div>

          {/* Bottom Telemetry Bar: Live Metric HUD */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-left">
                <div className="text-xs font-bold font-mono-tech text-amber-400">&lt;4.2ms</div>
                <div className="text-[8px] font-mono-tech text-zinc-500 uppercase">Inspection SLA</div>
              </div>
              <div className="w-px h-6 bg-white/10" />
              <div className="text-left">
                <div className="text-xs font-bold font-mono-tech text-emerald-400">99.4%</div>
                <div className="text-[8px] font-mono-tech text-zinc-500 uppercase">Precision Rate</div>
              </div>
            </div>

            {/* Interactive Hover Trigger Button */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 text-[10px] font-mono-tech flex items-center gap-1.5 transition-all shadow-md group/btn"
            >
              <span>READ PAPER</span>
              <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* 4. Official Rotating IEEE Citation Watermark Stamp (Top Right) */}
        <div className="absolute top-4 -right-12 sm:-right-8 w-28 h-28 pointer-events-none opacity-25 group-hover:opacity-45 transition-opacity">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="w-full h-full"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full fill-amber-300">
              <path
                id="paperStampTextPath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="none"
              />
              <text fontSize="8.5" fontWeight="bold" letterSpacing="2.5">
                <textPath href="#paperStampTextPath">
                  • IEEE ICEECT 2024 • ARCHIVED •
                </textPath>
              </text>
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
