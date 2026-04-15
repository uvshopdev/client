import { Products } from "@/types/products";
import host from ".";

export const getProducts = async (last_id: number, category_id: number) => {
	const { data } = await host.get(`/products?last_id=${last_id}&category_id=${category_id}`);
	return Products.parse(data);
};
