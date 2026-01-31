import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface Country {
	id: number;
	name: string;
	image_url: string | null;
}

interface CountriesState {
	countries: Country[];

	setCountries: (country: Country[]) => void;
}

export const useCountries = create<CountriesState>()(
	devtools((set) => ({
		countries: [],
		setCountries: (countries) => set(() => ({ countries })),
	})),
);
