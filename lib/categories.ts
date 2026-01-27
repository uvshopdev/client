import type { Category } from "@/store";
import host from "./api";

export const getCategories = async (): Promise<Category[]> => {
	const { data } = await host.get<Category[]>("/categories");
	return data;
};
