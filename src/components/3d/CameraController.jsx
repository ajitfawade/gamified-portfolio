// Tracks camera position bound to scroll

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";
import { useGameStore } from "@/store/useGameStore";

// Define a linear path for the camera to follow per section
// Format: { pos: [x, y, z], target: [x, y, z] }
const PATH_WAYPOINTS = [
  { pos: new THREE.Vector3(0, 5, 10), target: new THREE.Vector3(0, 2, 0) }, // 0: Hero
  { pos: new THREE.Vector3(0, 4, -10), target: new THREE.Vector3(0, 1, -15) }, // 1: Skills
  { pos: new THREE.Vector3(10, 3, -30), target: new THREE.Vector3(0, 1, -30) }, // 2: Projects
  { pos: new THREE.Vector3(-10, 4, -50), target: new THREE.Vector3(0, 2, -50) }, // 3: Testimonials
  { pos: new THREE.Vector3(0, 8, -70), target: new THREE.Vector3(0, 1, -75) }, // 4: Blog
  { pos: new THREE.Vector3(0, 3, -95), target: new THREE.Vector3(0, 2, -100) }, // 5: Contact
];

export default function CameraController() {
  const scrollData = useScroll();
  const setSection = useGameStore((state) => state.setSection);

  // Local tracking objects to prevent continuous garabage collection overhead
  const currentPos = new THREE.Vector3();
  const currentTarget = new THREE.Vector3();

  useFrame((state) => {
    // scrollData.offset goes from 0 (top) to 1 (bottom)
    const offset = scrollData.offset;
    const totalSections = PATH_WAYPOINTS.length - 1;

    // Determine which section segment the user is currently scrolling through
    const rawIndex = offset * totalSections;
    const currentWaypointIndex = Math.min(
      Math.floor(rawIndex),
      totalSections - 1,
    );
    const nextWaypointIndex = currentWaypointIndex + 1;

    // Calculate the percentage of scroll progress within that specific section
    const sectionProgress = rawIndex - currentWaypointIndex;

    // Sync the section indices back to our global Zustand store for UI states
    const activeSection = Math.round(rawIndex);
    setSection(activeSection);

    const startWaypoint = PATH_WAYPOINTS[currentWaypointIndex];
    const endWaypoint = PATH_WAYPOINTS[nextWaypointIndex];

    // Linearly interpolate positions across 3D coordinates based on section scroll depth
    currentPos.lerpVectors(startWaypoint.pos, endWaypoint.pos, sectionProgress);
    currentTarget.lerpVectors(
      startWaypoint.target,
      endWaypoint.target,
      sectionProgress,
    );

    // Smoothly damp the actual camera position and lookAt target for a cinematic feeling
    state.camera.position.lerp(currentPos, 0.1);

    // Set camera target vectors
    const lookTarget = new THREE.Vector3();
    state.camera.lookAt(currentTarget);
  });

  return null;
}
