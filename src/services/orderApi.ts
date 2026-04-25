import { api } from "./api";

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderPayload {
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  items: OrderItem[];
  totalPrice: number;
}

export const createOrder = async (orderData: OrderPayload) => {
  const response = await api.post("", {
    type: "order",
    ...orderData,
    status: "pending",
    createdAt: new Date().toISOString(),
  });

  return response.data;
};