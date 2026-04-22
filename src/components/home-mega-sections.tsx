"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

/* 1. Massive Hover Accordion */
export function AccordionShowcase({ products }: { products: any[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const items = products.slice(0, 5);

  return (
    <section className="w-full py-32 md:py-48 bg-black text-white border-t border-white/10 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-24">
        <h2 className="text-sm md:text-xl font-mono uppercase tracking-[0.3em] text-gray-500 mb-16 md:mb-24 flex items-center gap-4">
           <span className="w-8 h-[1px] bg-gray-500" /> CURATED SELECTIONS
        </h2>
        
        <div className="w-full border-t border-white/20 flex flex-col">
          {items.map((product, i) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <div 
                 onMouseEnter={() => setHoveredIndex(i)}
                 onMouseLeave={() => setHoveredIndex(null)}
                 className="w-full group border-b border-white/20 py-6 md:py-10 flex flex-col md:flex-row md:items-center justify-between relative cursor-pointer"
              >
                 
                 <div className="flex items-center gap-6 md:gap-12 w-full md:w-auto relative z-10 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4">
                    <span className="text-xs md:text-sm font-mono text-white/40">
                      (0{i + 1})
                    </span>
                    
                    <h3 className="text-3xl md:text-5xl lg:text-[4vw] font-black uppercase tracking-tighter whitespace-nowrap leading-none transition-colors duration-500 group-hover:text-white/90">
                      {product.name}
                    </h3>

                    {/* Inline Expanding Image Reveal (Hidden on small mobile) */}
                    <div 
                       className="hidden md:block overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-sm ml-4"
                       style={{ 
                         width: hoveredIndex === i ? '20vw' : '0vw', 
                         opacity: hoveredIndex === i ? 1 : 0 
                       }}
                    >
                       <img 
                          src={product.image} 
                          className="w-[20vw] h-[80px] lg:h-[120px] object-cover scale-[1.3] group-hover:scale-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" 
                       />
                    </div>
                 </div>
                 
                 <div className="hidden md:flex relative z-10 items-center justify-end overflow-hidden">
                    <span className="text-xs md:text-sm font-mono uppercase tracking-widest text-white/30 group-hover:text-white transition-colors transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-500">
                      [ View Project ]
                    </span>
                 </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 2. Philosophy Word-By-Word Scroll Reveal */
export function PhilosophyScroll() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start center", "end center"]
  });

  const text = "We do not just design websites. We engineer brutalist, heavy, immutable digital spaces that challenge the absolute fabric of modern commerce. Every pixel is a calculated assault on the mundane.";
  const words = text.split(" ");

  return (
    <section ref={container} className="w-full py-64 bg-white text-black border-t border-b border-black">
       <div className="max-w-[1400px] mx-auto px-4 md:px-12 xl:px-24">
         <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-gray-400 mb-16">[ OUR PHILOSOPHY ]</h2>
         <p className="flex flex-wrap text-4xl md:text-6xl lg:text-[5.5rem] font-black uppercase tracking-tighter leading-[0.85]">
            {words.map((word, i) => {
               const start = i / words.length;
               const end = start + (1 / words.length);
               const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
               return (
                 <span key={i} className="mr-4 md:mr-8 mb-4 md:mb-8 relative">
                   <motion.span style={{ opacity }} className="text-black">{word}</motion.span>
                   <span className="absolute left-0 top-0 opacity-10">{word}</span>
                 </span>
               )
            })}
         </p>
       </div>
    </section>
  );
}
