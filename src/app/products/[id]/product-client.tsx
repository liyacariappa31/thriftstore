"use client";

import { useCart } from "@/components/cart-context";
import { Product } from "@/lib/products";
import { useState } from "react";
import { motion } from "framer-motion";

export function ProductClient({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleAdd}
      className={`px-8 py-5 w-full md:w-auto text-lg font-bold uppercase tracking-widest transition-colors ${
        added ? "bg-green-500 text-white" : "bg-black text-white hover:bg-black/80"
      }`}
    >
      {added ? "Added to Cart" : "Add to Cart"}
    </motion.button>
  );
}
