import z from "zod";

export const MilesEntry = z.object({
	amount: z.number().nonnegative(),
	spent: z.number().nonnegative(),
	source: z.string(),
	expired_at: z.string(),
	inserted_at: z.string(),
});

export const Miles = z.array(MilesEntry);

export type MilesType = z.infer<typeof Miles>;
export type MileType = z.infer<typeof MilesEntry>;
