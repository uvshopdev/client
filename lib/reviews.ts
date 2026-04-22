import host from "./index";

export interface CreateReviewPayload {
    product_id: number;
    rating: number;
    text: string;
}

export const getProductReviews = async (productId: number) => {
    const { data } = await host.get(`/products/${productId}/reviews`);
    return data;
};

export const createReview = async (payload: CreateReviewPayload) => {
    const { data } = await host.post(`/products/reviews`, payload);
    return data;
};