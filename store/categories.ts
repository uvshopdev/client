import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface Category {
	id: number;
	name: string;
	image_url: string;
}

interface CategoriesState {
	categories: Category[];

	setCategories: (categories: Category[]) => void;
}

export const useCategories = create<CategoriesState>()(
	devtools((set) => ({
		categories: [],
		setCategories: (categories) => set(() => ({ categories })),
	})),
);
