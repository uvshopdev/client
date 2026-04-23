import { Product, Products } from "@/types/products";
import host from ".";

export const getProducts = async (params?: URLSearchParams) => {
	const { data } = await host.get(`/products?${params?.toString() || ""}`);
	return Products.parse(data);
};

export const getProduct = async (id: string) => {
	const { data } = await host.get(`/products/${id}`);
	return Product.parse(data);
};
