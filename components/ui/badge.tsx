'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'accent' | 'glow';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const base =
    'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono tracking-wide transition-all duration-300';

  const variants = {
    default: 'bg-zinc-800/80 text-zinc-300 border border-zinc-700/50',
    outline: 'bg-transparent text-zinc-400 border border-zinc-700/80 hover:border-zinc-500 hover:text-zinc-200',
    accent: 'bg-white/10 text-white border border-white/20 backdrop-blur-md',
    glow: 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 shadow-[0_0_12px_rgba(99,102,241,0.2)]',
  };

  return <span className={cn(base, variants[variant], className)}>{children}</span>;
}
