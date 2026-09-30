// Retro pre-loader backed by React Suspense
import React, { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";

export default function LoadingScreen() {
  // useProgress automatically intercepts all asset loading from R3F Canvas components
  const { active, progress, errors, item, loaded, total } = useProgress();
  const startGame = useGameStore((state) => state.startGame);
  const gameStarted = useGameStore((state) => state.gameStarted);

  const [glitchText, setGlitchText] = useState("LOADING SYSTEM...");

  // Fun retro console log lines mimicking a boot sequence
  const bootLogs = [
    "Initializing WebGL Context...",
    "Allocating vertex buffers...",
    "Compiling custom shaders...",
    "Hydrating Draco meshes...",
    "Baking environment lightmaps...",
    "Mounting physics engine layer...",
    "System status: OPTIMAL.",
  ];

  const currentLogIndex = Math.min(
    Math.floor((progress / 100) * bootLogs.length),
    bootLogs.length - 1,
  );

  // Subtle retro screen glitch effect text switcher
  useEffect(() => {
    if (progress === 100) {
      setGlitchText("SYSTEM READY");
      return;
    }
    const intervals = ["L0AD1NG...", "LOADING SYSTEM...", "SYS_LOAD_INIT..."];
    const timer = setInterval(() => {
      setGlitchText(intervals[Math.floor(Math.random() * intervals.length)]);
    }, 400);
    return () => clearInterval(timer);
  }, [progress]);

  return (
    <AnimatePresence>
      {!gameStarted && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-950 font-mono text-emerald-400 select-none overflow-hidden"
        >
          {/* Retro CRT Scanline overlay effect */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-50 animate-pulse" />

          <div className="w-full max-w-md p-6 border border-emerald-500/30 bg-zinc-900/50 backdrop-blur-md rounded shadow-[0_0_20px_rgba(16,185,129,0.1)] relative">
            {/* Header / Title */}
            <div className="flex justify-between items-center mb-6 border-b border-emerald-500/20 pb-2">
              <h1 className="text-sm font-bold tracking-widest uppercase animate-pulse">
                👾 {glitchText}
              </h1>
              <span className="text-xs text-emerald-500/60">V1.0.0-PROD</span>
            </div>

            {/* Simulated Live Console Logs */}
            <div className="h-20 flex flex-col justify-end text-[11px] text-emerald-500/70 space-y-1 mb-6 overflow-hidden">
              {bootLogs.slice(0, currentLogIndex + 1).map((log, index) => (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={index}
                  className="truncate"
                >
                  &gt; {log}
                </motion.div>
              ))}
              {active && item && (
                <div className="text-amber-400/80 truncate text-[10px]">
                  Fetching: {item.substring(item.lastIndexOf("/") + 1)}
                </div>
              )}
            </div>

            {/* Custom Interactive Progress Bar */}
            <div className="relative w-full h-6 border border-emerald-500/40 bg-zinc-950 p-[2px] overflow-hidden mb-6">
              <motion.div
                className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.7)]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-zinc-100 mix-blend-difference">
                {Math.round(progress)}% ({loaded}/{total})
              </div>
            </div>

            {/* Action Controller Trigger */}
            {/* Look for this specific section at the bottom of LoadingScreen.jsx and swap it out */}
            <div className="flex flex-col items-center">
              {progress < 100 && total > 0 ? (
                <div className="text-xs text-emerald-500/40 animate-bounce tracking-wider">
                  STREAMING METADATA ORBS...
                </div>
              ) : (
                <motion.button
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 15px rgba(16, 185, 129, 0.6)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startGame}
                  className="w-full py-3 bg-emerald-500 text-zinc-950 font-bold text-sm tracking-widest uppercase border border-emerald-400 rounded cursor-pointer transition-shadow"
                >
                  PRESS START TO PLAY
                </motion.button>
              )}
            </div>
          </div>

          {/* Footer Navigation Hints */}
          <div className="absolute bottom-6 text-[10px] text-emerald-500/30 text-center uppercase tracking-wide">
            Use Desktop Mouse Scroll or Swipe to Control Movement Path
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
