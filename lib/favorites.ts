import { Favorites } from "@/types/favorites";
import { authHost } from ".";

export const getFavorites = async () => {
	const { data } = await authHost.get("/users/me/favorites");
	return Favorites.parse(data);
};

export const addFavorite = async (id: number) => {
	await authHost.post(`/users/me/favorites`, { product_id: id });
};

export const removeFavorite = async (id: number) => {
	await authHost.delete(`/users/me/favorites/${id}`);
};
