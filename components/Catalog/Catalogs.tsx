"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { useCategories, useModals } from "@/store";
import { Categories, Category, Content, ContentWrapper, SubCategories, SubCategory } from "./Catalog.css";

const Catalog = () => {
	const pathname = usePathname();
	const catalogRef = useRef<HTMLDivElement>(null);

	const { categories, categoriesSet, active, setActive, activeSubCategories } = useCategories();
	const { catalog, setCatalog } = useModals();

	useEffect(() => {
		if (!pathname) return;
		setCatalog(false);
	}, [pathname, setCatalog]);

	useEffect(() => {
		const activeCategoryId = Number(pathname.split("/").at(-1));
		const activeCategory = activeCategoryId ? categoriesSet[activeCategoryId] : null;
		if (activeCategory) setActive(activeCategory.category_id ?? activeCategory.id);
	}, [pathname, categoriesSet, setActive]);

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
						.filter((c) => !c.category_id)
						.map((category) => (
							<Category key={category.id} $active={active === category.id}>
								<button type="button" onClick={() => setActive(category.id)}>
									{category.name}
								</button>
							</Category>
						))}
				</Categories>
				<SubCategories>
					{activeSubCategories.map((category) => (
						<SubCategory
							key={category.id}
							prefetch
							href={`/${category.id}`}
							$active={pathname === `/${category.id}`}
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
