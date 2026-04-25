import z from "zod";

import { Product } from "./products";

export const Order = z.object({
	id: z.number(),
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

	inserted_at: z.coerce.date(),
	updated_at: z.coerce.date(),
});

export const Orders = z.array(Order);
