import { create } from "zustand";
import { devtools } from "zustand/middleware";

import type { CountryType } from "@/types/countries";

interface CountriesStore {
	countries: CountryType[];

	setCountries: (country: CountryType[]) => void;
}

export const useCountries = create<CountriesStore>()(
	devtools(
		(set) => ({
			countries: [],
			setCountries: (countries) => set(() => ({ countries })),
		}),
		{ name: "CountriesStore" },
	),
);
