"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowDownWideNarrow, Settings2 } from "lucide-react";
import { useExtracted } from "next-intl";
import { useState } from "react";

import { getFavorites } from "@/lib/favorites";
import type { CategoryType } from "@/types/categories";
import type { CountryType } from "@/types/countries";
import type { ProductType } from "@/types/products";
import FilterMenu from "../FilterMenu/FitlerMenu";
import ProductCard from "../ProductCard/ProductCard";
import SortMenu from "../SortMenu/SortMenu";
import { CatalogActions, CatalogHeader, CatalogTitle, Content, FilterButton, Items } from "./Products.css";

const Products = (params: { products: ProductType[]; category?: CategoryType; countries: CountryType[] }) => {
	const t = useExtracted("catalog");
	const [sortActive, setSortActive] = useState(false);
	const [filterActive, setFilterActive] = useState(false);

	const { data: favorites = [] } = useQuery({
		queryKey: ["profile", "favorites", "set"],
		queryFn: async () => {
			const data = await getFavorites();
			return data.map(({ product }) => product.id);
		},
		placeholderData: [],
		staleTime: 3 * 60 * 1000,
	});

	return (
		<>
			<Content>
				<CatalogHeader>
					<CatalogTitle>{params.category?.name || t("Category not found")}</CatalogTitle>
					<CatalogActions>
						<FilterButton type="button" onClick={() => setFilterActive(!filterActive)} data-filter-toggle>
							<Settings2 size={16} strokeWidth={2} />
							{t("Filter")}
						</FilterButton>
						<FilterButton type="button" onClick={() => setSortActive(!sortActive)} data-sort-toggle>
							<ArrowDownWideNarrow size={16} strokeWidth={2} />
							{t("Sorting")}
						</FilterButton>
					</CatalogActions>
				</CatalogHeader>

				<Items>
					{params.products.map((p) => (
						<ProductCard key={p.id} {...p} favorite={favorites.includes(p.id)} categoryId={0} />
					))}
				</Items>
			</Content>
			<SortMenu active={sortActive} setActive={setSortActive} />
			<FilterMenu active={filterActive} setActive={setFilterActive} countries={params.countries} />
		</>
	);
};

export default Products;
