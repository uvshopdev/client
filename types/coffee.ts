import z from "zod";

export const Coffee = z.object({
	id: z.number(),
	used: z.boolean(),
	source: z.string(),
});

export const Coffees = z.array(Coffee);
export const CoffeeInfo = z.object({
	unused: Coffees,
	to_next_bonus: z.number(),
});
