"use client";

import { ChevronDown, ChevronUp, CircleUserRound, LayoutGrid, ShoppingBasket } from "lucide-react";
import { useExtracted, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { setLocaleCookie } from "@/app/actions";
import { type Locale, locales, localesDisplay } from "@/i18n";
import { useModals } from "@/store";
import { LocaleSelector } from "./LocaleSelector.css";
import { Bar, Center, Content, Left, Logo, Right } from "./TopBar.css";

const TopBar = () => {
	const t = useExtracted("navigation");

	const locale = useLocale() as Locale;
	const [selected, setSelected] = useState<Locale>(locale);
	const [localeActive, setLocaleActive] = useState<boolean>(false);

	const onChange = async (locale: Locale) => {
		setLocaleActive(false);
		setSelected(locale);
		setLocaleCookie(locale);
	};

	const { catalog, setCatalog } = useModals();

	return (
		<Content>
			<Bar>
				<Left>
					<Logo href="/" aria-label={t("Shop")}>
						<Image src="/logo.png" width={40} height={40} alt="" priority />
					</Logo>
					<button type="button" onClick={() => setCatalog(!catalog)}>
						<LayoutGrid size={20} strokeWidth={1} absoluteStrokeWidth />
						{t("Catalog")}
					</button>
				</Left>
				<Center>
					<input type="text" placeholder={t("Find your treasure...")} />
					<button type="button">{t("Search")}</button>
				</Center>
				<Right>
					<Link href="/basket" aria-label={t("Basket")}>
						<ShoppingBasket size={25} strokeWidth={1} absoluteStrokeWidth />
					</Link>
					<Link href="/profile" aria-label={t("Profile")}>
						<CircleUserRound size={25} strokeWidth={1} absoluteStrokeWidth />
					</Link>
					<button
						type="button"
						aria-label={t("Change locale")}
						onClick={() => setLocaleActive(!localeActive)}
					>
						{localesDisplay[selected][0]}
						{localeActive ? (
							<ChevronUp size={20} strokeWidth={1} absoluteStrokeWidth />
						) : (
							<ChevronDown size={20} strokeWidth={1} absoluteStrokeWidth />
						)}
					</button>
					<LocaleSelector $active={localeActive}>
						{locales.map((l) => (
							<li key={l}>
								<button type="button" onClick={() => onChange(l)}>
									{localesDisplay[l][1]}
								</button>
							</li>
						))}
					</LocaleSelector>
				</Right>
			</Bar>
		</Content>
	);
};

export default TopBar;
