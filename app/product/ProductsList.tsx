"use client";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useExtracted } from "next-intl";
import { useEffect, useState } from "react";

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
	const t = useExtracted("product-page");
	const { categories } = useCategories();

	const [randomProductCategories, setRandomProductCategories] = useState<any[]>([]);
	const [randomProducts, setRandomProducts] = useState<ProductType[]>([]);

	const [visibleCardsCount, setVisibleCardsCount] = useState(5);

	const { data: favorites } = useQuery({
		queryKey: ["favorites_ids"],
		queryFn: async () => {
			const data = await getFavorites();
			return data.map(({ product }) => product.id);
		},
		placeholderData: [],
	});
	const favoriteIds = favorites ?? [];

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			if (width > 1440) {
				setVisibleCardsCount(5);
			} else if (width < 1201 && width > 900) {
				setVisibleCardsCount(3);
			} else {
				setVisibleCardsCount(4);
			}
		};

		handleResize();

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		const categoriesList = Object.values(categories);
		if (categoriesList.length > 0 && randomProductCategories.length === 0) {
			const categoriesWithProducts = categoriesList.filter((c) => !c.path.includes("."));
			const source = categoriesWithProducts.length > 0 ? categoriesWithProducts : categoriesList;
			setRandomProductCategories(shuffle(source).slice(0, 4));
		}
	}, [categories, randomProductCategories.length]);

	const randomProductsQueries = useQueries({
		queries: randomProductCategories.map((category) => ({
			queryKey: ["products", category.id, "recommended-random"],
			queryFn: async () => await getProducts(),
			enabled: randomProductCategories.length > 0,
		})),
	});

	useEffect(() => {
		const isFinished = randomProductsQueries.every((q) => !q.isPending);
		const hasData = randomProductsQueries.some((q) => q.data && q.data.length > 0);

		if (isFinished && hasData && randomProducts.length === 0) {
			const byId = new Map<number, ProductType>();
			for (const query of randomProductsQueries) {
				for (const product of query.data ?? []) {
					if (!byId.has(product.id) && product.id !== currentProductId) {
						byId.set(product.id, product);
					}
				}
			}
			setRandomProducts(shuffle(Array.from(byId.values())).slice(0, 5));
		}
	}, [randomProductsQueries, currentProductId, randomProducts.length]);

	if (randomProducts.length === 0) return null;

	const visibleProducts = randomProducts.slice(0, visibleCardsCount);

	return (
		<S.ProductsSection>
			<S.ProductsTitle>{t("You might also like")}</S.ProductsTitle>
			<S.ProductsGrid>
				{visibleProducts.map((product) => (
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
