// src/App.jsx
import {
  easeInOut,
  motion,
  useInView,
  useScroll,
  useAnimation,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { twMerge } from "tailwind-merge";
import { FiMousePointer } from "react-icons/fi";

// -------------------------------
// Variants for animations
// -------------------------------
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

// -------------------------------
// Additional Components
// -------------------------------
const BounceCard = ({ className, children }) => {
  return (
    <motion.div
      whileHover={{ scale: 0.95, rotate: "-1deg" }}
      className={`w-70 group relative min-h-[300px] cursor-pointer overflow-hidden rounded-2xl bg-slate-100 p-8 ${className}`}
    >
      {children}
    </motion.div>
  );
};

const CardTitle = ({ children }) => {
  return (
    <h3 className="mx-auto text-center text-3xl font-semibold">{children}</h3>
  );
};

// -------------------------------
// DragCards Component and Helpers
// -------------------------------
export const DragCards = () => {
  return (
    // Adjusted to use full container dimensions rather than full-screen
    <section className="relative grid h-full w-full place-content-center overflow-hidden bg-neutral-950">
      <h2 className="relative z-0 text-[22vw] font-black text-neutral-800 md:text-[7vw]">
        ASTRO<span className="text-indigo-500">.</span>
      </h2>
      <Cards />
    </section>
  );
};

const Cards = () => {
  const containerRef = useRef(null);

  return (
    <div className="absolute inset-0 z-10" ref={containerRef}>
      <DragCard
        containerRef={containerRef}
        src="https://images.unsplash.com/photo-1635373670332-43ea883bb081?q=80&w=2781&auto=format&fit=crop&ixlib=rb-4.0.3"
        alt="Example image"
        rotate="6deg"
        top="20%"
        left="25%"
        className="w-36 md:w-56"
      />
      <DragCard
        containerRef={containerRef}
        src="https://images.unsplash.com/photo-1576174464184-fb78fe882bfd?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3"
        alt="Example image"
        rotate="12deg"
        top="45%"
        left="60%"
        className="w-24 md:w-48"
      />
      <DragCard
        containerRef={containerRef}
        src="https://images.unsplash.com/photo-1503751071777-d2918b21bbd9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3"
        alt="Example image"
        rotate="-6deg"
        top="20%"
        left="40%"
        className="w-52 md:w-80"
      />
      <DragCard
        containerRef={containerRef}
        src="https://images.unsplash.com/photo-1620428268482-cf1851a36764?q=80&w=2609&auto=format&fit=crop&ixlib=rb-4.0.3"
        alt="Example image"
        rotate="8deg"
        top="50%"
        left="40%"
        className="w-48 md:w-72"
      />
      <DragCard
        containerRef={containerRef}
        src="https://images.unsplash.com/photo-1602212096437-d0af1ce0553e?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3"
        alt="Example image"
        rotate="18deg"
        top="20%"
        left="65%"
        className="w-40 md:w-64"
      />
      <DragCard
        containerRef={containerRef}
        src="https://images.unsplash.com/photo-1622313762347-3c09fe5f2719?q=80&w=2640&auto=format&fit=crop&ixlib=rb-4.0.3"
        alt="Example image"
        rotate="-3deg"
        top="35%"
        left="55%"
        className="w-24 md:w-48"
      />
    </div>
  );
};

const DragCard = ({ containerRef, src, alt, top, left, rotate, className }) => {
  const [zIndex, setZIndex] = useState(0);

  const updateZIndex = () => {
    const els = document.querySelectorAll(".drag-elements");
    let maxZIndex = -Infinity;
    els.forEach((el) => {
      let currentZ = parseInt(
        window.getComputedStyle(el).getPropertyValue("z-index")
      );
      if (!isNaN(currentZ) && currentZ > maxZIndex) {
        maxZIndex = currentZ;
      }
    });
    setZIndex(maxZIndex + 1);
  };

  return (
    <motion.img
      onMouseDown={updateZIndex}
      style={{ top, left, rotate, zIndex }}
      className={twMerge(
        "drag-elements absolute w-48 bg-neutral-200 p-1 pb-4",
        className
      )}
      src={src}
      alt={alt}
      drag
      dragConstraints={containerRef}
      dragElastic={0.65}
    />
  );
};

const TiltCard = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["7.5deg", "-7.5deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-7.5deg", "7.5deg"]
  );

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative h-96 w-72 rounded-xl bg-gradient-to-br from-indigo-300 to-violet-300"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-4 grid place-content-center rounded-xl bg-white shadow-lg"
      >
        <FiMousePointer
          style={{ transform: "translateZ(75px)" }}
          className="mx-auto text-4xl"
        />
        <p
          style={{ transform: "translateZ(50px)" }}
          className="text-center text-2xl font-bold"
        >
          HOVER ME
        </p>
      </div>
    </motion.div>
  );
};

// -------------------------------
// Main App Component
// -------------------------------
function App() {
  // Enable smooth scrolling globally
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  // Scroll progress for animations
  const { scrollYProgress: completionProgress } = useScroll();
  const textSectionRef = useRef(null);
  const isTextInView = useInView(textSectionRef, { once: true });
  const mainControls = useAnimation();

  const { scrollYProgress } = useScroll({
    target: textSectionRef,
    offset: ["start end", "end end"],
  });

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

  // State for drag constraints in the standalone drag example
  const [dragLimit, setDragLimit] = useState(125);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handler = (e) => setDragLimit(e.matches ? 90 : 125);
    setDragLimit(mediaQuery.matches ? 90 : 125);
    mediaQuery.addEventListener("change", handler);
    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, []);

  useEffect(() => {
    if (isTextInView) {
      mainControls.start("visible");
    }
  }, [isTextInView, mainControls]);

  return (
    <>
      <Header />
      <div className="flex flex-col gap-10 overflow-x-hidden">
        {/* Grid Animations Section */}
        <motion.section
          variants={gridContainerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4 md:p-10 gap-4 md:gap-10"
        >
          {/* Fade Up */}
          <motion.div
            variants={gridSquareVariants}
            className="bg-slate-800 aspect-square rounded-lg flex flex-row md:flex-row items-center justify-center gap-4 md:gap-10 p-4"
          >
            <motion.div
              className="w-16 h-16 md:w-24 md:h-24 bg-stone-100 rounded-lg"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            />
            <motion.div
              className="w-16 h-16 md:w-24 md:h-24 bg-stone-100 rounded-full"
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            />
          </motion.div>

          {/* Shape Shifting */}
          <motion.div
            variants={gridSquareVariants}
            className="bg-slate-800 aspect-square rounded-lg flex items-center justify-center p-4"
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
            className="bg-slate-800 aspect-square rounded-lg flex items-center justify-center p-4"
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{
                scale: 1.1,
                backgroundColor: "#d1d5db",
                color: "black",
              }}
              whileFocus={{
                scale: 1.1,
                backgroundColor: "#d1d5db",
                color: "black",
              }}
              transition={{ bounceDamping: 10, bounceStiffness: 600 }}
              className="bg-emerald-600 w-full sm:w-1/2 py-4 rounded-lg text-2xl text-gray-100 font-light tracking-wide"
            >
              Click Me!
            </motion.button>
          </motion.div>

          {/* Standalone Drag */}
          <motion.div
            variants={gridSquareVariants}
            className="bg-slate-800 aspect-square rounded-lg flex items-center justify-center p-4"
          >
            <motion.div
              className="w-1/3 h-1/3 md:w-1/3 md:h-1/3 bg-orange-500 rounded-3xl cursor-grab text-xl md:text-4xl text-gray-800 font-medium flex items-center justify-center"
              drag
              dragConstraints={{
                left: -dragLimit,
                right: dragLimit,
                top: -dragLimit,
                bottom: dragLimit,
              }}
              dragTransition={{ bounceDamping: 10, bounceStiffness: 600 }}
            >
              Drag Me
            </motion.div>
          </motion.div>

          {/* Scroll Progress */}
          <motion.div
            variants={gridSquareVariants}
            className="bg-slate-800 aspect-square rounded-lg flex items-center justify-center p-4"
          >
            <motion.div className="w-24 md:w-40 aspect-square bg-gray-50/20 rounded-xl">
              <motion.div
                className="w-full bg-gray-400 rounded-xl h-full origin-bottom"
                style={{ scaleY: completionProgress }}
              />
            </motion.div>
          </motion.div>

          {/* SVG Animation */}
          <motion.div
            variants={gridSquareVariants}
            className="bg-slate-800 aspect-square rounded-lg flex items-center justify-center p-4"
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-3/4 md:w-1/2 stroke-amber-500 stroke-[0.5]"
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

          {/* Bouncy Cards */}
          <motion.div
            variants={gridSquareVariants}
            className="bg-slate-800 aspect-square rounded-lg flex items-center justify-center p-4"
          >
            <BounceCard>
              <CardTitle>Hover Over</CardTitle>
              <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-violet-400 to-indigo-400 p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
                <span className="block text-center font-semibold text-indigo-50">
                  :)
                </span>
              </div>
            </BounceCard>
          </motion.div>

          {/* Drag Cards */}
          <motion.div
            variants={gridSquareVariants}
            className="bg-slate-800 aspect-square rounded-lg flex items-center justify-center p-4"
          >
            <DragCards />
          </motion.div>

          {/* 3D Card Tilt */}
          <motion.div
            variants={gridSquareVariants}
            className="bg-slate-800 aspect-square rounded-lg flex items-center justify-center p-4"
          >
            <TiltCard />
          </motion.div>
        </motion.section>

        {/* Text Section with Animation */}
        <section className="flex flex-col gap-10 mb-10" ref={textSectionRef}>
          <motion.h1
            className="text-3xl sm:text-5xl tracking-wide text-slate-100 text-center"
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
            className="text-slate-100 font-thin text-2xl sm:text-4xl w-11/12 sm:w-1/2 mx-auto"
          >
            This website harnesses the power of Framer Motion to create
            seamless, dynamic animations. Every element—from grid transitions to
            interactive drag components—has been designed to engage and delight.
          </motion.p>
          <motion.p
            style={{ translateX: paragraphTwoValue }}
            className="text-slate-100 font-thin text-2xl sm:text-4xl w-11/12 sm:w-1/2 mx-auto"
          >
            By integrating TailwindCSS for styling and Framer Motion for fluid
            animations, we ensure that the user experience is not only visually
            captivating but also highly responsive as you scroll, click, and
            interact with the site.
          </motion.p>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default App;
