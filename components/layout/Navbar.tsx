"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Studio", href: "#studio" },
  { name: "Services", href: "#services" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.0, duration: 1, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50"
    >
      <nav className="w-full px-6 md:px-12 py-6 flex justify-between items-center backdrop-blur-md bg-[#0B1210]/50 border-b border-white/10">
        
        {/* LOGO */}
        <Link href="/" className="text-2xl font-bold tracking-tighter text-[#EFE5D6] z-50">
          ONZA<span className="text-[#D4AF37]">CORE</span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                href={link.href}
                className="text-sm uppercase tracking-widest text-[#EFE5D6]/70 hover:text-[#D4AF37] transition-colors duration-300"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* CLIENT ACCESS BUTTON (Desktop) */}
        <div className="hidden md:block">
          <Link 
            href="/dashboard"
            className="px-6 py-2 border border-white/10 text-sm uppercase tracking-widest text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B1210] transition-all duration-300"
          >
            Client Access
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden z-50 text-[#EFE5D6]"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* MOBILE MENU OVERLAY */}
        {isOpen && (
          <div className="fixed inset-0 bg-[#0B1210]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden z-40">
             {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl uppercase tracking-widest text-[#EFE5D6] hover:text-[#D4AF37]"
                >
                  {link.name}
                </Link>
             ))}
             <Link 
               href="/dashboard"
               onClick={() => setIsOpen(false)}
               className="mt-8 px-8 py-3 border border-[#D4AF37] text-[#D4AF37] uppercase tracking-widest"
             >
               Client Access
             </Link>
          </div>
        )}
      </nav>
    </motion.header>
  );
}