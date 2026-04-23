import { getLocale } from "next-intl/server";

import Products from "@/components/Products/Products";
import { getCategories } from "@/lib/categories";
import { getCountries } from "@/lib/countries";
import { getProducts } from "@/lib/products";

const page = async ({
	params,
	searchParams,
}: {
	params: Promise<{ category_id: string }>;
	searchParams: Promise<{ country?: string; sort?: string }>;
}) => {
	const { category_id } = await params;
	const locale = await getLocale();

	const categories = await getCategories(locale);
	const countries = await getCountries(locale);

	const { country, sort } = await searchParams;
	const productsParams = new URLSearchParams({ category: category_id });
	if (country && !Number.isNaN(parseFloat(country))) productsParams.set("country", country);
	if (sort && ["price:asc", "price:desc", "alphabet:asc", "alphabet:desc"].includes(sort)) productsParams.set("sort", sort);

	const products = await getProducts(productsParams);

	return <Products category={categories.find((c) => String(c.id) === category_id)} products={products} countries={countries} />;
};

export default page;
