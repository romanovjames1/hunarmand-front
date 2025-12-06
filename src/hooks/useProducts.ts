import { useState, useEffect } from "react";
import axios from "axios";

export interface Product {
  _id: string;
  title: string;
  price: number;
  thumbnail: string;
  images: string[];
  category: {
    _id: string;
    title: string;
    language: string;
  };
  stockQuantity: number;
  language: string;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/product");
        setProducts(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return { products, loading };
};
