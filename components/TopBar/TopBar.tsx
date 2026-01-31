import { CircleUserRound, LayoutGrid, ShoppingBasket } from "lucide-react";
import { getExtracted } from "next-intl/server";
import Image from "next/image";

import LocaleSelector from "../LocaleSelector/LocaleSelector";
import { Catalog, Content, Logo, Navigation, Profile, Search } from "./TopBar.css";

const TopBar = async () => {
	const t = await getExtracted("navigation");

	return (
		<Content>
			<Navigation>
				<Logo>
					<Image fill src="/logo.png" sizes="60px 60px, 40px 40px" alt="logo" loading="eager" />
				</Logo>
				<Catalog>
					<LayoutGrid size={20} strokeWidth={1} absoluteStrokeWidth />
					{t("Catalog")}
				</Catalog>
			</Navigation>
			<Search>
				<input type="text" placeholder={t("Find your treasure...")} />
				<button type="button">{t("Search")}</button>
			</Search>
			<Profile>
				<button type="button">
					<ShoppingBasket size={25} strokeWidth={1} absoluteStrokeWidth />
				</button>
				<button type="button">
					<CircleUserRound size={25} strokeWidth={1} absoluteStrokeWidth />
				</button>
				<LocaleSelector />
			</Profile>
		</Content>
	);
};

export default TopBar;
