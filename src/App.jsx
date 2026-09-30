import React from 'react';
import LoadingScreen from '@/components/ui/LoadingScreen';
import HUD from '@/components/ui/HUD';
import CanvasContainer from '@/components/3d/CanvasContainer';

export default function App() {
  return (
    <div className="relative w-full h-full min-h-screen bg-zinc-950 text-zinc-100 overflow-hidden font-mono">
      
      {/* 1. RETRO GAME BOOT LOADING LAYER */}
      {/* Listens to Three.js texture loading threads and prevents access until 100% hydration */}
      <LoadingScreen />

      {/* 2. PLAYER HEADS-UP DISPLAY OVERLAY (2D HUD) */}
      {/* Absolute floating panel layer tracking active XP, game badges, and navigation zones */}
      <HUD />

      {/* 3. CORE WEBGL 3D INTERACTIVE WORLD GRID */}
      {/* Contains your scrolling timelines, camera path splines, and geometric islands */}
      <CanvasContainer />
      
    </div>
  );
}
