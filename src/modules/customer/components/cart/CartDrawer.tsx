import { useNavigate } from "react-router-dom";
import { useCart } from "../../../../store/cart";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";

export default function CartDrawer() {
  const {
    cart,
    isDrawerOpen,
    setDrawerOpen,
    increaseQty,
    decreaseQty,
    totalPrice,
  } = useCart();
const navigate=useNavigate();
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity duration-500 ${isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl transition-transform duration-500 ease-in-out ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-sm uppercase tracking-[0.3em] font-light">
              Shopping Bag ({cart.length})
            </h2>
            <button
              onClick={() => setDrawerOpen(false)}
              className="p-2 hover:rotate-90 transition-transform duration-300"
            >
              <X size={20} strokeWidth={1} />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <ShoppingBag
                  size={40}
                  strokeWidth={1}
                  className="mb-4 opacity-20"
                />
                <p className="text-[10px] uppercase tracking-widest">
                  Your bag is empty
                </p>
              </div>
            ) : (
              cart.map((item) => {
                const isAtLimit = item.quantity >= item.stock; // ✅ Logic check for UI

                return (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-24 bg-gray-50 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-[11px] uppercase tracking-widest leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          ${item.price}
                        </p>
                      </div>

                      <div className="mt-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-gray-100 px-2 py-1 gap-4">
                            <button
                              onClick={() => decreaseQty(item.id)}
                              className="hover:text-[#4b2a53] transition-colors"
                            >
                              <Minus size={12} />
                            </button>

                            <span className="text-xs w-4 text-center">
                              {item.quantity}
                            </span>

                            {/* ✅ FIXED PLUS BUTTON */}
                            <button
                              onClick={() => increaseQty(item.id)}
                              disabled={isAtLimit} // 🛑 Disable when limit reached
                              className={`transition-colors ${
                                isAtLimit
                                  ? "text-gray-200 cursor-not-allowed"
                                  : "hover:text-[#4b2a53]"
                              }`}
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>

                        {/* ✅ Optional: Limit Warning */}
                        {isAtLimit && (
                          <p className="text-[9px] text-red-400 uppercase tracking-tighter mt-1">
                            Limit reached ({item.stock} in stock)
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-gray-50/50">
              <div className="flex justify-between mb-4">
                <span className="text-[10px] uppercase tracking-widest text-gray-500">
                  Subtotal
                </span>
                <span className="text-sm tracking-widest">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <button onClick={()=>navigate("/checkout")}     className="w-full bg-[#4b2a53] text-white py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-[#3a2141] transition-colors duration-300">
                Checkout
              </button>
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-full mt-4 text-[9px] uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
