import clsx from "clsx";
import { getLocale } from "next-intl/server";
import { Montserrat_Alternates } from "next/font/google";

import Providers from "@/components/Providers";
import { getCategories } from "@/lib/categories";
import { getCountries } from "@/lib/countries";

import "./global.css";

import ServerProviders from "@/components/ServerProviders";
import TopBar from "@/components/TopBar/TopBar";
import GlobalStyle from "./global.css";

const montserrat = Montserrat_Alternates({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
	subsets: ["cyrillic", "latin"],
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const locale = await getLocale();

	const categories = await getCategories();
	const countries = await getCountries();

	return (
		<html lang={locale}>
			<body className={clsx(montserrat.className)}>
				<ServerProviders>
					<Providers categories={categories} countries={countries}>
						<GlobalStyle />
						<TopBar />
						{children}
					</Providers>
				</ServerProviders>
			</body>
		</html>
	);
}
