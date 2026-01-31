import * as z from "zod";

const Category = z.object({
	id: z.number(),
	name: z.string(),
	image_url: z.string().nullable(),
});

export const getCategories = async () => {
	const data = await fetch(`${process.env.BACKEND_URL}/categories`, { next: { revalidate: 3 * 60 * 60 } });
	const json = await data.json();
	return z.array(Category).parse(json);
};
