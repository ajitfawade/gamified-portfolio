# 🕹️ Project Context & Rules: 3D Gamified Cyberpunk Portfolio

You are an expert AI development assistant specializing in React Three Fiber (R3F), WebGL optimizations, and framer-motion/Tailwind UI integrations. Adhere to these architectural rules strictly.

## 🛠️ Core Technology Stack
- **Framework:** Vite + React 18 (Mono-repo design)
- **3D Graphics:** `@react-three/fiber`, `@react-three/drei`
- **Animation & Layout:** `framer-motion`, `gsap`, `Tailwind CSS (v3)`
- **State Management:** `zustand` (Single atomic store at `src/store/useGameStore.js`)
- **Physics Engine:** `@react-three/rapier` (Optional/Contextual physics loops)

## 📌 Structural Layout & Coordinates
- The application uses an linear scroll-linked tracking coordinate engine driven by Drei's `<ScrollControls>` spanning **6 virtual page zones**.
- All scene components are absolute nodes nested linearly along the **negative Z-axis**:
  - `HeroScene.jsx` -> Position: `[0, 0, 0]` (Page Index: 0)
  - `SkillsScene.jsx` -> Position: `[0, 0, -15]` (Page Index: 1)
  - `ProjectsScene.jsx` -> Position: `[0, 0, -35]` (Page Index: 2)
  - `ContactScene.jsx` -> Position: `[0, 0, -95]` (Page Index: 5)

## 🎨 Visual Identity: Cyberpunk / Synthwave Neon Gridworld
- **Primary Color:** Cyberpunk Pink `#ff007f` / `text-pink-500`
- **Secondary Color:** Synthwave Cyan `#06b6d4` / `text-cyan-400`
- **Base Background:** Zinc Obsidian Darkness `#09090b` / `bg-zinc-950`
- **Materials Rule:** Rely primarily on lightweight, procedural ThreeJS geometries (`boxGeometry`, `planeGeometry`, `octahedronGeometry`) combined with high `emissiveIntensity` values (1.0 to 2.5) and metallic reflective meshes (`roughness: 0.05`, `metalness: 0.9`) to let the post-processing Bloom filter generate glowing visual neon outlines. Do NOT generate imports for heavy external `.glb` meshes unless explicitly instructed.

## ⚡ Performance Optimization Mandates (60 FPS Blueprint)
1. **No Garbage Collection Overhead:** Never declare new instances of `THREE.Vector3()`, `THREE.Euler()`, or `THREE.Color()` inside an active `useFrame()` frame loop sequence. Always instantiate reusable reference variables outside the component hook loop or use references.
2. **Event Bubble Halts:** Always append `e.stopPropagation()` inside 3D mesh interaction pointer loops (`onClick`, `onPointerOver`, `onPointerOut`) to prevent underlying multi-raycast execution blocks.
3. ** crisp HTML Layers:** When using Drei's `<Html />` overlay wrappers inside a WebGL canvas, always apply `transform`, `occlude`, and explicit styling sizes to prevent layout pixelation or screen tearing.

## 🧩 Zustand State Rules
- Read state safely using atomic component hook selectors: `const score = useGameStore((state) => state.score);`
- Trigger global actions using standard action dispatch protocols: `const collectOrb = useGameStore((state) => state.collectOrb);`
