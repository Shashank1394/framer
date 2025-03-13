// src/components/Header.jsx
import React from "react";
import { motion } from "framer-motion";

const Header = () => {
  const text = "Framer Animations";
  const letters = Array.from(text);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.04,
        staggerChildren: 0.03,
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      x: -20,
      y: 30,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 10,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <header className="text-5xl text-center p-5 text-slate-100">
      <motion.h1
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center justify-center"
      >
        {letters.map((letter, index) => (
          <motion.span key={index} variants={childVariants}>
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.h1>
    </header>
  );
};

export default Header;
