import React from "react";
import { motion } from "framer-motion";

function AnimatedText({ text }) {
  const textArray = text.split(" ");

  const container = {
    hidden: { opacity: 1 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        delayChildren: 0.04 * i,
        staggerChildren: 0.1,
      },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <motion.div
      className="flex items-center justify-center overflow-hidden text-5xl p-5 text-slate-100"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {textArray.map((word, index) => (
        <motion.span className="mr-1.5" key={index} variants={child}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default AnimatedText;
