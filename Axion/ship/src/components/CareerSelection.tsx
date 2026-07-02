"use client";

import { motion } from "framer-motion";
import { Ship, Stethoscope, Briefcase, Code, Scale, Settings, Sparkles, ChevronRight, Lock, Cpu, Fingerprint } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CareerSelectionProps {
  userName: string;
  onSelectMerchantNavy: () => void;
}

const careers = [
  { id: "merchant-navy", name: "Merchant Navy", icon: Ship, color: "sky", status: "Active", desc: "Command massive vessels across global oceans.", image: "/navy-image.jpeg" },
  { id: "doctor", name: "Doctor", icon: Stethoscope, color: "emerald", status: "Soon", desc: "Advanced robotic surgery and medical research.", image: "/doctor.png" },
  { id: "game-dev", name: "Game Developer", icon: Code, color: "purple", status: "Soon", desc: "Architecting hyper-realistic virtual worlds.", image: "/game-dev.png" },
  { id: "entrepreneur", name: "Entrepreneur", icon: Briefcase, color: "amber", status: "Soon", desc: "Build the next multi-planetary corporation.", image: "/entrepreneur.png" },
  { id: "lawyer", name: "Lawyer", icon: Scale, color: "rose", status: "Soon", desc: "Interstellar law and corporate mediation.", image: "/lawyer.png" },
  { id: "engineer", name: "Engineer", icon: Settings, color: "blue", status: "Soon", desc: "Design the future of planetary energy.", image: "/engineer.png" },
];

export default function CareerSelection({ userName, onSelectMerchantNavy }: CareerSelectionProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [authStatus, setAuthStatus] = useState("Verifying Identity...");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    
    const timer = setTimeout(() => setAuthStatus("Identity Confirmed. Access Granted."), 2000);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#01030a] py-16 px-6 overflow-x-hidden">
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.05)_0%,transparent_70%)]" />
        <motion.div 
          className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"
          animate={{ x: mousePos.x * -0.2, y: mousePos.y * -0.2 }}
        />
        {/* Moving Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [transform:perspective(1000px)_rotateX(60deg)_translateY(-200px)]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Authentication Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-sky-500/30" />
            <div className="flex items-center gap-2 px-4 py-1 rounded-full border border-sky-500/30 bg-sky-500/5 backdrop-blur-md">
              <Fingerprint className="w-3 h-3 text-sky-400 animate-pulse" />
              <span className="text-[10px] font-mono text-sky-400 uppercase tracking-[0.3em]">{authStatus}</span>
            </div>
            <div className="h-[1px] w-12 bg-sky-500/30" />
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter text-center">
            The Career <span className="text-sky-500 neon-text">Vault</span>
          </h1>
          <p className="text-slate-500 mt-4 font-light italic tracking-wide text-center">
            Welcome back, Cadet <span className="text-white font-bold">{userName}</span>. Which future will you simulate today?
          </p>
        </motion.div>

        {/* Career Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
          {careers.map((career, i) => (
            <motion.div
              key={career.id}
              initial={{ opacity: 0, x: i % 3 === 0 ? -50 : i % 3 === 2 ? 50 : 0, y: 50 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: "easeOut" }}
              whileHover={career.status === "Active" ? { 
                scale: 1.02, 
                rotateY: mousePos.x * 0.1,
                rotateX: mousePos.y * -0.1
              } : {}}
              onClick={() => {
                if (career.id === "merchant-navy") {
                  onSelectMerchantNavy();
                }
              }}
              className={cn(
                "group relative h-[450px] rounded-[2rem] overflow-hidden border transition-all duration-700",
                career.status === "Active" 
                  ? "border-sky-500/30 cursor-pointer bg-slate-900/20" 
                  : "border-slate-800/40 opacity-40 grayscale cursor-not-allowed"
              )}
            >
              {/* Card Holographic Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/3px-tile.png')] opacity-[0.02]" />
              
              {/* Career Image Background */}
              {career.image && (
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-700"
                  style={{ backgroundImage: `url(${career.image})` }}
                />
              )}
              
              {/* Scanning Light Effect */}
              {career.status === "Active" && (
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-500/10 to-transparent h-1/2 w-full z-10 pointer-events-none"
                  animate={{ y: ["-100%", "200%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              )}

              {/* Status Header */}
              <div className="absolute top-8 left-8 flex items-center justify-between w-[calc(100%-64px)] z-20">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    career.status === "Active" ? "bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" : "bg-slate-600"
                  )} />
                  <span className="text-[10px] font-mono text-white/50 uppercase tracking-[0.2em]">{career.status}</span>
                </div>
                {career.status === "Soon" && <Lock className="w-4 h-4 text-slate-600" />}
                {career.status === "Active" && <Cpu className="w-4 h-4 text-sky-500/50 animate-spin-slow" />}
              </div>

              {/* Main Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
                <div className={cn(
                  "w-24 h-24 rounded-3xl mb-8 flex items-center justify-center transition-all duration-500 relative",
                  career.status === "Active" 
                    ? "bg-sky-500/10 text-sky-400 group-hover:bg-sky-500/20 group-hover:scale-110 shadow-[0_0_30px_rgba(14,165,233,0.1)]" 
                    : "bg-slate-800/50 text-slate-600"
                )}>
                  <career.icon className="w-10 h-10" />
                  {career.status === "Active" && (
                    <div className="absolute inset-0 rounded-3xl border border-sky-500/50 animate-pulse-ring" />
                  )}
                </div>
                
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 group-hover:text-sky-400 transition-colors">
                  {career.name}
                </h3>
                <p className="text-slate-400 text-sm font-light italic leading-relaxed">
                  {career.desc}
                </p>
              </div>

              {/* Bottom Action */}
              <div className="absolute bottom-8 left-0 w-full px-10 flex items-center justify-between z-20 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                <span className="text-[10px] font-mono text-sky-500 uppercase tracking-widest">Connect Neural Link</span>
                <ChevronRight className="w-5 h-5 text-sky-500" />
              </div>

              {/* Border Glow */}
              <div className="absolute inset-0 border border-sky-500/0 group-hover:border-sky-500/50 transition-all rounded-[2rem] pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Side Decorative UI */}
      <div className="fixed top-1/2 left-6 -translate-y-1/2 flex flex-col gap-8 opacity-20 hidden xl:flex">
        <div className="h-40 w-[1px] bg-sky-500" />
        <span className="[writing-mode:vertical-lr] text-[10px] font-mono text-white uppercase tracking-[0.5em]">Career Architecture</span>
        <div className="h-40 w-[1px] bg-sky-500" />
      </div>
      
      <div className="fixed top-1/2 right-6 -translate-y-1/2 flex flex-col gap-8 opacity-20 hidden xl:flex">
        <div className="h-40 w-[1px] bg-sky-500" />
        <span className="[writing-mode:vertical-lr] text-[10px] font-mono text-white uppercase tracking-[0.5em]">Simulation Stream</span>
        <div className="h-40 w-[1px] bg-sky-500" />
      </div>
    </div>
  );
}
