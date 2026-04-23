import { motion } from "motion/react";
import SnakeGame from "./components/SnakeGame";
import MusicPlayer from "./components/MusicPlayer";
import { Activity, Shield, Cpu, Binary, Eye } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col p-4 md:p-6 font-mono relative overflow-hidden">
      {/* Glitch Infrastructure */}
      <div className="noise" />
      <div className="scanline" />
      
      {/* Decoy UI Elements */}
      <div className="absolute top-0 right-0 p-2 text-[8px] text-[var(--glitch-magenta)] opacity-20 pointer-events-none select-none overflow-hidden h-32 w-64 leading-tight">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i}>0x{Math.random().toString(16).slice(2, 10).toUpperCase()} - {Math.random() > 0.5 ? "READY" : "WAIT"}</div>
        ))}
      </div>

      {/* Cryptic Header */}
      <header className="w-full flex items-center justify-between mb-12 z-10 border-b-4 border-[var(--glitch-cyan)] pb-4">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-16 h-16 bg-black border-2 border-[var(--glitch-magenta)] flex items-center justify-center transform hover:rotate-45 transition-transform duration-500">
              <Binary className="text-[var(--glitch-magenta)]" size={32} />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--glitch-cyan)] animate-ping" />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-[-0.15em] uppercase text-[var(--glitch-cyan)] glitch-text">
              NODE_SNAKE_OS <span className="text-[var(--glitch-magenta)] text-xl block tracking-tighter opacity-70">EXECUTION_READY</span>
            </h1>
          </div>
        </div>

        <div className="hidden lg:flex items-center space-x-12">
          <div className="flex flex-col items-end border-r-2 border-[var(--glitch-magenta)] pr-4">
            <span className="text-[10px] text-gray-500">V_SESSION</span>
            <span className="text-lg font-bold tracking-tighter">AI_BUILD_2042</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-500">ENCRYPTION</span>
            <span className="text-lg font-bold tracking-tighter text-[var(--glitch-cyan)]">AES_256_GLITCH</span>
          </div>
        </div>
      </header>

      {/* Main Terminal Area */}
      <main className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-12 max-w-7xl mx-auto w-full z-10">
        {/* Game Pane */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="xl:col-span-8 flex flex-col"
        >
          <div className="flex items-center justify-between mb-2 px-1">
            <div className="flex items-center space-x-2">
              <Shield size={12} className="text-[var(--glitch-cyan)]" />
              <span className="text-[10px] font-bold text-[var(--glitch-cyan)] uppercase tracking-[0.2em]">CORE_PROCESS_01_VISUAL_STREAM</span>
            </div>
            <div className="flex items-center space-x-2 text-[10px] text-gray-600 animate-pulse">
              <Eye size={10} />
              <span>RECORDING_ACTIVE</span>
            </div>
          </div>
          <div className="flex-1 min-h-[450px]">
            <SnakeGame />
          </div>
        </motion.div>

        {/* Console Pane */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="xl:col-span-4 flex flex-col"
        >
          <div className="flex items-center space-x-2 mb-2 px-1">
             <Activity size={12} className="text-[var(--glitch-magenta)]" />
            <span className="text-[10px] font-bold text-[var(--glitch-magenta)] uppercase tracking-[0.2em]">AUDIO_DECODER_BUFFER</span>
          </div>
          <div className="flex-1 min-h-[500px]">
             <MusicPlayer />
          </div>
        </motion.div>
      </main>

      {/* Machine Status Footer */}
      <footer className="w-full mt-12 flex flex-col md:flex-row items-center justify-between border-t-4 border-[var(--glitch-cyan)] pt-6 z-10 text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-loose">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="bg-[var(--glitch-magenta)] text-black px-2 mr-2">WARN</div>
          <span>UNAUTHORIZED_ACCESS_DETECTED // SYSTEM_RUNNING_IN_DEGRADED_MODE</span>
        </div>
        <div className="flex space-x-8 items-center">
          <div className="flex items-center space-x-2 text-[var(--glitch-cyan)]">
            <Cpu size={12} />
            <span>CALIBRATION: 100%</span>
          </div>
          <span className="text-[var(--glitch-magenta)] animate-pulse">STATUS: CRITICAL</span>
        </div>
      </footer>
    </div>
  );
}
