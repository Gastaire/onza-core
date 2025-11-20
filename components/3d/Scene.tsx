'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, Stars } from '@react-three/drei';
import { Suspense } from 'react';
import HolographicReveal from './HolographicReveal';
import FluidMesh from './FluidMesh';
import FloatingGeometry from './FloatingGeometry';

export default function Scene() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 30], fov: 35 }}>
        <Suspense fallback={null}>
           {/* Cinematic Lighting */}
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} color="#D4AF37" intensity={2} />
          <pointLight position={[-20, -10, -10]} color="#1B4D3E" intensity={1} />
          <spotLight position={[0, 50, 0]} angle={0.3} penumbra={1} intensity={2} castShadow />
          
          {/* Deep Space Background */}
          <Stars radius={300} depth={100} count={3000} factor={4} saturation={0} fade speed={0.5} />
          
          {/* Tangible Fluid Surface (Bottom) */}
          <FluidMesh />
          
          {/* Floating Particles for Depth */}
          <FloatingGeometry count={60} color="#D4AF37" />
          
          {/* Central Hero Object */}
          <HolographicReveal />
          
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}