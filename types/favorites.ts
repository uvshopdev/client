import z from "zod";

import { Product } from "./products";

export const Favorite = z.object({
	product: Product,
	inserted_at: z.coerce.date(),
});

export const Favorites = z.array(Favorite);
export type FavoritesType = z.infer<typeof Favorites>;
