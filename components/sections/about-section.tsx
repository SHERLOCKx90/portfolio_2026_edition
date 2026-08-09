'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Cpu, Layers, Code2, ArrowUpRight, Sparkles, Globe, Compass, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolio-data';
import { TextReveal } from '@/components/ui/text-reveal';
import { GlassCard } from '@/components/ui/glass-card';
import { CountUp } from '@/components/ui/count-up';
import { InteractiveGlobe } from '@/components/canvas/interactive-globe';

export function AboutSection() {
  const principles = [
    {
      icon: Cpu,
      title: 'Architectural Rigor',
      description: 'Designing resilient microservices with Java Spring Boot and Node.js that handle high traffic without breaking a sweat.',
      color: 'blue',
      accentBorder: 'hover:border-blue-500/40 hover:shadow-blue-500/10',
      iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      badge: '#4285F4',
    },
    {
      icon: Layers,
      title: 'Full Stack Craftsmanship',
      description: 'Bridging low-latency backend systems with fluid Next.js and React user interfaces that look expensive and run at 60fps.',
      color: 'purple',
      accentBorder: 'hover:border-purple-500/40 hover:shadow-purple-500/10',
      iconBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      badge: '#8B5CF6',
    },
    {
      icon: Code2,
      title: 'Agentic AI Systems',
      description: 'Leveraging RAG vector search, LangChain agents, OpenAI, and Gemini to build self-healing software products.',
      color: 'coral',
      accentBorder: 'hover:border-rose-500/40 hover:shadow-rose-500/10',
      iconBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      badge: '#EA4335',
    },
    {
      icon: Shield,
      title: 'Proactive API Security',
      description: 'Applying deep academic research on zero-day API threat detection to keep enterprise data assets secure.',
      color: 'emerald',
      accentBorder: 'hover:border-emerald-500/40 hover:shadow-emerald-500/10',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      badge: '#34A853',
    },
  ];

  return (
    <section id="about" className="relative py-28 px-6 sm:px-12 bg-zinc-950 text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono-tech text-zinc-400 uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-[#4285F4]" />
            <span>// ABOUT & PHILOSOPHY</span>
          </div>
          <TextReveal
            text="Crafting software where engineering precision meets editorial elegance."
            as="h2"
            className="text-4xl sm:text-6xl font-bold font-serif-editorial text-white tracking-tight leading-tight max-w-4xl"
          />
        </div>

        {/* Storytelling Grid: Bio + 3D Interactive Globe */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-stretch">
          {/* Left Main Bio Card */}
          <GlassCard className="lg:col-span-6 flex flex-col justify-between p-8 sm:p-10 border-white/15 hover:border-blue-500/30">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono-tech px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-rose-500/20 text-white border border-white/20">
                  SOFTWARE ENGINEER & AI RESEARCHER
                </span>
                <span className="text-[10px] font-mono-tech px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> High Impact
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold font-serif-editorial text-white">
                Hi, I'm Subhadeep Chell.
              </h3>
              <p className="text-zinc-300 font-light leading-relaxed">
                Currently driving full stack enterprise microservices and cloud engineering at <strong className="text-white font-medium">Cognizant</strong>. I specialize in building end-to-end full stack web platforms, distributed backend microservices, and applied AI systems.
              </p>
              <p className="text-zinc-400 font-light leading-relaxed">
                My approach combines Apple's design philosophy—where every layout breathes with intentional whitespace—with the raw performance and developer ergonomics of Linear and Vercel.
              </p>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 gap-3 pt-6 mt-6 border-t border-white/10">
              {PERSONAL_INFO.stats.slice(0, 2).map((stat, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5">
                  <div className="text-2xl font-bold font-mono-tech text-white mb-0.5">
                    <CountUp value={stat.value} />
                  </div>
                  <div className="text-[10px] font-mono-tech text-zinc-400 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono-tech text-zinc-400">
              <span className="flex items-center gap-2 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                AVAILABLE FOR ADVISORY & KEY ROLES
              </span>
              <a href="#contact" className="hover:text-white flex items-center gap-1 transition-colors text-blue-400 hover:text-blue-300">
                COLLABORATE <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </GlassCard>

          {/* Right Interactive 3D Globe with Preferred Work Locations Card */}
          <GlassCard className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between overflow-hidden border-white/15 hover:border-rose-500/30">
            <div className="flex items-center justify-between gap-4 mb-2 z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                </div>
                <div>
                  <h4 className="text-base font-semibold font-serif-editorial text-white">
                    Places Where I Would Love to Work
                  </h4>
                  <p className="text-[10px] font-mono-tech text-zinc-400">
                    PREFERRED HUBS & TECH ECOSYSTEMS (CLICK FOR ❤️ REACTION)
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-mono-tech px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 hidden sm:flex items-center gap-1.5">
                <Compass className="w-3 h-3 text-cyan-400 animate-spin" style={{ animationDuration: '12s' }} />
                DRAG ORBIT
              </span>
            </div>

            {/* Interactive 3D Three.js Globe */}
            <div className="w-full my-auto flex justify-center items-center py-2">
              <InteractiveGlobe className="w-full" />
            </div>

            <div className="text-[11px] font-mono-tech text-zinc-400 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
              <span className="truncate">HUBS: DGP • CCU • BLR • HYD • MAA • BOM • BBI</span>
              <span className="text-rose-400 shrink-0 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" /> OPEN TO HUBS
              </span>
            </div>
          </GlassCard>
        </div>

        {/* 4 Core Pillars - Gemini Spectrum */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((item, idx) => (
            <GlassCard key={idx} className={`p-6 flex flex-col justify-between ${item.accentBorder} transition-all`}>
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-xl ${item.iconBg} border flex items-center justify-center`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-semibold text-white font-serif-editorial">
                  {item.title}
                </h4>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}


