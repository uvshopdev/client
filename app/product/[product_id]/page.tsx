"use client";

import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import styled from "styled-components";

import MainProductCard from "@/app/product/ProductCard";
import ProductsList from "@/app/product/ProductsList";
import Reviews from "@/app/product/Reviews";
import { getFavorites } from "@/lib/favorites";
import { getProducts } from "@/lib/products";
import type { ProductType } from "@/types/products";

const Wrapper = styled.div`
	width: 100%;
	margin: 0 auto;
	padding: 60px 0 40px;
	display: flex;
	flex-direction: column;
	gap: 60px;

	@media (max-width: 990px) {
		padding: 40px 0;
		gap: 40px;
	}
`;

const Notice = styled.div`
	padding: 14px 18px;
	border: 1px solid #e9e3d9;
	border-radius: 14px;
	background: #faf7f1;
	color: #3b3028;
	font-size: 14px;
`;

const reviewsData = [
	{ name: "Марія Коваль", date: "10.11.2025", rating: 5, text: "Смачний продукт, але хотілося б трохи дешевше" },
	{ name: "Олег Петренко", date: "12.11.2025", rating: 4, text: "Нормально, але без вау ефекту" },
	{ name: "Анна Шевченко", date: "15.11.2025", rating: 5, text: "Дуже сподобалось, замовлю ще!" },
	{ name: "Дмитро Лисенко", date: "18.11.2025", rating: 2, text: "Очікував більшого, смак середній" },
	{ name: "Вікторія Мельник", date: "22.11.2025", rating: 5, text: "Швидка доставка та надійне пакування! Якість товару просто супер, обов'язково замовлятиму ще!" }
];

const buildFallbackProduct = (id: number): ProductType => ({
	id,
	article: String(id),
	name: "Товар",
	picture: null,
	price: 0,
	weight: 0,
	caloric: 0,
	country: null,
	category: null,
});

export default function ProductDetailsPage({
	params,
	searchParams,
}: {
	params: Promise<{ product_id: string }>;
	searchParams: Promise<{ category_id?: string }>;
}) {
	const { product_id } = use(params);
	const { category_id } = use(searchParams);

	const productId = Number(product_id);
	const categoryId = Number(category_id);
	const hasCategoryId = Number.isFinite(categoryId) && categoryId > 0;

	const { data: favorites } = useQuery({
		queryKey: ["favorites_ids"],
		queryFn: async () => {
			const data = await getFavorites();
			return data.map(({ product }) => product.id);
		},
		initialData: [],
	});

	const { data: products } = useQuery({
		queryKey: ["products", categoryId],
		queryFn: async () => await getProducts(0, categoryId),
		enabled: hasCategoryId,
	});

	const foundProduct = products?.find((item) => item.id === productId);
	const product = foundProduct ?? buildFallbackProduct(productId);
	const image = product.picture ? `${process.env.NEXT_PUBLIC_FILES_URL}/products/${product.id}/large/${product.picture}.webp` : "/logo.png";
	const showNotice = !foundProduct;

	return (
		<Wrapper>
			{showNotice && (
				<Notice>
					Поки що немає окремого API для товару за id, тому сторінка використовує дані зі списку категорії (якщо category_id є в URL)
					або тимчасову заглушку.
				</Notice>
			)}

			<MainProductCard image={image} product={product} favorite={favorites.includes(product.id)} />
			<Reviews reviews={reviewsData} />
			<ProductsList currentProductId={product.id} />
		</Wrapper>
	);
}
