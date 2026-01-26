import TopBar from "@/components/TopBar/TopBar";
import { Montserrat_Alternates } from "next/font/google";
import "./global.css";

const montserrat = Montserrat_Alternates({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
	subsets: ["cyrillic", "latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={montserrat.className}>
				<TopBar />
				{children}
			</body>
		</html>
	);
}
