'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useMagnetic } from '@/hooks/use-magnetic';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'glass';
  href?: string;
  target?: string;
}

export function MagneticButton({
  children,
  onClick,
  className,
  variant = 'primary',
  href,
  target,
}: MagneticButtonProps) {
  const { ref, position, handleMouseMove, handleMouseLeave } = useMagnetic(0.35);

  const baseStyles =
    'relative inline-flex items-center justify-center px-6 py-3.5 rounded-full text-sm font-medium transition-all duration-300 active:scale-95 group cursor-pointer overflow-hidden';

  const variants = {
    primary:
      'bg-white text-black hover:bg-zinc-200 shadow-lg shadow-white/10 hover:shadow-white/20',
    secondary:
      'bg-zinc-900 text-white border border-zinc-700/80 hover:border-zinc-500 hover:bg-zinc-800',
    glass:
      'bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/30',
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={ref as any}
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.1 }}
      className={cn(baseStyles, variants[variant], className)}
    >
      <span className="relative z-10 flex items-center gap-2 group-hover:translate-x-0.5 transition-transform duration-300">
        {children}
      </span>
      {/* Subtle shine effect on hover */}
      <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
    </Component>
  );
}
