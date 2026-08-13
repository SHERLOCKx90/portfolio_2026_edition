'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import {
  Mail,
  Copy,
  Check,
  Send,
  Sparkles,
  MessageSquare,
  MapPin,
  Clock,
  ArrowUpRight,
  Smile,
  Pin,
  Stamp,
} from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolio-data';
import { TextReveal } from '@/components/ui/text-reveal';

export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
    }, 1200);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative py-32 px-6 sm:px-12 bg-[#050508] text-white overflow-hidden border-t border-white/10"
    >
      {/* Background Chromatic Radial Glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_35%,rgba(66,133,244,0.12),transparent_55%),radial-gradient(circle_at_80%_65%,rgba(234,67,53,0.08),transparent_55%)]" />

      {/* Grid Background Overlay */}
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Keynote Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-white/15 text-xs font-mono-tech text-zinc-300 mb-6 backdrop-blur-md shadow-lg"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>DIRECT ACCESS // INBOX OPEN</span>
          </motion.div>

          <TextReveal
            text="Let's build something extraordinary together."
            as="h2"
            className="text-4xl sm:text-6xl font-bold font-serif-editorial text-white tracking-tight leading-tight mb-6"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-zinc-400 font-light max-w-xl mx-auto leading-relaxed"
          >
            Have a project in mind, an architectural challenge to tackle, or an engineering role? Drop me a message below.
          </motion.p>
        </div>

        {/* Animated Conversation Split: Scrapbook Photo + Comic Dialogue -> Form Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT COLUMN: Large Scrapbook Photo + Comic Dialogue Cloud */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start relative">
            {/* Step 2: Comic Dialogue Cloud Pop-Up (Appears after ~0.9s delay) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: 20 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1, y: 0 }
                  : { opacity: 0, scale: 0.6, y: 20 }
              }
              transition={{
                delay: 0.9,
                duration: 0.5,
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
              className="relative mb-4 z-20 w-fit max-w-[330px]"
            >
              {/* Comic Speech Balloon Container */}
              <div className="relative px-5 py-3.5 rounded-[26px] rounded-bl-[4px] bg-white text-zinc-950 shadow-[0_15px_35px_rgba(0,0,0,0.5),0_2px_8px_rgba(0,0,0,0.08)] border border-zinc-200/90">
                {/* Speech Bubble Comic Tail */}
                <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white border-r border-b border-zinc-200/90 transform rotate-45" />

                {/* Header inside comic bubble */}
                <div className="flex items-center justify-between gap-3 mb-1.5 pb-1.5 border-b border-zinc-100 text-[9px] font-mono-tech uppercase font-bold text-zinc-500">
                  <span className="flex items-center gap-1 text-[#4285F4]">
                    <Sparkles className="w-3 h-3" /> Subhadeep Chell
                  </span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    ONLINE
                  </span>
                </div>

                {/* The Comic Dialogue Text */}
                <p className="text-[13px] sm:text-sm font-bold font-sans tracking-tight text-zinc-900 leading-snug">
                  “Hey There! Let’s connect. Drop your thoughts here.” 👋
                </p>

                <p className="text-[10.5px] text-zinc-500 mt-1 font-normal leading-normal">
                  I read every message and respond promptly within 24 hours.
                </p>
              </div>
            </motion.div>

            {/* Step 1: Big Scrapbook Photo (Appears first at 0.2s) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1, rotate: -2 }
                  : { opacity: 0, scale: 0.9, rotate: -4 }
              }
              transition={{
                delay: 0.2,
                duration: 0.7,
                type: 'spring',
                stiffness: 200,
                damping: 18,
              }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              className="relative group cursor-pointer w-full max-w-md"
            >
              {/* Scrapbook Tape / Memo Pin at Top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-amber-100/60 border border-amber-200/40 backdrop-blur-sm shadow-sm rotate-1 z-30 pointer-events-none rounded-sm" />

              {/* Metallic Push Pin at Top Corner */}
              <div className="absolute -top-2 left-6 w-5 h-5 rounded-full bg-gradient-to-br from-red-500 to-rose-700 shadow-md border border-white/40 z-30 flex items-center justify-center pointer-events-none">
                <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
              </div>

              {/* Scrapbook Frame Card (No thick white border, sleek matte dark backing) */}
              <div className="p-3 sm:p-4 rounded-3xl bg-[#0c0c14] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative overflow-hidden backdrop-blur-2xl">
                {/* Large Portrait Photo Container */}
                <div className="relative w-full h-[380px] sm:h-[430px] rounded-2xl overflow-hidden bg-zinc-950">
                  <Image
                    src="/images/subhadeep-contact.jpg"
                    alt="Subhadeep Chell"
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 450px"
                    priority
                  />

                  {/* Subtle Gradient vignette at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {/* Glass ID Ribbon at bottom of photo */}
                  <div className="absolute bottom-3 left-3 right-3 px-3.5 py-2 rounded-xl bg-black/65 backdrop-blur-md border border-white/15 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold font-sans text-white tracking-wide">
                        Subhadeep Chell
                      </div>
                      <div className="text-[10px] font-mono-tech text-zinc-400">
                        Full Stack Engineer & AI Specialist
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono-tech">
                      AVAILABLE
                    </span>
                  </div>
                </div>

                {/* Scrapbook Polaroid Stamp & Memo */}
                <div className="mt-3 px-2 flex items-center justify-between text-[11px] font-mono-tech text-zinc-400">
                  <span className="flex items-center gap-1 text-zinc-300">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span>KOLKATA, IN / ON-SITE</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-zinc-300 font-mono-tech">
                    © 2026 EDITION
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Quick Email Copy Drawer below photo */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="mt-6 w-full max-w-md p-3.5 rounded-2xl bg-zinc-950/80 border border-white/10 flex items-center justify-between gap-3 shadow-lg backdrop-blur-md"
            >
              <div className="flex items-center gap-2.5 truncate text-xs font-mono-tech text-zinc-300">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="truncate">{PERSONAL_INFO.email}</span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white transition-colors text-[11px] font-mono-tech shrink-0 flex items-center gap-1.5 cursor-pointer"
                title="Copy Email"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Interactive Contact Form Card (Appears after comic dialogue at ~1.4s delay) */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.96 }}
            animate={
              isInView
                ? { opacity: 1, x: 0, scale: 1 }
                : { opacity: 0, x: 30, scale: 0.96 }
            }
            transition={{
              delay: 1.4,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:col-span-7"
          >
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0d0d14]/90 border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl relative overflow-hidden">
              {/* Subtle Top Accent Strip */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853]" />

              {/* Form Title */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-serif-editorial text-white tracking-tight">
                    Share Your Thoughts
                  </h3>
                  {/* <p className="text-xs text-zinc-400 font-mono-tech mt-1">
                    Delivered straight to Subhadeep’s primary inbox
                  </p> */}
                </div>
                <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400">
                  <MessageSquare className="w-5 h-5 text-[#4285F4]" />
                </div>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto shadow-[0_0_25px_rgba(52,168,83,0.3)]">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-bold font-serif-editorial text-white">
                    Message Sent!
                  </h3>
                  <p className="text-sm text-zinc-300 font-light max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out, <span className="text-white font-medium">{formState.name || 'there'}</span>. Subhadeep has received your note and will reply promptly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-mono-tech text-zinc-400 hover:text-white underline pt-4 transition-colors cursor-pointer"
                  >
                    Have another thought? ↺
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono-tech text-zinc-400 uppercase tracking-wider mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-4 py-3.5 rounded-xl bg-zinc-950/80 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] transition-all text-sm font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-tech text-zinc-400 uppercase tracking-wider mb-2">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="e.g. alex@company.com"
                        className="w-full px-4 py-3.5 rounded-xl bg-zinc-950/80 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] transition-all text-sm font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tech text-zinc-400 uppercase tracking-wider mb-2">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Share your engineering requirements, project ideas, or role details..."
                      className="w-full px-4 py-3.5 rounded-xl bg-zinc-950/80 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] transition-all text-sm font-sans resize-none"
                    />
                  </div>

                  {/* Submit Button with High-Impact Feedback */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-sm font-mono-tech flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_10px_30px_rgba(255,255,255,0.15)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                        Sending to Subhadeep...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <span>Send</span>
                        <Send className="w-4 h-4 text-black" />
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
