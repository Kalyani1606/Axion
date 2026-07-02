"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronRight, User, Calendar, Target, Shield, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

interface OnboardingProps {
  onComplete: (data: { name: string; age: string; traits: string[] }) => void;
}

interface FormData {
  name: string;
  age: string;
  interest: string;
  workspace: string;
  approach: string;
  [key: string]: string;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    interest: "",
    workspace: "",
    approach: "",
  });

  const steps = [
    {
      title: "Personal Identity",
      subtitle: "Initializing neural connection...",
      fields: [
        { name: "name", label: "Full Name", icon: User, placeholder: "Commander Smith" },
        { name: "age", label: "Biological Age", icon: Calendar, placeholder: "24" },
      ]
    },
    {
      title: "Leisure & Hobbies",
      subtitle: "How do you prefer to spend a free weekend?",
      options: ["Outdoors with Friends", "Reading or Gaming Solo", "Trying a New Hobby", "Volunteering or Helping"],
      field: "interest",
      icon: Target
    },
    {
      title: "Curiosity Driver",
      subtitle: "What topic do you search online most often?",
      options: ["How things work", "Human stories & history", "Creative art & music", "Science & environment"],
      field: "workspace",
      icon: Shield
    },
    {
      title: "Daily Motivator",
      subtitle: "What makes you feel most accomplished at the day's end?",
      options: ["Creating something cool", "Solving a tough puzzle", "Making someone smile", "Learning a new skill"],
      field: "approach",
      icon: Compass
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete({
        name: formData.name,
        age: formData.age,
        traits: [formData.interest, formData.workspace, formData.approach].filter(Boolean)
      });
    }
  };

  const currentStepData = steps[step];

  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-[#01030a] overflow-hidden font-sans">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700;900&display=swap');
        .font-studio { font-family: 'Space Grotesk', sans-serif; }
        .neon-text { text-shadow: 0 0 10px rgba(14,165,233,0.5), 0 0 20px rgba(14,165,233,0.3); }
      `}</style>

      {/* Vault Cinematic Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.1)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [transform:perspective(1000px)_rotateX(60deg)_translateY(-200px)] animate-pulse" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          exit={{ opacity: 0, scale: 1.1, rotateX: -10 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md p-10 bg-slate-900/40 backdrop-blur-3xl rounded-[2.5rem] border border-sky-500/20 shadow-[0_0_100px_rgba(0,0,0,0.8)] relative overflow-hidden group"
        >
          {/* Scanning Light Effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-500/10 to-transparent h-1/2 w-full z-10 pointer-events-none"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          {/* Top Detail */}
          <div className="flex items-center justify-between mb-10 relative z-20">
            <div className="flex gap-1.5">
              {steps.map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "h-1 rounded-full transition-all duration-700",
                    i <= step ? "bg-sky-500 w-8 shadow-[0_0_15px_#0ea5e9]" : "bg-white/5 w-3"
                  )} 
                />
              ))}
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/5 backdrop-blur-md">
              <span className="text-[9px] font-black text-sky-400 tracking-[0.3em] uppercase font-studio">PHASE_0{step + 1}</span>
            </div>
          </div>

          <h3 className="text-xl md:text-2xl font-studio font-semibold text-slate-100 mb-8 tracking-tight leading-relaxed relative z-20">
            {currentStepData?.subtitle}
          </h3>

          <div className="space-y-4 relative z-20">
            {currentStepData?.fields ? (
              <div className="grid grid-cols-1 gap-3">
                {currentStepData.fields.map((f) => (
                  <motion.div 
                    key={f.name} 
                    className="relative group/input"
                    whileHover={{ scale: 1.02 }}
                  >
                    <f.icon className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-500 group-focus-within/input:text-sky-300 transition-colors" />
                    <input
                      type="text"
                      placeholder={f.placeholder}
                      value={formData[f.name]}
                      onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-13 pr-4 text-white focus:outline-none focus:border-sky-500/50 focus:bg-sky-500/5 transition-all placeholder:text-white/20 text-[11px] font-bold uppercase tracking-[0.2em] font-studio"
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {currentStepData?.options?.map((opt) => (
                  <motion.button
                    key={opt}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(14,165,233,0.1)" }}
                    onClick={() => setFormData({ ...formData, [currentStepData.field as string]: opt })}
                    className={cn(
                      "group flex items-center gap-3 px-6 py-4 rounded-2xl border-2 transition-all duration-300 text-left backdrop-blur-xl",
                      formData[currentStepData.field as string] === opt
                        ? "bg-sky-500/20 border-sky-500 text-white shadow-[0_0_30px_rgba(14,165,233,0.2)]"
                        : "bg-white/5 border-white/5 text-white/50 hover:border-white/20 hover:text-white"
                    )}
                  >
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full transition-all flex-shrink-0",
                      formData[currentStepData.field as string] === opt ? "bg-sky-500 shadow-[0_0_15px_#0ea5e9] scale-125" : "bg-white/20"
                    )} />
                    <span className="text-[10px] font-bold tracking-[0.1em] uppercase font-studio truncate">{opt}</span>
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-12 flex justify-end relative z-20">
            <button
              onClick={handleNext}
              disabled={
                currentStepData?.fields 
                  ? !formData.name || !formData.age 
                  : !formData[currentStepData?.field as string]
              }
              className="group flex items-center gap-5 py-5 px-12 rounded-2xl bg-white text-black font-black tracking-[0.4em] uppercase transition-all hover:bg-sky-500 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed font-studio relative overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-sky-400/40"
            >
              <span className="text-[10px] relative z-10">Connect Neural Link</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Decorative Side UI */}
      <div className="fixed top-1/2 left-10 -translate-y-1/2 flex flex-col gap-8 opacity-20 hidden xl:flex">
        <div className="h-40 w-[1px] bg-sky-500" />
        <span className="[writing-mode:vertical-lr] text-[9px] font-bold text-white uppercase tracking-[0.6em] font-studio">Neural Architecture</span>
        <div className="h-40 w-[1px] bg-sky-500" />
      </div>
      
      <div className="fixed top-1/2 right-10 -translate-y-1/2 flex flex-col gap-8 opacity-20 hidden xl:flex">
        <div className="h-40 w-[1px] bg-sky-500" />
        <span className="[writing-mode:vertical-lr] text-[9px] font-bold text-white uppercase tracking-[0.6em] font-studio">Identity Simulation</span>
        <div className="h-40 w-[1px] bg-sky-500" />
      </div>
    </div>
  );
}
