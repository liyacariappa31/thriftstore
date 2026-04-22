"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Hide default cursor globally
    if (typeof document !== "undefined") {
      document.body.style.cursor = "none";
    }

    let currentHoverState = false;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const isHoverable = 
        target?.tagName?.toLowerCase() === "a" ||
        target?.tagName?.toLowerCase() === "button" ||
        target?.closest?.("a") ||
        target?.closest?.("button") ||
        window.getComputedStyle(target).cursor === "pointer";

      if (isHoverable !== currentHoverState) {
        currentHoverState = Boolean(isHoverable);
        setIsHoveringLink(Boolean(isHoverable));
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.body.style.cursor = "auto";
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center font-bold text-black"
      style={{
        width: 32,
        height: 32,
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      <motion.div
        animate={{
          scale: isHoveringLink ? 2.5 : 1,
          backgroundColor: isHoveringLink ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.4)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-full h-full rounded-full relative flex items-center justify-center"
      >
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: isHoveringLink ? 1 : 0 }}
          className="text-[8px] font-black uppercase tracking-widest pointer-events-none select-none text-black mix-blend-normal"
        >
          View
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
