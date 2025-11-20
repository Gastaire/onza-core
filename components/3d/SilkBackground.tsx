'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SilkBackground() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create a grid of points
  const count = 100;
  const sep = 3;
  
  const positions = useMemo(() => {
    const positions = [];
    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        const x = sep * (xi - count / 2);
        const z = sep * (zi - count / 2);
        const y = 0;
        positions.push(x, y, z);
      }
    }
    return new Float32Array(positions);
  }, [count, sep]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const { clock } = state;
    const t = clock.getElapsedTime();
    
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    
    let i = 0;
    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        // Calculate wave
        const x = sep * (xi - count / 2);
        const z = sep * (zi - count / 2);
        
        // Complex wave function
        positions[i + 1] = 
          Math.sin((x / 50) + t / 2) * 5 + 
          Math.cos((z / 30) + t / 3) * 5 +
          Math.sin((x / 20 + z / 20) + t) * 2;
          
        i += 3;
      }
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Rotate slightly
    meshRef.current.rotation.y = t * 0.05;
  });

  return (
    <points ref={meshRef} position={[0, -20, -50]} rotation={[-Math.PI / 4, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#D4AF37"
        transparent
        opacity={0.4}
        sizeAttenuation={true}
      />
    </points>
  );
}