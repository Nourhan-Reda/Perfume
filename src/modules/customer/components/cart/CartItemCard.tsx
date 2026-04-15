import { useCart } from "../../../../store/cart";
import type { CartItem } from "../../types/cart";

export default function CartItemCard({ item }: { item: CartItem }) {
  const { increaseQty, decreaseQty, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4 border-b border-[#e7dfe9] py-4">
      {/* Product Image */}
      <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg border border-[#e7dfe9]">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <h4 className="text-sm font-medium uppercase tracking-wider">
          {item.name}
        </h4>
        <p className="text-xs text-[#2f1d17]/60 mt-1">${item.price}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-3 border border-[#4b2a53]/20 px-2 py-1 rounded">
        <button
          onClick={() => decreaseQty(item.id)}
          className="text-lg hover:text-[#4b2a53] transition px-1"
        >
          -
        </button>
        <span className="text-sm font-medium w-4 text-center">
          {item.quantity}
        </span>
        <button
          onClick={() => increaseQty(item.id)}
          className="text-lg hover:text-[#4b2a53] transition px-1"
        >
          +
        </button>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeFromCart(item.id)}
        className="text-[#2f1d17]/40 hover:text-red-500 transition text-xs uppercase tracking-tighter"
      >
        Remove
      </button>
    </div>
  );
}
