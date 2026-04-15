import type { ReactNode } from "react";
// 1. Import the Context object from the new separated file
import { CartContext } from "./CartContext"; 
import { useCartLogic } from "../modules/customer/hooks/useCartLogic";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const value = useCartLogic();

  // 2. This line now works because CartContext is imported above
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};