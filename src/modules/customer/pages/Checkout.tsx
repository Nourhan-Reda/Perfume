import { useState } from "react";
import { useCart } from "../../../store/cart";
import { useProducts } from "../hooks/useProducts";
import { toast } from "sonner";
import CheckoutForm from "../components/checkout/CheckoutForm";
import { createOrder } from "../../../services/orderApi";

export default function Checkout() {
  const { cart, clearCart, setDrawerOpen } = useCart();
  const { updateStock } = useProducts();

  const user = JSON.parse(sessionStorage.getItem("vyra_user") || "{}");

  const [formData, setFormData] = useState({
    name: user.fullName || "",
    email: user.email || "",
    phone: user.phone || "",
    address: "",
  });

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const hasOutOfStockItems = cart.some(
    (item) => (item.stock ?? 0) < item.quantity
  );

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (hasOutOfStockItems) {
      toast.error("Some items are out of stock");
      return;
    }

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address
    ) {
      toast.error("Please fill in all customer information");
      return;
    }

    try {
      // 1) Create Order
      await createOrder({
        userId: user.id,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: formData.address,
        items: cart.map((item) => ({
          productId: item.id,
          title: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        totalPrice,
      });

      // 2) Update Stock
      for (const item of cart) {
        await updateStock(item.id, item.quantity);
      }

      // 3) Clear Cart
      clearCart();
      setDrawerOpen(false);

      toast.success("Order placed successfully 🎉");
    } catch {
      toast.error("Checkout failed, please try again");
    }
  };

  return (
    <section className="min-h-screen bg-[#faf7fb] px-6 py-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

        {/* LEFT SIDE */}
        <div className="md:col-span-2">

          <CheckoutForm
            formData={formData}
            setFormData={setFormData}
          />

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-[#2f1d17] mb-6">
              Checkout
            </h2>

            {cart.length === 0 ? (
              <p className="text-center text-gray-400 py-10">
                Your cart is empty
              </p>
            ) : (
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {cart.map((item) => {
                  const isUnavailable = (item.stock ?? 0) < item.quantity;

                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between border-b pb-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg bg-[#f9f5fb]"
                        />

                        <div>
                          <h3 className="font-medium text-[#2f1d17]">
                            {item.name}
                          </h3>

                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>

                          {isUnavailable && (
                            <p className="text-sm text-red-500 font-medium">
                              Out of stock
                            </p>
                          )}
                        </div>
                      </div>

                      <p className="font-semibold text-[#4b2a53]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white rounded-2xl shadow-sm p-6 h-fit">
          <h3 className="text-xl font-semibold text-[#2f1d17] mb-6">
            Order Summary
          </h3>

          <div className="flex justify-between mb-6 text-[#2f1d17]/70">
            <span>Total</span>
            <span className="font-bold text-[#4b2a53]">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={cart.length === 0 || hasOutOfStockItems}
            className={`w-full py-3 rounded-full font-semibold transition
              ${
                cart.length === 0 || hasOutOfStockItems
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#4b2a53] text-white hover:bg-[#3a2040]"
              }`}
          >
            {hasOutOfStockItems ? "Some Items Are Out of Stock" : "Place Order"}
          </button>
        </div>
      </div>
    </section>
  );
}