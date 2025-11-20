'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Text, Trail } from '@react-three/drei';
import * as THREE from 'three';

export default function HolographicReveal() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Constant Rotation
    meshRef.current.rotation.y += delta * 0.5;
    
    // Mouse tracking for rotation tilt
    const { x, y } = state.mouse;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, y * 0.5, 0.1);
    
    // Scale Glitch Effect on transition
    const targetScale = hovered ? 1.1 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <group>
        <Float speed={5} rotationIntensity={1} floatIntensity={1}>
        {/* The Core Object */}
        <mesh 
            ref={meshRef} 
            onPointerOver={() => setHover(true)} 
            onPointerOut={() => setHover(false)}
            position={[0, 0, 0]}
        >
            {/* Abstract "Helmet" / "Orb" Shape */}
            <icosahedronGeometry args={[2.5, 1]} /> {/* Low poly look when wireframe, smooths out with material */}
            
            <MeshDistortMaterial
            color={hovered ? "#D4AF37" : "#0B1210"}
            attach="material"
            distort={hovered ? 0 : 0.6} // High distortion (glitch) when wireframe, PERFECT when solid
            speed={hovered ? 0 : 5}
            roughness={hovered ? 0.1 : 0.2}
            metalness={hovered ? 1 : 0.8}
            emissive={hovered ? "#D4AF37" : "#1B4D3E"}
            emissiveIntensity={hovered ? 0.8 : 2} // Bright hologram lines
            wireframe={!hovered}
            />
        </mesh>

        {/* Holographic Trail/Echo (Only visible when not hovered) */}
        {!hovered && (
            <mesh scale={[2.6, 2.6, 2.6]} rotation={[0, Math.PI/4, 0]}>
                <icosahedronGeometry args={[2.5, 0]} />
                <meshBasicMaterial color="#1B4D3E" wireframe transparent opacity={0.1} />
            </mesh>
        )}
        </Float>
    </group>
  );
}