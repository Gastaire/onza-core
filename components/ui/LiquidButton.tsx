'use client';

import React from 'react';

interface LiquidButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  fillColor?: string; // CSS class for background color, e.g. "bg-accent"
}

export default function LiquidButton({ 
  children, 
  className = "", 
  onClick,
  fillColor = "bg-accent"
}: LiquidButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`relative overflow-hidden group px-10 py-4 rounded-full border border-foreground/20 transition-all duration-500 hover:border-transparent ${className}`}
    >
      {/* Container for the liquid fill */}
      <div className="absolute inset-0 translate-y-[102%] group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]">
        <div className={`absolute inset-0 ${fillColor}`} />
        
        {/* Wavy SVG edge at the top */}
        <svg 
          className="absolute bottom-full left-0 w-[200%] h-12 fill-current text-inherit"
          style={{ color: 'inherit' }} // Inherit text color which we can set via class if needed, or use currentColor
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
           {/* We actually need the wave to match the fill color. 
               Since fillColor is a class, we can't easily get the hex. 
               So we'll use a pseudo-element approach or just a simple div for now to ensure it works cleanly.
           */}
        </svg>
        
        {/* Alternative Simple Wave: A div with a wave clip-path or just a simple translation 
            The user complained about "spinning". Let's do a simple slide up with a very subtle curve.
        */}
      </div>
      
      {/* Re-implementing with a simpler, robust slide-up that has a curved top via border-radius trick */}
      <div className={`absolute inset-0 translate-y-[150%] group-hover:translate-y-[-10%] transition-transform duration-700 ease-[cubic-bezier(0.45,0,0.55,1)] ${fillColor} w-[120%] -left-[10%] rounded-[50%] h-[250%]`} />
      
      <span className="relative z-10 font-bold tracking-widest text-sm uppercase group-hover:text-background transition-colors duration-500 delay-75 flex items-center gap-2 justify-center">
        {children}
      </span>
    </button>
  );
}