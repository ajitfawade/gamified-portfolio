import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import { useGameStore } from "@/store/useGameStore";

// Individual Interactive Orb Mesh
function SkillOrb({ name, color, position }) {
  const orbRef = useRef();
  const collectOrb = useGameStore((state) => state.collectOrb);
  const collectedOrbs = useGameStore((state) => state.collectedOrbs);
  const [hovered, setHovered] = useState(false);

  const isCollected = collectedOrbs.includes(name);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (orbRef.current) {
      // Fast spin if item is collected, slow idle spin otherwise
      orbRef.current.rotation.y = time * (isCollected ? 3 : 1);
      // Continuous floating hover adjustment
      orbRef.current.position.y =
        position[1] + Math.sin(time * 2 + position[0]) * 0.2;
    }
  });

  const handleInteraction = () => {
    if (!isCollected) {
      collectOrb(name);
      // Optional: Add simple console printout confirming collision validation
      console.log(`[GAME ENGINE] Absorbed Skill Orb: ${name} (+100 XP)`);
    }
  };

  return (
    <group position={[position[0], 0, position[2]]}>
      {/* Text label floating above the crystal mesh structure */}
      <Text
        position={[0, position[1] + 1.2, 0]}
        fontSize={0.25}
        color={isCollected ? "#ffffff" : color}
        font="https://gstatic.com"
        anchorX="center"
      >
        {isCollected ? `✓ ${name}` : name}
      </Text>

      {/* The Crystal Mesh Container */}
      <mesh
        ref={orbRef}
        position={[0, position, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          handleInteraction();
        }}
      >
        <octahedronGeometry args={[hovered ? 0.65 : 0.5, 0]} />
        <meshStandardMaterial
          color={isCollected ? "#06b6d4" : "#ff007f"}
          wireframe={hovered || !isCollected} // Dynamic holo-grid mode
          roughness={0.1}
          metalness={1.0}
          emissive={isCollected ? "#06b6d4" : "#ff007f"}
          emissiveIntensity={hovered ? 2.5 : 1.0} // Massive cyber glow amplification
        />
      </mesh>
    </group>
  );
}

// Master Container Layer for the Skills Arena Environment
export default function SkillsScene({ position }) {
  const skillList = [
    { name: "React", color: "#61dafb", coords: [-3, 1.5, 2] },
    { name: "Three.js", color: "#ff007f", coords: [0, 2, -2] },
    { name: "Node.js", color: "#339933", coords: [3, 1.2, 3] },
    { name: "Tailwind", color: "#38bdf8", coords: [-2, 1.8, -4] },
    { name: "Python", color: "#ffd43b", coords: [2.5, 1.6, -2] },
  ];

  return (
    <group position={position}>
      {/* Section Background Indicator Label */}
      <Text
        position={[0, 4.5, -6]}
        fontSize={0.6}
        color="#27272a"
        font="https://gstatic.com"
        anchorX="center"
      >
        STAGE 01: TECH ORCHARD
      </Text>

      {/* Render the collection of skill objects inside our grid map space */}
      {skillList.map((skill, i) => (
        <SkillOrb
          key={i}
          name={skill.name}
          color={skill.color}
          position={skill.coords}
        />
      ))}

      {/* Standard geometric ground pathway mesh layout platform for current section stage */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, 0]}
        receiveShadow
      >
        <planeGeometry args={[14, 16]} />
        <meshStandardMaterial color="#0c0a09" roughness={0.9} />
      </mesh>
      <gridHelper
        args={[16, 16, "#3f3f46", "#1c1917"]}
        position={[0, -0.49, 0]}
      />
    </group>
  );
}
