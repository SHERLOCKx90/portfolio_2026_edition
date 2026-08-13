'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 60);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black p-8 text-white select-none pointer-events-auto"
        >
          <div className="w-full flex justify-between items-center text-xs font-mono-tech text-zinc-500 uppercase tracking-widest">
            <span>SUBHADEEP CHELL</span>
            <span>2026 PORTFOLIO</span>
          </div>

          {/* Center Logo & Progress */}
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-6xl font-bold font-serif-editorial tracking-tight"
            >
              SC <span className="text-zinc-600">.</span>
            </motion.div>

            <div className="text-5xl sm:text-7xl font-bold font-mono-tech tracking-tighter text-zinc-200">
              {progress}%
            </div>

            <div className="w-48 sm:w-64 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
          </div>

          <div className="text-xs font-mono-tech text-zinc-500 uppercase tracking-widest">
            LOADING...
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
