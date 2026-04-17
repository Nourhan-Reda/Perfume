import { useNavigate } from "react-router-dom";
import { useCart } from "../../../../store/cart";

export default function CartSummary() {
  const { totalPrice, clearCart } = useCart();
const navigate=useNavigate();
  return (
    <div className="bg-[#fcfaff] p-6 rounded-xl border border-[#e7dfe9] sticky top-24">
      <h3 className="text-lg uppercase tracking-[0.1em] mb-6">Order Summary</h3>

      <div className="space-y-4 border-b border-[#e7dfe9] pb-6">
        <div className="flex justify-between text-sm">
          <span className="text-[#2f1d17]/60">Subtotal</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#2f1d17]/60">Shipping</span>
          <span className="text-green-600 uppercase text-[10px] font-bold">
            Free
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center py-6">
        <span className="font-bold uppercase tracking-widest text-sm">
          Total
        </span>
        <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
      </div>

      <button onClick={()=>navigate("/checkout")} className="w-full bg-[#4b2a53] text-white py-4 rounded-lg uppercase tracking-[0.2em] text-xs hover:bg-[#361e3d] transition shadow-lg">
        Proceed to Checkout
      </button>

      <button
        onClick={clearCart}
        className="w-full mt-4 text-[10px] uppercase tracking-widest text-[#2f1d17]/40 hover:text-red-500 transition"
      >
        Clear entire cart
      </button>
    </div>
  );
}
