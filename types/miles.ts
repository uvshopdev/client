import z from "zod";

export const MilesEntry = z.object({
	amount: z.number().nonnegative(),
	inserted_at: z.string(),
	spent: z.number().nonnegative(),
	expired_at: z.string(),
});

export const Miles = z.array(MilesEntry);

export type MilesType = z.infer<typeof Miles>;
export type MilesEntryType = z.infer<typeof MilesEntry>;
