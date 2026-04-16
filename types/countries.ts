import z from "zod";

export const Country = z.object({
	id: z.number(),
	name: z.string(),
	picture: z.string(),
});

export const Countries = z.array(Country);
export const CountriesData = z.object({
	countries: Countries,
	style: z.any(),
});
