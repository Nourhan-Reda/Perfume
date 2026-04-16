import { useCart } from "../../../store/cart";
import { useProducts } from "../hooks/useProducts";
import { toast } from "sonner";

export default function Checkout() {
    const { cart, clearCart, setDrawerOpen } = useCart();
    const { updateStock } = useProducts();

    // 💰 Total price
    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    // 🛒 Checkout handler
    const handleCheckout = async () => {
        if (cart.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        try {
            // Update stock for each product
            for (const item of cart) {
                await updateStock(item.id, item.quantity);
            }

            // Clear cart after success
            clearCart();

            // Close drawer if open
            setDrawerOpen(false);

            toast.success("Order placed successfully 🎉");
        } catch (error) {
            toast.error("Checkout failed, please try again");
        }
    };

    return (
        <section className="min-h-screen bg-[#faf7fb] px-6 py-16">
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

                {/* LEFT SIDE - CART ITEMS */}
                <div className="md:col-span-2 bg-white rounded-2xl shadow-sm p-6">
                    <h2 className="text-2xl font-semibold text-[#2f1d17] mb-6">
                        Checkout
                    </h2>

                    {cart.length === 0 ? (
                        <p className="text-center text-gray-400 py-10">
                            Your cart is empty
                        </p>
                    ) : (
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between border-b pb-4"
                                >
                                    {/* Product Info */}
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
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <p className="font-semibold text-[#4b2a53]">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* RIGHT SIDE - SUMMARY */}
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
                        disabled={cart.length === 0}
                        className={`w-full py-3 rounded-full font-semibold transition
              ${cart.length === 0
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-[#4b2a53] text-white hover:bg-[#3a2040]"
                            }`}
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </section>
    );
}