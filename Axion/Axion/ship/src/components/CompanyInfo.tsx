"use client";

import { motion } from "framer-motion";
import { Shield, Target, Compass, BarChart3, ChevronLeft, Zap } from "lucide-react";

interface CompanyInfoProps {
  onBack: () => void;
}

export default function CompanyInfo({ onBack }: CompanyInfoProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#01030a] py-20 px-6 flex flex-col items-center justify-center overflow-hidden font-sans">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-sky-500/10 blur-[150px] rounded-full" />
        {/* Moving Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [transform:perspective(1000px)_rotateX(60deg)_translateY(-200px)] animate-pulse" />
      </div>

      <div className="max-w-6xl w-full relative z-10 flex flex-col items-center">
        {/* Top Back Action */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="self-start flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full hover:bg-white/10"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase">Return to Portal</span>
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-6">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-[10px] font-black tracking-[0.4em] text-purple-300 uppercase italic">Enterprise Briefing</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-6">
            Inside <span className="text-sky-500 neon-text">AXION</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-base font-light italic leading-relaxed">
            Architecting the future of career exploration through high-fidelity cognitive simulation.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
        >
          {/* Card 1: Our Mission */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -8, borderColor: "rgba(14,165,233,0.4)" }}
            className="group relative flex flex-col justify-between p-10 rounded-[2.5rem] bg-gradient-to-b from-slate-900/40 to-slate-900/10 backdrop-blur-xl border border-white/5 shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div>
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-8 border border-purple-500/20 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-[11px] font-black tracking-[0.3em] text-purple-400 uppercase mb-4">01 // THE PURPOSE</h2>
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-tight mb-6">
                Our Mission
              </h3>
              <p className="text-slate-300 text-sm font-medium leading-relaxed">
                Helping students experience careers before choosing them.
              </p>
            </div>
            <div className="mt-12 text-[10px] font-mono text-slate-600 uppercase tracking-widest">
              Core Objective // Active
            </div>
          </motion.div>

          {/* Card 2: Why We Exist (Statistic Card) */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -8, borderColor: "rgba(14,165,233,0.4)" }}
            className="group relative flex flex-col justify-between p-10 rounded-[2.5rem] bg-gradient-to-b from-slate-900/40 to-slate-900/10 backdrop-blur-xl border border-sky-500/20 shadow-[0_0_50px_rgba(14,165,233,0.05)] transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div>
              <div className="w-14 h-14 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-400 mb-8 border border-sky-500/20 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h2 className="text-[11px] font-black tracking-[0.3em] text-sky-400 uppercase mb-4">02 // REAL-WORLD CRISIS</h2>
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-tight mb-4">
                Why We Exist
              </h3>
              
              {/* Massive Statistic */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-black text-sky-500 neon-text">85%</span>
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">of Students</span>
              </div>
              
              <p className="text-slate-300 text-sm font-medium leading-relaxed">
                make career decisions without real exposure to professions. AXION bridges this gap through immersive AI simulations.
              </p>
            </div>
            <div className="mt-8 text-[10px] font-mono text-slate-500 uppercase tracking-widest animate-pulse">
              Blind Decision Crisis // Targeted
            </div>
          </motion.div>

          {/* Card 3: Our Vision */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -8, borderColor: "rgba(14,165,233,0.4)" }}
            className="group relative flex flex-col justify-between p-10 rounded-[2.5rem] bg-gradient-to-b from-slate-900/40 to-slate-900/10 backdrop-blur-xl border border-white/5 shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div>
              <div className="w-14 h-14 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-400 mb-8 border border-pink-500/20 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <h2 className="text-[11px] font-black tracking-[0.3em] text-pink-400 uppercase mb-4">03 // FUTURE OUTLOOK</h2>
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-tight mb-6">
                Our Vision
              </h3>
              <p className="text-slate-300 text-sm font-medium leading-relaxed">
                A future where every student chooses a career with confidence and clarity.
              </p>
            </div>
            <div className="mt-12 text-[10px] font-mono text-slate-600 uppercase tracking-widest">
              Long-term Horizon // Locked
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
