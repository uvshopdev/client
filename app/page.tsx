"use client";

import { useQueries, useQuery } from "@tanstack/react-query";
import { useExtracted } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import ProductCard from "@/components/ProductCard/ProductCard";
import { getFavorites } from "@/lib/favorites";
import { getProducts } from "@/lib/products";
import { useCategories, useModals } from "@/store";
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
	const { setCatalog } = useModals();
	const banners = ["/banner1.webp", "/banner2.webp", "/banner3.webp"];
	const [activeBannerIdx, setActiveBannerIdx] = useState(0);

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
	});
	const favoriteIds = favorites ?? [];

	const randomProductsQueries = useQueries({
		queries: randomProductCategories.map((category) => ({
			queryKey: ["products", category.id, "home-random"],
			queryFn: async () => await getProducts(0, category.id),
			enabled: randomProductCategories.length > 0,
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

	const handlePrevBanner = () => {
		setActiveBannerIdx((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
	};

	const handleNextBanner = () => {
		setActiveBannerIdx((prev) => (prev + 1) % banners.length);
	};

	return (
		<S.Main>
			<S.HeroSection>
				<S.SliderWrapper>
					{banners.map((bannerSrc, idx) => (
						<S.Slide key={bannerSrc} style={{ opacity: idx === activeBannerIdx ? 1 : 0 }}>
							<Image
								src={bannerSrc}
								alt={`Promo banner ${idx + 1}`}
								fill
								priority={idx === 0}
								sizes="100vw"
								style={{ objectFit: "cover" }}
							/>
						</S.Slide>
					))}
				</S.SliderWrapper>
				<S.Controls>
					<S.ArrowBtn type="button" aria-label="Previous banner" onClick={handlePrevBanner}>
						‹
					</S.ArrowBtn>
					<S.Dots>
						{banners.map((bannerSrc, idx) => (
							<S.Dot key={bannerSrc} $active={idx === activeBannerIdx} />
						))}
					</S.Dots>
					<S.ArrowBtn type="button" aria-label="Next banner" onClick={handleNextBanner}>
						›
					</S.ArrowBtn>
				</S.Controls>
			</S.HeroSection>

			{/* POPULAR CATEGORIES */}
			<S.Section>
				<S.Header>
					<S.SectionTitle>{t("Popular categories")}</S.SectionTitle>
					<S.LinkText onClick={() => setCatalog(true)}>{t("View all")} →</S.LinkText>
				</S.Header>

				<S.CategoriesGrid>
					{randomCategories.map((category) => (
						<Link key={category.id} href={`/${category.id}`}>
							<S.CategoryCard>
								<S.CategoryCircle>
									<Image src="/map.webp" alt={category.name} fill />
								</S.CategoryCircle>
								<S.CategoryName>{category.name}</S.CategoryName>
							</S.CategoryCard>
						</Link>
					))}
				</S.CategoriesGrid>
			</S.Section>

			<S.SectionTight>
				<S.Header>
					<S.SectionTitle>{t("Country of the month")}</S.SectionTitle>
				</S.Header>

				<S.CountryBanner>
					<Image src="/country-banner.webp" alt="Countries of the month banner" fill sizes="100vw" style={{ objectFit: "cover" }} />
				</S.CountryBanner>
			</S.SectionTight>

			{/* RANDOM PRODUCTS */}
			<S.SectionTight>
				<S.Header>
					<S.SectionTitle>{t("New arrivals")}</S.SectionTitle>
					<S.LinkText onClick={() => setCatalog(true)}>{t("View all")} →</S.LinkText>
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
				<S.EmptyBanner>
					<Image src="/banner4.webp" alt="Special offers banner" fill sizes="100vw" style={{ objectFit: "cover" }} />
				</S.EmptyBanner>
			</S.Section>

			<S.Section>
				<S.Header>
					<S.SectionTitle>{t("Best sellers")}</S.SectionTitle>
					<S.LinkText onClick={() => setCatalog(true)}>{t("View all")} →</S.LinkText>
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
