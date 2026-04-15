import { useEffect, useState, useCallback, useMemo } from "react";
import { toast } from "sonner"; // ✅ Import the luxury toaster
import type { CartItem, AddToCartInput } from "../types/cart";

export function useCartLogic() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("vyra_cart");
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error("Cart Initialization Error:", err);
      return [];
    }
  });

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("vyra_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback(
    (product: AddToCartInput & { stock: number }) => {
      let limitReached = false;

      setCart((prev) => {
        const safePrev = Array.isArray(prev) ? prev : [];
        const exists = safePrev.find((item) => item.id === product.id);
        const availableStock = Number(product.stock);

        if (exists) {
          if (exists.quantity >= availableStock) {
            limitReached = true; // Mark limit for the toast
            return safePrev;
          }
          return safePrev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        }

        return [
          ...safePrev,
          { ...product, quantity: 1, stock: availableStock },
        ];
      });

      // ✅ LUXURY TOAST LOGIC
      if (limitReached) {
        toast("Boutique Limit Reached", {
          description: `Apologies, only ${product.stock} units are available for this exclusive piece.`,
          style: {
            borderLeft: "4px solid #4b2a53", // Your plum brand color
          },
        });
      } else {
        toast.success("Added to Bag", {
          description: `${product.name} has been reserved.`,
          style: {
            background: "#4b2a53",
            color: "#ffffff",
            border: "none",
          },
        });
        setDrawerOpen(true);
      }
    },
    [],
  );

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const increaseQty = useCallback((id: string) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const limit = Number(item.stock);
          if (item.quantity >= limit) {
            // ✅ Silent luxury warning for the plus button
            toast("Maximum Availability", {
              description:
                "You have selected the final items from our current stock.",
            });
            return item;
          }
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      }),
    );
  }, []);

  const decreaseQty = useCallback((id: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const totalPrice = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart],
  );

  return {
    cart,
    isDrawerOpen,
    setDrawerOpen,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    totalPrice,
  };
}
