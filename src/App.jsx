// App.jsx
import {
  easeInOut,
  motion,
  useInView,
  useScroll,
  useAnimation,
  useTransform,
} from "framer-motion";
import { useRef, useEffect } from "react";

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25 },
  },
};

const gridSquareVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const svgIconVariants = {
  hidden: { opacity: 0, pathLength: 0, fill: "rgba(252, 211, 77, 0)" },
  visible: { opacity: 1, pathLength: 1, fill: "rgba(252, 211, 77, 1)" },
};

function App() {
  // For the grid section's scroll progress
  const { scrollYProgress: completionProgress } = useScroll();

  // Create a separate ref for the text section
  const textSectionRef = useRef(null);

  // Hook to detect if text section is in view (triggers once)
  const isTextInView = useInView(textSectionRef, { once: true });
  const mainControls = useAnimation();

  // Scroll progress specifically for the text section animations
  const { scrollYProgress } = useScroll({
    target: textSectionRef,
    offset: ["start end", "end end"],
  });

  // Create transform animations for paragraphs
  const paragraphOneValue = useTransform(
    scrollYProgress,
    [0, 1],
    ["-100%", "0%"]
  );
  const paragraphTwoValue = useTransform(
    scrollYProgress,
    [0, 1],
    ["100%", "0%"]
  );

  useEffect(() => {
    if (isTextInView) {
      mainControls.start("visible");
    }
  }, [isTextInView, mainControls]);

  return (
    <div className="flex flex-col gap-10 overflow-x-hidden">
      {/* Grid Animations Section */}
      <motion.section
        variants={gridContainerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-3 p-10 gap-10"
      >
        {/* Fade Up */}
        <motion.div
          variants={gridSquareVariants}
          className="bg-slate-800 aspect-square rounded-lg flex items-center justify-center gap-10"
        >
          <motion.div
            className="w-25 h-25 bg-stone-100 rounded-lg"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          />
          <motion.div
            className="w-25 h-25 bg-stone-100 rounded-full"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          />
        </motion.div>

        {/* Shape Shifting */}
        <motion.div
          variants={gridSquareVariants}
          className="bg-slate-800 aspect-square rounded-lg flex items-center justify-center gap-10"
        >
          <motion.div
            className="w-1/3 h-1/3 shadow-md bg-rose-400"
            animate={{
              scale: [1, 2, 2, 1],
              rotate: [0, 90, 90, 0],
              borderRadius: ["10%", "10%", "50%", "10%"],
            }}
            transition={{
              duration: 5,
              ease: easeInOut,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />
        </motion.div>

        {/* Button */}
        <motion.div
          variants={gridSquareVariants}
          className="bg-slate-800 aspect-square rounded-lg flex items-center justify-center gap-10"
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{
              scale: 1.1,
              backgroundColor: "#d1d5db",
              color: "black",
            }}
            transition={{ bounceDamping: 10, bounceStiffness: 600 }}
            className="bg-emerald-600 w-1/2 py-4 rounded-lg text-2xl text-gray-100 font-light tracking-wide"
          >
            Click Me!
          </motion.button>
        </motion.div>

        {/* Drag */}
        <motion.div
          variants={gridSquareVariants}
          className="bg-slate-800 aspect-square rounded-lg flex items-center justify-center gap-10"
        >
          <motion.div
            className="w-1/3 h-1/3 bg-orange-500 rounded-3xl cursor-grab text-4xl text-gray-800 font-medium flex items-center justify-center"
            drag
            dragConstraints={{ left: -125, right: 125, top: -125, bottom: 125 }}
            dragTransition={{ bounceDamping: 10, bounceStiffness: 600 }}
          >
            Drag Me
          </motion.div>
        </motion.div>

        {/* Scroll Progress */}
        <motion.div
          variants={gridSquareVariants}
          className="bg-slate-800 aspect-square rounded-lg flex items-center justify-center gap-10"
        >
          <motion.div className="w-40 aspect-square bg-gray-50/20 rounded-xl">
            <motion.div
              className="w-full bg-gray-400 rounded-xl h-full origin-bottom"
              style={{ scaleY: completionProgress }}
            />
          </motion.div>
        </motion.div>

        {/* SVG Animation */}
        <motion.div
          variants={gridSquareVariants}
          className="bg-slate-800 aspect-square rounded-lg flex items-center justify-center gap-10"
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-1/2 stroke-amber-500 stroke-[0.5]"
          >
            <motion.path
              d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
              variants={svgIconVariants}
              initial="hidden"
              animate="visible"
              transition={{
                default: {
                  duration: 2,
                  ease: "easeInOut",
                  delay: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 1,
                },
                fill: {
                  duration: 2,
                  ease: "easeIn",
                  delay: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 1,
                },
              }}
            />
          </motion.svg>
        </motion.div>
      </motion.section>

      {/* Text Section with Animation */}
      <section className="flex flex-col gap-10 mb-10" ref={textSectionRef}>
        <motion.h1
          className="text-5xl tracking-wide text-slate-100 text-center"
          animate={mainControls}
          initial="hidden"
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ delay: 0.3 }}
        >
          Just Keep Scrolling
        </motion.h1>
        <motion.p
          style={{ translateX: paragraphOneValue }}
          className="text-slate-100 font-thin text-4xl w-1/2 mx-auto"
        >
          This website harnesses the power of Framer Motion to create seamless,
          dynamic animations. Every element—from grid transitions to interactive
          drag components—has been designed to engage and delight.
        </motion.p>
        <motion.p
          style={{ translateX: paragraphTwoValue }}
          className="text-slate-100 font-thin text-4xl w-1/2 mx-auto"
        >
          By integrating TailwindCSS for styling and Framer Motion for fluid
          animations, we ensure that the user experience is not only visually
          captivating but also highly responsive as you scroll, click, and
          interact with the site.
        </motion.p>
      </section>
    </div>
  );
}

export default App;
