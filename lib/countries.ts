import type { Country } from "@/store";
import host from "./api";

export const getCountries = async (): Promise<Country[]> => {
	const { data } = await host.get<Country[]>("/countries");
	return data;
};
