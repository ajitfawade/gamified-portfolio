import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text, Html } from "@react-three/drei";
import * as THREE from "three";

// Individual Arcade Cabinet Component
function ArcadeCabinet({
  title,
  description,
  tags,
  link,
  position,
  rotation,
  color,
}) {
  const cabinetRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (cabinetRef.current && !active) {
      // Gentle floating animation while idle
      cabinetRef.current.position.y =
        position[1] + Math.sin(time * 1.5 + position[0]) * 0.1;
    }
  });

  return (
    <group position={position} rotation={rotation} ref={cabinetRef}>
      {/* 1. Cabinet Main Chassis Base Structure */}
      {/* Main Chassis Base Upgrade */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.6, 3, 1.2]} />
        <meshStandardMaterial color="#09090b" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* High-intensity Tron lighting strip wrap */}
      <mesh position={[0, 0, 0.61]}>
        <boxGeometry args={[1.62, 3.02, 0.02]} />
        <meshStandardMaterial
          color="#06b6d4"
          wireframe
          emissive="#06b6d4"
          emissiveIntensity={hovered ? 2.0 : 0.5}
        />
      </mesh>

      {/* Retro Colored Side Decal Accents */}
      <mesh position={[0.81, 0, 0]}>
        <boxGeometry args={[0.02, 2.8, 1]} />
        <meshStandardMaterial
          color="#18181b"
          emissive={hovered ? color : "#000000"}
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh position={[-0.81, 0, 0]}>
        <boxGeometry args={[0.02, 2.8, 1]} />
        <meshStandardMaterial
          color="#18181b"
          emissive={hovered ? color : "#000000"}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* 2. Slanted Arcade Controller Pad Panel */}
      <mesh position={[0, -0.2, 0.6]} rotation={[Math.PI / 6, 0, 0]} castShadow>
        <boxGeometry args={[1.5, 0.2, 0.5]} />
        <meshStandardMaterial color="#27272a" roughness={0.5} />
      </mesh>
      {/* Visual Joystick and buttons mockups using tiny spheres */}
      <mesh position={[-0.3, -0.1, 0.7]} rotation={[Math.PI / 6, 0, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      <mesh position={[0.2, -0.15, 0.7]} rotation={[Math.PI / 6, 0, 0]}>
        <boxGeometry args={[0.04, 0.04, 0.04]} />
        <meshStandardMaterial color="#eab308" />
      </mesh>

      {/* 3. The Interactive Screen Area */}
      <mesh
        position={[0, 0.6, 0.52]}
        rotation={[-Math.PI / 12, 0, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          setActive(!active);
        }}
      >
        <planeGeometry args={[1.4, 0.9]} />
        {/* Glow shader effect simulating standard CRT monitors */}
        <meshStandardMaterial
          color={hovered ? "#ffffff" : "#a1a1aa"}
          emissive={color}
          emissiveIntensity={hovered ? 0.6 : 0.2}
          roughness={0.1}
        />

        {/* 4. HTML DOM UI Portal injected inside the 3D Canvas Mesh context */}
        <Html
          transform
          occlude
          distanceFactor={1.5}
          position={[0, 0, 0.02]}
          className="w-[280px] h-[180px] bg-zinc-950 text-white font-mono select-none flex flex-col justify-between p-3 border border-zinc-700/50 rounded overflow-hidden pointer-events-none"
        >
          <div className="flex flex-col space-y-1">
            <div className="text-[11px] font-bold text-emerald-400 truncate tracking-wider uppercase">
              {hovered ? "🕹️ INSERT COIN" : "READY TO PLAY"}
            </div>
            <h3 className="text-xs font-black truncate text-zinc-100">
              {title}
            </h3>
            <p className="text-[9px] text-zinc-400 line-clamp-3 leading-tight">
              {description}
            </p>
          </div>

          <div className="flex flex-col space-y-1.5">
            <div className="flex flex-wrap gap-1">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[7px] bg-zinc-800 px-1 py-0.5 rounded text-zinc-300 border border-zinc-700/30"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="pointer-events-auto block w-full py-1 text-center bg-emerald-500 text-zinc-950 font-bold text-[9px] rounded hover:bg-emerald-400 active:scale-95 transition-all uppercase tracking-wider"
            >
              LAUNCH PROJECT &gt;
            </a>
          </div>
        </Html>
      </mesh>

      {/* 5. Top Glowing Marquee Header Component */}
      <mesh position={[0, 1.4, 0.45]} castShadow>
        <boxGeometry args={[1.5, 0.35, 0.3]} />
        <meshStandardMaterial color="#111827" />
      </mesh>
      <Text
        position={[0, 1.4, 0.61]}
        fontSize={0.12}
        color="#ffffff"
        font="https://gstatic.com"
        anchorX="center"
        anchorY="middle"
      >
        ARCADE
      </Text>
    </group>
  );
}

// Master Stage Wrapper for Section 2: Projects Showcase
export default function ProjectsScene({ position }) {
  const projectsList = [
    {
      title: "E-Commerce Realm",
      description:
        "A full-stack marketplace featuring lightning fast SSR pipelines and robust multi-vendor routing schemas.",
      tags: ["Next.js", "GraphQL", "Stripe"],
      link: "https://github.com",
      color: "#3b82f6", // Blue
      coords: [-2.2, 1, 0],
      rotations: [0, Math.PI / 6, 0],
    },
    {
      title: "AI Canvas Builder",
      description:
        "Neural network layer generation tools allowing live vector modification directly from text prompts.",
      tags: ["Python", "React", "WebSockets"],
      link: "https://github.com",
      color: "#8b5cf6", // Purple
      coords: [0, 1, -1],
      rotations: [0, 0, 0],
    },
    {
      title: "Voxel Physics Sandbox",
      description:
        "High speed component raycasting grid simulating dynamic cellular automaton fluid algorithms.",
      tags: ["Rust", "WASM", "WebGL"],
      link: "https://github.com",
      color: "#ec4899", // Pink
      coords: [2.2, 1, 0],
      rotations: [0, -Math.PI / 6, 0],
    },
  ];

  return (
    <group position={position}>
      {/* Floating Arena Section Backdrop Label Tag */}
      <Text
        position={[0, 4.5, -5]}
        fontSize={0.6}
        color="#27272a"
        font="https://gstatic.com"
        anchorX="center"
      >
        STAGE 02: THE ARCHIVE
      </Text>

      {/* Render the collection of project interactive cabinets */}
      {projectsList.map((project, index) => (
        <ArcadeCabinet
          key={index}
          title={project.title}
          description={project.description}
          tags={project.tags}
          link={project.link}
          position={project.coords}
          rotation={project.rotations}
          color={project.color}
        />
      ))}

      {/* Section Level Geometric Pathway Mesh Stage Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, 0]}
        receiveShadow
      >
        <planeGeometry args={[12, 10]} />
        <meshStandardMaterial color="#09090b" roughness={0.7} />
      </mesh>
      <gridHelper
        args={[12, 10, "#ec4899", "#27272a"]}
        position={[0, -0.49, 0]}
      />
    </group>
  );
}
