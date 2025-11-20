'use client';

import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';
import LiquidButton from './LiquidButton';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function Header() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSection = (index: number) => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: window.innerHeight * index,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { name: 'Work', index: 1 },
    { name: 'Services', index: 2 },
    { name: 'About', index: 3 },
  ];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : -20 }}
      transition={{ duration: 1.5, delay: 2.5, ease: "circOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-12 py-8 flex justify-between items-center mix-blend-difference text-foreground pointer-events-none"
    >
      <div className="pointer-events-auto cursor-pointer" onClick={() => scrollToSection(0)}>
        <MagneticButton strength={0.3}>
          <div className="text-xl font-bold tracking-widest uppercase">OnzaCore</div>
        </MagneticButton>
      </div>
      
      <div className="hidden md:flex items-center gap-8 pointer-events-auto">
        {navLinks.map((link) => (
          <MagneticButton key={link.name} strength={0.2} className="group relative">
             <button 
               onClick={() => scrollToSection(link.index)}
               className="text-sm uppercase tracking-widest hover:text-accent transition-colors relative z-10 bg-transparent border-none cursor-pointer"
             >
               {link.name}
             </button>
             <span className="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-accent group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out" />
          </MagneticButton>
        ))}
        
        <div className="flex items-center">
            <LiquidButton 
                onClick={() => router.push('/login')} 
                fillColor="bg-foreground" 
                className="!px-6 !py-2"
            >
                <span className="text-xs uppercase tracking-widest font-bold group-hover:text-background transition-colors">Login</span>
            </LiquidButton>
        </div>
      </div>
    </motion.nav>
  );
}