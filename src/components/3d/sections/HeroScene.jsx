import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text, Center } from "@react-three/drei";

export default function HeroScene({ position }) {
  const meshRef = useRef();
  const gridRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Rotate the abstract floating core item
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.5;
      meshRef.current.rotation.x = time * 0.2;
    }
    // Subtly pulse the wireframe floor grid color
    if (gridRef.current) {
      gridRef.current.material.opacity = 0.2 + Math.sin(time * 2) * 0.05;
    }
  });

  return (
    <group position={position}>
      {/* 1. Ambient Floating Elements */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        <mesh ref={meshRef} position={[0, 2, -4]} castShadow>
          <icosahedronGeometry args={[2, 1]} />
          <meshStandardMaterial
            color="#10b981"
            wireframe
            emissive="#10b981"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      {/* 2. Floating 3D Portfolio Text Header */}
      <Center position={[0, 4, 0]}>
        <Float speed={1.5} floatIntensity={0.5}>
          <Text
            fontSize={0.8}
            color="#ffffff"
            font="https://gstatic.com" // Arcade Font
            anchorX="center"
            anchorY="middle"
          >
            THE DEV'S ODYSSEY
          </Text>
        </Float>
      </Center>

      <Center position={[0, 2.8, 0]}>
        <Text
          fontSize={0.3}
          color="#10b981"
          font="https://gstatic.com"
          anchorX="center"
        >
          SCROLL TO EXPLORE ARCHIVE
        </Text>
      </Center>

      {/* 3. The Playable Pathway Grid Floor */}
      {/* Replace the wireframe overlay inside HeroScene.jsx with a holographic neon mesh */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, -5]}
        receiveShadow
      >
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial
          color="#020005"
          roughness={0.05} // High reflectivity for neon bounces
          metalness={0.9}
        />
      </mesh>

      {/* Enhanced Neon Secondary Crossgrid */}
      <gridHelper
        ref={gridRef}
        args={[60, 40, "#ff007f", "#06b6d4"]} // Neon Pink primary, Cyan secondary anchors
        position={[0, -0.48, -5]}
        transparent
      />
    </group>
  );
}
