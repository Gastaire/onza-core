// --- 3D COMPONENTS ---

/**
 * Jaguar/Onza 3D - Representación artística con geometría orgánica
 */
function JaguarModel({ scrollProgress }) {
  const groupRef = useRef();
  const bodyRef = useRef();
  const headRef = useRef();
  const eyeLeftRef = useRef();
  const eyeRightRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;
    
    // El jaguar sigue al mouse con movimiento natural
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouseX * 0.3,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouseY * 0.2,
        0.05
      );
    }
    
    // Respiración sutil del cuerpo
    if (bodyRef.current) {
      const breathe = 1 + Math.sin(time * 0.8) * 0.02;
      bodyRef.current.scale.set(breathe, breathe, breathe);
    }
    
    // Parpadeo de ojos
    if (eyeLeftRef.current && eyeRightRef.current) {
      const blink = Math.abs(Math.sin(time * 0.5)) > 0.98 ? 0.1 : 1;
      eyeLeftRef.current.scale.y = blink;
      eyeRightRef.current.scale.y = blink;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        {/* Cuerpo Principal */}
        <mesh ref={bodyRef} position={[0, 0, 0.2]} castShadow>
          <capsuleGeometry args={[0.5, 1.2, 32, 32]} />
          <meshStandardMaterial 
            color="#1a1a1a"
            metalness={0.3}
            roughness={0.4}
            envMapIntensity={1.5}
          />
        </mesh>
        
        {/* Cabeza */}
        <group ref={headRef} position={[0, 0.3, 0.9]}>
          <mesh castShadow>
            <sphereGeometry args={[0.45, 32, 32]} />
            <meshStandardMaterial 
              color="#1a1a1a"
              metalness={0.3}
              roughness={0.3}
              envMapIntensity={1.5}
            />
          </mesh>
          
          {/* Hocico */}
          <mesh position={[0, -0.15, 0.35]} castShadow>
            <boxGeometry args={[0.25, 0.2, 0.3]} />
            <meshStandardMaterial color="#0f0f0f" roughness={0.5} />
          </mesh>
          
          {/* Ojos - Golden Glow */}
          <mesh ref={eyeLeftRef} position={[-0.15, 0.05, 0.38]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial 
              color="#d4af37" 
              emissive="#d4af37"
              emissiveIntensity={2}
              metalness={1}
              roughness={0}
            />
          </mesh>
          <mesh ref={eyeRightRef} position={[0.15, 0.05, 0.38]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial 
              color="#d4af37" 
              emissive="#d4af37"
              emissiveIntensity={2}
              metalness={1}
              roughness={0}
            />
          </mesh>
          
          {/* Orejas */}
          <mesh position={[-0.25, 0.35, 0.1]} rotation={[0, 0, -0.3]}>
            <coneGeometry args={[0.15, 0.25, 4]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
          <mesh position={[0.25, 0.35, 0.1]} rotation={[0, 0, 0.3]}>
            <coneGeometry args={[0.15, 0.25, 4]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
        </group>
        
        {/* Patas Delanteras */}
        <mesh position={[-0.25, -0.5, 0.4]} castShadow>
          <cylinderGeometry args={[0.12, 0.1, 0.8, 16]} />
          <meshStandardMaterial color="#0f0f0f" />
        </mesh>
        <mesh position={[0.25, -0.5, 0.4]} castShadow>
          <cylinderGeometry args={[0.12, 0.1, 0.8, 16]} />
          <meshStandardMaterial color="#0f0f0f" />
        </mesh>
        
        {/* Patas Traseras */}
        <mesh position={[-0.25, -0.5, -0.3]} castShadow>
          <cylinderGeometry args={[0.12, 0.1, 0.8, 16]} />
          <meshStandardMaterial color="#0f0f0f" />
        </mesh>
        <mesh position={[0.25, -0.5, -0.3]} castShadow>
          <cylinderGeometry args={[0.12, 0.1, 0.8, 16]} />
          <meshStandardMaterial color="#0f0f0f" />
        </mesh>
        
        {/* Cola */}
        <mesh position={[0, 0, -0.8]} rotation={[0.5, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.05, 1, 16]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        
        {/* Manchas Doradas (Detalles de Onza) */}
        {[...Array(8)].map((_, i) => (
          <mesh 
            key={i}
            position={[
              Math.cos(i) * 0.4,
              Math.sin(i * 2) * 0.3,
              Math.sin(i) * 0.4 + 0.2
            ]}
            scale={0.15}
          >
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial 
              color="#d4af37"
              emissive="#d4af37"
              emissiveIntensity={0.3}
              transparent
              opacity={0.4}
            />
          </mesh>
        ))}
      </Float>
      
      {/* Luces dramáticas para resaltar al jaguar */}
      <spotLight 
        position={[3, 5, 3]} 
        intensity={800} 
        angle={0.4}
        penumbra={1}
        color="#d4af37"
        castShadow
      />
      <spotLight 
        position={[-3, 3, 2]} 
        intensity={400} 
        angle={0.5}
        penumbra={1}
        color="#ffffff"
      />
    </group>
  );
}