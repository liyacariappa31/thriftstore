import { promises as fs } from "fs";
import path from "path";
import { IntroGate } from "@/components/intro-gate";
import LiquidEther from "@/components/LiquidEther";
import { getProducts } from "@/lib/products";
import Link from "next/link";
import { BigStatement, HorizontalShowcase, ExpandingImageReveal, StickyProcessSection } from "@/components/home-scroll-animations";
import { DensityMasonryFeature, InfiniteMarqueeFeature } from "@/components/home-density-features";
import { AccordionShowcase, PhilosophyScroll } from "@/components/home-mega-sections";

const IMAGES_DIR = path.join(process.cwd(), "images");

export default async function Home() {
  let imageNames: string[] = [];

  try {
    const files = await fs.readdir(IMAGES_DIR);
    imageNames = files.filter((file) =>
      /\.(avif|gif|jpe?g|png|webp)$/i.test(file),
    );
  } catch {
    imageNames = [];
  }

  const products = await getProducts();
  const showcaseProducts = products.slice(0, 6);
  // Pick a lifestyle image (for the parallax background)
  const lifestyleImage = products.length > 0 ? products[products.length - 1].image : "";

  return (
    <main className="relative w-full bg-black selection:bg-white selection:text-black">
      
      {/* =============== HERO FOLD (LIGHT MODE) =============== */}
      <section className="relative h-screen w-full overflow-hidden bg-white text-black">
        {/* High-Contrast Gooey Background Layer */}
        <div 
          className="absolute inset-0 z-0 bg-white pointer-events-auto" 
          style={{ filter: 'contrast(250) grayscale(100%)' }}
        >
          <div className="absolute inset-0" style={{ filter: 'blur(10px)' }}>
            <LiquidEther 
              colors={['#000000']} 
              mouseForce={50}
              cursorSize={200}
              isViscous={false}
            />
          </div>
        </div>

        {/* Kinetic Typography Overlay */}
        <div className="absolute inset-0 z-10 flex w-full flex-col items-center justify-center pointer-events-none mix-blend-difference text-white select-none">
          
          <div className="absolute top-32 left-8 md:left-24 text-xs font-mono uppercase tracking-[0.3em] rotate-90 origin-left opacity-60 hidden sm:block">
            [ ARCHIVE / 001 ]
          </div>
          
          <div className="flex w-full max-w-[95vw] md:max-w-[85vw] flex-col items-stretch justify-center px-4 md:px-0 mt-8">
            <h1 className="text-[18vw] md:text-[14vw] font-black leading-[0.75] tracking-tighter uppercase self-start italic">
              BUILDING
            </h1>
            <h1 className="text-[18vw] md:text-[14vw] font-black leading-[0.75] tracking-tight uppercase self-center md:translate-x-12 mt-2">
              TOMORROW
            </h1>
            <div className="flex w-full justify-between items-center mt-2">
              <h1 className="text-[18vw] md:text-[14vw] font-black leading-[0.75] tracking-tighter uppercase line-through decoration-8 md:decoration-16">
                FOR
              </h1>
              <h1 className="text-[18vw] md:text-[14vw] font-black leading-[0.75] tracking-tighter uppercase outline-text italic">
                TODAY
              </h1>
            </div>
          </div>

          <div className="absolute bottom-[calc(10vh)] md:bottom-8 w-full overflow-hidden border-t border-b border-white py-2 flex whitespace-nowrap bg-white text-black mix-blend-normal z-20">
            <div className="flex animate-marquee font-mono text-xs md:text-sm uppercase tracking-widest font-bold">
              <span className="mx-4">⋆ SHOP THE COLLECTION</span>
              <span className="mx-4">⋆ FREE WORLDWIDE SHIPPING</span>
              <span className="mx-4">⋆ GEN-Z APPROVED</span>
              <span className="mx-4">⋆ DIGITAL MAKERS</span>
              <span className="mx-4">⋆ SHOP THE COLLECTION</span>
              <span className="mx-4">⋆ FREE WORLDWIDE SHIPPING</span>
              <span className="mx-4">⋆ GEN-Z APPROVED</span>
              <span className="mx-4">⋆ DIGITAL MAKERS</span>
            </div>
          </div>
        </div>
      </section>

      {/* =============== AGENCY SCROLL ANIMATIONS (DARK MODE) =============== */}
      
      {/* 1. Animated Typography Matrix */}
      <BigStatement />

      {/* 2. High Density Interlocking Parallax Masonry */}
      <DensityMasonryFeature images={showcaseProducts.slice(0, 4).map(p => p.image)} />
      
      {/* 3. Infinite Brand Marquee Layer */}
      <InfiniteMarqueeFeature />

      {/* 4. Massive Accordion Showcase */}
      <AccordionShowcase products={products} />

      {/* 5. Philosophy Scroll Typography String */}
      <PhilosophyScroll />
      
      {/* 6. Process Sticky Scroll */}
      <StickyProcessSection />

      {/* 5. Massive Horizontal Physics Showcase */}
      <HorizontalShowcase products={showcaseProducts} />

      {/* 6. Immersive Grand Finale Expansion */}
      {lifestyleImage && <ExpandingImageReveal image={lifestyleImage} />}

      {/* =============== THE FOOTER =============== */}
      <footer className="relative z-20 w-full bg-black text-white py-12 px-4 md:px-12 xl:px-24 flex flex-col md:flex-row justify-between items-center gap-6 text-xs uppercase tracking-widest font-mono">
        <p>© 2026 CAPPEN E-COMMERCE.</p>
        <div className="flex gap-8">
          <Link href="#" className="hover:text-gray-400 transition-colors">Instagram</Link>
          <Link href="#" className="hover:text-gray-400 transition-colors">Twitter</Link>
          <Link href="#" className="hover:text-gray-400 transition-colors">LinkedIn</Link>
        </div>
        <p>Miami — Paris — Tokyo</p>
      </footer>

      {/* Loading Overlay */}
      <div className="relative z-50 pointer-events-none">
        <IntroGate imageNames={imageNames} />
      </div>
    </main>
  );
}
