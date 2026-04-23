import { getExtracted } from "next-intl/server";

import MainProductCard from "@/app/product/ProductCard";
import { getProduct } from "@/lib/products";
import { Content } from "./page.css";

const page = async ({ params }: { params: Promise<{ product_id: string }> }) => {
	const t = getExtracted("reviews");

	const { product_id } = await params;
	const product = await getProduct(product_id);

	return (
		<Content>
			<MainProductCard product={product} />
			{/* <Reviews reviews={allReviews} currentUser={currentUser} productId={productId} /> */}
			{/* <ProductsList currentProductId={product.id} /> */}
		</Content>
	);
};

export default page;
