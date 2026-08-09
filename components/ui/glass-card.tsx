'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  gradientAccent?: string;
  interactive?: boolean;
  onClick?: () => void;
}

export function GlassCard({
  children,
  className,
  gradientAccent = 'from-white/10 to-transparent',
  interactive = true,
  onClick,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !interactive) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'relative rounded-2xl border border-white/10 bg-zinc-950/60 p-6 backdrop-blur-xl overflow-hidden group transition-all duration-500',
        interactive && 'hover:border-white/20 hover:bg-zinc-900/80 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/80 cursor-pointer',
        className
      )}
    >
      {/* Radial Cursor Spotlight Follow */}
      {interactive && isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-2xl"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.07), transparent 40%)`,
          }}
        />
      )}

      {/* Top subtle border glow */}
      <div className={cn('absolute inset-x-0 top-0 h-px bg-gradient-to-r transparent via-white/20 transparent opacity-60', gradientAccent)} />

      {children}
    </motion.div>
  );
}
