"use client";

import { useQuery } from "@tanstack/react-query";

import ProductCard from "@/components/ProductCard/ProductCard";
import { getFavorites } from "@/lib/favorites";
import { Content } from "./page.css";

const FavoritesPage = () => {
	const { data = [] } = useQuery({
		queryKey: ["profile", "favorites"],
		queryFn: async () => await getFavorites(),
		staleTime: 3 * 60 * 1000,
		placeholderData: [],
	});

	return (
		<Content>
			{data.map(({ product }) => (
				<ProductCard key={product.id} {...product} favorite={true} categoryId={product.category?.id} />
			))}
		</Content>
	);
};

export default FavoritesPage;
