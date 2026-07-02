"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, ChevronLeft, Trash2, ArrowRight } from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
}

interface SupportChatbotProps {
  onBack: () => void;
}

const SUGGESTED_PROMPTS = [
  { text: "💻 I like coding. Which careers suit me?", query: "coding" },
  { text: "🎨 Should I choose Design or Development?", query: "design vs development" },
  { text: "📈 What skills do I need to become a Product Manager?", query: "product manager" },
  { text: "🤔 I'm confused between AI and Data Science.", query: "ai vs data science" },
  { text: "🚀 Which careers will be in demand in the future?", query: "future careers" },
];

const BOT_RESPONSES: Record<string, string> = {
  coding: `Based on your interest in **Coding**, here are top-tier tech careers suitable for you:
  
1. **Software Architect**: Designing large-scale software systems and core infrastructures.
2. **AI Engineer**: Crafting neural networks, machine learning algorithms, and agentic systems.
3. **Full-Stack Developer**: Building modern web applications from end to end.
4. **Cybersecurity Expert**: Guarding critical digital infrastructure from threat actors.

*Tip: Try our **Merchant Navy** or upcoming **Game Developer** simulation to see real-world systems in action!*`,

  "design vs development": `Here is a breakdown to help you choose:

- 🎨 **Design (UI/UX)**: Best if you enjoy visual storytelling, psychology, user empathy, and creating layout architectures. You will thrive as a UI Designer, UX Researcher, or Brand Strategist.
- 💻 **Development**: Best if you love logic, puzzle-solving, writing code, and building systems that function. You will excel as a Frontend, Backend, or Mobile Engineer.

*Hybrid Role Option: **Design Engineers** bridge the gap by writing code for beautiful interactive user interfaces!*`,

  "product manager": `To successfully transition into a **Product Manager (PM)** role, prioritize building these core pillars:

1. **Product Sense**: Understanding user pain points and designing elegant features to solve them.
2. **Data & Analytics**: Learning how to define success metrics (KPIs) and run A/B experiments.
3. **Tech Literacy**: Knowing how APIs work, systems architecture, and working closely with engineers.
4. **Leadership**: Leading cross-functional teams without direct authority.`,

  "ai vs data science": `Both are high-growth fields but target different strengths:

- 🤔 **Artificial Intelligence (AI)**: Focuses on creating systems that mimic human intelligence. Key areas: deep learning, computer vision, natural language processing, and agentic workflows. Best for software engineers who love math.
- 📊 **Data Science**: Focuses on extracting insights from unstructured data to make business decisions. Key areas: statistical modeling, data visualization, and predictive analytics. Best for analytical thinkers who love statistics.`,

  "future careers": `The future global landscape belongs to these high-value careers:

1. **AI & Robotics Engineers**: Automating industries and optimizing smart cities.
2. **Renewable Energy Architects**: Designing zero-emission power grids.
3. **Biotech Researchers**: Personalizing medicine and genetic healthcare.
4. **Autonomous Transport Supervisors**: Coordinating maritime, air, and land drone networks.

*Our **Merchant Navy Simulation** gives you direct exposure to modern autonomous navigation and radar systems!*`,

  default: `I am the AXION Guidance Intelligence. I'm here to help you choose the right career path!

Feel free to ask me about:
- Career options in tech, design, or engineering
- Skills needed for modern professions
- How to get started with simulations

You can also click any of the **Suggested Prompts** below to kick off a guided discussion!`
};

export default function SupportChatbot({ onBack }: SupportChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      sender: "bot",
      text: "Welcome back, Cadet. I am the AXION Guidance Intelligence. What career path, skills, or future technology would you like to explore today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const query = textToSend.toLowerCase();
      let matchedResponse = BOT_RESPONSES.default;

      // Match keywords
      if (query.includes("coding") || query.includes("code")) {
        matchedResponse = BOT_RESPONSES.coding;
      } else if (query.includes("design") || query.includes("development") || query.includes("dev")) {
        matchedResponse = BOT_RESPONSES["design vs development"];
      } else if (query.includes("product") || query.includes("manager") || query.includes("pm")) {
        matchedResponse = BOT_RESPONSES["product manager"];
      } else if (query.includes("ai") || query.includes("data science") || query.includes("artificial intelligence")) {
        matchedResponse = BOT_RESPONSES["ai vs data science"];
      } else if (query.includes("future") || query.includes("demand") || query.includes("careers")) {
        matchedResponse = BOT_RESPONSES["future careers"];
      }

      const botMsg: Message = {
        id: Math.random().toString(),
        sender: "bot",
        text: matchedResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleClear = () => {
    setMessages([
      {
        id: "initial",
        sender: "bot",
        text: "Neural log cleared. Ready to start a new simulation dialogue.",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#01030a] py-20 px-4 md:px-6 flex flex-col items-center justify-center overflow-hidden font-sans">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-purple-600/5 blur-[180px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] bg-sky-500/5 blur-[180px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.015)_1px,transparent_1px)] bg-[size:60px_60px] [transform:perspective(1000px)_rotateX(60deg)_translateY(-200px)]" />
      </div>

      <div className="max-w-4xl w-full relative z-10 flex flex-col h-[85vh]">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between mb-8 flex-shrink-0">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors bg-white/5 border border-white/10 px-5 py-2.5 rounded-full hover:bg-white/10"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase">Return to Portal</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 backdrop-blur-md"
          >
            <Bot className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="text-[10px] font-mono text-purple-300 uppercase tracking-[0.3em]">AI Support Guidance</span>
          </motion.div>
        </div>

        {/* Main Chat Interface */}
        <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">
          {/* Messages Box */}
          <div className="flex-1 flex flex-col rounded-[2.5rem] border border-white/5 bg-slate-950/40 backdrop-blur-xl overflow-hidden shadow-2xl relative">
            
            {/* Header of Chat */}
            <div className="px-8 py-5 border-b border-white/5 bg-slate-900/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                <span className="text-xs font-bold text-white uppercase tracking-widest">Guidance System Online</span>
              </div>
              <button 
                onClick={handleClear}
                className="text-slate-500 hover:text-rose-400 transition-colors p-1.5 rounded-lg hover:bg-white/5"
                title="Clear Neural Log"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Message List */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-start gap-4 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 border ${
                      msg.sender === "user" 
                        ? "bg-sky-500/10 text-sky-400 border-sky-500/20" 
                        : "bg-purple-500/10 text-purple-400 border-purple-500/20"
                    }`}>
                      {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    <div className={`max-w-[75%] rounded-[1.5rem] px-5 py-3.5 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-sky-600 text-white rounded-tr-none shadow-[0_10px_20px_rgba(2,132,199,0.15)]"
                        : "bg-white/5 text-slate-300 border border-white/5 rounded-tl-none whitespace-pre-line"
                    }`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center">
                      <Bot className="w-4 h-4 animate-spin-slow" />
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded-[1.5rem] rounded-tl-none px-6 py-4 flex gap-1.5 items-center justify-center">
                      <span className="w-2.5 h-2.5 bg-sky-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2.5 h-2.5 bg-sky-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2.5 h-2.5 bg-sky-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-6 border-t border-white/5 bg-slate-900/10 flex-shrink-0">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }}
                className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl focus-within:border-sky-500/50 transition-colors"
              >
                <input
                  type="text"
                  placeholder="Query the Guidance System..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full bg-transparent py-4 pl-6 pr-16 text-sm text-white focus:outline-none placeholder:text-slate-600"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="absolute right-3 p-2.5 rounded-xl bg-sky-600 text-white hover:bg-sky-500 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar: Suggested Prompts */}
          <div className="w-full md:w-80 flex flex-col gap-4 flex-shrink-0">
            <h3 className="text-xs font-black tracking-[0.2em] text-slate-500 uppercase px-2 mb-1 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              Suggested Queries
            </h3>
            <div className="flex flex-col gap-3">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt.text}
                  onClick={() => handleSend(prompt.text)}
                  className="w-full text-left p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-sky-500/30 hover:bg-sky-500/5 hover:scale-[1.02] text-xs font-semibold text-slate-400 hover:text-white transition-all flex items-center justify-between group"
                >
                  <span className="max-w-[85%] leading-relaxed">{prompt.text}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-sky-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
