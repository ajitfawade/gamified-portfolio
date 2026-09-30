// Heads-Up Display (Score, Inventory, Badges)
import React from "react";
import { useGameStore } from "@/store/useGameStore";
import { Trophy, Shield, Layers, Award, Terminal } from "lucide-react";

export default function HUD() {
  const score = useGameStore((state) => state.score);
  const currentSection = useGameStore((state) => state.currentSection);
  const collectedOrbs = useGameStore((state) => state.collectedOrbs);
  const unlockedBadges = useGameStore((state) => state.unlockedBadges);
  const gameStarted = useGameStore((state) => state.gameStarted);
  const bossDefeated = useGameStore((state) => state.bossDefeated);

  if (!gameStarted) return null; // Keeps the HUD invisible until the loading phase completes

  // Stage name conversion keys map lookup
  const STAGE_NAMES = [
    "00 // ENTRY RADAR",
    "01 // TECH ORCHARD",
    "02 // COIN ARCHIVE",
    "03 // ECHO PILLARS",
    "04 // CODEX LORE",
    "05 // DECIDEX BOSS",
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-40 font-mono select-none p-4 flex flex-col justify-between">
      {/* ─── TOP STATUS HEADER GRID ─── */}
      <div className="w-full flex justify-between items-start">
        {/* Player Vital Profiles Block Container */}
        <div className="pointer-events-auto flex flex-col space-y-1.5 p-3 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 rounded shadow-md text-zinc-100 min-w-[200px]">
          <div className="flex items-center space-x-2 border-b border-pink-500/30 pb-1 text-pink-500">
            <Terminal size={14} className="animate-pulse" />
            <span className="text-[10px] tracking-widest font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400">
              SYSTEM OVERRIDE: ACTIVE
            </span>
          </div>

          <div className="w-full h-1.5 bg-zinc-950 border border-pink-500/20 rounded-sm overflow-hidden p-[1px]">
            <div
              className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 shadow-[0_0_12px_rgba(236,72,153,0.8)] transition-all duration-300"
              style={{ width: `${Math.min((score / 2000) * 100, 100)}%` }}
            />
          </div>

          {/* Real-time score readout tracker */}
          <div className="flex justify-between items-center pt-0.5">
            <span className="text-[10px] text-zinc-400 uppercase">
              Total XP:
            </span>
            <span className="text-sm font-black text-amber-400 tracking-wider font-mono">
              {score.toString().padStart(5, "0")}
            </span>
          </div>

          {/* XP Gauge Progression Slider Element */}
          <div className="w-full h-1.5 bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden p-[1px]">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all duration-300"
              style={{ width: `${Math.min((score / 2000) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Current Active Checkpoint Stage Monitor */}
        <div className="pointer-events-auto px-4 py-2.5 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 rounded shadow-md text-center">
          <div className="text-[8px] text-zinc-500 uppercase tracking-widest mb-0.5">
            CURRENT NAVIGATION ZONE
          </div>
          <div className="text-xs font-black text-zinc-100 tracking-wide uppercase transition-all duration-200">
            {STAGE_NAMES[currentSection] || "UNKNOWN COORD"}
          </div>
        </div>

        {/* Dynamic Achievements Tracker Deck */}
        <div className="pointer-events-auto flex flex-col items-end space-y-1">
          <div className="p-3 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 rounded shadow-md flex items-center space-x-3 text-zinc-100">
            <div className="text-right">
              <div className="text-[8px] text-zinc-500 uppercase">
                Unlocked Badges
              </div>
              <div className="text-xs font-black text-zinc-200">
                {unlockedBadges.length} Active
              </div>
            </div>
            <div className="p-1.5 bg-zinc-900 border border-zinc-800 rounded text-amber-400 shadow-inner">
              <Trophy
                size={16}
                className={unlockedBadges.length > 0 ? "animate-bounce" : ""}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ─── MIDDLE TOAST NOTIFICATION BADGES SLOT ─── */}
      <div className="w-full flex justify-center items-center h-0 overflow-visible">
        {bossDefeated && (
          <div className="bg-emerald-500/90 text-zinc-950 text-[10px] font-black tracking-widest px-4 py-2 border border-emerald-400 rounded shadow-[0_0_25px_rgba(16,185,129,0.6)] uppercase animate-pulse select-none">
            🏆 ALL PRIMARY MISSIONS CLEARED // PORTAL ACTIVE
          </div>
        )}
      </div>

      {/* ─── BOTTOM GAME INVENTORY SYSTEMS ─── */}
      <div className="w-full flex justify-between items-end">
        {/* Inventory Bag Item Metrics Tracker */}
        <div className="pointer-events-auto flex items-center space-x-4 p-3 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 rounded shadow-md text-zinc-100">
          <div className="flex flex-col">
            <span className="text-[8px] text-zinc-500 uppercase tracking-wider mb-1">
              INVENTORY CORE
            </span>
            <div className="flex items-center space-x-3">
              {/* Collected Orbs Mini Dashboard Counter */}
              <div className="flex items-center space-x-1.5 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
                <Shield size={12} className="text-cyan-400" />
                <span className="text-[10px] font-bold text-zinc-300">
                  ORBS: {collectedOrbs.length}/5
                </span>
              </div>

              {/* Boss Access Token Key Verification Node */}
              <div
                className={`flex items-center space-x-1.5 px-2 py-1 rounded border ${bossDefeated ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-400" : "bg-zinc-900 border-zinc-800 text-zinc-500"}`}
              >
                <Award size={12} />
                <span className="text-[10px] font-bold uppercase">
                  {bossDefeated ? "BOSS DEFEATED" : "BOSS LOCK"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Interaction HUD Hints Interface Node */}
        <div className="text-right text-[9px] text-zinc-500 p-2 bg-zinc-950/30 rounded border border-zinc-900/40 backdrop-blur-sm tracking-wide leading-relaxed max-w-[240px]">
          [SCROLL MOUSE] TO STEER AVATAR CAMERA PATH <br />
          [LEFT CLICK 3D OBJECTS] TO INTERACT & ABSORB METRICS
        </div>
      </div>
    </div>
  );
}
