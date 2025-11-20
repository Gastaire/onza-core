"use client";

import { motion } from "framer-motion";

export function SoftwareFactorySection() {
  return (
    <section className="py-32 bg-background text-primary relative border-t border-white/5">
      <div className="container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-sm font-medium uppercase tracking-widest text-accent mb-6">The OnzaCore Difference</h2>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">
             More than a factory.<br />A Design Studio for Logic.
          </h3>
          <p className="text-xl text-primary/70 leading-relaxed mb-12">
            We combine disciplined engineering with creative architecture to
            build robust, scalable, and elegant software solutions. Every line of
            code is crafted with purpose, and every system is designed for
            longevity.
          </p>
          <a href="/factory" className="inline-block border border-accent text-accent hover:bg-accent hover:text-background transition-all rounded-full px-10 py-4 uppercase tracking-widest text-sm font-medium">
             Discover Our Process
          </a>
        </motion.div>
      </div>
    </section>
  );
}