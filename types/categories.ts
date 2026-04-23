import z from "zod";

export const Category = z.object({
	id: z.number(),
	name: z.string(),
	picture: z.string().nullable(),
	path: z.string(),
});

export type CategoryType = z.infer<typeof Category>;

export const Categories = z.array(Category);
