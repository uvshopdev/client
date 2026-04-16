import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Montserrat_Alternates } from "next/font/google";
import { Toaster } from "sonner";

import Catalog from "@/components/Catalog/Catalogs";
import Footer from "@/components/Footer/Footer";
import Providers from "@/components/Providers";
import ServerProviders from "@/components/ServerProviders";
import StyledComponentsRegistry from "@/components/StyledComponentsRegistry";
import TopBar from "@/components/TopBar/TopBar";
import { getCategories } from "@/lib/categories";
import { getCountries } from "@/lib/countries";
import { Main, Shell } from "./layout.css";
export const metadata: Metadata = {
	title: "Shop",
};

const montserrat = Montserrat_Alternates({
	weight: ["400", "500"],
	subsets: ["cyrillic", "latin"],
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const locale = await getLocale();

	const categories = await getCategories(locale);
	const countries = await getCountries(locale);

	return (
		<html lang={locale}>
			<Analytics />
			<head>
				<meta name="robots" content="noindex, nofollow" />
			</head>
			<body className={montserrat.className}>
				<ServerProviders>
					<StyledComponentsRegistry>
						<Providers categories={categories} countries={countries}>
							<Toaster />
							<Shell>
								<Main>
									<TopBar />
									<Catalog />
									{children}
								</Main>
								<Footer />
							</Shell>
						</Providers>
					</StyledComponentsRegistry>
				</ServerProviders>
			</body>
		</html>
	);
}
