import { Montserrat_Alternates } from "next/font/google";

import TopBar from "@/components/TopBar/TopBar";
import "./global.css";

import Providers from "@/components/Providers";
import { getCategories } from "@/lib/categories";
import { getCountries } from "@/lib/countries";

const montserrat = Montserrat_Alternates({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
	subsets: ["cyrillic", "latin"],
});

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const categories = await getCategories();
	const countries = await getCountries();
	return (
		<html lang="en">
			<body className={montserrat.className}>
				<Providers categories={categories} countries={countries}>
					<TopBar />
					{children}
				</Providers>
			</body>
		</html>
	);
}
