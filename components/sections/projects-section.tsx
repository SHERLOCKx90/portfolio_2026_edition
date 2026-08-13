'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '@/data/portfolio-data';
import { Project } from '@/types';
import { TextReveal } from '@/components/ui/text-reveal';
import { Modal } from '@/components/ui/modal';
import { ProjectCard } from '@/components/ui/project-card';

const CATEGORIES = ['All', 'AI Platform', 'Enterprise App', 'Developer Tools', 'Full Stack'];

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-28 px-6 sm:px-12 bg-zinc-950 text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono-tech text-zinc-400 uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-[#4285F4]" />
              <span>// FEATURED PRODUCTS & LAUNCHES</span>
            </div>
            <TextReveal
              text="Compiled & Deployed."
              as="h2"
              className="text-4xl sm:text-6xl font-bold font-serif-editorial text-white tracking-tight"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-mono-tech transition-all duration-300 ${activeCategory === category
                  ? 'bg-white text-black font-semibold shadow-lg shadow-white/10 scale-105'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white hover:border-zinc-700'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Precision Projects Grid (Asymmetric Editorial Flow) */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              // Asymmetric grid layout: alternating 7-span and 5-span cards, full span on 5th
              let colSpan = 'md:col-span-6';
              if (filteredProjects.length > 2) {
                if (idx % 4 === 0) colSpan = 'md:col-span-7';
                else if (idx % 4 === 1) colSpan = 'md:col-span-5';
                else if (idx % 4 === 2) colSpan = 'md:col-span-5';
                else if (idx % 4 === 3) colSpan = 'md:col-span-7';
              }

              return (
                <div key={project.id} className={colSpan}>
                  <ProjectCard
                    project={project}
                    index={idx}
                    total={filteredProjects.length}
                    onSelect={setSelectedProject}
                  />
                </div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Case Study Drawer Modal */}
      <Modal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}

