"use client";

import { motion, useSpring } from "framer-motion";
import { useState, useEffect, Suspense, useRef } from "react";
import { Sparkles, Globe, ChevronRight, Activity, Menu, Zap, Shield, Target } from "lucide-react";
import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 flex items-center justify-center text-sky-500/10 font-mono text-xs uppercase tracking-[1em] animate-pulse">Synchronizing...</div>
});

interface GeneralLandingProps {
  onEnter: () => void;
}

export default function GeneralLanding({ onEnter }: GeneralLandingProps) {
  const [time, setTime] = useState(new Date());
  const splineRef = useRef<any>(null);

  const mouseX = useSpring(0, { stiffness: 40, damping: 25 });
  const mouseY = useSpring(0, { stiffness: 40, damping: 25 });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
      if (splineRef.current) {
        const robot = splineRef.current.findObjectByName('Robot') || splineRef.current.findObjectByName('Group');
        if (robot) {
          robot.rotation.y = x * 0.12;
          robot.rotation.x = -y * 0.06;
        }
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      clearInterval(timer);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  function onLoad(splineApp: any) {
    splineRef.current = splineApp;
    
    // AGGRESSIVE HIDING
    const forbidden = ['Front', 'End', 'Text', 'Label', 'FrontEnd'];
    splineApp.getAllObjects().forEach((obj: any) => {
      const name = obj.name.toLowerCase();
      if (forbidden.some(f => name.includes(f.toLowerCase()))) {
        obj.visible = false;
      }
    });

    const robot = splineApp.findObjectByName('Robot') || splineApp.findObjectByName('Group');
    if (robot) {
      robot.position.y = 0;
      robot.position.x = 450; // PUSH ROBOT FURTHER RIGHT FOR CLEAR GUTTER
      robot.scale.set(1.2, 1.2, 1.2);
    }
  }

  return (
    <div className="relative h-screen w-full flex flex-col overflow-hidden bg-[#05000A] text-white select-none font-sans">
      
      {/* ── WEBSITE BACKGROUND (Studio Glow) ────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Spline 
            scene="/scene.splinecode" 
            onLoad={onLoad}
            className="w-full h-full"
          />
        </Suspense>
        {/* Soft Studio Floor Glow (Matches User Screenshot) */}
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-purple-600/20 blur-[150px] rounded-full translate-x-1/2 translate-y-1/2" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#05000A] via-transparent to-purple-900/10 pointer-events-none" />
      </div>

      {/* ── MODERN TOP NAVIGATION ───────────────────────────────────── */}
      <nav className="relative z-50 flex items-center justify-between px-12 py-8 bg-transparent">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase italic text-white">AXION</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          {['Simulations', 'Intelligence', 'Company', 'Support'].map(link => (
            <a key={link} href="#" className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40 hover:opacity-100 transition-opacity">{link}</a>
          ))}
        </div>

        <button className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
          <Menu className="w-5 h-5" />
        </button>
      </nav>

      {/* ── PRECISION ALIGNED CONTENT (LEFT SIDE) ───────────────────── */}
      <div className="relative z-20 w-full h-full flex items-center px-12 md:px-32 pointer-events-none">
        <div className="flex flex-col items-start w-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start"
          >
            {/* Header Accent - Website Style Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-8">
              <Shield className="w-4 h-4 text-purple-400" />
              <span className="text-[10px] font-black tracking-[0.4em] text-purple-300 uppercase italic">Intelligence Portal</span>
            </div>
            
            {/* Main Title - Clean AXION */}
            <h1 className="text-8xl md:text-[10rem] lg:text-[11rem] font-black tracking-tighter text-white uppercase leading-[0.8] mb-12 italic">
              AXION
            </h1>
            
            {/* Description - Highlighted Single-Line Tagline */}
            <p className="text-xl md:text-2xl text-white font-bold tracking-tight mb-16 pl-2 whitespace-nowrap">
              Experience your future before choosing it.
            </p>

            {/* PLAIN SOLID BUTTON (SKY BLUE) */}
            <div className="flex items-center gap-12 pointer-events-auto">
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={onEnter}
                className="group relative flex items-center gap-10 py-8 px-24 rounded-full bg-sky-600 text-white shadow-[0_20px_40px_rgba(2,132,199,0.2)] transition-all hover:bg-sky-500"
              >
                <span className="text-lg font-black tracking-widest uppercase">
                  Initialize
                </span>
                <ChevronRight className="w-6 h-6" />
              </motion.button>

              <div className="hidden lg:flex items-center gap-4 text-slate-500 cursor-pointer hover:text-white transition-colors">
                <div className="p-3 rounded-full border border-white/10 group-hover:border-white/30">
                  <Target className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Explore Axion</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </div>
  );
}
