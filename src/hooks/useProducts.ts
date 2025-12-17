import { useState, useEffect } from "react";
import axios from "axios";

// 1. Define the Translation structure
export interface Translation {
  language: string;
  title: string;
  description: string;
}

// 2. Update Product to match your Network Tab
export interface Product {
  _id: string;
  translations: Translation[]; // Data is here now!
  price: number;
  thumbnail: string;
  images: string[];
  category: {
    _id: string;
    title_uz: string; // Changed from title
    title_ru: string;
    title_en: string;
  };
  stockQuantity: number;
  popularity?: number;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://hunarmand.qaxramonov.uz/product");
        // Ensure you grab the nested data array
        setProducts(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading };
};
