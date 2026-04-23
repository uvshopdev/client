"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useModals } from "@/store";
import type { CategoryType } from "@/types/categories";
import { Categories, Category, Content, ContentWrapper, SubCategories, SubCategory } from "./Catalog.css";

const Catalog = ({ categories }: { categories: CategoryType[] }) => {
	const [activePath, setActivePath] = useState("1");
	const pathname = usePathname();
	const catalogRef = useRef<HTMLDivElement>(null);

	const { catalog, setCatalog } = useModals();

	useEffect(() => {
		if (!pathname) return;
		setCatalog(false);
	}, [pathname, setCatalog]);

	useEffect(() => {
		if (!catalog) return;

		const onClickOutside = (e: MouseEvent) => {
			if (!catalogRef.current || catalogRef.current.contains(e.target as Node)) return;

			const target = e.target as Element | null;
			if (target?.closest("[data-catalog-toggle='true']")) return;

			setCatalog(false);
		};

		document.addEventListener("click", onClickOutside);

		return () => {
			document.removeEventListener("click", onClickOutside);
		};
	}, [catalog, setCatalog]);

	return (
		<Content $active={catalog} ref={catalogRef}>
			<ContentWrapper>
				<Categories>
					{categories
						.filter((c) => !c.path.includes("."))
						.map((category) => (
							<Category key={category.id} $active={category.path === activePath}>
								<button type="button" onClick={() => setActivePath(category.path)}>
									{category.name}
								</button>
							</Category>
						))}
				</Categories>
				<SubCategories>
					{categories
						.filter((c) => c.path.startsWith(`${activePath}.`))
						.map((category) => (
							<SubCategory
								key={category.id}
								prefetch
								href={`/${category.id}`}
								$active={pathname.slice(1) === String(category.id)}
							>
								<Image src="/map.webp" width={80} height={80} unoptimized alt="" />
								{category.name}
							</SubCategory>
						))}
				</SubCategories>
			</ContentWrapper>
		</Content>
	);
};

export default Catalog;
