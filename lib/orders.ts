import { Orders } from "@/types/orders";
import { authHost } from ".";

export interface CreateOrderPayload {
	recipient: string;
	address: string;
	phone_number: string;
	email: string;
	payment_method: string;
	delivery_method: string;
	postal_code?: string;
	message?: string;
	positions: Array<{
		amount: number;
		product_id: number;
	}>;
}

export const getOrders = async () => {
	const { data } = await authHost.get("/users/me/orders");
	return Orders.parse(data);
};

export const createOrder = async (payload: CreateOrderPayload) => {
	const { data } = await authHost.post("/users/me/orders", payload);
	return data;
};
