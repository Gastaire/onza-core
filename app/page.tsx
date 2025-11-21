"use client";
import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Sparkles, Stars } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Cpu, Code2, CheckCircle2, MousePointer2 } from 'lucide-react';
import * as THREE from 'three';
import JaguarShaderPlane from '@/components/3d/JaguarShaderPlane';

// --- 3D COMPONENTS ---

/**
 * Partículas de fondo para profundidad cinematográfica
 */
function BackgroundParticles() {
  return (
    <>
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
      <Sparkles count={40} scale={15} size={3} speed={0.3} opacity={0.15} color="#d4af37" />
    </>
  );
}

/**
 * Controlador de Cámara con profundidad Z dinámica
 */
function CameraRig() {
  const { camera, pointer } = useThree();
  const vec = new THREE.Vector3();
  
  useFrame(() => {
    // Parallax 3D con profundidad
    const targetX = pointer.x * 0.8;
    const targetY = pointer.y * 0.6;
    const targetZ = 5 + pointer.x * 2; // Movimiento en Z para profundidad
    
    camera.position.lerp(vec.set(targetX, targetY, targetZ), 0.03);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function Scene() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-b from-black via-neutral-950 to-neutral-900">
      <Canvas 
        dpr={[1, 2]} 
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ 
          antialias: true, 
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
        shadows
      >
        <CameraRig />
        
        {/* Iluminación Cinematográfica */}
        <ambientLight intensity={0.3} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1.5} 
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[-5, 3, -2]} intensity={300} color="#d4af37" />
        
        <Environment preset="night" />
        
        <JaguarShaderPlane />
        <BackgroundParticles />
        
        <fog attach="fog" args={['#0a0a0a', 8, 20]} />
      </Canvas>
    </div>
  );
}

// --- UI COMPONENTS ---

const Header = () => (
  <header className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-50 backdrop-blur-sm bg-black/10">
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="text-xl font-bold tracking-[0.25em] text-white"
    >
      ONZA<span className="font-light opacity-60">CORE</span>
    </motion.div>
    
    <motion.nav 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="flex gap-8 items-center"
    >
      {['WORK', 'SERVICES', 'CONTACT'].map((item, i) => (
        <a 
          key={item} 
          href={`#${item.toLowerCase()}`} 
          className="hidden md:block text-xs font-bold tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-300 cursor-pointer relative group"
        >
          {item}
          <span className="absolute -bottom-1 left-0 w-0 h-px bg-yellow-500 group-hover:w-full transition-all duration-300" />
        </a>
      ))}
      
      <button className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-full text-xs font-bold tracking-widest text-white transition-all duration-300 hover:scale-105">
        LOGIN
      </button>
    </motion.nav>
  </header>
);

const LiquidButton = ({ children, onClick, className = "" }) => (
  <button 
    onClick={onClick}
    className={`relative px-8 py-4 border border-white/20 overflow-hidden group transition-all duration-500 hover:border-white/60 rounded-full ${className}`}
  >
    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
    <div className="relative z-10 group-hover:text-black transition-colors duration-500">
      {children}
    </div>
  </button>
);

// --- MAIN PAGE ---

export default function Home() {
  const containerRef = useRef(null);
  
  // Scroll con transiciones de profundidad
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Transformaciones con profundidad (Z-axis)
  const section1Z = useTransform(scrollYProgress, [0, 0.25], [0, -100]);
  const section1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 0.5, 0]);
  const section1Scale = useTransform(scrollYProgress, [0, 0.25], [1, 0.7]);
  
  const section2Z = useTransform(scrollYProgress, [0, 0.25, 0.5], [100, 0, -100]);
  const section2Opacity = useTransform(scrollYProgress, [0.15, 0.25, 0.4, 0.5], [0, 1, 1, 0]);
  const section2Scale = useTransform(scrollYProgress, [0.15, 0.25, 0.5], [0.8, 1, 0.7]);
  
  const section3Z = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [100, 0, -100]);
  const section3Opacity = useTransform(scrollYProgress, [0.4, 0.5, 0.65, 0.75], [0, 1, 1, 0]);
  const section3Scale = useTransform(scrollYProgress, [0.4, 0.5, 0.75], [0.8, 1, 0.7]);
  
  const section4Z = useTransform(scrollYProgress, [0.5, 0.75, 1], [100, 0, 0]);
  const section4Opacity = useTransform(scrollYProgress, [0.65, 0.75, 1], [0, 1, 1]);
  const section4Scale = useTransform(scrollYProgress, [0.65, 0.75], [0.8, 1]);

  return (
    <main className="relative bg-black min-h-[400vh]" ref={containerRef}>
      <Header />
      
      {/* 3D Scene Layer */}
      <Scene />

      {/* Content Layer con transiciones de profundidad */}
      <div className="relative">
        
        {/* Section 1: Hero con Jaguar 3D */}
        <motion.section 
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
              <div className="inline-block px-6 py-2 border border-yellow-500/30 rounded-full backdrop-blur-sm bg-yellow-500/5">
                <span className="text-xs tracking-[0.3em] uppercase text-yellow-500/90">Digital Predators</span>
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-6xl md:text-[10rem] font-bold tracking-tighter mb-8 leading-[0.85] text-white"
            >
              SILENT<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500">
                POWER
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.9 }}
              className="text-lg md:text-2xl max-w-2xl mx-auto font-light tracking-wide mb-12 text-white/70 leading-relaxed"
            >
              We don&apos;t just build websites. We craft digital ecosystems
              <br className="hidden md:block"/>
              that move with the precision of a jaguar.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex flex-col md:flex-row gap-4 justify-center items-center"
            >
              <LiquidButton className="bg-yellow-500/10 border-yellow-500/50 hover:bg-yellow-500 group">
                <span className="flex items-center gap-2 text-sm tracking-widest font-bold uppercase text-yellow-500 group-hover:text-black transition-colors">
                  View Work <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </LiquidButton>
              
              <button className="px-8 py-4 text-sm font-bold tracking-widest text-white/80 hover:text-white transition-colors group">
                <span className="flex items-center gap-2">
                  <MousePointer2 size={16} className="group-hover:rotate-12 transition-transform" />
                  Interact with the Onza
                </span>
              </button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
              <div className="flex flex-col items-center gap-2 text-white/40">
                <span className="text-xs tracking-widest">SCROLL</span>
                <div className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Section 2: Philosophy */}
        <motion.section 
          style={{ 
            z: section2Z, 
            opacity: section2Opacity,
            scale: section2Scale
          }}
          className="sticky top-0 h-screen w-full flex items-center justify-center px-6 md:px-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full max-w-7xl items-center">
            <div className="space-y-8 z-10">
              <div className="inline-block px-4 py-1.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
                <span className="text-xs tracking-[0.25em] text-white/60 uppercase">Our Philosophy</span>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-bold leading-[1.1] text-white">
                Move Fast.<br/>
                <span className="text-yellow-500">Strike Precise.</span>
              </h2>
              
              <p className="text-white/60 text-lg leading-relaxed max-w-lg">
                Like the onza stalking through the jungle, every line of code we write serves a purpose. 
                No bloat. No waste. Pure performance engineered for the modern web.
              </p>
              
              <div className="flex gap-4 pt-4">
                <LiquidButton>
                  <span className="text-sm tracking-wider font-bold">READ MORE</span>
                </LiquidButton>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { num: '99.9%', label: 'Uptime' },
                { num: '<50ms', label: 'Response Time' },
                { num: '100+', label: 'Projects' },
                { num: '24/7', label: 'Support' }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-yellow-500/30 transition-all duration-500 group"
                >
                  <div className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2 group-hover:scale-110 transition-transform">
                    {stat.num}
                  </div>
                  <div className="text-white/50 text-sm tracking-wider uppercase">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Section 3: Services */}
        <motion.section 
          style={{ 
            z: section3Z, 
            opacity: section3Opacity,
            scale: section3Scale
          }}
          id="services"
          className="sticky top-0 h-screen w-full flex items-center justify-center px-6 md:px-20"
        >
          <div className="w-full max-w-7xl z-10">
            <div className="mb-16 text-center">
              <div className="inline-block px-4 py-1.5 border border-yellow-500/20 rounded-full bg-yellow-500/5 backdrop-blur-sm mb-6">
                <span className="text-xs tracking-[0.25em] text-yellow-500 uppercase">What We Do</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-4">
                Precision Engineering
              </h2>
              <p className="text-white/50 text-lg max-w-2xl mx-auto">
                Every service crafted with surgical precision
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  icon: Cpu, 
                  title: "Backend Architecture", 
                  desc: "Scalable microservices that handle millions of requests without breaking a sweat."
                },
                { 
                  icon: Code2, 
                  title: "Frontend Mastery", 
                  desc: "Interfaces so smooth they feel like magic. WebGL, React, and cutting-edge web tech."
                },
                { 
                  icon: CheckCircle2, 
                  title: "Quality Assurance", 
                  desc: "Zero-defect delivery through automated testing and continuous integration."
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm p-10 rounded-2xl border border-white/10 hover:border-yellow-500/40 transition-all duration-500 group cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center mb-6 group-hover:bg-yellow-500/20 transition-colors">
                    <item.icon className="text-yellow-500 group-hover:scale-110 transition-transform" size={32} />
                  </div>
                  <h4 className="text-2xl text-white mb-4 font-semibold">{item.title}</h4>
                  <p className="text-white/50 group-hover:text-white/70 transition-colors leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Section 4: Contact */}
        <motion.section 
          style={{ 
            z: section4Z, 
            opacity: section4Opacity,
            scale: section4Scale
          }}
          id="contact"
          className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-6 md:px-20"
        >
          <div className="flex-grow flex flex-col items-center justify-center space-y-12 relative z-10 w-full max-w-5xl">
            <div className="text-center space-y-6">
              <div className="inline-block px-6 py-2 border border-yellow-500/30 rounded-full backdrop-blur-sm bg-yellow-500/5">
                <span className="text-xs tracking-[0.3em] uppercase text-yellow-500/90">Let&apos;s Build Together</span>
              </div>
              
              <h2 className="text-6xl md:text-[10rem] font-bold text-white text-center leading-none">
                START<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300">
                  NOW
                </span>
              </h2>
              
              <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
                Ready to unleash the power of precision engineering on your next project?
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row justify-center gap-6">
              <LiquidButton className="border-yellow-500/50 bg-yellow-500/10 hover:bg-yellow-500 group">
                <span className="font-bold tracking-wider text-yellow-500 group-hover:text-black transition-colors text-sm uppercase">
                  Get In Touch
                </span>
              </LiquidButton>
              
              <LiquidButton>
                <span className="tracking-wider font-bold text-sm uppercase text-white">
                  View Case Studies
                </span>
              </LiquidButton>
            </div>
          </div>
          
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 py-8 px-6 md:px-12 text-[10px] text-white/30 tracking-widest uppercase border-t border-white/5 mt-auto backdrop-blur-sm bg-black/20">
            <span>© 2025 OnzaCore Systems Inc.</span>
            <span className="hidden md:block">Tucumán, Argentina</span>
            <span>Engineered with Precision</span>
          </div>
        </motion.section>

      </div>
    </main>
  );
}