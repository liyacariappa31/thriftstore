import { promises as fs } from "fs";
import path from "path";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

const CATEGORIES = ["Apparel", "Electronics", "Accessories", "Home", "Art"];

export async function getProducts(): Promise<Product[]> {
  const imagesDir = path.join(process.cwd(), "images");
  let files: string[] = [];

  try {
    const allFiles = await fs.readdir(imagesDir);
    files = allFiles.filter((file) => /\.(jpe?g|png|webp|avif|gif)$/i.test(file));
  } catch (error) {
    console.error("Failed to read images directory", error);
    return [];
  }

  return files.map((file, index) => {
    // Generate deterministic mock data based on index
    return {
      id: `prod-${index + 1}`,
      name: `Premium Product ${index + 1}`,
      price: 19999 + (index * 4500),
      image: `/api/intro-image?name=${encodeURIComponent(file)}`,
      description: `Experience the highest quality craftsmanship with Premium Product ${index + 1}. Carefully curated and designed for modern lifestyles.`,
      category: CATEGORIES[index % CATEGORIES.length],
    };
  });
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.id === id) || null;
}
