"use client";

import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
}

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.08,
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export function AnimatedText({ text, className }: AnimatedTextProps) {
  return (
    <motion.h1
      className={className}
      variants={sentence}
      initial="hidden"
      animate="visible"
    >
      {text.split("").map((char, index) => {
        return (
          <motion.span key={char + "-" + index} variants={letter}>
            {char}
          </motion.span>
        );
      })}
    </motion.h1>
  );
}