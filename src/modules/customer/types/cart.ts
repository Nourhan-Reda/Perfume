export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number; // ✅ Added without changing existing properties
};

export type AddToCartInput = {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number; // ✅ Added without changing existing properties
};

// ✅ UPDATED: Added Drawer state types to the Context contract
export type CartContextType = {
  cart: CartItem[];
  isDrawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  addToCart: (product: AddToCartInput) => void;
  removeFromCart: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearCart: () => void;
  totalPrice: number;
};
