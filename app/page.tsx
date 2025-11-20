"use client";
import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, useGLTF, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { ArrowRight, Cpu, Layers, Zap, Mail } from 'lucide-react';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';

// ═══════════════════════════════════════════════════════════════
// 3D JAGUAR MODEL - Artistic representation with organic geometry
// ═══════════════════════════════════════════════════════════════

interface JaguarModelProps {
  scrollProgress: MotionValue<number>;
}

function JaguarModel({ scrollProgress }: JaguarModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Group>(null);
  const eyeLeftRef = useRef<THREE.Mesh>(null);
  const eyeRightRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!groupRef.current || !bodyRef.current) return;

    const time = state.clock.getElapsedTime();
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;
    
    // Natural mouse tracking
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
    
    // Subtle breathing animation
    const breathe = 1 + Math.sin(time * 0.8) * 0.02;
    bodyRef.current.scale.set(breathe, breathe, breathe);
    
    // Eye blink effect
    if (eyeLeftRef.current && eyeRightRef.current) {
      const blink = Math.abs(Math.sin(time * 0.5)) > 0.98 ? 0.1 : 1;
      eyeLeftRef.current.scale.y = blink;
      eyeRightRef.current.scale.y = blink;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]} scale={1.2}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        {/* Main Body */}
        <mesh ref={bodyRef} position={[0, 0, 0.2]} castShadow receiveShadow>
          <capsuleGeometry args={[0.5, 1.2, 32, 32]} />
          <meshStandardMaterial 
            color="#1B4D3E"
            metalness={0.4}
            roughness={0.3}
            envMapIntensity={1.5}
          />
        </mesh>
        
        {/* Head */}
        <group ref={headRef} position={[0, 0.3, 0.9]}>
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[0.45, 32, 32]} />
            <meshStandardMaterial 
              color="#1B4D3E"
              metalness={0.4}
              roughness={0.2}
              envMapIntensity={1.5}
            />
          </mesh>
          
          {/* Snout */}
          <mesh position={[0, -0.15, 0.35]} castShadow>
            <boxGeometry args={[0.25, 0.2, 0.3]} />
            <meshStandardMaterial color="#0B1210" roughness={0.5} />
          </mesh>
          
          {/* Eyes - Golden Glow */}
          <mesh ref={eyeLeftRef} position={[-0.15, 0.05, 0.38]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial 
              color="#D4AF37" 
              emissive="#D4AF37"
              emissiveIntensity={2.5}
              metalness={1}
              roughness={0}
            />
          </mesh>
          <mesh ref={eyeRightRef} position={[0.15, 0.05, 0.38]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial 
              color="#D4AF37" 
              emissive="#D4AF37"
              emissiveIntensity={2.5}
              metalness={1}
              roughness={0}
            />
          </mesh>
          
          {/* Ears */}
          <mesh position={[-0.25, 0.35, 0.1]} rotation={[0, 0, -0.3]} castShadow>
            <coneGeometry args={[0.15, 0.25, 4]} />
            <meshStandardMaterial color="#1B4D3E" metalness={0.3} />
          </mesh>
          <mesh position={[0.25, 0.35, 0.1]} rotation={[0, 0, 0.3]} castShadow>
            <coneGeometry args={[0.15, 0.25, 4]} />
            <meshStandardMaterial color="#1B4D3E" metalness={0.3} />
          </mesh>
        </group>
        
        {/* Front Legs */}
        <mesh position={[-0.25, -0.5, 0.4]} castShadow>
          <cylinderGeometry args={[0.12, 0.1, 0.8, 16]} />
          <meshStandardMaterial color="#0B1210" metalness={0.2} />
        </mesh>
        <mesh position={[0.25, -0.5, 0.4]} castShadow>
          <cylinderGeometry args={[0.12, 0.1, 0.8, 16]} />
          <meshStandardMaterial color="#0B1210" metalness={0.2} />
        </mesh>
        
        {/* Back Legs */}
        <mesh position={[-0.25, -0.5, -0.3]} castShadow>
          <cylinderGeometry args={[0.12, 0.1, 0.8, 16]} />
          <meshStandardMaterial color="#0B1210" metalness={0.2} />
        </mesh>
        <mesh position={[0.25, -0.5, -0.3]} castShadow>
          <cylinderGeometry args={[0.12, 0.1, 0.8, 16]} />
          <meshStandardMaterial color="#0B1210" metalness={0.2} />
        </mesh>
        
        {/* Tail */}
        <mesh position={[0, 0, -0.8]} rotation={[0.5, 0, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.05, 1, 16]} />
          <meshStandardMaterial color="#1B4D3E" metalness={0.3} />
        </mesh>
        
        {/* Golden Spots (Onza Details) */}
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
              color="#D4AF37"
              emissive="#D4AF37"
              emissiveIntensity={0.5}
              transparent
              opacity={0.6}
              metalness={0.8}
            />
          </mesh>
        ))}
      </Float>
      
      {/* Dramatic Spotlights */}
      <spotLight 
        position={[3, 5, 3]} 
        intensity={1200} 
        angle={0.4}
        penumbra={1}
        color="#D4AF37"
        castShadow
      />
      <spotLight 
        position={[-3, 3, 2]} 
        intensity={600} 
        angle={0.5}
        penumbra={1}
        color="#EFE5D6"
      />
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════
// 3D SCENE WITH CAMERA RIG
// ═══════════════════════════════════════════════════════════════

interface SceneProps {
  scrollProgress: MotionValue<number>;
}

function Scene({ scrollProgress }: SceneProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame((state) => {
    if (!cameraRef.current) return;

    const targetX = state.pointer.x * 0.5;
    const targetY = state.pointer.y * 0.3;
    
    cameraRef.current.position.x = THREE.MathUtils.lerp(
      cameraRef.current.position.x,
      targetX,
      0.05
    );
    cameraRef.current.position.y = THREE.MathUtils.lerp(
      cameraRef.current.position.y,
      targetY,
      0.05
    );
    
    cameraRef.current.lookAt(0, 0, 0);
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 5]} fov={50} />
      
      {/* Cinematic Lighting */}
      <ambientLight intensity={0.4} color="#1B4D3E" />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1.8} 
        color="#EFE5D6"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight position={[-5, 3, -2]} intensity={400} color="#D4AF37" />
      
      <Environment preset="night" />
      
      <JaguarModel scrollProgress={scrollProgress} />
      
      {/* Contact Shadows */}
      <ContactShadows 
        position={[0, -1.4, 0]} 
        opacity={0.5} 
        scale={10} 
        blur={2.5} 
        far={4}
        color="#0B1210"
      />
      
      <fog attach="fog" args={['#0B1210', 8, 20]} />
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// UI COMPONENTS
// ═══════════════════════════════════════════════════════════════

interface NavbarProps {
  scrollY: number;
}

function Navbar({ scrollY }: NavbarProps) {
  const [prevScrollY, setPrevScrollY] = React.useState(0);
  const [visible, setVisible] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    if (scrollY > prevScrollY && scrollY > 100) {
      setVisible(false);
    } else {
      setVisible(true);
    }
    setPrevScrollY(scrollY);
  }, [scrollY, prevScrollY]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 px-8 py-6 backdrop-blur-md bg-background/70 border-b border-border"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold tracking-[0.2em] text-foreground cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          ONZA<span className="text-accent">CORE</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {['Inicio', 'Servicios', 'About', 'Contacto'].map((item, i) => (
            <button 
              key={item}
              onClick={() => {
                const section = document.getElementById(item.toLowerCase());
                section?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-sm uppercase tracking-widest text-foreground/70 hover:text-accent transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
            </button>
          ))}
          
          <button 
            onClick={() => router.push('/login')}
            className="px-6 py-2.5 bg-surface border border-border hover:border-accent rounded-full text-xs font-bold tracking-widest text-accent transition-all duration-300 hover:scale-105"
          >
            LOGIN
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

const LiquidButton = ({ children, onClick, className = "" }: { children: React.ReactNode; onClick?: () => void; className?: string }) => (
  <button 
    onClick={onClick}
    className={`relative px-8 py-4 border border-border overflow-hidden group transition-all duration-500 hover:border-accent rounded-full ${className}`}
  >
    <div className="absolute inset-0 bg-accent translate-y-[150%] group-hover:translate-y-[-10%] transition-transform duration-700 ease-[cubic-bezier(0.45,0,0.55,1)] w-[120%] -left-[10%] rounded-[50%] h-[250%]" />
    <div className="relative z-10 group-hover:text-background transition-colors duration-500 flex items-center gap-2 justify-center">
      {children}
    </div>
  </button>
);

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = React.useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Z-depth transforms
  const section1Z = useTransform(scrollYProgress, [0, 0.25], [0, -100]);
  const section1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 0.5, 0]);
  const section1Scale = useTransform(scrollYProgress, [0, 0.25], [1, 0.8]);
  
  const section2Z = useTransform(scrollYProgress, [0, 0.25, 0.5], [100, 0, -100]);
  const section2Opacity = useTransform(scrollYProgress, [0.15, 0.25, 0.4, 0.5], [0, 1, 1, 0]);
  
  const section3Z = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [100, 0, -100]);
  const section3Opacity = useTransform(scrollYProgress, [0.4, 0.5, 0.65, 0.75], [0, 1, 1, 0]);
  
  const section4Z = useTransform(scrollYProgress, [0.5, 0.75, 1], [100, 0, 0]);
  const section4Opacity = useTransform(scrollYProgress, [0.65, 0.75, 1], [0, 1, 1]);

  return (
    <main className="relative bg-background min-h-[400vh]" ref={containerRef}>
      <Navbar scrollY={scrollY} />
      
      {/* 3D Scene Layer */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-b from-background via-background to-[#1B4D3E]/20">
        <Canvas 
          dpr={[1, 2]} 
          gl={{ 
            antialias: true, 
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2
          }}
          shadows
        >
          <Suspense fallback={null}>
            <Scene scrollProgress={scrollYProgress} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content Layer */}
      <div className="relative">
        
        {/* SECTION 1: HERO */}
        <motion.section 
          id="inicio"
          style={{ 
            z: section1Z, 
            opacity: section1Opacity,
            scale: section1Scale
          }}
          className="sticky top-0 h-screen w-full flex items-center justify-center"
        >
          <div className="relative z-10 text-center px-6 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mb-6"
            >
              <div className="inline-block px-6 py-2 border border-accent/30 rounded-full backdrop-blur-sm bg-accent/5">
                <span className="text-xs tracking-[0.3em] uppercase text-accent">Silent. Precise. Powerful.</span>
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-6xl md:text-[10rem] font-bold tracking-tighter mb-8 leading-[0.85] text-foreground"
            >
              ONZA<br/>
              <span className="text-accent">CORE</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.9 }}
              className="text-lg md:text-2xl max-w-2xl mx-auto font-light tracking-wide mb-12 text-foreground/70 leading-relaxed"
            >
              We engineer digital ecosystems that move with the precision of a jaguar.
              <br className="hidden md:block"/>
              Silent power. Disruptive elegance.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex flex-col md:flex-row gap-4 justify-center items-center"
            >
              <LiquidButton>
                <span className="flex items-center gap-2 text-sm tracking-widest font-bold uppercase text-foreground">
                  Explore Services <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </LiquidButton>
            </motion.div>
          </div>
        </motion.section>

        {/* SECTION 2: SERVICIOS */}
        <motion.section 
          id="servicios"
          style={{ 
            z: section2Z, 
            opacity: section2Opacity,
          }}
          className="sticky top-0 h-screen w-full flex items-center justify-center px-6 md:px-20"
        >
          <div className="w-full max-w-7xl z-10">
            <div className="mb-16 text-center">
              <div className="inline-block px-4 py-1.5 border border-accent/20 rounded-full bg-accent/5 backdrop-blur-sm mb-6">
                <span className="text-xs tracking-[0.25em] text-accent uppercase">Our Expertise</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-4">
                Precision Engineering
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Cpu, title: "Backend Architecture", desc: "Scalable microservices engineered for millions of requests." },
                { icon: Layers, title: "Frontend Mastery", desc: "Interfaces that feel like magic. React, Three.js, cutting-edge web." },
                { icon: Zap, title: "Automation & AI", desc: "Intelligent workflows that eliminate manual processes." }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  whileHover={{ y: -10 }}
                  className="bg-surface/30 backdrop-blur-sm p-10 rounded-2xl border border-border hover:border-accent/40 transition-all duration-500 group cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                    <item.icon className="text-accent group-hover:scale-110 transition-transform" size={32} />
                  </div>
                  <h4 className="text-2xl text-foreground mb-4 font-semibold">{item.title}</h4>
                  <p className="text-foreground/60 group-hover:text-foreground/80 transition-colors leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* SECTION 3: ABOUT */}
        <motion.section 
          id="about"
          style={{ 
            z: section3Z, 
            opacity: section3Opacity,
          }}
          className="sticky top-0 h-screen w-full flex items-center justify-center px-6 md:px-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full max-w-7xl items-center">
            <div className="space-y-8 z-10">
              <div className="inline-block px-4 py-1.5 border border-border rounded-full bg-surface/30 backdrop-blur-sm">
                <span className="text-xs tracking-[0.25em] text-foreground/60 uppercase">Our Philosophy</span>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-bold leading-[1.1] text-foreground">
                Move Fast.<br/>
                <span className="text-accent">Strike Precise.</span>
              </h2>
              
              <p className="text-foreground/70 text-lg leading-relaxed max-w-lg">
                Like the onza stalking through the jungle, every line of code serves a purpose. 
                No bloat. No waste. Pure performance engineered for modern business.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { num: '99.9%', label: 'Uptime' },
                { num: '<50ms', label: 'Response' },
                { num: '100+', label: 'Projects' },
                { num: '24/7', label: 'Support' }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-surface/20 backdrop-blur-md border border-border rounded-2xl p-8 hover:border-accent/30 transition-all duration-500 group"
                >
                  <div className="text-4xl md:text-5xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform">
                    {stat.num}
                  </div>
                  <div className="text-foreground/50 text-sm tracking-wider uppercase">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* SECTION 4: CONTACTO */}
        <motion.section 
          id="contacto"
          style={{ 
            z: section4Z, 
            opacity: section4Opacity,
          }}
          className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-6 md:px-20"
        >
          <div className="flex-grow flex flex-col items-center justify-center space-y-12 relative z-10 w-full max-w-5xl">
            <div className="text-center space-y-6">
              <h2 className="text-6xl md:text-[8rem] font-bold text-foreground text-center leading-none">
                LET'S<br/>
                <span className="text-accent">BUILD</span>
              </h2>
              
              <p className="text-foreground/60 text-lg md:text-xl max-w-2xl mx-auto">
                Ready to unleash precision engineering on your next project?
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row justify-center gap-6">
              <LiquidButton>
                <Mail size={18} />
                <span className="font-bold tracking-wider text-sm uppercase text-foreground">
                  Get In Touch
                </span>
              </LiquidButton>
            </div>
          </div>
          
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 py-8 px-6 md:px-12 text-[10px] text-foreground/30 tracking-widest uppercase border-t border-border mt-auto backdrop-blur-sm">
            <span>© 2025 OnzaCore Systems Inc.</span>
            <span>Engineered with Precision</span>
          </div>
        </motion.section>

      </div>
    </main>
  );
}