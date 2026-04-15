import { z } from "zod";

import { Category } from "./categories";
import { Country } from "./countries";

export const Product = z.object({
	id: z.number(),
	article: z.string(),

	name: z.string(),
	picture: z.string().nullable(),

	price: z.coerce.number(),
	weight: z.coerce.number(),
	caloric: z.coerce.number(),

	country: Country.nullable(),
	category: Category.nullable(),
});

export const Products = z.array(Product);

export type ProductType = z.infer<typeof Product>;
