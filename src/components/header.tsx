"use client";

import Link from "next/link";
import { useCart } from "./cart-context";
import { ShoppingCart, ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Header() {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] w-full border-b border-white/10 bg-black/40 backdrop-blur-xl supports-[backdrop-filter]:bg-black/20 text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black transition-transform group-hover:scale-105">
            <ShoppingBag size={20} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase transition-opacity group-hover:opacity-80">
            CAPPEN
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide uppercase">
          <Link href="/products" className="hover:text-white/70 transition-colors">
            Our Collection
          </Link>
          <Link href="/about" className="hover:text-white/70 transition-colors">
            Studio
          </Link>
          <Link href="/cart" className="relative flex items-center gap-2 hover:text-white/70 transition-colors group">
            <ShoppingCart size={18} />
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-bold text-black border border-black group-hover:bg-gray-200">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden border-b border-white/10 bg-black/90 backdrop-blur-xl"
          >
            <nav className="flex flex-col items-center justify-center space-y-6 py-12 text-lg font-bold uppercase tracking-widest">
              <Link href="/products" onClick={() => setIsMenuOpen(false)}>
                Our Collection
              </Link>
              <Link href="/about" onClick={() => setIsMenuOpen(false)}>
                Studio
              </Link>
              <Link href="/cart" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
                Cart ({totalItems})
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
