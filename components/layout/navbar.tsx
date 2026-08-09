'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ArrowUpRight,
  Home,
  User,
  Layers,
  Briefcase,
  BookOpen,
  Trophy,
  Mail,
  Sparkles,
  Heart,
} from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolio-data';
import { MagneticButton } from '@/components/ui/magnetic-button';

const NAV_LINKS = [
  { name: 'About', href: '#about', icon: User },
  { name: 'Projects', href: '#projects', icon: Layers },
  { name: 'Experience', href: '#experience', icon: Briefcase },
  { name: 'Research', href: '#research', icon: BookOpen },
  { name: 'Accolades', href: '#certifications', icon: Trophy },
  { name: 'Life', href: '#life', icon: Heart },
  { name: 'Contact', href: '#contact', icon: Mail },
];

export function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (currentScrollY < 50) {
            setIsVisible(true);
          } else if (currentScrollY > lastScrollYRef.current && currentScrollY - lastScrollYRef.current > 15) {
            setIsVisible(false); // Scrolling down
          } else if (lastScrollYRef.current - currentScrollY > 15) {
            setIsVisible(true); // Scrolling up
          }

          lastScrollYRef.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Floating Glass Header (Desktop + Minimal Mobile Brand Bar) */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-40 flex justify-center p-3 sm:p-6 pointer-events-none"
      >
        <nav className="pointer-events-auto flex items-center justify-between gap-6 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border border-white/10 bg-zinc-950/85 backdrop-blur-2xl shadow-2xl shadow-black/80 max-w-5xl w-full relative before:absolute before:inset-x-6 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-blue-500/40 before:via-rose-500/30 before:via-amber-500/30 before:to-transparent">
          {/* Logo with Gemini 4-Color Cluster */}
          <a
            href="#"
            className="flex items-center gap-2 text-white font-bold font-serif-editorial text-lg sm:text-xl tracking-tight group"
          >
            <span>SC</span>
            <div className="grid grid-cols-2 gap-0.5 group-hover:rotate-45 transition-transform duration-500">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC05]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-mono-tech text-zinc-400 hover:text-white uppercase tracking-wider transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Right Action CTA (Desktop) & Status Pill (Mobile) */}
          <div className="flex items-center gap-3">
            <div className="flex md:hidden items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono-tech text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>ONLINE</span>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <MagneticButton href="#contact" variant="glass" className="text-xs py-2 px-4">
                Get in Touch <ArrowUpRight className="w-3.5 h-3.5" />
              </MagneticButton>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Native iOS / Gemini Mobile Bottom Navigation Dock (Mobile Only) */}
      <div className="md:hidden fixed bottom-4 inset-x-3 z-50 pointer-events-auto">
        <div className="flex items-center justify-around py-2 px-1 rounded-2xl bg-[#09090f]/90 border border-white/15 backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.85)]">
          {NAV_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                className="flex flex-col items-center justify-center p-1.5 text-zinc-400 hover:text-white active:scale-90 transition-all rounded-xl relative group min-w-[50px]"
              >
                <Icon className="w-4 h-4 mb-0.5 group-hover:text-white transition-colors" />
                <span className="text-[9px] font-mono-tech tracking-tight text-zinc-400 group-hover:text-white">
                  {item.name}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
