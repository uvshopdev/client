"use client";

import { useQueries, useQuery } from "@tanstack/react-query";
import { useExtracted } from "next-intl";
import Link from "next/link";
import { useMemo } from "react";

import ProductCard from "@/components/ProductCard/ProductCard";
import { getFavorites } from "@/lib/favorites";
import { getProducts } from "@/lib/products";
import { useCategories } from "@/store";
import type { ProductType } from "@/types/products";
import * as S from "./page.css";

const shuffle = <T,>(items: T[]) => {
	const arr = [...items];
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
};

export default function Home() {
	const t = useExtracted("home");
	const { categories } = useCategories();

	const randomCategories = useMemo(() => shuffle(categories).slice(0, 6), [categories]);
	const categoriesWithProducts = useMemo(() => categories.filter((c) => c.category_id !== null), [categories]);
	const randomProductCategories = useMemo(
		() => shuffle(categoriesWithProducts.length > 0 ? categoriesWithProducts : categories).slice(0, 4),
		[categoriesWithProducts, categories],
	);

	const { data: favorites } = useQuery({
		queryKey: ["favorites_ids"],
		queryFn: async () => {
			const data = await getFavorites();
			return data.map(({ product }) => product.id);
		},
		placeholderData: [],
		staleTime: 3 * 60 * 1000,
	});
	const favoriteIds = favorites ?? [];

	const randomProductsQueries = useQueries({
		queries: randomProductCategories.map((category) => ({
			queryKey: ["products", category.id, "home-random"],
			queryFn: async () => await getProducts(0, category.id),
			enabled: randomProductCategories.length > 0,
			staleTime: 3 * 60 * 1000,
		})),
	});

	const randomProducts = useMemo(() => {
		const byId = new Map<number, ProductType>();
		for (const query of randomProductsQueries) {
			for (const product of query.data ?? []) {
				if (!byId.has(product.id)) byId.set(product.id, product);
			}
		}
		return shuffle(Array.from(byId.values())).slice(0, 10);
	}, [randomProductsQueries]);

	const [firstProducts, secondProducts] = useMemo(() => [randomProducts.slice(0, 5), randomProducts.slice(5, 10)], [randomProducts]);

	return (
		<S.Main>
			{/* EMPTY BANNERS */}
			<S.HeroSection>
				<S.EmptyBanner />
			</S.HeroSection>

			{/* POPULAR CATEGORIES */}
			<S.Section>
				<S.Header>
					<S.SectionTitle>{t("Popular categories")}</S.SectionTitle>
					<Link href="/" passHref>
						<S.LinkText>{t("View all")} →</S.LinkText>
					</Link>
				</S.Header>

				<S.CategoriesGrid>
					{randomCategories.map((category) => (
						<Link key={category.id} href={`/${category.id}`}>
							<S.CategoryCard>
								<S.CategoryCircle />
								<S.CategoryName>{category.name}</S.CategoryName>
							</S.CategoryCard>
						</Link>
					))}
				</S.CategoriesGrid>
			</S.Section>

			{/* EMPTY BANNER */}
			<S.SectionTight>
				<S.Header>
					<S.SectionTitle>{t("Countries of the month")}</S.SectionTitle>
				</S.Header>

				<S.CountryBanner />
			</S.SectionTight>

			{/* RANDOM PRODUCTS */}
			<S.SectionTight>
				<S.Header>
					<S.SectionTitle>{t("New arrivals")}</S.SectionTitle>
					<Link href="/">
						<S.LinkText>{t("View all")} →</S.LinkText>
					</Link>
				</S.Header>

				<S.ProductsGrid>
					{firstProducts.map((product) => (
						<ProductCard
							key={product.id}
							{...product}
							favorite={favoriteIds.includes(product.id)}
							categoryId={product.category?.id ?? undefined}
						/>
					))}
				</S.ProductsGrid>
			</S.SectionTight>

			<S.Section>
				<S.Header>
					<S.SectionTitle>{t("Best sellers")}</S.SectionTitle>
					<Link href="/">
						<S.LinkText>{t("View all")} →</S.LinkText>
					</Link>
				</S.Header>
				<S.ProductsGrid>
					{secondProducts.map((product) => (
						<ProductCard
							key={product.id}
							{...product}
							favorite={favoriteIds.includes(product.id)}
							categoryId={product.category?.id ?? undefined}
						/>
					))}
				</S.ProductsGrid>
			</S.Section>
		</S.Main>
	);
}
