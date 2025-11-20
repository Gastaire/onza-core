"use client";

import { motion } from "framer-motion";
import { Code, Cloud, Rocket } from "lucide-react";

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: <Code className="w-10 h-10 text-accent" />,
    title: "Software Development",
    description:
      "Custom software solutions tailored to your business needs, built with the latest technologies for scalability and performance.",
  },
  {
    icon: <Cloud className="w-10 h-10 text-accent" />,
    title: "IT Solutions",
    description:
      "Comprehensive IT support and infrastructure management to ensure your business runs smoothly and securely.",
  },
  {
    icon: <Rocket className="w-10 h-10 text-accent" />,
    title: "Automations",
    description:
      "Intelligent automation of your business processes to increase efficiency, reduce errors, and save costs.",
  },
];

import { Variants } from "framer-motion";

const cardVariants: Variants = {
  offscreen: {
    y: 100,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 1,
    },
  },
};

export function ServicesSection() {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-serif text-primary text-center mb-4">
            Our Expertise
          </h2>
          <p className="text-lg text-primary/70 text-center max-w-2xl mx-auto mb-16">
            We deliver a complete suite of technology services designed to elevate your business operations and drive growth.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
              className="bg-primary text-secondary p-8 rounded-lg shadow-lg flex flex-col items-center text-center border-t-2 border-accent"
            >
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
              <p className="text-secondary/80">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}