"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export function BigStatement() {
  const text = "We are a collaborative studio crafting bold objects, beautiful aesthetics, and physical experiences that actually matter.";
  const words = text.split(" ");
  
  return (
    <section className="relative z-20 w-full bg-black text-white px-4 md:px-12 xl:px-24 flex items-center justify-center py-40 min-h-[80vh] border-t border-white/10 mt-[-2px]">
      <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight leading-[1.15] max-w-6xl text-center flex flex-wrap justify-center gap-x-3 gap-y-2 lg:gap-x-4 lg:gap-y-4">
        {words.map((word, i) => {
          const isHighlight = word.includes("objects,") || word.includes("aesthetics,") || word.includes("experiences");
          return (
            <div key={i} className="overflow-hidden inline-flex pt-2">
              <motion.span
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
                className={isHighlight ? "font-serif italic text-gray-400" : ""}
              >
                {word}
              </motion.span>
            </div>
          );
        })}
      </h2>
    </section>
  );
}

export function HorizontalShowcase({ products }: { products: any[] }) {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Transform scroll progress into horizontal translation mapping
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-65%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-black">
      {/* Sticky container */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Background Typography behind the cards */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <h1 className="text-[25vw] font-black uppercase whitespace-nowrap text-white mix-blend-overlay">ARCHIVE 26</h1>
        </div>

        <motion.div style={{ x }} className="flex gap-12 md:gap-24 px-12 md:px-32 relative z-10 w-[300vw] items-center">
          <div className="flex flex-col justify-center min-w-[300px] max-w-[400px]">
             <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-[0.85]">Selected<br/>Archive</h3>
             <p className="text-gray-400 mt-6 font-mono text-sm uppercase tracking-widest max-w-xs">Scroll to explore our finest digital & physical objects. Engineered for tomorrow.</p>
          </div>
          
          {products.map((product) => (
            <div key={product.id} className="min-w-[80vw] md:min-w-[50vw] lg:min-w-[35vw] h-[55vh] md:h-[65vh] flex items-center justify-center shrink-0">
               <Link href={`/products/${product.id}`} className="relative w-full h-full block group overflow-hidden">
                 {/* Image Reveal Mask Effect */}
                 <motion.div 
                    initial={{ clipPath: "inset(100% 0 0 0)" }}
                    whileInView={{ clipPath: "inset(0 0 0 0)" }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full relative bg-gray-900"
                 >
                   <img src={product.image} alt={product.name} className="object-cover w-full h-full rounded-sm grayscale group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700 ease-out" />
                   
                   <div className="absolute bottom-0 left-0 p-8 w-full bg-linear-to-t from-black via-black/50 to-transparent translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                     <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">{product.name}</h2>
                     <p className="text-white/80 font-mono mt-2">₹{product.price.toLocaleString("en-IN")}</p>
                   </div>
                 </motion.div>
               </Link>
            </div>
          ))}

          <div className="flex flex-col justify-center min-w-[300px] max-w-[400px] shrink-0 h-full ml-12">
            <Link href="/products" className="text-white group flex items-center gap-6 hover:text-gray-400 transition-colors">
              <span className="text-5xl font-black uppercase tracking-tighter">View All</span>
              <span className="text-4xl border border-white rounded-full w-20 h-20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">→</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function ExpandingImageReveal({ image }: { image: string }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.6], [0.3, 1]);
  const filter = useTransform(scrollYProgress, [0, 0.6], ["grayscale(100%) blur(10px)", "grayscale(30%) blur(0px)"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  
  const textY = useTransform(scrollYProgress, [0.5, 0.8], ["100px", "0px"]);
  const textOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

  return (
    <section ref={container} className="relative h-[250vh] bg-black">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Scaling Background Image */}
        <motion.div 
          style={{ scale, filter, opacity }} 
          className="absolute inset-0 w-full h-full flex items-center justify-center"
        >
          <img src={image} alt="Lifestyle Scale" className="w-[100vw] h-[100vh] object-cover" />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </motion.div>

        {/* Grand Finale Text Reveal */}
        <motion.div 
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-10 flex flex-col items-center justify-center pointer-events-none px-4"
        >
          <h2 className="text-[12vw] font-black uppercase tracking-tighter text-white drop-shadow-2xl text-center leading-[0.80]">
            The <span className="text-white/60 italic font-serif">Absolute</span>
          </h2>
          <h2 className="text-[12vw] font-black uppercase tracking-tighter text-white drop-shadow-2xl text-center leading-[0.80] ml-12">
            Archive.
          </h2>
          <div className="mt-12 flex items-center gap-8">
            <div className="h-[1px] w-24 bg-white/30" />
            <p className="font-mono text-white/80 uppercase tracking-widest text-sm">Engineered in 2026</p>
            <div className="h-[1px] w-24 bg-white/30" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export function StickyProcessSection() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={container} className="relative h-[300vh] bg-black text-white border-t border-white/10">
      <div className="sticky top-0 h-screen flex flex-col md:flex-row items-center overflow-hidden px-4 md:px-12 xl:px-24">
        
        {/* Left Side: Fixed Title */}
        <div className="w-full md:w-1/3 h-1/3 md:h-full flex flex-col justify-end md:justify-center border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 md:pr-12 z-20 bg-black/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none transition-all">
           <h2 className="text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-gray-400 mb-4 md:mb-8">[ OUR EXPERTISE ]</h2>
           <h3 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.85]">
             We build<br/><span className="font-serif italic text-white/50 lowercase">worlds.</span>
           </h3>
        </div>

        {/* Right Side: Scroll Content */}
        <div className="w-full md:w-2/3 h-2/3 md:h-full relative">
           
           <motion.div 
             style={{ 
               y: useTransform(scrollYProgress, [0, 0.33], ["100vh", "0vh"]),
               opacity: useTransform(scrollYProgress, [0, 0.1, 0.33, 0.4], [0, 1, 1, 0])
             }}
             className="absolute inset-0 flex flex-col justify-start md:justify-center pt-16 md:pt-0 pl-4 md:pl-24"
           >
             <h4 className="text-5xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter">01. Strategy</h4>
             <p className="mt-6 md:mt-8 text-lg md:text-2xl text-gray-400 max-w-2xl font-medium">We define the rules of engagement. Analyzing human behavior to architect digital footprints that disrupt standard commerce.</p>
           </motion.div>

           <motion.div 
             style={{ 
               y: useTransform(scrollYProgress, [0.33, 0.66], ["100vh", "0vh"]),
               opacity: useTransform(scrollYProgress, [0.3, 0.4, 0.66, 0.7], [0, 1, 1, 0])
             }}
             className="absolute inset-0 flex flex-col justify-start md:justify-center pt-16 md:pt-0 pl-4 md:pl-24"
           >
             <h4 className="text-5xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter">02. Design</h4>
             <p className="mt-6 md:mt-8 text-lg md:text-2xl text-gray-400 max-w-2xl font-medium">Pixels mapped with microscopic precision. Every micro-interaction is deliberately engineered to hold the user's attention hostage.</p>
           </motion.div>

           <motion.div 
             style={{ 
               y: useTransform(scrollYProgress, [0.66, 1], ["100vh", "0vh"]),
               opacity: useTransform(scrollYProgress, [0.6, 0.7, 1, 1], [0, 1, 1, 1])
             }}
             className="absolute inset-0 flex flex-col justify-start md:justify-center pt-16 md:pt-0 pl-4 md:pl-24"
           >
             <h4 className="text-5xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter">03. Physical</h4>
             <p className="mt-6 md:mt-8 text-lg md:text-2xl text-gray-400 max-w-2xl font-medium">Bridging the tactile gap. Transporting the heavy, immutable reality of physical objects purely through an illuminated screen.</p>
           </motion.div>

        </div>
      </div>
    </section>
  );
}
