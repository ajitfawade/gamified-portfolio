// Main R3F Canvas setup with post-processing
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll, Sky, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import CameraController from "./CameraController";
import { useGameStore } from "@/store/useGameStore";

// Placeholders for environment scene segments (we will build these next)
import HeroScene from "./sections/HeroScene";
import SkillsScene from "./sections/SkillsScene";
import ProjectsScene from "./sections/ProjectsScene";
import ContactScene from "./sections/ContactScene";

export default function CanvasContainer() {
  const gameStarted = useGameStore((state) => state.gameStarted);

  if (!gameStarted) return null; // Keeps the canvas unmounted until loader releases asset thread

  return (
    <div className="fixed inset-0 w-screen h-screen bg-zinc-950 z-0">
      <Canvas
        shadows
        camera={{ fov: 60, near: 0.1, far: 200, position: [0, 5, 10] }}
        gl={{ powerPreference: "high-performance", antialias: false }}
      >
        {/* Core Lighting System */}
        <color attach="background" args={["#09090b"]} />
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0001}
        />

        {/* Atmosphere and depth simulation */}
        <fog attach="fog" args={["#09090b", 30, 90]} />
        <Sky
          sunPosition={[100, 10, 100]}
          distance={450000}
          MieDirectionalG={0.7}
        />
        <Stars
          radius={100}
          depth={50}
          count={2000}
          factor={4}
          saturation={0.5}
          fade
          speed={1}
        />

        {/* Scroll Controls Wrapper: 6 pages long, dampens scroll velocity by 0.3s */}
        <ScrollControls pages={6} damping={0.3} infinite={false}>
          {/* Component driving the active camera alignment path */}
          <CameraController />

          {/* 3D Content space containing all interactive islands */}
          <Suspense fallback={null}>
            <HeroScene position={[0, 0, 0]} />
            <SkillsScene position={[0, 0, -15]} />
            <ProjectsScene position={[0, 0, -35]} />
            {/* Future Scenes can be dropped along the Z axis chain line here */}
          </Suspense>

          {/* Optional: standard html components moving along with the 3D scroll grid */}
          <Scroll html>
            <div className="pointer-events-none select-none">
              {/* Optional absolute standard page indicators can go here */}
            </div>
          </Scroll>
        </ScrollControls>

        {/* Cinematic Game Rendering Post-Processing Pipeline */}
        {/* Replace the standard post-processing block inside CanvasContainer.jsx */}
        <EffectComposer disableNormalPass>
          <Bloom
            intensity={1.5} // Amp up the neon emission paths
            luminanceThreshold={0.15} // Capture lower light signals for ambient glow
            luminanceSmoothing={0.9} // Create smooth, bleeding light halos
            mipmapBlur // High quality blending for light emissions
          />
          <Vignette eskil={false} offset={0.2} darkness={0.85} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
