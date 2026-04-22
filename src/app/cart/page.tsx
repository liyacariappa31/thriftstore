"use client";

import { useCart } from "@/components/cart-context";
import Link from "next/link";
import { ArrowRight, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pt-24 px-4 text-black">
        <ShoppingBag size={64} className="mb-6 text-gray-300" />
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          Looks like you haven't added anything yet. Explore our premium collection to find something you love.
        </p>
        <Link href="/products">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-black text-white font-bold uppercase tracking-widest text-sm"
          >
            Explore Collection
          </motion.button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-24 px-4 sm:px-6 lg:px-8 text-black">
      <div className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <div className="mb-8 flex items-baseline justify-between border-b border-gray-200 pb-6">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Your Cart</h1>
            <span className="text-lg font-medium text-gray-500">{totalItems} items</span>
          </div>

          <div className="flex flex-col gap-6">
            {cart.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={item.id}
                className="flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
              >
                <div className="h-32 w-32 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold uppercase tracking-tight">{item.name}</h3>
                      <p className="text-sm text-gray-500 uppercase mt-1">{item.category}</p>
                    </div>
                    <p className="text-xl font-bold">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center border border-gray-200 rounded-full px-3 py-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:text-gray-500 transition-colors"
                      >
                        <Minus size={16} strokeWidth={3} />
                      </button>
                      <span className="w-10 text-center font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:text-gray-500 transition-colors"
                      >
                        <Plus size={16} strokeWidth={3} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2 text-sm font-bold uppercase"
                    >
                      <Trash2 size={16} /> Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-[400px]">
          <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] sticky top-32">
            <h2 className="text-2xl font-black uppercase tracking-tight mb-8">Order Summary</h2>
            
            <div className="flex flex-col gap-4 text-lg border-b border-gray-100 pb-6 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">₹{totalPrice.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Shipping</span>
                <span className="font-medium">Free</span>
              </div>
            </div>

            <div className="flex justify-between items-end mb-8">
              <span className="text-xl font-bold">Total</span>
              <span className="text-4xl font-black">₹{totalPrice.toLocaleString("en-IN")}</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-5 bg-black text-white font-bold uppercase tracking-widest flex items-center justify-center gap-3 rounded-xl"
            >
              Checkout <ArrowRight size={20} />
            </motion.button>
            <p className="text-center text-xs text-gray-400 mt-4 uppercase tracking-wider">
              Taxes calculated at checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
