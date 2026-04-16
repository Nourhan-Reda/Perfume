import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import type { Product } from "../types/Product";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<Product[]>("/Perfume")
      .then((res) => {
        setProducts(res.data);
      })
      .catch(() => {
        setError("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

const updateStock = async (productId: string, quantity: number) => {
  const product = products.find((p) => p.id === productId);

  if (!product) {
    setError("Product not found");
    return;
  }

  // ❗ حماية من negative stock
  const newStock = product.stock - quantity;

  const updatedProduct = {
    ...product,
    stock: newStock < 0 ? 0 : newStock,
  };

  try {
    await api.put(`/Perfume/${productId}`, updatedProduct);

    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? updatedProduct : p))
    );
  } catch {
    setError("Failed to update stock");
  }
};

  return { products, loading, error, updateStock };
}