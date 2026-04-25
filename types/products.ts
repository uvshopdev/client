import { z } from "zod";

import { Category } from "./categories";
import { Country } from "./countries";

export const Review = z.object({
	message: z.string(),
	rating: z.number(),
	inserted_at: z.coerce.date(),
	user: z.object({
		id: z.number(),
		full_name: z.string(),
	}),
});

export type ReviewType = z.infer<typeof Review>;

export const Product = z.object({
	id: z.number(),
	article: z.string(),

	name: z.string(),
	picture: z.string().nullable(),

	price: z.coerce.number(),
	weight: z.coerce.number(),
	caloric: z.coerce.number(),

	description: z.string().nullable(),
	ingredients: z.string().nullable(),
	price_unit: z.string().nullable(),

	rating: z
		.number()
		.nullable()
		.transform((r) => r ?? 0),

	country: Country.nullable().optional(),
	category: Category.nullable().optional(),
	reviews: z
		.array(Review)
		.nullable()
		.optional()
		.transform((r) => r ?? []),
});

export const Products = z.array(Product);

export type ProductType = z.infer<typeof Product>;
