"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Scene from "./Scene";
import { 
  Radio, 
  Wind, 
  AlertTriangle, 
  MessageSquare, 
  Anchor, 
  Navigation, 
  Cpu, 
  Terminal,
  Activity,
  User as UserIcon
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

interface SimulationProps {
  userData: UserData;
  onComplete: (performance: UserData["performance"]) => void;
}

const missions = [
  {
    id: 1,
    title: "Storm Alert",
    description: "A massive cyclone is approaching. Secure all cargo and check radar systems.",
    tasks: ["Secure Deck Cargo", "Inspect Radar S-Band", "Alert Engine Room"],
    npc: "Captain",
    npcMessage: (name: string) => `Cadet ${name}, we've got heavy weather coming in from the SE. Get those lashings checked immediately.`,
  },
  {
    id: 2,
    title: "Engine Failure",
    description: "Main engine overheating. Coordinate with the Chief Engineer to prevent a blackout.",
    tasks: ["Ventilation Check", "Reset Fuel Pump", "Manual Override"],
    npc: "Chief Engineer",
    npcMessage: (name: string) => `Rahul— wait, I mean ${name}, the temperature is spiking! We need more pressure in the cooling lines now!`,
  },
  {
    id: 3,
    title: "Isolation Event",
    description: "It's 02:00. The ocean is quiet. You have a message from home.",
    tasks: ["Listen to Voice Note", "Reflect on Journey"],
    npc: "Family",
    npcMessage: (name: string) => `We miss you, ${name}. Stay safe out there. The ocean is big, but you're stronger.`,
  }
];

export default function Simulation({ userData, onComplete }: SimulationProps) {
  const [currentMissionIndex, setCurrentMissionIndex] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [logs, setLogs] = useState<string[]>([]);
  const [stormIntensity, setStormIntensity] = useState(0.2);
  const performance = {
    leadership: 80,
    teamwork: 75,
    stress: 90,
    communication: 85,
  };

  const mission = missions[currentMissionIndex];

  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => setShowIntro(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  const handleTaskClick = (task: string) => {
    if (logs.some(log => log.includes("Decision Made:"))) return; // Prevent multiple clicks

    addLog(`Decision Made: ${task}`);
    
    // Impact performance based on choice (simplified for now)
    addLog("Analyzing outcome...");

    setTimeout(() => {
      if (currentMissionIndex < missions.length - 1) {
        setCurrentMissionIndex(prev => prev + 1);
        setStormIntensity(prev => prev + 0.3);
        setLogs([]); // Clear logs for next mission
        addLog(`Mission ${currentMissionIndex + 2} Initialized.`);
      } else {
        onComplete(performance);
      }
    }, 2000);
  };

  return (
    <div className="relative h-screen w-full bg-black">
      {/* Intro Overlay */}
      <AnimatePresence>
        {showIntro && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-center p-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-sky-500 font-mono tracking-[0.5em] uppercase text-sm mb-4">Establishing Uplink...</h2>
              <div className="space-y-4">
                <p className="text-4xl md:text-6xl font-bold text-white tracking-tighter uppercase italic">Year 2034</p>
                <p className="text-xl md:text-3xl text-slate-400 font-light italic">Arabian Sea // MV Horizon</p>
              </div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="mt-12 p-6 glass-card border-sky-500/30"
              >
                <p className="text-sky-200 font-mono">
                  &quot;You are <span className="text-white font-bold">{userData.name}</span>, {userData.age} years old.<br/>
                  Today is your first week aboard one of India&apos;s largest cargo vessels.&quot;
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Environment */}
      <div className="absolute inset-0 z-0">
        <Scene stormIntensity={stormIntensity} />
      </div>

      {/* HUD UI */}
      <div className="absolute inset-0 z-10 pointer-events-none p-10 flex flex-col justify-between">
        {/* Top HUD */}
        <div className="flex justify-between items-start">
          <div className="space-y-2 pointer-events-auto">
            <div className="glass-card px-4 py-2 flex items-center gap-3 border-sky-500/20">
              <Activity className="w-4 h-4 text-sky-500 animate-pulse" />
              <div className="flex flex-col">
                <span className="text-[10px] text-sky-500/50 uppercase font-bold leading-none">Vessel Status</span>
                <span className="text-xs text-white font-mono uppercase tracking-widest">MV Horizon // Optimal</span>
              </div>
            </div>
            <div className="glass-card px-4 py-2 flex items-center gap-3 border-sky-500/20">
              <Navigation className="w-4 h-4 text-emerald-500" />
              <div className="flex flex-col">
                <span className="text-[10px] text-emerald-500/50 uppercase font-bold leading-none">Position</span>
                <span className="text-xs text-white font-mono uppercase tracking-widest">15.3° N, 73.8° E</span>
              </div>
            </div>
          </div>

          <div className="text-right space-y-2">
            <div className="glass-card px-4 py-2 flex flex-col items-end border-red-500/20">
              <span className="text-[10px] text-red-500/50 uppercase font-bold leading-none">Environmental Risk</span>
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-red-500" />
                <span className="text-xs text-white font-mono uppercase tracking-widest">
                  {Math.round(stormIntensity * 100)}% Storm Power
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Mission Notification */}
        <div className="flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!showIntro && (
              <motion.div
                key={currentMissionIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full pointer-events-auto"
              >
                <div className="glass-card p-6 border-sky-500/40 relative group overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-sky-500/50" />
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-6 h-6 text-sky-400" />
                    <h3 className="text-xl font-bold text-white uppercase tracking-tighter">
                      Mission: {mission.title}
                    </h3>
                  </div>
                  <p className="text-slate-300 text-sm mb-6 font-light leading-relaxed">
                    {mission.description}
                  </p>
                  
                  <div className="space-y-2">
                    {mission.tasks.map((task) => {
                      const isSelected = logs.some(log => log.includes(`Decision Made: ${task}`));
                      const isAnySelected = logs.some(log => log.includes("Decision Made:"));
                      
                      return (
                        <button
                          key={task}
                          disabled={isAnySelected}
                          onClick={() => handleTaskClick(task)}
                          className={cn(
                            "w-full text-left px-4 py-3 rounded-lg border text-xs font-mono uppercase tracking-widest transition-all",
                            isSelected
                              ? "bg-sky-500/40 border-sky-500 text-white shadow-[0_0_15px_rgba(14,165,233,0.3)]"
                              : isAnySelected
                                ? "opacity-20 border-slate-800 text-slate-600"
                                : "bg-slate-900/50 border-slate-700/50 text-slate-400 hover:bg-sky-500/10 hover:border-sky-500/50"
                          )}
                        >
                          {isSelected ? "EXECUTION IN PROGRESS... " : "> "}
                          {task}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom HUD */}
        <div className="flex justify-between items-end">
          <div className="w-80 space-y-2 pointer-events-auto">
            <div className="glass-card p-4 border-sky-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="w-4 h-4 text-sky-500" />
                <span className="text-[10px] text-sky-500/50 uppercase font-bold">System Log</span>
              </div>
              <div className="space-y-1">
                {logs.length === 0 && <p className="text-[10px] text-slate-600 font-mono italic">Awaiting input...</p>}
                {logs.map((log, i) => (
                  <p key={i} className="text-[10px] text-sky-300/80 font-mono">[{new Date().toLocaleTimeString()}] {log}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="w-80 pointer-events-auto">
            <div className="glass-card p-4 border-sky-500/20 flex gap-4">
              <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/30">
                <UserIcon className="w-6 h-6 text-sky-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] text-sky-500/50 uppercase font-bold">In-Comm: {mission.npc}</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-tight italic">
                  &quot;{mission.npcMessage(userData.name)}&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Flash Overlay */}
      <motion.div 
        animate={{ opacity: stormIntensity > 0.6 ? [0, 0.1, 0] : 0 }}
        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 5 }}
        className="fixed inset-0 z-50 bg-white pointer-events-none"
      />
    </div>
  );
}
