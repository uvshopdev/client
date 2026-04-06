"use client";

import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";

import { type Category, type Country, useCategories, useCountries } from "@/store";
import GlobalStyle from "./GlobalStyle";
import theme from "./theme";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
			retry: false,
		},
	},
});
declare global {
	interface Window {
		__TANSTACK_QUERY_CLIENT__: import("@tanstack/react-query").QueryClient;
	}
}

export default function Providers({
	children,
	categories,
	countries,
}: {
	children: React.ReactNode;
	categories: Category[];
	countries: Country[];
}) {
	const setCategories = useCategories((s) => s.setCategories);
	const setCountries = useCountries((s) => s.setCountries);

	useEffect(() => {
		window.__TANSTACK_QUERY_CLIENT__ = queryClient;
	}, []);

	useEffect(() => {
		if (categories) setCategories(categories);
		if (countries) setCountries(countries);
	}, [categories, countries, setCategories, setCountries]);

	const [localStoragePersister] = useState(() =>
		createAsyncStoragePersister({
			storage: typeof window !== "undefined" ? window.localStorage : undefined,
		}),
	);

	return (
		<PersistQueryClientProvider client={queryClient} persistOptions={{ persister: localStoragePersister }}>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				{children}
			</ThemeProvider>
			<ReactQueryDevtools />
		</PersistQueryClientProvider>
	);
}
