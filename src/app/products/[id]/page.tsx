import { getProductById } from "@/lib/products";
import { notFound } from "next/navigation";
import { ProductClient } from "./product-client";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-black pt-32 pb-24 px-4 sm:px-6 lg:px-8 selection:bg-black selection:text-white">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] bg-gray-100 shadow-2xl">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="inline-block px-3 py-1 mb-6 border border-black/20 rounded-full text-xs font-bold uppercase tracking-widest w-fit">
            {product.category}
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-[0.85]">
            {product.name}
          </h1>
          <p className="text-3xl font-medium mb-8 text-black/80">₹{product.price.toLocaleString("en-IN")}</p>
          <div className="h-px bg-black/10 w-full mb-8" />
          <p className="text-xl leading-relaxed text-gray-700 mb-12 font-medium">
            {product.description}
          </p>
          
          <ProductClient product={product} />
          
          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-black/10 pt-8">
             <div>
                <h4 className="font-bold uppercase tracking-wider text-sm mb-2">Delivery</h4>
                <p className="text-gray-600">Free shipping on all premium global orders.</p>
             </div>
             <div>
                <h4 className="font-bold uppercase tracking-wider text-sm mb-2">Returns</h4>
                <p className="text-gray-600">30-day return policy for unused items.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
