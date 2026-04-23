import { create } from "zustand";
import { devtools } from "zustand/middleware";

import type { CategoryType } from "@/types/categories";

interface CategoriesStore {
	categories: Record<number, CategoryType>;

	setCategories: (categories: CategoryType[]) => void;
}

export const useCategories = create<CategoriesStore>()(
	devtools(
		(set) => ({
			categories: {},

			setCategories: (categories) => set(() => ({ categories: Object.fromEntries(categories.map((c) => [c.id, c])) })),
		}),
		{ name: "CategoriesStore" },
	),
);
