"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Terminal } from "lucide-react";

export default function DivingSequence({ onComplete }: { onComplete: () => void }) {
  const [displayText, setDisplayText] = useState("");
  const [showTitle, setShowTitle] = useState(false);

  const title = "Merchant Navy: Life at Sea";
  const story = "The year is 2034. You are a 19-year-old Junior Deck Cadet aboard the cargo vessel MV Horizon. Your route: Mumbai to Singapore. The ocean is vast, and your journey begins now.";

  useEffect(() => {
    let hasSpoken = false;

    const speak = () => {
      if (hasSpoken) return;
      hasSpoken = true;

      const msg = new SpeechSynthesisUtterance();
      msg.text = `${title}. ${story}`;
      msg.rate = 0.9;
      msg.pitch = 0.85; // Lower pitch for a more masculine, professional tone
      
      const voices = window.speechSynthesis.getVoices();
      // Look specifically for male voices
      const maleVoice = voices.find(v => 
        (v.name.toLowerCase().includes("male") || v.name.toLowerCase().includes("david") || v.name.toLowerCase().includes("microsoft james")) && 
        v.lang.includes("en")
      );
      
      if (maleVoice) msg.voice = maleVoice;

      msg.onend = () => {
        setTimeout(onComplete, 1500);
      };
      
      window.speechSynthesis.speak(msg);
    };

    // Ensure voices are loaded before speaking
    if (window.speechSynthesis.getVoices().length > 0) {
      speak();
    } else {
      window.speechSynthesis.onvoiceschanged = speak;
    }

    // 2. Typing Animation
    setTimeout(() => setShowTitle(true), 1000);
    
    let currentText = "";
    const words = story.split(" ");
    words.forEach((word, i) => {
      setTimeout(() => {
        currentText += word + " ";
        setDisplayText(currentText);
      }, 2000 + (i * 250));
    });

    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-sans px-8">
      <AnimatePresence>
        {showTitle && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-white text-3xl md:text-5xl font-black uppercase tracking-[0.3em] mb-12 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              {title}
            </h1>
            
            <motion.p 
              className="text-white/80 text-lg md:text-2xl font-light italic tracking-wide max-w-3xl leading-relaxed mx-auto h-24"
            >
              {displayText}
              <motion.span 
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-2 h-6 bg-white ml-2 align-middle"
              />
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="absolute bottom-20 text-[10px] text-white/20 uppercase tracking-[1em]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        Neural Initialization
      </motion.div>
    </div>
  );
}
