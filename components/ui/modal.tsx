'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Cpu, Zap, ShieldCheck } from 'lucide-react';
import { Project } from '@/types';
import { Badge } from '@/components/ui/badge';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { GithubIcon } from '@/components/ui/icons';

interface ModalProps {
  project: Project | null;
  onClose: () => void;
}

export function Modal({ project, onClose }: ModalProps) {
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div
          data-lenis-prevent="true"
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto bg-black/85 backdrop-blur-xl transition-all duration-300"
        >
          {/* Modal Container with data-lenis-prevent and native mousewheel support */}
          <motion.div
            ref={modalContentRef}
            data-lenis-prevent="true"
            initial={{ opacity: 0, scale: 0.95, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-4xl max-h-[85vh] overflow-y-auto overscroll-contain rounded-3xl border border-white/15 bg-[#0e0e13] p-6 sm:p-10 shadow-2xl text-zinc-100 my-auto focus:outline-none"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-6 right-6 p-2.5 rounded-full bg-zinc-900/90 border border-zinc-700/80 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors z-20 shadow-md"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-4 pr-12">
              <div className="flex flex-wrap gap-2">
                <Badge variant="glow">{project.category}</Badge>
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-serif-editorial">
                {project.title}
              </h2>
              <p className="text-lg text-zinc-400 font-light">{project.subtitle}</p>
            </div>

            {/* Hero Image */}
            <div className="my-8 relative rounded-2xl overflow-hidden border border-white/10 aspect-video">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8 p-6 rounded-2xl bg-zinc-900/50 border border-white/5">
              {project.metrics.map((metric, idx) => (
                <div key={idx} className="text-center sm:text-left">
                  <div className="text-2xl sm:text-4xl font-bold font-mono-tech text-white">
                    {metric.value}
                  </div>
                  <div className="text-xs sm:text-sm text-zinc-400 mt-1">{metric.label}</div>
                </div>
              ))}
            </div>

            {/* Content Body */}
            <div className="space-y-8 text-zinc-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" /> Executive Overview
                </h3>
                <p className="leading-relaxed text-zinc-300 font-light">
                  {project.fullCaseStudy.overview}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-cyan-400" /> Architectural Highlights
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.fullCaseStudy.architecture.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-purple-400" /> Technical Challenges & Outcomes
                </h3>
                <p className="leading-relaxed text-zinc-300 font-light mb-4">
                  {project.fullCaseStudy.technicalChallenges}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.fullCaseStudy.outcomes.map((outcome, idx) => (
                    <Badge key={idx} variant="accent">
                      {outcome}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div>
                <h4 className="text-sm font-mono-tech text-zinc-400 uppercase tracking-wider mb-3">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-md text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-10 pt-6 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-3">
                {project.demoUrl && (
                  <MagneticButton href={project.demoUrl} target="_blank" variant="primary">
                    Live Product Demo <ExternalLink className="w-4 h-4" />
                  </MagneticButton>
                )}
                {project.githubUrl && (
                  <MagneticButton href={project.githubUrl} target="_blank" variant="secondary">
                    View Repository <GithubIcon className="w-4 h-4" />
                  </MagneticButton>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Close Case Study
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
