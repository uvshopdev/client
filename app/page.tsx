"use client";

import { useQueries, useQuery } from "@tanstack/react-query";
import { useExtracted } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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

	const [randomCategories, setRandomCategories] = useState<any[]>([]);
	const [randomProductCategories, setRandomProductCategories] = useState<any[]>([]);
	const [randomProducts, setRandomProducts] = useState<ProductType[]>([]);

	const [visibleCardsCount, setVisibleCardsCount] = useState(5);

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
		if (categoriesList.length > 0 && randomCategories.length === 0) {
			setRandomCategories(shuffle(categoriesList).slice(0, 6));

			const categoriesWithProducts = categoriesList.filter((c) => !c.path.includes("."));
			const source = categoriesWithProducts.length > 0 ? categoriesWithProducts : categoriesList;
			setRandomProductCategories(shuffle(source).slice(0, 4));
		}
	}, [categories, randomCategories.length]);

	const { data: favorites } = useQuery({
		queryKey: ["profile", "favorites", "set"],
		queryFn: async () => {
			const data = await getFavorites();
			return data.map(({ product }) => product.id);
		},
		initialData: [],
	});

	const randomProductsQueries = useQueries({
		queries: randomProductCategories.map((category) => ({
			queryKey: ["products", category.id, "home-random"],
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
					if (!byId.has(product.id)) byId.set(product.id, product);
				}
			}
			setRandomProducts(shuffle(Array.from(byId.values())).slice(0, 10));
		}
	}, [randomProductsQueries, randomProducts.length]);

	const firstProducts = randomProducts.slice(0, visibleCardsCount);
	const secondProducts = randomProducts.slice(visibleCardsCount, visibleCardsCount * 2);

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
			{firstProducts.length > 0 && (
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
								favorite={favorites.includes(product.id)}
								categoryId={product.category?.id ?? undefined}
							/>
						))}
					</S.ProductsGrid>
				</S.SectionTight>
			)}

			<S.Section>
				<S.EmptyBanner>
					<Image src="/banner4.webp" alt="Special offers banner" fill sizes="100vw" style={{ objectFit: "cover" }} />
				</S.EmptyBanner>
			</S.Section>

			{secondProducts.length > 0 && (
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
								favorite={favorites.includes(product.id)}
								categoryId={product.category?.id ?? undefined}
							/>
						))}
					</S.ProductsGrid>
				</S.Section>
			)}
		</S.Main>
	);
}
