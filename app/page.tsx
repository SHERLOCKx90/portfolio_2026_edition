'use client';

import React from 'react';
import { useLenis } from '@/hooks/use-lenis';
import { CustomCursor } from '@/components/ui/custom-cursor';
import { Preloader } from '@/components/layout/preloader';
import { Navbar } from '@/components/layout/navbar';
import { HeroSection } from '@/components/sections/hero-section';
import { MarqueeSection } from '@/components/sections/marquee-section';
import { AboutSection } from '@/components/sections/about-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { TimelineSection } from '@/components/sections/timeline-section';
import { ResearchSection } from '@/components/sections/research-section';
import { CertsSection } from '@/components/sections/certs-section';
import { LifeSection } from '@/components/sections/life-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/layout/footer';

export default function Home() {
  // Initialize Lenis Smooth Scroll
  useLenis();

  return (
    <main className="relative bg-[#050507] min-h-screen selection:bg-white selection:text-black overflow-hidden">
      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Initial Minimal Preloader */}
      <Preloader />

      {/* Floating Glass Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Marquee Ticker */}
      <MarqueeSection />

      {/* About & Philosophy */}
      <AboutSection />

      {/* Featured Projects (The Product Launches) */}
      <ProjectsSection />

      {/* Career Experience Timeline */}
      <TimelineSection />

      {/* Research & Publications */}
      <ResearchSection />

      {/* Certifications (Accolades) */}
      <CertsSection />

      {/* Into the Life of Subhadeep (Full-bleed Carousel & Scrapbook Gallery) */}
      <LifeSection />

      {/* Keynote Contact CTA */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
