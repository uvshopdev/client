"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowDownWideNarrow, Settings2 } from "lucide-react";
import { use, useEffect, useState } from "react";

import ProductCard from "@/components/ProductCard/ProductCard";
import { getFavorites } from "@/lib/favorites";
import { getProducts } from "@/lib/products";
import { useCategories } from "@/store";
import { CatalogActions, CatalogHeader, CatalogTitle, Content, FilterButton, Products } from "./page.css";

const page = ({ params }: { params: Promise<{ category_id: number }> }) => {
	const { category_id } = use(params);
	const { categoriesSet } = useCategories();

	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);

	const { data: favorites, isSuccess: isSuccessFavorites } = useQuery({
		queryKey: ["favorites_ids"],
		queryFn: async () => {
			const data = await getFavorites();
			return data.map(({ product }) => product.id);
		},
		placeholderData: [],
		staleTime: 3 * 60 * 1000,
	});

	const { data: products, isSuccess: isSuccessProducts } = useQuery({
		queryKey: ["products", category_id],
		queryFn: async () => await getProducts(0, category_id),
	});

	return (
		<Content>
			{mounted && (
				<CatalogHeader>
					<CatalogTitle>{categoriesSet[category_id]?.name || "Категорія не знайдена"}</CatalogTitle>

					<CatalogActions>
						<FilterButton type="button">
							<Settings2 size={16} strokeWidth={2} />
							Фільтр
						</FilterButton>
						<FilterButton type="button">
							<ArrowDownWideNarrow size={16} strokeWidth={2} />
							Сортування
						</FilterButton>
					</CatalogActions>
				</CatalogHeader>
			)}

			<Products>
				{isSuccessProducts &&
					isSuccessFavorites &&
					products.map((product) => <ProductCard key={product.id} {...product} favorite={favorites.includes(product.id)} />)}
			</Products>
		</Content>
	);
};

export default page;
