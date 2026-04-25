import host, { authHost } from "./index";

export interface CreateReviewPayload {
	product_id: number;
	rating: number;
	message: string;
}

export const getProductReviews = async (productId: number) => {
	const { data } = await host.get(`/products/${productId}/reviews`);
	return data;
};

export const createReview = async (payload: CreateReviewPayload) => {
	const { data } = await authHost.post(`/users/me/reviews`, payload);
	return data;
};
