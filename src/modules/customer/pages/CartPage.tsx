import { useCartLogic } from "../hooks/useCartLogic";
import CartItemCard from "../components/cart/CartItemCard";
import CartSummary from "../components/cart/CartSummary";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cart } = useCartLogic();

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-3xl uppercase tracking-[0.3em] text-center mb-16">
          Your Bag
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#2f1d17]/50 mb-8 uppercase tracking-widest">
              Your cart is currently empty.
            </p>
            <Link
              to="/"
              className="border border-[#4b2a53] px-8 py-3 uppercase text-xs tracking-widest hover:bg-[#4b2a53] hover:text-white transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-16">
            {/* List of Items */}
            <div className="lg:col-span-2 space-y-2">
              <div className="hidden md:flex uppercase text-[10px] tracking-widest text-[#2f1d17]/40 border-b pb-4 mb-4">
                <span className="flex-1">Product</span>
                <span className="w-32 text-center">Quantity</span>
                <span className="w-20 text-right">Remove</span>
              </div>
              {cart.map((item) => (
                <CartItemCard key={item.id} item={item} />
              ))}
            </div>

            {/* Right Side Summary */}
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
