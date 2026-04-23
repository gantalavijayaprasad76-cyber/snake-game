import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, SkipBack, SkipForward, Zap, Activity } from "lucide-react";
import { SONGS } from "../constants";

export default function MusicPlayer() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentSong = SONGS[currentSongIndex];

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= currentSong.duration) {
            handleNext();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentSongIndex]);

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % SONGS.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prev) => (prev - 1 + SONGS.length) % SONGS.length);
    setProgress(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full h-full flex flex-col p-6 bg-black jarring-border-cyan relative overflow-hidden font-mono">
      {/* Glitch Overlay */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,255,0.1)_3px)]" />
      
      <div className="flex-1 flex flex-col items-center justify-center space-y-6 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSong.id}
            initial={{ opacity: 0, x: -20, rotate: -2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: 20, rotate: 2 }}
            className="w-48 h-48 border-4 border-[var(--glitch-magenta)] relative"
          >
            <div className="absolute inset-0 bg-[var(--glitch-cyan)] opacity-20 animate-pulse" />
            <img 
              src={currentSong.cover} 
              alt={currentSong.title} 
              className="w-full h-full object-cover filter grayscale contrast-125 mix-blend-screen"
              referrerPolicy="no-referrer"
            />
            {/* Decoy text */}
            <div className="absolute -bottom-2 -left-2 bg-black px-2 py-1 text-[10px] text-[var(--glitch-cyan)] border border-[var(--glitch-cyan)]">
              IMG_REF: {currentSong.id}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tighter text-[var(--glitch-cyan)] uppercase glitch-text px-4">
            {currentSong.title}
          </h2>
          <p className="text-xs text-[var(--glitch-magenta)] tracking-[0.3em] uppercase">
             // ORIGIN: {currentSong.artist}
          </p>
        </div>
      </div>

      {/* Rhythmic Progress */}
      <div className="w-full space-y-3 mt-8 z-10">
        <div className="flex justify-between text-[10px] text-[var(--glitch-cyan)] font-bold mb-1">
          <span>TX_BUFFER: {formatTime(progress)}</span>
          <span className="animate-pulse">{isPlaying ? "STDL_SYNCING..." : "STDL_IDLE"}</span>
          <span>TTL: {formatTime(currentSong.duration)}</span>
        </div>
        <div className="h-6 w-full bg-black border-2 border-[var(--glitch-magenta)] p-1 overflow-hidden relative">
          <motion.div 
            className="h-full bg-[var(--glitch-cyan)]"
            initial={{ width: 0 }}
            animate={{ width: `${(progress / currentSong.duration) * 100}%` }}
            transition={{ duration: 0.1 }}
          />
          <div className="absolute inset-0 flex items-center justify-around opacity-50 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="h-full w-[1px] bg-black" />
            ))}
          </div>
        </div>
      </div>

      {/* Jarring Controls */}
      <div className="flex items-center justify-center space-x-6 mt-8 z-10">
        <button 
          onClick={handlePrev}
          className="p-3 border-2 border-[var(--glitch-magenta)] text-[var(--glitch-magenta)] hover:bg-[var(--glitch-magenta)] hover:text-black transition-colors"
        >
          <SkipBack size={24} />
        </button>
        <button 
          onClick={handlePlayPause}
          className="w-16 h-16 flex items-center justify-center bg-black border-4 border-[var(--glitch-cyan)] text-[var(--glitch-cyan)] shadow-[6px_6px_0_var(--glitch-magenta)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
        >
          {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
        </button>
        <button 
          onClick={handleNext}
          className="p-3 border-2 border-[var(--glitch-magenta)] text-[var(--glitch-magenta)] hover:bg-[var(--glitch-magenta)] hover:text-black transition-colors"
        >
          <SkipForward size={24} />
        </button>
      </div>

      {/* Machine Telemetry */}
      <div className="flex items-center justify-between mt-8 pt-4 border-t-2 border-[var(--glitch-cyan)] opacity-80 z-10">
        <div className="flex items-center space-x-2 text-[10px] text-[var(--glitch-cyan)] font-bold">
          <Zap size={12} fill="currentColor" />
          <span>PWR_GRID_STABLE</span>
        </div>
        <div className="flex items-center space-x-2 text-[10px] text-[var(--glitch-magenta)] font-bold">
          <Activity size={12} />
          <span>FREQ: 44.1kHz</span>
        </div>
      </div>
    </div>
  );
}
