"use client";

import dynamic from "next/dynamic";

// Dynamically import the Scene to avoid SSR issues with 3D context
const Scene = dynamic(() => import("@/components/3d/Scene"), { ssr: false });

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-background">
      {/* Background 3D Scene */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Scene />
      </div>

      {/* Content Layer - Pointer events none to let clicks pass to 3D if needed, 
          but text itself needs pointer-events-auto if selectable */}
      <div className="z-10 flex flex-col items-center justify-center w-full px-4 pointer-events-none select-none">
        <h1 className="font-bold tracking-tighter text-foreground text-center leading-none">
          {/* Mobile Layout: Stacked */}
          <span className="block md:hidden text-6xl">ONZA</span>
          <span className="block md:hidden text-6xl text-accent">CORE</span>
          
          {/* Desktop Layout: Inline */}
          <span className="hidden md:block text-[12vw] lg:text-9xl">
            ONZA<span className="text-accent">CORE</span>
          </span>
        </h1>
        
        <p className="mt-6 text-lg md:text-xl text-foreground/70 tracking-widest uppercase text-center max-w-2xl">
          Software Factory & IT Automations. Engineering the digital backbone for discerning businesses.
        </p>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-accent to-transparent"></div>
      </div>
    </section>
  );
}