"use client";

import { useQuery } from "@tanstack/react-query";

import ProductCard from "@/components/ProductCard/ProductCard";
import { getFavorites } from "@/lib/favorites";
import { Content } from "./page.css";

const FavoritesPage = () => {
	const { data, isSuccess } = useQuery({
		queryKey: ["favorites"],
		queryFn: async () => await getFavorites(),
		staleTime: 3 * 60 * 1000,
	});

	return (
		<Content>
			{isSuccess && data.map(({ product }) => <ProductCard key={product.id} {...product} favorite={true} />)}
		</Content>
	);
};

export default FavoritesPage;
