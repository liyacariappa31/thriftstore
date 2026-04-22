"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

export default function AboutClient({ images }: { images: string[] }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

  return (
    <main className="min-h-screen bg-black text-white pt-40 pb-24 selection:bg-white selection:text-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 md:px-12 xl:px-24 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[14vw] md:text-[8rem] lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.80] mb-16"
        >
          Built for<br/><span className="text-gray-500 italic font-serif font-light normal-case tracking-tight">Tomorrow.</span>
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 text-lg md:text-2xl font-medium text-gray-300 mt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <p className="mb-8">
              Founded in 2026, Cappen E-Commerce began as a digital experiment to bridge the absolute gap between physical objects and immersive digital experiences.
            </p>
            <p>
              We firmly believe that shopping should not be a static grid of flat images, but rather a carefully curated exhibition of interactive 3D objects that you can practically touch through the screen.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          >
            <p className="mb-8">
              Our award-winning team seamlessly blends emerging web technologies—from complex WebGL fluid dynamics to cutting-edge framer-motion physical layouts—to craft shopping environments that are heavily brutalist and profoundly beautiful.
            </p>
            <div className="flex flex-wrap gap-4 mt-16">
              <span className="border border-white/20 px-6 py-2 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors cursor-pointer">Paris</span>
              <span className="border border-white/20 px-6 py-2 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors cursor-pointer">Miami</span>
              <span className="border border-white/20 px-6 py-2 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors cursor-pointer">Tokyo</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Massive Visual Capabilities Grid */}
      <div ref={container} className="mt-40 md:mt-64 w-full h-[120vh] md:h-[150vh] flex gap-4 justify-center overflow-hidden border-y border-white/10 py-12 relative z-0">
        
        {/* Abstract Background Noise */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-transparent z-10 pointer-events-none" />

        <motion.div style={{ y: y1 }} className="flex flex-col gap-4 w-1/3 md:w-1/4">
          {images.map((src, i) => (
             <img key={`col1-${i}`} src={src} className="w-full h-[30vh] md:h-[40vh] object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 rounded-sm" />
          ))}
          {images.map((src, i) => (
             <img key={`col1-dup-${i}`} src={src} className="w-full h-[30vh] md:h-[40vh] object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 rounded-sm" />
          ))}
        </motion.div>
        
        <motion.div style={{ y: y2 }} className="flex flex-col gap-4 w-1/3 md:w-1/4 mt-[-50vh]">
           {images.map((src, i) => (
             <img key={`col2-${i}`} src={src} className="w-full h-[40vh] md:h-[50vh] object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 rounded-sm" />
          ))}
           {images.map((src, i) => (
             <img key={`col2-dup-${i}`} src={src} className="w-full h-[40vh] md:h-[50vh] object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 rounded-sm" />
          ))}
        </motion.div>

        <motion.div style={{ y: y1 }} className="flex flex-col gap-4 w-1/3 md:w-1/4">
           {images.map((src, i) => (
             <img key={`col3-${i}`} src={src} className="w-full h-[25vh] md:h-[35vh] object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 rounded-sm" />
          ))}
           {images.map((src, i) => (
             <img key={`col3-dup-${i}`} src={src} className="w-full h-[25vh] md:h-[35vh] object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 rounded-sm" />
          ))}
        </motion.div>
      </div>

      {/* 4. The Infinite Parallax Wall */}
      {/* <InfiniteParallaxWall images={productImages} /> */} {/* Assuming productImages is defined elsewhere or passed as prop */}

      {/* 5. Massive Awards / Recognition Marquee */}
      <section className="relative py-32 bg-white text-black overflow-hidden border-t border-b border-black">
         <div className="flex animate-marquee-fast whitespace-nowrap opacity-90">
            <h2 className="text-[10vw] font-black uppercase tracking-tighter leading-none flex items-center">
               <span className="mx-8 italic font-serif">Awwwards</span> SITE OF THE MONTH
               <span className="mx-8 italic font-serif">FWA</span> OF THE DAY
               <span className="mx-8 italic font-serif">CSS Design</span> AWARDS
               <span className="mx-8 italic font-serif">The</span> WEBBY AWARDS
            </h2>
         </div>
      </section>

      {/* 7. Footer Call to Action */}
      <section className="relative py-48 px-4 flex flex-col justify-center items-center text-center">
         <h2 className="text-4xl md:text-7xl font-serif italic text-white/50 mb-12">The Future of Commerce.</h2>
         <Link href="/products" className="font-mono text-sm uppercase tracking-widest border-b border-white pb-1 hover:text-gray-400 hover:border-gray-400 transition-colors">
            Explore The Archive [↗]
         </Link>
       </section>
    </main>
  );
}
