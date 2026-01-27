"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";

import { type Category, type Country, useCategories, useCountries } from "@/store";

const queryClient = new QueryClient();

const Providers = ({
	children,
	categories,
	countries,
}: Readonly<{ children: React.ReactNode; categories: Category[]; countries: Country[] }>) => {
	const setCategories = useCategories((s) => s.setCategories);
	const setCountries = useCountries((s) => s.setCountries);

	useEffect(() => {
		if (categories) setCategories(categories);
		if (countries) setCountries(countries);
	}, [categories, countries, setCategories, setCountries]);

	return (
		<QueryClientProvider client={queryClient}>
			{children}

			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default Providers;
