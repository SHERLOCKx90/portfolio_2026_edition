'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Copy,
  Check,
  FileText,
  ShieldAlert,
  ExternalLink,
  Sparkles,
  Zap,
  Lock,
  Pin,
  Maximize2,
  Minimize2,
  ChevronRight,
} from 'lucide-react';
import { RESEARCH_PAPERS } from '@/data/portfolio-data';
import { TextReveal } from '@/components/ui/text-reveal';

export function ResearchSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'notes' | 'bibtex'>('notes');

  const paper = RESEARCH_PAPERS[0];

  const handleCopyBibtex = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(paper.bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section
      id="research"
      className="relative py-28 px-6 sm:px-12 bg-[#060609] text-white border-t border-white/10 overflow-hidden select-none"
    >
      {/* Background Glow */}
      <div
        className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none transition-opacity duration-500 ${
          isOpen ? 'opacity-20 bg-gradient-to-tr from-[#EA4335] via-[#FBBC05] to-[#4285F4]' : 'opacity-5 bg-zinc-800'
        }`}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono-tech text-zinc-400 uppercase tracking-widest mb-3">
              <span
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  isOpen ? 'bg-[#EA4335] animate-pulse' : 'bg-zinc-600'
                }`}
              />
              <span>// ACADEMIC DOSSIER & RESEARCH MANUSCRIPT</span>
            </div>
            <TextReveal
              text="Applied research in Web API security & real-time threat mitigation."
              as="h2"
              className="text-4xl sm:text-6xl font-bold font-serif-editorial text-white tracking-tight"
            />
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 text-xs font-mono-tech text-zinc-400 backdrop-blur-md">
            <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
            <span>IEEE ICEECT 2024 PUBLICATION</span>
          </div>
        </div>

        {/* --- High Performance 2D Scrapbook Research Dossier --- */}
        <div className="w-full flex justify-center">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className={`relative w-full cursor-pointer transition-all duration-300 rounded-3xl border overflow-hidden backdrop-blur-xl ${
              isOpen
                ? 'max-w-5xl bg-[#0c0c12] border-white/25 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.95),0_0_40px_rgba(234,67,53,0.15)]'
                : 'max-w-3xl bg-[#0b0b10] border-white/8 hover:border-white/20 hover:bg-[#0e0e14] shadow-xl'
            }`}
          >
            {/* 1. Translucent Frosted Washi Tape (Top Center) */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-white/15 backdrop-blur-md border-t border-b border-white/30 shadow-md rotate-[-1deg] z-20 pointer-events-none rounded-sm">
              <div className="w-full h-full opacity-25 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(255,255,255,0.4)_4px,rgba(255,255,255,0.4)_8px)]" />
            </div>

            {/* 2. Top Chromatic Accent Line when Opened */}
            {isOpen && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#EA4335] via-[#FBBC05] to-[#4285F4] z-20" />
            )}

            {/* Main Content Layout */}
            <div className="p-6 sm:p-9 relative z-10">
              <div className={`grid gap-8 items-start transition-all duration-300 ${isOpen ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'}`}>
                {/* --- Primary Manuscript Card Header & Details --- */}
                <div className={`${isOpen ? 'lg:col-span-6' : 'w-full'} flex flex-col justify-between`}>
                  {/* Top Bar: Metadata & Status */}
                  <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-white/8">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors duration-200 ${
                          isOpen
                            ? 'bg-red-500/20 text-red-400 border border-red-500/40 shadow-[0_0_10px_rgba(234,67,53,0.3)]'
                            : 'bg-zinc-900 text-zinc-500 border border-white/5'
                        }`}
                      >
                        <ShieldAlert className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono-tech font-bold text-white tracking-wider block">
                          IEEE XPLORE PROCEEDINGS
                        </span>
                        <span className="text-[9px] font-mono-tech text-zinc-400">ICEECT 2024 • CONFERENCE</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono-tech flex items-center gap-1.5 transition-colors ${
                          isOpen
                            ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                            : 'bg-zinc-900 text-zinc-400 border border-white/5'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-600'
                          }`}
                        />
                        <span>PEER REVIEWED</span>
                      </span>

                      <div
                        className="p-1.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 text-zinc-400 hover:text-white transition-colors"
                        title={isOpen ? 'Collapse Dossier' : 'Expand Dossier'}
                      >
                        {isOpen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  </div>

                  {/* Manuscript Title & Author Details */}
                  <div className="mb-5">
                    <div className="text-[10px] font-mono-tech text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <Lock className={`w-3 h-3 ${isOpen ? 'text-amber-400' : 'text-zinc-600'}`} />
                      <span>AUTHENTIC MANUSCRIPT // REAL-TIME THREAT MITIGATION</span>
                    </div>

                    <h3
                      className={`text-2xl sm:text-3xl font-bold font-serif-editorial tracking-tight leading-snug mb-3 transition-colors ${
                        isOpen ? 'text-white' : 'text-zinc-200 group-hover:text-white'
                      }`}
                    >
                      {paper.title}
                    </h3>

                    <div className="text-xs font-mono-tech text-zinc-400 flex flex-wrap items-center gap-2">
                      <span className="text-zinc-200 font-medium">Author: Subhadeep Chell</span>
                      <span>•</span>
                      <span className="text-zinc-400">VIT Chennai & Cognizant</span>
                      <span>•</span>
                      <span className="text-zinc-500">DOI: {paper.doi}</span>
                    </div>
                  </div>

                  {/* Quantitative Security Metric Badges */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-zinc-950/80 border border-white/5 mb-5">
                    <div className="text-center">
                      <div
                        className={`text-base font-bold font-mono-tech transition-colors ${
                          isOpen ? 'text-amber-400' : 'text-zinc-300'
                        }`}
                      >
                        &lt;4.2ms
                      </div>
                      <div className="text-[8px] font-mono-tech text-zinc-400 uppercase tracking-wider">
                        Inspection SLA
                      </div>
                    </div>
                    <div className="text-center">
                      <div
                        className={`text-base font-bold font-mono-tech transition-colors ${
                          isOpen ? 'text-emerald-400' : 'text-zinc-300'
                        }`}
                      >
                        99.4%
                      </div>
                      <div className="text-[8px] font-mono-tech text-zinc-400 uppercase tracking-wider">
                        Precision Rate
                      </div>
                    </div>
                    <div className="text-center">
                      <div
                        className={`text-base font-bold font-mono-tech transition-colors ${
                          isOpen ? 'text-rose-400' : 'text-zinc-300'
                        }`}
                      >
                        OWASP API
                      </div>
                      <div className="text-[8px] font-mono-tech text-zinc-400 uppercase tracking-wider">
                        Standard
                      </div>
                    </div>
                  </div>

                  {/* Footer Hint Bar when resting */}
                  {!isOpen && (
                    <div className="flex items-center justify-between pt-3.5 border-t border-white/5 text-xs font-mono-tech text-zinc-400">
                      <span className="flex items-center gap-2 text-zinc-300">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>Click to unfold scrapbook research dossier</span>
                      </span>
                      <ChevronRight className="w-4 h-4 text-zinc-500" />
                    </div>
                  )}
                </div>

                {/* --- Secondary Unfolded Scrapbook Dossier (Emerges on CLICK) --- */}
                {isOpen && (
                  <div className="lg:col-span-6 relative p-5 sm:p-6 rounded-2xl bg-zinc-950/90 border border-white/10 shadow-2xl flex flex-col justify-between animate-fadeIn">
                    {/* Floating Yellow Scrapbook Memo Note */}
                    <div className="absolute -top-3 -right-2 z-20 flex items-center gap-1.5 px-3 py-0.5 rounded-lg bg-amber-200 text-zinc-950 shadow-md border border-amber-300 font-mono-tech text-[10px] font-bold rotate-1 pointer-events-none">
                      <Pin className="w-3 h-3 text-rose-600 fill-rose-600 -rotate-45" />
                      <span>VERIFIED FIELD RESULTS</span>
                    </div>

                    {/* Tab Switcher: Research Notes vs BibTeX */}
                    <div className="flex items-center justify-between border-b border-white/8 pb-3 mb-4">
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveTab('notes');
                          }}
                          className={`px-3 py-1 rounded-lg text-xs font-mono-tech transition-all ${
                            activeTab === 'notes'
                              ? 'bg-zinc-800 text-white font-semibold border border-white/20'
                              : 'text-zinc-400 hover:text-white'
                          }`}
                        >
                          Dossier Notes
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveTab('bibtex');
                          }}
                          className={`px-3 py-1 rounded-lg text-xs font-mono-tech transition-all ${
                            activeTab === 'bibtex'
                              ? 'bg-zinc-800 text-white font-semibold border border-white/20'
                              : 'text-zinc-400 hover:text-white'
                          }`}
                        >
                          BibTeX Citation
                        </button>
                      </div>

                      <span className="text-[10px] font-mono-tech text-zinc-400">
                        REC-ID: SC//ICEECT-24
                      </span>
                    </div>

                    {/* Tab 1: Executive Abstract & Core Empirical Findings */}
                    {activeTab === 'notes' && (
                      <div className="space-y-3.5 mb-6 text-left">
                        {/* Abstract Excerpt */}
                        <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5">
                          <div className="text-[10px] font-mono-tech uppercase text-zinc-400 mb-1.5 flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-amber-400" />
                            <span>Executive Abstract</span>
                          </div>
                          <p className="text-xs text-zinc-300 font-light leading-relaxed">
                            {paper.abstract}
                          </p>
                        </div>

                        {/* Key Findings List */}
                        <div className="space-y-2">
                          <div className="text-[10px] font-mono-tech uppercase text-zinc-400 mb-1">
                            Empirical Discoveries:
                          </div>
                          {paper.keyFindings.map((finding, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 p-2.5 rounded-lg bg-zinc-900/40 border border-white/5 text-[11px] text-zinc-300 font-light"
                            >
                              <Zap className="w-3 h-3 text-amber-400 mt-0.5 shrink-0" />
                              <span>{finding}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tab 2: BibTeX Code Drawer */}
                    {activeTab === 'bibtex' && (
                      <div className="mb-6 text-left">
                        <pre className="p-3.5 rounded-xl bg-zinc-900 text-[10px] font-mono text-cyan-300 overflow-x-auto border border-white/10 whitespace-pre-wrap leading-relaxed">
                          {paper.bibtex}
                        </pre>
                      </div>
                    )}

                    {/* Action Links Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3.5 border-t border-white/8">
                      <div className="flex items-center gap-2">
                        <a
                          href={paper.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-3.5 py-1.5 rounded-full bg-white text-black font-semibold text-xs font-mono-tech flex items-center gap-1.5 hover:bg-zinc-200 transition-colors shadow-md"
                        >
                          <span>IEEE Xplore</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>

                        <button
                          onClick={handleCopyBibtex}
                          className="px-3.5 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 text-xs font-mono-tech flex items-center gap-1.5 transition-all"
                        >
                          {copied ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-300">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy BibTeX</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="text-[10px] font-mono-tech text-zinc-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>ARCHIVED SPECIMEN</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Rotating IEEE Watermark Stamp (Top Right) */}
            <div className="absolute top-3 -right-8 sm:-right-6 w-24 h-24 pointer-events-none opacity-15 transition-opacity">
              <div className="w-full h-full animate-[spin_25s_linear_infinite]">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
