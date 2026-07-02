"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Lock, Mail, User, Shield, ChevronLeft, ArrowRight, Sparkles } from "lucide-react";

interface AuthPageProps {
  onSuccess: (userName: string) => void;
  onBack: () => void;
  initialMode?: "login" | "signup";
}

export default function AuthPage({ onSuccess, onBack, initialMode = "login" }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(initialMode === "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authStatus, setAuthStatus] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthStatus("Establishing neural bridge...");

    setTimeout(() => {
      setAuthStatus(isLogin ? "Accessing cadet files..." : "Encrypting biometric keys...");
      
      setTimeout(() => {
        setAuthStatus("Authentication granted!");
        
        setTimeout(() => {
          setIsLoading(false);
          onSuccess(isLogin ? (email.split("@")[0] || "Cadet") : name);
        }, 1000);
      }, 1200);
    }, 1000);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#01030a] py-20 px-4 flex items-center justify-center overflow-hidden font-sans">
      {/* Background Studio Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-sky-500/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [transform:perspective(1000px)_rotateX(60deg)_translateY(-200px)] animate-pulse" />
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Return Button */}
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-8 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full hover:bg-white/10"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase">Return to Portal</span>
        </motion.button>

        {/* Auth Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="w-full p-10 bg-slate-900/40 backdrop-blur-3xl rounded-[2.5rem] border border-sky-500/20 shadow-[0_0_100px_rgba(0,0,0,0.8)] relative overflow-hidden"
        >
          {/* Scanning Light Effect */}
          {isLoading && (
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-500/15 to-transparent h-1/2 w-full z-20 pointer-events-none"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          )}

          <div className="text-center mb-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/5 backdrop-blur-md mb-4">
              <Shield className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
              <span className="text-[9px] font-black text-sky-400 tracking-[0.3em] uppercase">Security Clearance</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
              {isLogin ? "Neural Sign In" : "Register Cadet"}
            </h2>
            <p className="text-slate-500 text-xs mt-2">
              {isLogin ? "Connect your existing identity stream." : "Initialize a new cadet simulation profile."}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-12 space-y-6 text-center"
              >
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-sky-500/20" />
                  <div className="absolute inset-0 rounded-full border-4 border-t-sky-500 animate-spin" />
                </div>
                <div className="text-sm font-mono text-sky-400 uppercase tracking-widest animate-pulse">
                  {authStatus}
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Signup Fields */}
                {!isLogin && (
                  <div className="relative group/input">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-500 group-focus-within/input:text-sky-300 transition-colors" />
                    <input
                      type="text"
                      required
                      placeholder="Cadet Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4.5 pl-13 pr-4 text-white focus:outline-none focus:border-sky-500/50 focus:bg-sky-500/5 transition-all text-xs font-bold uppercase tracking-[0.1em]"
                    />
                  </div>
                )}

                {/* Email */}
                <div className="relative group/input">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-500 group-focus-within/input:text-sky-300 transition-colors" />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4.5 pl-13 pr-4 text-white focus:outline-none focus:border-sky-500/50 focus:bg-sky-500/5 transition-all text-xs font-bold uppercase tracking-[0.1em]"
                  />
                </div>

                {/* Password */}
                <div className="relative group/input">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-500 group-focus-within/input:text-sky-300 transition-colors" />
                  <input
                    type="password"
                    required
                    placeholder="Security passcode"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4.5 pl-13 pr-4 text-white focus:outline-none focus:border-sky-500/50 focus:bg-sky-500/5 transition-all text-xs font-bold uppercase tracking-[0.1em]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-4 py-4.5 px-6 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-black tracking-[0.3em] uppercase transition-all shadow-[0_10px_20px_rgba(2,132,199,0.2)]"
                >
                  <span className="text-xs">{isLogin ? "Authenticate" : "Register"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Toggle Link */}
          {!isLoading && (
            <div className="mt-8 text-center text-xs text-slate-500">
              {isLogin ? "New Cadet? " : "Existing Cadet? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sky-400 hover:text-sky-300 hover:underline font-bold transition-all focus:outline-none bg-transparent border-none outline-none"
              >
                {isLogin ? "Register Neural Link" : "Access Account"}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
