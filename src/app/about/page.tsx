import { getProducts } from "@/lib/products";
import AboutClient from "./about-client";

export default async function AboutPage() {
  const products = await getProducts();
  const images = products.map((p) => p.image);

  return <AboutClient images={images} />;
}
