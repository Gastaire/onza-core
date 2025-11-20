"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, Sphere, MeshDistortMaterial, PerspectiveCamera, Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function InteractiveShape() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Smooth gentle rotation
    meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.05;

    // Mouse Interaction: Look at cursor
    // We lerp (linear interpolate) the rotation to target mouse position for smoothness
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      state.mouse.y * 0.5, // Vertical tilt
      0.1
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      state.mouse.x * 0.5, // Horizontal tilt
      0.1
    );
  });

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Core Geometric Shape */}
        <Icosahedron args={[1.2, 0]}>
          <MeshDistortMaterial
            color="#1B4D3E" // Aston Martin Green
            roughness={0.1}
            metalness={0.9} // High metalness for luxury feel
            distort={0.3}
            speed={1.5}
            wireframe={false}
          />
        </Icosahedron>
        
        {/* Outer Wireframe Cage for "Tech" feel */}
        <Sphere args={[1.8, 32, 32]}>
           <meshStandardMaterial
             color="#D4AF37" // Gold Accent
             wireframe
             transparent
             opacity={0.1}
           />
        </Sphere>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        
        {/* Dramatic Lighting Setup */}
        <ambientLight intensity={0.5} color="#1B4D3E" /> {/* Green Ambient */}
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          color="#D4AF37" // Gold Spot
          intensity={2} 
          castShadow 
        />
        <pointLight position={[-10, -10, -10]} color="#EFE5D6" intensity={0.5} /> {/* Cream Fill */}
        
        <InteractiveShape />
      </Canvas>
    </div>
  );
}