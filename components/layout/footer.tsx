'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolio-data';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/components/ui/icons';

export function Footer() {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTimeString(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-zinc-950 pt-12 pb-24 md:pb-12 px-6 sm:px-12 text-zinc-400 relative before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-blue-500/20 before:via-rose-500/20 before:via-amber-500/20 before:to-emerald-500/20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        {/* Left identity & time */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-white font-bold font-serif-editorial text-2xl">
            <span>{PERSONAL_INFO.name}</span>
            <span className="text-xs font-mono-tech px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_12px_rgba(52,168,83,0.2)]">
              IST: {timeString || 'Kolkata'}
            </span>
          </div>
          <p className="text-xs font-mono-tech text-zinc-500">
            {PERSONAL_INFO.role} • Kolkata, India
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-6">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-5 h-5" />
          </a>
          <a
            href={PERSONAL_INFO.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-amber-400 transition-colors text-xs font-mono-tech flex items-center gap-1 font-semibold"
            aria-label="LeetCode"
          >
            <span>LC</span>
          </a>
        </div>

        {/* Back to top & copyright */}
        <div className="flex items-center gap-6 text-xs font-mono-tech">
          <span>© {new Date().getFullYear()} Subhadeep Chell. Built with <span className="text-gemini-gradient font-semibold">Gemini Chromatics</span></span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-600 transition-all"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
