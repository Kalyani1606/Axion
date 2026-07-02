"use client";

import { motion } from "framer-motion";
import { Anchor, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function MerchantNavyIntro({ onEnter }: { onEnter: () => void }) {
  const [selectedRole, setSelectedRole] = useState("deck-cadet");

  const roles = [
    { id: "deck-cadet", title: "DECK CADET", sub: "Navigation & command", emoji: "👨‍✈️" },
    { id: "engine-cadet", title: "ENGINE CADET", sub: "Machinery & power", emoji: "⚙️" },
    { id: "mess-boy", title: "MESS BOY", sub: "Crew welfare", emoji: "👨‍🍳" },
  ];

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#01030a] text-center px-6">
      <div className="max-w-4xl w-full">
        {/* Header Section */}
        <div className="mb-10">
          <div className="text-4xl mb-4">🚢</div>
          <h1 className="text-5xl md:text-6xl font-black text-sky-400 tracking-tighter uppercase mb-2 drop-shadow-[0_0_15px_rgba(14,165,233,0.5)]">
            MERCHANT NAVY
          </h1>
          <p className="text-sky-800 text-sm font-bold tracking-[0.4em] uppercase mb-8">
            CAREERVERSE · LIFE AT SEA SIMULATION
          </p>
          
          <div className="space-y-2 mb-8">
            <p className="text-sky-500/80 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-medium">
              Board <span className="text-white font-bold underline">MV Horizon</span> – 200 metres of cargo vessel crossing the Indian Ocean.
              Complete 5 missions across the ship. Use stairs to explore the engine basement!
            </p>
            <p className="text-amber-500 text-sm font-bold">
              🎯 Each mission briefed before you go – follow the arrow to each zone!
            </p>
          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {roles.map((role) => (
            <motion.div
              key={role.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedRole(role.id)}
              className={cn(
                "p-8 rounded-3xl border-2 transition-all duration-300 cursor-pointer flex flex-col items-center gap-4",
                selectedRole === role.id 
                  ? "bg-sky-500/10 border-sky-400 shadow-[0_0_20px_rgba(14,165,233,0.3)]" 
                  : "bg-transparent border-slate-800/50 hover:border-slate-700"
              )}
            >
              <div className="text-4xl mb-2">{role.emoji}</div>
              <h3 className={cn(
                "text-lg font-black tracking-wider",
                selectedRole === role.id ? "text-sky-400" : "text-slate-500"
              )}>
                {role.title}
              </h3>
              <p className="text-slate-600 text-xs uppercase tracking-widest">{role.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Board Button */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnter}
          className="flex items-center gap-4 bg-[#0a4ea3] hover:bg-[#0d5bc0] text-white py-5 px-20 rounded-2xl border border-sky-400/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all"
        >
          <Anchor className="w-5 h-5" />
          <span className="text-xl font-black uppercase tracking-[0.2em]">Board the Ship</span>
        </motion.button>
      </div>
    </div>
  );
}
