'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

export default function InteractiveHero() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Smooth rotation
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.25;

    // Morph logic handled by material props transition
    // We can lerp material properties here if needed for smoother transition than React state
    const targetScale = hovered ? 1.2 : 1;
    meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1);
    meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, targetScale, 0.1);
    meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, targetScale, 0.1);
  });

  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <mesh 
        ref={meshRef} 
        onPointerOver={() => setHover(true)} 
        onPointerOut={() => setHover(false)}
        position={[0, 0, 0]}
      >
        {/* High segment sphere for smooth distortion */}
        <sphereGeometry args={[2, 64, 64]} />
        <MeshDistortMaterial
          color={hovered ? "#D4AF37" : "#0B1210"}
          attach="material"
          distort={hovered ? 0.3 : 1} // High distortion (messy) when not hovered, smooth when hovered (solid orb)
          speed={hovered ? 2 : 5}
          roughness={hovered ? 0.1 : 0.9}
          metalness={hovered ? 1 : 0.1}
          emissive={hovered ? "#D4AF37" : "#1B4D3E"}
          emissiveIntensity={hovered ? 0.5 : 0.1}
          wireframe={!hovered} // Wireframe when idle, Solid when hovered
        />
      </mesh>
    </Float>
  );
}