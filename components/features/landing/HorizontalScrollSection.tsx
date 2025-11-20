"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Box, Code, Cpu, Layers, ShieldCheck } from "lucide-react";

const HorizontalScrollSection = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  const services = [
    {
      title: "Web & Mobile Development",
      description:
        "We craft bespoke web and mobile applications centered on user experience and high performance.",
      id: 1,
      icon: <Code className="w-8 h-8 text-accent" />,
    },
    {
      title: "Software Consultancy",
      description:
        "Expert advice to optimize your development processes and software architecture.",
      id: 20,
      icon: <Cpu className="w-8 h-8 text-accent" />,
    },
    {
      title: "E-commerce Solutions",
      description:
        "Robust and scalable e-commerce platforms to power your online sales.",
      id: 3,
      icon: <Box className="w-8 h-8 text-accent" />,
    },
    {
      title: "UI/UX Design",
      description:
        "Intuitive and attractive interfaces that improve user interaction with your digital products.",
      id: 180,
      icon: <Layers className="w-8 h-8 text-accent" />,
    },
    {
      title: "Maintenance & Support",
      description:
        "Ensuring system stability and updates with our maintenance and support plans.",
      id: 60,
      icon: <ShieldCheck className="w-8 h-8 text-accent" />,
    },
  ];

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-background py-20">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-10 pl-10">
          
          {/* INTRO CARD */}
          <div className="flex-shrink-0 w-[80vw] md:w-[400px] h-[60vh] flex flex-col justify-center p-8">
             <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-primary mb-6">
               Our <br /> <span className="text-accent">Expertise</span>
             </h2>
             <p className="text-primary/70 text-lg mb-8">
               Comprehensive solutions tailored for the modern digital landscape.
             </p>
             <div className="flex items-center gap-2 text-accent uppercase tracking-widest text-sm">
               Scroll to explore <ArrowRight className="w-4 h-4" />
             </div>
          </div>

          {services.map((service, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[80vw] md:w-[600px] h-[60vh] bg-white/5 border border-white/10 rounded-xl p-10 backdrop-blur-sm flex flex-col justify-between hover:border-accent/30 transition-colors duration-300 group"
            >
              <div className="flex justify-between items-start">
                <span className="text-6xl font-bold text-white/5 group-hover:text-accent/20 transition-colors">
                   0{index + 1}
                </span>
                <div className="p-3 bg-white/5 rounded-lg">
                   {service.icon}
                </div>
              </div>
              
              <div>
                <h3 className="text-3xl font-bold text-primary mb-4">
                  {service.title}
                </h3>
                <p className="text-lg text-primary/70 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="w-full h-1 bg-white/5 mt-8 relative overflow-hidden rounded-full">
                 <div className="absolute left-0 top-0 h-full w-0 bg-accent transition-all duration-700 group-hover:w-full"></div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalScrollSection;