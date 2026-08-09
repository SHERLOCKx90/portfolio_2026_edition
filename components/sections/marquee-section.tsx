'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MARQUEE_ITEMS } from '@/data/portfolio-data';

export function MarqueeSection() {
  const row1 = MARQUEE_ITEMS;
  const row2 = [...MARQUEE_ITEMS].reverse();

  return (
    <section className="relative py-12 bg-zinc-950 border-y border-white/10 overflow-hidden select-none">
      {/* Side gradient Fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-zinc-950 to-transparent z-10" />

      {/* Row 1 - Left to Right */}
      <div className="flex overflow-hidden mb-4">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
          className="flex whitespace-nowrap gap-6 shrink-0"
        >
          {[...row1, ...row1].map((item, idx) => {
            const geminiColors = ['bg-[#4285F4]', 'bg-[#EA4335]', 'bg-[#FBBC05]', 'bg-[#34A853]', 'bg-[#8B5CF6]'];
            const dotColor = geminiColors[idx % geminiColors.length];

            return (
              <div
                key={idx}
                className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/10 bg-zinc-900/60 text-sm font-mono-tech text-zinc-300 backdrop-blur-md hover:border-white/30 transition-colors"
              >
                <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                <span>{item}</span>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Row 2 - Right to Left */}
      <div className="flex overflow-hidden">
        <motion.div
          animate={{ x: ['-50%', '0%'] }}
          transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
          className="flex whitespace-nowrap gap-6 shrink-0"
        >
          {[...row2, ...row2].map((item, idx) => {
            const geminiColors = ['bg-[#34A853]', 'bg-[#FBBC05]', 'bg-[#EA4335]', 'bg-[#4285F4]', 'bg-[#8B5CF6]'];
            const dotColor = geminiColors[idx % geminiColors.length];

            return (
              <div
                key={idx}
                className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/10 bg-zinc-900/40 text-sm font-mono-tech text-zinc-400 backdrop-blur-md hover:border-white/30 transition-colors"
              >
                <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                <span>{item}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
