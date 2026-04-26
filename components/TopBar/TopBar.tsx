"use client";

import { ChevronDown, ChevronUp, CircleUserRound, LayoutGrid, ShoppingBasket } from "lucide-react";
import { useExtracted, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { setLocaleCookie } from "@/app/actions";
import { type Locale, locales, localesDisplay } from "@/i18n";
import { useModals } from "@/store";
import { LocaleSelector } from "./LocaleSelector.css";
import { Bar, Content, Left, Logo, Right } from "./TopBar.css";

const TopBar = () => {
	const t = useExtracted("navigation");

	const locale = useLocale() as Locale;
	const [selected, setSelected] = useState<Locale>(locale);
	const [localeActive, setLocaleActive] = useState<boolean>(false);

	const ref = useRef<HTMLUListElement>(null);

	const onChange = async (locale: Locale) => {
		setLocaleActive(false);
		setSelected(locale);
		setLocaleCookie(locale);
	};

	const { catalog, setCatalog } = useModals();

	useEffect(() => {
		const onClickOutside = (e: MouseEvent) => {
          if (!ref.current || ref.current.contains(e.target as Node)) return;

          const target = e.target as Element | null;
          if (target?.closest("[data-locale-toggle='true']")) return;

          setLocaleActive(false);
      };

      document.addEventListener("click", onClickOutside);

      return () => document.removeEventListener("click", onClickOutside);
	}, []);

	const handleLogoClick = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<Content>
			<Bar>
				<Left>
					<Logo href="/" aria-label={t("Shop")} onClick={handleLogoClick}>
						<Image src="/logo.webp" width={40} height={40} alt="" priority />
					</Logo>
					<button type="button" data-catalog-toggle="true" onClick={() => setCatalog(!catalog)}>
						<LayoutGrid size={20} strokeWidth={1} absoluteStrokeWidth />
						<span>{t("Catalog")}</span>
					</button>
				</Left>
				<Right>
					<Link href="/basket" aria-label={t("Basket")} prefetch={false}>
						<ShoppingBasket size={25} strokeWidth={1} absoluteStrokeWidth />
					</Link>
					<Link href="/profile" className="desktop" aria-label={t("Profile")} prefetch={false}>
						<CircleUserRound size={25} strokeWidth={1} absoluteStrokeWidth />
					</Link>
					<button
						type="button"
						className="desktop"
						aria-label={t("Change locale")}
						data-locale-toggle="true"
						onClick={() => setLocaleActive(!localeActive)}
					>
						{localesDisplay[selected][0]}
						{localeActive ? (
							<ChevronUp size={20} strokeWidth={1} absoluteStrokeWidth />
						) : (
							<ChevronDown size={20} strokeWidth={1} absoluteStrokeWidth />
						)}
					</button>
					<LocaleSelector $active={localeActive} ref={ref} className="desktop">
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
