"use client";

import { motion } from "framer-motion";

interface ServiceCardProps {
  id: string;
  number: string;
  title: string;
  description: string;
}

export default function ServiceCard({ id, number, title, description }: ServiceCardProps) {
  return (
    <div className="group relative h-[450px] w-full md:w-[400px] flex-shrink-0 overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-500 hover:border-accent/50 hover:bg-white/10 p-8 flex flex-col justify-between">
      
      {/* Background Number */}
      <span className="absolute -right-4 -top-10 text-[180px] font-bold leading-none text-white/5 select-none transition-all duration-500 group-hover:text-accent/10 z-0">
        {number}
      </span>

      {/* Content */}
      <div className="z-10 mt-auto">
        <h3 className="text-3xl font-bold uppercase tracking-wide text-foreground mb-4 group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>
        <p className="text-base text-foreground/70 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Decorative Line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent/0 to-transparent group-hover:via-accent/50 transition-all duration-500" />
    </div>
  );
}