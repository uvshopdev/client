import { authHost } from ".";
import { CoffeeInfo } from "./../types/coffee";

export const getCoffee = async () => {
	const { data } = await authHost.get(`/users/me/coffee`);
	return CoffeeInfo.parse(data);
};
