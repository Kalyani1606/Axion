"use client";

import { motion } from "framer-motion";
import { 
  Award, 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Map, 
  RefreshCcw,
  Shield,
  Zap,
  Users,
  MessageCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UserData {
  name: string;
  age: string;
  traits: string[];
  performance: {
    leadership: number;
    teamwork: number;
    stress: number;
    communication: number;
  };
}

interface ReportProps {
  userData: UserData;
  onRestart: () => void;
}

const timeline = [
  { year: "2026", title: "Join Academy", impact: "Training Begins", salary: "₹50k" },
  { year: "2028", title: "4th Engineer", impact: "First Ocean Crossing", salary: "₹1.5L" },
  { year: "2032", title: "2nd Engineer", impact: "Leadership Role", salary: "₹3.5L" },
  { year: "2038", title: "Chief Engineer", impact: "Commanding Horizon", salary: "₹8L+" },
];

export default function Report({ userData, onRestart }: ReportProps) {
  const p = userData.performance;

  return (
    <div className="relative min-h-screen w-full bg-slate-950 py-20 px-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 font-mono text-xs uppercase tracking-widest mb-6">
            <Award className="w-4 h-4" />
            Simulation Analysis Complete
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
            Career Compatibility <span className="text-sky-500">Report</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Neural analysis of Cadet <span className="text-white font-bold">{userData.name}</span> suggests a 
            <span className="text-sky-400 font-bold"> 94% match</span> for Merchant Navy Operations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Performance Stats */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-sky-500" />
                Performance Metrics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { label: "Leadership", val: p.leadership, icon: Shield, color: "sky" },
                  { label: "Stress Handling", val: p.stress, icon: Zap, color: "amber" },
                  { label: "Teamwork", val: p.teamwork, icon: Users, color: "emerald" },
                  { label: "Communication", val: p.communication, icon: MessageCircle, color: "purple" },
                ].map((stat) => (
                  <div key={stat.label} className="space-y-3">
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-2">
                        <stat.icon className={`w-4 h-4 text-${stat.color}-500`} />
                        <span className="text-xs font-mono uppercase tracking-widest text-slate-400">{stat.label}</span>
                      </div>
                      <span className="text-xl font-bold text-white">{stat.val}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.val}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full bg-sky-500 shadow-[0_0_10px_#0ea5e9]`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-card p-6 border-emerald-500/20">
                <h4 className="text-emerald-400 font-bold uppercase text-sm mb-4">Core Strengths</h4>
                <ul className="space-y-3">
                  {["Calm under pressure", "Decisive action in storms", "Strong technical intuition"].map(s => (
                    <li key={s} className="text-slate-300 text-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-card p-6 border-rose-500/20">
                <h4 className="text-rose-400 font-bold uppercase text-sm mb-4">Development Areas</h4>
                <ul className="space-y-3">
                  {["Crew delegation", "Documentation speed", "Isolation management"].map(s => (
                    <li key={s} className="text-slate-300 text-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Future Timeline */}
          <div className="glass-card p-8 border-sky-500/20">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-sky-500" />
              Future Timeline
            </h3>
            <div className="space-y-8 relative">
              <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-slate-800" />
              {timeline.map((item, i) => (
                <motion.div 
                  key={item.year}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="relative pl-12"
                >
                  <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-sky-500 border-4 border-slate-900" />
                  <span className="text-[10px] font-mono text-sky-500 uppercase tracking-widest">{item.year}</span>
                  <h4 className="text-white font-bold">{item.title}</h4>
                  <p className="text-[10px] text-slate-500 uppercase mb-1">{item.impact}</p>
                  <p className="text-xs font-bold text-emerald-400">Est. Salary: {item.salary}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-8 mt-20">
          <button 
            onClick={onRestart}
            className="btn-primary flex items-center gap-3"
          >
            <RefreshCcw className="w-5 h-5" />
            Restart Simulation
          </button>
          <div className="text-[10px] text-slate-600 font-mono uppercase tracking-[0.4em]">
            Neural Session End // Secure Connection
          </div>
        </div>
      </div>
    </div>
  );
}
