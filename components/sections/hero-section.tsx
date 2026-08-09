'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Sparkles, Terminal, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolio-data';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { TextReveal } from '@/components/ui/text-reveal';
import { ScrapbookCard } from '@/components/ui/scrapbook-card';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 sm:px-12 overflow-hidden bg-noise select-none">
      {/* Top Bar Header */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-2 text-xs font-mono-tech text-zinc-400"
        >
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>PORTFOLIO OS // 2026 EDITION</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden sm:flex items-center gap-1.5 text-xs font-mono-tech text-zinc-400"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
          <span>FULL STACK & AI • COGNIZANT</span>
        </motion.div>
      </div>

      {/* Main Headline & Statement: Giant Typography */}
      <div className="relative z-10 max-w-6xl mx-auto w-full my-auto py-12">
        {/* Single Focused Status Tag directly above the headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-950/90 border border-white/15 text-xs font-mono-tech text-zinc-200 mb-6 backdrop-blur-md shadow-lg w-fit"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-semibold text-white tracking-wide">OPEN TO SELECT PROJECTS</span>
          <span className="text-zinc-500">•</span>
          <span className="text-zinc-400">HIGH IMPACT ADVISORY</span>
        </motion.div>

        {/* Large 9xl Editorial Headline */}
        <TextReveal
          text={PERSONAL_INFO.headline}
          as="h1"
          className="text-5xl sm:text-7xl lg:text-9xl font-bold font-serif-editorial text-white tracking-tight leading-[0.95] mb-12"
          delay={0.5}
        />

        {/* Subtitle & Scrapbook Duo Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          <div className="lg:col-span-7 space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="max-w-2xl text-lg sm:text-xl text-zinc-400 font-light leading-relaxed"
            >
              Engineering high-performance web products, resilient backend architectures, and intelligent{' '}
              <span className="text-gemini-gradient font-medium">agentic AI systems</span> that turn complexity into{' '}
              <span className="text-white font-normal underline decoration-blue-500/40 decoration-2 underline-offset-4">effortless user experiences</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <MagneticButton href="#projects" variant="primary">
                View Projects <ArrowDownRight className="w-4 h-4" />
              </MagneticButton>
              <MagneticButton href="#contact" variant="secondary">
                Contact Subhadeep
              </MagneticButton>
              <MagneticButton href={PERSONAL_INFO.resumeUrl} variant="glass">
                <FileText className="w-4 h-4" /> Resume
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right Tactile Scrapbook Installation */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <ScrapbookCard />
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator & Brand Ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="relative z-10 max-w-6xl mx-auto w-full flex justify-between items-end border-t border-white/10 pt-6 text-xs font-mono-tech text-zinc-400"
      >
        <div className="flex items-center gap-3">
          <div className="w-5 h-8 rounded-full border border-zinc-700 flex justify-center pt-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="w-1 h-2 bg-gradient-to-b from-[#4285F4] to-[#34A853] rounded-full"
            />
          </div>
          <span>SCROLL TO DISCOVER</span>
        </div>

        <div className="hidden md:flex gap-8 text-zinc-400 items-center">
          <span className="hover:text-blue-400 transition-colors">COGNIZANT</span>
          <span className="hover:text-emerald-400 transition-colors">VIT CHENNAI</span>
          <span className="hover:text-amber-400 transition-colors">IEEE ICEECT 2024</span>
          <span className="hover:text-purple-400 transition-colors">GOOGLE CLOUD CERTIFIED</span>
        </div>
      </motion.div>
    </section>
  );
}



