# 🕹️ The Dev's Odyssey // Interactive 3D Cyberpunk Portfolio

An immersive, gamified 3D portfolio experience built with **React Three Fiber (R3F)**, **Three.js**, and **Zustand**. This application transforms traditional resume sections into a playable linear sky-island path where mouse scrolls map directly to 3D cinematic camera paths.

![Theme](https://shields.io)
![FPS](https://shields.io)
![Tech](https://shields.io)

---

## 🗺️ Project Level Map & Coordinates

The entire universe is arranged linearly along negative paths of the **Z-axis**. Scrolling your mouse wheel drives the WebGL camera down the line through specific level phases:

| Stage Index | Navigation Zone | Z-Coordinate | Interaction Type |
| :--- | :--- | :--- | :--- |
| **Stage 00** | `ENTRY RADAR` (Hero Landing) | `[0, 2, 0]` | 3D Float Titles & Intro Mesh |
| **Stage 01** | `TECH ORCHARD` (Skills) | `[0, 0, -15]` | Click/Hover Collectible Orbs (+100 XP) |
| **Stage 02** | `COIN ARCHIVE` (Projects) | `[0, 0, -35]` | Interactive 3D Arcade Cubes with DOM Portals |
| **Stage 03** | `ECHO PILLARS` (Testimonials) | `[0, 0, -55]` | Ambient Light Proximity Triggers |
| **Stage 04** | `CODEX LORE` (Blog Archive) | `[0, 0, -75]` | Fragment Collectors |
| **Stage 05** | `DECIDEX BOSS` (Contact Form) | `[0, 0, -95]` | Interactive Security Trivia Monolith + Gate Form |

---

## 🛠️ Architecture & Tech Stack

- **Core Engine:** React 18 + Vite (configured for rapid code-splitting and asset resolution)
- **3D Graphic Wrappers:** `@react-three/fiber` & `@react-three/drei`
- **State System:** `Zustand` (Central atomic data hook mapping both 3D meshes and 2D UI elements)
- **Interface Deck:** Tailwind CSS v3 (providing absolute glassmorphism HUD layers)
- **Cinematic Post-Processing:** `@react-three/postprocessing` (High-intensity Mipmap Bloom & Retro Vignette)

---

## 📂 Codebase File Structure

```text
gamified-portfolio/
├── .github/                     # AI Context Rules & Issue Blueprints
├── public/                      # Static fonts, audio vectors, and structural nodes
├── src/
│   ├── components/
│   │   ├── 3d/                  # WebGL Canvas Ecosystem Components
│   │   │   ├── CanvasContainer.jsx   # Master canvas context & post-processing filters
│   │   │   ├── CameraController.jsx  # Interpolates camera paths bound to viewport scroll
│   │   │   └── sections/        # Section-by-section 3D space segments
│   │   └── ui/                  # 2D Transparant DOM Overlay Elements
│   │       ├── HUD.jsx          # Heads-Up Display Console (Tracks Score, Inventory, Stages)
│   │       └── LoadingScreen.jsx # Retro boot sequencer synced with React Suspense
│   ├── store/
│   │   └── useGameStore.js      # Global Zustand core state engine
│   ├── styles/
│   │   └── globals.css          # CSS resets, hidden scrollbars, and neon color profiles
│   ├── App.jsx                  # Root layout orchestration frame
│   └── main.jsx                 # Virtual DOM rendering anchor
```

---

## ⚡ 60 FPS Performance Mandates

To protect the frame rate across mobile viewports, all changes to this code must adhere to these golden optimizations:
1. **Zero Garbage Collection inside Render Loops:** Never use `new THREE.Vector3()` or similar constructors inside an active `useFrame()` hook. Instantiate variables outside loops or reuse references.
2. **Raycast Event Halts:** Always place `e.stopPropagation()` inside 3D mesh interaction point loops (`onClick`, `onPointerOver`) to kill unnecessary downstream raycasting.
3. **Procedural Dominance:** Rely on native geometries (`octahedronGeometry`, etc.) styled with high `emissiveIntensity` values rather than heavy exterior 3D asset file imports.

---

## 🚀 Boot Sequence (Local Installation)

Follow these terminal commands to launch the local grid engine:

1. **Clone the repository context:**
   ```bash
   git clone https://github.com
   cd repo-name
   ```

2. **Hydrate dependency packages:**
   ```bash
   npm install
   ```

3. **Fire up local host relays:**
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:3000`, hit **"PRESS START TO PLAY"**, and enjoy the journey!

---

## 🦾 AI Copilot & Assistant Context

This repository is equipped with global prompt files located inside the `.github/` folder. When prompting AI code assistants like GitHub Copilot or Cursor, they will automatically match this codebase's coordinate spaces, structural colors, and performance frameworks without breaking existing modules.
