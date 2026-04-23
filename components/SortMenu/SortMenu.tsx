"use client";

import { useExtracted } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Close, Content, ContentWrapper, Item, Items, Title } from "./SortMenu.css";

const SortMenu = ({ active, setActive }: { active: boolean; setActive: (active: boolean) => void }) => {
	const t = useExtracted("catalog");
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [sort, setSort] = useState("");

	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const onClickOutside = (e: MouseEvent) => {
			if (!ref.current || ref.current.contains(e.target as Node)) return;

			const target = e.target as Element | null;
			if (target?.closest("[data-sort-toggle='true']")) return;

			setActive(false);
		};

		document.addEventListener("click", onClickOutside);

		return () => {
			document.removeEventListener("click", onClickOutside);
		};
	}, [setActive]);

	const onChange = (newSort: string) => {
		const params = new URLSearchParams(searchParams.toString());
		if (newSort === sort) {
			setSort("");
			params.delete("sort");
		} else {
			setSort(newSort);
			params.set("sort", newSort);
		}

		router.push(`${pathname}?${params.toString()}`);
	};

	return (
		<Content $active={active}>
			<ContentWrapper $active={active} ref={ref}>
				<Title>
					<h2>{t("Sort products")}</h2>
					<Close onClick={() => setActive(false)}>✕</Close>
				</Title>

				<Items>
					<Item $active={sort === "price:asc"} onClick={() => onChange("price:asc")}>
						<span></span>
						{t("Cheapest first")}
					</Item>
					<Item $active={sort === "price:desc"} onClick={() => onChange("price:desc")}>
						<span></span>
						{t("Most expensive first")}
					</Item>
					<Item $active={sort === "alphabet:asc"} onClick={() => onChange("alphabet:asc")}>
						<span></span>
						{t("A to Z")}
					</Item>
					<Item $active={sort === "alphabet:desc"} onClick={() => onChange("alphabet:desc")}>
						<span></span>
						{t("Z to A")}
					</Item>
				</Items>
			</ContentWrapper>
		</Content>
	);
};

export default SortMenu;
