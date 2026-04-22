"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type IntroGateProps = {
  imageNames: string[];
};

const SWAP_INTERVAL_MS = 75;
const EXIT_DELAY_MS = 1100;

export function IntroGate({ imageNames }: IntroGateProps) {
  const [started, setStarted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const imageUrls = useMemo(
    () =>
      imageNames.map(
        (name) => `/api/intro-image?name=${encodeURIComponent(name)}`,
      ),
    [imageNames],
  );

  useEffect(() => {
    if (!started || imageUrls.length === 0) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
    }, SWAP_INTERVAL_MS);

    const timeoutId = window.setTimeout(() => {
      window.clearInterval(intervalId);
      setRevealed(true);
    }, EXIT_DELAY_MS);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, [imageUrls.length, started]);

  return (
    <>
      <AnimatePresence>
        {!revealed && (
          <motion.section
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeInOut" } }}
            className="fixed inset-0 z-[200] flex min-h-screen items-center justify-center overflow-hidden bg-transparent text-black"
          >
            {started && imageUrls.length > 0 && (
              <div className="intro-image-stage">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={imageUrls[currentIndex]}
                    src={imageUrls[currentIndex]}
                    alt=""
                    initial={{ opacity: 0, scale: 1.03, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.985, filter: "blur(2px)" }}
                    transition={{ duration: 0.18, ease: "easeInOut" }}
                    className="h-full w-full object-cover"
                  />
                </AnimatePresence>
              </div>
            )}

            <div className="intro-overlay" />

            <motion.button
              type="button"
              onClick={() => setStarted(true)}
              disabled={started}
              whileHover={started ? undefined : { scale: 1.03 }}
              whileTap={started ? undefined : { scale: 0.98 }}
              className="absolute inset-0 z-10 cursor-pointer disabled:cursor-default"
              aria-label={started ? "Loading" : "Enter"}
            >
              <span className="sr-only">
                {started ? "Loading experience" : "Enter"}
              </span>
            </motion.button>
          </motion.section>
        )}
      </AnimatePresence>

      <div
        className={`min-h-screen transition-opacity duration-500 ${
          revealed ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}
