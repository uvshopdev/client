"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useServerInsertedHTML } from "next/navigation";
import { useEffect, useState } from "react";
import { type DefaultTheme, ServerStyleSheet, StyleSheetManager, ThemeProvider } from "styled-components";

import { type Category, type Country, useCategories, useCountries } from "@/store";

const queryClient = new QueryClient();
const defaultTheme: DefaultTheme = {
	colors: {
		primary: "#3b3028",
		secondary: "#d3d3d3",
	},
};

const Providers = ({
	children,
	categories,
	countries,
}: Readonly<{ children: React.ReactNode; categories: Category[]; countries: Country[] }>) => {
	const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());
	useServerInsertedHTML(() => {
		const styles = styledComponentsStyleSheet.getStyleElement();
		styledComponentsStyleSheet.instance.clearTag();
		return <>{styles}</>;
	});

	const setCategories = useCategories((s) => s.setCategories);
	const setCountries = useCountries((s) => s.setCountries);

	useEffect(() => {
		if (categories) setCategories(categories);
		if (countries) setCountries(countries);
	}, [categories, countries, setCategories, setCountries]);

	return (
		<QueryClientProvider client={queryClient}>
			<StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
				<ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
			</StyleSheetManager>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default Providers;
