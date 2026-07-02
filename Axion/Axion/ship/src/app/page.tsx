"use client";

import { useState, useEffect } from "react";
import GeneralLanding from "@/components/GeneralLanding";
import MerchantNavyIntro from "@/components/MerchantNavyIntro";
import CareerSelection from "@/components/CareerSelection";
import Onboarding from "@/components/Onboarding";
import Simulation from "@/components/Simulation";
import Report from "@/components/Report";
import DivingSequence from "@/components/DivingSequence";
import CompanyInfo from "@/components/CompanyInfo";
import SupportChatbot from "@/components/SupportChatbot";
import AuthPage from "@/components/AuthPage";
import AudioManager from "@/components/AudioManager";
import { AnimatePresence } from "framer-motion";

export type AppState = "general_landing" | "onboarding" | "selection" | "diving" | "merchant_navy_intro" | "simulation" | "report" | "company" | "support" | "login" | "signup";

interface UserPerformance {
  leadership: number;
  teamwork: number;
  stress: number;
  communication: number;
}

interface UserData {
  name: string;
  age: string;
  traits: string[];
  performance: UserPerformance;
}

export default function Home() {
  const [state, setState] = useState<AppState>("general_landing");
  const [userData, setUserData] = useState<UserData>({
    name: "",
    age: "",
    traits: [],
    performance: {
      leadership: 0,
      teamwork: 0,
      stress: 0,
      communication: 0,
    }
  });

  const nextState = (next: AppState | any) => {
    const targetState = typeof next === "string" ? next : "onboarding";
    setState(targetState);
    const newHash = targetState === "general_landing" ? "" : `#${targetState}`;
    if (window.location.hash !== newHash) {
      window.history.pushState({ state: targetState }, "", newHash || "/");
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      let hash = window.location.hash.replace("#", "");
      if (hash.includes("[object")) {
        hash = "general_landing";
        window.history.replaceState(null, "", "/");
      }
      setState((hash as AppState) || "general_landing");
    };
    window.addEventListener("popstate", handlePopState);
    
    // Sync initial state from hash
    let initialHash = window.location.hash.replace("#", "");
    if (initialHash && initialHash.includes("[object")) {
      initialHash = "general_landing";
      window.history.replaceState(null, "", "/");
    }
    
    const validStates: AppState[] = ["general_landing", "onboarding", "selection", "diving", "merchant_navy_intro", "simulation", "report", "company", "support", "login", "signup"];
    if (initialHash && validStates.includes(initialHash as AppState)) {
      setState(initialHash as AppState);
    }
    
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#020410]">
      <AnimatePresence mode="wait">
        {state === "general_landing" && (
          <GeneralLanding 
            key="general_landing" 
            onEnter={(targetState) => nextState(targetState || "onboarding")} 
          />
        )}

        {state === "onboarding" && (
          <Onboarding 
            key="onboarding" 
            onComplete={(data) => {
              setUserData(prev => ({ ...prev, ...data }));
              nextState("selection");
            }} 
          />
        )}

        {state === "selection" && (
          <CareerSelection 
            key="selection" 
            userName={userData.name}
            onSelectMerchantNavy={() => nextState("diving")} 
          />
        )}

        {state === "diving" && (
          <DivingSequence 
            key="diving"
            onComplete={() => window.location.href = "/merchant_navy_v4.html"} 
          />
        )}
        
        {state === "simulation" && (
          <Simulation 
            key="simulation" 
            userData={userData}
            onComplete={(performance) => {
              setUserData(prev => ({ ...prev, performance }));
              nextState("report");
            }} 
          />
        )}
        
        {state === "report" && (
          <Report 
            key="report" 
            userData={userData}
            onRestart={() => nextState("general_landing")}
          />
        )}

        {state === "company" && (
          <CompanyInfo 
            key="company" 
            onBack={() => nextState("general_landing")}
          />
        )}

        {state === "support" && (
          <SupportChatbot 
            key="support" 
            onBack={() => nextState("general_landing")}
          />
        )}

        {(state === "login" || state === "signup") && (
          <AuthPage 
            key="auth"
            initialMode={state}
            onSuccess={(userName) => {
              setUserData(prev => ({ ...prev, name: userName }));
              nextState("selection");
            }}
            onBack={() => nextState("general_landing")}
          />
        )}
      </AnimatePresence>

      {/* Persistent Home Button (Fixes Back Issue) */}
      <div className="fixed bottom-6 left-6 z-[200] pointer-events-auto">
        <button 
          onClick={() => nextState("general_landing")}
          className="w-10 h-10 rounded-full bg-slate-900/60 backdrop-blur-md border border-slate-700/50 flex items-center justify-center text-white/50 hover:text-white transition-all hover:scale-110 shadow-lg"
          title="Back to Home"
        >
          <span className="text-xs font-bold">N</span>
        </button>
      </div>

      {/* Global HUD Overlay */}
      <div className="pointer-events-none fixed inset-0 z-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.3)_100%)]" />
        <div className="hud-scanline" />
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-sky-500/10 to-transparent opacity-20" />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-sky-500/10 to-transparent opacity-20" />
      </div>

      <AudioManager />
    </main>
  );
}
