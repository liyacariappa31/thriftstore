import { getProducts } from "@/lib/products";
import AnimatedProductGrid from "./animated-product-grid";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-black pt-32 md:pt-40 pb-32 px-4 sm:px-12 lg:px-24 text-white selection:bg-white selection:text-black overflow-hidden relative">
      
      {/* Background Noise Layer for Density */}
      <div className="fixed inset-0 pointer-events-none z-[-5] opacity-[0.03]" style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')", backgroundSize: "200px" }} />

      {/* Looping Marquee Overlay */}
      <div className="absolute top-[10vh] left-0 w-full overflow-hidden flex whitespace-nowrap opacity-[0.04] pointer-events-none z-0">
          <h2 className="text-[25vw] font-black uppercase tracking-tighter leading-none animate-marquee-fast mix-blend-overlay">
             AESTHETIC ARCHIVE AESTHETIC ARCHIVE AESTHETIC ARCHIVE AESTHETIC ARCHIVE
          </h2>
      </div>

      {/* Massive Kinetic Header */}
      <div className="mx-auto w-full max-w-[1600px] mb-24 md:mb-32 relative z-10 border-b border-white/20 pb-16">
        <h1 className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-[0.8] mb-2 md:mb-4 group">
          The <span className="font-serif italic text-white/40 transition-colors duration-500 group-hover:text-white">Complete</span>
        </h1>
        <h1 className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-[0.8] ml-4 md:ml-32 lg:ml-64">
          Archive <sup className="text-xl md:text-3xl font-mono text-white/30 top-[-1em] md:top-[-2em] tracking-widest">[ 2026 ]</sup>
        </h1>
      </div>

      <div className="mx-auto w-full max-w-[1600px] relative z-20 flex flex-col md:flex-row gap-12 lg:gap-24">
         
         {/* Sticky Navigation / Filter Sidebar */}
         <div className="w-full md:w-1/4 pt-12 md:pb-[100vh]">
            <div className="sticky top-40 flex flex-col gap-12 font-mono text-xs xl:text-sm uppercase tracking-widest text-white/40">
               <div>
                 <h4 className="text-white mb-6 border-b border-white/20 pb-4 font-black tracking-tighter text-lg md:text-xl">Categories</h4>
                 <ul className="flex flex-col gap-4">
                   <li className="text-white flex justify-between cursor-pointer group">
                      <span>All Objects</span> <span className="opacity-0 group-hover:opacity-100 transition-opacity">/ 01</span>
                   </li>
                   <li className="hover:text-white transition-colors flex justify-between cursor-pointer group">
                      <span>Digital Wear</span> <span className="opacity-0 group-hover:opacity-100 transition-opacity">/ 02</span>
                   </li>
                   <li className="hover:text-white transition-colors flex justify-between cursor-pointer group">
                      <span>Physical Archive</span> <span className="opacity-0 group-hover:opacity-100 transition-opacity">/ 03</span>
                   </li>
                   <li className="hover:text-white transition-colors flex justify-between cursor-pointer group">
                      <span>Concepts</span> <span className="opacity-0 group-hover:opacity-100 transition-opacity">/ 04</span>
                   </li>
                 </ul>
               </div>
               <div>
                 <h4 className="text-white mb-6 border-b border-white/20 pb-4 font-black tracking-tighter text-lg md:text-xl">Exhibitions</h4>
                 <ul className="flex flex-col gap-4">
                   <li className="text-white flex justify-between cursor-pointer group">
                      <span>2026 Collection</span> <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                   </li>
                   <li className="hover:text-white transition-colors flex justify-between cursor-pointer group">
                      <span>Paris Showcase</span> <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                   </li>
                 </ul>
               </div>
               
               <div className="mt-12 p-8 border border-white/10 rounded-sm bg-white/5 backdrop-blur-sm">
                  <h4 className="text-white font-serif italic normal-case text-xl mb-4">Availability</h4>
                  <p className="text-[10px] leading-relaxed">
                    Select objects are strictly limited. Due to the high-density rendering requirements, some digital files may require heavy computational power to properly view.
                  </p>
               </div>
            </div>
         </div>

         {/* Products Architecture View */}
         <div className="w-full md:w-3/4">
           <AnimatedProductGrid products={products} />
         </div>
      </div>

      {/* Abstract Background Ethers */}
      <div className="fixed top-1/4 right-[-10%] w-[50vw] h-[50vw] bg-white/5 rounded-[100%] blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[60vw] h-[40vw] bg-white/5 rounded-[100%] blur-[150px] pointer-events-none -z-10" />
    </div>
  );
}
