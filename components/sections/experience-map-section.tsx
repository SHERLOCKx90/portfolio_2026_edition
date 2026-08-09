'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Briefcase,
  Calendar,
  Sparkles,
  Terminal,
  CheckCircle2,
  Globe,
  Radio,
  ArrowUpRight,
  ZoomIn,
  ZoomOut,
  Zap,
  Building2,
  Navigation,
} from 'lucide-react';
import { TextReveal } from '@/components/ui/text-reveal';

interface ResumeExperienceNode {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  region: 'INDIA' | 'USA';
  coordinates: string;
  latLong: string;
  x: number; // Global SVG Map Percentage (0-100)
  y: number;
  zoomTarget: { scale: number; x: number; y: number };
  isCurrent: boolean;
  type: string;
  accentColor: string;
  glowColor: string;
  highlights: string[];
  technologies: string[];
  metrics: { label: string; value: string }[];
}

const RESUME_EXPERIENCE_NODES: ResumeExperienceNode[] = [
  {
    id: 'cognizant-kochi',
    company: 'Cognizant',
    role: 'Programmer Analyst Trainee - Full-Time (On-Site)',
    period: 'Nov 2025 — May 2026',
    location: 'Kochi, Kerala, India',
    region: 'INDIA',
    coordinates: '9.9312° N, 76.2673° E',
    latLong: 'LAT 9.93° N • LNG 76.26° E',
    x: 69, // South India / Kerala
    y: 58,
    zoomTarget: { scale: 2.4, x: -140, y: -45 },
    isCurrent: true, // PRESENT ACTIVE - Only this node pulses in Cyber Emerald
    type: 'Full-Time (On-Site)',
    accentColor: '#34A853', // Gemini Cyber Emerald
    glowColor: 'rgba(52, 168, 83, 0.4)',
    highlights: [
      'Completed full-stack enterprise training in Java, Spring Boot, React, MySQL, AWS NoSQL, and Docker.',
      'Resolved accessibility bugs across Admin, Learner, and Main React repositories for Cognizant Skillspring platform.',
      'Developed clean-architecture backend microservices (User, Course Management, Event Scheduler) according to business requirements, ensuring seamless frontend integration.',
      'Configured AWS DynamoDB schemas and mock data, implementing Global Secondary Indexes (GSIs) to resolve API errors.',
      'Streamlined Agile workflows using Git/GitHub, raising rigorously documented PRs to accelerate QA testing.',
    ],
    technologies: ['Java', 'Spring Boot', 'React', 'MySQL', 'AWS DynamoDB', 'Docker', 'Git', 'Agile'],
    metrics: [
      { label: 'Cloud Database', value: 'DynamoDB GSI' },
      { label: 'Architecture', value: 'Microservices' },
      { label: 'Platform Core', value: 'Skillspring' },
    ],
  },
  {
    id: 'cognizant-hyderabad',
    company: 'Cognizant',
    role: 'Programmer Analyst Trainee - Internship (On-Site)',
    period: 'Apr 2025 — Aug 2025',
    location: 'Hyderabad, Telangana, India',
    region: 'INDIA',
    coordinates: '17.3850° N, 78.4867° E',
    latLong: 'LAT 17.38° N • LNG 78.48° E',
    x: 69.8,
    y: 52,
    zoomTarget: { scale: 2.4, x: -145, y: -25 },
    isCurrent: false,
    type: 'Internship (On-Site)',
    accentColor: '#4285F4', // Electric Blue
    glowColor: 'rgba(66, 133, 244, 0.35)',
    highlights: [
      'Architected modular automated test suites using Java, Selenium WebDriver, Page Object Model (POM), and TestNG.',
      'Applied advanced Object-Oriented Programming (OOP) concepts to optimize automation logic, reusability, and suite maintainability.',
    ],
    technologies: ['Java', 'Selenium WebDriver', 'TestNG', 'Page Object Model', 'Cucumber', 'OOP'],
    metrics: [
      { label: 'Test Suite', value: 'Selenium POM' },
      { label: 'Framework', value: 'TestNG' },
      { label: 'Design Model', value: 'Modular OOP' },
    ],
  },
  {
    id: 'course-compass',
    company: 'Course Compass',
    role: 'Frontend Developer - Internship (Remote)',
    period: 'Apr 2024 — Aug 2024',
    location: 'Mumbai, Maharashtra, India',
    region: 'INDIA',
    coordinates: '19.0760° N, 72.8777° E',
    latLong: 'LAT 19.07° N • LNG 72.87° E',
    x: 67,
    y: 50.5,
    zoomTarget: { scale: 2.3, x: -130, y: -20 },
    isCurrent: false,
    type: 'Internship (Remote)',
    accentColor: '#8B5CF6', // Purple Violet
    glowColor: 'rgba(139, 92, 246, 0.35)',
    highlights: [
      'Engineered a scalable React/Redux design system and optimized frontend rendering.',
      'Elevated platform performance by 42% and boosted developer throughput by 30% through modular component architecture.',
    ],
    technologies: ['React', 'Redux', 'JavaScript', 'Design Systems', 'CSS3', 'Performance Tuning'],
    metrics: [
      { label: 'Render Speed', value: '+42%' },
      { label: 'Dev Throughput', value: '+30%' },
      { label: 'Architecture', value: 'React Redux' },
    ],
  },
  {
    id: 'a3-transforms',
    company: 'A3 Transforms',
    role: 'Full Stack Developer - Internship (On-Site)',
    period: 'Jan 2024 — Apr 2024',
    location: 'Chennai, Tamil Nadu, India',
    region: 'INDIA',
    coordinates: '13.0827° N, 80.2707° E',
    latLong: 'LAT 13.08° N • LNG 80.27° E',
    x: 70.8,
    y: 55.5,
    zoomTarget: { scale: 2.4, x: -150, y: -35 },
    isCurrent: false,
    type: 'Internship (On-Site)',
    accentColor: '#FBBC05', // Solar Amber
    glowColor: 'rgba(251, 188, 5, 0.35)',
    highlights: [
      'Developed full-stack AI applications and scalable SaaS platforms.',
      'Integrated 3+ ML models via robust API pipelines to achieve 99.9% uptime and a 25% increase in user engagement.',
    ],
    technologies: ['Full Stack AI', 'Python', 'ML API Pipelines', 'React', 'Node.js', 'REST APIs', 'SaaS'],
    metrics: [
      { label: 'Uptime SLA', value: '99.9%' },
      { label: 'Engagement', value: '+25%' },
      { label: 'ML Models', value: '3+ Deployed' },
    ],
  },
  {
    id: 'evanke',
    company: 'Evanke',
    role: 'UI/UX Designer - Internship (Remote)',
    period: 'Aug 2023 — Dec 2023',
    location: 'Vienna, Virginia, United States',
    region: 'USA',
    coordinates: '38.9012° N, 77.2653° W',
    latLong: 'LAT 38.90° N • LNG 77.26° W',
    x: 23.5, // North America / US East Coast (Virginia)
    y: 36,
    zoomTarget: { scale: 2.2, x: 190, y: 45 },
    isCurrent: false,
    type: 'Internship (US Remote)',
    accentColor: '#38BDF8', // Cyan Starlight
    glowColor: 'rgba(56, 189, 248, 0.35)',
    highlights: [
      'Designed optimized UI/UX flows and digital marketing assets for US-based web applications.',
      'Improved navigation efficiency by 35%, user retention by 20%, and campaign effectiveness by 30%.',
    ],
    technologies: ['Figma', 'UI/UX Design', 'User Research', 'Wireframing', 'Design Systems', 'Prototyping'],
    metrics: [
      { label: 'Navigation Flow', value: '+35%' },
      { label: 'User Retention', value: '+20%' },
      { label: 'Campaign Boost', value: '+30%' },
    ],
  },
];

function LiveClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span>KOCHI / IST: {time || 'LIVE'}</span>;
}

export function ExperienceMapSection() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('cognizant-kochi');
  const [isZoomedIn, setIsZoomedIn] = useState<boolean>(false);

  const activeNode =
    RESUME_EXPERIENCE_NODES.find((n) => n.id === selectedNodeId) || RESUME_EXPERIENCE_NODES[0];

  const handleNodeSelect = (nodeId: string) => {
    setSelectedNodeId(nodeId);
    setIsZoomedIn(true);
  };

  const handleResetZoom = () => {
    setIsZoomedIn(false);
  };

  // Camera Transformation: Smooth Zoom In vs. Zoomed-out Global World View
  const cameraTransform = isZoomedIn
    ? {
        scale: activeNode.zoomTarget.scale,
        x: activeNode.zoomTarget.x,
        y: activeNode.zoomTarget.y,
      }
    : {
        scale: 1,
        x: 0,
        y: 0,
      };

  return (
    <section
      id="experience"
      className="relative py-28 px-6 sm:px-12 bg-[#060609] text-white border-t border-white/10 overflow-hidden select-none"
    >
      {/* Background Ambient Radar Glows */}
      <div
        className="absolute top-1/3 left-1/4 w-[550px] h-[550px] rounded-full blur-[160px] pointer-events-none transition-all duration-700 opacity-20"
        style={{ backgroundColor: activeNode.accentColor }}
      />
      <div className="absolute -bottom-24 -right-24 w-[450px] h-[450px] bg-[#4285F4]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header with Telemetry */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono-tech text-zinc-400 uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
              <span>// GLOBAL WORK EXPERIENCE & REGIONAL DISPATCH</span>
            </div>
            <TextReveal
              text="Interactive Career Radar & Geospatial Footprint."
              as="h2"
              className="text-4xl sm:text-6xl font-bold font-serif-editorial text-white tracking-tight"
            />
          </div>

          {/* Realtime Telemetry HUD */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 text-xs font-mono-tech text-zinc-300 backdrop-blur-md shadow-md">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <LiveClock />
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 text-xs font-mono-tech text-zinc-400 backdrop-blur-md">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>TRANSCONTINENTAL (USA & INDIA)</span>
            </div>
          </div>
        </div>

        {/* Node Switcher & Zoom View Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2.5">
            {RESUME_EXPERIENCE_NODES.map((node) => {
              const isSelected = selectedNodeId === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => handleNodeSelect(node.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono-tech flex items-center gap-2 transition-all duration-300 ${
                    isSelected
                      ? 'bg-zinc-900 text-white border border-white/30 shadow-lg scale-[1.02]'
                      : 'bg-zinc-950/70 text-zinc-400 border border-white/5 hover:text-zinc-200 hover:border-white/15'
                  }`}
                  style={
                    isSelected
                      ? {
                          boxShadow: `0 0 20px ${node.glowColor}`,
                          borderColor: node.accentColor,
                        }
                      : {}
                  }
                >
                  <span
                    className={`w-2 h-2 rounded-full ${node.isCurrent ? 'bg-emerald-400 animate-pulse' : isSelected ? 'bg-white' : 'bg-zinc-600'}`}
                    style={{
                      backgroundColor: node.isCurrent ? '#34A853' : isSelected ? node.accentColor : '#52525b',
                    }}
                  />
                  <span className="font-semibold">{node.company}</span>
                  <span className="text-[10px] text-zinc-500 hidden sm:inline">
                    ({node.location.split(',')[0]})
                  </span>
                  {node.isCurrent && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      PRESENT
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Interactive Camera Zoom Level Controls */}
          <div className="flex items-center gap-2 text-xs font-mono-tech">
            {isZoomedIn ? (
              <button
                onClick={handleResetZoom}
                className="px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-white/15 text-zinc-300 hover:text-white hover:border-white/30 flex items-center gap-1.5 transition-all shadow-md"
              >
                <ZoomOut className="w-3.5 h-3.5 text-amber-400" />
                <span>ZOOM OUT (WORLD VIEW)</span>
              </button>
            ) : (
              <span className="px-3 py-1 rounded-lg bg-zinc-950 border border-white/5 text-zinc-500 flex items-center gap-1.5">
                <ZoomIn className="w-3.5 h-3.5 text-zinc-400" />
                <span>CLICK ANY EXPERIENCE TO ZOOM IN</span>
              </span>
            )}
          </div>
        </div>

        {/* Main Grid: Vast World Vector Canvas + Telemetry Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Top: Zoomable Vast World Cartographic Canvas (7 cols) */}
          <div className="lg:col-span-7 bg-[#0a0a0f] border border-white/10 rounded-3xl p-5 sm:p-7 relative overflow-hidden shadow-2xl backdrop-blur-xl group">
            {/* Top Bar Readout */}
            <div className="flex items-center justify-between text-[10px] font-mono-tech text-zinc-500 border-b border-white/8 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-zinc-400">
                  {isZoomedIn ? `FOCUSED: ${activeNode.location.toUpperCase()}` : 'GLOBAL OVERVIEW // WORLD MAP'}
                </span>
                <span>•</span>
                <span>GRID: ORTHOGRAPHIC 10°</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>1 PRESENT ON-SITE</span>
              </div>
            </div>

            {/* Canvas Viewport with Clean World SVG Topology */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-[#050508] rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center">
              {/* Smooth Camera Motion Container */}
              <motion.div
                animate={cameraTransform}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full flex items-center justify-center origin-center"
              >
                {/* Global World Vector Map (Vast, Clean, Accurate) */}
                <svg
                  viewBox="0 0 1000 500"
                  className="w-full h-full object-cover opacity-80 filter contrast-[1.15]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern id="worldDotGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="0.8" fill="rgba(255,255,255,0.06)" />
                    </pattern>
                    <linearGradient id="transatlanticArc" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.7" />
                      <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#34A853" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>

                  {/* Dot Grid Background */}
                  <rect width="100%" height="100%" fill="url(#worldDotGrid)" />

                  {/* Latitude / Longitude Guide Lines */}
                  <line x1="0" y1="250" x2="1000" y2="250" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 4" />
                  <line x1="500" y1="0" x2="500" y2="500" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 4" />

                  {/* --- Continental Geometric Vectors (Vast Global World Map) --- */}
                  {/* North America (with Virginia region) */}
                  <path
                    d="M 120 70 Q 200 60 270 100 T 290 180 T 240 210 T 235 180 T 210 240 T 170 290 T 130 220 T 100 140 Z"
                    fill="rgba(255,255,255,0.02)"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="1"
                    strokeDasharray="2 3"
                  />
                  {/* South America */}
                  <path
                    d="M 260 270 Q 320 280 340 330 T 310 420 T 270 470 T 250 370 Z"
                    fill="rgba(255,255,255,0.015)"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="0.8"
                  />
                  {/* Europe */}
                  <path
                    d="M 460 90 Q 530 80 560 130 T 520 180 T 470 170 T 450 120 Z"
                    fill="rgba(255,255,255,0.02)"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="0.8"
                  />
                  {/* Africa */}
                  <path
                    d="M 470 190 Q 550 200 580 260 T 550 380 T 490 390 T 460 270 Z"
                    fill="rgba(255,255,255,0.015)"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="0.8"
                  />
                  {/* Asia & Indian Subcontinent */}
                  <path
                    d="M 570 80 Q 700 70 820 120 T 870 200 T 780 260 T 710 320 T 680 300 T 650 220 T 580 160 Z"
                    fill="rgba(255,255,255,0.025)"
                    stroke="rgba(255,255,255,0.14)"
                    strokeWidth="1"
                    strokeDasharray="2 3"
                  />
                  {/* Australia */}
                  <path
                    d="M 800 330 Q 880 320 900 380 T 830 420 T 780 370 Z"
                    fill="rgba(255,255,255,0.015)"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="0.8"
                  />

                  {/* Transatlantic Flight Arc: Vienna, Virginia USA (235, 180) -> India (690, 290) */}
                  <path
                    d="M 235 180 Q 460 40 690 290"
                    fill="none"
                    stroke="url(#transatlanticArc)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    className="opacity-70 animate-pulse"
                  />

                  {/* Inter-India Regional Connection Arcs (Mumbai, Hyderabad, Chennai, Kochi) */}
                  <path
                    d="M 670 252 Q 698 260 690 290"
                    fill="none"
                    stroke="rgba(52,168,83,0.4)"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                  <path
                    d="M 708 277 Q 700 285 690 290"
                    fill="none"
                    stroke="rgba(52,168,83,0.4)"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />

                  {/* Current Active Concentric Ring (Kochi, Kerala: 690, 290) */}
                  <circle cx="690" cy="290" r="24" fill="none" stroke="rgba(52,168,83,0.35)" strokeWidth="0.75" strokeDasharray="3 3" />
                  <circle cx="690" cy="290" r="7" fill="none" stroke="#34A853" strokeWidth="1" opacity="0.9" />
                </svg>

                {/* Hotspot Beacons for each Resume Experience Node */}
                {RESUME_EXPERIENCE_NODES.map((node) => {
                  const isSelected = selectedNodeId === node.id;
                  const isCurrent = node.isCurrent;

                  return (
                    <button
                      key={node.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNodeSelect(node.id);
                      }}
                      style={{ left: `${node.x}%`, top: `${node.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group/pin focus:outline-none cursor-pointer"
                      aria-label={`${node.company} - ${node.location}`}
                    >
                      {/* ONLY the Current/Present experience has the live vibrant pulsing wave */}
                      {isCurrent && (
                        <span className="absolute -inset-3 rounded-full bg-emerald-500/40 animate-ping pointer-events-none" />
                      )}

                      {/* Beacon Core Pin */}
                      <div
                        className={`relative rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-2xl ${
                          isCurrent
                            ? 'w-5 h-5 bg-zinc-950 border-emerald-400 shadow-[0_0_20px_rgba(52,168,83,0.7)]'
                            : isSelected
                            ? 'w-5 h-5 bg-zinc-950 border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                            : 'w-3.5 h-3.5 bg-zinc-900 border-zinc-600 group-hover/pin:border-zinc-400'
                        }`}
                        style={
                          isCurrent
                            ? { borderColor: '#34A853' }
                            : isSelected
                            ? { borderColor: node.accentColor }
                            : {}
                        }
                      >
                        <div
                          className={`rounded-full transition-transform duration-300 ${
                            isCurrent
                              ? 'w-2 h-2 bg-emerald-400 scale-100'
                              : isSelected
                              ? 'w-2 h-2 scale-100'
                              : 'w-1.5 h-1.5 bg-zinc-500 group-hover/pin:scale-125'
                          }`}
                          style={
                            isCurrent
                              ? { backgroundColor: '#34A853' }
                              : isSelected
                              ? { backgroundColor: node.accentColor }
                              : {}
                          }
                        />
                      </div>

                      {/* Tooltip Label */}
                      <div
                        className={`absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-0.5 rounded bg-black/90 border border-white/20 text-[9px] font-mono-tech whitespace-nowrap text-white shadow-xl transition-all duration-300 pointer-events-none ${
                          isSelected || isCurrent
                            ? 'opacity-100 translate-y-0 scale-100'
                            : 'opacity-0 -translate-y-1 scale-90 group-hover/pin:opacity-100 group-hover/pin:translate-y-0'
                        }`}
                      >
                        <span className={isCurrent ? 'text-emerald-300 font-bold' : 'text-zinc-300'}>
                          {node.company}
                        </span>{' '}
                        <span className="text-zinc-500">• {node.location.split(',')[0]}</span>
                      </div>
                    </button>
                  );
                })}
              </motion.div>
            </div>

            {/* Bottom Coordinates Strip */}
            <div className="mt-4 pt-3 border-t border-white/8 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-tech text-zinc-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-white font-medium">{activeNode.location}</span>
              </div>
              <div className="text-[11px] text-zinc-500">
                COORDINATES: {activeNode.latLong}
              </div>
            </div>
          </div>

          {/* Right / Bottom: Selected Node Telemetry Dispatch Terminal (5 cols) */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="p-7 sm:p-9 rounded-3xl bg-[#0d0d12]/95 border border-white/15 shadow-2xl relative overflow-hidden backdrop-blur-xl group"
                style={{
                  boxShadow: `0 25px 65px -15px ${activeNode.glowColor}, 0 0 35px ${activeNode.glowColor}`,
                }}
              >
                {/* Accent Top Strip */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: activeNode.accentColor }}
                />

                {/* Node Status Pill & Period */}
                <div className="flex items-center justify-between gap-4 mb-6 border-b border-white/8 pb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-mono-tech font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider"
                      style={{
                        backgroundColor: `${activeNode.accentColor}20`,
                        color: activeNode.accentColor,
                        border: `1px solid ${activeNode.accentColor}40`,
                      }}
                    >
                      {activeNode.type}
                    </span>
                  </div>

                  <span className="flex items-center gap-1 text-xs font-mono-tech text-zinc-300">
                    <Calendar className="w-3.5 h-3.5 text-zinc-400" /> {activeNode.period}
                  </span>
                </div>

                {/* Company & Role Headline */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-400 mb-1">
                    <Building2 className="w-3.5 h-3.5" style={{ color: activeNode.accentColor }} />
                    <span>{activeNode.location}</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold font-serif-editorial text-white tracking-tight mb-1 flex items-center gap-2">
                    {activeNode.company}
                    <ArrowUpRight
                      className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity"
                      style={{ color: activeNode.accentColor }}
                    />
                  </h3>
                  <div className="text-sm font-semibold text-zinc-200 mb-2">
                    {activeNode.role}
                  </div>
                </div>

                {/* Quantitative Benchmark KPI Matrix */}
                <div className="grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-zinc-950/80 border border-white/8 mb-6 shadow-inner">
                  {activeNode.metrics.map((m, idx) => (
                    <div key={idx} className="text-center">
                      <div
                        className="text-sm sm:text-base font-bold font-mono-tech truncate"
                        style={{ color: activeNode.accentColor }}
                      >
                        {m.value}
                      </div>
                      <div className="text-[9px] font-mono-tech text-zinc-400 uppercase tracking-wider truncate">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Highlights List from Resume */}
                <div className="mb-6">
                  <h4 className="text-xs font-mono-tech uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" /> Key Deliverables & Systems Impact
                  </h4>
                  <ul className="space-y-2.5">
                    {activeNode.highlights.map((h, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs text-zinc-300 font-light leading-relaxed"
                      >
                        <CheckCircle2
                          className="w-3.5 h-3.5 mt-0.5 shrink-0"
                          style={{ color: activeNode.accentColor }}
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Matrix */}
                <div className="pt-4 border-t border-white/8">
                  <div className="text-[10px] font-mono-tech uppercase text-zinc-400 mb-2">
                    Technologies & Infra:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeNode.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono-tech px-2.5 py-0.5 rounded-md bg-zinc-900/90 text-zinc-300 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
