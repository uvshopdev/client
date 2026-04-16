import z from "zod";

import { Product } from "./products";

export const Order = z.object({
	id: z.number(),
	inserted_at: z.string().optional(),
	updated_at: z.string().optional(),
	recipient: z.string(),
	email: z.string(),
	phone_number: z.string(),

	message: z.string().nullable(),
	status: z.string(),

	payment_method: z.string(),
	delivery_method: z.string(),

	postal_code: z.string(),
	address: z.string(),

	positions: z.array(
		z.object({
			amount: z.number(),
			product: Product,
		}),
	),
});

export const Orders = z.array(Order);
