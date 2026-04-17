"use client";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import ProductCard from "@/components/ProductCard/ProductCard";
import { getFavorites } from "@/lib/favorites";
import { getProducts } from "@/lib/products";
import { useCategories } from "@/store";
import type { ProductType } from "@/types/products";
import * as S from "./ProductsList.css";

const shuffle = <T,>(items: T[]) => {
	const arr = [...items];
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
};

interface ProductsListProps {
	currentProductId: number;
}

const ProductsList = ({ currentProductId }: ProductsListProps) => {
	const { categories } = useCategories();

	const { data: favorites } = useQuery({
		queryKey: ["favorites_ids"],
		queryFn: async () => {
			const data = await getFavorites();
			return data.map(({ product }) => product.id);
		},
		placeholderData: [],
	});
	const favoriteIds = favorites ?? [];

	const categoriesWithProducts = useMemo(() => categories.filter((c) => c.category_id !== null), [categories]);
	const randomProductCategories = useMemo(
		() => shuffle(categoriesWithProducts.length > 0 ? categoriesWithProducts : categories).slice(0, 4),
		[categoriesWithProducts, categories],
	);

	const randomProductsQueries = useQueries({
		queries: randomProductCategories.map((category) => ({
			queryKey: ["products", category.id, "recommended-random"],
			queryFn: async () => await getProducts(0, category.id),
			enabled: randomProductCategories.length > 0,
		})),
	});

	const randomProducts = useMemo(() => {
		const byId = new Map<number, ProductType>();
		for (const query of randomProductsQueries) {
			for (const product of query.data ?? []) {
				if (!byId.has(product.id) && product.id !== currentProductId) {
					byId.set(product.id, product);
				}
			}
		}
		return shuffle(Array.from(byId.values())).slice(0, 5);
	}, [randomProductsQueries, currentProductId]);

	if (randomProducts.length === 0) return null;

	return (
		<S.ProductsSection>
			<S.ProductsTitle>Вам також може сподобатись</S.ProductsTitle>
			<S.ProductsGrid>
				{randomProducts.map((product) => (
					<ProductCard
						key={product.id}
						{...product}
						favorite={favoriteIds.includes(product.id)}
						categoryId={product.category?.id ?? undefined}
					/>
				))}
			</S.ProductsGrid>
		</S.ProductsSection>
	);
};

export default ProductsList;
