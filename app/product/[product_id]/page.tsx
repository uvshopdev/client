import MainProductCard from "@/app/product/ProductCard";
import { getProduct } from "@/lib/products";
import Reviews from "../Reviews";
import ProductsList from "../ProductsList";
import { Content } from "./page.css";

const page = async ({ params }: { params: Promise<{ product_id: string }> }) => {
	const { product_id } = await params;
	const product = await getProduct(product_id);

	return (
		<Content>
			<MainProductCard product={product} />
			<Reviews reviews={product.reviews} productId={product.id} />
			<ProductsList currentProductId={product.id} />
		</Content>
	);
};

export default page;
