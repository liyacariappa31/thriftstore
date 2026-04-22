"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export function DensityMasonryFeature({ images }: { images: string[] }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const y4 = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Use the first 4 images safely, or fallback
  const fallback = "https://images.unsplash.com/photo-1528148343865-51218c4a13e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
  const img1 = images[0] || fallback;
  const img2 = images[1] || fallback;
  const img3 = images[2] || fallback;
  const img4 = images[3] || fallback;

  return (
    <section ref={container} className="relative py-32 md:py-48 bg-black w-full overflow-hidden border-t border-white/5">
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] text-center pointer-events-none opacity-[0.03] z-0">
          <h2 className="text-[25vw] font-black uppercase whitespace-nowrap text-white mix-blend-overlay tracking-tighter leading-none">
             AESTHETIC
          </h2>
          <h2 className="text-[25vw] font-black uppercase whitespace-nowrap text-white mix-blend-overlay tracking-tighter leading-none ml-24">
             OBJECTS
          </h2>
       </div>

       <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-24 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
          
          <div className="w-full md:w-1/2 h-[80vh] md:h-[120vh] relative">
             <motion.div style={{ y: y1 }} className="absolute top-[10%] left-[5%] w-[60%] h-[50%] z-20">
                <img src={img1} className="w-full h-full object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700" />
             </motion.div>
             
             <motion.div style={{ y: y2 }} className="absolute bottom-[5%] right-[5%] w-[55%] h-[40%] z-10">
                <img src={img2} className="w-full h-full object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700" />
             </motion.div>
          </div>

          <div className="w-full md:w-1/2 h-[80vh] md:h-[120vh] relative">
             <motion.div style={{ y: y3 }} className="absolute top-[5%] right-[10%] w-[50%] h-[45%] z-20">
                <img src={img3} className="w-full h-full object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700" />
             </motion.div>
             
             <motion.div style={{ y: y4 }} className="absolute bottom-[10%] left-[5%] w-[65%] h-[55%] z-10 shadow-2xl">
                <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />
                <img src={img4} className="w-full h-full object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700" />
                <h3 className="absolute bottom-8 left-8 z-20 text-white font-black text-4xl uppercase tracking-tighter">Radical<br/>Form.</h3>
             </motion.div>
          </div>

       </div>
    </section>
  );
}

export function InfiniteMarqueeFeature() {
  return (
    <section className="relative py-24 bg-white w-full overflow-hidden text-black border-t border-b border-black">
       <div className="flex animate-marquee-fast whitespace-nowrap">
          <h2 className="text-[12vw] font-black uppercase tracking-tighter leading-none flex items-center">
             <span className="mx-8 italic font-serif opacity-30">Future</span> CAPPEN DIGITAL STUDIOS
             <span className="mx-8 italic font-serif opacity-30">Archive</span> CAPPEN DIGITAL STUDIOS
             <span className="mx-8 italic font-serif opacity-30">Future</span> CAPPEN DIGITAL STUDIOS
             <span className="mx-8 italic font-serif opacity-30">Archive</span> CAPPEN DIGITAL STUDIOS
          </h2>
       </div>
    </section>
  )
}
