"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const cards = [
  {
    id: 1,
    title: "Web Architecture",
    description: "Scalable, secure, and high-performance web solutions designed for the future.",
  },
  {
    id: 2,
    title: "Mobile Solutions",
    description: "Native and cross-platform applications that deliver seamless user experiences.",
  },
  {
    id: 3,
    title: "Automation",
    description: "Intelligent workflows that streamline operations and reduce manual effort.",
  },
  {
    id: 4,
    title: "Cloud Infrastructure",
    description: "Robust cloud architectures ensuring high availability and disaster recovery.",
  },
];

export default function HorizontalScroll() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-[#0B1210]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-10 px-20">
          {cards.map((card) => (
            <div
              key={card.id}
              className="group relative h-[60vh] w-[80vw] md:w-[40vw] flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#1B4D3E]/10 backdrop-blur-xl transition-all hover:border-[#D4AF37]/30"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              
              <div className="relative z-10 flex h-full flex-col justify-between p-10">
                <div className="h-12 w-12 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 flex items-center justify-center text-[#D4AF37]">
                   {/* Icon placeholder */}
                   <span className="text-xl font-mono">0{card.id}</span>
                </div>
                
                <div>
                  <h3 className="mb-4 text-3xl md:text-4xl font-bold text-[#EFE5D6]">
                    {card.title}
                  </h3>
                  <p className="text-lg text-[#EFE5D6]/60">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}