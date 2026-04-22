type CheckoutData = {
    name: string;
    email: string;
    phone: string;
    address: string;
};

type CheckoutFormProps = {
    formData: CheckoutData;
    setFormData: React.Dispatch<React.SetStateAction<CheckoutData>>;
};

export default function CheckoutForm({
    formData,
    setFormData,
}: CheckoutFormProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h3 className="text-xl font-semibold text-[#2f1d17] mb-6">
                Customer Information
            </h3>

            <div className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#4b2a53]"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#4b2a53]"
                />

                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#4b2a53]"
                />

                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#4b2a53]"
                />
            </div>
        </div>
    );
}