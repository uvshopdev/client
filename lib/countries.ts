import { Countries, CountriesData } from "@/types/countries";
import { authHost } from ".";

export const getCountries = async (locale: string) => {
	const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/countries`, {
		headers: { "Accept-Language": locale },
		next: { revalidate: 3600, tags: ["countries"] },
	});
	const json = await data.json();
	return Countries.parse(json);
};

export const getUserCountries = async () => {
	const { data } = await authHost.get("/users/me/countries");
	return CountriesData.parse(data);
};
