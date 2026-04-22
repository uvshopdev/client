"use client";

import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import styled from "styled-components";
import { useExtracted } from "next-intl";

import MainProductCard from "@/app/product/ProductCard";
import ProductsList from "@/app/product/ProductsList";
import Reviews from "@/app/product/Reviews";
import { getFavorites } from "@/lib/favorites";
import { getProducts } from "@/lib/products";
import { getProfile } from "@/lib/user";
import { getProductReviews } from "@/lib/reviews"
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

	const t = useExtracted("reviews");

	const productId = Number(product_id);
	const categoryId = Number(category_id);
	const hasCategoryId = Number.isFinite(categoryId) && categoryId > 0;

	const { data: profile } = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            try {
                return await getProfile();
            } catch (error) {
                return null;
            }
        },
        retry: false,
    });

	const currentUser = {
        name: profile?.full_name || "",
        isAuth: !!profile
    };

	const { data: serverReviews = [] } = useQuery({
        queryKey: ["reviews", productId],
        queryFn: () => getProductReviews(productId),
    });

	// Статичні відгуки (залишаємо як базу для кожного товару)
    const staticReviews = [
        { name: t("Mariia Koval"), date: "10.11.2025", rating: 5, text: t("Tasty product, but I wish it was a bit cheaper. Overall positive impressions, will buy again when there are discounts.") },
        { name: t("Oleh Petrenko"), date: "12.11.2025", rating: 4, text: t("It's okay, but without a wow effect. Maybe just not my taste, although I have no complaints about the quality.") },
        { name: t("Anna Shevchenko"), date: "15.01.2026", rating: 5, text: t("Loved it, incredible balance of flavors! The family ate it all in one evening, the texture just melts in your mouth.") },
        { name: t("Dmytro Lysenko"), date: "18.01.2026", rating: 2, text: t("Expected more, the taste seemed too neutral and indistinct.") },
        { name: t("Viktoriia Melnyk"), date: "05.02.2026", rating: 5, text: t("The quality of the product is just super! Rich aroma and deep taste, you can feel that premium ingredients are used. Will definitely order more!") },
        { name: t("Ihor Boiko"), date: "20.02.2026", rating: 5, text: t("Everything is great, the product fully matches the description. Very pleasant aftertaste and perfect consistency, exceeded my expectations.") },
        { name: t("Olena Tkachuk"), date: "10.03.2026", rating: 4, text: t("Good quality, interesting combination of flavors. Took off one star because it was a bit too sweet for me, but that's a matter of taste.") },
        { name: t("Maksym Pavlenko"), date: "02.04.2026", rating: 5, text: t("Very satisfied. Bought it for a holiday, and this product became a real hit at the table. Very elegant and high quality!") }
    ];

	const allReviews = [...serverReviews, ...staticReviews];

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
			<Reviews 
                reviews={allReviews} 
                currentUser={currentUser} 
                productId={productId} 
            />
			<ProductsList currentProductId={product.id} />
		</Wrapper>
	);
}
