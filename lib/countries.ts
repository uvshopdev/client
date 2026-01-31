import * as z from "zod";

const Country = z.object({
	id: z.number(),
	name: z.string(),
	image_url: z.string().nullable(),
});

export const getCountries = async () => {
	const data = await fetch(`${process.env.BACKEND_URL}/countries`, { next: { revalidate: 3 * 60 * 60 } });
	const json = await data.json();
	return z.array(Country).parse(json);
};
