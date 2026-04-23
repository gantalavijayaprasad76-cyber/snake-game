import { useState, useEffect, useRef, useCallback } from "react";
import { Activity, RefreshCw, Play, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const GRID_SIZE = 25;
const INITIAL_SNAKE = [
  { x: 12, y: 12 },
  { x: 12, y: 13 },
  { x: 12, y: 14 },
];
const INITIAL_DIRECTION = { x: 0, y: -1 };

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [speed, setSpeed] = useState(120);

  const moveSnake = useCallback(() => {
    const newHead = {
      x: (snake[0].x + direction.x + GRID_SIZE) % GRID_SIZE,
      y: (snake[0].y + direction.y + GRID_SIZE) % GRID_SIZE,
    };

    if (snake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
      setGameState("gameover");
      return;
    }

    const newSnake = [newHead, ...snake];

    if (newHead.x === food.x && newHead.y === food.y) {
      setScore((s) => s + 1);
      generateFood(newSnake);
      setSpeed((s) => Math.max(s - 1, 50));
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, direction, food]);

  const generateFood = (currentSnake: { x: number; y: number }[]) => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      if (!currentSnake.some((segment) => segment.x === newFood.x && segment.y === newFood.y)) {
        break;
      }
    }
    setFood(newFood);
  };

  useEffect(() => {
    if (gameState !== "playing") return;
    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [gameState, moveSnake, speed]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp": if (direction.y !== 1) setDirection({ x: 0, y: -1 }); break;
        case "ArrowDown": if (direction.y !== -1) setDirection({ x: 0, y: 1 }); break;
        case "ArrowLeft": if (direction.x !== 1) setDirection({ x: -1, y: 0 }); break;
        case "ArrowRight": if (direction.x !== -1) setDirection({ x: 1, y: 0 }); break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cellSize = canvas.width / GRID_SIZE;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid Artifacts
    ctx.strokeStyle = "rgba(255, 0, 255, 0.1)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath(); ctx.moveTo(i * cellSize, 0); ctx.lineTo(i * cellSize, canvas.height); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i * cellSize); ctx.lineTo(canvas.width, i * cellSize); ctx.stroke();
    }

    // Snake (Jarring Colors)
    snake.forEach((segment, i) => {
      ctx.fillStyle = i === 0 ? "#ff00ff" : "#00ffff";
      // No shadows for brutalist pixel look
      ctx.fillRect(segment.x * cellSize + 1, segment.y * cellSize + 1, cellSize - 2, cellSize - 2);
    });

    // Food
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(food.x * cellSize + 2, food.y * cellSize + 2, cellSize - 4, cellSize - 4);

    // Random Glitch Artifacts on canvas
    if (Math.random() > 0.95) {
      ctx.fillStyle = "rgba(0, 255, 255, 0.5)";
      ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 50, 1);
    }

  }, [snake, food]);

  const startGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameState("playing");
    setSpeed(120);
  };

  return (
    <div className="w-full h-full flex flex-col bg-black jarring-border-magenta relative overflow-hidden font-mono">
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-20">
        <div className="bg-[#ff00ff] text-black px-4 py-1 text-xs font-bold skew-x-[-12deg]">
          DATA_INTEGRITY: {score.toString().padStart(3, '0')}
        </div>
        <div className="bg-[#00ffff] text-black px-4 py-1 text-xs font-bold skew-x-[12deg]">
          NODE_STABILITY: {(100 - score).toFixed(2)}%
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="relative aspect-square w-full max-w-[450px] border-2 border-[var(--glitch-cyan)] p-1">
          <canvas ref={canvasRef} width={500} height={500} className="w-full h-full grayscale-[0.5]" />
          
          <AnimatePresence>
            {gameState !== "playing" && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-30"
              >
                <div className="scanline" />
                <h2 className="text-5xl font-black text-[var(--glitch-magenta)] glitch-text mb-8 uppercase tracking-tighter">
                  {gameState === "gameover" ? "KERNEL_PANIC" : "NODE_SNAKE_v.4"}
                </h2>
                
                <button
                  onClick={startGame}
                  className="glitch-btn flex items-center space-x-3"
                >
                  <RefreshCw size={20} className={gameState === "playing" ? "animate-spin" : ""} />
                  <span>{gameState === "gameover" ? "RE_RESTORE_SECTOR" : "BOOT_SEQUENCE"}</span>
                </button>

                <p className="mt-12 text-[10px] text-gray-600 uppercase tracking-[0.5em] animate-pulse">
                  // USE_ARROWS_TO_PATCH_VOID //
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="h-10 border-t-2 border-[var(--glitch-magenta)] flex items-center px-4 justify-between bg-black">
        <div className="flex items-center space-x-4">
          <div className="flex space-x-1">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`w-2 h-2 ${Math.random() > 0.5 ? 'bg-cyan-400' : 'bg-magenta-500'}`} />
            ))}
          </div>
          <span className="text-[9px] text-gray-500 uppercase font-black">STDL_OS_ENCRYPTED</span>
        </div>
        <div className="flex items-center space-x-2 text-[9px] text-[var(--glitch-cyan)] font-bold italic">
          <Cpu size={10} />
          <span>SYS_TEMP: {32 + score}°C</span>
        </div>
      </div>
    </div>
  );
}
