"use client";

import clsx from "clsx";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLocale } from "next-intl";
import { useState } from "react";

import { type Locale, locales, localesDisplay } from "@/i18n";
import { Content, Menu, MenuButton } from "./LocaleSelector.css";

const LocaleSelector = () => {
	const locale = useLocale() as Locale;
	const [selected, setSelected] = useState<Locale>(locale);
	const [active, setActive] = useState<boolean>(false);

	const onChange = async (locale: Locale) => {
		setActive(false);
		setSelected(locale);
		// setLocaleCookie(locale);
	};

	return (
		<Content>
			<button type="button" onClick={() => setActive(!active)}>
				{localesDisplay[selected][0]}
				{active ? (
					<ChevronUp size={20} strokeWidth={1} absoluteStrokeWidth />
				) : (
					<ChevronDown size={20} strokeWidth={1} absoluteStrokeWidth />
				)}
			</button>
			<Menu className={clsx(active && "active")}>
				{locales.map((l) => (
					<li key={l}>
						<MenuButton onClick={() => onChange(l)}>{localesDisplay[l][1]}</MenuButton>
					</li>
				))}
			</Menu>
		</Content>
	);
};

export default LocaleSelector;
