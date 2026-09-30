Act as an elite frontend engineer and creative WebGL developer specializing in React Three Fiber (R3F), @react-three/drei, Zustand, and Tailwind CSS. 

We are building a gamified, immersive 3D portfolio website styled with a Neon Cyberpunk / Synthwave aesthetic called "The Dev's Odyssey". The project is structured as a Vite + React application.

I have already initialized the core repository structure and configured the toolchains, state, styling, and entry hooks. Your job is to help me continue development seamlessly without losing any context or breaking established mechanics.

### 📌 1. ESTABLISHED ARCHITECTURE & DIRECTORY BLUEPRINT
The codebase is arranged exactly as follows:
- `index.html`: Viewport locked (`user-scalable=no, maximum-scale=1.0, viewport-fit=cover`) to prevent mobile canvas zoom bugs.
- `src/styles/globals.css`: Tailwind initialized, standard browser scrollbars are hidden (`display: none`), and standard HTML selection behaviors are disabled.
- `src/store/useGameStore.js`: A central Zustand store managing global game states (`score`, `currentSection`, `collectedOrbs`, `unlockedBadges`, `quizAnswers`, `bossDefeated`, `gameStarted`).
- `src/components/ui/LoadingScreen.jsx`: A retro CRT pre-loader tracking asset hydration via drei's `useProgress`. It includes a custom fix to auto-unlock when `total === 0` (preventing freezes on procedural geometry builds).
- `src/components/ui/HUD.jsx`: A fixed, absolute 2D transparent overlay built with Tailwind CSS that mirrors Zustand engine state changes (XP tracking, Badge counters, Zone indicators).
- `src/components/3d/CanvasContainer.jsx`: Hosts the WebGL frame context with dark background fog, default lighting rigs, and post-processing (`EffectComposer`, `Bloom` with high intensity/mipmapBlur, and `Vignette`).
- `src/components/3d/CameraController.jsx`: Tied into Drei's `<ScrollControls pages={6}>`. It maps the mouse scroll wheel offset (0 to 1) across a linear pathway of 3D spatial vector checkpoints moving down the negative Z-axis.

### 📐 2. LEVEL COORDINATES & STAGE SCEMAS
Our scenes are nested inside the canvas wrapper along a continuous Z-axis track:
1. Stage 00 (`HeroScene.jsx`) -> Position: [0, 0, 0] // Reflective dark grid platform with neon pink/cyan lines, floating procedural core, and retro 3D arcade typography.
2. Stage 01 (`SkillsScene.jsx`) -> Position: [0, 0, -15] // "Tech Orchard" populated with procedural `octahedronGeometry` crystal orbs. Hover/click interactions register with Zustand, updating score (+100 XP) and checking off skill items.
3. Stage 02 (`ProjectsScene.jsx`) -> Position: [0, 0, -35] // "The Archive" hosting procedural 3D arcade cabinet boxes built with native meshes. Leverages drei's `<Html transform occlude>` to project highly styling responsive 2D DOM cards into WebGL screen spaces.
4. Stage 03 (`EchoPillars.jsx`) -> Position: [0, 0, -55] // Testimonials and recommendations area (Pending build).
5. Stage 04 (`CodexLore.jsx`) -> Position: [0, 0, -75] // Interactive blog post fragments (Pending build).
6. Stage 05 (`ContactScene.jsx`) -> Position: [0, 0, -95] // "Final Boss Monolith". Blocks contact form behind an interactive technical trivia selector widget. Answering correctly updates Zustand flags, adds 1,000 XP, fires a canvas confetti splash, and scales a glowing portal open to display the contact inputs.

### ⚡ 3. PERFORMANCE & DESIGN CONSTRAINTS (60 FPS MANDATES)
When writing or expanding any components, you must adhere strictly to these rules:
- **Zero Garbage Collection inside Render Loops:** Never declare `new THREE.Vector3()`, `new THREE.Euler()`, or object allocations inside `useFrame()`. Instantiate variables globally or look for reference hooks outside the animation loops.
- **Event Bubble Containment:** Always place `e.stopPropagation()` inside 3D mesh interaction point loops (`onClick`, `onPointerOver`, `onPointerOut`) to kill downstream raycasting overloads.
- **Styling Rules:** Maintain the neon cyberpunk palette (`#ff007f` pink, `#06b6d4` cyan, `#09090b` obsidian background) across both 3D meshes (high `emissiveIntensity`, low `roughness` for deep chrome reflection mapping) and Tailwind classes. Rely on fast procedural shapes; do not request external heavier mesh loaders unless specified.

---

### 🕹️ NEXT OBJECTIVE
I want to continue developing the remaining parts of this template. Please acknowledge that you have fully absorbed this repository layout, state structure, positioning guidelines, and performance metrics. 

Once ready, ask me which specific component or stage you should generate next.
