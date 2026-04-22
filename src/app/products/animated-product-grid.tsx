"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import TiltedCard from "@/components/TiltedCard";
import { cn } from "@/lib/utils";

export default function AnimatedProductGrid({ products }: { products: any[] }) {
  return (
    <div className="w-full flex flex-col gap-y-48 md:gap-y-64 mt-32">
      {products.map((product, index) => {
        // Structured elegant alternating layout
        const isEven = index % 2 === 0;
        const isLarge = index === 0 || index === 3; // Pinpoint specific large hero items
        
        const containerHeight = isLarge ? "85vh" : "65vh";

        return (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 150 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className={cn("w-full flex", isEven ? "justify-start" : "justify-end")}
          >
            <div className={cn("relative group", isLarge ? "w-full md:w-[75vw]" : "w-full md:w-[45vw]")}>
              
              {/* Product Background Text (Cleaned up parallax) */}
              <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] text-center pointer-events-none z-0 opacity-[0.03]">
                <h2 className="text-[18vw] font-black uppercase whitespace-nowrap text-white mix-blend-overlay tracking-tighter">
                  {product.name}
                </h2>
              </div>

              <Link href={`/products/${product.id}`} className="block relative z-10 w-full">
                <TiltedCard
                  imageSrc={product.image}
                  altText={product.name}
                  captionText={product.name}
                  containerHeight={containerHeight}
                  containerWidth="100%"
                  imageHeight={containerHeight}
                  imageWidth="100%"
                  rotateAmplitude={isLarge ? 8 : 14}
                  scaleOnHover={1.05}
                  showMobileWarning={false}
                  showTooltip={false}
                  displayOverlayContent={true}
                  overlayContent={
                    <div className="absolute inset-0 p-8 md:p-12 bg-linear-to-t from-black via-black/40 to-transparent flex flex-col justify-end w-full h-full rounded-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out">
                      <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                        <div className="flex justify-between items-end border-b border-white/30 pb-4 mb-4">
                           <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">{product.name}</h2>
                           <span className="text-xl md:text-3xl font-serif italic text-white/90">₹{product.price.toLocaleString("en-IN")}</span>
                        </div>
                        <p className="font-mono text-xs md:text-sm uppercase tracking-widest text-white/70 flex justify-between">
                          <span>View Object Details</span>
                          <span>[ 00{index + 1} ]</span>
                        </p>
                      </div>
                    </div>
                  }
                />
              </Link>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
