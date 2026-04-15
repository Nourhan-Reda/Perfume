import { createContext } from "react";
import type { CartContextType } from "../modules/customer/types/cart";

// This file only exports the Context object, keeping Fast Refresh happy
export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);
