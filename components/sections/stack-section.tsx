'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Layers,
  Sparkles,
  Terminal,
  Code2,
  Database,
  Cloud,
  CheckCircle2,
  Zap,
  ShieldCheck,
  LayoutGrid,
  Braces,
  GitBranch,
  Bot,
  TestTube2,
  ArrowUpRight,
} from 'lucide-react';
import { TextReveal } from '@/components/ui/text-reveal';

interface SkillSpec {
  name: string;
  category: string;
  tier: 'CORE PRODUCTION' | 'SYSTEMS ARCHITECTURE' | 'CLOUD & DEVOPS' | 'AI & RESEARCH' | 'AUTOMATION';
  experienceYears: string;
  productionContext: string;
  keyCapability: string;
  icon: React.ElementType;
  accentColor: string;
  glowColor: string;
  benchmark: string;
  tags: string[];
}

const SKILL_MODULES: SkillSpec[] = [
  // 1. Languages
  {
    name: 'Java',
    category: 'Languages',
    tier: 'CORE PRODUCTION',
    experienceYears: 'Enterprise Core',
    productionContext: 'High-throughput microservices, clean OOP design patterns, and backend architectures at Cognizant.',
    keyCapability: 'Clean Architecture, Multithreading, Enterprise Microservices',
    icon: Code2,
    accentColor: '#EA4335',
    glowColor: 'rgba(234, 67, 53, 0.35)',
    benchmark: '<120ms REST Latency',
    tags: ['Java 17+', 'OOP', 'Multithreading', 'Enterprise APIs'],
  },
  {
    name: 'JavaScript / TypeScript',
    category: 'Languages',
    tier: 'CORE PRODUCTION',
    experienceYears: 'Full-Stack Lead',
    productionContext: 'Type-safe React platforms, Next.js 15 apps, and asynchronous Node.js microservices.',
    keyCapability: 'Strict Type Safety, Generics, Async Event Loops, Modern ESNext',
    icon: Braces,
    accentColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.35)',
    benchmark: '100% Strict Null Checks',
    tags: ['TypeScript 5+', 'ESNext', 'Generics', 'Node.js'],
  },
  {
    name: 'Python',
    category: 'Languages',
    tier: 'AI & RESEARCH',
    experienceYears: 'Applied ML',
    productionContext: 'LangChain agent pipelines, FAISS RAG retrieval, FastAPI backends, and PyTorch RL in BookFlow.',
    keyCapability: 'Async FastAPI, Vector Embeddings, Transformer Models, PyTorch',
    icon: Bot,
    accentColor: '#FBBC05',
    glowColor: 'rgba(251, 188, 5, 0.35)',
    benchmark: 'Sub-second AI Inference',
    tags: ['FastAPI', 'LangChain', 'PyTorch', 'Hugging Face'],
  },
  {
    name: 'SQL & Database Systems',
    category: 'Languages',
    tier: 'SYSTEMS ARCHITECTURE',
    experienceYears: 'High Throughput',
    productionContext: 'Normalized relational schemas, query tuning, subqueries, and indexing for MySQL & PostgreSQL.',
    keyCapability: 'Indexing, Query Optimization, Foreign Key Constraints, Transactions',
    icon: Database,
    accentColor: '#34A853',
    glowColor: 'rgba(52, 168, 83, 0.35)',
    benchmark: '+38% SQL Throughput',
    tags: ['MySQL', 'PostgreSQL', 'Complex JOINs', 'Index Tuning'],
  },

  // 2. Frameworks & Backend
  {
    name: 'Spring Boot',
    category: 'Backend',
    tier: 'SYSTEMS ARCHITECTURE',
    experienceYears: 'Enterprise Tier',
    productionContext: 'Built User, Course Management, and Event Scheduler services for Cognizant Skillspring.',
    keyCapability: 'Spring MVC, Spring Security, JPA/Hibernate, Microservice Orchestration',
    icon: Layers,
    accentColor: '#34A853',
    glowColor: 'rgba(52, 168, 83, 0.35)',
    benchmark: 'Zero-Downtime Microservices',
    tags: ['Spring Boot 3', 'Spring MVC', 'Spring Data JPA', 'REST APIs'],
  },
  {
    name: 'React & Next.js 15',
    category: 'Frontend',
    tier: 'CORE PRODUCTION',
    experienceYears: 'Production Lead',
    productionContext: 'Crafted modular design systems for Course Compass (+42% render speed) and QueryLens AI UI.',
    keyCapability: 'App Router, Server Components, Redux Toolkit, Custom Hooks, Motion',
    icon: Cpu,
    accentColor: '#4285F4',
    glowColor: 'rgba(66, 133, 244, 0.35)',
    benchmark: '60 FPS Smooth Render',
    tags: ['React 19', 'Next.js 15', 'Redux', 'Shadcn UI', 'Tailwind'],
  },
  {
    name: 'Node.js & Express.js',
    category: 'Backend',
    tier: 'CORE PRODUCTION',
    experienceYears: 'Asynchronous Core',
    productionContext: 'RESTful API integration, middleware routing, and microservice backend integration.',
    keyCapability: 'Asynchronous I/O, JWT Authentication, REST API Design, Middleware',
    icon: Zap,
    accentColor: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.35)',
    benchmark: 'High-Concurrency Event Loop',
    tags: ['REST APIs', 'JWT Auth', 'Middleware', 'Prisma ORM'],
  },
  {
    name: 'FastAPI & Flask',
    category: 'Backend',
    tier: 'AI & RESEARCH',
    experienceYears: 'AI Backend',
    productionContext: 'Asynchronous Python endpoints serving LangChain workflows, FAISS retrieval, and BERT models.',
    keyCapability: 'Async Python, Pydantic Schema Validation, OpenAPI Swagger, SQLAlchemy',
    icon: Terminal,
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.35)',
    benchmark: '<15ms Route Overhead',
    tags: ['FastAPI', 'Flask', 'SQLAlchemy', 'Pydantic'],
  },

  // 3. Cloud & Databases
  {
    name: 'AWS Cloud & DynamoDB',
    category: 'Cloud & DB',
    tier: 'CLOUD & DEVOPS',
    experienceYears: 'AWS NoSQL',
    productionContext: 'Engineered DynamoDB schemas and Global Secondary Indexes (GSIs) to resolve API errors at Cognizant.',
    keyCapability: 'DynamoDB GSIs, AWS S3, IAM Security Policies, Cloud Deployments',
    icon: Cloud,
    accentColor: '#FBBC05',
    glowColor: 'rgba(251, 188, 5, 0.35)',
    benchmark: 'AWS DynamoDB GSIs',
    tags: ['DynamoDB', 'AWS S3', 'GSI Indexing', 'AWS Cloud'],
  },
  {
    name: 'Google Cloud (GCP)',
    category: 'Cloud & DB',
    tier: 'CLOUD & DEVOPS',
    experienceYears: 'Google Certified',
    productionContext: 'Google Cloud Certified Cloud Digital Leader (2023) & Computing Foundations certified.',
    keyCapability: 'Cloud Compute, Cloud Storage, VPC Networking, Cloud Security',
    icon: ShieldCheck,
    accentColor: '#4285F4',
    glowColor: 'rgba(66, 133, 244, 0.35)',
    benchmark: 'Google Cloud Digital Leader',
    tags: ['GCP Certified', 'Cloud Foundations', 'Cloud Architecture'],
  },
  {
    name: 'Docker & Containers',
    category: 'Cloud & DB',
    tier: 'CLOUD & DEVOPS',
    experienceYears: 'Container Deploy',
    productionContext: 'Containerized Spring Boot microservices and React frontends for consistent CI/CD delivery.',
    keyCapability: 'Dockerfile Optimization, Multi-Stage Builds, Container Networking',
    icon: GitBranch,
    accentColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.35)',
    benchmark: 'Multi-Stage Micro-Containers',
    tags: ['Docker', 'Containers', 'CI/CD', 'Compose'],
  },

  // 4. Testing & AI
  {
    name: 'Selenium & TestNG',
    category: 'Automation',
    tier: 'AUTOMATION',
    experienceYears: 'Test Automation',
    productionContext: 'Architected modular automated test suites using Java, Selenium WebDriver, POM, and TestNG at Cognizant.',
    keyCapability: 'Page Object Model (POM), TestNG, Selenium WebDriver, Cucumber BDD',
    icon: TestTube2,
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    benchmark: 'Modular POM Architecture',
    tags: ['Selenium WebDriver', 'TestNG', 'POM', 'Cucumber BDD'],
  },
  {
    name: 'LangChain & RAG AI',
    category: 'AI & Research',
    tier: 'AI & RESEARCH',
    experienceYears: 'Generative AI',
    productionContext: 'Constructed schema-aware conversational AI with FAISS vector retrieval in QueryLens AI.',
    keyCapability: 'RAG Retrieval, FAISS Vector Indexing, Prompt Chaining, Grounded Verification',
    icon: Bot,
    accentColor: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.35)',
    benchmark: 'Zero-Shot Grounded SQL',
    tags: ['LangChain', 'FAISS Vector DB', 'OpenAI GPT-4', 'RAG'],
  },
  {
    name: 'Figma & UI/UX Design',
    category: 'Frontend',
    tier: 'CORE PRODUCTION',
    experienceYears: 'Design Systems',
    productionContext: 'Designed navigation flows at Evanke (USA), improving navigation by 35% and user retention by 20%.',
    keyCapability: 'Design Tokens, Interactive Prototypes, User Journey Mapping, Wireframes',
    icon: LayoutGrid,
    accentColor: '#EC4899',
    glowColor: 'rgba(236, 72, 153, 0.35)',
    benchmark: '+35% Nav Efficiency',
    tags: ['Figma', 'UI/UX Flows', 'Design Tokens', 'User Research'],
  },
];

const FILTER_CATEGORIES = [
  'ALL MODULES',
  'Languages',
  'Backend',
  'Frontend',
  'Cloud & DB',
  'Automation',
  'AI & Research',
];

export function StackSection() {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL MODULES');
  const [hoveredSkill, setHoveredSkill] = useState<SkillSpec>(SKILL_MODULES[0]);

  const filteredSkills =
    selectedFilter === 'ALL MODULES'
      ? SKILL_MODULES
      : SKILL_MODULES.filter((s) => s.category === selectedFilter);

  return (
    <section
      id="stack"
      className="relative py-28 px-6 sm:px-12 bg-[#060609] text-white border-t border-white/10 overflow-hidden select-none"
    >
      {/* Specular Ambient Glow */}
      <div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none transition-all duration-700 opacity-20"
        style={{ backgroundColor: hoveredSkill.accentColor }}
      />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-[#4285F4]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono-tech text-zinc-400 uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FBBC05] animate-pulse" />
              <span>// TECHNICAL MATRIX & SILICON CAPABILITIES</span>
            </div>
            <TextReveal
              text="Engineered for scalability. Mastered through production."
              as="h2"
              className="text-4xl sm:text-6xl font-bold font-serif-editorial text-white tracking-tight"
            />
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 text-xs font-mono-tech text-zinc-400 backdrop-blur-md">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span>{SKILL_MODULES.length} VERIFIED MODULES</span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-white/8 pb-4">
          {FILTER_CATEGORIES.map((cat) => {
            const isSelected = selectedFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono-tech transition-all duration-300 ${
                  isSelected
                    ? 'bg-zinc-800 text-white font-semibold border border-white/30 shadow-lg scale-[1.02]'
                    : 'bg-zinc-950/60 text-zinc-400 border border-white/5 hover:text-white hover:border-white/15'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Main 2-Column Grid: Clean Subtle Mini Chips (7 cols) + In-Depth Telemetry Inspector (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Clean, Minimalist Mini Skill Cards (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => {
                const isHovered = hoveredSkill.name === skill.name;
                const IconComponent = skill.icon;

                return (
                  <motion.div
                    key={skill.name}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    className={`p-3.5 sm:p-4 rounded-xl border transition-all duration-300 cursor-pointer relative overflow-hidden group backdrop-blur-md flex items-center gap-3 ${
                      isHovered
                        ? 'bg-[#101018] shadow-xl scale-[1.03]'
                        : 'bg-[#0a0a0f]/80 border-white/5 hover:border-white/20'
                    }`}
                    style={
                      isHovered
                        ? {
                            borderColor: skill.accentColor,
                            boxShadow: `0 10px 25px -8px ${skill.glowColor}`,
                          }
                        : {}
                    }
                  >
                    {/* Top Micro Accent Bar on Hover */}
                    {isHovered && (
                      <div
                        className="absolute top-0 left-0 right-0 h-0.5"
                        style={{ backgroundColor: skill.accentColor }}
                      />
                    )}

                    {/* Clean Icon (Muted Grey in default, vibrant chromatic color on hover) */}
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 shrink-0 ${
                        isHovered
                          ? 'bg-zinc-900 border'
                          : 'bg-zinc-900/60 border border-white/5 text-zinc-500 group-hover:text-zinc-300'
                      }`}
                      style={
                        isHovered
                          ? {
                              borderColor: `${skill.accentColor}50`,
                              color: skill.accentColor,
                              boxShadow: `0 0 10px ${skill.glowColor}`,
                            }
                          : {}
                      }
                    >
                      <IconComponent className="w-4 h-4 transition-colors" />
                    </div>

                    {/* Skill Name */}
                    <div className="min-w-0">
                      <span
                        className={`text-xs sm:text-sm font-semibold tracking-tight truncate block transition-colors duration-200 ${
                          isHovered ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'
                        }`}
                      >
                        {skill.name}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Right: In-Depth Realtime Engineering Inspector & Telemetry HUD (5 cols) */}
          <div className="lg:col-span-5 sticky top-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={hoveredSkill.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="p-7 sm:p-9 rounded-3xl bg-[#0d0d14]/95 border border-white/15 shadow-2xl relative overflow-hidden backdrop-blur-2xl"
                style={{
                  boxShadow: `0 20px 50px -15px ${hoveredSkill.glowColor}, 0 0 30px ${hoveredSkill.glowColor}`,
                }}
              >
                {/* Silicon Module Accent Bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: hoveredSkill.accentColor }}
                />

                {/* Top Module Header */}
                <div className="flex items-center justify-between gap-4 mb-6 border-b border-white/8 pb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-mono-tech font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider"
                      style={{
                        backgroundColor: `${hoveredSkill.accentColor}20`,
                        color: hoveredSkill.accentColor,
                        border: `1px solid ${hoveredSkill.accentColor}40`,
                      }}
                    >
                      {hoveredSkill.tier}
                    </span>
                  </div>

                  <div className="text-xs font-mono-tech text-zinc-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                    <span>INSPECTOR HUD</span>
                  </div>
                </div>

                {/* Skill Name & Domain */}
                <div className="mb-6">
                  <div className="text-xs font-mono-tech text-zinc-400 uppercase tracking-wider mb-1">
                    MODULE ARCHITECTURE:
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold font-serif-editorial text-white tracking-tight mb-2">
                    {hoveredSkill.name}
                  </h3>
                  <div className="text-xs font-mono-tech text-zinc-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: hoveredSkill.accentColor }} />
                    <span>CAPABILITY: {hoveredSkill.keyCapability}</span>
                  </div>
                </div>

                {/* Production Application in Real Work */}
                <div className="mb-6 p-4 rounded-2xl bg-zinc-950/80 border border-white/8">
                  <div className="text-[10px] font-mono-tech uppercase text-zinc-400 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" style={{ color: hoveredSkill.accentColor }} />
                    <span>Verified Production Application</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                    {hoveredSkill.productionContext}
                  </p>
                </div>

                {/* Verified Performance Benchmark */}
                <div className="mb-6">
                  <div className="text-[10px] font-mono-tech uppercase text-zinc-400 mb-2">
                    VERIFIED BENCHMARK & METRIC:
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900/90 border border-white/10 flex items-center justify-between">
                    <span className="text-xs font-mono-tech text-zinc-300">Production Standard</span>
                    <span
                      className="text-xs font-mono-tech font-bold"
                      style={{ color: hoveredSkill.accentColor }}
                    >
                      {hoveredSkill.benchmark}
                    </span>
                  </div>
                </div>

                {/* Associated Technologies & Sub-skills */}
                <div className="pt-4 border-t border-white/8">
                  <div className="text-[10px] font-mono-tech uppercase text-zinc-400 mb-2">
                    Ecosystem & Tooling:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {hoveredSkill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono-tech px-2.5 py-0.5 rounded-md bg-zinc-900/90 text-zinc-300 border border-white/10"
                      >
                        {tag}
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
