import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { CartProvider } from "@/components/cart-context";
import { Header } from "@/components/header";
import LenisProvider from "@/components/lenis-provider";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "CAPPEN - Digital & Physical Objects",
  description: "Award-winning studio crafting physical and digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen font-sans antialiased", geist.variable)}>
        <LenisProvider>
          <CartProvider>
            <Header />
            {children}
          </CartProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
