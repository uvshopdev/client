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
    searchParams: Promise<{ country?: string; sort?: string; min_price?: string; max_price?: string; availability?: string }>; 
}) => {
    const { category_id } = await params;
    const locale = await getLocale();

    const categories = await getCategories(locale);
    const countries = await getCountries(locale);

    const { country, sort, min_price, max_price, availability } = await searchParams;
    const productsParams = new URLSearchParams({ category: category_id });
    
    if (country && !Number.isNaN(parseFloat(country))) productsParams.set("country", country);
    if (availability) productsParams.set("availability", availability);
    if (min_price && !Number.isNaN(parseFloat(min_price))) productsParams.set("min_price", min_price);
    if (max_price && !Number.isNaN(parseFloat(max_price))) productsParams.set("max_price", max_price);

    if (sort) {
        const validSorts = ["price:asc", "price:desc", "alphabet:asc", "alphabet:desc"];
        const selectedSorts = sort.split(",").filter((s) => validSorts.includes(s));
        
        if (selectedSorts.length > 0) {
            productsParams.set("sort", selectedSorts.join(","));
        }
    }

    const products = await getProducts(productsParams);

    return <Products category={categories.find((c) => String(c.id) === category_id)} products={products} countries={countries} />;
};

export default page;