import z from "zod";

export const User = z.object({
	id: z.number(),
	full_name: z.string(),
	picture: z.string().nullable(),
	email: z.string().nullable().optional(),
	phone_number: z.string().nullable().optional(),
});
