'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FluidMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Create geometry with many segments for smooth waves
  const geometry = useMemo(() => new THREE.PlaneGeometry(100, 100, 64, 64), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const { clock } = state;
    const t = clock.getElapsedTime();
    
    const positionAttribute = meshRef.current.geometry.getAttribute('position');
    const vertex = new THREE.Vector3();
    
    // Manual vertex displacement for "Fluid" effect
    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i);
      
      // Wave equation
      const wave1 = 1.5 * Math.sin(vertex.x * 0.2 + t);
      const wave2 = 1.5 * Math.sin(vertex.y * 0.1 + t * 0.8);
      const wave3 = 0.5 * Math.sin(vertex.x * 0.5 + vertex.y * 0.5 + t * 2);
      
      vertex.z = wave1 + wave2 + wave3 - 10; // Push back in Z
      
      positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 3, 0, 0]} position={[0, -15, -20]}>
      {/* Glass Material for "Digital Water" */}
      <meshPhysicalMaterial 
        color="#1B4D3E" 
        roughness={0.1}
        metalness={0.8}
        transparent
        opacity={0.3}
        transmission={0.2} // Glass-like transmission
        clearcoat={1}
        wireframe={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}