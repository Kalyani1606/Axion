"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioManager() {
  const [muted, setMuted] = useState(false);
  const oceanRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // oceanRef.current = new Audio("https://assets.mixkit.co/active_storage/sfx/2513/2513-preview.mp3");
    // oceanRef.current.loop = true;
    // oceanRef.current.volume = 0.3;
    
    const playAudio = () => {
      // Audio Disabled for cleaner AXION experience
    };

    window.addEventListener("click", playAudio, { once: true });
    return () => {
      window.removeEventListener("click", playAudio);
      oceanRef.current?.pause();
    };
  }, []);

  useEffect(() => {
    if (oceanRef.current) {
      oceanRef.current.muted = muted;
    }
  }, [muted]);

  return (
    <div className="fixed bottom-6 right-6 z-[200] pointer-events-auto">
      <button 
        onClick={() => setMuted(!muted)}
        className="p-3 rounded-full bg-slate-900/60 backdrop-blur-md border border-slate-700/50 text-sky-500 hover:text-white transition-all shadow-lg shadow-black/50"
      >
        {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>
    </div>
  );
}
